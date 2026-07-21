# Skill: Design the Agent

## Purpose
Turn the member's chosen idea into a clear agent design: one mission, 2-4 measurable goals,
non-goals, and the skills the agent will need - before any file is created.

## When to Use This Skill
- The member has picked which agent to build (after `onboard-member.md`).
- The member has an agent idea but it is still vague ("bir içerik ajanı istiyorum").

## Do NOT Use This Skill For
- Filling in `context.md` or choosing the first agent -> use `onboard-member.md`.
- Creating the actual files -> use `scaffold-agent.md` (run this only after the design is agreed).

## Serves Goal
- Get the member a real agent (a clear design is what makes the agent actually useful).
- Keep quality high (a focused design is the root of a focused agent).

## Inputs
- `context.md` (the member's goal and route - the design must serve these).
- The member's answers about what they want this agent to do.

## Process
1. **Find the one mission.** Ask the member, in plain Turkish, what this agent is for. Compress
   their answer into a single sentence. If it needs the word "and" twice, it is probably two
   agents - say so and suggest starting with one.
2. **Set 2-4 goals with numbers.** For each goal, ask "how would we know it is working?" Turn each
   into a KPI with a baseline (where they are today) and a target. If a goal cannot be measured,
   reshape it until it can, or drop it.
3. **Name the non-goals.** Ask what this agent should clearly NOT do. This keeps it from drifting.
4. **List the skills it needs.** For each goal, ask "what does the agent need to be able to do to
   move this number?" Each capability becomes one skill. Aim for 1-3 skills for a first agent, not ten.
5. **Set permissions.** Decide in one line what the agent can do on its own and what needs the
   member's approval (anything sent outward always needs approval).
6. **Show the full design and confirm.** Lay out mission, goals table, non-goals, skills, and
   permissions in one short summary. Ask "böyle mi kuralım?" Only move to `scaffold-agent.md` after a yes.

## Output
- An agreed design: mission (1 sentence), goals table (KPI + baseline + target), non-goals,
  skill list, and the permissions line. This is what `scaffold-agent.md` writes into the files.

## Quality Bar
- The mission fits in one sentence and serves a goal from `context.md`.
- Every goal has a number and a target, not a wish.
- The first agent has at most 4 goals and at most 3 skills. Smaller is better; it can grow later.

## Rules & Feedback
- Keep the design small on the first build.
  Why: a first-timer who finishes a small agent learns more than one who stalls on a big one.
  How to apply: if the member's idea is large, agree on a "version 1" that does one thing well.
- Do not invent numbers for the member.
  Why: fake baselines make the weekly review meaningless.
  How to apply: if they do not know a baseline, write "today: unknown" and plan to measure it.
- Do not say the words KPI, baseline, non-goal, mission, or permissions to the member. Ask in
  plain Turkish instead - for a KPI ask "bunun çalıştığını hangi sayıdan anlarız?", for a baseline
  ask "şu an bu sayı kaç?", for non-goals ask "bu ajan neyi yapMAsın?". The English terms stay in
  the files only.
  Why: the member is a non-coder; the technical words freeze them, even though the file uses them.
  How to apply: every time a design step is discussed with the member.
- Talk to the member in Turkish, warm and direct; never use an em dash, use a hyphen.
  Why: house style and audience fit.
  How to apply: every message to the member.
