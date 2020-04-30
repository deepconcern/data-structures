#!/usr/bin/env sh

set -eux

# Remove node_modules
rm -rf ./node_modules/
rm -rf ./packages/*/node_modules/

# Remove transpiled JavaScript
rm -rf ./packages/*/dist/

# Remove build files
rm -rf ./packages/*/*.tsbuildinfo