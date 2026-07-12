---
phase: 01-data-evidence-audit
verified: 2026-07-11T11:04:00Z
status: human_needed
score: 11/11 must-haves verified
overrides_applied: 0
human_verification:
  - test: "Open /schools and inspect 2–3 SchoolCards (e.g. Bernhard-Grzimek, Lew-Tolstoi, Richard-Wagner)"
    expected: "Each card shows a Perfil básico badge, Pesquisa básica tier label in the coverage box, and the level-aware disclaimer. Richard-Wagner shows verified Inspeção oficial; Bernhard-Grzimek does not show Willkommensklasse (missing)."
    why_human: "Badge layout, typography, and field visibility rules cannot be fully assessed from static code review."
  - test: "Open / and confirm homepage copy and CTA"
    expected: "Eyebrow reads Berlin School Guide (not M2). Primary button links to /schools with Ver escolas em Lichtenberg. No synthetic or M2 scaffolding copy visible."
    why_human: "Homepage visual presentation and link affordance require browser confirmation."
  - test: "Spot-check one school with inferred afterSchoolCare in data (e.g. Bernhard-Grzimek) on the directory card"
    expected: "Card shows Ganztag as verified but does not present afterSchoolCare as verified; inferred afterSchoolCare is omitted from the card (not falsely verified)."
    why_human: "Inferred-field omission vs display is a UX trust judgment best confirmed visually."
---

# Phase 1: Data & Evidence Audit Verification Report

**Phase Goal:** Every published fact about a Lichtenberg school is honestly evidenced — marked verified only when independently confirmed, missing when it isn't, and coverage numbers reflect real research depth rather than fallback inference.

**Verified:** 2026-07-11T11:04:00Z  
**Status:** human_needed  
**Re-verification:** No — initial verification

## Goal Achievement

### Observable Truths

| # | Truth | Status | Evidence |
| --- | ------- | ---------- | -------------- |
| 1 | All 10 Lichtenberg school records audited field-by-field with corrected evidence statuses | ✓ VERIFIED | `realLichtenbergPrimarySchools` has 10 entries; `pnpm validate:data` validates 10 real records; all schools have explicit `researchStatus: "directory_only"` and `coverageLevel: "directory"` |
| 2 | No field marked verified when evidence comes from an unrelated field's citation | ✓ VERIFIED | `inferredFrom()` always returns `not_confirmed`; ganztag→afterSchoolCare and offers→schoolProfile/pedagogyFocus use `inferredFrom`; no afterSchoolCare verified from portrait-only citations |
| 3 | afterSchoolCare inferred from ganztag uses `not_confirmed` with explicit Portuguese note | ✓ VERIFIED | `primarySchool()` lines 152–163; spot-check: 7 schools `not_confirmed`, 2 independently verified (Lew-Tolstoi, Richard-Wagner), 2 `missing` (no ganztag) |
| 4 | bilingualPrograms and internationalPrograms default to missing unless explicitly verified | ✓ VERIFIED | Defaults `field(null, missingResearch)`; no real school uses `not_applicable` for these fields |
| 5 | inspectionAvailability for directory schools is missing, not portrait `not_confirmed` | ✓ VERIFIED | Directory default uses `missing("Inspeção oficial não pesquisada…")`; Richard-Wagner override uses independent school-website citation |
| 6 | Evidence coverage v2 uses level-aware denominators; numerator counts only verified fields | ✓ VERIFIED | `evidenceCoverageVersion = "v2"`; directory=11 fields, detailed=23; `calculateEvidenceCoverage` filters `status === "verified"` only; unit tests pass |
| 7 | Coverage percentages reflect real research depth (directory schools scored on portrait fields only) | ✓ VERIFIED | Real schools score 91–100% on 11-field directory set (10–11 verified); no `not_confirmed` in numerator |
| 8 | Directory vs detailed research levels distinguished in data and UI | ✓ VERIFIED | `SchoolDirectoryItem` includes `coverageLevel`, `researchStatus`, `coverageTierLabel`; SchoolCard renders Perfil básico/detailed badges; unit tests cover both tiers (all 10 real schools currently directory post-audit) |
| 9 | No directory-only school displays unsupported detailed-level claims on directory cards | ✓ VERIFIED | SchoolCard omits missing Facts via `shouldRenderFact`; verified card fields cite portrait or independent school sources; extra verified data (e.g. Richard-Wagner inspection) cites dedicated school pages |
| 10 | No synthetic/M2 scaffolding copy on production directory, schools, or homepage paths | ✓ VERIFIED | `rg -i "sintétic|synthetic|M2" src/app src/features/schools/SchoolDirectory src/features/schools/SchoolCard` → 0 matches |
| 11 | Synthetic fixtures isolated from production data paths | ✓ VERIFIED | `getSyntheticSchools` absent from codebase; `src/app/schools/page.tsx` imports only `getSchoolDirectoryItems`; `"Escola sintética"` string absent from `src/` |

**Score:** 11/11 truths verified (automated)

