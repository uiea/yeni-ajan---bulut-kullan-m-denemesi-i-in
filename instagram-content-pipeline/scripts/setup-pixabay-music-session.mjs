import path from 'node:path';
import { chromium } from '../../instagram-publisher/node_modules/playwright/index.mjs';

const root = path.resolve(import.meta.dirname, '..');
const profilePath = path.join(root, 'data', 'pixabay-music-browser-profile');
const browser = await chromium.launchPersistentContext(profilePath, { headless: false, channel: 'chrome', viewport: { width: 1280, height: 900 } });
const page = browser.pages()[0] ?? await browser.newPage();
await page.goto('https://pixabay.com/music/', { waitUntil: 'domcontentloaded' });
console.log('Pixabay Music açıldı. Giriş yap, ardından bu pencereyi kapat. Oturum sonraki otomatik indirmeler için saklanacak.');
await new Promise((resolve) => browser.on('close', resolve));
