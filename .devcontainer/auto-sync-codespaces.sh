#!/usr/bin/env bash
set -u

repo_root="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
branch="main"
log_file="/tmp/codespaces-git-auto-sync.log"

log() {
  printf '%s  %s\n' "$(date '+%Y-%m-%d %H:%M:%S')" "$*" >> "$log_file"
}

sync_repository() {
  cd "$repo_root" || return 1

  git add --all
  if ! git diff --cached --quiet; then
    if ! git config user.name >/dev/null || ! git config user.email >/dev/null; then
      log 'Git author identity is missing; changes were not committed.'
      return 1
    fi
    git commit -m "Codespaces auto-sync: $(date '+%Y-%m-%d %H:%M:%S')" || return 1
  fi

  git fetch origin "$branch" || return 1
  if [ "$(git rev-list --left-right --count "origin/$branch...HEAD" | awk '{print $1}')" -gt 0 ]; then
    git rebase "origin/$branch" || return 1
  fi

  git push origin "HEAD:$branch"
}

log 'Codespaces auto-sync started.'
while true; do
  if sync_repository; then
    log 'Sync completed.'
  else
    log 'Sync failed; it will retry in 10 minutes.'
  fi
  sleep 600
done
