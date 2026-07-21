# Neon örnek projesi

Bu proje kök dizindeki `.env.local` içindeki `DATABASE_URL` değerini kullanır.

Kurulumdan sonra komutları bu klasörde çalıştırın:

```powershell
npm run db:init
npm run db:demo
npm run db:content-plan
npm run db:replace-day-two
npm run db:list-content-plan
```

`db:init`, veritabanında `notes` tablosunu oluşturur. `db:demo` örnek bir not ekleyip son beş notu listeler.
`db:content-plan`, Instagram + LinkedIn için beş günlük yapay zekâ/ajan içerik planını `content_plan` tablosuna kaydeder.
