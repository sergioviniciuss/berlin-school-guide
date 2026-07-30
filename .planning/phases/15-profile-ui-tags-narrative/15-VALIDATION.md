---
phase: 15
slug: profile-ui-tags-narrative
status: draft
nyquist_compliant: false
wave_0_complete: false
created: 2026-07-29
---

# Phase 15 — Validation Strategy

> Per-phase validation contract for feedback sampling during execution.

---

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | Jest 30.4.2 + @testing-library/react 16.3.2 + jsdom |
| **Config file** | `jest.config.mjs` |
| **Quick run command** | `pnpm test -- TagsSection EditorialNarrative collectCitedSources SchoolProfile ReportCorrection` |
| **Full suite command** | `pnpm test` |
| **Estimated runtime** | ~30–90 seconds (targeted); full suite varies |

---

## Sampling Rate

- **After every task commit:** Run targeted Jest path(s) for touched units (`pnpm test -- <name>`)
- **After every plan wave:** Run `pnpm test`
- **Before `/gsd-verify-work`:** `pnpm test` + `pnpm typecheck` + `pnpm build` must be green
- **Max feedback latency:** ~90 seconds for targeted runs

---

## Per-Task Verification Map

| Task ID | Plan | Wave | Requirement | Threat Ref | Secure Behavior | Test Type | Automated Command | File Exists | Status |
|---------|------|------|-------------|-----------------|-----------|-------------------|-------------|--------|
| 15-W0-01 | 00 | 0 | NARR-01/03 | — | N/A | unit | `pnpm test -- TagsSection` | ✅ created (plan 00) | ❌ red |
| 15-W0-02 | 00 | 0 | NARR-04 | — | N/A | unit | `pnpm test -- EditorialNarrative` | ✅ created (plan 00) | ❌ red |
| 15-W0-03 | 00 | 0 | NARR-05 | — | N/A | unit | `pnpm test -- collectCitedSources` | ✅ extended (plan 00) | ❌ red |
| 15-W0-04 | 00 | 0 | NARR-04/06 | — | N/A | unit | `pnpm test -- SchoolProfile` | ✅ extended (plan 00) | ❌ red |
| 15-W0-05 | 00 | 0 | NARR-06 | T-15-01 | No PII in mailto beyond slug/context | unit | `pnpm test -- ReportCorrection` | ✅ created (plan 00) | ❌ red |
| TBD | 01+ | 1+ | NARR-* | T-15-* | Per plan threat_model | unit | Per-plan verify | — | ⬜ pending |

*Status: ⬜ pending · ✅ green · ❌ red · ⚠️ flaky*

*Wave 0 file scaffolds landed in plan 00; greens deferred to plans 01–05. `wave_0_complete` stays false until RED suites turn green.*

---

## Wave 0 Requirements

- [x] `src/features/schools/TagsSection/index.test.tsx` — NARR-01/03/04 expand + empty omit
- [x] `src/features/schools/EditorialNarrative/index.test.tsx` — heading + body; absent when undefined
- [x] Extend `collectCitedSources/index.test.ts` — tag-only source; dedupe field+tag; `citedBy`
- [x] Extend `SourcesSection` tests (create if missing) — “Citado em:” present/absent
- [x] Extend `SchoolProfile/index.test.tsx` — editorial order; “Perfil oficial”; correction link; non-pilot absence
- [x] `src/features/schools/ReportCorrection/index.test.tsx` — prefill, missing slug copy, mailto href
- [x] `tagTaxonomy` tests for category helpers
- [x] Framework install: none — Jest already configured

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| Visual distinction of community vs official in expanded evidence | NARR-03 | Visual/a11y judgment beyond RTL text | Open a pilot school profile; expand a community-sourced tag; confirm source-type wording matches UI-SPEC |
| Mailto opens with expected subject/body in a real mail client | NARR-06 | OS/mail-client dependent | Click correction link on pilot profile; confirm draft includes school slug and tags/Perfil copy |

---

## Validation Sign-Off

- [ ] All tasks have `<automated>` verify or Wave 0 dependencies
- [ ] Sampling continuity: no 3 consecutive tasks without automated verify
- [ ] Wave 0 covers all MISSING references
- [ ] No watch-mode flags
- [ ] Feedback latency < 90s
- [ ] `nyquist_compliant: true` set in frontmatter

**Approval:** pending
