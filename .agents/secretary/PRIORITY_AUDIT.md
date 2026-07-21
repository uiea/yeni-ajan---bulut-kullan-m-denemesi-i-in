# Skill: Priority Audit

## Purpose
Mid-day reality check. Are you still working on the right things, or did the day get hijacked by urgency?

## Serves Goals
- Work on important (Q2) tasks daily
- Revenue-driving actions prioritized

## Triggers
- Explicitly asked "what should I focus on?"
- A new crisis or signal arrived that may shift priorities
- 4+ hours since morning brief with no progress on top priorities
- On-demand when feeling scattered or overwhelmed

## Inputs

| Source | What to read | Why |
|--------|-------------|-----|
| Today's daily brief | Morning plan | Compare plan vs. reality |
| `journal/` (today) | What happened since morning | Detect drift |
| `agents/*/outputs/` (today) | New agent signals | Catch new information |
| Calendar | Remaining meetings | Know time left |
| Task manager | Task updates | See what got checked off |

## Process

### Step 1: Compare Plan vs. Reality
- What was planned this morning?
- What actually happened?
- Where did the drift occur?

### Step 2: Diagnose the Drift

Common drift patterns:
| Pattern | What happened | Response |
|---------|--------------|----------|
| **Urgency hijack** | Q1 crisis took over | Assess: was it real Q1 or disguised Q3? |
| **Procrastination** | Avoided hard Q2 work, did easy stuff instead | Name it directly, suggest smallest next step |
| **Scope creep** | Started on priority but went down a rabbit hole | Suggest time-boxing and parking the tangent |
| **External pull** | Someone else's priority took over | Check: is this actually your responsibility? |
| **Energy crash** | Low energy, couldn't focus | Suggest a break, walk, or switch to lighter tasks |

### Step 3: Re-Prioritize

Given what's left of the day:
1. What's the ONE thing that would make today a win?
2. What can wait until tomorrow without consequence?
3. What should be delegated or dropped entirely?

### Step 4: Deliver the Audit

```markdown
# Priority Audit - [Date] [Time]

## Morning Plan vs. Reality
| Planned | Status | Notes |
|---------|--------|-------|
| [Task 1] | Done / In progress / Not started / Replaced by X | |

## What Shifted
[Explain what changed and whether the shift was justified]

## Remaining Time Today
- **Hours left:** [X]
- **Meetings remaining:** [List]
- **Deep work available:** [X hours]

## Revised Priority
### The ONE thing for the rest of today:
[Single most important task with clear reasoning]

### If time permits:
- [ ] [Secondary items]

## Honest Assessment
[Direct feedback - e.g., "You spent 2 hours on Q3 admin. That's not where the revenue is."]
```

### Step 5: Write & Log
- Write to `outputs/YYYY-MM-DD_priority-audit.md`
- Log to journal if significant priority shift occurred

## Output
A single markdown file: `outputs/YYYY-MM-DD_priority-audit.md`

## Quality Checks
- [ ] Diagnosis is specific, not generic ("you got distracted" -> "you spent 90 min in Slack instead of finishing the script draft")
- [ ] Revised priority is achievable in remaining time
- [ ] Honest assessment is direct but not harsh
- [ ] ONE clear recommendation for the rest of the day
