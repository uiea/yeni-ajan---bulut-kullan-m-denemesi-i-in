# Skill: Performance Review

## Purpose

Pull, analyze, and score Meta ad performance against KPI targets weekly. Extract patterns from winners and losers. Update MEMORY.md with earned learnings. Recommend next actions.

## Serves Goals

- **All KPIs** - this is the feedback loop that makes every other skill smarter
- Without performance review, we're guessing. With it, we're compounding knowledge.

## Metrics Framework

### Primary Metrics (Decision-Making)

| Metric | Target | Floor | How to Read It |
|--------|--------|-------|---------------|
| ROAS | >4.0x | >2.0x | Revenue generated per dollar spent. Below floor = kill. |
| CPA | <$25 | <$50 | Cost per lead/trial. Below target = scale. Above floor = kill. |
| CTR | >2.0% | >1.2% | Click-through rate. Measures creative + hook effectiveness. |
| Creative win rate | >30% | >15% | % of tested ads that hit target CPA. Measures research quality. |

### Secondary Metrics (Diagnostic)

| Metric | Healthy Range | What It Tells You |
|--------|--------------|------------------|
| CPM | $8-15 | Cost per 1,000 impressions. Rising = competition/saturation. |
| Frequency | <2.5 (prospecting), <5 (retargeting) | How often same person sees ad. Rising = fatigue. |
| Hook rate | >25% | 3-second video views / impressions. Is the creative stopping scrolls? |
| Hold rate | >15% | ThruPlays / 3-second views. Is the content keeping attention? |
| Conversion rate | >2% | Clicks that become conversions. Landing page effectiveness. |
| Link CPC | <$2 | Cost per link click. Budget efficiency indicator. |

### Platform Breakdown
Always split metrics by:
- **Platform:** Facebook vs. Instagram
- **Placement:** Feed vs. Stories vs. Reels vs. Audience Network
- **Device:** Mobile vs. Desktop
- **Age/Gender:** Which demographics convert best

## Weekly Review Process (Monday 9 AM)

### Step 1: Data Pull (5 min)
- Read `data/imports/meta-ads-export.csv` (export from Ads Manager)
- Required columns: campaign name, ad set name, ad name, spend, impressions, clicks, CTR, CPC, CPM, conversions, CPA, ROAS, frequency, reach
- If data is missing, flag and note what's needed

### Step 2: Campaign Scorecard (10 min)
Score each campaign against targets:

```
Campaign: [Name]
Period: [Date range]
Spend: $X | Conversions: X | CPA: $X | ROAS: Xx | CTR: X% | Freq: X
Verdict: SCALING / ON TRACK / WATCH / UNDERPERFORMING / KILL
```

Verdict logic:
- **SCALING:** CPA <target AND ROAS >target AND frequency <2.5 -> recommend budget increase
- **ON TRACK:** CPA within 10% of target, stable trends -> maintain
- **WATCH:** CPA 1-1.5x target OR frequency 2-2.5 -> monitor, prepare backup creative
- **UNDERPERFORMING:** CPA 1.5-2x target for 5+ days -> reduce budget, test new creative
- **KILL:** CPA >2x target after 50+ conversions -> pause, analyze, pivot

### Step 3: Creative Analysis (10 min)
For each ad that ran during the period:
- Rank by CPA (best to worst)
- Identify top 3 and bottom 3 performers
- For winners: what hook, what format, what visual style, what copy length?
- For losers: what went wrong? Hook? Audience mismatch? Creative fatigue?
- Calculate creative win rate: (ads that beat target CPA) / (total ads tested)

### Step 4: Audience Analysis (5 min)
- Which ad sets (audiences) performed best/worst?
- Any audience saturation signals? (rising frequency + declining CTR)
- Any surprising demographic breakdowns?

### Step 5: Pattern Extraction (10 min)
Look for repeating patterns:
- Do certain hook formulas consistently win?
- Does one format outperform others?
- Are certain placements delivering cheaper conversions?
- Is there a day-of-week or time-of-day pattern?
- Are Facebook and Instagram performing differently?

### Step 6: Update MEMORY.md (5 min)
Add learnings to relevant MEMORY.md sections:
- Winning/losing creatives with dates and metrics
- Hook patterns that convert / don't convert
- Audience segments that work / don't work
- Budget scaling learnings
- Platform-specific insights

### Step 7: Next Week Recommendations (5 min)
- What to scale (budget recommendations)
- What to kill (pause recommendations)
- What to test next (new creative briefs, new audiences, new hooks)
- What creative to produce (based on pipeline needs)

## Output Format

```markdown
# Meta Ads Performance Review - Week of YYYY-MM-DD

## Executive Summary
[2-3 sentences: how did we do this week? Key win, key concern, key action.]

## KPI Scorecard

| Metric | Target | This Week | Last Week | Trend |
|--------|--------|-----------|-----------|-------|
| ROAS | >4.0x | X.Xx | X.Xx | up/down/flat |
| CPA | <$25 | $XX | $XX | up/down/flat |
| CTR | >2.0% | X.X% | X.X% | up/down/flat |
| Creative win rate | >30% | XX% | XX% | up/down/flat |
| Total spend | $X budget | $X | $X | |
| Total conversions | -- | XX | XX | up/down/flat |

## Campaign Verdicts

| Campaign | Spend | CPA | ROAS | Freq | Verdict |
|----------|-------|-----|------|------|---------|
| [name] | $X | $X | X.Xx | X.X | SCALING |
| [name] | $X | $X | X.Xx | X.X | KILL |

## Top 3 Creatives
1. **[Ad name]** - CPA: $X, CTR: X%, ROAS: X.Xx
   - Hook: [formula used]
   - Format: [static/carousel/video]
   - Why it worked: [analysis]

## Bottom 3 Creatives
1. **[Ad name]** - CPA: $X, CTR: X%, ROAS: X.Xx
   - Why it failed: [analysis]

## Patterns Identified
- [Pattern 1]
- [Pattern 2]
- [Pattern 3]

## MEMORY.md Updates Made
- [What was added/updated]

## Next Week Actions
1. **Scale:** [what and how much]
2. **Kill:** [what and why]
3. **Test:** [what, hypothesis, success criteria]
4. **Produce:** [what creatives are needed]
```

## Quality Bar

- Never skip the weekly review - this is the learning engine
- Always compare to last week - trends matter more than snapshots
- Always update MEMORY.md - learnings that aren't recorded are lost
- Never declare a winner/loser without 50+ conversions
- Always include the "why" - metrics without analysis are useless
- Recommendations must be specific and actionable - not vague suggestions

## Integration with Other Skills

- Feeds **Budget Optimizer** with scaling/killing recommendations
- Feeds **Ad Creative Research** with what patterns to look for
- Feeds **Ad Copy** with winning hook formulas
- Feeds **Static Image Design** with what visual styles perform
- Feeds **Audience Strategy** with segment performance data
- Feeds **Campaign Architecture** with structural optimization insights
