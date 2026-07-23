import fs from 'node:fs';
import path from 'node:path';

export const quotaStatus = (root) => {
  const policy = JSON.parse(fs.readFileSync(path.join(root, 'config', 'free-tier-policy.json'), 'utf8'));
  const usagePath = path.join(root, 'data', 'usage.json');
  const usage = fs.existsSync(usagePath) ? JSON.parse(fs.readFileSync(usagePath, 'utf8')) : {};
  const parts = new Intl.DateTimeFormat('en-CA', { timeZone: 'Europe/Istanbul', year: 'numeric', month: '2-digit', day: '2-digit' }).formatToParts(new Date());
  const value = (name) => parts.find((part) => part.type === name).value;
  const day = `${value('year')}-${value('month')}-${value('day')}`;
  const month = day.slice(0, 7);
  const reset = new Intl.DateTimeFormat('tr-TR', { timeZone: 'Europe/Istanbul', dateStyle: 'short', timeStyle: 'short' }).format(new Date(new Date().toLocaleString('en-US', { timeZone: 'Europe/Istanbul' }).replace(/,.*/, '') + ' 23:59:59'));
  return Object.entries(policy.sources).map(([source, limits]) => ({
    source,
    enabled: limits.enabled,
    search: { used: usage[`${day}:${source}:search`] ?? 0, dailyLimit: limits.dailySearches, monthlyUsed: usage[`${month}:${source}:search`] ?? 0, monthlyLimit: limits.monthlySearches },
    download: { used: usage[`${day}:${source}:download`] ?? 0, dailyLimit: limits.dailyDownloads, monthlyUsed: usage[`${month}:${source}:download`] ?? 0, monthlyLimit: limits.monthlyDownloads },
    nextDailyReset: `${day} 23:59 Europe/Istanbul`, nextMonthlyReset: `${month}-sonu 23:59 Europe/Istanbul`
  }));
};
export const quotaText = (root) => quotaStatus(root).map((item) => {
  const name = item.source[0].toUpperCase() + item.source.slice(1);
  const searchDaily = item.search.dailyLimit - item.search.used;
  const downloadDaily = item.download.dailyLimit - item.download.used;
  const searchMonth = item.search.monthlyLimit - item.search.monthlyUsed;
  const downloadMonth = item.download.monthlyLimit - item.download.monthlyUsed;
  return `${name}\nArama: bugün ${Math.max(0, searchDaily)}/${item.search.dailyLimit}, ay ${Math.max(0, searchMonth)}/${item.search.monthlyLimit}\nİndirme: bugün ${Math.max(0, downloadDaily)}/${item.download.dailyLimit}, ay ${Math.max(0, downloadMonth)}/${item.download.monthlyLimit}\nGünlük sıfırlanma: ${item.nextDailyReset}`;
}).join('\n\n');
export const quotaGuidance = (root) => {
  const status = quotaStatus(root);
  const available = status.filter((item) => item.enabled && item.search.dailyLimit > item.search.used && item.download.dailyLimit > item.download.used).map((item) => item.source);
  const exhausted = status.filter((item) => item.enabled && (item.search.dailyLimit <= item.search.used || item.download.dailyLimit <= item.download.used)).map((item) => item.source);
  const names = (items) => items.map((item) => item[0].toUpperCase() + item.slice(1)).join(', ');
  const lines = [];
  if (available.length) lines.push(`Devam edebilirsin: yeni aday için ${names(available)} kullanılabilir.`);
  if (exhausted.length) lines.push(`Bugün bekletilen kaynaklar: ${names(exhausted)}. Bu kaynaklar İstanbul saatine göre 23:59 sonrası yeniden denenir.`);
  lines.push('API kotası uygun değilse: önceki onaylı görselleri farklı kırpım/başlıkla kullan, yerel medya kütüphanesinden seç veya yapay zekâ görseli seçeneğine geç.');
  lines.push('Tüm kaynaklar doluysa: yeni indirme başlatılmaz; taslak, açıklama, CTA, hashtag ve yayın planı üzerinde çalışmaya devam edebilirsin.');
  return lines.join('\n');
};
