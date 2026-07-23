# Instagram taslak otomasyonu — 2026-07-21

## Hedef

`01_kapak.png` görselini ve açıklamayı Instagram Web'de otomatik olarak gönderi taslağına eklemek; **Paylaş** düğmesine basmadan kullanıcı onayını beklemek.

## Hazır olanlar

- `publish.mjs`: Playwright ile kalıcı Chromium profili kullanan otomasyon.
- `BASLAT-TASLAK.cmd`: Kullanıcının çift tıklayarak başlatacağı dosya.
- `baslat-taslak.ps1`: Türkçe karakterli `çıktılar` dizinini dinamik olarak bulur ve görsel yolunu Node'a mutlak yol olarak verir.
- İlk giriş başarıyla yapıldı; oturum `profile/` içinde yerel olarak saklanıyor. Bu klasör Git'e eklenmiyor.
- Playwright ve Chromium kurulu.

## Kullanılan içerik

- Görsel: `çıktılar/2026-07-21_instagram-carousel-ai-otomasyonlari/instagram-4x5/01_kapak.png`
- Açıklama: `Yapay zeka ile is akislarini otomatiklestirmenin 6 pratik yolu... #yapayzeka #otomasyon #verimlilik #isakisleri #ai #dijitalpazarlama`

## Son hata ve yapılan düzeltme

İlk sürüm, giriş sonrası `input[type=file]` öğesini erken aradığı için zaman aşımına düştü. Son sürüm:

1. Instagram ana menüsünü bekler.
2. `Oluştur/Create` seçer.
3. Gerekirse `Gönderi/Post` türünü seçer.
4. `Bilgisayardan seç/Select from computer` seçeneğini seçer.
5. Görseli ve açıklamayı ekler; `--publish` olmadığı için paylaşmaz.
6. Hata olursa tarayıcı açık kalır ve `hata-ekrani.png` oluşturur.

## Yarın ilk adım

Kullanıcı `BASLAT-TASLAK.cmd` dosyasını yeniden çalıştıracak. Eğer otomasyon yine bir ekranda kalırsa, açık tarayıcıyı kapatmadan ekrandaki metni veya `instagram-publisher/hata-ekrani.png` dosyasını incele. Paylaşım ancak kullanıcı açıkça onaylarsa `--publish` ile yapılabilir.

## 2026-07-23 sonucu

- Kullanıcı, `01_kapak.png` görselinin hazırlanan açıklamayla `@ihmalin_bedeli` hesabından paylaşılmasına açık onay verdi.
- `--publish` akışı tamamlandı ve Instagram'ın Paylaş komutu gönderildi; otomasyon hata vermeden kapandı.
- Instagram Web taslak kaydetme seçeneği sunmuyor: çıkış uyarısında yalnızca `Gönderiyi sil?` ve `İptal` vardı. Mobil taslak için Android emülatörü kurulumu denendi fakat BlueStacks kurulumu Windows/winget sürecinde takılı kaldı ve tamamlanmadı.
