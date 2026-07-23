# Ücretsiz Instagram içerik planı

## Varsayılan çalışma biçimi

- Konu Telegram'dan gelir; günde en fazla 5 konu işlenir.
- Tek görsel ve carousel için kaynaklar Unsplash → Pexels → Pixabay sırasıyla döner.
- Reel için yalnızca video sunan Pexels → Pixabay sırası kullanılır.
- Aynı konu/sorgu 7 gün boyunca önbellekten kullanılır; tekrar API isteği atılmaz.
- Unsplash varsayılan olarak kapalıdır.
- Günde en fazla 2 içerik hazırlanır ve 1 içerik paylaşılır.
- Yayın, taslak veya planlama için her zaman insan incelemesi gerekir.

## Kota güvenlik payı

| Kaynak | Günlük arama | Günlük indirme | Aylık arama | Aylık indirme |
|---|---:|---:|---:|---:|
| Pexels | 20 | 10 | 400 | 200 |
| Pixabay | 15 | 8 | 300 | 150 |
| Unsplash | 15 | 8 | 300 | 150 |

Bu sınırlar sağlayıcıların yayımladığı limitlerin oldukça altındadır. Limit dolarsa otomasyon hata vermek yerine yeni kaynak indirmeyi durdurur ve inceleme bekler.

## Dikkat edilmesi gerekenler

- “Ücretsiz stok” içerik otomatik olarak her kullanım için risksiz değildir. Her seçilen varlığın kaynak ve üretici kaydı korunur.
- Müzik, logo, tanınabilir kişi ve hassas içeriklerde ek hak kontrolü gerekir.
- API anahtarlarını yalnızca `.env.local` içinde tut; sohbet mesajına veya Git'e koyma.
- Gecelik toplu indirme yok: tek konu için en fazla 6 sonuç görüntülenir, en fazla 3 aday indirilir.
- Aynı indirilmiş varlıktan farklı kırpım, başlık, renk düzeni, carousel slaytı veya reel kapağı üretilir. Bu, tek bir API sorgusundan birden fazla özgün teslim çıktısı sağlar.
- Pixabay toplu/sistematik indirmeyi yasakladığı için kaynak havuzunu amaçsız büyütmeyiz.
