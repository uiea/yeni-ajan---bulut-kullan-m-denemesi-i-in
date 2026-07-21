# Skill: Scaffold the Agent

## Purpose
Create the new agent's files from the template, fill in `AGENT.md`, `HEARTBEAT.md`, and an empty
`MEMORY.md` from the agreed design, and register the agent in the routing table.

## When to Use This Skill
- The design is agreed (after `design-agent.md`) and the member has said "yes, build it".

## Do NOT Use This Skill For
- Shaping the mission and goals -> use `design-agent.md` first.
- Writing the agent's actual skill recipes -> use `write-skill.md` (run it right after this).
- Final quality check -> use `verify-agent.md`.

## Serves Goal
- Get the member a real agent (this is the step where the agent becomes real files).

## Inputs
- The agreed design (mission, goals, non-goals, skills, permissions) from `design-agent.md`.
- The template at `templates/standart-ajan/`.
- The build guide at `templates/NEW_AGENT_BOOTSTRAP.md`.
- The routing table in `CLAUDE.md`.

## Process
1. **Confirm the folder name.** Propose a short, lowercase, hyphenated name that says what the
   agent does. Turkish names are fine and encouraged, kept ASCII (e.g. `instagram-postlari`,
   `gunluk-plan`). Confirm it with the member.
2. **Copy the template.** Create the new folder by copying `templates/standart-ajan/`. Run this
   from the pack root (the folder that holds `CLAUDE.md` and `context.md`), and quote any path that
   contains a space:
   ```bash
   cp -r templates/standart-ajan agents/[new-agent-name]
   ```
   Show the member that the new folder now exists with the four kinds of files inside. The copy also
   brings a blank `skills/_SKILL_TEMPLATE.md` - that is just a starting point for the next skill, not
   a working skill; leave it, or delete it once the first real skill is written.
3. **Fill AGENT.md.** Write in the agreed mission, the goals table, non-goals, the skills table
   (pointing at the skill files that `write-skill.md` will create), and the permissions line at
   the top. Replace every `[placeholder]`.
4. **Fill HEARTBEAT.md.** Write when the agent runs, what it does each run, where it saves output,
   and the weekly review. Keep it simple - one skill per run for a first agent.
5. **Leave MEMORY.md unfilled.** Keep the template's section headings, set the agent name in the title, and add no learnings - memory is earned.
6. **Register the agent.** Add one row to the routing table in `CLAUDE.md`:
   ```
   | [Agent Name] | agents/[new-agent-name]/ | [what it does] |
   ```
   Show the member the edit before saving it.
7. **Hand off.** The folder now exists but has no real capability yet. Move to `write-skill.md`
   to give it its first skill.

## Output
- A new agent folder under `agents/` with `AGENT.md`, `HEARTBEAT.md`, and an empty `MEMORY.md`
  filled in from the design.
- A new row in the routing table in `CLAUDE.md`.

## Quality Bar
- Every `[placeholder]` in the copied files is replaced. No "[Agent Name]" left behind.
- The skills table in `AGENT.md` matches the skill files that will be written next.
- The agent appears in the routing table so the workspace can find it.

## Rules & Feedback
- Show every file edit and the routing-table change before saving, and wait for a yes.
  Why: it is the member's workspace; nothing changes without their say-so.
  How to apply: before each Write to a new file and before editing `CLAUDE.md`.
- Never overwrite an existing agent folder.
  Why: it would destroy work the member already has.
  How to apply: if the folder name is taken, pick a new name with the member.
- Register the agent in `CLAUDE.md` only after the folder copy actually succeeded.
  Why: a routing-table row pointing at a folder that does not exist breaks the workspace.
  How to apply: confirm the new folder and its files exist before editing `CLAUDE.md`.
- System files in English; talk to the member in Turkish; no em dash, use a hyphen.
  Why: portability for the files, audience fit for the conversation, house style.
  How to apply: write the files in English, explain each one to the member in Turkish.
