---
phase: 9
slug: onboarding-guide-visual-foundation
status: draft
nyquist_compliant: false
wave_0_complete: false
created: 2026-07-12
---

# Phase 9 — Validation Strategy

> Per-phase validation contract for feedback sampling during execution.

---

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | Jest 30.4.2 + React Testing Library 16.3.2 (unit); Playwright 1.61.1 + @axe-core/playwright 4.10.2 (e2e/a11y) |
| **Config file** | `jest.config.mjs` (unit), `playwright.config.ts` / `playwright.ci.config.ts` (e2e) |
| **Quick run command** | `pnpm test -- EducationTimeline` (or `BerlinCallout`, `GlossaryTerm`) |
| **Full suite command** | `pnpm test` (unit), `pnpm e2e` (Playwright, dev server required) |
| **Estimated runtime** | ~30 seconds (unit quick), ~2 minutes (full unit), ~5 minutes (e2e) |

---

## Sampling Rate

- **After every task commit:** Run `pnpm test -- <ComponentName>` for the component just built; `pnpm typecheck` and `pnpm lint`
- **After every plan wave:** Run `pnpm test` (full unit suite) plus `pnpm build` (static export — catches unregistered MDX components)
- **Before `/gsd-verify-work`:** Full unit suite green, `pnpm build` green, manual visual check at desktop + mobile viewport widths
- **Max feedback latency:** 60 seconds (unit quick run)

---

## Per-Task Verification Map

| Task ID | Plan | Wave | Requirement | Threat Ref | Secure Behavior | Test Type | Automated Command | File Exists | Status |
|---------|------|------|-------------|------------|-----------------|-----------|-------------------|-------------|--------|
| 09-01-01 | 01 | 1 | VIS-01 | — | N/A — static presentational | unit | `pnpm test -- EducationTimeline` | ❌ W0 | ⬜ pending |
| 09-01-02 | 01 | 1 | VIS-01 | — | N/A | unit | `pnpm test -- EducationTimeline` | ❌ W0 | ⬜ pending |
| 09-01-03 | 01 | 1 | VIS-02 | — | N/A | unit | `pnpm test -- EducationTimeline` | ❌ W0 | ⬜ pending |
| 09-02-01 | 02 | 2 | VIS-03 | — | N/A | unit | `pnpm test -- BerlinCallout` | ❌ W0 | ⬜ pending |
| 09-02-02 | 02 | 2 | D-12 | — | N/A | unit | `pnpm test -- GlossaryTerm` | ❌ W0 | ⬜ pending |
| 09-03-01 | 03 | 3 | D-11 | — | N/A | build | `pnpm build` | ✅ | ⬜ pending |
| 09-03-02 | 03 | 3 | VIS-01 | — | N/A | e2e | extend `e2e/smoke.spec.ts` overflow check | ❌ W0 | ⬜ pending |

*Status: ⬜ pending · ✅ green · ❌ red · ⚠️ flaky*

---

## Wave 0 Requirements

- [ ] `src/features/guides/EducationTimeline/index.test.tsx` — stubs for VIS-01/VIS-02
- [ ] `src/features/guides/EducationTimeline/fixtures.ts` — placeholder stage/branch fixture data
- [ ] `src/features/guides/BerlinCallout/index.test.tsx` — stubs for VIS-03
- [ ] `src/features/guides/GlossaryTerm/index.test.tsx` — stubs for D-12
- [ ] `pnpm add @radix-ui/react-collapsible` — required before expand/collapse implementation

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| Route renders GuideIntro + live component demos | D-11 | `src/app/**/page.tsx` excluded from Jest coverage | `pnpm dev`, open `/guides/german-education-system`, confirm GuideIntro + timeline + callouts visible |
| Desktop branching infographic layout | VIS-01/VIS-02 | Visual layout complexity | Desktop viewport ≥1024px: confirm left-to-right flow with branches at secondary transition |
| Mobile no horizontal overflow | VIS-01 | Visual regression | Mobile viewport 390px: confirm no horizontal scroll on route |

---

## Validation Sign-Off

- [ ] All tasks have `<automated>` verify or Wave 0 dependencies
- [ ] Sampling continuity: no 3 consecutive tasks without automated verify
- [ ] Wave 0 covers all MISSING references
- [ ] No watch-mode flags
- [ ] Feedback latency < 60s
- [ ] `nyquist_compliant: true` set in frontmatter

**Approval:** pending
