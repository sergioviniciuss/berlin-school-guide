---
phase: 02
slug: research-process-attribution
status: draft
nyquist_compliant: false
wave_0_complete: false
created: 2026-07-11
---

# Phase 02 — Validation Strategy

> Per-phase validation contract for feedback sampling during execution.

---

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | Jest 30.4.2 + React Testing Library 16.3.2 |
| **Config file** | `jest.config.mjs` |
| **Quick run command** | `pnpm test -- --testPathPattern="validateResearchDates|researchMetadata|SchoolDirectory" --no-coverage` |
| **Full suite command** | `pnpm test && pnpm validate:data && pnpm typecheck` |
| **Estimated runtime** | ~15 seconds |

---

## Sampling Rate

- **After every task commit:** `pnpm test -- --testPathPattern="<changed-module>" --no-coverage`
- **After every plan wave:** `pnpm test && pnpm validate:data`
- **Before `/gsd-verify-work`:** Full suite must be green
- **Max feedback latency:** 30 seconds

---

## Per-Task Verification Map

| Task ID | Plan | Wave | Requirement | Threat Ref | Secure Behavior | Test Type | Automated Command | File Exists | Status |
|---------|------|------|-------------|------------|-----------------|-----------|-------------------|-------------|--------|
| 02-01-01 | 01 | 1 | RSCH-01 | T-02-01 / — | Workflow doc has checklist headings | manual/doc | Review `docs/research/SCHOOL_RESEARCH_WORKFLOW.md` | ❌ W0 | ⬜ pending |
| 02-02-01 | 02 | 1 | RSCH-02 | T-02-02 / — | Real schools require coherent research dates | unit | `pnpm test -- src/features/schools/validateResearchDates/index.test.ts` | ❌ W0 | ⬜ pending |
| 02-02-02 | 02 | 1 | RSCH-02 | — | validate:data passes 10 real schools | integration | `pnpm validate:data` | ✅ | ⬜ pending |
| 02-03-01 | 03 | 2 | RSCH-03 | T-02-03 / — | Methodology page renders Portuguese content | unit | `pnpm test -- src/app/methodology/page.test.tsx` | ❌ W0 | ⬜ pending |
| 02-03-02 | 03 | 2 | RSCH-03 | — | Directory header links to `/methodology` | component | `pnpm test -- src/features/schools/SchoolDirectory/index.test.tsx` | ✅ | ⬜ pending |
| 02-02-03 | 02 | 1 | RSCH-04 | — | Verified fields have complete citable sources | integration | `pnpm validate:data` | ✅ | ⬜ pending |

*Status: ⬜ pending · ✅ green · ❌ red · ⚠️ flaky*

---

## Wave 0 Requirements

- [ ] `src/features/schools/validateResearchDates/index.ts` + `index.test.ts` — RSCH-02 date coherence
- [ ] Extend `src/features/schools/validateSchools/index.ts` — call date validator for real schools
- [ ] `docs/research/SCHOOL_RESEARCH_WORKFLOW.md` — RSCH-01 deliverable
- [ ] `src/content/guides/methodology.mdx` + `src/app/methodology/page.tsx` — RSCH-03
- [ ] Extend `src/features/schools/SchoolDirectory/index.test.tsx` — methodology link assertion
- [ ] Optional: `src/app/methodology/page.test.tsx` — static metadata smoke test

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| Workflow doc readability for AI sessions | RSCH-01 | Prose quality | Confirm checklist is executable without codebase context |

---

## Validation Sign-Off

- [ ] All tasks have `<automated>` verify or Wave 0 dependencies
- [ ] Sampling continuity: no 3 consecutive tasks without automated verify
- [ ] Wave 0 covers all MISSING references
- [ ] No watch-mode flags
- [ ] Feedback latency < 30s
- [ ] `nyquist_compliant: true` set in frontmatter

**Approval:** pending
