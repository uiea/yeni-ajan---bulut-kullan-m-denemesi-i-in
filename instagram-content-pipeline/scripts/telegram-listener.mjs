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
const api = async (method, body) => {
  const response = await fetch(`https://api.telegram.org/bot${token}/${method}`, {
    method: body ? 'POST' : 'GET', headers: body ? { 'content-type': 'application/json' } : undefined,
    body: body ? JSON.stringify(body) : undefined
  });
  const data = await response.json();
  if (!data.ok) throw new Error(`Telegram ${method} başarısız.`);
  return data.result;
};
const reply = (chatId, text, keyboard) => api('sendMessage', { chat_id: chatId, text, reply_markup: keyboard ? { inline_keyboard: keyboard } : undefined });

const updates = await api(`getUpdates?offset=${state.offset}&timeout=0`);
for (const update of updates) {
  state.offset = update.update_id + 1;
  const message = update.message;
  if (!message || String(message.chat.id) !== allowedChatId) continue;
  const text = message.text?.trim();
  if (!text) continue;
  if (text === '/start') {
    await reply(message.chat.id, 'Instagram içerik sistemi hazır. Bana yalnızca konuyu yaz; ardından otomatik veya adım adım oluşturma seçeneğini sunacağum.');
    continue;
  }
  const id = String(update.update_id);
  state.topics[id] = { topic: text, receivedAt: new Date().toISOString(), chatId: message.chat.id };
  await reply(message.chat.id, `Konu alındı:\n${text}\n\nNasıl ilerleyelim?`, [
    [{ text: 'Otomatik oluştur', callback_data: `auto:${id}` }],
    [{ text: 'Adım adım oluştur', callback_data: `guided:${id}` }]
  ]);
}
fs.mkdirSync(path.dirname(statePath), { recursive: true });
fs.writeFileSync(statePath, JSON.stringify(state, null, 2));
console.log(`Processed ${updates.length} Telegram update(s).`);
