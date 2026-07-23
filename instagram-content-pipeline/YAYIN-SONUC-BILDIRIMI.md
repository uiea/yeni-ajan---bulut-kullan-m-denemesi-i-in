# Instagram yayın sonucu bildirimi

`Evet, Instagram’da yayınla` onayından sonra sistem yayın aracını başlatır ve sonuç dosyasını izler.

- Instagram paylaşım onayı algılanırsa Telegram'a `Instagram yayını başarılı` mesajı gönderilir.
- Yayın aracı hata verirse Telegram'a hata nedeni ve çözüm önerisi gönderilir.
- Instagram arayüzü kesin onay vermeden kapanırsa sistem bunu başarı saymaz; profil kontrolü gerektiğini bildirir.

Bu bildirimler yayın işlemi başlatan aynı Telegram sohbetine gönderilir.
