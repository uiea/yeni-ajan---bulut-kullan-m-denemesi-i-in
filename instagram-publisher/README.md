# Instagram Web yayınlayıcı

Bu araç, ilk çalıştırmada Instagram Web girişini kullanıcıya yaptırır ve tarayıcı oturumunu `profile/` içinde yerel olarak saklar. Şifre veya erişim bilgisi dosyaya yazılmaz.

Kurulum:

```powershell
cd instagram-publisher
npm.cmd install
npx.cmd playwright install chromium
```

Gönderiyi hazırlamak (paylaşmaz):

```powershell
npm.cmd run publish -- --image "..\çıktılar\2026-07-21_instagram-carousel-ai-otomasyonlari\instagram-4x5\01_kapak.png" --caption "Açıklama metni"
```

Yayın komutu `--publish` ile çalışır. Bu, dışarıya gönderim olduğu için yalnızca açık kullanıcı onayından sonra kullanılmalıdır.
