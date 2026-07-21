# Skill: Budget Optimizer

## Purpose

Allocate, scale, and cut budgets across Meta campaigns to maximize ROAS while maintaining healthy creative pipeline flow and respecting Meta's algorithm learning requirements.

## Serves Goals

- **ROAS >4x** - every dollar goes to the highest-returning campaigns
- **CPA <$25** - kill waste fast, scale winners methodically
- **Creative win rate >30%** - protect testing budget from being raided for scaling

## Core Rules

### The 20% Rule (Scaling)
- Never increase budget more than 20% in a single adjustment
- Wait 3-4 days between adjustments
- Reason: larger jumps reset Meta's learning phase, causing CPA spikes

### The 72-Hour Rule (Patience)
- Never change budget within 72 hours of campaign launch or last budget change
- Meta's algorithm needs this time to stabilize delivery and optimize
- Exception: if a campaign is hemorrhaging money (CPA >3x target), pause immediately

### The 50-Conversion Rule (Decisions)
- Don't make scaling/killing decisions until an ad set has 50+ optimization events
- Below 50, data is not statistically significant
- Rough math: 50 conversions at $25 CPA = $1,250 per test

### Budget Floor (Learning Phase)
- Minimum weekly budget per ad set = 50 x target CPA
- Below this, Meta can't exit learning phase, and performance is unreliable
- Example: $25 CPA target = $1,250/week minimum per ad set = ~$180/day

## Budget Allocation Framework

### For SaaS/Community Business

| Campaign Type | % of Total Budget | Purpose |
|--------------|-------------------|---------|
| Scaling (CBO) | 50-60% | Scale proven winners for conversions |
| Testing (ABO) | 15-20% | Test new creatives, audiences, angles |
| Retargeting | 10-20% | Convert warm audiences (website, email, engagement) |
| Reserve | 5-10% | Emergency scaling opportunities or seasonal spikes |

### Example Monthly Budget: $5,000
- Scaling: $2,750 (~$92/day)
- Testing: $875 (~$29/day)
- Retargeting: $875 (~$29/day)
- Reserve: $500

## Scaling Decision Matrix

### SCALE (increase budget 20%)
All conditions must be true:
- [ ] Campaign has been live 5+ days
- [ ] 50+ conversions achieved
- [ ] CPA below target for 3+ consecutive days
- [ ] ROAS above target for 3+ consecutive days
- [ ] Frequency below 2.5
- [ ] CTR stable or improving

### HOLD (maintain current budget)
Any of these are true:
- Campaign is within 72 hours of last change
- CPA is near target (within 10%) but trending in wrong direction
- Insufficient data (<50 conversions)
- Frequency between 2.0-2.5 (watch zone)

### REDUCE (decrease budget 20%)
Any of these are true:
- CPA 1.5-2x target for 5+ days with 50+ conversions
- Frequency above 3.0 with declining CTR
- ROAS below 2.0 for 5+ days

### KILL (pause campaign/ad set)
Any of these are true:
- CPA >2x target after learning phase complete (50+ conversions)
- No conversions after spending 2-3x target CPA
- ROAS below 1.0 for 7+ days
- Frequency above 4.0 in prospecting campaigns

## Process

### Wednesday + Friday Budget Check (5 min)
1. Export current spend, CPA, ROAS, frequency for all active campaigns
2. Plot each campaign on the Scale/Hold/Reduce/Kill matrix
3. For any SCALE recommendation:
   - Calculate new budget (current x 1.20)
   - Verify no change was made in last 72 hours
   - Document recommendation
4. For any KILL recommendation:
   - Verify 50+ conversions (or 2-3x CPA spent with zero conversions)
   - Document reason
5. Hand off recommendations to human for execution

### Monthly Budget Reallocation
1. Review total spend vs. total results for the month
2. Calculate blended ROAS and CPA across all campaigns
3. Identify top and bottom performing campaigns/ad sets
4. Propose next month's allocation based on performance data
5. Factor in seasonal CPM trends (Q4 is expensive, January is cheap)
6. Update reserve fund based on upcoming opportunities

## Output Format

```markdown
# Budget Optimization Report - YYYY-MM-DD

## Active Campaigns Overview

| Campaign | Daily Budget | Spend (7d) | CPA | ROAS | Frequency | Action |
|----------|-------------|------------|-----|------|-----------|--------|
| CONV_SCALE_... | $92 | $644 | $22 | 4.2x | 1.8 | SCALE |
| CONV_TEST_... | $29 | $203 | $31 | 2.8x | 1.2 | HOLD |
| CONV_RETARGET_... | $29 | $203 | $18 | 5.1x | 3.2 | REDUCE (fatigue) |

## Recommended Actions

### 1. SCALE: [Campaign Name]
- Current budget: $92/day -> Recommended: $110/day (+20%)
- Rationale: CPA $22 (below $25 target) for 5 consecutive days, 67 conversions, frequency 1.8
- Last budget change: 4 days ago (safe to adjust)

### 2. KILL: [Ad Set Name]
- Current budget: $50/day, spent $287 with 0 conversions
- Rationale: Spent 2.3x target CPA with zero conversions
- Action: Pause ad set, reallocate to testing campaign

## Budget Summary
- Total daily: $X -> Recommended: $Y
- Monthly projection: $X -> $Y
- Reserve remaining: $X
```

## Quality Bar

- Never recommend scaling without verifying the 72-hour rule
- Never recommend killing without verifying 50+ conversions (or 2-3x CPA spend with zero)
- Always show the math - no gut-feel budget decisions
- Testing budget is sacred - never reallocate testing budget to scaling
- Every recommendation must include a clear rationale

## Integration with Other Skills

- Informed by **Performance Review** (which campaigns are actually working)
- Coordinates with **Campaign Architecture** (budget fits structure)
- Feeds into **Audience Strategy** (budget allocation per audience segment)
- Informs **Ad Creative Research** (how much creative pipeline is needed to support scaling)
