---
phase: 13
slug: evidence-tag-schema-layer
status: draft
nyquist_compliant: true
wave_0_complete: true
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
| 13-01-T1 | 01 | 1 | TAG-02 | T-13-01, T-13-02 | journalism + triangulated_community; reliability four-value; D-06 doc | unit | `pnpm exec jest src/features/evidence/sourceTypes --no-coverage` | ⚠️ extend | ⬜ pending |
| 13-01-T2 | 01 | 1 | TAG-02 / D-05 | T-13-01, T-13-03 | Factual allowlist in field citations; format labels; SOURCE_TYPE_ORDER | unit | `pnpm exec jest src/features/evidence/validateFieldCitations src/features/evidence/formatSourceType --no-coverage` | ⚠️ extend | ⬜ pending |
| 13-02-T1 | 02 | 1 | TAG-01 | T-13-06, T-13-08 | Independence log + tag citation schemas | unit | `pnpm exec jest src/features/evidence/independenceLog src/features/evidence/tagCitation --no-coverage` | ❌ create | ⬜ pending |
| 13-02-T2 | 02 | 1 | TAG-01 / TAG-04 | T-13-05, T-13-07 | Taxonomy + confidence enum + format helpers | unit | `pnpm exec jest src/features/schools/tagTaxonomy src/features/evidence/formatTagConfidence --no-coverage` | ❌ create | ⬜ pending |
| 13-03-T1 | 03 | 2 | TAG-03 / TAG-04 | T-13-09–12 | RED validateTagEvidence matrix | unit | `pnpm exec jest src/features/evidence/validateTagEvidence --no-coverage` | ❌ create | ⬜ pending |
| 13-03-T2 | 03 | 2 | TAG-03 / TAG-04 | T-13-09–12 | GREEN never-sole-basis + confidence consistency | unit | `pnpm exec jest src/features/evidence/validateTagEvidence --no-coverage` | ❌ create | ⬜ pending |
| 13-04-T1 | 04 | 3 | TAG-01 / TAG-03 | T-13-13, T-13-14 | schoolSchema tags + qualitativeLastReviewed gate | unit | `pnpm exec jest src/features/schools/school --no-coverage` | ⚠️ extend | ⬜ pending |
| 13-04-T2 | 04 | 3 | VAL-01 preview | T-13-15 | 10 real schools remain valid untagged | gate | `pnpm validate:data` | ✅ | ⬜ pending |

*Status: ⬜ pending · ✅ green · ❌ red · ⚠️ flaky*

*Wave 0: covered by Plan 02/03 creating new test units with implementation (tdd_mode false; Plan 03 is type:tdd RED→GREEN).*

---

## Wave 0 Requirements

- [x] `validateTagEvidence` tests planned in 13-03 (RED then GREEN)
- [x] Independence-log / tag-citation / tagTaxonomy / formatTagConfidence units planned in 13-02
- [x] Extend `sourceTypes`, `formatSourceType`, `validateFieldCitations`, `school` fixtures/tests planned in 13-01/13-04
- [x] Existing Jest + `pnpm validate:data` infrastructure — no new test runner

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| — | — | — | All phase behaviors have automated verification (grep + Jest + validate:data) |

---

## Validation Sign-Off

- [x] All tasks have `<automated>` verify or Wave 0 dependencies
- [x] Sampling continuity: no 3 consecutive tasks without automated verify
- [x] Wave 0 covers all MISSING references
- [x] No watch-mode flags
- [x] Feedback latency < 30s
- [x] `nyquist_compliant: true` set in frontmatter after plans land

**Approval:** pending execution
