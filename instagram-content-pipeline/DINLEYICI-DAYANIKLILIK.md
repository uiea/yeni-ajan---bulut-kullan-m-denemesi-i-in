# Telegram dinleyici dayanıklılığı

## Kalıcı çözüm

- Dinleyici ana döngüsü bir hata aldığında kapanmaz; üç saniye bekleyip yeniden denemeye devam eder.
- Her Telegram güncellemesinin `offset` değeri `finally` bloğunda kaydedilir. Böylece hatalı bir callback sonsuz tekrar edilmez ve zaten başlatılmış bir dış işlem yeniden tetiklenmez.
- Diskte içerik işçisi tarafından güncellenen alanlar (`captionPath`, `previewFilePath`, provenance) bellekteki eski bot durumu tarafından silinmez; kayıt sırasında alan düzeyinde birleştirme yapılır.
- Yayın başlatma hatası botu kapatmaz; hata Telegram’a durum mesajı olarak döner.

## Durum kurtarma

Kullanıcı Telegram'da `/durum` yazdığında bot en son çalışmanın:

- konusunu;
- kimliğini;
- mevcut aşamasını;
- ilerleme yüzdesini;
- eksik kalan adımı ve devam yolunu

gösterir.

`/start` da aynı durum özetini verir. Yeni içerik yalnızca `konu:` ile başlayan mesajla başlatılır.
