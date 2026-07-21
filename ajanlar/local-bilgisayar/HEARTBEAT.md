# Local Bilgisayar Heartbeat

## When does this agent run?

Whenever the member asks about local files, GitHub synchronization, or the automatic sync task.

## Each run

### 1. Read context
- Read `context.md`, `hafiza/kullanici-profili.md`, and `hafiza/aktif-durum.md`.
- Read this agent's `MEMORY.md`.

### 2. Decide what to do
- If the member asks whether files are synchronized, run `skills/check-sync-status.md`.
- If the member asks to change a task or Git settings, explain the intended change and obtain approval before applying it.

### 3. Run the skill
- Use the selected skill and collect only the status needed to answer the request.

### 4. Save the result
- Save a dated status report to `çıktılar/` without overwriting earlier reports.

## Weekly review

1. Review completed status reports.
2. Add only recurring, evidence-backed issues to `MEMORY.md`.
3. Confirm that the scheduled task cadence still matches the member's preference.

## When to stop and ask the member
- A merge conflict needs a resolution choice.
- A file must be deleted, moved, or overwritten.
- A change would push content or change an automatic synchronization task.
