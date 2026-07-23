import fs from 'node:fs';
import path from 'node:path';

const [topicId, operation, reason] = process.argv.slice(2);
if (!topicId || !operation || !reason) throw new Error('Usage: record-media-transformation.mjs <topic-id> <operation> <reason>');

const root = path.resolve(import.meta.dirname, '..');
const policy = JSON.parse(fs.readFileSync(path.join(root, 'config', 'media-sanitization-policy.json'), 'utf8'));
const disallowed = new Set(policy.neverAlter);
if (disallowed.has(operation)) throw new Error(`Bu öğe düzenlenemez: ${operation}. Alternatif görsel aranmalı.`);
if (!policy.allowedTargets.includes(operation)) throw new Error(`İzinli temizleme işlemi değil: ${operation}.`);

const file = path.join(root, 'packages', `telegram-${topicId}`, 'transformations.json');
const record = fs.existsSync(file) ? JSON.parse(fs.readFileSync(file, 'utf8')) : { operations: [] };
record.operations.push({ operation, reason, recordedAt: new Date().toISOString(), status: 'planned' });
record.sanitizationStatus = 'cleanup-planned';
fs.writeFileSync(file, JSON.stringify(record, null, 2));
console.log(`Recorded ${operation} cleanup for ${topicId}.`);
