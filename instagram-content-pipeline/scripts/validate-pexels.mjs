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
if (!env.PEXELS_API_KEY) throw new Error('PEXELS_API_KEY bulunamadı.');

const response = await fetch('https://api.pexels.com/v1/search?query=technology&per_page=1', {
  headers: { Authorization: env.PEXELS_API_KEY }
});
const payload = await response.json().catch(() => ({}));
console.log(JSON.stringify({ ok: response.ok, status: response.status, resultCount: Array.isArray(payload.photos) ? payload.photos.length : null }));
if (!response.ok) process.exitCode = 1;
