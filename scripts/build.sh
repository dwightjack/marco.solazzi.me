#! /bin/bash

if [ "$CF_PAGES_BRANCH" == "main" ]; then
  pnpm build
else
  PUBLIC_PREVIEW=true pnpm build
fi
