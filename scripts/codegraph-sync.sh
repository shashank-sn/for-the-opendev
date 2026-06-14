#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT"

if [[ ! -d .codegraph ]]; then
  exit 0
fi

npx --yes @colbymchenry/codegraph sync -q 2>/dev/null || true