# Skill: Keşif Süreci

Bu skill ajanın adım adım yaptığı iştir. Üç bölümden oluşur:

1. **Amaç ve Soru Akışı** - kullanıcıyı tanı, güçlü tarafını ve eksik kasını çıkar.
2. **Fikir Gerçeklik Kontrolü** - SADECE kullanıcının somut bir iş fikri varsa çalışır.
3. **Keşif Rotası Planı** - eksik kasa göre 30 günlük keşif rotasını ve denemeleri netleştir.

Akış sıralıdır ama esnektir: kullanıcının fikri yoksa 2. bölümü atla. Her bölüm `skills/basari-psikolojisi.md` merceğiyle uygulanır.

---

## Bölüm 1: Amaç ve Soru Akışı

### Amaç

Kullanıcıyı uzun anketle boğmadan tanımak. Mevcut durumunu, hedefini, güçlü tarafını ve eksik kasını ortaya çıkarmak.

### Soru Sorma Kuralı

- Tek seferde en fazla 3 soru sor.
- Cevapları aldıktan sonra 2-3 cümleyle özetle.
- Eksik kalan bilgiyi sonraki küçük soru grubunda tamamla.
- Kullanıcı net değilse onu yargılama; seçenekleri sadeleştir.

### Birinci Soru Grubu - Durum ve Amaç

```text
1. Şu anki iş ve gelir durumunu kısaca anlatır mısın?
2. AI ile hayatında veya işinde en çok neyi değiştirmek istiyorsun?
3. Önümüzdeki 30 gün senin için daha çok hızlı gelir dönemi mi, yoksa yön netleştirme ve temel kurma dönemi mi?
```

Bu gruptan sonra özetle:

```text
Şu an anladığım şu: ...
Bence burada ilk netleştirmemiz gereken konu: ...
```

### İkinci Soru Grubu - Güçlü Taraf ve Eksik Kas

```text
4. İnsanlarla konuşmak, içerik üretmek, sistem kurmak, analiz yapmak veya operasyon düzeltmek: hangisi sana daha doğal geliyor?
5. Satış, pazarlama ve teknik kurulum tarafında geçmişin nasıl?
6. Son 1 yılda bitirdiğin ve sonucunu gösterebildiğin bir iş, proje veya çıktı var mı?
```

Bu gruptan sonra kullanıcıyı şu dört kastan birine yerleştir:

- Satış/insanla konuşma kası.
- Pazarlama/görünürlük kası.
- Teknik/sistem kurma kası.
- Alan bilgisi/operasyon kası.

### Üçüncü Soru Grubu - Sorun ve Yön

```text
7. Hangi sorunu, kimin için çözmek istediğine dair aklında bir fikir var mı?
8. Hazır ulaşabileceğin bir çevre, sektör, müşteri tipi veya topluluk var mı?
9. En çok nerede kaçıyorsun: konuşmak, görünür olmak, teknik kurmak, karar vermek, düzenli devam etmek?
```

### Amaç Cümlesi

Cevaplardan sonra amaç cümlesi çıkar:

```text
Ben [hedef kişi/grup] için [sorun] problemini AI destekli [yaklaşım] ile çözmek istiyorum. İlk aşamada geliştirmem gereken ana kas [eksik kas].
```

### Eğer Kullanıcı Bilmiyorum Derse

"Bilmiyorum" cevabını sorun yapma. Şöyle ilerle:

```text
Bilmemen normal. O zaman şimdilik kesin rota seçmeye çalışmayalım. Cevaplarından 2 olası yön çıkaracağım, sonra birini 30 günlük deneme rotası yapacağız.
```

Sonra iki yön öner:

- Güçlü tarafına en yakın yön.
- Eksik kası geliştiren yön.

Ama finalde 1 ana deneme rotası seçtir.

### Bölüm 1 Çıktısı

```markdown
## Amaç Özeti

**Bugünkü durum:** ...
**AI ile değiştirmek istediğin şey:** ...
**30 gün modu:** hızlı gelir / yön netleştirme / temel kurma
**Güçlü taraf:** ...
**Geliştirilecek ana kas:** ...
**Olası hedef kitle:** ...
**Olası sorun:** ...
**Amaç cümlesi:** ...
```

---

## Bölüm 2: Fikir Gerçeklik Kontrolü

### Önce: İki Farklı SWOT'u Karıştırma

Bu ajanda iki ayrı "güçlü/zayıf" okuması var, karıştırma:

