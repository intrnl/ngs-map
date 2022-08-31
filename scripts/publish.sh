#!/usr/bin/env bash

if [[ -n $(git status --porcelain) ]]; then
	echo 'Working directory is not clean'
	git status --short
	exit 1
fi

COMMIT_HASH=$(git rev-parse HEAD)
pnpm exec netlifydd deploy -m "${COMMIT_HASH}" dist/
