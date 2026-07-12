---
phase: 4
slug: school-detail-profiles
status: draft
nyquist_compliant: false
wave_0_complete: false
created: 2026-07-11
---

# Phase 4 — Validation Strategy

> Per-phase validation contract for feedback sampling during execution.

---

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | Jest 30.4.2 + jest-environment-jsdom 30.4.1 |
| **Config file** | `jest.config.mjs` (via `next/jest`) |
| **Quick run command** | `pnpm test -- --testPathPattern="getSchoolBySlug\|ProfileFieldRow\|SourcesSection\|SchoolCard\|SiteHeader" -x` |
| **Full suite command** | `pnpm test` |
| **E2E command** | `pnpm e2e` (Playwright 1.61.1) |
| **Estimated runtime** | ~15 seconds unit; ~30 seconds e2e |

---

## Sampling Rate

- **After every task commit:** Run `pnpm test -- <component> -x` for touched components
- **After every plan wave:** Run `pnpm test` + `pnpm validate:data`
- **Before `/gsd-verify-work`:** `pnpm build` + `pnpm e2e` + full unit suite green
- **Max feedback latency:** 30 seconds

---

## Per-Task Verification Map

| Task ID | Plan | Wave | Requirement | Test Type | Automated Command | File Exists | Status |
|---------|------|------|-------------|-----------|-------------------|-------------|--------|
| 04-01-01 | 01 | 1 | PROF-01 | unit | `pnpm test -- getSchoolBySlug -x` | ❌ W0 | ⬜ pending |
| 04-01-02 | 01 | 1 | PROF-03 | unit | `pnpm test -- collectCitedSources -x` | ❌ W0 | ⬜ pending |
| 04-01-03 | 01 | 1 | PROF-02 | unit | `pnpm test -- ProfileFieldRow -x` | ❌ W0 | ⬜ pending |
| 04-02-01 | 02 | 2 | PROF-01,02,03,04 | unit | `pnpm test -- SchoolProfile -x` | ❌ W0 | ⬜ pending |
| 04-02-02 | 02 | 2 | PROF-01 | build | `pnpm build` | ✅ | ⬜ pending |
| 04-03-01 | 03 | 3 | PROF-05,06 | data | `pnpm validate:data` | ✅ | ⬜ pending |
| 04-03-02 | 03 | 3 | PROF-07 | unit | `pnpm test -- SchoolCard -x` | ✅ partial | ⬜ pending |
| 04-03-03 | 03 | 3 | PROF-07 | e2e | `pnpm e2e -- -g "profile"` | ❌ W0 | ⬜ pending |
| 04-03-04 | 03 | 3 | NAV | unit | `pnpm test -- SiteHeader -x` | ✅ partial | ⬜ pending |

*Status: ⬜ pending · ✅ green · ❌ red · ⚠️ flaky*

---

## Wave 0 Requirements

- [ ] `src/features/schools/getSchoolBySlug/index.test.ts`
- [ ] `src/features/schools/getSchoolFieldByPath/index.test.ts`
- [ ] `src/features/schools/collectCitedSources/index.test.ts`
- [ ] `src/features/evidence/formatSourceType/index.test.ts`
- [ ] `src/features/schools/ProfileFieldRow/index.test.tsx`
- [ ] `src/features/schools/SourcesSection/index.test.tsx`
- [ ] Update `src/features/schools/SchoolCard/index.test.tsx`
- [ ] Update `src/features/navigation/SiteHeader/index.test.tsx`
- [ ] Extend `e2e/smoke.spec.ts`

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| Rich hero layout on mobile | PROF-02 | Visual spacing | Open profile on 390px viewport; hero shows name, badge, coverage before sections |

---

## Validation Sign-Off

- [ ] All tasks have automated verify or Wave 0 dependencies
- [ ] Sampling continuity: no 3 consecutive tasks without automated verify
- [ ] Wave 0 covers all MISSING references
- [ ] No watch-mode flags
- [ ] Feedback latency < 30s
- [ ] `nyquist_compliant: true` set in frontmatter

**Approval:** pending
