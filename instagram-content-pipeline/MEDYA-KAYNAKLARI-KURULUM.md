# Stok medya kaynaklarını yapılandırma

Anahtarları asla Telegram mesajına veya Git deposuna yazma. Yalnızca proje içindeki `.env.local` dosyasına ekle.

```dotenv
PEXELS_API_KEY=buraya_pexels_anahtari
PIXABAY_API_KEY=buraya_pixabay_anahtari
UNSPLASH_ACCESS_KEY=buraya_unsplash_access_key
MEDIA_SOURCE_PRIORITY=pexels,pixabay,unsplash
```

## Önerilen sıra

1. Pexels: görsel ve kısa video için ilk kaynak.
2. Pixabay: Pexels sonucu uygun değilse ikinci kaynak.
3. Unsplash: kaliteli fotoğraf alternatifi; video sağlamaz.

## Kontrol

Anahtarları kaydettikten sonra aşağıdaki komut gizli değerleri göstermeden hangi kaynakların hazır olduğunu bildirir:

```powershell
node .\scripts\media-source-status.mjs
```

`Lisanslı stok medya` seçildiğinde sistem yalnızca hazır olan sağlayıcıları kullanır. Her seçilen varlık için sağlayıcı, içerik bağlantısı, üretici, lisans notu ve indirme zamanı provenance kaydına yazılmalıdır.

## Pexels işçisi

Konu `Lisanslı stok medya` veya `Karma kullanım` ile seçildiğinde Pexels işçisi şu komutla çalışır:

```powershell
node .\scripts\fetch-pexels-asset.mjs <telegram-konu-id>
```

İşçi tek arama ve tek indirme yapar; `free-tier-policy.json` içindeki günlük/aylık kotaları uygular. Dosyayı içerik paketine, kaynak bilgisini ise `provenance.json` dosyasına kaydeder.
