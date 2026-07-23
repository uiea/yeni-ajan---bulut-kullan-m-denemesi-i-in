import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';

const root = path.resolve(import.meta.dirname, '..');
const state = JSON.parse(fs.readFileSync(path.join(root, 'data', 'telegram-state.json'), 'utf8'));
const packageRoot = path.join(root, 'packages');
const entries = [];
for (const dir of fs.readdirSync(packageRoot, { withFileTypes: true }).filter((item) => item.isDirectory() && item.name.startsWith('telegram-'))) {
  const topicId = dir.name.slice('telegram-'.length);
  const topic = state.topics[topicId];
  const packageDir = path.join(packageRoot, dir.name);
  const provenancePath = path.join(packageDir, 'provenance.json');
  if (!fs.existsSync(provenancePath)) continue;
  const provenance = JSON.parse(fs.readFileSync(provenancePath, 'utf8'));
  const captionPath = path.join(packageDir, 'caption.txt');
  const caption = fs.existsSync(captionPath) ? fs.readFileSync(captionPath, 'utf8').trim() : '';
  const assetId = String(provenance.assetId ?? provenance.sourceUrl?.match(/-(\d+)\/?$/)?.[1] ?? '');
  entries.push({ topicId, createdAt: provenance.retrievedAt ?? new Date().toISOString(), family: /yapay zek|artificial intelligence|\bai\b/i.test(topic?.topic ?? '') ? 'ai' : 'generic', source: { provider: provenance.provider, assetId, sourceUrl: provenance.sourceUrl }, headline: topic?.headline ?? '', copyVariant: topic?.copyVariant ?? null, copySignature: topic?.copySignature ?? null, captionHash: caption ? crypto.createHash('sha256').update(caption).digest('hex') : '', hashtags: caption.match(/#[\p{L}\p{N}_]+/gu) ?? [], cta: caption.split(/\r?\n\r?\n/).at(-2) ?? '' });
}
fs.writeFileSync(path.join(root, 'data', 'content-history.json'), JSON.stringify({ entries }, null, 2));
console.log(`${entries.length} geçmiş içerik kaydı oluşturuldu.`);
