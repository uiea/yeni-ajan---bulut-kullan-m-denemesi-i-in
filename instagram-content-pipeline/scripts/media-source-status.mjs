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

const status = {
  pexels: { ready: Boolean(env.PEXELS_API_KEY), media: ['image', 'video'] },
  pixabay: { ready: Boolean(env.PIXABAY_API_KEY), media: ['image', 'video'] },
  unsplash: { ready: Boolean(env.UNSPLASH_ACCESS_KEY), media: ['image'] },
  aiGeneration: { ready: Boolean(env.AI_IMAGE_PROVIDER), provider: env.AI_IMAGE_PROVIDER || null }
};
console.log(JSON.stringify(status, null, 2));
