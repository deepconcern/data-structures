#!/usr/bin/env sh

set -eux

# Remove transpiled TypeScript
rm -rf ./packages/*/dist

# Remove TypeScript build info files
rm -rf ./packages/*/*.tsbuildinfo
