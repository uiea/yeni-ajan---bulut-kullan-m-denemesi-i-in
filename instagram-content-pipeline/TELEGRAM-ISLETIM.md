# Telegram bot işletimi

Bot yalnızca `.env.local` içindeki `TELEGRAM_ALLOWED_CHAT_ID` ile eşleşen özel sohbetten mesaj işler.

## İlk test

Kullanıcı Telegram'da `/start` gönderdikten sonra bu komutu çalıştır:

```powershell
node .\scripts\telegram-listener.mjs --watch
```

Bot bir karşılama mesajı gönderir. Daha sonra normal bir metin gönderildiğinde bot metni konu olarak kaydeder ve iki düğme sunar: `Otomatik oluştur` ve `Adım adım oluştur`. Rehberli modda format, carousel slayt sayısı/reel süresi ve görsel üstü metin kararları sırasıyla düğmeler üzerinden alınır.

Seçimler tamamlandığında içerik işleyicisi görsel/video/carousel önizlemesini üretir ve yalnızca izinli Telegram sohbetine gönderir. Bu önizleme paylaşım değildir; kullanıcı `düzelt`, `taslak`, `planla` veya `paylaş` komutuyla sonraki eylemi seçer.
## İnceleme paketi

Seçimler tamamlandığında sistem şu paketi oluşturur ve Telegram incelemesine hazırlar:

- görsel, carousel ya da reel önizlemesi;
- açıklama metni;
- konuya uygun, sınırlı hashtag seti;
- `Instagram için hazırla` ve `Düzeltme iste` butonları.

`Instagram için hazırla` yalnızca taslağın yayınlanmaya hazır olduğunu kaydeder. Instagram'a yükleme veya paylaşım yapmaz; bu işlem için ayrıca açık onay gerekir.

### Metni kendin değiştirme

Telegram sohbetine şu komutlardan birini yazabilirsin:

```text
/aciklama Yeni açıklamanın tamamı buraya yazılır.
/hashtag #YapayZeka #Teknoloji #AI
```

Metin UTF-8 dosyasından okunur; Türkçe karakterler korunur. Sistem değişikliği taslağa kaydeder. Güncellenen paketin Telegram'a tekrar gönderilmesi ayrıca onay gerektirir.
