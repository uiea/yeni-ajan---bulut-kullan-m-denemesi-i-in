#!/usr/bin/env bash
set -u

if [ "${CODESPACES:-}" != "true" ]; then
  exit 0
fi

if pgrep -f '[a]uto-sync-codespaces.sh' >/dev/null 2>&1; then
  exit 0
fi

repo_root="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
nohup bash "$repo_root/.devcontainer/auto-sync-codespaces.sh" >/dev/null 2>&1 &
