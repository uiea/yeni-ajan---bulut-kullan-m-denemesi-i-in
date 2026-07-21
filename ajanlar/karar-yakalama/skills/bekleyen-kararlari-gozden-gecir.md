# Skill: Review Pending Decisions

## Purpose
Clarify, confirm, or safely maintain decisions that are not yet ready to be applied.

## When to Use This Skill
- The member asks what has been decided or what is awaiting approval.
- A decision has an unclear scope, owner, client, project, or action state.
- A decision requests deployment, publishing, sending, deletion, or another external action.

## Do NOT Use This Skill For
- A fully confirmed local decision with complete context -> use `karari-kaydet.md`.
- Routine implementation or status updates that do not change a durable decision.

## Serves Goal
- Avoid noise.
- Keep actions safe.

## Inputs
- `kararlar.md`.
- Relevant client skills, project briefs, and the member's current confirmation.

## Process
1. Read the relevant decision rows and classify each as confirmed, pending clarification, or pending action approval.
2. Summarize only the fields that are missing or conflicting.
3. Ask the member for the smallest decision needed to resolve the ambiguity.
4. For any external or live action, show the precise destination and final content/action, then wait for an explicit action-specific confirmation.
5. Update a decision status only after confirmation, preserving the original rationale.

## Output
- A concise decision review.
- Confirmed next state or an explicit pending item.

## Quality Bar
- The member can see exactly what is undecided and what needs approval.
- No pending item is silently treated as approved.

## Rules & Feedback
- Keep pending decisions visible rather than guessing.
  Why: ambiguity is safer to resolve than to automate.
  How to apply: write `Onay bekliyor` or `Netleştirilecek` until the member responds.
