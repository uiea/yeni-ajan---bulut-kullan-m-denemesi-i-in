# Kota ve engel koruması

`/kota` Telegram komutu her kaynak için günlük ve aylık arama/indirme kullanımını, kalan hakkı, günlük sıfırlanma zamanını ve uygun alternatifleri gösterir.

Limitler `config/free-tier-policy.json` içinde temkinli çalışma tavanlarıdır. Bu tavan dolduğunda işçi API çağrısı yapmaz; yeni aday için İstanbul saatine göre günlük sıfırlanmayı veya aylık sıfırlanmayı bekler. Aynı sorgulara tekrar tekrar istek atılmaz, sonuçlar önbellek/varlık geçmişi üzerinden yeniden kullanılır.

Kullanım yalnızca başarılı arama veya indirme ardından sayılır. Sağlayıcının döndürdüğü teknik hata, 429 oran sınırı veya lisans sorunu Telegram'da neden ve beklenmesi gereken zamanla bildirilir.

## Kota dolduğunda alternatifler

1. Kota açık olan diğer yapılandırılmış sağlayıcıya geçilir.
2. Daha önce onaylanmış yerel varlıklar farklı kırpım, yeni görsel üstü metin veya farklı içerik formatında tekrar kullanılır.
3. Yapay zekâ görseli seçeneği, yalnızca yapılandırılmış sağlayıcı varsa seçilir.
4. Yeni medya indirmeden; açıklama, CTA, hashtag, carousel metni ve yayın takvimi hazırlanır.
5. Tüm kaynaklar doluysa sistem bir sonraki günlük veya aylık sıfırlanma zamanını bildirir ve otomatik istek atmaz.
