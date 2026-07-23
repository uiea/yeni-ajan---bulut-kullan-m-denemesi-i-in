import fs from 'node:fs';
import path from 'node:path';

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
const save = () => { fs.mkdirSync(path.dirname(statePath), { recursive: true }); fs.writeFileSync(statePath, JSON.stringify(state, null, 2)); };
const previewQueuePath = path.join(root, 'data', 'preview-queue.json');
const enqueuePreview = (topicId) => {
  const queue = fs.existsSync(previewQueuePath) ? JSON.parse(fs.readFileSync(previewQueuePath, 'utf8')) : { jobs: [] };
  if (!queue.jobs.some((job) => job.topicId === topicId && ['queued', 'processing'].includes(job.status))) {
    queue.jobs.push({ topicId, status: 'queued', queuedAt: new Date().toISOString() });
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
const chooseOverlay = (id) => [[{ text: 'Görsel üstü metin: evet', callback_data: `overlay:yes:${id}` }], [{ text: 'Görsel üstü metin: hayır', callback_data: `overlay:no:${id}` }]];
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

async function handleCallback(callback) {
  const chatId = callback.message?.chat?.id;
  if (String(chatId) !== allowedChatId) return;
  await api('answerCallbackQuery', { callback_query_id: callback.id }).catch(() => {});
  const [action, value, id] = (callback.data ?? '').split(':');
  const topicId = action === 'auto' || action === 'guided' ? value : id;
  const topic = state.topics[topicId];
  if (!topic) return reply(chatId, 'Bu seçim artık geçerli değil. Konuyu yeniden gönder.');

  if (action === 'auto') {
    const text = topic.topic.toLocaleLowerCase('tr-TR');
    topic.mode = 'auto';
    topic.format = /adım|liste|rehber|nasıl|ipuç/.test(text) ? 'carousel' : /video|demo|göster|hareket/.test(text) ? 'reel' : 'single-image-caption';
    topic.slides = topic.format === 'carousel' ? 6 : null;
    topic.durationSeconds = topic.format === 'reel' ? 15 : null;
    topic.status = 'brief-ready';
    enqueuePreview(topicId);
    return reply(chatId, `Otomatik mod seçildi.\nFormat: ${topic.format}${topic.slides ? ` (${topic.slides} slayt)` : ''}${topic.durationSeconds ? ` (${topic.durationSeconds} sn)` : ''}.\n\nİçerik brief'i hazır. Önizleme hazırlanıyor; tamamlandığında bu sohbete gönderilecek.`);
  }
  if (action === 'guided') {
    topic.mode = 'guided'; topic.status = 'awaiting-format';
    return reply(chatId, '1/3 - Hangi formatı istiyorsun?', [
      [{ text: 'Tek görsel', callback_data: `format:single-image:${topicId}` }, { text: 'Görsel + açıklama', callback_data: `format:single-image-caption:${topicId}` }],
      [{ text: 'Carousel', callback_data: `format:carousel:${topicId}` }, { text: 'Reel', callback_data: `format:reel:${topicId}` }]
    ]);
  }
  if (action === 'format') {
    topic.format = value;
    if (value === 'carousel') {
      topic.status = 'awaiting-slides';
      return reply(chatId, '2/3 - Carousel kaç slayt olsun?', [[4, 6, 8, 10].map((n) => ({ text: `${n} slayt`, callback_data: `slides:${n}:${topicId}` }))]);
    }
    if (value === 'reel') {
      topic.status = 'awaiting-duration';
      return reply(chatId, '2/3 - Reel süresi ne olsun?', [[8, 15, 30].map((n) => ({ text: `${n} sn`, callback_data: `duration:${n}:${topicId}` }))]);
    }
    topic.status = 'awaiting-overlay';
    return reply(chatId, '2/3 - Görselin üzerinde kısa metin olsun mu?', chooseOverlay(topicId));
  }
  if (action === 'slides') { topic.slides = Number(value); topic.status = 'awaiting-overlay'; return reply(chatId, '3/3 - Carousel slaytlarında metin olsun mu?', chooseOverlay(topicId)); }
  if (action === 'duration') { topic.durationSeconds = Number(value); topic.status = 'awaiting-overlay'; return reply(chatId, '3/3 - Reel üzerinde kısa metin olsun mu?', chooseOverlay(topicId)); }
  if (action === 'overlay') {
    topic.textOnVisual = value === 'yes'; topic.status = 'brief-ready';
    enqueuePreview(topicId);
    return reply(chatId, `Seçimler kaydedildi.\nFormat: ${topic.format}${topic.slides ? ` (${topic.slides} slayt)` : ''}${topic.durationSeconds ? ` (${topic.durationSeconds} sn)` : ''}\nGörsel metni: ${topic.textOnVisual ? 'evet' : 'hayır'}\n\nİçerik brief'i hazır. Önizleme hazırlanıyor; tamamlandığında bu sohbete gönderilecek.`);
  }
  if (action === 'review') {
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
}

async function processUpdates(timeout = 0) {
  const updates = await api(`getUpdates?offset=${state.offset}&timeout=${timeout}`);
  for (const update of updates) {
    state.offset = update.update_id + 1;
    if (update.callback_query) await handleCallback(update.callback_query);
    const message = update.message;
    if (message && String(message.chat.id) === allowedChatId && message.text?.trim()) {
      const text = message.text.trim();
      if (text === '/start') await reply(message.chat.id, 'Instagram içerik sistemi hazır. Bana konuyu yaz; sonra otomatik veya adım adım seç.');
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
        const id = String(update.update_id);
        state.topics[id] = { topic: text, receivedAt: new Date().toISOString(), chatId: message.chat.id, status: 'awaiting-mode' };
        await reply(message.chat.id, `Konu alındı:\n${text}\n\nNasıl ilerleyelim?`, [[{ text: 'Otomatik oluştur', callback_data: `auto:${id}` }], [{ text: 'Adım adım oluştur', callback_data: `guided:${id}` }]]);
        }
      }
    }
    save();
  }
  return updates.length;
}

if (process.argv.includes('--watch')) {
  console.log('Telegram dinleyicisi çalışıyor. Durdurmak için Ctrl+C.');
  while (true) await processUpdates(20);
} else {
  console.log(`Processed ${await processUpdates()} Telegram update(s).`);
}
