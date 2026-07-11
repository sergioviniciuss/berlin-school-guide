---
status: partial
phase: 05-directory-ux-discovery
source: [05-VERIFICATION.md]
started: 2026-07-11T20:25:00Z
updated: 2026-07-11T20:25:00Z
---

## Current Test

awaiting human testing

## Tests

### 1. Mobile directory Sheet UX
expected: Open /schools at 375×812 viewport; tap Filtros, toggle checkboxes, apply, and scroll results. Right-side Sheet opens without horizontal page scroll; sticky Filtros and footer buttons are easy to tap (≥44px); filter apply updates URL and results.
result: [pending]

### 2. Search responsiveness feel
expected: Type quickly in Buscar escola pelo nome on mobile and desktop. Input updates immediately; count row shows subtle · Atualizando… during debounce; settled count announced via aria-live without perceptible lag on 10 schools.
result: [pending]

### 3. E2E shared URL restore
expected: Cold-load /schools?q=Lew-Tolstoi&sort=coverage in a fresh browser session (or run `pnpm e2e -- e2e/smoke.spec.ts` with no conflicting dev server). 1 de 10 escolas encontradas, Lew-Tolstoi-Schule card visible, sort select shows Cobertura da pesquisa.
result: [pending]

## Summary

total: 3
passed: 0
issues: 0
pending: 3
skipped: 0
blocked: 0

## Gaps