### Deferred Items

| # | Item | Addressed In | Evidence |
|---|------|-------------|----------|
| 1 | Three schools presenting fuller detailed profiles | Phase 4 | ROADMAP Phase 4 SC4: "Adam-Ries, Lew-Tolstoi, Richard-Wagner present a fuller detailed profile" |
| 2 | SchoolCard profile links replacing coming-soon CTA | Phase 4 | Plan 01-03: "Do NOT link to `/schools/[slug]` yet (Phase 4)" |
| 3 | Legacy `/guides/m2-smoke` route cleanup | Phase 3 | ROADMAP Phase 3: "replacing the old M2 foundation validation copy" — homepage fixed; route remains reachable by direct URL |
| 4 | Per-field evidence labels and consolidated sources on detail pages | Phase 4 | ROADMAP Phase 4 SC2–SC3; RSCH-04 in Phase 2 |

### Required Artifacts

| Artifact | Expected | Status | Details |
| -------- | ----------- | ------ | ------- |
| `src/content/schools/real/lichtenbergPrimarySchools/inferredFrom/index.ts` | Cross-field inference helper | ✓ VERIFIED | 18 lines; exports `inferredFrom`, throws on empty note |
| `src/content/schools/real/lichtenbergPrimarySchools/index.ts` | 10 audited school records + refactored `primarySchool()` | ✓ VERIFIED | 510 lines; imports `inferredFrom`; 10 schools in export array |
| `src/features/schools/school/constants.ts` | v2 field paths and version | ✓ VERIFIED | `evidenceCoverageVersion = "v2"`; directory (11) and detailed (23) path arrays |
| `src/features/evidence/calculateEvidenceCoverage/index.ts` | Level-aware verified-only scoring | ✓ VERIFIED | Uses `getImportantFieldPathsForCoverage`; verified-only numerator |
| `src/features/schools/getCoverageTierLabel/index.ts` | Portuguese tier labels | ✓ VERIFIED | directory→Pesquisa básica, detailed→Pesquisa detalhada |
| `src/features/schools/SchoolCard/index.tsx` | Research depth badges and tier display | ✓ VERIFIED | Perfil básico/detailed badge, tier label, field gating, coming-soon CTA |
| `src/features/schools/SchoolDirectory/index.tsx` | Honest directory header copy | ✓ VERIFIED | Berlin School Guide eyebrow; Lichtenberg scope; no synthetic wording |
| `src/app/page.tsx` | Homepage honest copy and /schools link | ✓ VERIFIED | No M2 eyebrow; links to `/schools` |
| `src/features/schools/schoolDirectoryData/index.ts` | Production data path without synthetic export | ✓ VERIFIED | Exports `getRealSchools`, `getSchoolDirectoryItems`, `toSchoolDirectoryItem` only |

### Key Link Verification

| From | To | Via | Status | Details |
| ---- | --- | --- | ------ | ------- |
| `lichtenbergPrimarySchools/index.ts` | `inferredFrom/index.ts` | `import { inferredFrom } from "./inferredFrom"` | ✓ WIRED | Used in afterSchoolCare, schoolProfile, pedagogyFocus fallbacks |
| `calculateEvidenceCoverage/index.ts` | `school/constants.ts` | `getImportantFieldPathsForCoverage(school.research.coverageLevel)` | ✓ WIRED | Selects 11 vs 23 field paths |
| `schoolDirectoryData/index.ts` | `calculateEvidenceCoverage` + `getCoverageTierLabel` | `toSchoolDirectoryItem()` mapping | ✓ WIRED | Populates `evidenceCoverage`, `coverageTierLabel` on every item |
| `src/app/schools/page.tsx` | `getSchoolDirectoryItems` | page composition | ✓ WIRED | No synthetic import path |
| `SchoolCard/index.tsx` | `SchoolDirectoryItem.coverageLevel` + `coverageTierLabel` | props rendering | ✓ WIRED | Badge and coverage line read tier fields |

### Data-Flow Trace (Level 4)

| Artifact | Data Variable | Source | Produces Real Data | Status |
| -------- | ------------- | ------ | ------------------ | ------ |
| `SchoolCard` | `school.coverageLevel`, `school.coverageTierLabel` | `toSchoolDirectoryItem()` ← `school.research` | Yes — mapped from real school records | ✓ FLOWING |
| `SchoolCard` | `school.evidenceCoverage.percentage` | `calculateEvidenceCoverage(school)` ← field evidence statuses | Yes — 91–100% from verified portrait fields | ✓ FLOWING |
| `SchoolDirectory` | `schools` prop | `getSchoolDirectoryItems()` ← `realLichtenbergPrimarySchools` | Yes — 10 validated real schools | ✓ FLOWING |
| `calculateEvidenceCoverage` | `verified` count | Per-field `evidence.status` on School object | Yes — excludes `not_confirmed`, `missing` from numerator | ✓ FLOWING |

### Behavioral Spot-Checks

