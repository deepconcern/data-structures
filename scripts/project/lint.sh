#!/usr/bin/env sh

set -eux

# Lint using ESLint
eslint . --ext .js,.jsx,.ts,.tsx
