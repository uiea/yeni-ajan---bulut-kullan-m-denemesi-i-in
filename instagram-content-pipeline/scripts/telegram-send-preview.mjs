import fs from 'node:fs';
import path from 'node:path';

const [file, caption = 'İçerik önizlemesi hazır. İncele, ardından düzeltme veya onay komutu ver.'] = process.argv.slice(2);
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
const response = await fetch(`https://api.telegram.org/bot${env.TELEGRAM_BOT_TOKEN}/sendPhoto`, { method: 'POST', body });
const result = await response.json();
if (!result.ok) throw new Error('Telegram önizlemesi gönderilemedi.');
console.log('Preview sent to allowed Telegram chat.');
