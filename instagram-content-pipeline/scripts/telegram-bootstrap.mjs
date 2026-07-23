import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve(import.meta.dirname, '..');
const envPaths = [path.join(root, '.env.local'), path.join(root, '..', '.env.local')];
const env = {};
for (const envPath of envPaths) {
  if (!fs.existsSync(envPath)) continue;
  for (const line of fs.readFileSync(envPath, 'utf8').split(/\r?\n/)) {
    if (!line || line.startsWith('#')) continue;
    const index = line.indexOf('=');
    if (index > 0) env[line.slice(0, index)] ||= line.slice(index + 1);
  }
}
if (!env.TELEGRAM_BOT_TOKEN) throw new Error('TELEGRAM_BOT_TOKEN boş.');

const meResponse = await fetch(`https://api.telegram.org/bot${env.TELEGRAM_BOT_TOKEN}/getMe`);
const me = await meResponse.json();
if (!me.ok) throw new Error('Telegram bot bilgisi alınamadı. Token ayarını kontrol et.');
const response = await fetch(`https://api.telegram.org/bot${env.TELEGRAM_BOT_TOKEN}/getUpdates?limit=10`);
const data = await response.json();
if (!data.ok) throw new Error('Telegram güncellemeleri alınamadı. Token veya bot ayarını kontrol et.');
const chats = [...new Map(data.result.map((item) => item.message?.chat).filter(Boolean).map((chat) => [chat.id, { id: chat.id, type: chat.type, username: chat.username ?? null }])).values()];
if (!chats.length) {
  console.log(JSON.stringify({ botUsername: me.result.username, chats: [], nextStep: 'Bu botu Telegram’da açıp /start gönder.' }, null, 2));
  process.exit();
}
console.log(JSON.stringify({ botUsername: me.result.username, chats }, null, 2));
