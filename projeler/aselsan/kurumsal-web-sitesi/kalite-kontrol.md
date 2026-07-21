# Kalite ve Teslim Kontrolü

Denetim tarihi: 19 Temmuz 2026  
Kapsam: `index.html` ve `styles.css` statik konsept incelemesi. Canlı yayın veya dış aktarım yapılmadı.

## P0 — Yayın öncesi zorunlu

### Resmî site olarak algılanma riski

Metin doğrudan ASELSAN ismini kullanmasa da güvenilir altyapı, kritik süreçler ve ileri teknoloji söylemi hedef şirketle özdeşleştirilebilir. Footer’daki “resmi web sitesi değildir” uyarısı faydalı fakat sayfanın sonunda ve düşük görünürlükte.

- İlk ekranda veya üst bilgi yanında “Bağımsız tasarım konsepti — resmî ASELSAN sitesi değildir” ibaresi ekleyin.
- Resmî marka logosu, kurumsal renk/varlık, ticari marka ve doğrulanmamış ürün/başarı iddiaları kullanmayın.
- Yayın niyeti oluşursa alan adı, telif, marka kullanımı ve içerik onayını müşteriyle yazılı olarak doğrulayın.

## P1 — Yüksek öncelik

### Klavye odağı görünür değil

Bağlantılara klavye ile ulaşılıyor fakat `:focus-visible` stili yok. Odak göstergesi tarayıcı varsayılanına kalır ve koyu zeminde yeterince belirgin olmayabilir.

- Tüm etkileşimli bağlantılar için en az 3:1 kontrastlı, 2–3 px dış hat ekleyin: ör. `a:focus-visible { outline: 3px solid var(--cyan); outline-offset: 4px; }`.
- Klavyeyle logo, menü, hero bağlantıları, kart bağlantıları ve e-posta bağlantısının odak sırasını test edin.

### Dokunma hedefleri bazı yerlerde küçük

Kartlardaki yalnızca ok işaretinden oluşan bağlantılar görsel olarak yaklaşık 22 px; mobil hedef boyutu önerilen 44×44 px’in altında kalabilir.

- Kart sonundaki bağlantıları en az 44×44 px tıklanabilir alan yapın veya metinli bağlantıya dönüştürün.
- Odak halkasının kart sınırı tarafından kesilmediğini doğrulayın.

### Mobil gezinme alternatif içermiyor

800 px altında ana navigasyon ve CTA gizleniyor; sayfa içi bölümlere erişim yalnızca içerik akışıyla kalıyor.

- Mobilde menüyü açan erişilebilir bir düğme ve açılır menü ekleyin; `aria-expanded`, görünür odak ve Escape ile kapanma davranışı sağlayın.
- JavaScript eklenmeyecekse, en azından kritik “İletişim” bağlantısını üst barda görünür bırakın.

### Kontrastı doğrulayın

Ana koyu zemin üzerindeki `--muted` (#9aadb8) ve açık bölümdeki #55717d metinleri küçük puntolarda sınırda olabilir; gradient alanlarda arka plan değiştiği için sonuç değişir.

- WCAG AA için normal metinde en az 4.5:1 kontrastı gerçek tarayıcı görünümünde ölçün.
- Kontrast yetersizse özellikle açıklama metinlerini daha açık/koyu bir tona alın; sadece hover ile bilgi aktarmayın.

## P2 — Orta öncelik

### Semantik iyileştirmeler

`header`, `nav`, `main`, `section`, `article` ve başlık hiyerarşisi genel olarak doğru. Ancak soyut görsel, açıklayıcı etikete rağmen yalnızca dekoratif CSS elemanlarından oluşuyor ve metrik bölümü liste yapısına daha uygun.

- Görsel bilgi taşımıyorsa `.hero-visual` için `aria-hidden="true"` kullanın; bilgi taşıyacaksa gerçek, kısa alternatif metin sunun.
- Üç metrik satırını `ol`/`li` ile işaretlemeyi değerlendirin.
- Sayfanın başına ana içeriğe atlayan görünür odaklı “İçeriğe geç” bağlantısı ekleyin.

### Animasyon tercihi tanımlı değil

Hover dönüşümü var; ileride hareket eklendiğinde hareket hassasiyeti olan kullanıcılar etkilenebilir.

- `prefers-reduced-motion: reduce` içinde yumuşak kaydırmayı ve geçişleri azaltın/kapatın.

### Haricî font bağımlılığı ve performans

Google Fonts, ek ağ istekleri ve üçüncü taraf gizlilik/erişilebilirlik bağımlılığı oluşturuyor. `preconnect` doğru kullanılmış; ancak font yüklenemezse görünüm değişir.

- Yayın için fontları lisans koşulları uygunsa yerelde self-host edin veya sistem yazı tipi yedeğini daha dikkatli ayarlayın.
- Fontlarda yalnızca gereken ağırlıkları isteyin; gerekirse `font-display=swap` zaten URL’de mevcut olduğundan korunmalı.
- CSS büyük ölçüde tek dosyada ve görsel CSS ile üretildiği için görsel optimizasyon ihtiyacı düşük; dış görsel eklendiğinde boyut, `width`/`height`, modern format ve lazy loading uygulayın.

### Bağlantı ve iletişim doğruluğu

Sayfa içi bağlantı hedefleri mevcut ve `mailto:` bağlantısı çalışır. Ancak `iletisim@ornek.com` yer tutucudur; gerçek sayfada kullanıcıyı yanlış yere yönlendirir.

- Teslimden önce onaylı müşteri iletişim kanalıyla değiştirin veya iletişim formu/telefon gibi gerçek bir kanal ekleyin.
- Dış bağlantı eklenirse açıklayıcı bağlantı metni ve yeni pencerede açılıyorsa uygun uyarı sağlayın.

## Kabul kontrol listesi

- [ ] Türkçe metinler UTF-8 olarak doğru görüntüleniyor (dosyalar UTF-8 olarak geçerli; tarayıcıda da doğrulayın).
- [ ] Resmî olmayan konsept uyarısı ilk ekranda ve footer’da görünür.
- [ ] Klavye odağı tüm bağlantılarda açıkça görünüyor.
- [ ] 320 px, 375 px, 768 px ve masaüstünde yatay taşma yok.
- [ ] Metin kontrastları WCAG AA ölçümünden geçiyor.
- [ ] Mobilde ana bölümlere ve iletişime erişim korunuyor.
- [ ] Yer tutucu e-posta, onaylı iletişim bilgisiyle değiştirildi veya kaldırıldı.
