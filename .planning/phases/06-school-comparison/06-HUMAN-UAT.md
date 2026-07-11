---
status: partial
phase: 06-school-comparison
source: [06-VERIFICATION.md]
started: 2026-07-11T22:15:00Z
updated: 2026-07-11T22:15:00Z
---

## Current Test

awaiting human testing

## Tests

### 1. Mobile compare layout and diff toggle
expected: Open /compare?schools=lew-tolstoi-schule,adam-ries-schule at 390×844 viewport. Criteria-first stacked mobile layout visible (Comparação móvel de critérios); no horizontal page overflow; diff toggle filters criteria.
result: pending

### 2. Max-3 selection gating
expected: Select 3 schools from /schools via toggle buttons, then try adding a fourth. Fourth toggle disabled with Máximo de 3 escolas; CompareBar shows 3 selected; Comparar escolas enabled.
result: pending

### 3. Profile ↔ directory selection sync
expected: Add school from profile header, return to directory — selection persists. Same school shows Na comparação on directory card via sessionStorage sync.
result: pending

### 4. Compare page trust framing
expected: Cold-load /compare?schools=lew-tolstoi-schule,adam-ries-schule in fresh session. Both schools in comparison; limitations block visible; no ranking language; methodology link works.
result: pending

## Summary

total: 4
passed: 0
pending: 4
failed: 0

Run `/gsd-verify-work 6` to walk through these tests interactively.