| Behavior | Command | Result | Status |
| -------- | ------- | ------ | ------ |
| Phase unit tests pass | `pnpm test -- --testPathPatterns="inferredFrom\|calculateEvidenceCoverage\|getCoverageTierLabel\|schoolDirectoryData\|SchoolCard"` | 4 suites, 15 tests passed | ✓ PASS |
| Data validation | `pnpm validate:data` | Validated 2 fixture + 10 real school records | ✓ PASS |
| Real school count | tsx spot-check `getRealSchools().length` | 10 | ✓ PASS |
| No synthetic in app | `rg "getSyntheticSchools" src/` | 0 matches | ✓ PASS |
| inferredFrom never verified | `rg 'status: "verified"' inferredFrom/` | 0 matches | ✓ PASS |
| Production copy clean | `rg -i "sintétic\|synthetic\|M2" src/app src/features/schools/SchoolDirectory src/features/schools/SchoolCard` | 0 matches | ✓ PASS |

### Requirements Coverage

| Requirement | Source Plan | Description | Status | Evidence |
| ----------- | ---------- | ----------- | ------ | -------- |
| DATA-01 | 01-01 | Field-by-field audit of all Lichtenberg schools | ✓ SATISFIED | 10 schools with explicit metadata; validate:data passes; audit commits documented |
| DATA-02 | 01-01 | Remove/flag implicit evidence fallbacks | ✓ SATISFIED | `inferredFrom()` helper; old ganztag→verified afterSchoolCare pattern removed |
| DATA-03 | 01-02 | Coverage score reflects only independently cited evidence | ✓ SATISFIED | v2 verified-only numerator; level-aware denominators |
| DATA-04 | 01-02, 01-03 | Directory vs detailed distinguished in data and UI | ✓ SATISFIED | `coverageLevel` on all records; SchoolCard badges; tier labels; no unsupported detailed card claims |
| DATA-05 | 01-03 | Replace synthetic/M2 scaffolding copy | ✓ SATISFIED | Homepage, directory header, schools metadata updated; scoped production paths clean |
| DATA-06 | 01-03 | Isolate synthetic fixtures from production paths | ✓ SATISFIED | `getSyntheticSchools` removed; pages use `getSchoolDirectoryItems` only |

**Orphaned requirements:** None — all six Phase 1 requirement IDs appear in plan frontmatter and are satisfied.

### Anti-Patterns Found

| File | Line | Pattern | Severity | Impact |
| ---- | ---- | ------- | -------- | ------ |
| `lichtenbergPrimarySchools/index.ts` | 65–72 | Dead `notApplicable()` helper (unused after refactor) | ℹ️ Info | No runtime impact; safe cleanup candidate |
| `src/app/guides/m2-smoke/page.tsx` | 1–12 | Legacy M2-named route still exists | ℹ️ Info | Not linked from homepage; visible MDX content has no M2/synthetic wording; deferred to Phase 3 |
| `e2e/smoke.spec.ts` | 9–10 | Expects homepage link "Abrir página MDX" to `/guides/m2-smoke` | ⚠️ Warning | Homepage CTA changed to `/schools` in 01-03; e2e test likely stale (REL-03 is Phase 8) |

### Human Verification Required

### 1. SchoolCard trust UX

**Test:** Open `/schools` and inspect cards for Bernhard-Grzimek, Lew-Tolstoi, and Richard-Wagner.  
**Expected:** Perfil básico badge; Pesquisa básica tier in coverage box; Richard-Wagner shows verified Inspeção oficial; Bernhard-Grzimek omits Willkommensklasse.  
**Why human:** Layout, typography, and omission of inferred fields require visual confirmation.

### 2. Homepage honest messaging

**Test:** Open `/` and review copy and primary CTA.  
**Expected:** Berlin School Guide eyebrow; no M2 or synthetic wording; button links to `/schools`.  
**Why human:** Visual presentation and navigation affordance.

### 3. Inferred field honesty on cards

**Test:** Compare Bernhard-Grzimek card (inferred afterSchoolCare in data) with Lew-Tolstoi (independently verified afterSchoolCare).  
**Expected:** Ganztag shown as verified on both; afterSchoolCare not falsely shown as verified on Bernhard-Grzimek card.  
**Why human:** Trust UX for inferred vs independently confirmed fields.

### Gaps Summary

No automated gaps block phase goal achievement. All 11 must-haves verified against the codebase. Implementation delivers honest evidence marking (`verified` / `not_confirmed` / `missing`), explicit cross-field inference via `inferredFrom()`, and level-aware coverage v2 scoring.

Post-audit, all 10 real schools are classified `directory_only` / `directory` (formerly-detailed schools downgraded per D-19 threshold). The detailed tier is implemented and unit-tested but not represented in live Lichtenberg data — deferred to Phase 4 for fuller profiles.

Three human verification items remain for visual trust UX confirmation before treating the phase as fully closed.

---

_Verified: 2026-07-11T11:04:00Z_  
_Verifier: Claude (gsd-verifier)_
