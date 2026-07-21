# X Algorithm Playbook

## Purpose

Master reference for how the X (Twitter) algorithm ranks and distributes content. Every content decision - from format to timing to engagement strategy - should be informed by these mechanics. Updated from the open-source code (2023 `twitter/the-algorithm`, 2026 `xai-org/x-algorithm`) and peer-reviewed research.

## Serves Goals

- All KPIs (Engagement, Reach, CTR, Growth)

---

## Algorithm Architecture

### Pipeline (3 stages)

1. **Candidate Sourcing** - Fetches ~1,500 potential tweets from hundreds of millions. Two pools: "in-network" (accounts you follow) and "out-of-network" (accounts you don't). Uses **Real Graph** model to predict engagement likelihood between users.
2. **Heavy Ranker** - Scores each candidate using a ~48M parameter neural network (2023) or Grok-based transformer (2026). Outputs engagement probabilities across multiple actions.
3. **Heuristics & Filtering** - Removes blocked users, NSFW, already-seen tweets. Applies mixing rules and diversity scoring.

### 2026 Update (xai-org/x-algorithm)

- Replaced entire 2023 system with Grok-based transformer
- Eliminated most hand-engineered features
- 15 explicit prediction heads (up from 10)
- Dwell time promoted from implicit feature to explicit prediction head
- Grok sentiment layer claims to read post tone and reduce combative content reach
- Commits to open-source updates every 4 weeks

---

## Engagement Signal Weights

### 2023 Confirmed Weights (from source code)

| Signal | Weight | Relative to Like |
|--------|--------|-----------------|
| Reply engaged by author | **75.0** | 150x |
| Reply | **13.5** | 27x |
| Profile click (+ engage) | **12.0** | 24x |
| Link click (+ engage) | **11.0** | 22x |
| Good click v2 (stay 2+ min) | **10.0** | 20x |
| Retweet | **1.0** | 2x |
| Like | **0.5** | 1x (baseline) |
| Video 50% watch | **0.005** | ~0.01x |
| Negative feedback ("show less") | **-74.0** | -148x |
| Report | **-369.0** | -738x |

**Source:** `twitter/the-algorithm-ml/projects/home/recap/README.md`

### Key Takeaway

The single most powerful positive signal is **reply_engaged_by_author (75.0)** - when someone replies to your tweet and YOU reply back. This is 150x more valuable than a like. Content that sparks genuine back-and-forth conversation is the algorithm's #1 quality signal.

### 2026 Prediction Heads

`P(favorite), P(reply), P(repost), P(quote), P(click), P(profile_click), P(video_view), P(photo_expand), P(share), P(dwell), P(follow_author), P(not_interested), P(block_author), P(mute_author), P(report)`

Exact numerical weights not published "for security."

---

## Dwell Time - The Hidden Kingmaker

### How It Works

Dwell time is the duration a user spends viewing your content before scrolling. The algorithm tracks this through binary threshold features:

- `is_tweet_detail_dwelled_8_sec` / `_15_sec` / `_25_sec` / `_30_sec`
- `is_profile_dwelled_10_sec` / `_20_sec` / `_30_sec`
- `is_fullscreen_video_dwelled_5_sec` / `_10_sec` / `_20_sec` / `_30_sec`

**Source:** `twitter/the-algorithm-ml/projects/home/recap/FEATURES.md`

### The 3-Second Rule

Posts viewed for **less than 3 seconds** before scrolling trigger a **Dwell Time Decay** signal - a negative quality marker that reduces your post's Quality Multiplier by 15-20%. Consistent low dwell across your posts compounds this penalty.

### Why Dwell Time Matters More Than Raw Engagement

In the 2023 code, `good_click_v2` (user clicks into thread and stays 2+ minutes) has a weight of **10.0** - that's 20x a like per occurrence. But unlike likes, dwell time happens passively and at much higher volume. A post that makes 10,000 people pause for 30 seconds generates far more algorithmic signal than one that gets 500 likes from 3-second glances.

In the 2026 algorithm, dwell is now a **first-class prediction head** alongside likes, replies, and reposts - no longer a secondary feature.

### Practical Implications

- **Long-form text posts (1,000+ chars)** naturally increase dwell time
- **X Articles** get artificial reach boost AND dwell time benefit
- **Threads** keep users engaged across multiple tweets
- **Storytelling and narrative structure** hold attention longer than listicles
- **Open loops** ("I'll explain why in a moment...") increase scroll-through

---

## The Outrage Amplification Loop

### The Mechanism (Research-Backed)

The algorithm does NOT have an explicit "outrage score." The amplification of emotionally triggering content (politics, war, controversy) is an **emergent property** of engagement optimization. Here's the exact loop:

1. Provocative post appears in feed
2. User stops scrolling to read (dwell time increases - positive signal)
3. User clicks into thread to read replies (`good_click` - weight 11.0)
4. User stays reading the argument (`good_click_v2` - weight 10.0 for 2+ min)
5. User rage-replies (reply - weight 13.5)
6. Author replies back (reply_engaged_by_author - weight **75.0**)
7. Algorithm scores this as extremely high-quality content and distributes further

**The algorithm cannot distinguish between fascinated reading and hate-reading.** Both produce identical dwell time, click, and reply signals.

### Academic Evidence

| Study | Finding |
|-------|---------|
| PMC/PNAS 2025 | Algorithmic feed amplified political anger by **+0.75 standard deviations** vs. chronological |
| Science 2025 | 10 days of altered exposure shifted political feelings by 2+ points on 100-point scale |
| ScienceDirect 2025 | Toxic tweets received **27.1% higher visibility** and **85.7% more retweets** |

Critical finding: **Users were LESS likely to prefer the political tweets the algorithm selected**, despite those tweets generating more engagement. People engage with outrage even though they don't want to see it.

### For Content Creators (Ethical Application)

The same dwell-time mechanics that boost outrage also boost:
- **Deep storytelling** - personal narratives that hold attention
- **Surprising data** - counterintuitive facts that make people stop and re-read
- **Intellectual tension** - contrarian takes backed by evidence (not rage bait)
- **Cliffhanger structures** - hooks that create information gaps
- **Long-form value** - educational content that takes time to absorb

The goal: trigger the **same engagement signals** as outrage content, but through genuine value and curiosity instead of anger.

---

## Hidden Signals & Mechanics

### TweepCred (Invisible Reputation Score)

Every X account has a hidden 0-100 score based on PageRank:
- New accounts start at **-128**
- Minimum **+17** needed for any feed distribution
- Premium/verified accounts get **+100 boost**
- Below **65**: only 3 of your tweets considered for distribution
- Above **50+**: 20-50x distribution multiplier
- Factors: account age, follower ratio, engagement quality, behavioral patterns

### Follower/Following Ratio Penalty

If your following/follower ratio exceeds 0.6: `score / exp(5 * (ratio - 0.6))`
- At 1:1 ratio: roughly **7.4x penalty**
- Keep following count well below follower count

### Author Diversity Scorer

`AuthorDiversityScorer` progressively discounts scores when the same author appears multiple times in a user's feed batch. Your 5th post shown in a session scores lower than your 1st. Space posts out rather than rapid-firing.

### Feedback Fatigue Decay

When a user clicks "See Fewer" on your content, your score gets multiplied by 0.2-1.0, decaying over **140 days**. One negative signal can suppress your reach to that user for nearly 5 months.

### Engagement Debt (Cold Start)

Accounts with less than 0.5% engagement on their first 100 tweets accumulate "Engagement Debt" - posts shown to only ~10% of normal distribution. Critical for new accounts: quality over quantity from day one.

### Logarithmic Engagement Curve

`Score Contribution = weight * log2(1 + engagement_count)`
- 1st retweet = 100% value
- 8th retweet = only 17% incremental value
- Breadth matters more than depth - 100 likes from 100 people > 10 likes from 10 superfans for ranking

### The 2-Hour Window

Early engagement disproportionately impacts ranking. The first 2 hours after posting are critical - this is when the algorithm decides whether to amplify or suppress.

---

## Platform Rules (2025-2026)

### Premium vs. Free

| Feature | Premium | Free |
|---------|---------|------|
| Reach multiplier | 2-4x baseline | 1x baseline |
| Link posts | Normal distribution | Near-zero median engagement (March 2026) |
| Reply visibility | Auto-ranked first | Standard ranking |
| Long-form posts | 1,000+ chars available | 280 chars |
| X Articles | Available | Not available |

### Content Format Performance

| Format | Relative Reach |
|--------|---------------|
| Text-only | **Baseline (highest)** |
| Video (vertical 9:16, 15-60s) | 2-4x more than images |
| Images | Moderate |
| Link posts (with description) | Normal (Premium only) |
| Link posts (bare URL) | Weak distribution |
| Threads (3-5 tweets) | 40-60% more total impressions than equivalent standalones |

**X is the only major platform where text outperforms video by ~30%.**

### External Link Policy

- Link penalty officially removed October 2025
- BUT: bare links without description still get weak distribution
- Free accounts posting links get near-zero engagement since March 2026
- Links to competing platforms (Facebook, Instagram) faced -60% penalty historically

---

## X Articles (Long-Form)

X Articles is a Premium feature getting **artificial algorithmic boost** because X wants adoption.

- Articles can hit 150M+ impressions
- X doubled the creator revenue pool for articles
- Announced **$1M reward fund** for outstanding articles
- Dwell time boost compounds with the promotional boost

### Article Strategy

- Use for deep expertise topics (1,500-3,000 words)
- Strong headline is everything (it's the only thing shown in feed)
- Include images/charts to break up text and increase dwell
- Cross-promote with a tweet thread that links to the article

---

## Negative Signals (What Kills Reach)

| Signal | Impact |
|--------|--------|
| Report | -369.0 weight (nuclear) |
| "Show less often" / mute / block | -74.0 weight |
| Community Notes flag | -60 to -80% reach, removed from discovery |
| Dwell < 3 seconds consistently | -15-20% Quality Multiplier |
| High following/follower ratio | Up to 7.4x penalty |
| "See Fewer" clicks | 0.2-1.0 multiplier for 140 days |
| Low engagement on first 100 tweets | Cold Start Suppression (10% distribution) |

---

## Sources

### Open-Source Code
- [twitter/the-algorithm](https://github.com/twitter/the-algorithm) - 2023 recommendation system
- [twitter/the-algorithm-ml](https://github.com/twitter/the-algorithm-ml) - ML models, weights, features
- [xai-org/x-algorithm](https://github.com/xai-org/x-algorithm) - 2026 Grok-based system

### Research
- PMC/PNAS 2025 - Engagement, user satisfaction, and amplification of divisive content
- Science 2025 - Reranking partisan animosity alters affective polarization
- ScienceDirect 2025 - Emotional communication and public anger on Twitter

### Analysis
- Circleboom - TweepCred, Shadow Hierarchy, Dwell Time analysis
- PostEverywhere - How the X Algorithm Works in 2026
- TianPan.co - Reverse-engineering the algorithm
