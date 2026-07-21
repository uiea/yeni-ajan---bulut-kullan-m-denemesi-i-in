# How to Build a New Agent

This is the step-by-step guide for turning an idea into a working agent. Ajan Kurucu follows
these steps with the member. You do not need to type any of this yourself - just tell ajan-kurucu
to build the agent and it runs these steps for you. The commands below are shown only so you can
see what is happening under the hood.

An agent is not code. It is four Markdown files in a folder. That is all.

## Step 1: Copy the template

```bash
cp -r şablonlar/standart-ajan ajanlar/your-agent-name
```

Use a short, lowercase, hyphenated name that says what it does. Turkish names are fine and
encouraged (keep them ASCII - no ı, ş, ç in folder names): `instagram-postlari`, `gunluk-plan`,
`musteri-yanitlari`.

The copy includes a blank `skills/_SKILL_TEMPLATE.md`. That is just a starting point for your
first skill, not a working skill - leave it, or delete it once you have written a real one.

## Step 2: Write the mission (AGENT.md)

Open `ajanlar/your-agent-name/AGENT.md` and fill in:

1. **Mission** - one sentence. What does this agent exist to do?
2. **Goals & KPIs** - the 2 to 4 measurable numbers it moves. If you cannot measure it, it is
   not a goal yet.
3. **Non-goals** - what it explicitly does NOT do.
4. **Permissions** - the one line at the top: what it can do on its own, and what needs your
   approval first.

Ask yourself: "If this agent did nothing else, which 2-3 numbers would prove it is working?"

## Step 3: Write the skills

For each goal, ask: "What does the agent need to be able to do to move this number?" That
capability becomes a skill.

1. Copy `skills/_SKILL_TEMPLATE.md` to a new file per skill, e.g. `skills/write-caption.md`.
2. Fill in the purpose, the trigger ("When to Use"), and the step-by-step process.
3. Fill in "Do NOT Use This Skill For" - point at the other skill that handles similar requests.
   This is what stops the wrong skill from firing.
4. Put any rule that governs this one task inside the skill, under "Rules & Feedback". Do not
   make a separate rules file.

Rule of thumb: if a skill does not serve a goal in `AGENT.md`, delete it. If a goal has no
skill, create one.

## Step 4: Write the heartbeat (HEARTBEAT.md)

1. **When does it run?** Start with "whenever I ask" - you can automate later.
2. **Each run** - what it reads, how it decides which skill to use, where it saves the result.
3. **Weekly review** - the few minutes where it looks back and writes what it learned to MEMORY.md.

Keep it simple. One skill per run is usually enough. Do not over-build.

## Step 5: Leave memory empty

`MEMORY.md` starts empty. Memory is earned from real results, not filled with guesses on day one.

## Step 6: Register the agent

Add a row to the routing table in the root `CLAUDE.md`:

```
| Your Agent | ajanlar/your-agent-name/ | [what it does] |
```

This is how the workspace knows the agent exists and routes requests to it.

## Step 7: First run

1. Ask the agent to do its main job once.
2. Check that it read `context.md`, picked the right skill, produced something useful, and saved
   it to `çıktılar/`.
3. After a week of real use, do the first weekly review and let it write to `MEMORY.md`.

## Step 8: Verify

Run through `AGENT_CREATION_CHECKLIST.md` to confirm nothing is missing.

## Common mistakes

| Mistake | Fix |
|---------|-----|
| Too many goals | Max 4. If you need more, it is two agents. |
| Skills that serve no goal | Delete them, or add the goal. |
| Memory pre-filled with guesses | Keep it empty. Memory is earned. |
| A separate rules file | Rules live inside the skill that owns the task. |
| Never reviewing | Without the weekly review, the agent never gets better. |
