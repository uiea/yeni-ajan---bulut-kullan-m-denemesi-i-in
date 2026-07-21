import { chromium } from "playwright";
import fs from "node:fs";
import path from "node:path";
import process from "node:process";

const args = process.argv.slice(2);
const value = (name) => args[args.indexOf(name) + 1];
const image = value("--image");
const caption = value("--caption") ?? "";
const shouldPublish = args.includes("--publish");

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
const create = page.getByRole("link", { name: /create|oluştur/i }).or(page.getByRole("button", { name: /create|oluştur/i }));
await create.first().waitFor({ state: "visible", timeout: 60000 });
await create.first().click();
const chooseFromComputer = page.getByRole("button", { name: /select from computer|bilgisayardan seç/i });
if (await chooseFromComputer.count()) {
  await chooseFromComputer.first().click();
}
const fileInput = page.locator('input[type="file"]');
await fileInput.waitFor({ state: "attached", timeout: 60000 });
await fileInput.setInputFiles(path.resolve(image));

for (let i = 0; i < 2; i += 1) {
  const next = page.getByRole("button", { name: /next|ileri/i });
  await next.waitFor({ state: "visible", timeout: 30000 });
  await next.click();
}

const captionBox = page.locator('textarea').or(page.locator('[contenteditable="true"]'));
await captionBox.first().waitFor({ state: "visible", timeout: 30000 });
await captionBox.first().fill(caption);

if (!shouldPublish) {
  console.log("Gönderi hazırlandı. Tarayıcıdaki Paylaş düğmesine basılmadı.");
  console.log("Paylaşmak için aynı komutu --publish parametresiyle, açık onaydan sonra çalıştır.");
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
