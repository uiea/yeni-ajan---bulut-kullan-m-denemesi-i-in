import fs from 'node:fs';
import path from 'node:path';
import { reportProgress } from './telegram-progress.mjs';

const args = process.argv.slice(2);
const file = args[0];
let caption = 'İçerik önizlemesi hazır. İncele, ardından düzeltme veya onay komutu ver.';
let topicId;
if (args[1] === '--caption-file') {
  if (!args[2] || !fs.existsSync(args[2])) throw new Error('Caption dosyası bulunamadı.');
  caption = fs.readFileSync(args[2], 'utf8');
  topicId = args[3];
} else {
  caption = args[1] ?? caption;
  topicId = args[2];
}
if (!file || !fs.existsSync(file)) throw new Error('Usage: telegram-send-preview.mjs <file> [caption]');
const root = path.resolve(import.meta.dirname, '..');
const env = {};
for (const envFile of [path.join(root, '.env.local'), path.join(root, '..', '.env.local')]) {
  if (!fs.existsSync(envFile)) continue;
  for (const line of fs.readFileSync(envFile, 'utf8').split(/\r?\n/)) {
    const index = line.indexOf('=');
    if (index > 0 && !line.startsWith('#')) env[line.slice(0, index)] ||= line.slice(index + 1);
  }
}
if (!env.TELEGRAM_BOT_TOKEN || !env.TELEGRAM_ALLOWED_CHAT_ID) throw new Error('Telegram ayarları eksik.');

const body = new FormData();
body.set('chat_id', env.TELEGRAM_ALLOWED_CHAT_ID);
body.set('caption', caption.slice(0, 1024));
body.set('photo', new Blob([fs.readFileSync(file)]), path.basename(file));
if (topicId) {
  body.set('reply_markup', JSON.stringify({ inline_keyboard: [
    [{ text: 'Instagram’da yayınla', callback_data: `review:publish-request:${topicId}` }],
    [{ text: 'Düzeltme iste', callback_data: `review:revise:${topicId}` }],
    [{ text: 'İptal', callback_data: `cancel:${topicId}` }]
  ] }));
}
const response = await fetch(`https://api.telegram.org/bot${env.TELEGRAM_BOT_TOKEN}/sendPhoto`, { method: 'POST', body });
const result = await response.json();
if (!result.ok) throw new Error('Telegram önizlemesi gönderilemedi.');
if (topicId) {
  const statePath = path.join(root, 'data', 'telegram-state.json');
  if (fs.existsSync(statePath)) {
    const state = JSON.parse(fs.readFileSync(statePath, 'utf8'));
    const topic = state.topics[topicId];
    if (topic) topic.previewFilePath = path.relative(root, path.resolve(file));
    if (topic) topic.progress = { percent: 100, label: 'Önizleme hazır.', updatedAt: new Date().toISOString() };
    fs.writeFileSync(statePath, JSON.stringify(state, null, 2));
    await reportProgress(root, topicId, 100, 'Önizleme Telegram’a gönderildi.', ['İnceleme ve onay bekleniyor'], 100, 'Telegram önizleme gönderimi');
  }
}
console.log('Preview sent to allowed Telegram chat.');
