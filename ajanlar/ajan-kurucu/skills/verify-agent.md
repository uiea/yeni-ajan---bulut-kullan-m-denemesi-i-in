# Skill: Verify the Agent

## Purpose
Check the new agent against the creation checklist, fix anything missing, and do a first real run
together so the member sees their agent actually work.

## When to Use This Skill
- A new agent has its files and at least one skill (after `write-skill.md`).
- The member wants to confirm an agent is complete and ready to use.

## Do NOT Use This Skill For
- Creating files or writing skills -> use `scaffold-agent.md` and `write-skill.md`.
- Choosing what agent to build -> use `onboard-member.md`.

## Serves Goal
- Keep quality high (the checklist is the bar every agent must clear).
- Get the member a real agent (the first real run is the proof it works).

## Inputs
- The checklist at `templates/AGENT_CREATION_CHECKLIST.md`.
- The new agent's files (`AGENT.md`, `HEARTBEAT.md`, `MEMORY.md`, `skills/*.md`).
- The routing table in `CLAUDE.md`.

## Process
1. **Run the checklist.** Go through `AGENT_CREATION_CHECKLIST.md` item by item against the new
   agent. For each, mark pass or fail.
2. **Fix the fails.** For anything that fails, fix it with the member (a missing target, a leftover
   `[placeholder]`, a skill with no goal, a missing routing-table row). Re-check after fixing.
3. **Confirm registration.** Make sure the agent has its row in the routing table in `CLAUDE.md`
   so the workspace will route to it.
4. **Do a first real run.** Ask the agent to do its main job once, for real, using `context.md`.
   Watch that it reads context, picks the right skill, produces something useful, and saves it to
   `outputs/` with a dated filename. Tie the run back to `context.md`: name the route and goal this
   agent serves, and point out how this first output moves the member one concrete step along it.
5. **Show the member what now exists.** Summarize: the agent's name, what it does, where its files
   are, and how to run it again next time. Tell them what the natural next agent or next skill could be.
6. **Note any learning.** If something about this member's way of working became clear, add it to
   Ajan Kurucu's own `MEMORY.md`.

## Output
- A checklist that fully passes for the new agent.
- One real output from the agent, saved in `outputs/`.
- A short summary for the member of what they now have and what comes next.

## Quality Bar
- Every checklist item passes. Do not call an agent "done" with open fails.
- The first real run produces something the member would actually use, not a placeholder.
- The member can describe, in their own words, what their agent does and how to run it.

## Rules & Feedback
- Do not skip the first real run.
  Why: a member who sees their agent produce something real believes the system works; a passed
  checklist alone does not give that feeling.
  How to apply: always end a build with one genuine run before closing the session.
- Celebrate the milestone honestly, but briefly.
  Why: finishing a first agent is a real moment; over-praising every step cheapens it.
  How to apply: mark the finished agent warmly, then point at the next concrete step.
- Talk to the member in Turkish; system files stay English; no em dash, use a hyphen.
  Why: audience fit, portability, house style.
  How to apply: every message and every file.
