import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve(import.meta.dirname, '..');
const policy = JSON.parse(fs.readFileSync(path.join(root, 'config', 'free-tier-policy.json'), 'utf8'));
const usagePath = path.join(root, 'data', 'usage.json');
const [command, source, action] = process.argv.slice(2);
if (!['status', 'check', 'record'].includes(command)) throw new Error('Usage: quota-guard.mjs <status|check|record> [source] [search|download]');

fs.mkdirSync(path.dirname(usagePath), { recursive: true });
const usage = fs.existsSync(usagePath) ? JSON.parse(fs.readFileSync(usagePath, 'utf8')) : {};
const today = new Date().toISOString().slice(0, 10);
const month = today.slice(0, 7);
const key = `${source}:${action}`;

if (command === 'status') {
  console.log(JSON.stringify({ policy, usage }, null, 2));
  process.exit();
}
if (!policy.sources[source] || !['search', 'download'].includes(action)) throw new Error('Unknown source or action.');
const limits = policy.sources[source];
if (!limits.enabled) throw new Error(`${source} is disabled by free-tier policy.`);
const suffix = action === 'search' ? 'Searches' : 'Downloads';
const dailyLimit = limits[`daily${suffix}`];
const monthlyLimit = limits[`monthly${suffix}`];
const dailyCount = usage[`${today}:${key}`] ?? 0;
const monthlyCount = usage[`${month}:${key}`] ?? 0;
if (dailyCount >= dailyLimit || monthlyCount >= monthlyLimit) {
  throw new Error(`Quota guard blocked ${source} ${action}: daily ${dailyCount}/${dailyLimit}, monthly ${monthlyCount}/${monthlyLimit}.`);
}
if (command === 'record') {
  usage[`${today}:${key}`] = dailyCount + 1;
  usage[`${month}:${key}`] = monthlyCount + 1;
  fs.writeFileSync(usagePath, JSON.stringify(usage, null, 2));
}
console.log(`Allowed ${source} ${action}: daily ${dailyCount}/${dailyLimit}, monthly ${monthlyCount}/${monthlyLimit}.`);
