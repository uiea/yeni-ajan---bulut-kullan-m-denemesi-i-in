# Skill: Reel Cut (End-to-End)

## Purpose
Take a source video and produce ready-to-upload 9:16 vertical reels with burned-in captions.

## Serves Goals
- **Reach** - finished reels for Instagram, TikTok, YouTube Shorts
- **Speed** - eliminates the gap between "clip identified" and "reel uploaded"

## Process

### Step 1: Acquire Video
```bash
yt-dlp -f "bestvideo+bestaudio/best" --merge-output-format mp4 \
  --write-auto-sub --sub-lang tr --convert-subs srt \
  -o "full_video.%(ext)s" "{url}"
```

### Step 2: Transcribe (if no SRT exists)
Use Whisper or your transcription pipeline.

### Step 3: Identify Best Segments
Use CLIPS skill timestamps or auto-detect best 30-90s segments.

### Step 4: Cut to 9:16 Vertical
Center-crop the source video to 9:16, then scale to 1080x1920.

```bash
ffmpeg -y -ss {start} -to {end} -i full_video.mp4 \
  -vf "crop={crop_w}:{crop_h}:{x_offset}:{y_offset},scale=1080:1920" \
  -c:v libx264 -preset medium -crf 18 \
  -c:a aac -b:a 192k \
  -movflags +faststart \
  reel_{N}_{slug}.mp4
```

**Center crop calculation:**
```
source_ratio = width / height
target_ratio = 9 / 16

if source_ratio > target_ratio:
    crop_h = height
    crop_w = int(height * 9/16)
else:
    crop_w = width
    crop_h = int(width * 16/9)

x_offset = (width - crop_w) // 2
y_offset = (height - crop_h) // 2
```

**CRITICAL:** Always center-crop. Never add black bars.

### Step 5: Burn Captions
See CAPTION_BURN skill for full details.

### Step 6: Validate
- Resolution: 1080x1920
- Duration: within platform limits
- Codec: H.264 + AAC

## Quality Bar
- Hook grabs in first 2 seconds
- No mid-word cuts - add 0.3-0.5s padding
- If speaker repeats a line (retake), keep ONLY the last version
- Self-contained - no references to earlier content
- Audio levels normalized (-16 LUFS for social media)
- Captions readable on mobile

## Dependencies
- `yt-dlp` - video download
- `ffmpeg` / `ffprobe` - cutting, cropping, caption burn
