---
phase: 10
slug: education-pathway-editorial
status: draft
nyquist_compliant: false
wave_0_complete: false
created: 2026-07-24
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
| 10-00-01 | 00 | 0 | ONBD-05 | — | N/A | unit | `pnpm test -- GlossaryTerm` | ⚠️ extend | ⬜ pending |
| 10-00-02 | 00 | 0 | anchors | — | N/A | unit/grep | constants `anchorHref` vs H2 slugs | ❌ W0 | ⬜ pending |
| TBD | 01+ | 1+ | ONBD-01 | — | N/A | manual + e2e | Manual headings; optional Playwright | ❌ optional | ⬜ pending |
| TBD | 01+ | 1+ | ONBD-02 | — | N/A | content review | Three “O que verificar” moments (D-06) | ❌ content | ⬜ pending |
| TBD | 01+ | 1+ | ONBD-03 | — | N/A | grep/manual | Grep MDX for Ausbildung, Duales Studium, Fachabitur | ❌ content | ⬜ pending |
| TBD | 01+ | 1+ | ONBD-04 | — | N/A | unit + manual | `pnpm test -- BerlinCallout`; ≤1 summary callout | ✅ component | ⬜ pending |
| TBD | 01+ | 1+ | ONBD-05 | — | N/A | unit | `pnpm test -- GlossaryTerm` | ⚠️ extend | ⬜ pending |
| TBD | 01+ | 1+ | regression | — | N/A | e2e | `pnpm exec playwright test e2e/onboarding.spec.ts` | ✅ | ⬜ pending |

*Status: ⬜ pending · ✅ green · ❌ red · ⚠️ flaky*

*Planner fills exact Task IDs when PLAN.md files are written.*

---

## Wave 0 Requirements

- [ ] Extend `src/features/guides/GlossaryTerm/index.test.tsx` — assert `id` equals `slugifyHeading(term)` (ONBD-05 / D-14)
- [ ] Optional: unit test or acceptance grep that `EducationTimeline/constants.ts` `anchorHref` values match locked H2 slugs and contain no `Fase 10` / placeholder hash
- [ ] Optional (not required): Playwright assertions for key H2s / Glossário — content e2e beyond shell remains Phase 11 REL-*

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

- [ ] All tasks have `<automated>` verify or Wave 0 dependencies
- [ ] Sampling continuity: no 3 consecutive tasks without automated verify
- [ ] Wave 0 covers all MISSING references
- [ ] No watch-mode flags
- [ ] Feedback latency < 120s
- [ ] `nyquist_compliant: true` set in frontmatter

**Approval:** pending
