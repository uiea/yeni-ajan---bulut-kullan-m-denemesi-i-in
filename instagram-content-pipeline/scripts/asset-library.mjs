import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';

const root = path.resolve(import.meta.dirname, '..');
const indexPath = path.join(root, 'library', 'asset-index.json');
const policy = JSON.parse(fs.readFileSync(path.join(root, 'config', 'reuse-policy.json'), 'utf8'));
const [command, ...args] = process.argv.slice(2);
const index = JSON.parse(fs.readFileSync(indexPath, 'utf8'));
const now = new Date();
const daysSince = (date) => date ? (now - new Date(date)) / 86_400_000 : Infinity;

const save = () => fs.writeFileSync(indexPath, JSON.stringify(index, null, 2));
const get = (id) => index.assets.find((asset) => asset.id === id);

if (command === 'register') {
  const metadataPath = args[0];
  if (!metadataPath || !fs.existsSync(metadataPath)) throw new Error('Usage: asset-library.mjs register <metadata.json>');
  const metadata = JSON.parse(fs.readFileSync(metadataPath, 'utf8'));
  for (const key of ['filePath', 'type', 'provider', 'sourceUrl', 'creator', 'licenseNote']) {
    if (!metadata[key]) throw new Error(`Metadata missing ${key}.`);
  }
  const asset = { id: crypto.randomUUID(), tags: [], derivatives: [], usage: [], addedAt: now.toISOString(), ...metadata };
  index.assets.push(asset);
  save();
  console.log(asset.id);
} else if (command === 'recommend') {
  const format = args[0];
  if (!format) throw new Error('Usage: asset-library.mjs recommend <format>');
  const allowedTypes = Object.entries(policy.allowFormats).filter(([, formats]) => formats.includes(format)).map(([type]) => type);
  const candidates = index.assets.filter((asset) => allowedTypes.includes(asset.type))
    .filter((asset) => daysSince(asset.lastUsedAt) >= policy.assetCooldownDays)
    .filter((asset) => asset.derivatives.length < policy.maxDerivativesPerAsset)
    .sort((a, b) => (a.usage?.length ?? 0) - (b.usage?.length ?? 0));
  console.log(JSON.stringify(candidates.slice(0, policy.maxAssetsPerContentPackage), null, 2));
} else if (command === 'mark-used') {
  const [id, variant, packageId = 'manual'] = args;
  const asset = get(id);
  if (!asset || !variant) throw new Error('Usage: asset-library.mjs mark-used <asset-id> <variant> [package-id]');
  const sameVariant = asset.usage.find((entry) => entry.variant === variant && daysSince(entry.usedAt) < policy.sameVariantCooldownDays);
  if (sameVariant) throw new Error(`Variant '${variant}' is still in cooldown.`);
  asset.usage.push({ variant, packageId, usedAt: now.toISOString() });
  asset.lastUsedAt = now.toISOString();
  if (!asset.derivatives.includes(variant)) asset.derivatives.push(variant);
  save();
  console.log(`Registered ${variant} usage for ${id}.`);
} else if (command === 'status') {
  console.log(JSON.stringify({ policy, assets: index.assets.length }, null, 2));
} else {
  throw new Error('Commands: register, recommend, mark-used, status');
}
