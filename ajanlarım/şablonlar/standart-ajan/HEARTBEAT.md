# [Agent Name] Heartbeat

The heartbeat is the agent's operating loop: what it does when it runs, and how it learns from
its own results. Keep it simple. For a first agent, one skill per run is plenty.

## When does this agent run?
<!-- Example: "Whenever I ask it to" / "Once a week, when I plan content" / "Every morning". -->

## Each run

### 1. Read context
- Read `context.md` (who the member is, goal, route).
- Read this agent's `MEMORY.md` for anything learned so far.

### 2. Decide what to do
- What does the member need right now?
- Which skill fits? (List the decision below.)

### 3. Run the skill
<!-- Which skill runs in which situation. Example: -->
<!-- - Need post ideas? -> run skills/brainstorm.md -->
<!-- - Have an idea, need the caption? -> run skills/write-caption.md -->

### 4. Save the result
- Save to `çıktılar/` as `YYYY-MM-DD_[agent-name]_short-description.md`.

## Weekly review (how the agent learns)
<!-- Once a week, look back. This is how the agent gets better instead of staying the same. -->
1. What worked this week? Add the pattern to `MEMORY.md`.
2. What did not work? Add the lesson to `MEMORY.md`.
3. Are the goals in `AGENT.md` still the right ones?

## When to stop and ask the member
- The request does not fit any existing skill.
- A decision needs the member's judgment (money, strategy, anything sent outward).
- Something feels off and the agent cannot tell why.
