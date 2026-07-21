# Skill: Write a Skill

## Purpose
Give the new agent its first real capability by writing one skill file: the step-by-step recipe
for one task the agent will do, including the rules that govern that task.

## When to Use This Skill
- The new agent's files exist (after `scaffold-agent.md`) but it has no real skill yet.
- An existing agent needs a new capability added.

## Do NOT Use This Skill For
- Creating the agent folder and `AGENT.md` -> use `scaffold-agent.md` first.
- The final checklist pass -> use `verify-agent.md`.

## Serves Goal
- Get the member a real agent (a skill is what lets the agent actually do something).
- Build independence (writing a skill together teaches the member how to write the next one).

## Inputs
- The skill template at `templates/standart-ajan/skills/_SKILL_TEMPLATE.md`.
- The new agent's `AGENT.md` (the skill must serve one of its goals).
- `context.md` (so the skill's output fits the member).

## Process
1. **Pick the one task.** From the agent's skills list, take the first skill and confirm with the
   member what single task it covers. One skill = one job.
2. **Copy the template.** Start from `_SKILL_TEMPLATE.md`, saved as
   `agents/[agent-name]/skills/[skill-name].md` with a short, lowercase, hyphenated name.
3. **Write the trigger.** Fill "When to Use This Skill" with the concrete phrases the member would
   actually say to fire it. Then fill "Do NOT Use This Skill For", pointing at any sibling skill
   that handles a similar request. This is what stops the wrong skill from running.
4. **Write the process.** The heart of the skill: numbered steps, each one a clear action. Walk
   the member through it so the steps match how they actually want the task done.
5. **Set the quality bar.** Write the minimum standard the output must hit to be acceptable.
6. **Capture the rules.** Put any rule that governs this task under "Rules & Feedback", each with a
   short Why and How to apply. This is also where future corrections from the member will land.
7. **Update AGENT.md if needed.** Make sure the skills table in `AGENT.md` lists this skill and
   maps it to the right goal.
8. **Hand off.** With at least one working skill in place, move to `verify-agent.md`.

## Output
- A complete skill file at `agents/[agent-name]/skills/[skill-name].md`.
- An updated skills table in the agent's `AGENT.md` if the skill name changed.

## Quality Bar
- The skill serves a goal in `AGENT.md`. If it does not, it should not exist.
- The process is numbered, concrete, and something the member could follow by hand.
- "When to Use" and "Do NOT Use This Skill For" are both filled in.
- The whole file stays short (aim under ~1500 words). If it would be huge, split long reference
  lists into a `references/` file next to it and link from the steps.

## Rules & Feedback
- One skill, one task. Resist bundling.
  Why: bundled skills get fired for the wrong request and become impossible to maintain.
  How to apply: if a skill is growing two jobs, split it into two skills.
- Recurring member feedback on a task lives in that task's skill, never in memory or notes.
  Why: the skill is read every time the task runs, so the rule actually gets applied; memory is not.
  How to apply: when the member says "always do X" or "never do Y" about a task, add it to that
  skill's "Rules & Feedback".
- System file in English; output to the member in Turkish; no em dash, use a hyphen.
  Why: portability, audience fit, house style.
  How to apply: write the skill in English, examples and member-facing output in Turkish.
