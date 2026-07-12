---
phase: 08-release-readiness
plan: 01
subsystem: ci
tags: [ci, playwright, e2e, github-actions]
requirements-completed: [REL-01, REL-03]
completed: 2026-07-12
---

# Phase 8 Plan 01: CI Playwright Gates — Complete

- Added `playwright.ci.config.ts` serving static `out/` via `serve`
- Extended `ci.yml` with docs-only detection and e2e-smoke job (Chromium)
- Added `e2e-full.yml` for main push with chromium/firefox/webkit matrix
- Added `e2e:ci` script and `serve` devDependency

Verification: `pnpm build && pnpm exec playwright test --config playwright.ci.config.ts --project=chromium e2e/smoke.spec.ts` — pass
