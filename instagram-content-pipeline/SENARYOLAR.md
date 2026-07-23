# İçerik senaryoları

## Otomatik mod

Sistem konu ve amaca göre formatı seçer:

| Amaç | Otomatik seçim |
|---|---|
| Duyuru, teklif, tek mesaj | Tek görsel + açıklama |
| Bilgi, ipucu, rehber | 6 slayt carousel |
| Adım adım veya liste | 6 slayt carousel |
| Demo, hareketli hikâye | 15 saniye reel |

`quick` carousel 4, `standard` 6, `deep` 8 slayttır. En yüksek sayı 10'dur.

```powershell
node .\scripts\scenario-builder.mjs auto --topic "Küçük işletmeler için otomasyon" --goal "adım adım rehber" --depth standard
```

## Rehberli mod

Her seçim tek tek sorulur: konu, amaç, format, görsel üstü metin, carousel slayt sayısı veya reel süresi.

```powershell
node .\scripts\scenario-builder.mjs guided
```

Her iki mod da `reviewStatus: draft` ile başlar; medya araması, render veya Instagram eylemi otomatik başlatılmaz.
