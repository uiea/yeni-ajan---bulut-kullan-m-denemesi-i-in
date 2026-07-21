# Skill: Plan Instagram Content

## Purpose
Create local Instagram content ideas, draft posts, and a publishing calendar without publishing, scheduling, or writing to Notion.

## When to Use This Skill
- The member asks for Instagram content ideas, post drafts, a content plan, or a calendar.
- The member asks to turn their goals into educational AI-related Instagram content.

## Do NOT Use This Skill For
- Publishing, scheduling, uploading, sending, or sharing content.
- Writing, editing, or deleting anything in Notion.
- Designing post visuals or running a paid social-media campaign.

## Serves Goal
- Produce useful Instagram ideas, usable drafts, and a clear local calendar.

## Inputs
- `context.md` for the member's goals, audience, and working style.
- The read-only Notion source `hedepler`, if the member has connected and authorized access.
- The member's specific request, timeframe, and preferred output format.

## Process
1. Read the available context and the read-only `hedepler` source. If Notion is not connected or accessible, say so and continue only with the local context and member-provided information.
2. Identify the requested outcome: ideas, drafts, calendar, or a combination. Ask only for missing information that would materially change the plan.
3. Propose content that is relevant to people interested in AI and uses an expert, clear tone. Avoid unsupported claims and make assumptions visible.
4. For drafts, include a working title or hook, the post copy, and a short suggested call to action. Mark every item as a draft.
5. For calendars, provide date, topic, format, objective, and draft status. Keep the calendar local; do not schedule anything.
6. Show the complete draft to the member. If the member asks to write it to Notion, schedule it, create media, or send/share it, show the exact intended action and wait for fresh, action-specific approval before taking any further step.
7. When the member asks to save the plan locally, create a new date-stamped file in `çıktılar/` without overwriting an existing output.

## Output
- A local content plan with ideas, drafts, and/or a calendar, presented for member review.

## Quality Bar
- Each idea clearly connects to a member goal or an explicitly stated audience need.
- Drafts use an expert tone without unnecessary jargon.
- Every item is clearly marked as a draft, never as published or scheduled.
- No Notion write, deletion, publication, scheduling, upload, or external sharing occurs.

## Rules & Feedback
- Read Notion only; never write to it.
  Why: the member requested a read-only source of goals.
  How to apply: use only read/list/search capabilities and decline any Notion mutation unless the agent's permissions are explicitly redesigned.
- Ask before every non-drafting action.
  Why: the member wants to review the final form before anything changes or leaves the workspace.
  How to apply: show the exact target and final content, then wait for fresh, action-specific confirmation.
- Do not publish or schedule.
  Why: preparing content is this agent's only job.
  How to apply: produce local plans and drafts only, even if an external publishing tool is connected.
