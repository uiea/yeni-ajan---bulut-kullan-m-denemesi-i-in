# Skill: Interactive Chart

## Purpose
Build interactive, animated HTML charts from raw data that make complex information instantly understandable.

## Inputs
- Raw data (CSV, JSON, screenshot, or manually described data points)
- Context: what story does this chart need to tell?
- Target format: screen recording for video, or embeddable link

## Process
1. Analyze the raw data - identify the core insight/story
2. Choose chart type: radar, bar, line, sankey/flow, or custom
3. Build as single-file HTML (inline CSS + JS, no external deps except CDN libs)
4. Add interactive elements: hover tooltips, click to toggle, animate entrance
5. Add storytelling layer: annotations, step-by-step reveal, color coding

## Design System
- **Background:** #0D0D0D with subtle grid overlay
- **Fonts:** Space Mono (data/numbers), Outfit (labels/body) via Google Fonts CDN
- **Colors:** muted whites for text, red for negative/warning, green for positive
- **Feel:** dark, technical, minimal - like a developer dashboard

## Quality Bar
- Chart must communicate the core insight without explanation
- Follows brand design system (dark, grid texture)
- Works in Chrome/Safari at 1920x1080 without scrolling
- Animations are smooth (60fps)
- Color palette is accessible (colorblind-safe)
- No external API calls that could break
- File size < 500KB
