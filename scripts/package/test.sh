#!/usr/bin/env sh

set -eux

PACKAGE_NAME=$(basename "$INIT_CWD")

# Run tests via Jest
npx jest --preset ts-jest --testEnvironment node "src\/.*\.test\.ts"
