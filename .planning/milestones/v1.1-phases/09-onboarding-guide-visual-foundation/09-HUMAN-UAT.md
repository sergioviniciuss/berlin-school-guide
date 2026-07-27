---
status: partial
phase: 09-onboarding-guide-visual-foundation
source: [09-VERIFICATION.md]
started: 2026-07-12T20:55:00+02:00
updated: 2026-07-12T20:55:00+02:00
---

## Current Test

[awaiting human testing]

## Tests

### 1. Desktop layout quality
expected: Open `/guides/german-education-system` at desktop width (≥1024px). The trunk (Kita → Grundschule) and all 5 secondary/vocational branches (Gymnasium, Realschule, Hauptschule, Gesamtschule, Ausbildung) are visible at a glance, in a readable branching layout that reads as a journey map, not a cramped or overlapping grid.
result: [pending]

### 2. Mobile equal-weight branch disclosure
expected: Open `/guides/german-education-system` at mobile width (390px) and tap "Ver as vias do ensino secundário". Trunk nodes are stacked and fully visible without interaction; the collapsible reveals all 5 tracks with equal visual weight (no track looks more prominent/default than another); tapping a node card expands a short summary smoothly.
result: [pending]

### 3. Berlin callout visual tone
expected: Visually compare the inline "Em Berlim" badge and "Berlin em destaque" summary box against the rest of the page. Berlin differences are immediately scannable as distinct from Germany-wide content, with a neutral/informative (not alarming) tone.
result: [pending]

### 4. Print rendering
expected: Print the guide (Cmd/Ctrl+P or print preview) and inspect the timeline nodes. Every timeline node's summary text is already expanded/visible on the printed page.
result: [pending]

## Summary

total: 4
passed: 0
issues: 0
pending: 4
skipped: 0
blocked: 0

## Gaps

None — automated verification passed 13/13 must-haves. Human items cover subjective visual/UX quality only.
