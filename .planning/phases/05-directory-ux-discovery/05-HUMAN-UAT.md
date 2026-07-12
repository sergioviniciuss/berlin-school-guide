---
status: resolved
phase: 05-directory-ux-discovery
source: [05-VERIFICATION.md]
started: 2026-07-11T20:25:00Z
updated: 2026-07-11T20:35:00Z
---

## Current Test

all tests passed — approved 2026-07-11

## Tests

### 1. Mobile directory Sheet UX
expected: Open /schools at 375×812 viewport; tap Filtros, toggle checkboxes, apply, and scroll results. Right-side Sheet opens without horizontal page scroll; sticky Filtros and footer buttons are easy to tap (≥44px); filter apply updates URL and results.
result: passed (note: no slide animation on open — missing `tailwindcss-animate` plugin; fixed post-UAT)

### 2. Search responsiveness feel
expected: Type quickly in Buscar escola pelo nome on mobile and desktop. Input updates immediately; count row shows subtle · Atualizando… during debounce; settled count announced via aria-live without perceptible lag on 10 schools.
result: passed

### 3. E2E shared URL restore
expected: Cold-load /schools?q=Lew-Tolstoi&sort=coverage in a fresh browser session (or run `pnpm e2e -- e2e/smoke.spec.ts` with no conflicting dev server). 1 de 10 escolas encontradas, Lew-Tolstoi-Schule card visible, sort select shows Cobertura da pesquisa.
result: passed

## Summary

total: 3
passed: 3
issues: 0
pending: 0
skipped: 0
blocked: 0

## Gaps

- Sheet slide animation absent until `tailwindcss-animate` added to Tailwind config (fixed in same session)
