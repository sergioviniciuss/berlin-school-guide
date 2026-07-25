---
phase: 11
slug: flagship-discovery-release
status: draft
nyquist_compliant: false
wave_0_complete: false
created: 2026-07-25
---

# Phase 11 — Validation Strategy

> Per-phase validation contract for feedback sampling during execution.

---

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | Jest 30.x (unit/component) + Playwright 1.x (e2e) |
| **Config file** | `jest.config.*` (root); `playwright.config.ts` / `playwright.ci.config.ts` |
| **Quick run command** | `pnpm test -- --testPathPattern="HomeJourneyCards|GuidesHub|GuideIntro|guides/page|berlin-school-system|first-steps|app/page"` |
| **Full suite command** | `pnpm test && pnpm e2e:ci` |
| **Estimated runtime** | ~30–120s unit; e2e longer in CI |

---

## Sampling Rate

- **After every task commit:** Run the specific unit test file(s) touched
- **After every plan wave:** `pnpm test` (full Jest suite)
- **Before `/gsd-verify-work`:** `pnpm test && pnpm e2e:ci` must be green
- **Max feedback latency:** ~60s for unit; e2e as configured in CI

---

## Per-Task Verification Map

| Task ID | Plan | Wave | Requirement | Threat Ref | Secure Behavior | Test Type | Automated Command | File Exists | Status |
|---------|------|------|-------------|------------|-----------------|-----------|-------------------|-------------|--------|
| TBD | 00 | 0 | REL-01 | — | N/A | e2e | `pnpm e2e -- e2e/metadata.spec.ts` | ⚠️ W0 gap | ⬜ pending |
| TBD | 00 | 0 | REL-02 | — | N/A | e2e | `pnpm e2e -- e2e/a11y.spec.ts` | ⚠️ W0 gap | ⬜ pending |
| TBD | 00 | 0 | REL-03 | — | N/A | e2e | `pnpm e2e -- e2e/smoke.spec.ts` | ⚠️ W0 gap | ⬜ pending |
| TBD | 01+ | 1+ | DISC-01–04, ONBD-06 | T-11 XSS (mitigated via ReactNode) | No dangerouslySetInnerHTML | unit + e2e | See RESEARCH Validation Architecture | ✅ / extend | ⬜ pending |

*Planner fills concrete Task IDs when PLAN.md files are written. Status: ⬜ pending · ✅ green · ❌ red · ⚠️ flaky*

---

## Wave 0 Requirements

- [ ] `e2e/metadata.spec.ts` — add `/guides/german-education-system` to `CORE_ROUTES` (REL-01)
- [ ] `e2e/a11y.spec.ts` — add `/guides/german-education-system` to `CORE_A11Y_ROUTES` (REL-02)
- [ ] `e2e/smoke.spec.ts` — add homepage → onboarding journey; rewrite/remove obsolete homepage → `/guides` card test (REL-03)

*No new test framework or config — Jest and Playwright already configured.*

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| Editorial tone of complementary intros / Próximos passos copy | ONBD-06, DISC-04 | Tone/honesty judgment per EDITORIAL_GUIDE | Read both guide intros + closing section; confirm complementary (not duplicate) framing and linear next steps |
| Homepage visual hierarchy (Start here stronger vs schools secondary) | DISC-01 | Visual weight is hard to assert fully in unit tests | Spot-check homepage: primary accent on Start here; schools secondary but visible |

---

## Validation Sign-Off

- [ ] All tasks have `<automated>` verify or Wave 0 dependencies
- [ ] Sampling continuity: no 3 consecutive tasks without automated verify
- [ ] Wave 0 covers all MISSING references
- [ ] No watch-mode flags
- [ ] Feedback latency acceptable
- [ ] `nyquist_compliant: true` set in frontmatter after plans land

**Approval:** pending
