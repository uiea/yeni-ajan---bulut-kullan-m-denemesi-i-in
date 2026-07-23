# Telegram konu girişi kurulumu

## 1. Botu oluştur

1. Telegram'da `@BotFather` hesabını aç.
2. `/newbot` yaz.
3. Görünen ad olarak örneğin `Instagram İçerik Asistanım` gir.
4. Kullanıcı adı olarak `...bot` ile biten benzersiz bir ad seç.
5. BotFather'ın verdiği token'ı kopyala; sohbet mesajına yapıştırma.

## 2. Yerel ayarı yap

1. Bu klasörde `.env.example` dosyasını `.env.local` adıyla kopyala.
2. `TELEGRAM_BOT_TOKEN=` satırına token'ı ekle.
3. Botu Telegram'da açıp `/start` gönder.
4. Sonraki adımda sohbet kimliğini bulup `TELEGRAM_ALLOWED_CHAT_ID` alanına yalnızca kendi ID'ni ekleyeceğiz.

## 3. Kullanım komutları

- Bir konu yaz: `Küçük işletmelerde müşteri mesajı otomasyonu`
- Otomatik seçim: `otomatik`
- Tek tek seçim: `rehberli`
- Hazırlık onayı: `incele`
- Dış eylemler: `taslak`, `planla`, `paylaş` — her biri ayrıca onay ister.

Bot, izinli olmayan chat ID'lerden gelen mesajları işleme almaz.
