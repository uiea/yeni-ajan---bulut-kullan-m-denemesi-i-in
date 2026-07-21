# Skill: Automate GitHub sync

## Purpose
Set up automatic repository synchronization for this workspace so that:
- the local repo pulls the latest remote changes when VS Code opens the workspace
- the repo pushes local work to GitHub every 10 minutes

## When to Use This Skill
- The member wants their repository to stay current without manual Git commands.
- The workspace already has PowerShell sync scripts and VS Code tasks.

## Do NOT Use This Skill For
- Changing the repository branch strategy.
- Pushing to GitHub without the member's explicit approval.

## Serves Goal
- Keep the workspace synchronized automatically and reduce manual Git overhead.

## Inputs
- The repository root containing `.git`.
- The remote branch name, typically `main`.
- The existing automation scripts at `pull-github.ps1`, `sync-github.ps1`, and `auto-sync-loop.ps1`.
- The VS Code task configuration in `.vscode/tasks.json`.

## Process
1. **Confirm the repo root and branch.** Verify the workspace folder and the target branch.
2. **Verify the scripts.** Ensure the pull, sync, and loop PowerShell scripts exist and are correct.
3. **Verify the VS Code tasks.** Ensure there is a task to pull on folder open and a background task to run the loop every 600 seconds.
4. **Start the loop.** Run the background task once so the loop begins.
5. **Check logs.** Review `.git/auto-pull.log`, `.git/auto-sync.log`, and `.git/auto-sync-loop.log` if needed.

## Output
- A workspace that pulls on open and syncs to GitHub on a 10-minute cadence.
- A documented automation setup that can be reused for later repos.

## Quality Bar
- The pull task exists in `.vscode/tasks.json`.
- The background sync loop exists and uses a 600-second interval.
- The automation logs are created and readable.

## Rules & Feedback
- Do not overwrite an existing task definition without checking it first.
- Keep the loop interval at 600 seconds unless the member explicitly asks for a different cadence.
- If the member wants the automation to push to a remote repository, confirm that first and keep the setup transparent.
- Keep the member informed before changing any Git or remote behavior.
