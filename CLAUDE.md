# Çalışma Alanın

Bu dosya çalışma alanının beynidir. Claude Code burada her başladığında bu dosyayı otomatik
okur. Sana kim olduğunu, hangi ajanların var olduğunu ve herkesin uyduğu kuralları anlatır.

Bunu ilk defa kuruyorsun. Bütün mesele de bu. Aşağıdaki tek ajanla başla ve gerisini onunla
kendin kur.

## Diller (önemli)

- **Bu dosya (CLAUDE.md) ve ajan klasör isimleri Türkçe** - çünkü en çok okunan, sistemi
  öğrenmeni sağlayan giriş katmanı bunlar.
- **Ajanların iç dosyaları İngilizce** (`AGENT.md`, `HEARTBEAT.md`, `MEMORY.md`, `skills/*.md`,
  ayrıca `README.md`, `context.md` ve `şablonlar/` dosyaları). Bunlar taşınabilir, model-bağımsız
  kalsın diye İngilizce yazılır. Bu, dünyanın her yerinde geçerli "gerçek" ajan formatını da
  öğretir.
- **Ajanın üyeyle konuşması (taslak, plan, yanıt, çıktı) her zaman Türkçe** - üye başka bir dilde
  yazmadıkça.

## Adım 0: Önce bağlamı oku

Herhangi bir şey yapmadan önce `context.md` dosyasını oku. İçinde üyenin kim olduğu, hedefi ve
rotası var. Her ajan, kimin için çalıştığını bildiğinde daha iyi çalışır. (Bu, önceki dersteki
"context engineering" fikrinin gerçek bir çalışma alanına uygulanmış hali.)

## Yönlendirme nasıl çalışır

Bir istek geldiğinde:

1. İsteği aşağıdaki tablodaki bir ajanla eşleştir.
2. O ajanın `AGENT.md` dosyasını açıp görevini ve kurallarını anla.
3. `skills/` klasöründeki doğru skill'i bul, oku ve uygula.

Üyeye hangi ajanı kullanacağını asla sorma. İstekten kendin çıkar.

| Ajan | Yol | Görevi |
|------|-----|--------|
| Ajan Kurucu | `ajanlar/ajan-kurucu/ajan-kurucu/` | Üyeyle konuşur, sonra ona ait yepyeni bir ajanı tasarlar, kurar ve doğrular. Çalışma alanını büyütmek için kullandığın ajan budur. |
| Tasarım | `ajanlar/tasarim/` | Fotoğraf veya bağlamdan, üyenin tasarım çizgisinde kartvizit ve eğitici sosyal medya görselleri üretir; çıktıları `çıktılar/` klasörüne kaydeder. |
| Sosyal Medya İçerik | `ajanlar/sosyal-medya-icerik/` | Notion'daki `hedepler` kaynağını yalnızca okuyarak Instagram için içerik fikri, taslak ve yerel takvim hazırlar; yayın yapmaz. |
| Milyoner Dönüşüm Partneri | `ajanlar/milyoner-mentalite-donusum-ajani/` | Amaç, niş, AI ile gelir ve kişisel gelişim için 30 günlük keşif rotası oluşturmaya yardımcı olur; profil güncellemeleri için önce onay alır. |
| Web Sitesi Yönetimi | `ajanlar/web-sitesi-yonetimi/` | Her müşteri için ayrı bir skill ve her proje için merkezi yerel klasör oluşturarak web sitesi çalışmalarını düzenler. |
| Karar Yakalama | `ajanlar/karar-yakalama/` | Tüm ajanların önemli ve onaylanmış kararlarını merkezi kayda alır; ilgili müşteri ve proje belgelerine yönlendirir. |
| Local Bilgisayar | `ajanlar/local-bilgisayar/` | Yerel çalışma alanı ve GitHub eşitleme durumunu denetler, sorunları raporlar. |

> Bu tablo bilerek tek satırla başlıyor. Üye, Ajan Kurucu ile yeni ajanlar kurdukça her biri için
> buraya bir satır ekle. Çalışma alanı bu tabloyla düzenli kalır.

## Hazır uzmanlık becerileri

`.agents/` dizini, yeni ya da mevcut ajanlara eklenebilecek hazır uzmanlık becerileri kütüphanesidir.
İstek aşağıdaki alanlardan birine giriyorsa, önce ilgili Markdown dosyasını oku; ardından görevi
mevcut ajan kuralları ve kullanıcı bağlamıyla birlikte uygula.

