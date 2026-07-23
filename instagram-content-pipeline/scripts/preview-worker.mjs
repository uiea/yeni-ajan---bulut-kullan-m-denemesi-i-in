import fs from 'node:fs';
import path from 'node:path';
import { spawn } from 'node:child_process';
import { reportProgress } from './telegram-progress.mjs';

const root = path.resolve(import.meta.dirname, '..');
const queuePath = path.join(root, 'data', 'preview-queue.json');
const statePath = path.join(root, 'data', 'telegram-state.json');
let busy = false;

const loadQueue = () => fs.existsSync(queuePath) ? JSON.parse(fs.readFileSync(queuePath, 'utf8')) : { jobs: [] };
const saveQueue = (queue) => fs.writeFileSync(queuePath, JSON.stringify(queue, null, 2));
const loadState = () => JSON.parse(fs.readFileSync(statePath, 'utf8'));
const run = (command, args, cwd = root) => new Promise((resolve, reject) => {
  const child = spawn(command, args, { cwd, windowsHide: true });
  let stderr = '';
  child.stderr.on('data', (chunk) => { stderr += chunk; });
  child.on('error', reject);
  child.on('close', (code) => code === 0 ? resolve() : reject(new Error(stderr || `${command} exited with code ${code}`)));
});
const markJob = (job, status, extra = {}) => {
  const queue = loadQueue();
  const item = queue.jobs.find((candidate) => candidate.topicId === job.topicId && candidate.queuedAt === job.queuedAt);
  if (item) Object.assign(item, { status, ...extra });
  saveQueue(queue);
};

async function processOne() {
  if (busy) return false;
  const queue = loadQueue();
  const job = queue.jobs.find((candidate) => candidate.status === 'queued');
  if (!job) return false;
  const state = loadState();
  const topic = state.topics[job.topicId];
  if (!topic || topic.status !== 'brief-ready') {
    markJob(job, 'skipped', { skippedAt: new Date().toISOString(), reason: `Topic status is ${topic?.status ?? 'missing'}` });
    return true;
  }
  busy = true;
  markJob(job, 'processing', { startedAt: new Date().toISOString() });
  try {
    if (!['stock', 'mixed'].includes(topic.mediaSource)) throw new Error('Yapay zekâ görsel sağlayıcısı henüz yapılandırılmadı.');
    await reportProgress(root, job.topicId, 72, 'Önizleme işçisi başlatıldı.', ['Kuyruktaki iş işleniyor', `Medya kaynağı: ${topic.mediaSource}`], 10, 'İşçi hazırlığı');
    if ((job.stage ?? 'candidate') === 'candidate') {
      await run(process.execPath, ['scripts/fetch-pexels-asset.mjs', job.topicId]);
      const candidate = loadState().topics[job.topicId];
      await run(process.execPath, ['scripts/telegram-send-media-candidate.mjs', candidate.asset.filePath, job.topicId]);
      markJob(job, 'awaiting-asset-approval', { completedAt: new Date().toISOString(), candidateAssetId: candidate.assetCandidate?.assetId });
      return true;
    }
    const updated = loadState().topics[job.topicId];
    await run(process.execPath, ['scripts/build-caption.mjs', job.topicId]);
    const afterCopy = loadState().topics[job.topicId];
    const packageDir = path.join(root, 'packages', `telegram-${job.topicId}`);
    const previewFile = path.join(packageDir, `single-image-preview-${Date.now()}.png`);
    if (afterCopy.textOnVisual) {
      await reportProgress(root, job.topicId, 97, 'Görsel üstü başlık yerleştiriliyor.', ['Başlık okunabilirlik için koyu panel üzerinde işleniyor'], 45, 'Görsel render');
      await run('powershell.exe', ['-NoProfile', '-ExecutionPolicy', 'Bypass', '-File', 'scripts/add-text-overlay.ps1', '-InputFile', updated.asset.filePath, '-OutputFile', previewFile, '-Headline', afterCopy.headline]);
    } else {
      fs.copyFileSync(path.join(root, updated.asset.filePath), previewFile);
    }
    await reportProgress(root, job.topicId, 99, 'Önizleme Telegram paketine ekleniyor.', ['Açıklama, hashtag ve inceleme butonları hazırlanıyor'], 80, 'Telegram paketi');
    await run(process.execPath, ['scripts/telegram-send-preview.mjs', previewFile, '--caption-file', afterCopy.captionPath, job.topicId]);
    await run(process.execPath, ['scripts/record-content-history.mjs', job.topicId]);
    markJob(job, 'sent', { completedAt: new Date().toISOString(), previewFile: path.relative(root, previewFile) });
  } catch (error) {
    markJob(job, 'failed', { failedAt: new Date().toISOString(), reason: error.message });
    await reportProgress(root, job.topicId, 70, 'Önizleme üretimi durdu.', [`Neden: ${error.message}`, 'Eksik ayarı tamamlayıp işi yeniden kuyruğa al.'], 100, 'İşçi hatası').catch(() => {});
  } finally {
    busy = false;
  }
  return true;
}

if (process.argv.includes('--watch')) {
  console.log('Önizleme işçisi çalışıyor. Durdurmak için Ctrl+C.');
  while (true) {
    try { await processOne(); } catch (error) { console.error(error.message); }
    await new Promise((resolve) => setTimeout(resolve, 5000));
  }
} else {
  await processOne();
}
