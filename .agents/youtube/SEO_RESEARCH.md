# Skill: SEO Keyword Research & Content Prioritization

## Purpose
Find high-value keywords with real demand, score them by opportunity, and output actionable video briefs - not raw data dumps.

## Serves Goals
- **CTR** - titles built on proven search demand get more clicks
- **Retention** - topics people actively search for have higher watch intent
- **Conversions** - commercial-intent keywords attract buyers, not browsers

## Relationship to Other Skills
- Runs BEFORE `RESEARCH.md` - feeds keyword opportunities into topic research
- Uses `IDEA_BOARD.md` outlier data as a validation layer
- Outputs feed into `SCRIPTS.md` for content briefs

---

## Process: 5-Step Keyword Pipeline

### Step 1: Seed Keyword Expansion

For each keyword in `config/keywords.txt` AND any manually provided seeds:

**A) YouTube Autocomplete (demand signals)**
```bash
curl -s "https://suggestqueries.google.com/complete/search?client=youtube&ds=yt&hl=YOUR_LANG&gl=YOUR_COUNTRY&q=KEYWORD"
```

**B) Google Autocomplete (cross-platform demand)**
```bash
curl -s "https://suggestqueries.google.com/complete/search?client=firefox&hl=YOUR_LANG&gl=YOUR_COUNTRY&q=KEYWORD"
```

**C) "Alphabet soup" expansion - run A-Z suffix queries:**
```bash
for letter in a b c d e f g h i j k l m n o p r s t u v y z; do
  curl -s "https://suggestqueries.google.com/complete/search?client=youtube&ds=yt&hl=YOUR_LANG&gl=YOUR_COUNTRY&q=KEYWORD%20$letter"
done
```

**D) Question modifiers:**
```bash
for mod in "how to" "what is" "how much" "why" "which" "best" "vs"; do
  curl -s "https://suggestqueries.google.com/complete/search?client=youtube&ds=yt&q=$mod%20KEYWORD"
done
```

**Output:** Deduplicated keyword list (typically 50-200 candidates per seed)

### Step 2: Competition & Opportunity Scoring

```bash
yt-dlp --skip-download --flat-playlist "ytsearch10:KEYWORD" \
  --print "%(id)s|%(title)s|%(view_count)s|%(channel)s|%(upload_date)s|%(duration)s"
```

| Dimension | How to Measure | Score |
|-----------|---------------|-------|
| **Demand** | Autocomplete position (1-3 = high, 4-7 = med, 8+ = low) | 1-5 |
| **Competition** | Top 10: avg views, channel sizes, video quality | 1-5 |
| **Your Advantage** | Unique experience, data, or angle? | 1-5 |
| **Intent Match** | Likely to buy/join? (commercial > informational) | 1-5 |
| **Freshness** | Trending NOW? Time-sensitive? | 1-3 |

**Opportunity Score = (Demand x 2) + (5 - Competition) + Advantage + (Intent x 2) + Freshness**

Max: 33. Threshold for action: 18+.

### Step 3: Intent Classification

| Intent | Signal | Content Strategy |
|--------|--------|------------------|
| **Tutorial** | "how to", "setup", "install" | Step-by-step, show screen, end with result |
| **Comparison** | "vs", "compare", "which" | Side-by-side test, honest winner, data-driven |
| **Discovery** | "what is", "explained" | Explain + demo + "who is this for" |
| **Commercial** | "price", "free", "make money" | ROI proof, cost breakdown, action steps |
| **Trending** | New product/update | Speed > polish, first-mover advantage |

### Step 4: Content Gap Analysis

For top keywords, analyze the TOP 3 ranking videos:
1. **What did they cover?**
2. **What did they MISS?** (check comments for unanswered questions)
3. **How old is it?** (>6 months = outdated opportunity)
4. **Production quality?** (low quality = easy to beat)
5. **Description SEO:** Optimized descriptions with keywords, timestamps?

### Step 5: Prioritized Output

```markdown
## SEO Research Report - YYYY-MM-DD

### Priority 1: [Keyword] (Score: XX/33)
- **Search Intent:** Tutorial / Comparison / Discovery / Commercial / Trending
- **Demand Evidence:** [autocomplete position, related terms]
- **Competition:** [top 3 videos: titles, views, channel size, age]
- **Gap:** [what's missing in existing content]
- **Our Angle:** [why we can win this keyword]
- **Suggested Title:** [2-3 options]
- **Time Sensitivity:** [evergreen / act within X days / expired]
- **Estimated Difficulty:** [easy win / moderate / hard fight]

### Parking Lot
[Keywords scored 12-17 - good for descriptions/tags, not dedicated videos]

### Dead Keywords
[Keywords scored <12 with brief reason]
```

---

## Post-Publish SEO (Description Template)

```markdown
Line 1: Hook sentence with PRIMARY keyword
Line 2: Secondary keyword phrase naturally integrated
Line 3: Empty line
Lines 4-8: Video summary with 3-5 keyword variations
Line 9: Empty line
Lines 10+: Timestamps (chapter titles should contain keywords)
Last lines: Links, social, hashtags (3-5 max)
```

## Quality Bar
- Every keyword MUST have competition data
- No recommendation without an "Our Angle"
- Opportunity score must be calculated, not vibed - show the math
- Include local-language keyword opportunities (non-English markets are underserved)
- Output must be actionable: someone should be able to script a video from each entry
- Cross-reference with outlier data

## Anti-Patterns
- Do NOT dump raw autocomplete results without scoring
- Do NOT recommend keywords without checking what's already ranking
- Do NOT ignore local market keywords in favor of English-only
- Do NOT treat all keywords equally - commercial intent beats informational at same score

## Tools Required
- `curl` (autocomplete APIs - no API key needed)
- `yt-dlp` (video metadata and transcripts)
- `jq` (JSON parsing)

## Schedule
- **Full research:** Weekly
- **Quick scan:** After major tool/product launches
- **Description audit:** After every video publish
