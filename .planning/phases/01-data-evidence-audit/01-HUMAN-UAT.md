---
status: resolved
phase: 01-data-evidence-audit
source: [01-VERIFICATION.md]
started: 2026-07-11T12:00:00Z
updated: 2026-07-11T13:40:00Z
---

## Current Test

all tests passed — approved 2026-07-11

## Tests

### 1. SchoolCard trust UX
expected: Open /schools and inspect cards for Bernhard-Grzimek, Lew-Tolstoi, and Richard-Wagner. Each card shows Perfil básico badge, Pesquisa básica tier in coverage box, and level-aware disclaimer. Richard-Wagner shows verified Inspeção oficial; Bernhard-Grzimek omits Willkommensklasse (missing).
result: passed

### 2. Homepage honest messaging
expected: Open / and confirm Berlin School Guide eyebrow (not M2), primary button links to /schools with Ver escolas em Lichtenberg, no synthetic or M2 scaffolding copy visible.
result: passed

### 3. Inferred field honesty on cards
expected: Bernhard-Grzimek card shows Ganztag as verified but does not present afterSchoolCare as verified; inferred afterSchoolCare is omitted from the card (not falsely verified). Compare with Lew-Tolstoi which has independently verified afterSchoolCare.
result: passed

## Summary

total: 3
passed: 3
issues: 0
pending: 0
skipped: 0
blocked: 0

## Gaps
