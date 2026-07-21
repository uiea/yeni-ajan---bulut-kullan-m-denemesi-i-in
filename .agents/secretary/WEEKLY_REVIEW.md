# Skill: Weekly Review

## Purpose
Reflect on the week honestly. What moved the needle? What was wasted? What patterns are forming? Feed insights back into next week's planning.

## Serves Goals
- No important task forgotten (retrospective check)
- Revenue-driving actions prioritized (pattern detection)
- Q2 focus time tracked over time

## Schedule
Every Sunday evening.

## Inputs

| Source | What to read | Why |
|--------|-------------|-----|
| All daily briefs from the week | `outputs/*_daily-brief.md` | See what was planned |
| All priority audits (if any) | `outputs/*_priority-audit.md` | See what shifted |
| Task manager | All tasks incl. completed | Track completion rate, stale tasks |
| Journal entries (full week) | `journal/` | Events, decisions, signals |
| Agent KPIs | `agents/*/outputs/` | Did agent work translate to results? |
| Email | Email threads | Pending actions, follow-ups |
| Calendar | Week's meetings | Time allocation reality |
| `MEMORY.md` | Past patterns | See if recurring issues persist |
| `knowledge/STRATEGY.md` | Quarterly goals | Are we on track? |

## Process

### Step 1: Score the Week

```markdown
## Week Scorecard

| Metric | Target | This Week | Grade |
|--------|--------|-----------|-------|
| Days with Q2 focus time | 5/5 | _/5 | |
| Top priorities completed | 100% | _% | |
| Tasks completed this week | - | _/_ | |
| Tasks overdue | 0 | _ | |
| Dropped balls / missed deadlines | 0 | _ | |
| Revenue actions (done/planned) | >90% | _% | |
```

### Step 2: Win/Loss Analysis

**Wins - What worked this week:**
- What tasks moved the business forward?
- What habits served you well?
- What agent outputs drove value?

**Losses - What didn't work:**
- What was planned but not done? Why?
- Where was time wasted?
- What crises could have been prevented with better Q2 planning?

### Step 3: Pattern Detection

Look for recurring themes across weeks:

| Pattern | Signal | Risk |
|---------|--------|------|
| Chronic Q1 mode | Every day starts with fires | Burnout, no progress on growth |
| Avoidance | Same task appears in "didn't do" 3+ days | Procrastination on something important |
| Overcommitment | Briefs list 7+ items daily | Setting up for failure, need to cut scope |
| Agent neglect | Agent outputs not reviewed | Missing signals, wasting automation investment |
| No deep work | Calendar full of meetings | Q2 impossible without time blocks |

### Step 4: Next Week Preview

```markdown
## Next Week

### Top 3 Priorities
1. [Task] - Q[1/2] - Why: [Reason]
2. [Task] - Q[1/2] - Why: [Reason]
3. [Task] - Q[1/2] - Why: [Reason]

### One Habit to Build
[Specific, actionable - e.g., "Block 9-11 AM as no-meeting deep work"]

### One Thing to Stop
[Specific - e.g., "Stop checking Slack before completing morning's top priority"]

### Upcoming Deadlines
| Deadline | Date | Status |
|----------|------|--------|
```

### Step 5: Update Memory
- Add confirmed patterns to `MEMORY.md`
- Remove patterns that were one-off anomalies
- Note what interventions worked (e.g., "calling out procrastination in the audit led to action")

### Step 6: Write & Log
- Write full review to `outputs/YYYY-MM-DD_weekly-review.md`
- Log summary to journal with key metrics

## Output
A single markdown file: `outputs/YYYY-MM-DD_weekly-review.md`

## Quality Checks
- [ ] Scorecard uses real numbers, not vibes
- [ ] Wins are specific and tied to goals
- [ ] Losses include honest "why" - not just "didn't get to it"
- [ ] Patterns are compared against previous weeks' MEMORY.md
- [ ] Next week's priorities are realistic (max 3 big rocks)
- [ ] The review would make Covey proud - proactive, principle-centered
