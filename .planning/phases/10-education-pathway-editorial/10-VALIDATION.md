---
phase: 10
slug: education-pathway-editorial
status: ready
nyquist_compliant: true
wave_0_complete: false
created: 2026-07-24
updated: 2026-07-24
---

# Phase 10 — Validation Strategy

> Per-phase validation contract for feedback sampling during execution.

---

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | Jest 30.4.2 + Testing Library; Playwright 1.61.1 |
| **Config file** | `jest.config.mjs` / Playwright configs (existing) |
| **Quick run command** | `pnpm test -- GlossaryTerm EducationTimeline` |
| **Full suite command** | `pnpm test && pnpm exec playwright test e2e/onboarding.spec.ts` |
| **Estimated runtime** | ~60–120 seconds |

---

## Sampling Rate

- **After every task commit:** Run `pnpm test -- GlossaryTerm EducationTimeline`
- **After every plan wave:** Run `pnpm test && pnpm exec playwright test e2e/onboarding.spec.ts`
- **Before `/gsd-verify-work`:** Full suite must be green
- **Max feedback latency:** 120 seconds

---

## Per-Task Verification Map

| Task ID | Plan | Wave | Requirement | Threat Ref | Secure Behavior | Test Type | Automated Command | File Exists | Status |
|---------|------|------|-------------|------------|-----------------|-----------|-------------------|-------------|--------|
| 10-00-01 | 00 | 0 | ONBD-05 | T-10-00-01 | N/A | unit | `pnpm test -- GlossaryTerm` (expect RED) | ⚠️ extend | ⬜ pending |
| 10-00-02 | 00 | 0 | anchors | T-10-00-01 | N/A | unit | `pnpm test -- EducationTimeline/constants` (expect RED) | ❌ W0 create | ⬜ pending |
| 10-01-01 | 01 | 1 | ONBD-05 | T-10-01-01 | slugifyHeading id only | unit | `pnpm test -- GlossaryTerm` | ✅ after 01 | ⬜ pending |
| 10-01-02 | 01 | 1 | ONBD-01 | T-10-01-02 | relative `#` hashes only | unit | `pnpm test -- EducationTimeline/constants` | ✅ after 01 | ⬜ pending |
| 10-02-01 | 02 | 2 | ONBD-01 | T-10-02-01 | relative links only | grep + unit | H2 presence; `pnpm test -- EducationTimeline GlossaryTerm` | ✅ MDX | ⬜ pending |
| 10-02-02 | 02 | 2 | ONBD-02 / ONBD-04 | T-10-02-02 | no year-locked calendars | grep | exactly 1 verify; Förderprognose; no Probejahr | ✅ MDX | ⬜ pending |
| 10-03-01 | 03 | 3 | ONBD-03 / ONBD-04 | T-10-03-01 | one summary callout | grep | peer H3s; 2 verifies; 1 BerlinCallout summary | ✅ MDX | ⬜ pending |
| 10-03-02 | 03 | 3 | ONBD-01–05 | T-10-03-02 | https externals if any | grep + unit + e2e | 3 verifies; GlossaryTerm set; `pnpm test` + `e2e/onboarding.spec.ts` | ✅ | ⬜ pending |
| 10-03-03 | 03 | 3 | ONBD-01–05 | — | N/A | manual | Human content checklist | manual | ⬜ pending |

*Status: ⬜ pending · ✅ green · ❌ red · ⚠️ flaky*

---

## Wave 0 Requirements

- [ ] Extend `src/features/guides/GlossaryTerm/index.test.tsx` — assert `id` equals `slugifyHeading(term)` (ONBD-05 / D-14) — Plan 00 Task 1
- [ ] Create `src/features/guides/EducationTimeline/constants.test.ts` — locked H2 `anchorHref` map; ban `Fase 10` / placeholder hash — Plan 00 Task 2
- [ ] Optional (not required): Playwright assertions for key H2s / Glossário — deferred to Phase 11 REL-*

*Framework install: none — existing infrastructure covers phase requirements.*

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| Journey H2s present after timeline | ONBD-01 | Editorial structure | Open `/guides/german-education-system`; confirm chapter H2 order from D-01 |
| Three “O que verificar” at action moments only | ONBD-02 / D-06 | Content judgment | Count exactly three full verify blocks at post-Grundschule, path choice, qualification routes |
| Non-Gymnasium routes without Gymnasium-only framing | ONBD-03 | Editorial tone | Confirm Ausbildung / Duales Studium / Fachabitur paths explained |
| Berlin woven inline; ≤1 summary callout | ONBD-04 / D-09–D-10 | Content placement | Confirm no final Berlin-vs-Germany chapter; one “Berlin em destaque” max |
| Editorial tone practical, no ranking | success criteria | Style review | Spot-check against `docs/EDITORIAL_GUIDE.md` |

---

## Validation Sign-Off

- [x] All tasks have `<automated>` verify or Wave 0 dependencies
- [x] Sampling continuity: no 3 consecutive tasks without automated verify
- [x] Wave 0 covers all MISSING references
- [x] No watch-mode flags
- [x] Feedback latency < 120s
- [x] `nyquist_compliant: true` set in frontmatter

**Approval:** ready for execute-phase
