import fs from 'node:fs';
import path from 'node:path';
import { reportProgress } from './telegram-progress.mjs';

const [topicId] = process.argv.slice(2);
if (!topicId) throw new Error('Usage: fetch-pexels-asset.mjs <topic-id>');

const root = path.resolve(import.meta.dirname, '..');
const loadEnv = () => {
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
const env = loadEnv();
if (!env.PEXELS_API_KEY) throw new Error('PEXELS_API_KEY bulunamadı.');

const statePath = path.join(root, 'data', 'telegram-state.json');
const state = JSON.parse(fs.readFileSync(statePath, 'utf8'));
const topic = state.topics[topicId];
if (!topic) throw new Error('Konu bulunamadı.');
if (!['stock', 'mixed'].includes(topic.mediaSource)) throw new Error('Bu konu stok medya kullanacak şekilde seçilmedi.');
const buildSearchQuery = (text) => {
  const normalized = text.toLocaleLowerCase('tr-TR');
  if (/yapay zek|artificial intelligence|\bai\b/.test(normalized)) return 'futuristic abstract blue light waves background';
  if (/iş hayat|kariyer|çalışma hayat/.test(normalized)) return 'modern business workplace';
  if (/sağlık|tıp|medikal/.test(normalized)) return 'healthcare technology';
  if (/eğitim|öğrenme/.test(normalized)) return 'education learning technology';
  if (/finans|ekonomi|yatırım/.test(normalized)) return 'finance technology data';
  return text;
};
const unwantedVisualTextTerms = /\b(text|code|coding|programming|screen|monitor|sign|signage|logo|letter|word|keyboard|terminal)\b/i;
const chooseCandidate = (photos) => {
  const filtered = photos.filter((photo) => !unwantedVisualTextTerms.test(`${photo.alt ?? ''} ${photo.url ?? ''}`));
  const portrait = filtered.filter((photo) => photo.height >= photo.width);
  return (portrait[0] ?? filtered[0] ?? null);
};

const policy = JSON.parse(fs.readFileSync(path.join(root, 'config', 'free-tier-policy.json'), 'utf8'));
const usagePath = path.join(root, 'data', 'usage.json');
const usage = fs.existsSync(usagePath) ? JSON.parse(fs.readFileSync(usagePath, 'utf8')) : {};
const today = new Date().toISOString().slice(0, 10);
const month = today.slice(0, 7);
const ensureQuota = (action) => {
  const limits = policy.sources.pexels;
  const suffix = action === 'search' ? 'Searches' : 'Downloads';
  const dailyKey = `${today}:pexels:${action}`;
  const monthlyKey = `${month}:pexels:${action}`;
  if ((usage[dailyKey] ?? 0) >= limits[`daily${suffix}`] || (usage[monthlyKey] ?? 0) >= limits[`monthly${suffix}`]) {
    throw new Error(`Pexels ${action} kotası doldu.`);
  }
  return { dailyKey, monthlyKey };
};
const recordQuota = (keys) => {
  usage[keys.dailyKey] = (usage[keys.dailyKey] ?? 0) + 1;
  usage[keys.monthlyKey] = (usage[keys.monthlyKey] ?? 0) + 1;
  fs.writeFileSync(usagePath, JSON.stringify(usage, null, 2));
};

const searchQuota = ensureQuota('search');
const searchQuery = buildSearchQuery(topic.topic);
await reportProgress(root, topicId, 75, 'Pexels’te uygun görsel aranıyor.', [
  'Kaynak: Pexels',
  `Arama terimi: ${searchQuery}`,
  'Dikey format önceliklendiriliyor'
]);
const query = encodeURIComponent(searchQuery);
const search = await fetch(`https://api.pexels.com/v1/search?query=${query}&orientation=portrait&size=large&per_page=${policy.sourceRotation.maxCandidatesPerSearch}`, {
  headers: { Authorization: env.PEXELS_API_KEY }
});
const payload = await search.json();
if (!search.ok || !payload.photos?.length) throw new Error('Pexels uygun görsel döndürmedi.');
recordQuota(searchQuota);
await reportProgress(root, topicId, 80, 'Aday görseller filtreleniyor.', [
  `${payload.photos.length} aday bulundu`,
  'Metin, ekran, tabela ve logo riski metadata üzerinden eleniyor'
]);

const photo = chooseCandidate(payload.photos);
if (!photo) throw new Error('Pexels adaylarının tamamı görsel metin/ekran riski nedeniyle elendi. Yeni arama terimi gerekir.');
const imageUrl = photo.src.large2x ?? photo.src.large;
const downloadQuota = ensureQuota('download');
await reportProgress(root, topicId, 85, 'Seçilen görsel indiriliyor.', [
  `Seçilen aday: Pexels #${photo.id}`,
  'Kaynak bilgileri saklanacak'
]);
const assetResponse = await fetch(imageUrl);
if (!assetResponse.ok) throw new Error('Seçilen Pexels görseli indirilemedi.');
const contentType = assetResponse.headers.get('content-type') ?? 'image/jpeg';
const extension = contentType.includes('png') ? 'png' : 'jpg';
const packageDir = path.join(root, 'packages', `telegram-${topicId}`);
fs.mkdirSync(packageDir, { recursive: true });
const filePath = path.join(packageDir, `source-pexels-${photo.id}.${extension}`);
fs.writeFileSync(filePath, Buffer.from(await assetResponse.arrayBuffer()));
recordQuota(downloadQuota);
await reportProgress(root, topicId, 90, 'Kaynak ve lisans kaydı oluşturuluyor.', [
  `Fotoğrafçı: ${photo.photographer}`,
  'Provenance kaydı hazırlanıyor'
]);

const provenance = {
  provider: 'Pexels',
  sourceUrl: photo.url,
  creator: photo.photographer,
  creatorUrl: photo.photographer_url,
  licenseNote: 'Pexels License; source metadata retained for review.',
  retrievedAt: new Date().toISOString(),
  query: topic.topic,
  providerSearchQuery: searchQuery,
  candidateReview: {
    candidatesReturned: payload.photos.length,
    candidatesRejectedForMetadataRisk: payload.photos.filter((item) => unwantedVisualTextTerms.test(`${item.alt ?? ''} ${item.url ?? ''}`)).map((item) => item.id),
    selectedCandidateId: photo.id,
    rule: 'Prefer portrait candidates without metadata indicators of visible text, code, screens, signs, or logos.'
  },
  localFile: path.relative(root, filePath)
};
fs.writeFileSync(path.join(packageDir, 'provenance.json'), JSON.stringify(provenance, null, 2));
const transformationsPath = path.join(packageDir, 'transformations.json');
fs.writeFileSync(transformationsPath, JSON.stringify({
  sourceFile: provenance.localFile,
  sanitizationStatus: 'pending-visual-review',
  operations: [],
  policy: 'config/media-sanitization-policy.json'
}, null, 2));
topic.status = 'asset-ready';
topic.asset = { provider: 'pexels', filePath: provenance.localFile, provenancePath: path.relative(root, path.join(packageDir, 'provenance.json')), transformationsPath: path.relative(root, transformationsPath) };
fs.writeFileSync(statePath, JSON.stringify(state, null, 2));
await reportProgress(root, topicId, 92, 'Kaynak görsel hazır.', [
  'Görsel uygunluk kontrolünden geçti',
  'Başlık, açıklama ve hashtag paketi hazırlanacak'
]);
console.log(JSON.stringify({ topicId, filePath: provenance.localFile, provenance }, null, 2));
