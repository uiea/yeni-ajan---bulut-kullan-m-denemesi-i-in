# Tasarim Heartbeat

The heartbeat is the agent's operating loop. Keep each run narrow: one card, one message, one saved output.

## When does this agent run?

Run when the member asks for a business card, personal card, introduction card, visual identity card, or asks how to turn a photo/context into a shareable first visual.

## Each run

### 1. Read context
- Read `context.md` before making design choices.
- Read `MEMORY.md` for proven preferences.
- If a source image path is provided, inspect it before using it.

### 2. Decide what to do
- If the member wants a business card (photo-based or code-native), run `skills/visual-card.md`.
- If the request is a full website, app, deck, or publishing task, stop and tell the member this agent only creates visual assets.

### 3. Run the skill
- Create one proper horizontal business-card direction first.
- Ask at most two clarifying questions before the first draft unless the request has public-facing risk.
- Prefer local file generation over external services.

### 4. Save the result
- Save to `çıktılar/` as `YYYY-MM-DD_tasarim_short-description.png` or `.svg`.
- Never overwrite an existing file. If the name exists, add `-v2`, `-v3`, etc.
- After saving, show the file path and a short Turkish explanation of what was made.

## Weekly review

1. Review recent cards and note what worked.
2. Add repeated design preferences to `MEMORY.md` with evidence.
3. If the member gives recurring feedback, add the rule to `skills/visual-card.md`, not memory.

## When to stop and ask the member
- The card would reveal private or sensitive information.
- The source image is unclear, missing, or not accessible.
- The member asks for publishing, sending, deleting, or overwriting.
- A paid API or credential would be needed.
