import path from 'node:path';
import { quotaText } from './quota-utils.mjs';
const root = path.resolve(import.meta.dirname, '..');
console.log(`Medya kotası\n\n${quotaText(root)}\n\nNot: Bunlar projedeki temkinli günlük/aylık çalışma limitleridir; sağlayıcının anlık teknik limiti değildir.`);
