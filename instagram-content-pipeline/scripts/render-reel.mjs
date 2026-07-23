import fs from 'node:fs';
import path from 'node:path';
import { spawn } from 'node:child_process';

const args = process.argv.slice(2);
const value = (flag) => { const index = args.indexOf(flag); return index >= 0 ? args[index + 1] : undefined; };
const image = value('--image');
const audio = value('--audio');
const output = value('--output');
const duration = Number(value('--duration') ?? 15);
if (!image || !audio || !output || !Number.isFinite(duration) || duration < 3 || duration > 60) throw new Error('Usage: render-reel.mjs --image <image> --audio <audio> --output <mp4> [--duration 15]');
if (!fs.existsSync(image) || !fs.existsSync(audio)) throw new Error('Görsel veya onaylı ses dosyası bulunamadı.');
const root = path.resolve(import.meta.dirname, '..');
const findFfmpeg = () => {
  if (process.env.FFMPEG_PATH && fs.existsSync(process.env.FFMPEG_PATH)) return process.env.FFMPEG_PATH;
  const packageRoot = path.join(process.env.LOCALAPPDATA ?? '', 'Microsoft', 'WinGet', 'Packages');
  if (fs.existsSync(packageRoot)) {
    const packageDir = fs.readdirSync(packageRoot).find((name) => name.startsWith('Gyan.FFmpeg_'));
    if (packageDir) {
      const bin = path.join(packageRoot, packageDir);
      const children = fs.readdirSync(bin);
      const build = children.find((name) => name.startsWith('ffmpeg-'));
      const candidate = build && path.join(bin, build, 'bin', 'ffmpeg.exe');
      if (candidate && fs.existsSync(candidate)) return candidate;
    }
  }
  return 'ffmpeg';
};
fs.mkdirSync(path.dirname(output), { recursive: true });
const filter = 'scale=1080:1920:force_original_aspect_ratio=increase,crop=1080:1920,format=yuv420p';
const child = spawn(findFfmpeg(), ['-y', '-loop', '1', '-i', image, '-stream_loop', '-1', '-i', audio, '-t', String(duration), '-vf', filter, '-af', 'volume=0.16,afade=t=in:st=0:d=0.5,afade=t=out:st=' + Math.max(0, duration - 1) + ':d=1', '-c:v', 'libx264', '-r', '30', '-c:a', 'aac', '-b:a', '192k', '-shortest', output], { windowsHide: true, stdio: 'inherit' });
await new Promise((resolve, reject) => { child.on('error', reject); child.on('close', (code) => code === 0 ? resolve() : reject(new Error(`FFmpeg render başarısız: ${code}`))); });
console.log(output);
