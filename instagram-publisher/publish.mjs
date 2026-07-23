import { chromium } from "playwright";
import fs from "node:fs";
import path from "node:path";
import process from "node:process";

const args = process.argv.slice(2);
const value = (name) => args[args.indexOf(name) + 1];
const image = value("--image");
const caption = value("--caption") ?? "";
const shouldPublish = args.includes("--publish");
const shouldSaveDraft = args.includes("--save-draft");

if (!image || !fs.existsSync(image)) {
  console.error("Kullanım: npm run publish -- --image <görsel-yolu> --caption <metin> [--publish]");
  process.exit(1);
}

const browser = await chromium.launchPersistentContext(path.resolve("profile"), {
  headless: false,
  channel: "chromium",
  viewport: { width: 1280, height: 900 },
});
const page = browser.pages()[0] ?? await browser.newPage();
const keepBrowserOpen = () => new Promise((resolve) => browser.on("close", resolve));

try {
await page.goto("https://www.instagram.com/", { waitUntil: "domcontentloaded" });

// İlk çalıştırmada kullanıcı tarayıcıdaki giriş / iki aşamalı doğrulama adımını tamamlar.
await page.waitForTimeout(1000);
if (await page.getByText(/Log in|Giriş yap/i).count()) {
  console.log("Tarayıcıda Instagram'a giriş yap. Giriş tamamlandıktan sonra bu pencere otomatik devam eder.");
  await page.waitForURL(/instagram\.com\/(?!accounts\/login)/, { timeout: 0 });
}

// Instagram, girişten sonra güvenlik kontrolleri ve One Tap ekranları gösterebilir.
// Ana menünün gerçekten hazır olmasını beklemeden dosya seçiciyi arama.
await page.waitForTimeout(3000);
const create = page.locator('a[href^="/create/select/"]')
  .or(page.locator('svg[aria-label="New post"], svg[aria-label="Yeni gönderi"], svg[aria-label="Create"], svg[aria-label="Oluştur"]').locator('xpath=..'))
  .or(page.getByRole("link", { name: /create|oluştur|new post|yeni gönderi/i }))
  .or(page.getByRole("button", { name: /create|oluştur|new post|yeni gönderi/i }));
await create.first().waitFor({ state: "visible", timeout: 60000 });
await create.first().click();
await page.waitForTimeout(500);

// Bazı Instagram arayüzlerinde Oluştur ilk olarak tür seçimi (Post/Reel/Story) açar.
const postChoice = page.getByText(/^(post|gönderi)$/i);
if (await postChoice.count()) {
  await postChoice.first().click();
  await page.waitForTimeout(500);
}

const chooseFromComputer = page.getByText(/select from computer|bilgisayardan seç/i);
if (await chooseFromComputer.count()) {
  await chooseFromComputer.first().click();
}
const fileInput = page.locator('input[type="file"]');
await fileInput.waitFor({ state: "attached", timeout: 60000 });
await fileInput.setInputFiles(path.resolve(image));

for (let i = 0; i < 2; i += 1) {
  const next = page.getByRole("button", { name: /next|ileri|İleri/i })
    .or(page.getByText(/^(next|ileri|İleri)$/i));
  await next.waitFor({ state: "visible", timeout: 30000 });
  await next.click();
}

const captionBox = page.locator('textarea').or(page.locator('[contenteditable="true"]'));
await captionBox.first().waitFor({ state: "visible", timeout: 30000 });
await captionBox.first().fill(caption);

if (shouldSaveDraft) {
  // Instagram Web taslağı, paylaşım ekranından kapatma isteği gönderildiğinde
  // açılan "Taslağı kaydet" onayıyla saklanır.
  await page.screenshot({ path: "taslak-onizleme.png", fullPage: true });
  await page.keyboard.press("Escape"); // hashtag önerilerini kapat
  await page.waitForTimeout(300);
  // Bu Instagram düzeninde pencereyi kapatma işareti, form diyaloğunun dışında yer alır.
  const close = page.locator('[aria-label="Close"], [aria-label="Kapat"]').last();
  if (await close.count()) {
    await close.click();
  } else {
    await page.mouse.click(1237, 27);
  }
  const saveDraft = page.getByRole("button", { name: /save draft|taslağı kaydet|taslak olarak kaydet/i })
    .or(page.getByText(/save draft|taslağı kaydet|taslak olarak kaydet/i));
  await saveDraft.first().waitFor({ state: "visible", timeout: 30000 });
  await saveDraft.first().click();
  console.log("Gönderi Instagram taslaklarına kaydedildi. Yayın yapılmadı.");
  await page.waitForTimeout(3000);
  await browser.close();
} else if (!shouldPublish) {
  console.log("Gönderi hazırlandı. Tarayıcıdaki Paylaş düğmesine basılmadı.");
  console.log("Taslak kaydı için --save-draft, paylaşım için --publish parametresi gerekir.");
  // Tarayıcı ve taslak ekranda açık kalsın; kullanıcı pencereyi kapattığında süreç biter.
  await keepBrowserOpen();
} else {
  const share = page.getByRole("button", { name: /share|paylaş/i });
  await share.waitFor({ state: "visible", timeout: 30000 });
  await share.click();
  console.log("Paylaş komutu gönderildi.");
  await page.waitForTimeout(5000);
  await browser.close();
}
} catch (error) {
  console.error("Taslak hazırlanamadı. Tarayıcı açık bırakıldı; ekranı kapatmadan hata mesajını paylaşabilirsin.");
  console.error(error);
  await page.screenshot({ path: "hata-ekrani.png", fullPage: true }).catch(() => {});
  await keepBrowserOpen();
}
