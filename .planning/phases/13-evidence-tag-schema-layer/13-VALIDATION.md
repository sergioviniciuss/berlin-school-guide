---
phase: 13
slug: evidence-tag-schema-layer
status: draft
nyquist_compliant: false
wave_0_complete: false
created: 2026-07-29
---

# Phase 13 — Validation Strategy

> Per-phase validation contract for feedback sampling during execution.

---

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | Jest + Testing Library (jsdom) |
| **Config file** | `jest.config.mjs` |
| **Quick run command** | `pnpm exec jest src/features/evidence src/features/schools --no-coverage` |
| **Full suite command** | `pnpm test` |
| **Data gate** | `pnpm validate:data` |
| **Estimated runtime** | ~5–15 seconds (quick) / ~5–10s full |

---

## Sampling Rate

- **After every task commit:** Run targeted Jest path for touched unit
- **After every plan wave:** `pnpm test` + `pnpm validate:data`
- **Before `/gsd-verify-work`:** Full suite + validate:data must be green
- **Max feedback latency:** ~30 seconds

---

## Per-Task Verification Map

| Task ID | Plan | Wave | Requirement | Threat Ref | Secure Behavior | Test Type | Automated Command | File Exists | Status |
|---------|------|------|-------------|------------|-----------------|-----------|-------------------|-------------|--------|
| TBD | TBD | TBD | TAG-01 | — | Optional tags + conditional qualitativeLastReviewed | unit | `pnpm exec jest src/features/schools/school --no-coverage` | ⚠️ extend | ⬜ pending |
| TBD | TBD | TBD | TAG-02 | — | journalism + triangulated_community source types | unit | `pnpm exec jest src/features/evidence/sourceTypes --no-coverage` | ⚠️ extend | ⬜ pending |
| TBD | TBD | TBD | TAG-03 | T-13 | Never sole basis + independence log | unit | `pnpm exec jest src/features/evidence/validateTagEvidence --no-coverage` | ❌ Wave 0 | ⬜ pending |
| TBD | TBD | TBD | TAG-04 | — | Confidence enum + citation consistency | unit | `pnpm exec jest src/features/evidence/validateTagEvidence --no-coverage` | ❌ Wave 0 | ⬜ pending |
| TBD | TBD | TBD | D-05 | — | Factual allowlist rejects community | unit | `pnpm exec jest src/features/evidence/validateFieldCitations --no-coverage` | ⚠️ extend | ⬜ pending |
| TBD | TBD | TBD | VAL-01 | — | 10 real schools remain valid untagged | gate | `pnpm validate:data` | ✅ | ⬜ pending |

*Status: ⬜ pending · ✅ green · ❌ red · ⚠️ flaky*

*Planner fills Task ID / Plan / Wave columns when PLAN.md files are written.*

---

## Wave 0 Requirements

- [ ] `src/features/evidence/validateTagEvidence/index.ts` + `index.test.ts` — TAG-03/TAG-04 matrix
- [ ] Independence-log / tag-citation schema units + tests as planned
- [ ] Extend `sourceTypes`, `formatSourceType`, `validateFieldCitations`, `school` fixtures/tests
- [ ] Existing Jest + `pnpm validate:data` infrastructure — no new test runner

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| — | — | — | All phase behaviors have automated verification (grep + Jest + validate:data) |

---

## Validation Sign-Off

- [ ] All tasks have `<automated>` verify or Wave 0 dependencies
- [ ] Sampling continuity: no 3 consecutive tasks without automated verify
- [ ] Wave 0 covers all MISSING references
- [ ] No watch-mode flags
- [ ] Feedback latency < 30s
- [ ] `nyquist_compliant: true` set in frontmatter after plans land

**Approval:** pending
