# Medya kütüphanesi ve yeniden kullanım

İndirilmiş her kaynak medya, lisans kaydıyla birlikte `library/asset-index.json` listesine kaydedilir. Sistem yeni içerik hazırlarken önce bu kütüphaneyi tarar; yalnızca uygun aday yoksa API araması yapar.

## Güvenli çeşitlilik kuralları

- Aynı kaynak varlık 30 gün içinde yeni bir gönderide tekrar önerilmez.
- Aynı türev (ör. `reel-cover-dark`) 90 gün içinde tekrar kullanılmaz.
- Bir kaynak varlıktan en fazla 4 türev üretilir.
- Bir içerik paketinde en fazla 3 kaynak varlık kullanılır.

## Türev örnekleri

| Kaynak | Kullanılabilecek türevler |
|---|---|
| Dikey fotoğraf | tek görsel, carousel kapak, carousel arka planı, reel kapağı |
| Yatay video | dikey reel kırpımı, 6 saniyelik B-roll, reel arka planı |
| Doku/soyut görsel | metin arka planı, CTA slaytı, hikâye görseli |

## Kullanım

```powershell
node .\scripts\asset-library.mjs status
node .\scripts\asset-library.mjs recommend carousel
node .\scripts\asset-library.mjs mark-used <asset-id> carousel-cover <paket-id>
```

`register` komutu için kullanılan metadata JSON dosyasında `filePath`, `type`, `provider`, `sourceUrl`, `creator` ve `licenseNote` alanları zorunludur. Böylece yeniden kullanım, lisans bilgisinden kopmaz.
