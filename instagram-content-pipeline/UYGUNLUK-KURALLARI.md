# Platform, lisans ve yayın uygunluğu

Bu kurallar otomasyonun varsayılan davranışıdır. Platform şartları değişebileceği için canlı bağlantı kurulmadan önce ilgili resmi belge yeniden kontrol edilir.

## Medya kaynakları

- Yalnızca resmi API üzerinden getirilen Pexels, Pixabay veya Unsplash varlıklarını kullan.
- Her varlık için sağlayıcı, kaynak URL'si, üretici, lisans notu, sorgu ve çekilme zamanını `provenance.json` dosyasına yaz.
- Pexels: API kullanımında bağlantı/atıf kurallarını uygula; API limiti aşılmaya çalışılmaz.
- Pixabay: Sonuç URL'lerini kalıcı hotlink olarak kullanma; seçilen varlığı yerel olarak kaydet. Sonuçları en az 24 saat önbellekle ve toplu/sistematik indirme yapma.
- Unsplash: Üretici ve Unsplash atfını koru; resmi API'nin istediği `ixid` parametresini silme. Unsplash fotoğraf kaynağıdır, video kaynağı değildir.
- Stok platformundan gelmesi; marka, kişi, bina, eser veya müzik için her bağlamda otomatik kullanım izni vermez. Hassas veya ticari riskli bağlamlarda insan incelemesi zorunludur.

## Telegram

- Bot yalnızca yapılandırılmış izinli chat ID'lerden konu kabul eder.
- Bot token'ı `.env.local` dışında tutulmaz; loglara yazılmaz.
- Gelen kullanıcı verisini yayın metnine veya dış servise açıkça onay almadan aktarma.
- Günde 5 konu sınırını aşma; hata/tekrar mesajlarında art arda istek göndermeyi durdur.

## Instagram ve Meta

- Taslak, zamanlama ve yayın eylemleri için kullanıcıya içerik, hesap ve hedef eylemi göster; açık onay al.
- Planlı yayın için resmi Meta/Instagram API'si kullan; tarayıcı otomasyonunu yalnızca onaylı manuel yayın yardımcısı olarak kabul et.
- Otomatik beğeni, takip, yorum, DM, toplu etkileşim veya taklitçi davranış oluşturma.
- Her içerikte alt metin, açık CTA ve gerçekçi iddia kontrolü yap. Sağlık, finans, hukuk, siyasi içerik ve kişisel veri içeren konularda ek insan incelemesi gerektir.

## Render ve saklama

- Reel için lisanslı veya platformun sağladığı ses dışında müzik ekleme.
- Kaynak dosyalarını, nihai çıktıyı ve `provenance.json` kaydını 365 gün sakla.
- Onaylanmayan adayları yeniden yayınlama; hak sahibi kaldırma talebi gelirse yayın akışını durdur.

## Otomatik engeller

- Kota eşiği, API isteği gönderilmeden önce kontrol edilir.
- Kaynak/üretici/lisans notu olmayan varlık paket doğrulamasından geçmez.
- `reviewStatus: approved-for-external-action` olmayan paket dış eyleme hazırlanmaz.
