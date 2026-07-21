# Skill: Static Image Design

## Purpose

Generate brand-perfect static ad images for Facebook and Instagram - single images and carousel cards - that stop the scroll and drive clicks while maintaining absolute brand consistency.

## Serves Goals

- **CTR >2%** - scroll-stopping visuals that demand attention
- **Creative win rate >30%** - systematic design approach based on proven patterns
- **ROAS >4x** - visuals that attract qualified clicks, not just any clicks

## Brand Design System (Non-Negotiable)

### Colors
- **Background:** #0D0D0D (primary), #111111 (secondary), #1A1A1A (cards/elevated)
- **Text:** rgba(255,255,255,0.95) (primary), rgba(255,255,255,0.7) (secondary), rgba(255,255,255,0.4) (muted)
- **Accents:** {your-accent-colors} - define 3-4 accent colors for your brand
- **Danger/Urgency:** #ff3b3b (use sparingly - brand should feel abundant, not fear-based)

> **Note:** Replace the color values above with your own brand colors. The dark theme shown here is one approach - adapt to your brand identity.

### Typography
- **Headlines:** Your brand sans-serif, Bold, 28-48px, tight letter-spacing (-0.02em)
- **Body:** Your brand font, Regular/Medium, 16-20px
- **Data/Numbers:** A monospace font, 24-36px
- **Emphasis:** SemiBold or accent color highlight

### Visual Style
- Define your visual style and stick to it across all ads
- Generous whitespace - don't crowd the canvas
- No stock photography - use data visualizations, UI mockups, abstract patterns
- Icons: consistent style (thin, consistent stroke weight)

### Layout Rules
- Visual hierarchy: one primary focal point per image
- Text overlay: max 20% of image area (Meta penalizes text-heavy images)
- Safe zones: keep critical content away from edges (80px margin)
- Contrast ratio: minimum 4.5:1 for text readability

## Ad Formats & Specs

### Single Image Ad
- **Facebook Feed:** 1080x1080px (1:1) or 1200x628px (1.91:1)
- **Instagram Feed:** 1080x1080px (1:1)
- **Instagram Stories/Reels:** 1080x1920px (9:16)
- **File format:** PNG (designed) or JPG (photo-based)
- **Max file size:** 30MB

### Carousel Card
- **All placements:** 1080x1080px (1:1)
- **Cards per carousel:** 3-10 (sweet spot: 5-7)
- **Visual continuity:** cards should feel like a series, not random images
- **Last card:** always a strong CTA card

## Design Templates (Proven Patterns)

### Template 1: Data Highlight
- Large number/stat in monospace font (accent color)
- Short context line below in body font
- Subtle grid background
- Best for: social proof, results, benchmarks

### Template 2: Before/After Split
- Left side: "before" state (muted colors, cluttered)
- Right side: "after" state (brand colors, clean)
- Dividing line with accent gradient
- Best for: transformation, product demos

### Template 3: Feature Spotlight
- UI mockup or product screenshot (centered, elevated with shadow)
- Feature name as headline above
- 2-3 bullet benefits below
- Best for: product features, new releases

### Template 4: Quote Card
- Large quotation marks in accent color
- Testimonial text in body font
- Member name + role below
- Subtle brand pattern background
- Best for: social proof, community stories

### Template 5: Problem/Solution
- Top half: problem statement (muted text, subtle red accent)
- Bottom half: solution statement (bright text, green accent)
- Clear visual break between halves
- Best for: pain point ads, awareness campaigns

### Template 6: Carousel Story Arc
- Card 1: Hook question or bold claim
- Cards 2-5: Supporting points, steps, or proof
- Card 6: CTA with clear next action
- Consistent header bar and numbering across cards
- Best for: educational content, multi-benefit positioning

## Process

### Per Creative Brief
1. **Read the brief** from Ad Creative Research output
2. **Select template** that best matches the brief's angle
3. **Draft layout** - rough composition with text placement
4. **Write headline** - max 8 words, benefit-driven
5. **Select accent color** - match to emotional tone
6. **Generate image specification:**
   - Canvas size and format
   - Exact colors (hex values)
   - Typography specs (font, size, weight, color)
   - Layout grid (element positions)
   - Background treatment
   - Any icons or data visualizations needed
7. **Generate image prompt** (for AI image generation tools)
8. **Create ad mockup description** - how it looks in-feed

### Quality Check Before Output
- [ ] Text under 20% of image area?
- [ ] Brand colors only (no off-brand colors)?
- [ ] Brand fonts only?
- [ ] Dark background (or your brand background)?
- [ ] Clear visual hierarchy (one focal point)?
- [ ] Readable at mobile size (thumb-stop test)?
- [ ] No stock photography?
- [ ] Safe zones respected?
- [ ] Contrast ratio >4.5:1?

## Output Format

