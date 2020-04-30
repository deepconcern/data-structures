#!/usr/bin/env sh

set -eux

# Runs TypeScript in build mode
npx tsc --build ./packages/*/tsconfig.json
