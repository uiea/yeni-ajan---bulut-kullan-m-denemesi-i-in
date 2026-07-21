# Thread Strategy

## Purpose

Create high-value Twitter threads that drive reach and engagement. Threads are Twitter's long-form content - they get algorithmic boost when engagement is high on the opener.

## Serves Goals

- Reach / Impressions
- Engagement Rate

## Process

### Step 1: Topic Selection
Choose thread topics from:
- Outlier threads that scored 5x+ (adapt the structure)
- YouTube video content (repurpose key insights)
- Deep expertise topics from `knowledge/STRATEGY.md`
- Questions frequently asked in replies

### Step 2: Structure
Every thread follows this skeleton:

1. **Opener (Tweet 1):** The hook - must work standalone. Use the proven 2026 formula: Line 1 bold claim -> Line 2 promise/stakes -> Line 3 "Thread". This is the only tweet most people see.
2. **Context (Tweet 2):** Why this matters, brief setup
3. **Body (Tweets 3-N):** One insight per tweet, each should be retweetable on its own
4. **Closer (Last tweet):** Summary + CTA (follow for more, check link, share if useful)

**Thread length:** 7 tweets is the 2026 sweet spot (highest engagement data). Range: 5-10. Never pad for length.

### Step 3: Per-Tweet Quality Check
Each tweet in thread must:
- [ ] Stand alone (valuable even without reading the rest)
- [ ] Add new information (never repeat the previous tweet)
- [ ] Use line breaks for readability
- [ ] Avoid numbering (1/, 2/ etc.) - feels corporate

### Step 4: Engagement Hooks
Embed engagement triggers throughout:
- Ask a question mid-thread ("Which approach do you prefer?")
- Include a contrarian point that invites debate
- Tag relevant people only if genuinely adding to conversation
- End with a clear, specific CTA

## Inputs

- Outlier thread analysis from `outputs/outliers/`
- YouTube content for repurposing
- `knowledge/BRAND.md`

## Outputs

- `outputs/YYYY-MM-DD_twitter_thread_TOPIC.md`

## Algorithm Mechanics for Threads

> Full reference: `skills/ALGORITHM_PLAYBOOK.md`

### Why Threads Win Algorithmically
- Threads get **40-60% more total impressions** than equivalent standalone tweets
- Algorithm treats threads as single content units and tracks **thread completion rate**
- Each click into the thread triggers `good_click` (weight 11.0) and if they stay 2+ min, `good_click_v2` (weight 10.0)
- A 7-tweet thread that takes 2 min to read generates **massive dwell time signal** per viewer

### Dwell Time Strategy for Threads
- **Open loop in opener** - create an information gap that forces click-through
- **Each tweet should create micro-tension** that pulls to the next
- **Target 2+ minute total read time** - this triggers the `good_click_v2` signal (20x a like)
- **Don't front-load all value** - distribute insights to keep people scrolling

### Engagement Triggers
- Ask a question mid-thread ("Which approach do you prefer?") to generate replies (27x a like each)
- Include a contrarian point that invites debate
- **Reply to EVERY comment within 2 hours** - author replies are the #1 signal (150x a like)
- End with a clear, specific CTA

### Author Diversity Scorer
- Algorithm penalizes showing the same author multiple times in a session
- Space threads out - don't post 3 threads in 2 hours
- One high-quality thread > three mediocre ones

## Quality Bar

- Opener must be compelling enough to read alone
- Every tweet adds unique value
- No filler tweets
- Thread should be completable in 2 minutes of reading (triggers good_click_v2)
- Must generate replies - include at least one debatable claim or question
