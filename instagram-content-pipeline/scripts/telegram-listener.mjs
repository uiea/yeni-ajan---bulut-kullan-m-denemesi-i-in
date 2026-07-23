import fs from 'node:fs';
import path from 'node:path';
import { spawn } from 'node:child_process';

const root = path.resolve(import.meta.dirname, '..');
const env = {};
for (const file of [path.join(root, '.env.local'), path.join(root, '..', '.env.local')]) {
  if (!fs.existsSync(file)) continue;
  for (const line of fs.readFileSync(file, 'utf8').split(/\r?\n/)) {
    const index = line.indexOf('=');
    if (index > 0 && !line.startsWith('#')) env[line.slice(0, index)] ||= line.slice(index + 1);
  }
}
const token = env.TELEGRAM_BOT_TOKEN;
const allowedChatId = String(env.TELEGRAM_ALLOWED_CHAT_ID ?? '');
if (!token || !allowedChatId) throw new Error('Telegram token veya izinli chat ID yapılandırılmadı.');

const statePath = path.join(root, 'data', 'telegram-state.json');
const state = fs.existsSync(statePath) ? JSON.parse(fs.readFileSync(statePath, 'utf8')) : { offset: 0, topics: {} };
const save = () => {
  const disk = fs.existsSync(statePath) ? JSON.parse(fs.readFileSync(statePath, 'utf8')) : { offset: 0, topics: {} };
  const mergedTopics = { ...disk.topics };
  for (const [topicId, memoryTopic] of Object.entries(state.topics)) {
    mergedTopics[topicId] = { ...(disk.topics?.[topicId] ?? {}), ...memoryTopic };
  }
  const merged = { ...disk, ...state, topics: mergedTopics, offset: state.offset };
  fs.mkdirSync(path.dirname(statePath), { recursive: true });
  fs.writeFileSync(statePath, JSON.stringify(merged, null, 2));
};
const previewQueuePath = path.join(root, 'data', 'preview-queue.json');
const enqueuePreview = (topicId, stage = 'candidate') => {
  const queue = fs.existsSync(previewQueuePath) ? JSON.parse(fs.readFileSync(previewQueuePath, 'utf8')) : { jobs: [] };
  if (!queue.jobs.some((job) => job.topicId === topicId && ['queued', 'processing'].includes(job.status))) {
    queue.jobs.push({ topicId, stage, status: 'queued', queuedAt: new Date().toISOString() });
    fs.mkdirSync(path.dirname(previewQueuePath), { recursive: true });
    fs.writeFileSync(previewQueuePath, JSON.stringify(queue, null, 2));
  }
};
const api = async (method, body) => {
  const response = await fetch(`https://api.telegram.org/bot${token}/${method}`, {
    method: body ? 'POST' : 'GET', headers: body ? { 'content-type': 'application/json' } : undefined, body: body ? JSON.stringify(body) : undefined
  });
  const data = await response.json();
  if (!data.ok) throw new Error(`Telegram ${method} başarısız.`);
  return data.result;
};
const reply = (chatId, text, keyboard) => api('sendMessage', { chat_id: chatId, text, reply_markup: keyboard ? { inline_keyboard: keyboard } : undefined });
const withCancel = (keyboard, id) => [...keyboard, [{ text: 'İptal', callback_data: `cancel:${id}` }]];
const chooseOverlay = (id) => withCancel([[{ text: 'Görsel üstü metin: evet', callback_data: `overlay:yes:${id}` }], [{ text: 'Görsel üstü metin: hayır', callback_data: `overlay:no:${id}` }]], id);
const chooseMediaSource = (id) => [
  [{ text: 'Lisanslı stok medya', callback_data: `source:stock:${id}` }],
  [{ text: 'Yapay zekâ ile oluştur', callback_data: `source:ai:${id}` }],
  [{ text: 'Karma kullanım', callback_data: `source:mixed:${id}` }],
  [{ text: 'İptal', callback_data: `cancel:${id}` }]
];
const recordActivity = (topic, percent, label, steps = []) => {
  topic.activity = [...(topic.activity ?? []), { at: new Date().toISOString(), percent, label, steps }].slice(-8);
};
const progressText = (percent, label, activity = [], operation = { percent: 100, label }) => {
  const completed = Math.round(percent / 10);
  const operationCompleted = Math.round(operation.percent / 10);
  const statusLines = activity.map((entry) => `• %${entry.percent} — ${entry.label}`).join('\n');
  return `Genel ilerleme\n[${'█'.repeat(completed)}${'░'.repeat(10 - completed)}] %${percent}\n\nŞu anki işlem: ${operation.label}\n[${'█'.repeat(operationCompleted)}${'░'.repeat(10 - operationCompleted)}] %${operation.percent}\n\n${label}${statusLines ? `\n\nMevcut durum:\n${statusLines}` : ''}`;
};
const updateProgress = async (topic, percent, label) => {
  recordActivity(topic, percent, label);
  topic.progress = { percent, label, operation: { percent: 100, label }, updatedAt: new Date().toISOString() };
  const text = progressText(percent, label, topic.activity, topic.progress.operation);
  const message = await reply(topic.chatId, text, [[{ text: 'İptal', callback_data: `cancel:${topic.id ?? ''}` }]]);
  topic.progressMessageId = message.message_id;
};
const updateCaptionSection = (topic, section, value) => {
  if (!topic.captionPath) throw new Error('Bu konu için henüz açıklama paketi oluşturulmadı.');
  const captionPath = path.join(root, topic.captionPath);
  const current = fs.readFileSync(captionPath, 'utf8');
  const paragraphs = current.split(/\r?\n\r?\n/);
  const hashtagIndex = paragraphs.findIndex((paragraph) => paragraph.trim().startsWith('#'));
  if (section === 'caption') {
    const hashtags = hashtagIndex >= 0 ? paragraphs[hashtagIndex] : '';
    fs.writeFileSync(captionPath, `${value.trim()}\n\n${hashtags.trim()}\n`, 'utf8');
  } else {
    const copy = hashtagIndex >= 0 ? paragraphs.slice(0, hashtagIndex).join('\n\n') : current.trim();
    fs.writeFileSync(captionPath, `${copy}\n\n${value.trim()}\n`, 'utf8');
  }
};
const resumeInstruction = (topic) => {
  const instructions = {
    'awaiting-mode': 'Eksik adım: Otomatik oluştur veya Adım adım oluştur seçimi.',
    'awaiting-source': 'Eksik adım: Lisanslı stok medya, Yapay zekâ ile oluştur veya Karma kullanım seçimi.',
    'awaiting-format': 'Eksik adım: Tek görsel, carousel veya reel formatını seçme.',
    'awaiting-slides': 'Eksik adım: Carousel slayt sayısını seçme.',
    'awaiting-duration': 'Eksik adım: Reel süresini seçme.',
    'awaiting-overlay': 'Eksik adım: Görsel üstü metin tercihini seçme.',
    'brief-ready': 'Eksik adım: Medya işçisinin uygun kaynağı getirip önizlemeyi oluşturması.',
    'asset-ready': 'Eksik adım: Görselin başlık ve açıklama paketiyle önizleme olarak render edilmesi.',
    'awaiting-review': 'Önizleme hazır. Eksik adım: Telegram’daki önizlemeyi inceleme, düzeltme veya yayın isteği.',
    'revision-requested': 'Düzeltme kaydedildi. Eksik adım: Güncel önizleme paketinin yeniden gönderilmesi.',
    'awaiting-publish-confirmation': 'Yayın onayı bekleniyor. Telegram’daki Evet, Instagram’da yayınla düğmesine bas.',
    'publish-started': 'Instagram yayın aracı başlatıldı. Eksik adım: Tarayıcıdaki Instagram işleminin tamamlanması.',
    'instagram-ready': 'Taslak hazır. Eksik adım: Instagram’da yayınla isteği.',
    'cancelled': 'Bu çalışma iptal edildi. Yeni bir içerik için konu: ile başlayan mesaj gönder.'
  };
  return instructions[topic.status] ?? `Durum: ${topic.status}`;
};
const showStatus = async (chatId) => {
  const latest = Object.entries(state.topics).reverse().find(([, topic]) => String(topic.chatId) === String(chatId));
  if (!latest) return reply(chatId, 'Aktif içerik bulunmuyor. Yeni içerik için konu: ile başlayan mesaj gönder.');
  const [topicId, topic] = latest;
  const progress = topic.progress ? `\nİlerleme: %${topic.progress.percent} — ${topic.progress.label}` : '';
  const activity = (topic.activity ?? []).map((entry) => `• %${entry.percent} — ${entry.label}`).join('\n');
  return reply(chatId, `Çalışma durumu\nKonu: ${topic.topic}\nKimlik: ${topicId}\nAşama: ${topic.status}${progress}${activity ? `\n\nMevcut durum:\n${activity}` : ''}\n\n${resumeInstruction(topic)}`);
};
const resolvePublishPackage = (topic, topicId) => {
  const packageDir = path.join(root, 'packages', `telegram-${topicId}`);
  const existing = (candidate) => candidate && fs.existsSync(path.resolve(root, candidate));
  if (!existing(topic.captionPath)) {
    const fallbackCaption = path.join(packageDir, 'caption.txt');
    if (fs.existsSync(fallbackCaption)) topic.captionPath = path.relative(root, fallbackCaption);
  }
  if (!existing(topic.previewFilePath) && fs.existsSync(packageDir)) {
    const previews = fs.readdirSync(packageDir, { withFileTypes: true })
      .filter((entry) => entry.isFile() && /^single-image-preview.*\.(png|jpe?g)$/i.test(entry.name))
      .map((entry) => path.join(packageDir, entry.name))
      .sort((left, right) => fs.statSync(right).mtimeMs - fs.statSync(left).mtimeMs);
    if (previews[0]) topic.previewFilePath = path.relative(root, previews[0]);
  }
  if (!existing(topic.previewFilePath) && existing(topic.asset?.filePath)) topic.previewFilePath = topic.asset.filePath;
  const missing = [];
  if (!existing(topic.previewFilePath)) missing.push('görsel önizlemesi');
  if (!existing(topic.captionPath)) missing.push('açıklama paketi');
  return { ok: missing.length === 0, missing };
};
const startInstagramPublish = (topic, topicId) => {
  const packageCheck = resolvePublishPackage(topic, topicId);
  if (!packageCheck.ok) throw new Error(`Yayın paketi eksik: ${packageCheck.missing.join(', ')}. Önizlemeyi yeniden oluştur düğmesiyle ilgili adıma dön.`);
  const publisherDir = path.resolve(root, '..', 'instagram-publisher');
  const image = path.relative(publisherDir, path.join(root, topic.previewFilePath));
  const caption = path.relative(publisherDir, path.join(root, topic.captionPath));
  const resultPath = path.join(root, 'packages', `telegram-${topicId}`, `publish-result-${Date.now()}.json`);
  const child = spawn(process.execPath, ['publish.mjs', '--image', image, '--caption-file', caption, '--result-file', resultPath, '--publish'], {
    cwd: publisherDir,
    detached: true,
    stdio: 'ignore',
    windowsHide: false
  });
  child.unref();
  return resultPath;
};
const monitorPublishResult = (topic, resultPath) => {
  let attempts = 0;
  const timer = setInterval(async () => {
    attempts += 1;
    if (fs.existsSync(resultPath)) {
      clearInterval(timer);
      const result = JSON.parse(fs.readFileSync(resultPath, 'utf8'));
      topic.publishResult = { ...result, resultPath: path.relative(root, resultPath) };
      if (result.status === 'published') {
        topic.status = 'published';
        await reply(topic.chatId, 'Instagram yayını başarılı. Gönderi hesabında yayınlandı.');
      } else if (result.status === 'failed') {
        topic.status = 'publish-failed';
        await reply(topic.chatId, `Instagram yayını başarısız.\nNeden: ${result.reason}\nÇözüm: ${result.solution}`);
      } else {
        topic.status = 'publish-verification-required';
        await reply(topic.chatId, 'Paylaş komutu gönderildi ancak Instagram arayüzünde kesin başarı onayı algılanamadı. Profilini yenileyerek gönderiyi kontrol et. Görünmüyorsa işlemi tekrar başlat.');
      }
      save();
    } else if (attempts >= 45) {
      clearInterval(timer);
      topic.status = 'publish-verification-required';
      await reply(topic.chatId, 'Yayın sonucundan zamanında yanıt alınamadı. Tarayıcıdaki Instagram penceresini ve profilini kontrol et.');
      save();
    }
  }, 2000);
};