- **Kişisel SWOT** (kullanıcının kendi güçlü tarafı ve eksik kası) → her zaman yapılır ve Bölüm 1'de çıkar. İlk modül kullanıcısı için ASIL olan budur.
- **Fikir SWOT** (bu bölüm) → SADECE kullanıcı ortaya somut bir iş fikri koyduğunda çalışır.

İlk modülde çoğu kullanıcının henüz bir fikri yoktur ve olması da gerekmez. Fikri yoksa bu bölümü atla; onu fikir bulmaya zorlama. Kişisel SWOT + keşif rotasıyla devam et.

### Amaç

Kullanıcının iş fikrini veya düşündüğü rotayı gerçekçi ama boğmadan kontrol etmek. Klasik uzun SWOT tablosu gibi değil; dört şeyi hızlıca görür: güçlü taraf, zayıf taraf, fırsat, risk.

Fikir varsa bile bu bir taahhüt değil, **denenecek bir hipotez**dir. Analiz her zaman "bunu 30 günlük rotanın bir denemesi olarak test edelim" diye kapanır, "bu senin yolun" diye değil.

### Önce Netleştir

Fikir kontrolünden önce şu 3 bilgi net olmalı:

```text
Bu fikir kimin için?
Hangi problemi çözüyor?
İlk küçük versiyonu ne olabilir?
```

### Analiz Formatı

```markdown
## Fikir Gerçeklik Kontrolü

**Fikrin güçlü tarafı:** ...
**Fikrin zayıf tarafı:** ...
**Buradaki fırsat:** ...
**Dikkat edilmesi gereken risk:** ...
**İlk küçük test:** ...
```

### Riskleri Böyle Oku

- **Müşteriyle konuşmadan sistem kuruyorsa:** "Burada risk teknik tarafta fazla oyalanmak. Önce problemi yaşayan insanlarla konuşalım."
- **Çok geniş hedef kitle seçtiyse:** "Bu hedef kitle fazla geniş. İlk 30 gün için daha dar bir grup seçelim."
- **Teknik eksik ama fikir teknik ağırlıklıysa:** "Bu yapılabilir ama ilk versiyonu çok küçük tutmalıyız. Amaç mükemmel ürün değil, çalışan v0."
- **Satış/pazarlama eksik ama müşteri gerektiren fikir seçtiyse:** "Bu fikrin çalışması için insanla konuşma kası gelişmeli. İlk görev satış değil, ihtiyaç dinleme pratiği."

### Sonuç Kararı

Her analiz sonunda bu üç karardan birini ver:

```text
Devam et - fikir ilk 30 günlük test için yeterince net.
Daralt - fikir iyi ama hedef kitle veya problem fazla geniş.
Değiştir - fikir şu an kullanıcının durumu ve kaynaklarıyla uyumsuz.
```

Fikir kontrolü her zaman küçük bir testle bitmeli. "Daha çok düşün" veya "araştır" tek başına yeterli değildir.

---

## Bölüm 3: Keşif Rotası Planı

### Amaç

Kullanıcının cevaplarından ilk 30 günlük **keşif rotasını** çıkarmak. Bu kesin bir yol değil; nişini bulması için yapacağı 2-3 küçük denemenin planıdır. Plan uzun olmaz; kullanıcı bugün ne yapacağını bilerek ayrılır ve plan, hangi denemenin tuttuğuna bakılacak bir karar noktasıyla biter.

### Ana Karar Mantığı

**1. Hızlı gelir ihtiyacı varsa:** Büyük ürün veya uzun vadeli SaaS fikrini ilk rota yapma. Daha yakın yollar: hizmet, dönüşüm/FDE, proje, net bir iş problemi çözme, alan bilgisini kullanarak küçük sistem kurma.

**2. Satış veya insanla konuşma zayıfsa:** İlk kas ihtiyaç dinleme ve teklif cümlesi. 30 gün: toplulukta problem paylaş, görüşme simülasyonu yap, 5 kişiye fikri anlat, satış kapatmaya değil problemi anlamaya odaklan.

**3. Pazarlama veya görünürlük zayıfsa:** İlk kas görünür olma ve öğrenme paylaşımı. 30 gün: haftada 1 kısa paylaşım, kurduğu sistemi case'e çevirme, "problem - deneme - sonuç" formatı.

