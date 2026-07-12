---
phase: 5
slug: directory-ux-discovery
status: draft
nyquist_compliant: false
wave_0_complete: false
created: 2026-07-11
---

# Phase 5 — Validation Strategy

> Per-phase validation contract for feedback sampling during execution.

---

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | Jest 30.4.2 + React Testing Library 16.3.2 |
| **Config file** | `jest.config.mjs` |
| **Quick run command** | `pnpm test -- --testPathPattern="sortSchools|useDebouncedValue|SchoolDirectory|SchoolResults" --no-coverage` |
| **Full suite command** | `pnpm test` |
| **E2E command** | `pnpm e2e` |
| **Estimated runtime** | ~5 seconds unit, ~30 seconds e2e |

---

## Sampling Rate

- **After every task commit:** `pnpm test -- --testPathPattern="<changed-module>" --no-coverage`
- **After every plan wave:** `pnpm test`
- **Before `/gsd-verify-work`:** `pnpm test && pnpm e2e` green
- **Max feedback latency:** 30 seconds

---

## Per-Task Verification Map

| Task ID | Plan | Wave | Requirement | Test Type | Automated Command | File Exists | Status |
|---------|------|------|-------------|-----------|-------------------|-------------|--------|
| 05-01-01 | 01 | 1 | DISC-01 | unit | `pnpm test -- src/features/schools/useDebouncedValue/index.test.ts` | ❌ W0 | ⬜ pending |
| 05-01-02 | 01 | 1 | DISC-01, DISC-04 | component | `pnpm test -- src/features/schools/SchoolDirectory/index.test.tsx` | ✅ extend | ⬜ pending |
| 05-01-03 | 01 | 1 | DISC-03, DISC-04 | unit | `pnpm test -- src/features/schools/sortSchools/index.test.ts` | ❌ W0 | ⬜ pending |
| 05-02-01 | 02 | 2 | DISC-02, DISC-06 | component | `pnpm test -- src/features/schools/SchoolFilters/index.test.tsx` | ✅ extend | ⬜ pending |
| 05-02-02 | 02 | 2 | DISC-06 | component | `pnpm test -- src/features/schools/SchoolDirectory/index.test.tsx` | ✅ extend | ⬜ pending |
| 05-03-01 | 03 | 3 | DISC-05 | component | `pnpm test -- src/features/schools/SchoolResults/index.test.tsx` | ✅ extend | ⬜ pending |
| 05-03-02 | 03 | 3 | DISC-08 | component | `pnpm test -- src/features/schools/SchoolCard/index.test.tsx` | ✅ extend | ⬜ pending |
| 05-03-03 | 03 | 3 | DISC-04 | e2e | `pnpm e2e -- e2e/smoke.spec.ts` | ✅ extend | ⬜ pending |
| — | — | — | DISC-07 | unit | `pnpm test -- src/features/schools/filterSchools/index.test.ts` | ✅ | ⬜ pending |

*Status: ⬜ pending · ✅ green · ❌ red · ⚠️ flaky*

---

## Wave 0 Requirements

- [ ] `src/features/schools/useDebouncedValue/index.test.ts` — debounce timing DISC-01
- [ ] `src/features/schools/sortSchools/index.test.ts` — name/coverage/tier ordering DISC-03
- [ ] Extend `SchoolDirectory/index.test.tsx` — debounce pending UI, sort URL, Sheet apply, header counts
- [ ] Extend `SchoolResults/index.test.tsx` — contextual empty states DISC-05
- [ ] Extend `e2e/smoke.spec.ts` — URL with sort param restores view DISC-04

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| Mobile Sheet touch scroll | DISC-06 | RTL limited for Sheet gestures | Resize to 375px; open Filtros; scroll long filter list; Apply |

---

## Validation Sign-Off

- [ ] All tasks have automated verify or Wave 0 dependencies
- [ ] Sampling continuity: no 3 consecutive tasks without automated verify
- [ ] Wave 0 covers all MISSING references
- [ ] Feedback latency < 30s
- [ ] `nyquist_compliant: true` set in frontmatter after execution

**Approval:** pending
