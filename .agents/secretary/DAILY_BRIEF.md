# Skill: Daily Brief

## Purpose
Deliver a prioritized daily action plan every weekday morning so you start the day with absolute clarity on what matters most.

## Serves Goals
- Work on important (Q2) tasks daily
- No important task forgotten
- Revenue-driving actions prioritized
- Daily brief delivered

## Inputs

| Source | What to read | Why |
|--------|-------------|-----|
| `journal/` (last 24h) | Recent events, decisions, blockers | Know what happened yesterday |
| `knowledge/STRATEGY.md` | Current priorities | Align with big picture |
| `agents/*/outputs/` (last 24h) | Agent outputs | Surface cross-agent signals |
| Calendar | Today's meetings | Know time constraints |
| Email | Unread inbox, important emails | Surface urgent messages |
| Task manager | Open tasks, deadlines | Know what's committed |
| `MEMORY.md` | Patterns | Anticipate pitfalls |
| Previous day's brief | Yesterday's plan | Check what got done vs. didn't |

## Process

### Step 1: Gather Everything
Collect all open tasks, deadlines, meetings, agent signals, and journal entries into one raw list. Classify by due date and importance into Covey quadrants:
- **Overdue or due today + high importance** -> Q1
- **High importance, strategic work** -> Q2
- **Normal importance, no urgent deadline** -> Q3

### Step 2: Classify into Covey Quadrants

**Q1 - Urgent + Important (DO NOW)**
- Hard deadlines today
- Revenue-blocking issues
- Crises that can't wait

**Q2 - Not Urgent + Important (PROTECT THIS)**
- Strategy work, planning
- Content creation for future growth
- System building, automation
- Health, learning, relationships
- Things that prevent future Q1 crises

**Q3 - Urgent + Not Important (BATCH/DELEGATE)**
- Admin tasks
- Non-critical messages
- Routine items agents can handle
- Meetings that don't need you

**Q4 - Not Urgent + Not Important (ELIMINATE)**
- Social media scrolling
- Low-value tasks that crept onto the list
- "Nice to have" that doesn't serve goals

### Step 3: Build the Brief

Structure:

```markdown
# Daily Brief - [Date]

## Today's Focus (Why This Matters)
One sentence connecting today's work to the bigger goal.

## Top Priorities

### 1. [Task Name] - Q[1/2]
- **Why now:** [Specific reason this is today's priority]
- **Done when:** [Clear completion criteria]
- **Time needed:** [Estimate]

### 2. [Task Name] - Q[1/2]
...

### 3. [Task Name] - Q[1/2]
...

## Also On Your Plate
- [ ] [Lower priority items, batched]

## Don't Do Today
- [Things that feel urgent but aren't - with reasoning]

## Agent Signals
- [Notable outputs from other agents worth knowing]

## Calendar Reality
- [Meetings and their impact on available focus time]
- **Available deep work:** [X hours]

## Yesterday's Scorecard
- [What got done vs. what was planned]
- [Anything carried forward and why]
```

### Step 4: Apply the "Big Rocks" Principle
Covey's Big Rocks: schedule the most important things first, then fit the small stuff around them. If there are 3 hours of meetings, the brief should acknowledge that and set realistic expectations - not a 10-item to-do list.

### Step 5: Deliver
- Write to `outputs/YYYY-MM-DD_daily-brief.md`
- Log summary to journal

## Output
A single markdown file: `outputs/YYYY-MM-DD_daily-brief.md`

## Quality Checks
- [ ] Top priorities are genuinely important, not just urgent
- [ ] At least one Q2 item is included every day
- [ ] "Don't Do Today" section is honest and specific
- [ ] Time estimates are realistic given calendar
- [ ] Yesterday's scorecard is included (accountability)
- [ ] Each priority has a clear "why now" and "done when"

## Anti-Patterns to Avoid
- Listing 10+ priorities (that's not prioritizing)
- Only Q1 items (firefighting mode - flag this)
- Vague tasks ("work on content" -> "write first draft of tutorial script")
- Ignoring calendar constraints
- Being too gentle about procrastination patterns