| Alan | Yol | Kapsam |
|------|-----|--------|
| YouTube | `.agents/youtube/` | Araştırma, senaryo, SEO, küçük resim ve yorum analizi |
| İçerik dönüşümü | `.agents/social-media/` | Kısa video, Reels, TikTok, LinkedIn, carousel ve X içerikleri |
| Görsel anlatım | `.agents/visuals/` | Veri açıklayıcıları, karşılaştırmalar, grafikler, hareketli içerik ve sunumlar |
| Satış | `.agents/hey-sales/` | CRM, takip, lead değerlendirme ve satış stratejisi |
| Strateji | `.agents/hey-strategist/` | Finansal analiz, büyüme hipotezleri, satış ve maliyet analizi |
| Instagram | `.agents/instagram/` | Reels, carousel, caption, tekil görsel ve performans araştırması |
| Meta reklamları | `.agents/meta-ads/` | Kreatif, hedef kitle, bütçe, kampanya ve performans analizi |
| Asistanlık | `.agents/secretary/` | Günlük brifing, e-posta özeti, öncelik ve haftalık değerlendirme |
| X / Twitter | `.agents/twitter/` | Tweet, thread, yanıt araştırması ve performans analizi |

Bu dosyalar yeni ajan oluşturmaz; ilgili ajanın `skills/` klasörüne uyarlanabilecek kaynaklardır.
Herhangi bir paylaşım, yükleme, API çağrısı, CRM/e-posta kaydı veya reklam hesabı değişikliği içeren
skill uygulanmadan önce mevcut açık kullanıcı onayı kuralı geçerlidir. Başlangıç şablonu
`.agents/_SKILL_TEMPLATE.md` dosyasıdır.

## Ajan Kurucu kuralı

Ne zaman yeni bir ajan kurmak, mevcut bir ajana yetenek/skill eklemek ya da ajanları düzenlemek istersem; önce `ajanlar/ajan-kurucu/AGENT.md` dosyasını oku ve onun yönergelerini izle. Ajan Kurucu benim ajan kurma rehberim.

## Milyoner Dönüşüm Partneri kuralı

Ne zaman amacım, hedefim, nişim, yol haritam, kişisel gelişimim, beni tutan inançlar veya AI ile para kazanma konusunda bir şey sorarsam; önce `ajanlar/milyoner-mentalite-donusum-ajani/AGENT.md` dosyasını oku ve onun yönergelerini izle. Bu ajan benim Milyoner Dönüşüm Partnerim.

## Web sitesi müşteri ve proje kuralı

Web sitesi, müşteri, bakım, revizyon, teslim veya yeni proje isteği geldiğinde önce
`ajanlar/web-sitesi-yonetimi/AGENT.md` dosyasını oku. Müşteri adı belliyse ilgili
`skills/musteri-[firma-adi].md` dosyasını ve `projeler/[firma-adi]/` klasörünü oku. Yeni müşteri
için müşteri skill'i, `musteriler.md` kaydı ve ilk proje klasörü birlikte oluşturulur. Bir müşteri
adı belirsizse tahmin etme, kısa bir seçim sorusu sor. Her web sitesi projesinin çalışma dosyaları
`projeler/[firma-adi]/[proje-adi]/` altında tutulur; farklı müşterilerin dosyaları karıştırılmaz.

## Karar yakalama kuralı

Her ajan önemli ve kalıcı bir karar verildiğinde önce `ajanlar/karar-yakalama/AGENT.md` dosyasını
okur. Karar onaylandıysa `kararlar.md` dosyasına tarih, karar, gerekçe, kapsam, sahip ve durumuyla
kaydedilir. Müşteri veya projeye ait kararlar ayrıca ilgili müşteri skill'ine ve proje `brief.md`
dosyasına işlenir. Rutin uygulama adımları, fikirler, sorular ve kesinleşmemiş öneriler karar olarak
kaydedilmez. Dış işlem, silme, yayınlama veya canlı değişiklik gerektiren kararlar `Onay bekliyor`
durumunda kalır ve açık işlem onayı olmadan uygulanmaz.

## Tam çalışma hafızası kuralı

Her ajan, anlamlı bir işe başlamadan önce `hafiza/kullanici-profili.md` ve
`hafiza/aktif-durum.md` dosyalarını, gerektiğinde `hafiza/oturum-gunlugu.md` içindeki en güncel
kayıtları okur. Her tamamlanan anlamlı istek, yapılan iş, sonuç, açık nokta ve ilgili dosya yolu
`hafiza/oturum-gunlugu.md` dosyasına kısa, tarihli bir kayıt olarak eklenir. Aktif projeler,
bekleyen işler ve onaylar `hafiza/aktif-durum.md` dosyasında güncel tutulur. Kalıcı tercih ve
çalışma alışkanlıkları `hafiza/kullanici-profili.md` dosyasına eklenir. Kararlar yalnızca
`kararlar.md` dosyasına da ayrıca kaydedilir. Gizli anahtarlar, parolalar, token'lar, gereksiz
kişisel veriler ve müşteri sırları hiçbir hafıza dosyasına yazılmaz.

## 4 dosya mantığı (her ajan nasıl kurulur)

