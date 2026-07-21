# Skill: Audience Strategy

## Purpose

Build, refine, and manage targeting audiences across the full funnel - from broad prospecting to surgical retargeting - maximizing conversion efficiency while minimizing audience overlap and waste.

## Serves Goals

- **CPA <$25** - right audience = lower cost per conversion
- **ROAS >4x** - targeting people who actually buy, not just click
- **Creative win rate >30%** - matching the right message to the right audience

## Audience Architecture

### Tier 1: Prospecting (Top of Funnel)
**Goal:** Reach new potential customers who've never interacted with you.

#### Broad Targeting (Recommended Default)
- Age: 25-44 (adjust based on data)
- Location: Target markets
- Language: Your target language
- Interests/behaviors: NONE - let Meta's algorithm find converters
- Why: Advantage+ and Meta's ML outperform manual interest targeting in 2026
- When to use: Always start here. Only narrow if CPA is unacceptably high after 100+ conversions

#### Advantage+ Audience
- Enable Advantage+ Audience on all prospecting ad sets
- Provide "audience suggestions" (interests, behaviors) as signals, not restrictions
- Meta uses these as starting points, then expands to find similar converters
- 13% lower cost per conversion vs. manual targeting (Meta data)

#### Lookalike Audiences (Controlled Expansion)
- **1% LAL from purchasers/paid customers** - highest quality, smallest reach
- **1% LAL from trial sign-ups** - good quality, broader reach
- **1% LAL from email list** - varies based on list quality
- **2-3% LAL** - use only when 1% is too small or you're scaling
- **Never go above 5%** - audience becomes too diluted
- Source audience minimum: 1,000 people (ideally 5,000+)

### Tier 2: Engagement (Middle of Funnel)
**Goal:** Re-engage people who've shown interest but haven't converted.

| Audience | Window | Expected Quality |
|----------|--------|-----------------|
| Video viewers (50%+ watched) | 30 days | Medium-High |
| Video viewers (95% watched) | 60 days | High |
| Instagram/Facebook page engagers | 30 days | Medium |
| Post/ad engagers (liked, commented, shared) | 30 days | Medium-High |
| Lead form openers (didn't submit) | 30 days | High |

### Tier 3: Website (Bottom of Funnel)
**Goal:** Convert people who've visited key pages but didn't convert.

| Audience | Window | Expected Quality |
|----------|--------|-----------------|
| All website visitors | 30 days | Medium |
| Pricing page visitors | 14 days | Very High |
| Sign-up page visitors (didn't complete) | 7 days | Very High |
| Blog readers (3+ pages) | 30 days | Medium |
| Feature page visitors | 14 days | High |

### Tier 4: Customer (Retention/Upsell)
**Goal:** Upsell existing customers or re-engage lapsed users.

| Audience | Source | Purpose |
|----------|--------|---------|
| Trial users (didn't convert) | Pixel + CRM | Convert to paid |
| Free tier users | CRM upload | Upsell to paid |
| Churned customers (30-90 days) | CRM upload | Win-back |
| Active customers | CRM upload | Upsell / referral |

## Exclusion Audiences (Critical)

### Always Exclude from Prospecting
- Existing paying customers (CRM upload)
- Recent converters (pixel-based, 30 days)
- Active trial users (CRM upload)

### Always Exclude from Retargeting
- Already converted on the specific campaign goal
- People who opted out / unsubscribed (if applicable)

### Post-March 2025 Exclusion Workaround
Meta removed detailed targeting exclusions (interest/behavior-based). Use:
- Custom audience exclusions (CRM uploads)
- Pixel-based exclusions (event-based: Purchase, CompleteRegistration)
- These still work and are more accurate than interest-based exclusions

## Audience Overlap Management

### Detection
- Use Meta's Audience Overlap tool to check overlap between ad sets
- Overlap >30% = consolidate or restructure
- Overlap causes: ad sets compete against each other, driving up costs

### Prevention
- Don't run multiple ad sets targeting the same broad audience
- Use exclusions between funnel tiers (exclude Tier 3 from Tier 1 ad sets)
- Consolidate similar interests into one ad set rather than splitting

## Process

### New Campaign Audience Setup
1. **Define funnel stage** - prospecting, engagement, website, customer
2. **Select audience type** based on stage
3. **Build audience specs** - targeting, exclusions, size estimates
4. **Check for overlap** with existing campaigns
5. **Document audience** in campaign brief

### Monthly Audience Review
1. Pull performance by audience segment (ad set level)
2. Identify top and bottom performing audiences
3. Check audience saturation (frequency + CTR trends)
4. Refresh custom audiences (new CRM data, updated pixel audiences)
5. Test one new audience expansion per month
6. Update MEMORY.md with audience learnings

### CRM Sync Schedule
- Upload updated customer lists monthly
- Update exclusion audiences after every significant conversion batch
- Refresh lookalike sources quarterly (or when source audience grows 25%+)

## Output Format

```markdown
# Audience Strategy: [Campaign Name] - YYYY-MM-DD

## Funnel Stage: [Prospecting / Engagement / Website / Customer]

## Primary Audience
- **Type:** Broad / LAL / Custom / Retargeting
- **Targeting:** [specs]
- **Estimated size:** [range]
- **Exclusions:** [list]

## Secondary Audience (if applicable)
[Same format]

## Overlap Check
- Checked against: [existing campaigns]
- Overlap: [%]
- Action: [no issue / consolidate / restructure]

## CRM Data Requirements
- [ ] Customer list uploaded (last update: YYYY-MM-DD)
- [ ] Exclusion audiences current
- [ ] Lookalike sources refreshed

## Audience Health Metrics (for existing audiences)
| Audience | Frequency (7d) | CTR Trend | CPA Trend | Status |
|----------|----------------|-----------|-----------|--------|
```

## Quality Bar

- Never launch a prospecting campaign without exclusion audiences
- Never create 1:1 audience-to-ad-set mapping for similar audiences (consolidate)
- Always check overlap before adding new ad sets
- CRM data must be refreshed monthly - stale exclusions waste budget
- Broad targeting is the default - only narrow with data-backed reasoning
- Every audience decision must be logged to MEMORY.md

## Integration with Other Skills

- Feeds into **Campaign Architecture** (audience definitions for ad sets)
- Informed by **Performance Review** (which audiences convert best)
- Coordinates with **Budget Optimizer** (budget allocation per audience tier)
- Receives signals from sales agent (lead quality by audience source)
- Research from **Ad Creative Research** informs messaging-audience matching
