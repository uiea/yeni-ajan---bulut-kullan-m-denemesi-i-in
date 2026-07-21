# Skill: Campaign Architecture

## Purpose

Design optimal campaign structures (campaign > ad set > ad hierarchy), select objectives, configure placements, and plan testing frameworks that maximize Meta's algorithm efficiency.

## Serves Goals

- **ROAS >4x** - correct structure lets Meta's algorithm optimize for real conversions
- **CPA <$25** - efficient structure avoids audience overlap and wasted spend
- **Creative win rate >30%** - proper testing isolation identifies true winners

## Two-Campaign System (Core Framework)

### Campaign 1: Testing (ABO)
- **Objective:** Conversions (optimized for trial/demo/purchase)
- **Budget type:** Ad Set Budget Optimization (ABO) - fixed budget per ad set
- **Budget allocation:** 10-20% of total Meta spend
- **Purpose:** Controlled creative testing with equal spend distribution
- **Structure:**
  - 1 campaign
  - 3-5 ad sets (each testing one variable)
  - 2-3 ads per ad set
  - Equal budgets across ad sets
- **Rules:**
  - Test ONE variable at a time (creative format, hook, audience, copy)
  - Run each test minimum 5-7 days
  - Need 50+ conversions per variation for statistical significance
  - Daily budget per ad set = target CPA x 2-3 (e.g., $25 CPA = $50-75/day per ad set)

### Campaign 2: Scaling (CBO)
- **Objective:** Conversions (same as testing)
- **Budget type:** Campaign Budget Optimization (CBO / Advantage+ Campaign Budget)
- **Budget allocation:** 80-90% of total Meta spend
- **Purpose:** Scale proven winners, let Meta's algorithm optimize distribution
- **Structure:**
  - 1 campaign
  - 3-5 ad sets (winning audiences)
  - 3-5 ads per ad set (proven creatives only)
  - Campaign-level budget, Meta distributes
- **Rules:**
  - Only graduate ads that beat target CPA in testing campaign
  - Set minimum spend floors on ad sets if Meta under-delivers to key audiences
  - Budget increases: max 20% every 3-4 days
  - Never edit during first 72 hours after launch or budget change

### Optional Campaign 3: Retargeting
- **Objective:** Conversions
- **Budget:** 10-20% of total spend
- **Audiences:** Website visitors (7-30 days), video viewers (25-95%), engagement (30-90 days), email list
- **Creative:** Testimonials, objection handling, urgency, feature highlights
- **Rules:**
  - Always exclude past converters
  - Refresh creative every 2-3 weeks (smaller audiences fatigue faster)
  - Monitor frequency - cap at 5x for retargeting

## Objective Selection Guide

| Goal | Meta Objective | Optimization Event | When to Use |
|------|---------------|-------------------|-------------|
| Get memberships/purchases | OUTCOME_SALES | Purchase | When your pixel fires Purchase on signup |
| Get trial sign-ups | Conversions | CompleteRegistration | For trial/freemium funnels |
| Get demo bookings | Conversions | Lead (custom: DemoBooked) | For high-ticket offers needing qualification |
| Build awareness | Reach / ThruPlay | Impressions / Video Views | Only when entering entirely new markets |
| Retarget warm audiences | Conversions | Purchase / CompleteRegistration | For bottom-funnel conversion |
| Grow email list | Conversions | Lead | Secondary objective, feeds retargeting |

**Default:** Always match your objective to the actual pixel event your conversion fires. Only deviate with explicit strategic reasoning.

### CRITICAL: Objective-Event Alignment Rule

The campaign objective MUST match the pixel event type. Mismatches cause **zero attribution** even when conversions actually happen.

| Pixel Event | Required Objective | What Happens If Mismatched |
|-------------|-------------------|---------------------------|
| Purchase | OUTCOME_SALES | If you use OUTCOME_LEADS, Meta sees 0 conversions, can't optimize, stays in learning phase forever |
| Lead | OUTCOME_LEADS | If you use OUTCOME_SALES, same problem |

**Common mistake:** Campaign uses OUTCOME_LEADS but pixel fires Purchase. Result: money spent, Meta reports 0 conversions, algorithm never learns who to target. CPM spikes because Meta is blind-delivering without conversion signal.

## Placement Strategy

### Advantage+ Placements (Default)
- Let Meta distribute across all placements automatically
- Meta's algorithm finds the cheapest conversions across FB Feed, IG Feed, Stories, Reels, Audience Network, etc.
- **Use when:** scaling campaigns, broad audiences, proven creatives

### Manual Placements (When Needed)
- **Facebook Feed + Instagram Feed:** safest for new campaigns
- **Instagram Stories + Reels:** best for vertical video and story-format carousel
- **Audience Network:** exclude unless scaling aggressively (lower quality traffic)
- **Use when:** testing specific creative formats, troubleshooting performance

## Naming Convention