Bu çalışma alanındaki her ajan, sadece dört çeşit düz Markdown dosyasıdır. Kod gerekmez.

| Dosya | Ne tutar |
|-------|----------|
| `AGENT.md` | Kimlik: görev, hedefler, KPI'lar, izinler (tek satır), asla yapmaması gerekenler |
| `HEARTBEAT.md` | Çalışma döngüsü: ajan her seferinde ne yapar, kendi sonuçlarını nasıl gözden geçirir |
| `MEMORY.md` | Ajanın zamanla öğrendikleri (boş başlar - hafıza kazanılır, varsayılmaz) |
| `skills/*.md` | Skill başına bir dosya: tek bir işin adım adım tarifi, artı o işin kuralları |

`RULES.md` diye bir dosya yoktur. Tek bir işi yöneten kurallar, o işe sahip skill'in içinde durur,
çünkü o dosya işin her çalıştığında okunur. Çalışma alanının geneline ait kurallar burada,
`CLAUDE.md` içinde durur ve her zaman yüklüdür.

## Herkesin uyduğu kurallar

- **Ajan isimleri Türkçe; iç sistem dosyaları İngilizce.** Yeni ajan klasör isimleri kısa, küçük
  harfli, tireli ve Türkçe olsun (ama ASCII tut - klasör adında ı, ş, ç kullanma, ör.
  `instagram-postlari`). Ajanın iç dosyalarını (`AGENT.md`, `HEARTBEAT.md`, `skills/*.md`)
  İngilizce yaz.
- **Çıktılar tarihli ve asla üzerine yazılmaz.** Sonuçları `çıktılar/` klasörüne
  `YYYY-MM-DD_ajan-adi_kisa-aciklama.md` olarak kaydet. Yeni sürümleri ekle; eskilerin üzerine yazma.
- **Em dash yok.** Üye için yazılan hiçbir metinde uzun tire (em dash) kullanma, kısa tire ( - ) kullan.
- **Bir ajan, bir görev.** Bir ajanın iki görevi gerekiyorsa, o iki ajandır.
- **Skill'ler hedefe hizmet eder.** Bir skill kendi `AGENT.md` dosyasındaki bir hedefe hizmet
  etmiyorsa, var olmamalı.

## Üyeyi koruyan kurallar

- **Geri bildirim hafızaya değil, skill'e gider.** Üye tekrar eden bir işin nasıl yapıldığını
  düzelttiğinde ("böyle yazma", "bunu hep şöyle yap"), o işe sahip skill'i bul ve kuralı oraya
  ekle (kısa bir Neden ve Nasıl uygulanır ile). O iş bir sonraki sefer çalıştığında skill okunur
  ve kural otomatik uygulanır. Tekrar eden geri bildirimi dağınık notlara koyma - bir sonraki
  çalıştırmada gözden kaçar.
- **Dışarıya bir şey göndermeden önce her zaman net teyit al.** Üyenin dışında birine bir şey
  ulaştırman gerektiğinde (e-posta, DM, müşteriye mesaj, birden fazla kişiye mesaj, sosyal medya
  paylaşımı, herhangi bir dış servise gönderim), son metni ve alıcıyı göster ve açık bir "evet,
  gönder" bekle. Sohbetin başındaki "ok" veya "tamam" gibi genel bir onay bunun yerine geçmez.
- **Silme, taşıma ve üzerine yazma her durumda net teyit ister.** Herhangi bir anda, herhangi bir
  durumda bir dosyayı silmen, başka bir yere taşıman ya da yerini değiştirmen, veya senin
  oluşturmadığın bir dosyanın üzerine yazman gerekiyorsa; önce ne yapacağını ve hangi dosyayı
  etkilediğini göster, açık bir "evet" bekle. Sohbetin başındaki genel bir "tamam" yeterli değildir.
- **Sırları ekrana getirme.** API anahtarları, parolalar ve token'lar asla gösterilmeyen,
  yapıştırılmayan, yazdırılmayan bir `.env.local` dosyasında durur. Sessizce yükle, isimle referans ver.

## Çalışma alanını büyütmek

Üye, Ajan Kurucu ve `context.md` ile başlar. Oradan:

1. Ajan Kurucu ile konuş. Üyeyle görüşür ve ilk gerçek ajanını seçmesine yardım eder.
2. Ajan Kurucu, `şablonlar/standart-ajan/` kalıbını yeni bir klasöre kopyalar ve dosyaları doldurur.
3. Yeni ajan, yukarıdaki yönlendirme tablosuna bir satır olarak eklenir.
4. Tekrarla. Her yeni ajan çalışma alanını biraz daha senin yapar.

Ajan kurmanın detaylı rehberi `şablonlar/NEW_AGENT_BOOTSTRAP.md` içinde, kalite kontrolü ise
`şablonlar/AGENT_CREATION_CHECKLIST.md` içinde. Ajan Kurucu ikisini de kullanır.
