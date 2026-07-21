# Skill: Motion Graph (Remotion Video)

## Purpose
Turn static HTML visuals, SaaS screenshots, or data into animated MP4 videos using Remotion (React-based video framework). Always includes professional SFX.

## Tech Stack
- **Framework:** Remotion (React + TypeScript)
- **Resolution:** 1920x1080 @ 30fps (horizontal), 1080x1920 (vertical/shorts)
- **SFX:** ElevenLabs Sound Generation API (primary)
- **Output:** MP4

### Available Remotion Packages
| Package | Use Case |
|---------|----------|
| `remotion` | Core: Composition, useCurrentFrame, interpolate, Easing, Audio, Sequence |
| `@remotion/google-fonts` | Load Google Fonts directly |
| `@remotion/motion-blur` | Add motion blur to fast-moving elements |
| `@remotion/media-utils` | Audio waveform visualization |
| `@remotion/three` | 3D scenes with Three.js |

## SFX Rules (Critical)
1. **Always add SFX** - no silent videos
2. **Check existing SFX first** - look in `public/` for reusable mp3s
3. **ElevenLabs is primary** - `POST /v1/sound-generation`, ~$0.01/sec
4. **Layer multiple audio tracks** - ambient pad + event sounds

### Proven SFX Prompts
| SFX Type | Prompt | Duration |
|----------|--------|----------|
| **Typing** | "mechanical keyboard typing, fast rhythmic clicks, cherry mx switches, ASMR quality" | 15s |
| **Whoosh** | "smooth cinematic UI whoosh transition, soft digital swoosh, futuristic interface" | 1s |
| **Chime** | "delicate glass chime notification, crystal clear UI alert, premium app notification" | 1.5s |
| **Complete** | "satisfying task complete sound, ascending two-tone chime with shimmer" | 1.5s |
| **Ambient** | "soft ambient technology background pad, dark minimal electronic atmosphere" | match video |
| **Power Surge** | "deep rumbling bass with electrical energy buildup, subsonic power surge" | match typing +1s |

## Animation Principles
1. **Slow zoom** - subtle continuous zoom (1x to 1.05-1.08x) for cinematic feel
2. **Phased reveals** - stagger child elements by 3-5 frames each
3. **Easing** - `Easing.out(Easing.cubic)` or spring config for entrances
4. **Glow on focus** - layer 2-3 box-shadows with increasing blur
5. **Typing animation** - character by character with blinking cursor
6. **Keep it dark** - #0D0D0D background, rgba whites, colored accents only
7. **Screen shake** - multi-frequency sin/cos jitter for organic feel
8. **Completion burst** - big flash + shake spike on key action finish
9. **No movement before hero** - keep UI still until dramatic moment
10. **Anticipation** - slight shrink before spring pop (Disney principle)
11. **Rest beats** - 8-12 frame pauses between animation sequences
12. **Breath pause** - 4-frame total silence before hero moment (tension)
13. **Consistent motion direction** - all entries from same direction per scene
14. **Smear frames** - brief scaleX(1.03) stretch during fast transitions
15. **Counter-rotation** - subtle rotateZ during snap zoom for disorientation

## YouTube B-Roll / Intro Techniques

### Camera & Motion
- **Accelerating dolly zoom** - push-in that speeds up
- **Instant snap zoom** - 6-10 frame transition to action area
- **3D perspective tilt** - subtle rotateX/Y shift for depth
- **Parallax layers** - background/foreground at different speeds

### Visual FX
- Chromatic aberration, anamorphic lens flare, dynamic vignette
- Film grain (SVG feTurbulence), floating dust particles
- Edge light streaks, color temperature shift, white flash frame
- Pulsing card border, micro-rotation, bokeh dots

### Two Composition Types
| Aspect | Full Demo | YouTube B-Roll |
|--------|-----------|----------------|
| Duration | 10-18s | 3-6s |
| Typing speed | 1.5-4.5 chars/frame | 6-10 chars/frame |
| Entrance | Gradual fade | Spring pop |
| Shake range | 2-7px | 3-11px |
| Camera | Slow steady zoom | Accelerating dolly + snap zoom |
| Extras | None | Letterbox, grain, vignette, aberration, flare |

## Process
1. Analyze source (screenshot, HTML, or concept)
2. Recreate UI in React with brand design system
3. Plan animation timeline with frame ranges
4. Check/generate SFX (ElevenLabs)
5. Wire audio to visual events
6. Add slow zoom
7. Render: `npx remotion render CompositionId out/filename.mp4`
