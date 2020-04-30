#!/usr/bin/env sh

set -eux

# Runs TypeScript in build mode (watching for file updates)
npx tsc --build ./packages/*/tsconfig.json --watch