async function handleCallback(callback) {
  const chatId = callback.message?.chat?.id;
  if (String(chatId) !== allowedChatId) return;
  await api('answerCallbackQuery', { callback_query_id: callback.id }).catch(() => {});
  const [action, value, id] = (callback.data ?? '').split(':');
  const topicId = action === 'auto' || action === 'guided' || action === 'cancel' ? value : id;
  const topic = state.topics[topicId];
  if (!topic) return reply(chatId, 'Bu seçim artık geçerli değil. Konuyu yeniden gönder.');
  topic.id ??= topicId;

  if (action === 'cancel') {
    topic.status = 'cancelled';
    topic.cancelledAt = new Date().toISOString();
    return reply(chatId, 'Bu içerik çalışması iptal edildi. Dosyalar silinmedi. Yeni içerik için konu: ile başlayan mesaj gönderebilirsin.');
  }

  if (action === 'auto') {
    const text = topic.topic.toLocaleLowerCase('tr-TR');
    topic.mode = 'auto';
    topic.format = /adım|liste|rehber|nasıl|ipuç/.test(text) ? 'carousel' : /video|demo|göster|hareket/.test(text) ? 'reel' : 'single-image-caption';
    topic.textOnVisual = topic.format === 'single-image-caption';
    topic.slides = topic.format === 'carousel' ? 6 : null;
    topic.durationSeconds = topic.format === 'reel' ? 15 : null;
    topic.status = 'awaiting-source';
    await updateProgress(topic, 30, 'Format belirlendi. Görsel kaynağı seçimi bekleniyor.');
    return reply(chatId, `Otomatik mod seçildi.\nFormat: ${topic.format}${topic.slides ? ` (${topic.slides} slayt)` : ''}${topic.durationSeconds ? ` (${topic.durationSeconds} sn)` : ''}.\n\nÖnizleme için hangi kaynağı kullanalım?`, chooseMediaSource(topicId));
  }
  if (action === 'guided') {
    topic.mode = 'guided'; topic.status = 'awaiting-source';
    await updateProgress(topic, 20, 'Önizleme kaynağı seçimi bekleniyor.');
    return reply(chatId, '1/4 - Önizleme için hangi kaynağı kullanalım?', chooseMediaSource(topicId));
  }
  if (action === 'source') {
    topic.mediaSource = value;
    if (topic.mode === 'auto') {
      topic.status = 'brief-ready';
      enqueuePreview(topicId);
      await updateProgress(topic, 70, 'İçerik brief’i tamamlandı. Önizleme üretim sırasına alındı.');
      return reply(chatId, `Kaynak seçildi: ${value === 'stock' ? 'lisanslı stok medya' : value === 'ai' ? 'yapay zekâ ile oluşturma' : 'karma kullanım'}.\n\nHazırlık yüzdesini ilerleme çubuğu mesajından takip edebilirsin.`);
    }
    topic.status = 'awaiting-format';
    await updateProgress(topic, 30, 'Kaynak seçildi. İçerik türü seçimi bekleniyor.');
    return reply(chatId, '2/4 - Hangi formatı istiyorsun?', withCancel([
      [{ text: 'Tek görsel', callback_data: `format:single-image:${topicId}` }, { text: 'Görsel + açıklama', callback_data: `format:single-image-caption:${topicId}` }],
      [{ text: 'Carousel', callback_data: `format:carousel:${topicId}` }, { text: 'Reel', callback_data: `format:reel:${topicId}` }]
    ], topicId));
  }
  if (action === 'format') {
    topic.format = value;
    await updateProgress(topic, 45, 'İçerik biçimi kaydedildi. Görsel ayarları belirleniyor.');
    if (value === 'carousel') {
      topic.status = 'awaiting-slides';
      return reply(chatId, '3/4 - Carousel kaç slayt olsun?', withCancel([[4, 6, 8, 10].map((n) => ({ text: `${n} slayt`, callback_data: `slides:${n}:${topicId}` }))], topicId));
    }
    if (value === 'reel') {
      topic.status = 'awaiting-duration';
      return reply(chatId, '3/4 - Reel süresi ne olsun?', withCancel([[8, 15, 30].map((n) => ({ text: `${n} sn`, callback_data: `duration:${n}:${topicId}` }))], topicId));
    }
    topic.status = 'awaiting-overlay';
    return reply(chatId, '3/4 - Görselin üzerinde kısa metin olsun mu?', chooseOverlay(topicId));
  }
  if (action === 'slides') { topic.slides = Number(value); topic.status = 'awaiting-overlay'; return reply(chatId, '4/4 - Carousel slaytlarında metin olsun mu?', chooseOverlay(topicId)); }
  if (action === 'duration') { topic.durationSeconds = Number(value); topic.status = 'awaiting-overlay'; return reply(chatId, '4/4 - Reel üzerinde kısa metin olsun mu?', chooseOverlay(topicId)); }
  if (action === 'overlay') {
    topic.textOnVisual = value === 'yes'; topic.status = 'brief-ready';
    enqueuePreview(topicId);
    await updateProgress(topic, 70, 'İçerik brief’i tamamlandı. Önizleme üretim sırasına alındı.');
    return reply(chatId, `Seçimler kaydedildi.\nFormat: ${topic.format}${topic.slides ? ` (${topic.slides} slayt)` : ''}${topic.durationSeconds ? ` (${topic.durationSeconds} sn)` : ''}\nGörsel metni: ${topic.textOnVisual ? 'evet' : 'hayır'}\n\nHazırlık yüzdesini ilerleme çubuğu mesajından takip edebilirsin.`);
  }
  if (action === 'asset') {
    if (value === 'approve') {
      topic.status = 'brief-ready';
      enqueuePreview(topicId, 'render');
      await updateProgress(topic, 88, 'Görsel onaylandı. Metin ve paylaşım önizlemesi hazırlanıyor.');
      return reply(chatId, 'Görsel onaylandı. Açıklama, CTA ve hashtag paketi hazırlanacak.');
    }
    if (value === 'next') {
      topic.rejectedAssetIds = [...new Set([...(topic.rejectedAssetIds ?? []), topic.assetCandidate?.assetId].filter(Boolean))];
      topic.asset = undefined;
      topic.assetCandidate = undefined;
      topic.status = 'brief-ready';
      enqueuePreview(topicId, 'candidate');
      await updateProgress(topic, 72, 'Görsel reddedildi. Farklı aday aranıyor.');
      return reply(chatId, 'Bu görsel kullanılmayacak. Yeni aday aranıyor.');
    }
  }
  if (action === 'review') {
    if (value === 'publish-request') {
      const packageCheck = resolvePublishPackage(topic, topicId);
      if (!packageCheck.ok) {
        topic.status = 'awaiting-review';
        return reply(chatId, `Yayın paketi henüz tamam değil: ${packageCheck.missing.join(', ')}. Önizleme yeniden hazırlanmalı; yayın onayı gösterilmedi.`);
      }
      topic.status = 'awaiting-publish-confirmation';
      const image = topic.previewFilePath ?? topic.asset?.filePath ?? 'önizleme görseli';
      return reply(chatId, `Yayın onayı gerekli.\n\nGörsel: ${image}\nAçıklama: ${topic.captionPath ?? 'açıklama paketi'}\nHedef: Bu bilgisayardaki yayıncı profilinde giriş yapılmış Instagram hesabı\n\nBu gönderi herkese açık olarak yayınlanacak.`, [
        [{ text: 'Evet, Instagram’da yayınla', callback_data: `publish:confirm:${topicId}` }],
        [{ text: 'Vazgeç', callback_data: `publish:cancel:${topicId}` }]
      ]);
    }
    if (value === 'ready') {
      topic.status = 'instagram-ready';
      return reply(chatId, 'Taslak onaylandı ve Instagram için hazır durumuna alındı. Paylaşım yapılmadı; yayınlama öncesinde ayrıca onayın istenecek.');
    }
    if (value === 'revise') {
      topic.status = 'revision-requested';
      const currentCaption = topic.captionPath && fs.existsSync(path.join(root, topic.captionPath))
        ? fs.readFileSync(path.join(root, topic.captionPath), 'utf8').trim()
        : 'Açıklama paketi henüz oluşturulmadı.';
      return reply(chatId, `Düzeltme isteğin kaydedildi.\n\nMevcut açıklama ve hashtag'ler:\n\n${currentCaption}\n\nHangisini değiştirmek istiyorsun?`, [
        [{ text: '✏️ Açıklamayı düzenle', callback_data: `edit:caption:${topicId}` }],
        [{ text: '# Hashtagleri düzenle', callback_data: `edit:hashtags:${topicId}` }]
      ]);
    }
  }
  if (action === 'edit') {
    topic.status = value === 'caption' ? 'awaiting-caption-edit' : 'awaiting-hashtag-edit';
    const currentCaption = topic.captionPath && fs.existsSync(path.join(root, topic.captionPath))
      ? fs.readFileSync(path.join(root, topic.captionPath), 'utf8').trim()
      : '';
    const paragraphs = currentCaption.split(/\r?\n\r?\n/);
    const currentValue = value === 'caption'
      ? paragraphs.filter((paragraph) => !paragraph.trim().startsWith('#')).join('\n\n')
      : (paragraphs.find((paragraph) => paragraph.trim().startsWith('#')) ?? '');
    return reply(chatId, `${value === 'caption' ? 'Yeni açıklamayı' : 'Yeni hashtagleri'} şimdi tek mesaj olarak yaz.\n\nMevcut metin:\n${currentValue}`);
  }
  if (action === 'publish') {
    if (value === 'cancel') {
      topic.status = 'awaiting-review';
      return reply(chatId, 'Yayın isteği iptal edildi. Taslak inceleme için hazır kalıyor.');
    }
    if (value === 'confirm') {
      try {
        topic.id = topicId;
        const resultPath = startInstagramPublish(topic, topicId);
        topic.status = 'publish-started';
        topic.publishResultPath = path.relative(root, resultPath);
        monitorPublishResult(topic, resultPath);
        return reply(chatId, 'Instagram yayın işlemi başlatıldı. Sonuç başarı veya hata bilgisi olarak bu sohbete gönderilecek.');
      } catch (error) {
        topic.status = 'awaiting-publish-confirmation';
        return reply(chatId, `Yayın başlatılamadı: ${error.message}`);
      }
    }
  }
}

