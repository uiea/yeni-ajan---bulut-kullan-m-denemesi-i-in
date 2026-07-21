# Skill: Presentation

## Purpose
Build polished, single-file HTML presentations (slide decks) that run in any browser - no PowerPoint, no Keynote, no external dependencies.

## Inputs
- Topic, audience, slide outline, length, language

## Process
1. Parse slide outline - understand narrative arc
2. Determine slide types: title, statement, data, list, image, profile, quote, CTA
3. Build as single-file HTML with inline CSS + JS:
   - Keyboard navigation (arrows, Space, Enter)
   - Click navigation (left/right zones)
   - Slide counter, smooth transitions, fullscreen (F key)
   - Optimized for 16:9 (1920x1080)
4. Apply brand design system

## Design System
- **Background:** #0D0D0D (near-black) with dot grid texture
- **Fonts:** Outfit (titles 48-72px, body 24-32px), Space Mono (data/numbers)
- **Colors:** rgba whites for text, accent colors for highlights
- **Layout:** Generous padding (80-120px), max 60% of slide area used, one idea per slide

## Navigation
| Key | Action |
|-----|--------|
| Right / Space / Enter | Next slide |
| Left / Backspace | Previous slide |
| F | Toggle fullscreen |
| Home / End | First / Last slide |

Click left 30% = previous, right 70% = next.

## Quality Bar
- Each slide communicates ONE clear idea
- Works in Chrome/Safari/Firefox at 1920x1080
- Transitions are smooth (CSS transitions)
- No external API calls or runtime dependencies
- File size < 200KB
- Readable from 3+ meters away
