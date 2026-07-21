# Ders 11 - Milyoner Dönüşüm Partneri

Bu klasör Ders 11 için verilecek milyoner dönüşüm partneri ajanıdır.

Amaç: Üyenin nihai nişini seçmesi DEĞİL. Bu ilk modülde amaç, üyenin güçlü tarafını ve eksik kasını görmesi ve nişini bulmak için çıkacağı 30 günlük bir **keşif rotası** seçmesi. Niş, ilk denemede seçilmez; denemelerle bulunur.

## Kullanım

1. Bu klasörü kendi ajan çalışma alanına kopyala (bizim projedeki gibi, `CLAUDE.md` yönlendirmeli yapı).
2. `baslatma-promptu.txt` içindeki **kurulum + başlatma promptunu** Claude Code / Cursor'a ilk mesaj olarak yapıştır. Bu prompt:
   - ajanı bir kere `CLAUDE.md`'ye indeksler (bundan sonra hedef/yol haritası/para sorularında otomatik devreye girer),
   - `AGENT.md` + skill dosyalarını + profili okutur,
   - ilk tanışma seansını başlatır.
3. Ajan soruları adım adım soracak (tek seferde en fazla 3 soru).
4. Sonunda sana kişisel keşif rotası özetini çıkaracak.
5. Onay verirsen `context/kisisel-donusum-profili.md` dosyasını dolduracak.
6. Sonraki günlerde kurulum tekrar gerekmez; sadece "yol haritama bakalım" demen yeter.

## Ajanın Yapacağı Şey

- Önce seni tanır.
- Hedefini ve mevcut durumunu anlar.
- Güçlü tarafını bulur.
- Geliştirmen gereken ana kası çıkarır.
- Eksik kasına göre toplulukta önce hangi modüllere ağırlık vereceğini söyler.
- Seni finansal bolluktan alıkoyan sınırlayıcı inançları (kendine ve dünyaya dair) yüzeye çıkarır ve güçlendirici çerçeveye çevirir.
- İş fikrin varsa kısa bir gerçeklik kontrolü yapar (fikrin yoksa zorlamaz).
- Sana 30 günlük keşif rotanı, deneyeceğin 2-3 küçük denemeyi ve bugünkü 30 dakikalık görevi verir.
- Sonraki konuşmalarda profilini hatırlar; sıfırdan anket yapmaz, kaldığınız yerden devam eder.
- Seni sürekli küçük adımlarla konfor alanından çıkarır ve mükemmeli beklemeyi bırakıp "bir önceki versiyondan iyi" mantığıyla ilerlemeni sağlar.

## Dosyalar

- `AGENT.md` - ana ajan davranışı
- `baslatma-promptu.txt` - ilk konuşma promptu
- `skills/kesif-sureci.md` - adım adım süreç: soru akışı + fikir kontrolü + 30 günlük keşif rotası planı
- `skills/basari-psikolojisi.md` - her konuşmada arka planda çalışan mercek: konfor alanından çıkış + mükemmeliyetçilik karşıtı + zihniyet ilkeleri
- `skills/sinirlayici-inanclar.md` - sınırlayıcı inanç seansı: finansal bolluğu engelleyen inançları çıkar, sına, çürüt
- `context/kisisel-donusum-profili.md` - doldurulacak profil dosyası

## En Önemli Kural

Bu ajan kullanıcıya tek seferde uzun anket yapmaz. Adım adım sorar, cevapları özetler ve her konuşmayı küçük bir eylemle bitirir.