async function processUpdates(timeout = 0) {
  const updates = await api(`getUpdates?offset=${state.offset}&timeout=${timeout}`);
  for (const update of updates) {
    state.offset = update.update_id + 1;
    try {
      if (update.callback_query) await handleCallback(update.callback_query);
      const message = update.message;
      if (message && String(message.chat.id) === allowedChatId && message.text?.trim()) {
        const text = message.text.trim();
        if (text === '/start' || text === '/durum') await showStatus(message.chat.id);
      else {
        const pendingEdit = Object.entries(state.topics).reverse().find(([, topic]) => String(topic.chatId) === String(message.chat.id) && ['awaiting-caption-edit', 'awaiting-hashtag-edit'].includes(topic.status));
        if (pendingEdit) {
          const [topicId, topic] = pendingEdit;
          const section = topic.status === 'awaiting-caption-edit' ? 'caption' : 'hashtags';
          updateCaptionSection(topic, section, text);
          topic.status = 'revision-requested';
          await reply(message.chat.id, `${section === 'caption' ? 'Açıklama' : 'Hashtagler'} kaydedildi. Konu: ${topicId}. Güncel önizleme gönderime hazır.`);
        }
        else if (/^\/(aciklama|caption)\s+/i.test(text) || /^\/hashtag\s+/i.test(text)) {
        const isCaption = /^\/(aciklama|caption)\s+/i.test(text);
        const value = text.replace(isCaption ? /^\/(aciklama|caption)\s+/i : /^\/hashtag\s+/i, '');
        const latest = Object.entries(state.topics).reverse().find(([, topic]) => String(topic.chatId) === String(message.chat.id) && topic.captionPath);
        if (!latest) await reply(message.chat.id, 'Düzenlenecek bir açıklama paketi bulunamadı.');
        else {
          const [topicId, topic] = latest;
          updateCaptionSection(topic, isCaption ? 'caption' : 'hashtags', value);
          topic.status = 'revision-requested';
          await reply(message.chat.id, `${isCaption ? 'Açıklama' : 'Hashtagler'} güncellendi. Konu: ${topicId}. Yeni önizleme gönderime hazır.`);
        }
        }
        else {
          const topicText = text.replace(/^konu\s*:\s*/i, '').trim();
          if (!/^konu\s*:/i.test(text) || !topicText) {
            await reply(message.chat.id, 'Yeni içerik başlatmak için mesajını şu biçimde gönder: \n\nkonu: yapay zekânın iş hayatına etkisi');
          } else {
            const id = String(update.update_id);
            state.topics[id] = { id, topic: topicText, receivedAt: new Date().toISOString(), chatId: message.chat.id, status: 'awaiting-mode' };
            await updateProgress(state.topics[id], 10, 'Konu alındı. İçerik tercihi bekleniyor.');
            await reply(message.chat.id, `Konu alındı:\n${topicText}\n\nNasıl ilerleyelim?`, withCancel([[{ text: 'Otomatik oluştur', callback_data: `auto:${id}` }], [{ text: 'Adım adım oluştur', callback_data: `guided:${id}` }]], id));
          }
        }
      }
    }
    } catch (error) {
      console.error(`Telegram güncellemesi işlenemedi: ${error.message}`);
    } finally {
      save();
    }
  }
  return updates.length;
}

if (process.argv.includes('--watch')) {
  console.log('Telegram dinleyicisi çalışıyor. Durdurmak için Ctrl+C.');
  while (true) {
    try {
      await processUpdates(20);
    } catch (error) {
      console.error(`Telegram dinleyici hatası: ${error.message}`);
      await new Promise((resolve) => setTimeout(resolve, 3000));
    }
  }
} else {
  console.log(`Processed ${await processUpdates()} Telegram update(s).`);
}
