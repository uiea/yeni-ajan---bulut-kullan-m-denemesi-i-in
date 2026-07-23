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
const render = (percent, label, steps, activity, operation) => {
  const completed = Math.round(percent / 10);
  const operationCompleted = Math.round(operation.percent / 10);
  const details = steps.map((step) => `• ${step}`).join('\n');
  const statusLines = activity.map((entry) => `• %${entry.percent} — ${entry.label}`).join('\n');
  return `Genel ilerleme\n[${'█'.repeat(completed)}${'░'.repeat(10 - completed)}] %${percent}\n\nŞu anki işlem: ${operation.label}\n[${'█'.repeat(operationCompleted)}${'░'.repeat(10 - operationCompleted)}] %${operation.percent}\n\n${label}${details ? `\n\nİşlem ayrıntıları:\n${details}` : ''}${statusLines ? `\n\nMevcut durum:\n${statusLines}` : ''}`;
};

export const reportProgress = async (root, topicId, percent, label, steps = [], operationPercent = 0, operationLabel = label) => {
  const statePath = path.join(root, 'data', 'telegram-state.json');
  const state = JSON.parse(fs.readFileSync(statePath, 'utf8'));
  const topic = state.topics[topicId];
  if (!topic) throw new Error('İlerleme bildirimi için konu bulunamadı.');
  topic.activity = [...(topic.activity ?? []), { at: new Date().toISOString(), percent, label, steps }].slice(-8);
  topic.progress = { percent, label, steps, operation: { percent: operationPercent, label: operationLabel }, updatedAt: new Date().toISOString() };
  const env = loadEnv(root);
  const text = render(percent, label, steps, topic.activity, topic.progress.operation);
  if (env.TELEGRAM_BOT_TOKEN) {
    const response = await fetch(`https://api.telegram.org/bot${env.TELEGRAM_BOT_TOKEN}/sendMessage`, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ chat_id: topic.chatId, text, reply_markup: { inline_keyboard: [[{ text: 'İptal', callback_data: `cancel:${topicId}` }]] } })
    }).catch(() => null);
    const payload = response ? await response.json().catch(() => null) : null;
    if (payload?.ok) topic.progressMessageId = payload.result.message_id;
  }
  fs.writeFileSync(statePath, JSON.stringify(state, null, 2));
};
