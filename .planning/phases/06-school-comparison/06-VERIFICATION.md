---
phase: 06-school-comparison
verified: 2026-07-11T22:15:00Z
status: human_needed
score: 4/4
overrides_applied: 0
human_verification:
  - test: "Open /compare?schools=lew-tolstoi-schule,adam-ries-schule at 390×844 viewport"
    expected: "Criteria-first stacked mobile layout visible (Comparação móvel de critérios); no horizontal page overflow; diff toggle filters criteria"
    why_human: "Mobile scroll feel and diff-toggle UX require real device/browser interaction beyond static markup checks"
  - test: "Select 3 schools from /schools via toggle buttons, then try adding a fourth"
    expected: "Fourth toggle disabled with Máximo de 3 escolas; CompareBar shows 3 selected; Comparar escolas enabled"
    why_human: "Max-3 gating disabled state and sticky bar placement need tap-target confirmation"
  - test: "Add school from profile header, return to directory — selection persists"
    expected: "Same school shows Na comparação on directory card via sessionStorage sync"
    why_human: "Cross-page sessionStorage continuity cannot be fully validated statically"
  - test: "Cold-load /compare?schools=lew-tolstoi-schule,adam-ries-schule in fresh session"
    expected: "Both schools in comparison; limitations block visible; no ranking language; methodology link works"
    why_human: "E2E passes in CI environment but human should confirm copy and trust framing reads naturally in Portuguese"
---

# Phase 6: School Comparison Verification Report

**Phase Goal:** Families can compare multiple nearby schools side by side, without the product pushing them toward a "best school" ranking.
**Verified:** 2026-07-11T22:15:00Z
**Status:** human_needed
**Re-verification:** No — initial verification

## Goal Achievement

### Roadmap Success Criteria

| # | Truth | Status | Evidence |
| --- | ----- | ------ | -------- |
| 1 | User can select multiple schools from directory and view together on comparison page | ✓ VERIFIED | `CompareToggleButton` on `SchoolCard`; `CompareBar` CTA; `/compare?schools=` route; e2e `selects schools from directory and opens comparison table` |
| 2 | Same criteria side by side with no composite score or ranking | ✓ VERIFIED | `ComparisonTable` + `ComparisonMobile` iterate `PROFILE_SECTIONS`; `ComparisonLimitations` explicitly disclaims ranking; no score column in codebase |
| 3 | Surfaces missing-data status and evidence coverage per school | ✓ VERIFIED | Cells use `ComparisonCellContent` + `StatusBadge`; headers show tier + coverage %; `filterComparisonRows` preserves all-missing gap rows (D-17) |
| 4 | Limitations explained in Portuguese | ✓ VERIFIED | `ComparisonLimitations` always visible with PT copy and `/methodology` link |

**Score:** 4/4 roadmap truths verified (automated evidence)

### CONTEXT Decisions (D-01–D-28)

| Decision | Status | Evidence |
| -------- | ------ | -------- |
| D-01 Toggle button labels | ✓ | `CompareToggleButton` |
| D-02 Profile link separate | ✓ | Toggle outside `Link` in `SchoolCard`; `stopPropagation` |
| D-03 Max 3 schools | ✓ | `MAX_COMPARE_SCHOOLS = 3`; parseCompareSlugs cap |
| D-04 Sticky CompareBar | ✓ | `CompareBar` with min-2 CTA gating |
| D-05 Directory URL ?compare= | ✓ | `SchoolDirectory` sync |
| D-06 Compare page ?schools= | ✓ | `SchoolComparison` + `COMPARE_PAGE_PARAM` |
| D-07 Invalid slug handling | ✓ | `resolveCompareSchools` + skipped notice; e2e invalid slug test |
| D-08 Profile compare action | ✓ | `SchoolProfileCompareAction` |
| D-09 Shared sessionStorage | ✓ | `compareSelection` + directory/compare sync |
| D-10 /compare heading | ✓ | `SchoolComparison` h1 "Comparar" |
| D-11 Desktop criteria table | ✓ | `ComparisonTable` |
| D-12 Sticky headers/column | ✓ | Sticky thead + rowheader classes |
| D-13 Value + badge + notes | ✓ | `ComparisonCellContent` + `ComparisonEvidenceNote` |
| D-14 Coverage in headers | ✓ | Tier label + percentage sublabel |
| D-15 No ranking | ✓ | Limitations + no score UI |
| D-16 Diff toggle | ✓ | "Mostrar apenas diferenças" checkbox in toolbar |
| D-17 All-missing rows stay | ✓ | `filterComparisonFieldPaths` exception |
| D-18 No raw table-only mobile | ✓ | `ComparisonMobile` below lg |
| D-19 Criteria-first mobile | ✓ | Section headings + per-school blocks |
| D-20 School identity visible | ✓ | Top strip with remove links + repeated names |
| D-21 No horizontal scroll mobile | ✓ | e2e mobile overflow test passes |
| D-22 PROFILE_SECTIONS mirror | ✓ | Shared section config in table/mobile |
| D-25 Limitations block | ✓ | `ComparisonLimitations` |
| D-26 Comparar nav | ✓ | `SiteHeader` + `SiteFooter` |
| D-27 Empty state <2 schools | ✓ | `CompareEmptyState` links to /schools |
| D-28 Copy references 2–3 schools | ✓ | Empty state + CompareBar copy |

### Plan Summaries

| Plan | Summary | Tests |
| ---- | ------- | ----- |
| 06-01 | ✓ Present | parseCompareSlugs, resolveCompareSchools, formatProfileFieldValue |
| 06-02 | ✓ Present | CompareBar, directory URL sync (superseded in part by 06-04) |
| 06-04 | ✓ Present | compareSelection, CompareToggleButton, profile action — 61 tests |
| 06-03 | ✓ Present | ComparisonTable/Mobile, limitations, e2e — 257 unit tests total |

### Automated Checks

| Check | Result |
| ----- | ------ |
| `pnpm tsc` | ✓ Pass |
| `pnpm test` | ✓ 257 passed |
| `pnpm build` | ✓ Static export 16 pages |
| `pnpm e2e e2e/smoke.spec.ts` | ✓ 9 passed (incl. 4 compare tests) |

### Requirements Traceability

| ID | Requirement | Status |
| -- | ----------- | ------ |
| COMP-01 | Select schools from directory to compare | ✓ Complete |
| COMP-02 | Criteria side by side without ranking | ✓ Complete |
| COMP-03 | Missing data and coverage per school | ✓ Complete |
| COMP-04 | Limitations in Portuguese | ✓ Complete |

## Human Verification Needed

4 items require manual confirmation before closing phase (see frontmatter). Primary focus: mobile compare UX, max-3 gating feel, cross-page selection persistence, and trust copy readability.

## Gaps

None blocking automated verification.

## VERIFICATION PASSED (automated)

All roadmap truths, CONTEXT decisions, plan artifacts, and automated checks pass. Phase status set to `human_needed` pending UAT sign-off.
