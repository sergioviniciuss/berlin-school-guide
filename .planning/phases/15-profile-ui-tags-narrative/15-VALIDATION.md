---
phase: 15
slug: profile-ui-tags-narrative
status: complete
nyquist_compliant: true
wave_0_complete: true
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
| 15-00-01 | 00 | 0 | NARR-01/03 | — | N/A | unit | `pnpm test -- TagsSection` | ✅ created (plan 00) | ✅ green |
| 15-00-02 | 00 | 0 | NARR-04 | — | N/A | unit | `pnpm test -- EditorialNarrative` | ✅ created (plan 00) | ✅ green |
| 15-00-03 | 00 | 0 | NARR-05 | — | N/A | unit | `pnpm test -- collectCitedSources` | ✅ extended (plan 00) | ✅ green |
| 15-00-04 | 00 | 0 | NARR-04/06 | — | N/A | unit | `pnpm test -- SchoolProfile` | ✅ extended (plan 00) | ✅ green |
| 15-00-05 | 00 | 0 | NARR-06 | T-15-01 | No PII in mailto beyond slug/context | unit | `pnpm test -- ReportCorrection` | ✅ created (plan 00) | ✅ green |
| 15-01-01 | 01 | 1 | NARR-01 | — | N/A | unit | `pnpm test -- tagTaxonomy` | ✅ | ✅ green |
| 15-01-02 | 01 | 1 | NARR-01 | — | N/A | unit | `pnpm test -- tagTaxonomy` | ✅ | ✅ green |
| 15-02-01 | 02 | 1 | NARR-05 | T-15-02-* | citedBy from typed School only | unit | `pnpm test -- collectCitedSources` | ✅ | ✅ green |
| 15-02-02 | 02 | 1 | NARR-05 | T-15-02-* | React text cite-back | unit | `pnpm test -- SourcesSection` | ✅ | ✅ green |
| 15-03-01 | 03 | 2 | NARR-04 | T-15-03-* | text node narrative | unit | `pnpm test -- EditorialNarrative` | ✅ | ✅ green |
| 15-03-02 | 03 | 2 | NARR-01/03/04 | T-15-03-* | formatSourceType in expand only | unit | `pnpm test -- TagsSection` | ✅ | ✅ green |
| 15-04-01 | 04 | 2 | NARR-06 | T-15-04-* | slug via getSchoolBySlug allowlist | unit | `pnpm test -- ReportCorrection` | ✅ | ✅ green |
| 15-04-02 | 04 | 2 | NARR-06 | T-15-04-* | Suspense for useSearchParams | unit | `pnpm test -- ReportCorrection` | ✅ | ✅ green |
| 15-05-01 | 05 | 3 | NARR-01/03–06 | T-15-05-* | conditional chrome; slug from School | unit | `pnpm test -- SchoolProfile` | ✅ | ✅ green |
| 15-05-02 | 05 | 3 | NARR-* | — | Phase gate | unit + tsc | `pnpm test && pnpm typecheck` | ✅ | ✅ green |

*Status: ⬜ pending · ✅ green · ❌ red · ⚠️ flaky*

*Wave 0 RED suites greened across plans 01–05. `wave_0_complete: true` after Plan 05 composition + phase gate.*

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

- [x] All tasks have `<automated>` verify or Wave 0 dependencies
- [x] Sampling continuity: no 3 consecutive tasks without automated verify
- [x] Wave 0 covers all MISSING references
- [x] No watch-mode flags
- [x] Feedback latency < 90s
- [x] `nyquist_compliant: true` set in frontmatter

**Approval:** Wave 0 automated gate complete (Plan 05). Manual-only rows remain for `/gsd-verify-work`.
