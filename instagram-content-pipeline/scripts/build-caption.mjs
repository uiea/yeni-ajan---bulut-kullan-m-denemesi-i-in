import fs from 'node:fs';
import path from 'node:path';

const [topicId, headline = 'İçerik önizlemesi'] = process.argv.slice(2);
if (!topicId) throw new Error('Usage: build-caption.mjs <topic-id> [headline]');

const root = path.resolve(import.meta.dirname, '..');
const state = JSON.parse(fs.readFileSync(path.join(root, 'data', 'telegram-state.json'), 'utf8'));
const topic = state.topics[topicId];
if (!topic) throw new Error('Konu bulunamadı.');

const caption = `${headline}\n\n${topic.topic} artık yalnızca bir teknoloji başlığı değil; üretme, öğrenme ve karar alma biçimimizi dönüştüren yeni bir alan.\n\nAsıl soru şu: Bunu işinde veya hayatında nasıl daha doğru kullanacaksın?\n\nSen en çok hangi alanda kullanıyorsun?\n\n#YapayZeka #ArtificialIntelligence #Teknoloji #DijitalDönüşüm #Gelecek #YapayZekaAraçları #ÜretkenYapayZeka #AI`;
const packageDir = path.join(root, 'packages', `telegram-${topicId}`);
fs.mkdirSync(packageDir, { recursive: true });
fs.writeFileSync(path.join(packageDir, 'caption.txt'), caption, 'utf8');

topic.headline = headline;
topic.captionPath = path.join('packages', `telegram-${topicId}`, 'caption.txt');
topic.status = 'awaiting-review';
fs.writeFileSync(path.join(root, 'data', 'telegram-state.json'), JSON.stringify(state, null, 2));
console.log(path.join(packageDir, 'caption.txt'));
