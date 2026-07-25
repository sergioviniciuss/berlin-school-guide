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
| 11-00-T1 | 00 | 0 | REL-01, REL-02 | T-11-00-* | N/A | e2e arrays | `rg german-education-system e2e/metadata.spec.ts e2e/a11y.spec.ts` | ✅ | ⬜ pending |
| 11-00-T2 | 00 | 0 | REL-03 | T-11-00-* | N/A | e2e smoke | `rg "Começar pelo guia do sistema" e2e/smoke.spec.ts` | ✅ | ⬜ pending |
| 11-01-T1 | 01 | 1 | DISC-01 | T-11-01-* | Hardcoded hrefs | unit | `pnpm test -- --testPathPattern="HomeJourneyCards\|app/page.test"` | ✅ | ⬜ pending |
| 11-01-T2 | 01 | 1 | DISC-01 | T-11-01-01 | No query-derived hrefs | unit | same | ✅ | ⬜ pending |
| 11-02-T1 | 02 | 1 | DISC-02 | T-11-02-* | Hardcoded hrefs | unit | `pnpm test -- --testPathPattern="GuidesHub\|guides/page.test"` | ✅ | ⬜ pending |
| 11-02-T2 | 02 | 1 | DISC-02 | T-11-02-01 | Distinct CTA labels | unit | same | ✅ | ⬜ pending |
| 11-03-T1 | 03 | 2 | DISC-03, DISC-04 | T-11-03-01 | No dangerouslySetInnerHTML | unit | `pnpm test -- --testPathPattern="GuideIntro"` | ✅ | ⬜ pending |
| 11-03-T2 | 03 | 2 | DISC-03, DISC-04, REL-01 | T-11-03-* | JSX Link only | unit | `pnpm test -- --testPathPattern="berlin-school-system/page.test"` | ✅ | ⬜ pending |
| 11-04-T1 | 04 | 2 | ONBD-06, DISC-03 | T-11-04-01 | Static MDX paths | e2e + rg | `rg "## Próximos passos" src/content/guides/german-education-system.mdx` | ✅ | ⬜ pending |
| 11-04-T2 | 04 | 2 | DISC-03 | T-11-04-* | Soft tip, no callout | rg | `rg "Novo em Berlim" src/content/guides/first-steps.mdx` | ✅ | ⬜ pending |
| 11-05-T1 | 05 | 3 | REL-01–03 + all | T-11-05-02 | Full green gate | unit+e2e | `pnpm test && pnpm e2e:ci` | ✅ | ⬜ pending |
| 11-05-T2 | 05 | 3 | DISC/ONBD manual | — | N/A | manual | Human checkpoint | N/A | ⬜ pending |

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
