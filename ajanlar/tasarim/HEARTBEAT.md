# Tasarim Heartbeat

The heartbeat is the agent's operating loop. Keep each run narrow: one card, one message, one saved output.

## When does this agent run?

Run when the member asks for a business card, personal card, introduction card, visual identity card, educational Instagram post, or asks how to turn a photo/context into a shareable visual.

## Each run

### 1. Read context
- Read `context.md` before making design choices.
- Read `MEMORY.md` for proven preferences.
- If a source image path is provided, inspect it before using it.

### 2. Decide what to do
- If the member wants a business card (photo-based or code-native), run `skills/visual-card.md`.
- If the member wants an educational social-media visual, run `skills/educational-social-post.md`.
- If the request is a full website, app, deck, or publishing task, stop and tell the member this agent only creates visual assets.

### 3. Run the skill
- Create one visual direction first.
- Before creating a social post, ask for the output format and concept direction if either is missing. Use Instagram portrait (1080x1350) and educational content only when the member has selected them.
- Use `gpt-image-2` for a requested social post only when safe credentials are configured. Prefer local generation for business cards.

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
- A requested `gpt-image-2` call needs credentials that are not safely configured.
