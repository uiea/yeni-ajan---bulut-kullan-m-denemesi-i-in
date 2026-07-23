# Bulutta ücretsiz çalışma planı

## Hedef

Bilgisayar kapalıyken Telegram'dan konu alma, içerik üretme, önizleme/onay alma ve resmi Meta API ile Instagram yayınını sürdürmek.

## Seçilen başlangıç mimarisi

- Ana işçi: Oracle Cloud Always Free üzerinde Ubuntu VM.
- Sürekli çalışan servisler: Telegram botu, içerik kuyruğu, medya işçisi ve FFmpeg render.
- Veri: SQLite; kaynak/provenance bilgileri ve gönderi geçmişi.
- Dosyalar: VM diski; seçili paketler için yedekleme.
- Yayınlama: Instagram profesyonel hesabına Meta'nın resmi Publishing API'si.
- Vercel: gerekli değil; ileride yalnızca yönetim arayüzü/webhook katmanı için değerlendirilebilir.

## Ücretsiz kullanım ilkeleri

- Yalnızca `Always Free Eligible` kaynak oluştur.
- Ücretli kaynak veya deneme kredisiyle oluşturulmuş servis kullanma.
- Günlük konu, medya indirme, render ve yayın limitlerini koru.
- Uzun video yerine kısa, şablon temelli reel kullan.
- Sıfırdan ücretli yapay zeka görsel/video üretimi yerine lisanslı stok medya + otomatik tasarım kullan.

## Kurulum sırası

1. Oracle Always Free hesabı ve Ubuntu VM.
2. Node.js, FFmpeg, sistem servisi ve güvenli ortam değişkenleri.
3. Telegram botunun mevcut akışını VM'ye taşıma.
4. Pexels, Pixabay ve Unsplash kaynak bağlantıları ile provenance kaydı.
5. Meta profesyonel hesap ve Instagram Publishing API.
6. Taslak/önizleme → Telegram onayı → yayın akışı.

## Riskler

- Oracle Always Free boşta kalan VM'leri geri alabilir; sağlık kontrolü ve yedek gerekir.
- Instagram yayınlama için resmi Meta bağlantısı gerekir.
- Video render ücretsiz VM'de sınırlı tutulmalıdır.
