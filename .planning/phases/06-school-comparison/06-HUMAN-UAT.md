---
status: complete
phase: 06-school-comparison
source: [06-VERIFICATION.md]
started: 2026-07-11T22:15:00Z
updated: 2026-07-11T22:55:00Z
---

## Current Test

[testing complete]

## Tests

### 1. Mobile compare layout and diff toggle
expected: Open /compare?schools=lew-tolstoi-schule,adam-ries-schule at 390×844 viewport. Criteria-first stacked mobile layout visible (Comparação móvel de critérios); no horizontal page overflow; diff toggle filters criteria.
result: pass

### 2. Max-3 selection gating
expected: Select 3 schools from /schools via toggle buttons, then try adding a fourth. Fourth toggle disabled with Máximo de 3 escolas; CompareBar shows 3 selected; Comparar escolas enabled.
result: pass

### 3. Profile ↔ directory selection sync
expected: Add school from profile header, return to directory — selection persists. Same school shows Na comparação on directory card via sessionStorage sync.
result: pass
note: Initial failure — sessionStorage race on /schools mount; fixed in SchoolDirectory before retest

### 4. Compare page trust framing
expected: Cold-load /compare?schools=lew-tolstoi-schule,adam-ries-schule in fresh session. Both schools in comparison; limitations block visible; no ranking language; methodology link works.
result: pass

## Summary

total: 4
passed: 4
pending: 0
failed: 0
issues: 1
issues_resolved: 1

## Gaps

```yaml
- truth: "Profile compare selection persists when returning to directory via sessionStorage sync"
  status: resolved
  reason: "On /schools mount, writeStoredCompareSlugs([]) ran before readStoredCompareSlugs() could restore profile selections"
  severity: major
  test: 3
  fix: "src/features/schools/SchoolDirectory/index.tsx — defer URL→storage sync until restore attempt completes"
  resolved: 2026-07-11
```
