# Reel ses akışı

Reel üretiminde ses, görsel gibi ayrı bir onay adımıdır. Sistem önce telifsiz ses adayını Telegram'a gönderir; **Bu sesi kullan**, **Başka ses ara** ve **Sessiz Reel** seçeneklerinden biri seçilmeden MP4 render edilmez.

## Kaynak sırası

1. **Pixabay Music**: `PIXABAY_API_KEY` ile aranır; `order=popular` sonucu yalnızca Pixabay içindeki popülerlik sırasıdır, Instagram trendi olduğu anlamına gelmez. İndirme URL'si, parça sayfası, sanatçı, lisans notu ve indirme tarihi saklanır.
2. **YouTube Audio Library**: API ile otomatik indirme yerine kullanıcı tarafından indirilen ve `library/music/approved/` klasörüne eklenen parça kullanılır. Creative Commons parçalarda gereken atıf açıklamaya eklenir.

Instagram'ın uygulama içindeki ticari/trend sesleri dışarı indirilmez ve dosyaya eklenmez. Reel Instagram'a gönderildikten sonra uygulama içinden ses eklenmek istenirse bu ayrı, manuel bir işlemdir.

## Gerekli ön koşullar

- `.env.local` içinde `PIXABAY_API_KEY`.
- Video render için bilgisayarda FFmpeg.
- Her ses dosyası için `audio-provenance.json`: kaynak, eser adı, sanatçı, lisans, URL, indirme zamanı, atıf gereksinimi.

## Yeniden kullanım

Seçilen parça ses geçmişine eklenir. Aynı ses art arda önerilmez; yeniden kullanım istenirse Telegram'dan açık onay gerekir.
