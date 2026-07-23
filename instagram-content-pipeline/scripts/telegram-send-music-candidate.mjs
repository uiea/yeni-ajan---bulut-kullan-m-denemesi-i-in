import fs from 'node:fs';
import path from 'node:path';

const [topicId, trackId] = process.argv.slice(2);
if (!topicId || !trackId) throw new Error('Usage: telegram-send-music-candidate.mjs <topic-id> <track-id>');
const root = path.resolve(import.meta.dirname, '..');
const catalog = JSON.parse(fs.readFileSync(path.join(root, 'library', 'music', 'catalog.json'), 'utf8'));
const track = catalog.tracks.find((item) => item.id === trackId);
if (!track) throw new Error('Ses parçası müzik kütüphanesinde bulunamadı.');
const audioPath = path.join(root, track.filePath);
if (!fs.existsSync(audioPath)) throw new Error('Onaylı ses dosyası bulunamadı.');
const env = {};
for (const envFile of [path.join(root, '.env.local'), path.join(root, '..', '.env.local')]) {
  if (!fs.existsSync(envFile)) continue;
  for (const line of fs.readFileSync(envFile, 'utf8').split(/\r?\n/)) { const index = line.indexOf('='); if (index > 0 && !line.startsWith('#')) env[line.slice(0, index)] ||= line.slice(index + 1); }
}
const body = new FormData();
body.set('chat_id', env.TELEGRAM_ALLOWED_CHAT_ID);
body.set('audio', new Blob([fs.readFileSync(audioPath)]), path.basename(audioPath));
body.set('title', track.title);
if (track.creator) body.set('performer', track.creator);
body.set('caption', `Ses adayı: ${track.title}\nKaynak: ${track.source}\nLisans: ${track.license}\n\nÖnce dinle, sonra seçimini yap.`);
body.set('reply_markup', JSON.stringify({ inline_keyboard: [[{ text: 'Bu sesi kullan', callback_data: `music:approve:${topicId}` }], [{ text: 'Başka ses ara', callback_data: `music:next:${topicId}` }], [{ text: 'Sessiz Reel', callback_data: `music:silent:${topicId}` }], [{ text: 'İptal', callback_data: `cancel:${topicId}` }]] }));
const response = await fetch(`https://api.telegram.org/bot${env.TELEGRAM_BOT_TOKEN}/sendAudio`, { method: 'POST', body });
const result = await response.json();
if (!result.ok) throw new Error('Ses adayı Telegram’a gönderilemedi.');
console.log(`Music candidate sent: ${trackId}`);
