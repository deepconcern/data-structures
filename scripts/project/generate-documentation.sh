#!/usr/bin/env sh

set -eux

# Generates documentation via TypeDoc
npx typedoc --options typedoc.json
