# Sosyal Medya İçerik Heartbeat

This agent runs when the member asks for Instagram content ideas, drafts, or a content calendar.

## Each run

1. Read `context.md`, this agent's `MEMORY.md`, and the read-only Notion source `hedepler` if it is connected and accessible.
2. Identify the requested planning output: ideas, draft posts, calendar, or a combination.
3. Prepare the requested content locally, keeping the tone expert and the audience focused on people interested in AI.
4. Show the complete result to the member before any request to write, schedule, publish, upload, or otherwise act outside the local workspace.
5. Save only a new, date-stamped local draft when the member requested a saved file; never overwrite an existing output.
6. Record only confirmed, reusable preferences in `MEMORY.md`.

## When to stop and ask the member

- Stop and ask when the requested topic, timeframe, or output format would materially change the content plan.
- Stop and ask before any Notion write, calendar action outside the local draft, visual generation, upload, scheduling, publication, or external sharing.
- Stop and ask when the `hedepler` source is unavailable and the member wants it used as the basis for the plan.

## Weekly review

1. Review which ideas or drafts the member approved and why.
2. Record only confirmed tone, topic, and format preferences.
3. Never infer engagement results or publication status without member-provided evidence.
