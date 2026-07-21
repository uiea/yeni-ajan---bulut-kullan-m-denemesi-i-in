# Skill: Check Synchronization Status

## When to Use This Skill

Use when the member asks whether local files and GitHub are synchronized, or whether the automatic sync task is running correctly.

## Do NOT Use This Skill For

- Changing the scheduled task interval or its command.
- Resolving merge conflicts or editing project files.
- Pushing a new change to GitHub.

## Process

1. Read the current Git branch status and compare it with `origin/main`.
2. Read the latest commits locally and on the tracked remote branch.
3. Read the `GitHub Auto Sync - ajanlarim` task's last result and next run time.
4. Read the latest relevant lines from `.git/auto-sync.log` without exposing secrets.
5. State whether synchronization is current, pending, or failed, with the evidence.
6. Save a dated Turkish status report in `çıktılar/`.

## Quality Bar

- The result names the local branch state and the scheduled task result.
- It distinguishes a clean repository from a successfully completed task.
- It never claims a push occurred without Git evidence.

## Rules & Feedback

- Do not make corrective changes while checking status.
  Why: checking must not unexpectedly alter the member's files or GitHub history.
  How to apply: report the problem and request approval for any fix.
- Never expose secrets from configuration files or logs.
  Why: synchronization diagnostics can contain sensitive details.
  How to apply: report only status codes and safe summaries.
