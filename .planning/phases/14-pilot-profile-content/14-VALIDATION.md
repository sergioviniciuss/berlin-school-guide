---
phase: 14
slug: pilot-profile-content
status: draft
nyquist_compliant: false
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
| TBD | TBD | TBD | NARR-02 | — | perfil schema + cross-field rules | unit | `pnpm exec jest src/features/schools/school --no-coverage` | ⚠️ extend | ⬜ pending |
| TBD | TBD | TBD | NARR-02 | — | Editorial: cited-only, no ranking | manual | Checklist vs EDITORIAL_GUIDE | ❌ manual | ⬜ pending |
| TBD | TBD | TBD | PILOT-01 | — | 5 pilots have perfil + review date | gate/grep | `pnpm validate:data` + slug greps | ⚠️ | ⬜ pending |
| TBD | TBD | TBD | PILOT-02 | — | ≥1 low-doc with perfil | review | Grep Seepark/Grzimek | ❌ checklist | ⬜ pending |
| TBD | TBD | TBD | PILOT-03 | T-14 | Attempt+publish or withhold notes+docs | gate/docs | validate:data or notes+log file | ⚠️ | ⬜ pending |
| TBD | TBD | TBD | VAL-01 | — | Non-pilots untouched | review | git diff scoped | ❌ manual | ⬜ pending |

*Planner fills Task ID / Plan / Wave when PLAN.md files are written.*

---

## Wave 0 Requirements

- [ ] Extend `school/fixtures.ts` + `school/index.test.ts` for perfil cross-field cases (TDD preferred)
- [ ] Existing Jest + `pnpm validate:data` — no new runner
- [ ] Optional: smoke asserting five pilot slugs expose `perfilDaEscola`

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| Perfil synthesizes only cited evidence; no ranking/superlatives | NARR-02 | Editorial judgment (D-10) | Read each perfil against school sources/fields/tags + EDITORIAL_GUIDE |
| Sparse-but-honest tag choices | PILOT-01 | No quota rule | Confirm thin schools not force-tagged |
| Non-pilot records unchanged | VAL-01 | Diff review | `git diff` limited to schema + 5 pilots + docs |
| Community research quality / fail-closed judgment | PILOT-03 | Live research | Review notes + docs log against independence rules |

---

## Validation Sign-Off

- [ ] All tasks have `<automated>` verify or Wave 0 / manual listed above
- [ ] Sampling continuity: no 3 consecutive tasks without automated verify where applicable
- [ ] Wave 0 covers schema MISSING references
- [ ] No watch-mode flags
- [ ] Feedback latency < 30s
- [ ] `nyquist_compliant: true` set after plans land

**Approval:** pending

**Note:** CONTEXT D-14 (PILOT-03 = attempt + documented outcome) is authoritative over stricter ROADMAP SC#3 “published tag” reading for this phase.
