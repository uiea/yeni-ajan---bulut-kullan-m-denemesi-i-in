import fs from 'node:fs';
import path from 'node:path';
import { reportProgress } from './telegram-progress.mjs';

const [topicId, customHeadline] = process.argv.slice(2);
if (!topicId) throw new Error('Usage: build-caption.mjs <topic-id> [headline]');

const root = path.resolve(import.meta.dirname, '..');
const state = JSON.parse(fs.readFileSync(path.join(root, 'data', 'telegram-state.json'), 'utf8'));
const topic = state.topics[topicId];
if (!topic) throw new Error('Konu bulunamadı.');
const historyPath = path.join(root, 'data', 'copy-history.json');
const history = fs.existsSync(historyPath) ? JSON.parse(fs.readFileSync(historyPath, 'utf8')) : { entries: [] };

const hash = [...topicId].reduce((total, char) => total + char.charCodeAt(0), 0);
const topicText = topic.topic.trim();
const isAi = /yapay zek|artificial intelligence|\bai\b/i.test(topicText);
const aiVariants = [
  {
    headline: 'Yapay Zekâ: Yeni Dünyanın Gücü',
    hook: 'Yapay zekâ, fikirleri daha hızlı denemek için güçlü bir alan açıyor.',
    body: 'Asıl değer yalnızca aracı kullanmakta değil; doğru soruyu sorup sonucu gerçek bir faydaya dönüştürmekte.',
    cta: 'Sen yapay zekâyı en çok hangi işinde kullanıyorsun?',
    hashtags: '#YapayZeka #ÜretkenYapayZeka #Teknoloji #DijitalDönüşüm #AI #Gelecek'
  },
  {
    headline: 'Yapay Zekâ: Fikri Harekete Geçir',
    hook: 'Bir fikrin etkisi, ne kadar hızlı test edildiğiyle büyür.',
    body: 'Yapay zekâ; araştırma, üretim ve karar süreçlerinde yeni bir çalışma ritmi sunuyor.',
    cta: 'Bugün hangi tekrar eden işi daha akıllı hale getirebilirsin?',
    hashtags: '#YapayZekaGündemi #AItools #İnovasyon #DijitalGelecek #Verimlilik #Teknoloji'
  },
  {
    headline: 'Yapay Zekâ: Dönüşüm Şimdi Başlıyor',
    hook: 'Teknoloji hızlanıyor; fark yaratan şey onu amaçla buluşturmak.',
    body: 'Küçük denemeler, doğru kullanım alışkanlıklarıyla büyük bir dönüşümün başlangıcı olabilir.',
    cta: 'Yapay zekâdan almak istediğin ilk somut sonuç ne olurdu?',
    hashtags: '#ArtificialIntelligence #YapayZeka #DijitalStrateji #YeniNesilTeknoloji #Geleceğinİşi #AI'
  }
];
const genericVariants = [
  {
    headline: 'Yeni Bir Bakış Açısı',
    hook: `${topicText} üzerine düşünmek, yeni olasılıkları fark etmekle başlar.`,
    body: 'Küçük bir içgörü, doğru zamanda güçlü bir adıma dönüşebilir.',
    cta: 'Bu konuda senin ilk aklına gelen fikir ne?',
    hashtags: '#İlham #YeniFikirler #DijitalDönüşüm #Keşfet #İçerik'
  },
  {
    headline: 'Fikri Bir Adım İleri Taşı',
    hook: `${topicText} için doğru bakış açısı, sonucu değiştirebilir.`,
    body: 'Merak etmek, denemek ve küçük iyileştirmeler yapmak dönüşümün en sağlam yolu.',
    cta: 'Sen olsan ilk hangi adımı atardın?',
    hashtags: '#Fikir #Gelişim #İnovasyon #DijitalDünya #Keşfet'
  }
];
const family = isAi ? 'ai' : 'generic';
const variants = isAi ? aiVariants : genericVariants;
const recentVariants = new Set(history.entries.filter((entry) => entry.family === family && entry.topicId !== topicId).slice(-2).map((entry) => entry.variant));
const preferredVariant = hash % variants.length;
const variantIndex = topic.copyVariant ?? Array.from({ length: variants.length }, (_, offset) => (preferredVariant + offset) % variants.length).find((index) => !recentVariants.has(index)) ?? preferredVariant;
const variant = variants[variantIndex];
const headline = customHeadline ?? variant.headline;
const caption = `${headline}\n\n${variant.hook}\n\n${variant.body}\n\n${variant.cta}\n\n${variant.hashtags}`;
const packageDir = path.join(root, 'packages', `telegram-${topicId}`);
fs.mkdirSync(packageDir, { recursive: true });
fs.writeFileSync(path.join(packageDir, 'caption.txt'), caption, 'utf8');

topic.headline = headline;
topic.copyVariant = variantIndex;
topic.captionPath = path.join('packages', `telegram-${topicId}`, 'caption.txt');
topic.status = 'awaiting-review';
fs.writeFileSync(path.join(root, 'data', 'telegram-state.json'), JSON.stringify(state, null, 2));
history.entries = history.entries.filter((entry) => entry.topicId !== topicId);
history.entries.push({ topicId, family, variant: variantIndex, generatedAt: new Date().toISOString() });
history.entries = history.entries.slice(-50);
fs.writeFileSync(historyPath, JSON.stringify(history, null, 2));
await reportProgress(root, topicId, 95, 'Açıklama ve hashtag paketi hazırlanıyor.', [
  'Farklı kanca ve CTA seçildi',
  'Hashtag tekrarları kontrol edildi'
], 80, 'Metin paketi üretimi');
console.log(path.join(packageDir, 'caption.txt'));
