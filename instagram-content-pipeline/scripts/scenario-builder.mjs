import fs from 'node:fs';
import path from 'node:path';
import readline from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';

const root = path.resolve(import.meta.dirname, '..');
const rules = JSON.parse(fs.readFileSync(path.join(root, 'config', 'scenario-rules.json'), 'utf8'));
const args = process.argv.slice(2);
const mode = args[0];
const value = (flag) => args[args.indexOf(flag) + 1];

const chooseAuto = ({ goal, depth = 'standard' }) => {
  const normalized = (goal ?? '').toLocaleLowerCase('tr-TR');
  const key = /adım|liste|eğitim|nasıl/.test(normalized) ? 'stepByStep'
    : /bilgi|ipuç|rehber|karşılaştır/.test(normalized) ? 'educational'
    : /video|hareket|demo|göster/.test(normalized) ? 'dynamic'
    : /duyuru|teklif|tek mesaj|ilham/.test(normalized) ? 'singleMessage'
    : 'fallback';
  const format = rules.autoSelection[key];
  const details = rules.formats[format];
  return {
    mode: 'auto', format, goal, topic: value('--topic'),
    slides: format === 'carousel' ? details.slideRules[depth] : details.slides ?? null,
    durationSeconds: format === 'reel' ? details.durationSeconds[depth] : null,
    textOnVisual: format !== 'reel', captionRequired: format !== 'single-image', reviewStatus: 'draft'
  };
};

if (mode === 'auto') {
  const brief = chooseAuto({ goal: value('--goal'), depth: value('--depth') || 'standard' });
  console.log(JSON.stringify(brief, null, 2));
} else if (mode === 'guided') {
  const rl = readline.createInterface({ input, output });
  const topic = await rl.question('Konu nedir? ');
  const goal = await rl.question('Amaç nedir? (duyuru/bilgi/adım adım/video/teklif): ');
  const format = await rl.question('Format seç: 1 tek görsel, 2 tek görsel+açıklama, 3 carousel, 4 reel: ');
  const map = { '1': 'single-image', '2': 'single-image-caption', '3': 'carousel', '4': 'reel' };
  const selected = map[format] ?? 'single-image-caption';
  const details = rules.formats[selected];
  const brief = { mode: 'guided', topic, goal, format: selected, textOnVisual: await rl.question('Görsel üzerinde metin olsun mu? (evet/hayır): '), reviewStatus: 'draft' };
  if (selected === 'carousel') brief.slides = Number(await rl.question('Kaç slayt? (4, 6, 8 veya 10): ')) || 6;
  if (selected === 'reel') brief.durationSeconds = Number(await rl.question('Kaç saniye? (8, 15 veya 30): ')) || 15;
  brief.dimensions = details.dimensions;
  console.log(JSON.stringify(brief, null, 2));
  rl.close();
} else {
  throw new Error('Kullanım: scenario-builder.mjs auto --topic "..." --goal "..." [--depth quick|standard|deep] | guided');
}
