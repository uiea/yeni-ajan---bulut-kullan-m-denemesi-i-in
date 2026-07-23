import fs from 'node:fs';
import path from 'node:path';

const [file, topicId] = process.argv.slice(2);
if (!file || !topicId || !fs.existsSync(file)) throw new Error('Usage: telegram-send-media-candidate.mjs <file> <topic-id>');
const root = path.resolve(import.meta.dirname, '..');
const env = {};
for (const envFile of [path.join(root, '.env.local'), path.join(root, '..', '.env.local')]) {
  if (!fs.existsSync(envFile)) continue;
  for (const line of fs.readFileSync(envFile, 'utf8').split(/\r?\n/)) { const index = line.indexOf('='); if (index > 0 && !line.startsWith('#')) env[line.slice(0, index)] ||= line.slice(index + 1); }
}
const state = JSON.parse(fs.readFileSync(path.join(root, 'data', 'telegram-state.json'), 'utf8'));
const topic = state.topics[topicId];
const body = new FormData();
body.set('chat_id', env.TELEGRAM_ALLOWED_CHAT_ID);
body.set('caption', `Görsel adayı hazır.\n\nBu görseli içerikte kullanalım mı?\nKaynak: ${topic.assetCandidate?.provider ?? 'Pexels'}`);
body.set('photo', new Blob([fs.readFileSync(file)]), path.basename(file));
body.set('reply_markup', JSON.stringify({ inline_keyboard: [[{ text: 'Bu görseli kullan', callback_data: `asset:approve:${topicId}` }], [{ text: 'Başka görsel ara', callback_data: `asset:next:${topicId}` }], [{ text: 'İptal', callback_data: `cancel:${topicId}` }]] }));
const response = await fetch(`https://api.telegram.org/bot${env.TELEGRAM_BOT_TOKEN}/sendPhoto`, { method: 'POST', body });
const result = await response.json();
if (!result.ok) throw new Error('Görsel adayı Telegram’a gönderilemedi.');
console.log('Media candidate sent.');
