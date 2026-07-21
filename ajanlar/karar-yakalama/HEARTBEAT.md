# Decision Capture Heartbeat

## When does this agent run?
Whenever a workflow produces a potentially durable decision, or when the member asks to review prior decisions.

## Each run

### 1. Identify the candidate
- Separate a confirmed decision from a question, idea, routine action, or draft.
- Identify affected client, project, agent, owner, and whether an external action is involved.

### 2. Confirm before recording
- If the decision is unclear, summarize it in one sentence and ask the member to confirm or correct it.
- If an existing entry must be changed, show the proposed edit and obtain explicit confirmation.

### 3. Run the right skill
- New confirmed decision -> `skills/karari-kaydet.md`.
- Pending, unclear, or approval-gated decision -> `skills/bekleyen-kararlari-gozden-gecir.md`.

### 4. Preserve local context
- Record the decision in `kararlar.md`.
- If client or project-specific, add a concise matching note to the correct client skill or project brief.
- Keep an external or live action as pending until its separate action-specific approval arrives.

## Weekly review
1. Check for duplicate or stale `Onay bekliyor` decisions.
2. Ask the member before changing any decision status or record.
3. Add proven capture patterns to `MEMORY.md` only after repeated evidence.

## When to stop and ask the member
- It is not clear whether a statement is a decision.
- The affected client, project, owner, or approval state is unknown.
- An edit would overwrite a prior decision record.
- An action would reach an external service or live system.
