# Agent Creation Checklist

Run through this after building a new agent to confirm it is complete and ready to use.

## AGENT.md
- [ ] Mission is one sentence, specific, and measurable.
- [ ] Permissions line at the top says what it can do and what needs approval.
- [ ] Goals table has at least 2 KPIs with a baseline (today) and a target.
- [ ] Non-goals are listed (what it does NOT do).
- [ ] At least one skill is listed and mapped to a goal.
- [ ] "What This Agent Should Never Do" has at least 3 hard boundaries.
- [ ] There is no separate rules file - rules live inside the skills.

## HEARTBEAT.md
- [ ] It is clear when the agent runs.
- [ ] Each run has: read context, decide, run a skill, save the result.
- [ ] There is a weekly review where the agent learns and updates MEMORY.md.
- [ ] It is clear when the agent should stop and ask the member.

## MEMORY.md
- [ ] Empty. No pre-filled guesses.

## Skills
- [ ] Each skill is its own file in `skills/`.
- [ ] Each skill maps to a goal in AGENT.md.
- [ ] Each skill has a numbered, step-by-step process.
- [ ] Each skill has a "When to Use" section with concrete triggers.
- [ ] Each skill has a "Do NOT Use This Skill For" section pointing at adjacent skills.
- [ ] Rules for a task live inside that task's skill, not in a separate file.
- [ ] No skill exists that does not serve a goal.

## Workspace
- [ ] The agent has a row in the routing table in the root `CLAUDE.md`.
- [ ] `çıktılar/` exists for the agent's results.
- [ ] `context.md` is filled in (the agent reads it before doing anything).

## After the first week
- [ ] The agent has run for real at least once and produced something useful.
- [ ] The first weekly review is done.
- [ ] MEMORY.md has at least one real, evidence-backed entry.
