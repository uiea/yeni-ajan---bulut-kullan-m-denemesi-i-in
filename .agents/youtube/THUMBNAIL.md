# Skill: Thumbnail & Title Generation

## Purpose
Create compelling thumbnail concepts and title options that maximize click-through rate.

## Serves Goals
- Views (higher CTR = more views from the same impressions)
- Subscribers (strong thumbnails build channel identity and recognition)

## Inputs
- Approved video topic (from RESEARCH skill output)
- Brand identity and style guide
- Audience profile
- Past performance data

## Copywriting Engine
Apply copywriting principles for all title writing and thumbnail text:
- **Titles**: Use the 4 core emotions (NEW, EASY, SAFE, BIG), curiosity triggers, and editing methods
- **Thumbnail text**: Pick 2-4 words that push the strongest emotion for the video's angle
- **Variations**: Provide subtext analysis for each title/text option

## Process
1. Understand the video's core promise and hook
2. Generate 5-8 title candidates:
   - Apply curiosity gap and curiosity triggers
   - Push at least one of the 4 core emotions (NEW, EASY, SAFE, BIG)
   - Keep under 60 characters
   - Use specifics over generics
   - Match brand voice
3. Generate 2-3 thumbnail concepts for top titles:
   - Composition description (what's in the image, layout)
   - Text overlay (3-5 words max)
   - Emotion / expression
   - Color and contrast approach
   - What makes it stand out in a feed
4. Recommend an A/B test pair (2 title+thumbnail combos to test)

## Outputs
- Title options (ranked)
- Thumbnail concepts (described, not designed)
- A/B test recommendation
- Saved as `outputs/YYYY-MM-DD_youtube_thumbnail_topic-name.md`

## Quality Bar
- Titles pass the "would I click this?" test
- No clickbait that misrepresents the content
- Thumbnail concepts are executable with your available tools/photos
- Every recommendation ties back to CTR optimization

## Tools
- **AI Image Generation** (Fal AI, Midjourney, DALL-E, or similar)
  - Supports reference images + natural language prompts
  - Aspect ratio: `16:9` for YouTube thumbnails
  - Use lower resolution for drafts, higher for finals

## Thumbnail Style Guide

**Layout patterns:**
- Dark/black background with tech elements (grid, workflow nodes, light effects)
- Face on left OR right side (varies per video)
- Bold text: 2-4 words max
- Text styles: white text, OR colored highlight bar behind text
- Tool/brand logos when relevant

**Expressions:**
- Curious/excited (for discovery/new tool videos)
- Thinking/hand-on-chin (for strategy/comparison videos)
- Focused/skeptical (for tutorial/deep-dive videos)

**Text rendering tips:**
- Enclose desired text in quotes in the prompt
- Specify typography: "bold, white, sans-serif font"
- Describe placement: "text on the right side of the frame"

**What works (from analytics):**
- Specific outcomes in text ("$0 Cost", "+500K", "10x Faster")
- Question format ("Is it worth it?", "Dead?")
- Personal stakes/emotion in expression
- High contrast between face and background

**Prompt template:**
```
Take this exact photo of the person and place them into a YouTube thumbnail composition.

Do not change their face, hair, or features in any way - preserve their exact likeness.

Place them on the [left/right] third of the frame. Replace the background with a dark, moody tech environment: deep black with [background elements].

On the [opposite] side of the frame, add bold [white/color] sans-serif text that says "[TEXT]" in large, eye-catching typography.

Professional YouTube thumbnail: high contrast, cinematic lighting on the face, dark background, 16:9 aspect ratio.
```

**Photo selection by video emotion:**

| Expression | Use When Video Is About |
|-----------|------------------------|
| Serious, side profile | Warnings, serious takes, industry critique |
| Smiling, confident | Success stories, results, positive news, beginner guides |
| Friendly, casual | Tutorials, how-to, building something live |
| Raised eyebrow, doubtful | Reviews, comparisons, myth busting |
| Direct eye contact, serious | Masterclass, expert advice, "stop doing this" |
| Hand on chin, contemplative | Strategy, deep dive, predictions, analysis |
| Pointing, warm smile | CTAs, tutorials, recommendations |

**Selection logic:**
1. Determine the video's core emotion
2. Match to the photo whose expression best fits
3. When in doubt, prefer more energy (smiling > thinking) for CTR
4. Never use the same photo for consecutive videos

## Workflow

### For outlier research:
1. Find high-CTR competitor video
2. Analyze their thumbnail composition
3. Generate 2-3 variations in your style

### For pre-publish (auto-generation):
**Step 1: Title + Text Combos** - 3 options, each pushing a different emotional angle
**Step 2: Photo Selection** - match emotion, never repeat previous video
**Step 3: Generate via AI Image Tool** - include reference photo (CRITICAL), 16:9, draft resolution
**Step 4: Prompt Construction** - vary face position, background, text color per combo

**3 combo variations:**
- Combo 1: Face LEFT, text RIGHT, blue/neutral bg, white text - "clean" version
- Combo 2: Face RIGHT, text LEFT, red/warning bg, yellow text - "urgency" version
- Combo 3: Face LEFT (larger), text RIGHT, thematic bg, white + accent - "editorial" version

**Step 5: Present options** - show all 3 with a comparison table
