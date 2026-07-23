# Sürekli önizleme işçisi

`preview-worker.mjs --watch`, `preview-queue.json` içindeki `queued` işleri sürekli tarar.

İş sırası:

1. Kuyruktaki işin hâlâ `brief-ready` durumda olduğunu doğrular.
2. Pexels'te uygun medya arar ve indirir.
3. Kaynak/lisans kaydını oluşturur.
4. Farklılaştırılmış açıklama ve hashtag paketini üretir.
5. Görsel üstü metin seçilmişse başlığı render eder.
6. Telegram önizlemesini ve inceleme butonlarını gönderir.

Hata durumunda iş `failed` olur; hata nedeni kayda yazılır ve Telegram ilerleme mesajı güncellenir. İptal edilmiş veya eski durumdaki işler `skipped` olur; yanlışlıkla yeniden işlenmez.
