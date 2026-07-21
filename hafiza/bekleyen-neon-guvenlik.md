# Bekleyen Neon güvenlik işlemi

Durum: Kullanıcı tarafından ertelendi (2026-07-21).

Sonraki konuşmada hatırlatılacak işlem:

1. Neon veritabanı rolü parolasını yenile.
2. Yeni `DATABASE_URL` değerini yerel `.env.local` dosyasına yaz.
3. Vercel `neon-dashboard` projesinin Production ve Preview ortamlarındaki `DATABASE_URL` değerlerini güncelle.
4. `psql -h pg.neon.tech` ile tarayıcı tabanlı parolasız Neon girişini doğrula.

Not: Bu işlemler Neon ve Vercel'de harici durum değiştirir; uygulamadan önce yeniden açık onay alınmalıdır.

## 2026-07-22 hatırlatması

1. Yeni, geçerli bir OpenAI Platform API anahtarı oluştur.
2. Yerel kök `.env.local` dosyasındaki `OPENAI_API_KEY` değerini yeni anahtarla güncelle.
3. Vercel `neon-dashboard` projesinde Production ve Preview `OPENAI_API_KEY` değerlerini güncelle.
4. Ajan Merkezi'nin hata mesajı düzeltmesini Vercel'e dağıt ve sohbeti doğrula.
