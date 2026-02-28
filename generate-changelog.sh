#!/usr/bin/env bash
# Generate visual HTML changelog pages with rendered markdown diffs
set -euo pipefail
node generate-changelog.mjs "$@"
