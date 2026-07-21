# Skill: Twitter Carousel (Value Cards)

## Purpose
Transform a YouTube video into a 4-image Twitter carousel post - each image is a standalone value card packed with a specific insight, stat, or actionable takeaway.

## Serves Goals
- **Reach** - multi-image posts get higher engagement and dwell time
- **Authority** - branded, clean visuals position you as a serious practitioner
- **Saves & shares** - value-packed cards get bookmarked and screenshot-shared

## Inputs
- Video transcript (full text)
- Key content blocks
- Branding banner image (your photo + name + handle)

## Slide System (4 Cards)

**Card 1 - Hook Card:**
- Bold headline (most surprising/counterintuitive finding)
- 1-line supporting context beneath
- Dark background, white text
- Your branding banner at the bottom

**Cards 2-3 - Value Cards:**
- Each card = ONE specific insight, stat, or actionable step
- Bold headline + 2-3 bullet points
- Dark background, white text
- Card number indicator top-right
- No branding - all space goes to content

**Card 4 - CTA Card:**
- Key takeaway in 1 sentence
- Your branding banner at the bottom
- "Full video" link or reply-generating question

### Content Extraction Rules
From the video, extract exactly 4 pieces:
1. **The hook** - most surprising result, stat, or claim
2. **The how** - specific method, tool, or setup
3. **The proof** - numbers, benchmarks, before/after
4. **The takeaway** - what the viewer should do next

### Visual Design Spec
```
Canvas: 1600 x 900px (16:9)
Background: #0D0D0D (near-black)
Text: #FFFFFF (headlines), #B0B0B0 (body/bullets)
Accent: #1D9BF0 (Twitter blue, sparingly)
Font style: Clean sans-serif
Banner zone: bottom 200px on Card 1 & 4
```

## Quality Bar
- Every card must pass the **screenshot test** - would someone screenshot and share it?
- Headline must carry the message alone
- No walls of text - max 3 bullet points per card
- Text must be readable on mobile WITHOUT zooming
- Numbers and specific results always beat vague claims

## Tools
- ImageMagick (via bash) - canvas creation, text rendering, compositing
- Video transcript and content blocks

## When to Use This vs. Twitter Thread
- **Carousel:** Video has 3-4 concrete, visual-friendly insights
- **Thread:** Video needs a narrative arc or the value is in the story
- **Both:** Create both formats, post whichever performs better
