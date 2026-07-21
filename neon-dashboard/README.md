# Neon içerik planı panosu

Yerelde çalıştırmak için kökteki `.env.local` içeriğini bu klasörde `.env.local` olarak da bulundurun veya PowerShell oturumuna `DATABASE_URL` ekleyin.

```powershell
npm install
npm run dev
```

Vercel için bu klasörü proje kökü olarak seçin ve **Settings → Environment Variables** altında şu değişkenleri ekleyin:

- `DATABASE_URL`: Neon bağlantısı (Production, Preview, Development)
- `OPENAI_API_KEY`: OpenAI API anahtarı (Production, Preview, Development)
- `APP_ACCESS_CODE`: yalnızca sizin bildiğiniz panel erişim kodu (önerilir)

Ardından deploy edin. `OPENAI_API_KEY` sadece sunucu tarafında kullanılır ve tarayıcıya gönderilmez.
