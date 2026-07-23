# Telegram bot işletimi

Bot yalnızca `.env.local` içindeki `TELEGRAM_ALLOWED_CHAT_ID` ile eşleşen özel sohbetten mesaj işler.

## İlk test

Kullanıcı Telegram'da `/start` gönderdikten sonra bu komutu çalıştır:

```powershell
node .\scripts\telegram-listener.mjs --watch
```

Bot bir karşılama mesajı gönderir. Daha sonra normal bir metin gönderildiğinde bot metni konu olarak kaydeder ve iki düğme sunar: `Otomatik oluştur` ve `Adım adım oluştur`. Rehberli modda format, carousel slayt sayısı/reel süresi ve görsel üstü metin kararları sırasıyla düğmeler üzerinden alınır.

Seçimler tamamlandığında içerik işleyicisi görsel/video/carousel önizlemesini üretir ve yalnızca izinli Telegram sohbetine gönderir. Bu önizleme paylaşım değildir; kullanıcı `düzelt`, `taslak`, `planla` veya `paylaş` komutuyla sonraki eylemi seçer.
