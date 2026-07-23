import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { reportProgress } from './telegram-progress.mjs';

const [topicId, customHeadline] = process.argv.slice(2);
if (!topicId) throw new Error('Usage: build-caption.mjs <topic-id> [headline]');
const root = path.resolve(import.meta.dirname, '..');
const statePath = path.join(root, 'data', 'telegram-state.json');
const state = JSON.parse(fs.readFileSync(statePath, 'utf8'));
const topic = state.topics[topicId];
if (!topic) throw new Error('Konu bulunamadı.');
const historyPath = path.join(root, 'data', 'content-history.json');
const history = fs.existsSync(historyPath) ? JSON.parse(fs.readFileSync(historyPath, 'utf8')) : { entries: [] };
const topicText = topic.topic.trim();
const isAi = /yapay zek|artificial intelligence|\bai\b/i.test(topicText);
const family = isAi ? 'ai' : 'generic';
const ai = {
  headlines: ['Yapay Zekâ: Fikri Harekete Geçir', 'Yapay Zekâ ile Daha Akıllı Başlangıçlar', 'Yapay Zekâ: Küçük Deneme, Büyük Etki', 'Yapay Zekâ ile Yeni Çalışma Ritmi', 'Yapay Zekâ: Meraktan Üretime', 'Yapay Zekâ ile Somut Bir Sonraki Adım'],
  hooks: ['Yapay zekâ, fikirleri daha hızlı test etmek için yeni bir alan açıyor.', 'İyi bir fikir, doğru araçla daha kısa sürede görünür hale gelebilir.', 'Teknolojinin etkisi, onu günlük iş akışına ne kadar bilinçli eklediğimizle büyüyor.', 'Yapay zekâ yalnızca hız değil; daha çok deneme imkânı da sunuyor.', 'Bugünün küçük otomasyonu, yarının daha odaklı çalışma biçimini kurabilir.', 'En iyi başlangıç, büyük plan değil; net bir problem seçmektir.'],
  bodies: ['Asıl değer yalnızca aracı kullanmakta değil; doğru soruyu sorup sonucu gerçek faydaya dönüştürmekte.', 'Araştırma, taslak hazırlama ve tekrar eden işler için küçük deneyler yapmak öğrenmeyi hızlandırır.', 'İnsan muhakemesiyle teknolojiyi birlikte kullandığımızda daha anlamlı sonuçlar ortaya çıkar.', 'Tek bir işi iyileştirmekle başlamak, karmaşık dönüşümü yönetilebilir hale getirir.', 'Doğru bağlam ve net hedef, üretilen çıktının kalitesini doğrudan değiştirir.', 'Süreçteki dar boğazı bulup oradan başlamak, teknolojiyi somut sonuca yaklaştırır.'],
  ctas: ['Sen yapay zekâyı en çok hangi işinde kullanıyorsun?', 'Bugün daha akıllı hale getirebileceğin tekrar eden iş hangisi?', 'İlk denemeni hangi küçük problem üzerinde yapardın?', 'Bu konuda en çok hangi sonucu görmek istersin?', 'Sence yapay zekânın en faydalı kullanım alanı ne?', 'Yorumlara kendi çalışma fikrini bırakır mısın?'],
  hashtags: ['#YapayZeka #UretkenYapayZeka #Teknoloji #DijitalDonusum #Gelecek', '#YapayZeka #AITools #Inovasyon #Verimlilik #DijitalDunya', '#YapayZekaGundemi #Teknoloji #YeniNesil #FikirdenUretime #AI', '#DijitalStrateji #YapayZeka #IsHayati #Teknoloji #Gelisim', '#ArtificialIntelligence #YapayZeka #DijitalGelecek #Inovasyon #Uretkenlik', '#YapayZeka #TeknolojiTrendleri #CalismaHayati #YeniFikirler #Dijitallesme']
};
const generic = {
  headlines: ['Yeni Bir Bakış Açısı', 'Fikri Bir Adım İleri Taşı', 'Küçük Bir İçgörüyle Başla', 'Meraktan Somut Adıma', 'Yeni Olasılıkları Gör', 'Düşün, Dene, Geliştir'],
  hooks: [`${topicText} üzerine düşünmek, yeni olasılıkları fark etmekle başlar.`, `${topicText} için doğru bakış açısı, sonucu değiştirebilir.`, `${topicText} konusunda küçük bir merak, güçlü bir başlangıca dönüşebilir.`, `${topicText} fikrini somutlaştırmak için ilk adım netliktir.`, `${topicText} üzerine yeni bir soru sormak, farklı bir yol açabilir.`, `${topicText} için en iyi ilerleme, küçük ve düzenli denemelerle gelir.`],
  bodies: ['Küçük bir içgörü, doğru zamanda güçlü bir adıma dönüşebilir.', 'Merak etmek, denemek ve iyileştirmek dönüşümün en sağlam yoludur.', 'Açık bir hedef, fikirleri uygulanabilir hale getirir.', 'İlk taslak mükemmel olmak zorunda değil; ilerlemek için yeterince net olması yeterli.', 'Farklı açılardan bakmak, daha uygulanabilir çözümler üretir.', 'Süreklilik, tek bir büyük hamleden daha kalıcı sonuçlar doğurur.'],
  ctas: ['Bu konuda senin ilk aklına gelen fikir ne?', 'Sen olsan ilk hangi adımı atardın?', 'Kendi deneyimini yorumlarda paylaşır mısın?', 'Bu fikri nerede uygulamak isterdin?', 'Sence en önemli fırsat hangisi?', 'Bir sonraki adımın ne olurdu?'],
  hashtags: ['#Ilham #YeniFikirler #Gelisim #Kesfet #Icerik', '#Fikir #Inovasyon #DijitalDunya #Gelisim #Kesfet', '#IlhamVerici #Uretkenlik #YeniBaslangiclar #Fikirler', '#KisiselGelisim #Merak #FikirdenUretime #Kesfet', '#DijitalDonusum #YeniBakis #Inovasyon #Fikir', '#Gelisim #DeneOgren #YeniFikirler #IcerikUretimi']
};
const set = isAi ? ai : generic;
const usedSignatures = new Set(history.entries.filter((entry) => entry.family === family && entry.topicId !== topicId).map((entry) => entry.copySignature).filter(Boolean));
const seed = Number.parseInt(crypto.createHash('sha256').update(`${topicId}:${topicText}`).digest('hex').slice(0, 8), 16);
let selection;
for (let offset = 0; offset < 216; offset += 1) {
  const n = (seed + offset) % 216;
  const candidate = { headline: n % 6, hook: Math.floor(n / 6) % 6, body: Math.floor(n / 36) % 6, cta: (n * 5 + 1) % 6, hashtags: (n * 3 + 2) % 6 };
  const signature = `${family}:${candidate.headline}-${candidate.hook}-${candidate.body}-${candidate.cta}-${candidate.hashtags}`;
  if (!usedSignatures.has(signature)) { selection = { ...candidate, signature }; break; }
}
if (!selection) throw new Error('Bu içerik ailesi için benzersiz metin kombinasyonu kalmadı; yeni metin havuzu eklenmeli.');
const headline = customHeadline ?? set.headlines[selection.headline];
const caption = `${headline}\n\n${set.hooks[selection.hook]}\n\n${set.bodies[selection.body]}\n\n${set.ctas[selection.cta]}\n\n${set.hashtags[selection.hashtags]}`;
const packageDir = path.join(root, 'packages', `telegram-${topicId}`);
fs.mkdirSync(packageDir, { recursive: true });
fs.writeFileSync(path.join(packageDir, 'caption.txt'), caption, 'utf8');
topic.headline = headline;
topic.copyVariant = selection;
topic.copySignature = selection.signature;
topic.captionPath = path.join('packages', `telegram-${topicId}`, 'caption.txt');
topic.status = 'awaiting-review';
fs.writeFileSync(statePath, JSON.stringify(state, null, 2));
await reportProgress(root, topicId, 95, 'Açıklama ve hashtag paketi hazırlanıyor.', ['Kullanılmamış başlık, kanca ve CTA seçildi', 'Hashtag kombinasyonu geçmişe karşı kontrol edildi'], 80, 'Metin paketi üretimi');
console.log(path.join(packageDir, 'caption.txt'));
