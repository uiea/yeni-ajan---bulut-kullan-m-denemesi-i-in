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
const state = JSON.parse(fs.readFileSync(path.join(root, 'data', 'telegram-state.json'), 'utf8'));
const response = await fetch(`https://api.telegram.org/bot${env.TELEGRAM_BOT_TOKEN}/getUpdates?offset=${state.offset}`);
const payload = await response.json();
if (!payload.ok) throw new Error('Telegram güncellemeleri okunamadı.');
console.log(JSON.stringify(payload.result.map((update) => ({
  updateId: update.update_id,
  callback: update.callback_query?.data ?? null,
  text: update.message?.text ?? null
})), null, 2));