```markdown
# Ad Creative: [Name] - YYYY-MM-DD

## Brief
[One-line summary of what this ad communicates]

## Template Used
[Template name from above]

## Specs
- **Format:** Single Image / Carousel Card #X
- **Size:** 1080x1080px
- **Background:** #0D0D0D with [treatment]
- **Accent:** [color] - [why this color]

## Layout
[Description of element positions, sizes, and hierarchy]

## Text Content
- **Headline:** [text] - Font Bold, [size]px, [color]
- **Subline:** [text] - Font Regular, [size]px, [color]
- **Data point:** [text] - Monospace, [size]px, [accent]

## Image Generation Prompt
[Detailed prompt for AI image generation maintaining brand specs]

## In-Feed Mockup
[Description of how this looks in the Facebook/Instagram feed alongside the ad copy]
```

## Quality Bar

- Every image must be immediately recognizable as "yours" - brand consistency is non-negotiable
- No text walls - if you need to say more, use carousel format
- Mobile-first design - 80%+ of Meta ad impressions are mobile
- Every design must pass the "thumb-stop test" - would you stop scrolling?
- No decorative elements that don't serve the message

## Image Generation

Use an AI image generation tool (e.g., fal.ai, Midjourney, DALL-E) for generating static ad images. Key considerations:

### Workflow
1. Submit image generation request with your prompt
2. Wait for completion
3. Download and review result

### Prompting Best Practices
- Write prompts like natural sentences, NOT comma-separated tags
- Quality boosters like "masterpiece, 8k" often hurt performance with modern models
- Include: subject, composition, action, setting, style
- For text in images: wrap text in quotation marks, specify typography per element
- Limit to 3-5 text elements per image (more = higher error rate)
- For pixel-perfect typography: generate background, overlay text programmatically

### Cost-Effective Workflow
- Generate at low resolution for rapid iteration, then regenerate winners at higher resolution
- Use seed parameter for reproducible A/B testing
- PNG for text-heavy ads, JPEG for photorealistic

## Meta Ads Policy Compliance (Critical)

### Forbidden Language (Will Get Ads Rejected)
- **Income promises:** "make money", "earn income", "passive income"
- **Guarantee language:** "guaranteed results", "100% effective"
- **Specific financial outcomes:** "earn $X in Y months"
- **Financial freedom:** phrases promising wealth
- **Personal financial attributes:** "Are you broke?", "Financial trouble?"
- **Unrealistic timelines:** "get rich in 3 days", "instant results"

### Safe Language (Use These Instead)
- **Skill-building:** "develop your freelance skills with AI"
- **Process-focused:** "learn step by step", "take the first step"
- **Community/mentorship:** "expert support", "dedicated community"
- **Career transformation:** "start your career transformation", "become a freelancer"
- **Case study format:** one person's story, not a universal promise
- **Challenge framing:** "join the 30-day challenge"

### Core Rules
1. Never use "you" for financial problems - use first-person or generalizations
2. "Revenue/clients" in case study context OK - not as universal promise
3. Focus on the journey, not the destination - skills, community, mentorship
4. Landing page must also comply
5. Meta 20% text rule still applies - text-heavy images get penalized

## Meta Marketing API Reference

### Campaign Management (Local/CLI)
All operations via `curl` to `https://graph.facebook.com/v21.0/`

**Hierarchy:** Campaign -> Ad Set -> Ad (Creative)

**Create Campaign:**
```bash
curl -s -X POST "https://graph.facebook.com/v21.0/act_{AD_ACCOUNT_ID}/campaigns" \
  -F "name=Campaign Name" \
  -F "objective=OUTCOME_LEADS" \
  -F "status=PAUSED" \
  -F "special_ad_categories=[]" \
  -F "daily_budget=50000" \
  -F "bid_strategy=LOWEST_COST_WITHOUT_CAP" \
  -F "access_token={YOUR_API_TOKEN}"
```

**Create Ad Set (required flags for 2026 API):**
- `targeting_automation.advantage_audience=0` (required)
- No `video_feeds` placement (deprecated)
- Budget in smallest currency unit (e.g., cents)

**Upload Image -> Create Creative -> Create Ad:**
1. Upload: `act_{ID}/adimages` -> get `image_hash`
2. Creative: `act_{ID}/adcreatives` with `object_story_spec`
3. Ad: `act_{ID}/ads` with `creative.creative_id`

**App must be Live/Public** to create ad creatives (development mode blocks creative creation).

### Account Info
- Ad Account: `act_{YOUR_AD_ACCOUNT_ID}`
- Pixel: `{YOUR_PIXEL_ID}`
- Page: `{YOUR_PAGE_ID}`
- App: `{YOUR_APP_ID}`

## Integration with Other Skills

- Receives briefs from **Ad Creative Research** (outlier-inspired designs)
- Pairs with **Ad Copy** (visual + copy must work as a unit)
- Informs **Campaign Architecture** (which formats to test)
- Performance data from **Performance Review** feeds back to refine templates
