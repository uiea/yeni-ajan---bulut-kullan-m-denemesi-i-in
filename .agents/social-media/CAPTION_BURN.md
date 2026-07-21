# Skill: Caption Burn (Subtitle Overlay)

## Purpose
Burn SRT subtitles directly into video as styled text overlays. Essential for short-form where 85% of viewers watch without sound.

## Serves Goals
- **Retention** - captions keep muted viewers watching
- **Accessibility** - makes content accessible to hearing-impaired viewers
- **Reach** - platform algorithms favor captioned content

## Caption Style Presets

### Default: "Bold Center"
White bold text, black outline, centered lower third.
```
FontName=Montserrat Bold
FontSize=22
PrimaryColour=&H00FFFFFF
OutlineColour=&H00000000
Outline=2, Shadow=1, Alignment=2, MarginV=120
```

### "Highlight Word"
One word at a time, highlighted in accent color. Requires word-level SRT.
```
FontName=Montserrat ExtraBold
FontSize=26
PrimaryColour=&H00FFFFFF
SecondaryColour=&H005CF68B (accent color in BGR)
Outline=3, Shadow=0, Alignment=2, MarginV=140
```

### "Minimal"
Smaller text, semi-transparent background. For screen recordings.
```
FontName=Space Mono
FontSize=18
PrimaryColour=&H00FFFFFF
BackColour=&H80000000
BorderStyle=4, Outline=0, Alignment=2, MarginV=80
```

## Process
1. Ensure SRT timing matches the reel (offset if cut from longer video)
2. Burn subtitles:
```bash
ffmpeg -y -i reel.mp4 \
  -vf "subtitles=reel.srt:force_style='FontName=Montserrat Bold,FontSize=22,PrimaryColour=&H00FFFFFF,OutlineColour=&H00000000,Outline=2,Shadow=1,Alignment=2,MarginV=120'" \
  -c:v libx264 -preset medium -crf 18 \
  -c:a copy -movflags +faststart \
  reel_captioned.mp4
```
3. Quality check - verify placement doesn't overlap platform UI elements

## SRT Formatting Rules
- Max 2 lines per subtitle entry
- Max 35 characters per line (mobile readability)
- No more than 1.5 seconds gap between entries
- Special characters must render correctly

## Safe Zone (1080x1920)
- Top: ~150px (username/music bar)
- Bottom: ~250px (caption/CTA area on Reels)
- Safe zone for text: y=200 to y=1670

## Quality Bar
- Text must be readable on a phone screen
- No caption outside the safe zone
- Caption timing must match speech - max 0.2s drift
- No orphaned single words on a line

## Dependencies
- `ffmpeg` with libass support
- Montserrat font family (or fallback sans-serif)
