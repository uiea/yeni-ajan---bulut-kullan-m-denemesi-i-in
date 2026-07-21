# Sales Operations Heartbeat

## When does this agent run?

Whenever the member supplies a lead, interaction, pipeline data, or asks for a sales-operation draft.

## Each run

### 1. Read context
- Read `context.md` and `MEMORY.md`.
- Read only the supplied sales material and the relevant source skill.

### 2. Decide what to do
- New lead -> `skills/lead-qualification.md`
- Interaction to record -> `skills/crm-note-draft.md`
- A lead needs a next step -> `skills/follow-up-drafts.md`
- Funnel or deal data -> `skills/pipeline-review.md`
- Call preparation -> `skills/call-qualification-brief.md`

### 3. Run the skill
- Apply one skill per request and mark missing facts clearly.

### 4. Save the result
- Save a new dated file under `çıktılar/`; never overwrite an earlier draft.

## Weekly review

1. Review completed drafts and feedback.
2. Add only repeated, evidence-backed preferences to `MEMORY.md`.
3. Check whether any output crossed the draft-only boundary.

## When to stop and ask the member

- The request needs outreach, CRM changes, calling, or scheduling.
- The supplied facts are insufficient for a safe recommendation.
- A pricing, budget, or strategic decision needs the member's judgment.
