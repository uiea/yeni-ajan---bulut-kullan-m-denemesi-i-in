import fs from 'node:fs';
import path from 'node:path';

const loadEnv = (root) => {
  const env = {};
  for (const file of [path.join(root, '.env.local'), path.join(root, '..', '.env.local')]) {
    if (!fs.existsSync(file)) continue;
    for (const line of fs.readFileSync(file, 'utf8').split(/\r?\n/)) {
      const index = line.indexOf('=');
      if (index > 0 && !line.startsWith('#')) env[line.slice(0, index)] ||= line.slice(index + 1);
    }
  }
  return env;
};
const render = (percent, label, steps) => {
  const completed = Math.round(percent / 10);
  const details = steps.map((step) => `• ${step}`).join('\n');
  return `İçerik hazırlanıyor\n[${'█'.repeat(completed)}${'░'.repeat(10 - completed)}] %${percent}\n\nŞu an: ${label}${details ? `\n\nİşlemler:\n${details}` : ''}`;
};

export const reportProgress = async (root, topicId, percent, label, steps = []) => {
  const statePath = path.join(root, 'data', 'telegram-state.json');
  const state = JSON.parse(fs.readFileSync(statePath, 'utf8'));
  const topic = state.topics[topicId];
  if (!topic) throw new Error('İlerleme bildirimi için konu bulunamadı.');
  topic.progress = { percent, label, steps, updatedAt: new Date().toISOString() };
  const env = loadEnv(root);
  const text = render(percent, label, steps);
  if (env.TELEGRAM_BOT_TOKEN && topic.progressMessageId) {
    await fetch(`https://api.telegram.org/bot${env.TELEGRAM_BOT_TOKEN}/editMessageText`, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ chat_id: topic.chatId, message_id: topic.progressMessageId, text, reply_markup: { inline_keyboard: [[{ text: 'İptal', callback_data: `cancel:${topicId}` }]] } })
    }).catch(() => {});
  }
  fs.writeFileSync(statePath, JSON.stringify(state, null, 2));
};
