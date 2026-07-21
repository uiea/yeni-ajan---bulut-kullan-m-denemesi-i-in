# Skill: Goal Alignment Check

## Purpose
Zoom out from daily tactics. Are your daily actions actually moving toward your life purpose, quarterly goals, and revenue targets - or has drift crept in?

## Serves Goals
- Revenue-driving actions prioritized
- Q2 focus time (strategic, not just operational)

## Schedule
1st and 15th of each month, or on-demand when feeling lost or questioning direction.

## Inputs

| Source | What to read | Why |
|--------|-------------|-----|
| `knowledge/BRAND.md` | Life purpose, values | The ultimate compass |
| `knowledge/STRATEGY.md` | Quarterly goals, KPIs | Measurable targets |
| Weekly reviews (last 2-4) | `outputs/*_weekly-review.md` | Actual time allocation |
| Journal (last 2-4 weeks) | `journal/` | What actually happened |
| Agent KPIs | `agents/*/AGENT.md` | Are agents moving their metrics? |
| `MEMORY.md` | Recurring patterns | Systemic issues |

## Process

### Step 1: Restate the North Star

Pull directly from brand/knowledge files:
- **Life purpose:** [From BRAND.md]
- **Quarterly revenue target:** [From STRATEGY.md]
- **Top 3 strategic priorities:** [From STRATEGY.md]

### Step 2: Map Actual Time to Stated Goals

Over the review period, where did time actually go?

```markdown
## Time Allocation Reality

| Category | % of Time (Estimated) | Serves Which Goal? | Verdict |
|----------|----------------------|--------------------|---------|
| Content creation | _% | Growth, brand | Aligned |
| Admin / operations | _% | None directly | Over-invested? |
| Sales / outreach | _% | Revenue | Aligned |
| Community | _% | Retention, brand | Aligned |
| Learning / health | _% | Sharpen the Saw | Needed |
| Firefighting | _% | None (reactive) | Minimize |
| Unknown / misc | _% | ? | Investigate |
```

### Step 3: Identify Drift

**Alignment check questions:**
1. If someone looked at how you spent the last 2 weeks, could they guess your life purpose? If not, there's drift.
2. Which of the quarterly goals got zero attention? Why?
3. Are any agents producing output that nobody uses? (Wasted system capacity)
4. Is revenue work getting displaced by "interesting but not profitable" work?
5. Is "Sharpen the Saw" happening (health, learning, relationships)?

### Step 4: Covey's Roles & Goals Framework

Covey suggests defining key life roles and setting one goal per role per week:

```markdown
## Role Alignment

| Role | Goal This Period | Status | Notes |
|------|-----------------|--------|-------|
| Entrepreneur | [Revenue target] | On/Off track | |
| Content Creator | [Growth target] | On/Off track | |
| Community Leader | [Retention target] | On/Off track | |
| Learner | [Skill target] | On/Off track | |
| Human | [Health/relationship goal] | On/Off track | |
```

### Step 5: Course Corrections

For each area of drift:
- **What to start:** Actions that serve the goal but haven't been prioritized
- **What to stop:** Activities consuming time without serving any goal
- **What to continue:** What's working and should be protected

### Step 6: Deliver

```markdown
# Goal Alignment Check - [Date]

## North Star
[Life purpose, one line]

## Quarterly Goals Progress
| Goal | Target | Current | On Track? |
|------|--------|---------|-----------|

## Alignment Score: [X/10]
[Brief explanation]

## Biggest Drift
[The single largest gap between stated goals and actual behavior]

## Course Corrections
### Start
- ...
### Stop
- ...
### Continue
- ...

## Covey Principle in Focus
[Which of the 7 Habits is most needed right now, and why]
```

### Step 7: Write & Log
- Write to `outputs/YYYY-MM-DD_goal-alignment.md`
- Update `MEMORY.md` if new patterns confirmed
- Log to journal

## Output
A single markdown file: `outputs/YYYY-MM-DD_goal-alignment.md`

## Quality Checks
- [ ] Life purpose is quoted directly, not paraphrased
- [ ] Time allocation uses real evidence from briefs/journal, not guesses
- [ ] Course corrections are specific and actionable
- [ ] At least one "stop doing" item is included (hardest but most valuable)
- [ ] The Covey principle reference is relevant, not forced
- [ ] Tone is coaching, not lecturing - you are the advisor, not the boss
