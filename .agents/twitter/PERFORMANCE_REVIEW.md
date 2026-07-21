# Performance Review

## Purpose

Weekly analysis of your Twitter performance against KPI targets. Identify what's working, what's not, and update MEMORY.md with learnings.

## Serves Goals

- All KPIs

## Process

### Step 1: Gather Data
Sources:
- Twitter Analytics CSV export (from `data/imports/`)
- Twitter API metrics for recent tweets
- Manual notes from journal

### Step 2: Score Against Targets
For each tweet in the review period:

| Metric | Target | Actual | Status |
|--------|--------|--------|--------|
| Engagement rate | >3% | ? | pass/fail |
| Impressions | >5x followers | ? | pass/fail |
| Link CTR | >2% | ? | pass/fail |
| Follower delta | >5% MoM | ? | pass/fail |
| Reply depth (avg replies per tweet) | >5 | ? | pass/fail |
| Author reply rate (within 2h) | >80% | ? | pass/fail |
| Thread completion rate | >60% | ? | pass/fail |

### Step 3: Analyze Patterns (Algorithm-Informed)

> See `skills/ALGORITHM_PLAYBOOK.md` for signal weights

**Wins (2+ targets met):**
- What format was it?
- What hook type?
- What time was it posted?
- What topic?
- **Dwell time proxy**: did it generate clicks into thread? High reply depth? (signals good_click_v2)
- **Author engagement**: did you reply to comments? How fast? (reply_engaged_by_author = 150x a like)
- Log pattern to MEMORY.md

**Misses (2+ targets missed):**
- Was dwell time likely low? (short post, no hook, no tension)
- Did you fail to reply to comments within 2 hours? (missed the 75.0 weight signal)
- Was it a link post without Premium? (near-zero distribution)
- Did it trigger negative signals? (mutes, "show less" = -74.0 weight lasting 140 days)
- Log anti-pattern to MEMORY.md

### Step 4: Update MEMORY.md
Add specific, evidence-based entries:
- "Text-only tweets about [topic] outperform image tweets by 2x (n=8)"
- "Threads posted on Tuesday morning get 3x more impressions than Friday (n=4)"

### Step 5: Recommendations
- Top 3 things to keep doing
- Top 3 things to stop or change
- 1 experiment to try next week

## Inputs

- `data/imports/` - Twitter Analytics exports
- Recent outlier reports
- `MEMORY.md`

## Outputs

- `outputs/YYYY-MM-DD_twitter_weekly_review.md`
- Updated `MEMORY.md`

## Quality Bar

- Every claim backed by data (tweet IDs, metrics)
- Minimum 2-week lookback
- Actionable recommendations (not vague "post more")