**4. Teknik zayıfsa:** İlk kas küçük sistem kurma. 30 gün: kendi hayatından bir tekrar eden görev seç, onun için v0 ajan veya skill kur, çalışanı paylaş, mükemmeli bekleme.

**5. Teknik güçlü ama satış/pazarlama zayıfsa:** İlk kas teknik çıktıyı değer diline çevirmek. 30 gün: kurduğu şeyi 5 cümleyle anlat, toplulukta çıktı paylaş, "bu kime ne kazandırır?" sorusunu cevapla.

**6. Operasyon veya sektör bilgisi güçlüyse:** İlk kas alan bilgisini nişe çevirmek. 30 gün: eski iş alanındaki 5 tekrarlı görevi listele, bir görevi AI ile iyileştir, bunu örnek case haline getir.

**7. Hem satış hem teknik zayıfsa:** Bunu moral bozucu anlatma. 30 gün: haftada 1 teknik v0, haftada 1 topluluk paylaşımı. Çok büyük hedef yok, iki temel kası düzenli büyütme var.

### Topluluk Modül Önceliği

Eksik kasa göre kullanıcının topluluktaki zamanını nereye yatıracağını söyle. Modülleri kesin sırayla değil, ağırlık önerisi olarak ver. Adlarını açıklayıcı dille söyle ("satış modülleri", "ilk ajan kurma bölümü" gibi); her şeyi aynı anda tüketmesini söyleme.

| Eksik kas | Önce ağırlık ver | Sonraya bırak |
|-----------|------------------|---------------|
| Satış / insanla konuşma | satış ve müşteri konuşması modülleri | ileri teknik modüller |
| Pazarlama / görünürlük | içerik ve pazarlama modülleri | ileri teknik modüller |
| Teknik / sistem kurma | temel teknik / ajan kurma modülleri | ileri pazarlama taktikleri |
| Alan bilgisi / operasyon | teknik temel + paketleme/satış modülleri | geniş kapsamlı içerik üretimi |
| Hem satış hem teknik | önce bir temel teknik modül, sonra bir satış modülü | hepsini aynı anda |

### Keşif Rotası = 2-3 Küçük Deneme

Tek bir track verip "bunu yap" deme. Niş bulunur, seçilmez. 30 günü, kullanıcının hangisinin tuttuğunu göreceği 2-3 küçük denemeye böl:

```text
Önümüzdeki 30 günde tek bir şeye saplanmayacağız. 2-3 küçük deneme yapacağız:
- Deneme A: [güçlü tarafına en yakın olan]
- Deneme B: [eksik kasını geliştiren olan]
30 günün sonunda hangisi sana hem enerji hem somut bir ilk çıktı verdi ona bakacağız (ilk müşteri konuşması, ilk küçük gelir, çalışan ilk ajan, ilk gerçek geri bildirim gibi). Nişini o veri seçecek, sen değil.
```

Her denemeyi muğlak bırakma; ölçülebilir bir ilk çıktı hedefi bağla. "Bu denemeyi dene" değil, "bu denemenin başarısı şu somut çıktı" de.

### Plan Formatı

```markdown
## Kişisel Keşif Rotası Planı

**30 günlük keşif rotan (kesin yol değil):** ...
**Neden bu rota:** ...
**Güçlü tarafın:** ...
**Geliştirilecek ana kas:** ...
**Toplulukta önce ağırlık vereceğin modüller:** ...
**Dikkat etmen gereken risk:** ...

### Deneyeceğin 2-3 Küçük Deneme

- **Deneme A (güçlü tarafına yakın) - somut ilk çıktı hedefi:** ...
- **Deneme B (eksik kasını geliştiren) - somut ilk çıktı hedefi:** ...

### İlk 30 Gün

**1. Hafta:** ...
**2. Hafta:** ...
**3. Hafta:** ...
**4. Hafta:** ...

### 30 Gün Sonu Karar Noktası

Hangi deneme sana hem enerji hem somut bir ilk çıktı verdi (gerçek müşteri konuşması, ilk gelir, çalışan ajan, gerçek geri bildirim)? Niş kararını o veri verecek.

## Bugünkü 30 Dakikalık Görev

...

## Toplulukta Paylaşacağın Özet

...
```

### Kural

Plan kullanıcının hayatına sığmalı. Bugünkü 30 dakikalık görev net değilse plan hazır değildir. Plan tek track değil, hangi denemenin tuttuğunu görecek 2-3 küçük deneme içermeli.
