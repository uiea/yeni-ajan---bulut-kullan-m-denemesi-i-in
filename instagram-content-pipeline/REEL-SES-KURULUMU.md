# Reel ses akışı

Reel üretiminde ses, görsel gibi ayrı bir onay adımıdır. Varsayılan yöntem **bağlantı-öncelikli**dir: sistem Telegram'da Pixabay parça sayfası bağlantısını verir; parça tarayıcıda dinlenir. **Bu sesi kullan**, **Başka ses ara** ve **Sessiz Reel** seçeneklerinden biri seçilmeden MP4 render edilmez.

Telegram ses mesajı, yalnızca daha önce onaylanıp yerel kütüphaneye eklenen parçalar için kullanılır. Yeni adaylarda onaydan önce MP3 indirilmez.

## Kaynak sırası

1. **Pixabay Music**: `PIXABAY_API_KEY` ile aranır; `order=popular` sonucu yalnızca Pixabay içindeki popülerlik sırasıdır, Instagram trendi olduğu anlamına gelmez. İndirme URL'si, parça sayfası, sanatçı, lisans notu ve indirme tarihi saklanır.
2. **YouTube Audio Library**: API ile otomatik indirme yerine kullanıcı tarafından indirilen ve `library/music/approved/` klasörüne eklenen parça kullanılır. Creative Commons parçalarda gereken atıf açıklamaya eklenir.

Instagram'ın uygulama içindeki ticari/trend sesleri dışarı indirilmez ve dosyaya eklenmez. Reel Instagram'a gönderildikten sonra uygulama içinden ses eklenmek istenirse bu ayrı, manuel bir işlemdir.

## Gerekli ön koşullar

- `.env.local` içinde `PIXABAY_API_KEY`.
- Video render için bilgisayarda FFmpeg.
- Her ses dosyası için `audio-provenance.json`: kaynak, eser adı, sanatçı, lisans, URL, indirme zamanı, atıf gereksinimi.

## İlk parça ekleme

1. Pixabay Music'te bir parçayı dinle ve lisans sayfasını kontrol et.
2. Parçayı seçtikten sonra Pixabay'in kendi indirme düğmesiyle indir.
3. Parçayı kayda almak için şu komutu çalıştır:

```powershell
node scripts/register-music.mjs --file "C:\Indirilenler\parca.mp3" --title "Parça adı" --source-url "Pixabay parça URL'si" --license "Pixabay Content License" --creator "Sanatçı adı"
```

Bu işlem lisans kaydını `library/music/catalog.json` içine ekler. Yalnızca onaylanan parçalar saklanır; aynı parça sonraki Reellerde yeniden kullanılabilir. Sonrasında `render-reel.mjs` görsel ve onaylı sesi 1080×1920 MP4 Reel'e dönüştürür.

## Yeniden kullanım

Seçilen parça ses geçmişine eklenir. Aynı ses art arda önerilmez; yeniden kullanım istenirse Telegram'dan açık onay gerekir.
