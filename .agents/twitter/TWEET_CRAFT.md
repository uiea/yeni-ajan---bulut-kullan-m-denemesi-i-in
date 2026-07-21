# Tweet Craft

## Purpose

Draft high-engagement tweets using patterns proven by outlier research. Every tweet must have a clear hook, deliver value, and (when appropriate) include a CTA.

## Serves Goals

- Engagement Rate
- CTR

## Process

### Step 1: Review Context
Read in order:
1. Latest outlier reports - what hooks/formats are working NOW
2. `MEMORY.md` - your proven patterns and anti-patterns
3. `knowledge/BRAND.md` - voice and tone
4. `knowledge/STRATEGY.md` - current priorities
5. Recent journal entries - what's happening in the space

### Step 2: Generate Tweet Candidates
For each topic/angle, draft 3 variations using different hook types:

**Hook Types (from outlier patterns):**
- **Bold claim:** "X is dead. Here's what replaced it."
- **Personal story:** "I spent 40 hours testing X. Here's what nobody tells you."
- **Data point:** "X just hit Y users. Here's why that matters."
- **Question:** "Why does everyone use X when Y exists?"
- **Contrarian:** "Unpopular opinion: X is overrated because..."
- **How-to:** "How to do X in 5 minutes (step-by-step)"
- **List:** "5 things I learned building X this week"
- **News reaction:** "X just announced Y. This changes everything because..."

### Step 3: Format Check
For each draft:
- [ ] Under 280 chars (or clearly a thread opener)
- [ ] Hook in first line (above the fold)
- [ ] Value is obvious - reader learns something or feels something
- [ ] No generic AI language
- [ ] Matches brand voice
- [ ] CTA is natural (not forced)
- [ ] Max 1 hashtag (or zero)
- [ ] **No external links** unless account has X Premium - link tweets get near-zero reach for non-Premium accounts (as of March 2026)
- [ ] **Replies/engagement triggers included** - replies outrank silent likes in 2026 algorithm; ask a question or make a debatable claim

### Step 4: Pair with Media (Optional)
Suggest media type if applicable:
- Screenshot / code snippet
- Before/after comparison
- Short video / screen recording
- Infographic or chart
- No media (text-only often outperforms on Twitter)

## Inputs

- Outlier reports from `outputs/outliers/`
- `MEMORY.md` - what's worked for you
- `knowledge/BRAND.md`

## Outputs

- `outputs/YYYY-MM-DD_twitter_drafts.md`
- Format per tweet:
  ```
  ## Tweet #N - [Topic]
  **Hook type:** [type]
  **Media:** [none / screenshot / video]

  [Tweet text]

  **Why this works:** [1 sentence referencing outlier or pattern]
  ```

## Algorithm-Informed Craft Rules

> Full reference: `skills/ALGORITHM_PLAYBOOK.md`

### Dwell Time Optimization (The Hidden Multiplier)
- **Write for 8+ second reads.** Posts viewed <3 seconds trigger a -15-20% Quality Multiplier decay. Longer reads = exponentially more distribution.
- **Use open loops** ("Here's what nobody realizes...") to hold attention past the 3-second threshold
- **Storytelling > listicles** for dwell time. Narrative structure keeps people reading.
- **Long-form text (1,000+ chars)** naturally increases dwell. Use Premium character limits.
- **Intellectual tension** (contrarian takes backed by evidence) creates the same dwell-time signal as outrage, without the brand damage.

### Signal Weights to Optimize For
- **Reply-engaged-by-author (75.0)** = 150x a like. Write tweets that invite replies, then REPLY BACK within 2 hours.
- **Replies (13.5)** = 27x a like. Ask questions, make debatable claims, leave room for opinions.
- **Profile clicks (12.0)** = 24x a like. Tease expertise that makes people check your profile.
- **Good click v2 (10.0)** = 20x a like. If someone clicks into your thread and stays 2+ min, that's a massive signal.
- **Likes (0.5)** are almost irrelevant in isolation. Never optimize for likes alone.

### Engagement Velocity
- First **2 hours** after posting determine reach
- Schedule posts when audience is online (8-10am or 7-9pm local time as defaults)
- Reply to every comment in that window - each author reply triggers the 75.0 weight

### Platform Rules
- **X Premium required** for links, long-form, and competitive reach (2-4x multiplier)
- **Text-only outperforms video by ~30%** on X - the only major platform where this is true
- **Logarithmic engagement curve**: 1st RT = 100% value, 8th RT = 17%. Breadth > depth.

## Quality Bar

- Minimum 5 tweet drafts per batch
- Each must reference a specific outlier pattern or proven format
- No "just posting to post" - every tweet must have a strategic reason
- At least 1 tweet should be a reply/QT opportunity (not just original content)
