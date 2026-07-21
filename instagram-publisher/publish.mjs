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
  viewport: { width: 1280, height: 900 },
});
const page = browser.pages()[0] ?? await browser.newPage();
await page.goto("https://www.instagram.com/", { waitUntil: "domcontentloaded" });

// İlk çalıştırmada kullanıcı tarayıcıdaki giriş / iki aşamalı doğrulama adımını tamamlar.
await page.waitForTimeout(1000);
if (await page.getByText(/Log in|Giriş yap/i).count()) {
  console.log("Tarayıcıda Instagram'a giriş yap. Giriş tamamlandıktan sonra bu pencere otomatik devam eder.");
  await page.waitForURL(/instagram\.com\/(?!accounts\/login)/, { timeout: 0 });
}

const create = page.getByRole("link", { name: /create|oluştur/i }).or(page.getByRole("button", { name: /create|oluştur/i }));
await create.first().click();
const fileInput = page.locator('input[type="file"]');
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
  await page.waitForTimeout(0);
} else {
  const share = page.getByRole("button", { name: /share|paylaş/i });
  await share.waitFor({ state: "visible", timeout: 30000 });
  await share.click();
  console.log("Paylaş komutu gönderildi.");
  await page.waitForTimeout(5000);
  await browser.close();
}