```
[Objective]_[Type]_[Audience]_[Date]

Campaign:  CONV_TEST_2026-03-15
           CONV_SCALE_2026-03-15
           CONV_RETARGET_2026-03-15

Ad Set:    CONV_TEST_Broad-25-44_2026-03-15
           CONV_SCALE_LAL-1pct-purchasers_2026-03-15
           CONV_RETARGET_WebVisitors-7d_2026-03-15

Ad:        CONV_TEST_Broad-25-44_StaticV1-DataHighlight_2026-03-15
           CONV_SCALE_LAL-1pct_CarouselV3-Features_2026-03-15
```

## Campaign Quick Setup (Template Config)

For any membership/purchase campaign, use these settings:

```
Campaign:
  objective: OUTCOME_SALES
  buying_type: AUCTION
  special_ad_categories: []

Ad Set:
  optimization_goal: OFFSITE_CONVERSIONS
  billing_event: IMPRESSIONS
  promoted_object:
    pixel_id: "{YOUR_PIXEL_ID}"
    custom_event_type: PURCHASE
  targeting:
    age_min: 25
    age_max: 65
    geo_locations:
      countries: ["{YOUR_TARGET_COUNTRY}"]
    targeting_automation:
      advantage_audience: 1

Pixel: {YOUR_PIXEL_ID}
Page: {YOUR_PAGE_ID}
Ad Account: act_{YOUR_AD_ACCOUNT_ID}
```

**API command to verify pixel events before launch:**
```bash
curl -s "https://graph.facebook.com/v21.0/{YOUR_PIXEL_ID}/stats?access_token={YOUR_API_TOKEN}" | python3 -m json.tool
# Must see your target event (e.g., "Purchase") in the data. If only "PageView", your integration is broken.
```

## Process

### New Campaign Launch
1. Define objective and success criteria (target CPA, target ROAS)
2. Design campaign structure (testing + scaling split)
3. Build audience strategy (coordinate with Audience Strategy skill)
4. Assign creatives to ad sets (coordinate with Static Image Design + Ad Copy)
5. Set budgets (coordinate with Budget Optimizer skill)
6. Write campaign brief with full specs
7. Hand off to human for Ads Manager setup

### Creative Test Setup
1. Identify the variable to test (hook, format, audience, copy length)
2. Create hypothesis: "We believe [X] will outperform [Y] because [Z]"
3. Design ABO campaign with equal budgets
4. Define success criteria: "Winner = lowest CPA after 50+ conversions"
5. Set test duration: 7 days minimum
6. Document in test plan output

## Output Format

```markdown
# Campaign Brief: [Name] - YYYY-MM-DD

## Objective
[What we're trying to achieve + success criteria]

## Structure
### Campaign Level
- Name: [naming convention]
- Objective: [Conversions / Reach / etc.]
- Budget type: [ABO / CBO]
- Total budget: $X/day

### Ad Set 1: [Name]
- Audience: [targeting details]
- Placements: [Advantage+ / Manual]
- Budget: $X/day
- Schedule: [start date - end date]
- Optimization: [conversion event]

#### Ads:
1. [Ad name] - [format] - [creative + copy reference]
2. [Ad name] - [format] - [creative + copy reference]

### Ad Set 2: ...

## Test Hypothesis (if testing)
We believe [X] will outperform [Y] because [Z].
Success criteria: [metric] < [threshold] after [N] conversions.

## Launch Checklist
- [ ] **Objective-event alignment verified** (pixel event matches campaign objective)
- [ ] Pixel event confirmed firing (check pixel stats endpoint)
- [ ] Advantage Audience enabled (advantage_audience: 1)
- [ ] age_max >= 65 (required for Advantage Audience)
- [ ] Exclusion audiences applied
- [ ] Creative assets approved
- [ ] Budget approved
- [ ] Naming convention followed
```

## Advantage Audience (Targeting Automation)

- **Always enable** `advantage_audience: 1` for prospecting campaigns
- When enabled, age_max must be >= 65 (Meta requirement). Set 25-65 as the suggestion range.
- Do NOT restrict with interest targeting - let Meta's algorithm find converters from broad audience
- Without Advantage Audience, Meta can't expand beyond your defined audience even when it finds good signals

## Learning Phase Requirements

- Meta needs ~50 optimization events per week per ad set to exit learning phase
- If the pixel event doesn't match the objective, Meta gets 0 events and NEVER exits learning phase
- A campaign stuck in "learning limited" will have inflated CPM and waste budget
- **Pre-launch check:** Verify pixel fires the EXACT event type that the ad set's `promoted_object.custom_event_type` expects

## Quality Bar

- Every campaign must have a clear, measurable objective before launch
- Never mix testing and scaling in the same campaign
- Never launch without Pixel + CAPI event verification
- **VERIFY objective-event alignment before launch** - check that `promoted_object.custom_event_type` matches the actual pixel event
- Always apply exclusion audiences (existing customers, recent converters)
- Campaign structure must be documented - no "cowboy" launches

## Integration with Other Skills

- Coordinates with **Audience Strategy** for targeting configuration
- Coordinates with **Budget Optimizer** for spend allocation
- Receives creatives from **Static Image Design** and copy from **Ad Copy**
- Performance data from **Performance Review** informs structure changes
- Research from **Ad Creative Research** informs format and angle priorities
