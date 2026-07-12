---
phase: 03
slug: homepage-navigation-core-journey
status: draft
nyquist_compliant: false
wave_0_complete: false
created: 2026-07-11
---

# Phase 03 — Validation Strategy

> Per-phase validation contract for feedback sampling during execution.

---

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | Jest 30.4.2 + @testing-library/react 16.3.2 |
| **Config file** | `jest.config.mjs`, setup `jest.setup.ts` |
| **Quick run command** | `pnpm test -- --testPathPattern="navigation|HomeJourney" --no-coverage` |
| **Full suite command** | `pnpm test && pnpm typecheck` |
| **E2E command** | `pnpm e2e` (Playwright 1.61.1) |
| **Estimated runtime** | ~20 seconds (unit), ~30s (e2e) |

---

## Sampling Rate

- **After every task commit:** `pnpm test -- --testPathPattern="SiteHeader|HomeJourney|SiteFooter" --no-coverage`
- **After every plan wave:** `pnpm test && pnpm typecheck`
- **Before `/gsd-verify-work`:** `pnpm test && pnpm e2e` green
- **Max feedback latency:** 30 seconds

---

## Per-Task Verification Map

| Task ID | Plan | Wave | Requirement | Threat Ref | Secure Behavior | Test Type | Automated Command | File Exists | Status |
|---------|------|------|-------------|------------|-----------------|-----------|-------------------|-------------|--------|
| 03-01-01 | 01 | 1 | NAV-02 | T-03-01 / — | Sheet installs; header renders 3 nav links | unit | `pnpm test -- src/features/navigation/SiteHeader/index.test.tsx` | ❌ W0 | ⬜ pending |
| 03-01-02 | 01 | 1 | NAV-02 | — | Footer copyright + methodology link | unit | `pnpm test -- src/features/navigation/SiteFooter/index.test.tsx` | ❌ W0 | ⬜ pending |
| 03-01-03 | 01 | 1 | NAV-02 | — | Layout wraps all pages with header/footer | unit | `pnpm test -- src/app/layout.test.tsx` (optional) or build | ❌ W0 | ⬜ pending |
| 03-02-01 | 02 | 1 | NAV-01 | — | Homepage journey cards link to /schools and /methodology | unit | `pnpm test -- src/features/home/HomeJourneyCards/index.test.tsx` | ❌ W0 | ⬜ pending |
| 03-02-02 | 02 | 1 | NAV-01 | — | Hero h1 parent-facing; scope note present | unit | `pnpm test -- src/app/page.test.tsx` | ❌ W0 | ⬜ pending |
| 03-03-01 | 03 | 2 | NAV-03, D-13 | — | m2-smoke removed; build excludes route | build | `pnpm build` | ✅ | ⬜ pending |
| 03-03-02 | 03 | 2 | NAV-03 | — | Home → /schools via in-page navigation | e2e | `pnpm e2e -- e2e/smoke.spec.ts` | ✅ | ⬜ pending |
| 03-03-03 | 03 | 2 | D-15 | — | Directory methodology link preserved | unit | `pnpm test -- src/features/schools/SchoolDirectory/index.test.tsx` | ✅ | ⬜ pending |

*Status: ⬜ pending · ✅ green · ❌ red · ⚠️ flaky*

---

## Wave 0 Requirements

- [ ] `src/components/ui/Sheet/` — install via `pnpm dlx shadcn@latest add sheet`
- [ ] `src/features/navigation/SiteHeader/index.test.tsx` — active links, mobile menu, aria labels
- [ ] `src/features/navigation/SiteFooter/index.test.tsx` — copyright + methodology link
- [ ] `src/features/home/HomeJourneyCards/index.test.tsx` — CTAs to `/schools` and `/methodology`
- [ ] Rewrite `e2e/smoke.spec.ts` first test — home → schools journey
- [ ] Delete `src/app/guides/m2-smoke/` and `src/content/guides/m2-smoke.mdx`

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| Mobile hamburger visual prominence | NAV-02 | Sheet animation/layout | Open site on narrow viewport; confirm menu opens and links work |
| Homepage visual hierarchy | NAV-01 | Card dominance subjective | Primary card visually dominant over secondary on desktop and mobile |

---

## Validation Sign-Off

- [ ] All tasks have `<automated>` verify or Wave 0 dependencies
- [ ] Sampling continuity: no 3 consecutive tasks without automated verify
- [ ] Wave 0 covers all MISSING references
- [ ] No watch-mode flags
- [ ] Feedback latency < 30s
- [ ] `nyquist_compliant: true` set in frontmatter

**Approval:** pending
