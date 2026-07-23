# Medya temizleme ara işlemi

Önizleme üretiminde kaynak görsel aşağıdaki aşamalardan geçer:

```text
aday filtreleme → görsel kontrol → güvenli kırpma → gerekirse yapay zekâ ile temizleme → önizleme
```

## Güvenli düzenlemeler

- Boş kenarı kırpma.
- Konuyla ilgisiz küçük arka plan nesnesini kaldırma.
- Kompozisyonu bozmayan kablo, yansıma veya fazlalığı temizleme.
- Sahne içinde oluşmuş, anlamsız ve telif/marka niteliği taşımayan metni kaldırma.

## Kesinlikle yasak düzenlemeler

- Filigran silme.
- Telif bildirimi veya üretici imzası silme.
- Sağlayıcı logosu silme.
- Üçüncü tarafa ait marka/logo silme veya gizleme.

Bu öğeler tespit edilirse görsel düzenlenmez; aday reddedilir ve alternatif aranır.

## Kayıt

Her dönüşüm, içerik paketindeki `transformations.json` dosyasına; kaynak dosya, işlem türü, gerekçe ve tarih ile yazılır. Yapay zekâ ile temizleme yalnızca `AI_IMAGE_PROVIDER` yapılandırıldığında çalışır. Sağlayıcı yoksa sistem güvenli kırpma uygular veya adayı reddeder.
