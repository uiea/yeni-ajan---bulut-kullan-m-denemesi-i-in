# Skill: Create a CRM Note Draft

## Purpose
Convert a supplied interaction into a structured local CRM-comment draft.

## When to Use This Skill
- "Bu görüşmeyi CRM'e not haline getir."
- "Bu e-posta zincirini özetle."

## Do NOT Use This Skill For
- Sending a follow-up -> use `follow-up-drafts.md`.
- Evaluating a new inquiry -> use `lead-qualification.md`.

## Process
1. Read the supplied transcript, message, email, or meeting note.
2. State the interaction date as supplied; otherwise label it missing.
3. Summarize only factual outcomes, pain points, buying signals, risks, and agreed next actions.
4. Format a CRM-comment draft based on `.agents/hey-sales/CRM_MEMORY.md`.
5. Flag ambiguity, duplicates, and data that would need member confirmation before entering a CRM.

## Quality Bar
- The note is factual, concise, and has one concrete next action or a clear missing-data flag.
- No CRM write is attempted.

## Rules & Feedback
- Preserve uncertainty.
  Why: CRM history becomes misleading when guesses are recorded as facts.
  How to apply: use "not confirmed" rather than completing missing fields.
