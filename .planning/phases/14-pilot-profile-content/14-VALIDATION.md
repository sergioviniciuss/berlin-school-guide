---
phase: 14
slug: pilot-profile-content
status: draft
nyquist_compliant: true
wave_0_complete: false
created: 2026-07-29
---

# Phase 14 — Validation Strategy

> Per-phase validation contract for feedback sampling during execution.

---

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | Jest + Testing Library (jsdom) |
| **Config file** | `jest.config.mjs` |
| **Quick run command** | `pnpm exec jest src/features/schools/school/index.test.ts src/features/evidence/validateTagEvidence --no-coverage` |
| **Full suite command** | `pnpm test` |
| **Data gate** | `pnpm validate:data` |
| **Estimated runtime** | ~5–15 seconds (quick) / ~5–10s full |

---

## Sampling Rate

- **After every task commit:** schema unit tests + `pnpm validate:data` when content touched
- **After every plan wave:** `pnpm test` + `pnpm validate:data`
- **Before `/gsd-verify-work`:** Full suite green + validate:data + community research log (if withhold)
- **Max feedback latency:** ~30 seconds

---

## Per-Task Verification Map

| Task ID | Plan | Wave | Requirement | Threat Ref | Secure Behavior | Test Type | Automated Command | File Exists | Status |
|---------|------|------|-------------|------------|-----------------|-----------|-------------------|-------------|--------|
| 14-01-T1 | 01 | 1 | NARR-02 | T-14-01 | RED fixtures/tests for perfil cross-field | unit | `pnpm exec jest src/features/schools/school/index.test.ts --no-coverage` | ⚠️ extend | ⬜ pending |
| 14-01-T2 | 01 | 1 | NARR-02 | T-14-01/02 | Schema perfil/notes + D-03/D-04 gates | unit + gate | `pnpm exec jest src/features/schools/school/index.test.ts --no-coverage && pnpm validate:data` | ⚠️ | ⬜ pending |
| 14-02-T1 | 02 | 2 | NARR-02 | T-14-04 | DATA_MODEL field shapes | grep | `rg -n 'perfilDaEscola|qualitativeResearchNotes' docs/DATA_MODEL.md` | ⚠️ | ⬜ pending |
| 14-02-T2 | 02 | 2 | NARR-02 | T-14-05 | Factory qualitative passthrough | gate | `pnpm validate:data` | ✅ | ⬜ pending |
| 14-03-T1 | 03 | 3 | PILOT-01/02, NARR-02 | T-14-06/07 | Seepark + Friedrichsfelder perfil | gate | `pnpm validate:data` | ✅ | ⬜ pending |
| 14-03-T2 | 03 | 3 | PILOT-01/02, NARR-02 | T-14-06/07 | Grzimek sparse perfil/tags | gate + unit | `pnpm validate:data && pnpm exec jest src/features/evidence/validateTagEvidence --no-coverage` | ✅ | ⬜ pending |
| 14-04-T1 | 04 | 4 | PILOT-03 | T-14-09/12 | Community research log | docs | `test -f docs/research/PHASE14_COMMUNITY_TRIANGULATION.md` | ❌ create | ⬜ pending |
| 14-04-T2 | 04 | 4 | PILOT-01/03, NARR-02 | T-14-09/10/11 | Wagner + Tolstoi + outcome | gate + unit | `pnpm validate:data && pnpm exec jest src/features/schools/school src/features/evidence/validateTagEvidence --no-coverage` | ✅ | ⬜ pending |
| 14-05-T1 | 05 | 5 | all | T-14-07 | Pre-flight automated gates | gate + unit | `pnpm validate:data && pnpm exec jest …` | ✅ | ⬜ pending |
| 14-05-T2 | 05 | 5 | NARR-02, PILOT-01–03 | T-14-06/07/12 | Human editorial + VAL-01 | manual | Checklist vs EDITORIAL_GUIDE | ❌ manual | ⬜ pending |

---

## Wave 0 Requirements

- [ ] Extend `school/fixtures.ts` + `school/index.test.ts` for perfil cross-field cases (Plan 01 Task 1 — TDD RED)
- [x] Existing Jest + `pnpm validate:data` — no new runner
- [ ] Optional: smoke asserting five pilot slugs expose `perfilDaEscola` (covered by Plan 04/05 greps)

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| Perfil synthesizes only cited evidence; no ranking/superlatives | NARR-02 | Editorial judgment (D-10) | Plan 05 checklist vs EDITORIAL_GUIDE + school sources |
| Sparse-but-honest tag choices | PILOT-01 | No quota rule | Confirm thin schools not force-tagged |
| Non-pilot records unchanged | VAL-01 | Diff review | `git diff` limited to schema + 5 pilots + docs |
| Community research quality / fail-closed judgment | PILOT-03 | Live research | Review notes + docs log against independence rules |

---

## Validation Sign-Off

- [x] All tasks have `<automated>` verify or Wave 0 / manual listed above
- [x] Sampling continuity: no 3 consecutive tasks without automated verify where applicable
- [x] Wave 0 covers schema MISSING references (Plan 01 TDD)
- [x] No watch-mode flags
- [x] Feedback latency < 30s
- [x] `nyquist_compliant: true` set after plans land

**Approval:** pending execution

**Note:** CONTEXT D-14 (PILOT-03 = attempt + documented outcome) is authoritative over stricter ROADMAP SC#3 “published tag” reading for this phase.
