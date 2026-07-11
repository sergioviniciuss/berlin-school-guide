---
phase: 1
slug: data-evidence-audit
status: draft
nyquist_compliant: false
wave_0_complete: false
created: 2026-07-11
---

# Phase 1 — Validation Strategy

> Per-phase validation contract for feedback sampling during execution.

---

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | Jest 30.x |
| **Config file** | `jest.config.mjs` |
| **Quick run command** | `pnpm test -- --testPathPattern="inferredFrom|calculateEvidenceCoverage|schoolDirectoryData|SchoolCard"` |
| **Full suite command** | `pnpm test && pnpm validate:data && pnpm typecheck` |
| **Estimated runtime** | ~15 seconds |

---

## Sampling Rate

- **After every task commit:** Run quick run command
- **After every plan wave:** Run full suite command
- **Before `/gsd-verify-work`:** Full suite must be green
- **Max feedback latency:** 20 seconds

---

## Per-Task Verification Map

| Task ID | Plan | Wave | Requirement | Threat Ref | Secure Behavior | Test Type | Automated Command | File Exists | Status |
|---------|------|------|-------------|------------|-----------------|-----------|-------------------|-------------|--------|
| 01-01-01 | 01 | 1 | DATA-02 | T-01-01 | N/A | unit | `pnpm test -- --testPathPattern=inferredFrom` | ❌ W0 | ⬜ pending |
| 01-01-02 | 01 | 1 | DATA-01 | T-01-02 | N/A | data | `pnpm validate:data` | ✅ | ⬜ pending |
| 01-02-01 | 02 | 2 | DATA-03 | — | N/A | unit | `pnpm test -- --testPathPattern=calculateEvidenceCoverage` | ✅ | ⬜ pending |
| 01-02-02 | 02 | 2 | DATA-03 | — | N/A | unit | `pnpm test -- --testPathPattern=schoolDirectoryData` | ✅ | ⬜ pending |
| 01-03-01 | 03 | 3 | DATA-04 | — | N/A | unit | `pnpm test -- --testPathPattern=SchoolCard` | ✅ | ⬜ pending |
| 01-03-02 | 03 | 3 | DATA-05 | — | N/A | grep | `rg -i "sintétic|synthetic|M2" src/app src/features/schools/SchoolDirectory src/features/schools/SchoolCard` | ✅ | ⬜ pending |
| 01-03-03 | 03 | 3 | DATA-06 | T-01-03 | No synthetic in prod | unit+grep | `pnpm test -- --testPathPattern=schoolDirectoryData && rg getSyntheticSchools src/app` | ✅ | ⬜ pending |

*Status: ⬜ pending · ✅ green · ❌ red · ⚠️ flaky*

---

## Wave 0 Requirements

- [ ] `src/content/schools/real/lichtenbergPrimarySchools/inferredFrom/index.test.ts` — stubs for inferredFrom helper (created in task 01-01-01)

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| Directory card visual hierarchy | DATA-04 | Visual layout | Open `/schools`, confirm Perfil básico/detalhado badges and Pesquisa básica/detalhada tier labels on cards |
| Homepage minimal fix | DATA-05 | Copy judgment | Open `/`, confirm no M2 eyebrow and link to `/schools` present |

---

## Validation Sign-Off

- [ ] All tasks have `<automated>` verify or Wave 0 dependencies
- [ ] Sampling continuity: no 3 consecutive tasks without automated verify
- [ ] Wave 0 covers all MISSING references
- [ ] No watch-mode flags
- [ ] Feedback latency < 20s
- [ ] `nyquist_compliant: true` set in frontmatter

**Approval:** pending
