import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve(import.meta.dirname, '..');
const timestamp = new Date().toISOString();
const statePath = path.join(root, 'data', 'telegram-state.json');
const state = JSON.parse(fs.readFileSync(statePath, 'utf8'));
const terminal = new Set(['instagram-ready', 'published', 'archived', 'cancelled']);
let cancelledTopics = 0;
for (const topic of Object.values(state.topics)) {
  if (!terminal.has(topic.status)) {
    topic.status = 'cancelled';
    topic.cancelledAt = timestamp;
    cancelledTopics += 1;
  }
}
fs.writeFileSync(statePath, JSON.stringify(state, null, 2));

const queuePath = path.join(root, 'data', 'preview-queue.json');
let cancelledJobs = 0;
if (fs.existsSync(queuePath)) {
  const queue = JSON.parse(fs.readFileSync(queuePath, 'utf8'));
  for (const job of queue.jobs) {
    if (!['sent', 'archived', 'cancelled'].includes(job.status)) {
      job.status = 'cancelled';
      job.cancelledAt = timestamp;
      cancelledJobs += 1;
    }
  }
  fs.writeFileSync(queuePath, JSON.stringify(queue, null, 2));
}

console.log(JSON.stringify({ cancelledTopics, cancelledJobs }));
