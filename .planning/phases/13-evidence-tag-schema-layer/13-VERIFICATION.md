---
phase: 13-evidence-tag-schema-layer
verified: 2026-07-29T17:59:09Z
status: passed
score: 5/5 must-haves verified
overrides_applied: 0
re_verification: false
---

# Phase 13: Evidence & Tag Schema Layer Verification Report

**Phase Goal:** The data model can represent structured, cited tags and triangulated community evidence, with validation rules enforced before any real content is authored.
**Verified:** 2026-07-29T17:59:09Z
**Status:** passed
**Re-verification:** No — initial verification

## Goal Achievement

### Observable Truths

| # | Truth | Status | Evidence |
| --- | --- | --- | --- |
| 1 | `schoolSchema` supports an optional tags collection where each tag references a taxonomy id, carries a confidence tier, and cites at least one evidence source | ✓ VERIFIED | `tags: z.array(schoolTagSchema).optional()` on `schoolSchema`; `schoolTagSchema` requires `id` (closed 10-id enum), `confidence`, `citations.min(1)`. Untagged fixtures parse; tagged synthetic school parses. |
| 2 | `sourceTypeSchema`/`reliabilityLevelSchema` support `journalism` and a displayable triangulated-community source type, distinct from the reserved-only anecdotal tier | ✓ VERIFIED | `sourceTypeSchema` includes `journalism`, `triangulated_community`, `anecdotal_reserved`. `reliabilityLevelSchema` remains `primary\|secondary\|anecdotal\|unknown` (community is not a reliability value). `formatSourceType` returns PT-BR for journalism/community and `null` for `anecdotal_reserved`. Factual allowlist excludes community. |
| 3 | A `validateTagEvidence` rule rejects any tag whose only evidence is a single, non-corroborated community source, and requires an independence-log entry for community-sourced tags | ✓ VERIFIED | Rejects community-only and &lt;2 community sourceIds; rejects missing `independenceLog`; requires ≥1 allowlisted non-community cite for `active-school-community`. Wired into `schoolSchema.superRefine`. Spot-check: community-only → `ok: false`; valid triangulation → `ok: true`. |
| 4 | Each tag's confidence label is drawn from a fixed, qualitative vocabulary that code and documentation both describe as evidence strength, not school quality | ✓ VERIFIED | `tagConfidenceSchema`: `confirmed_multi_source \| confirmed_official \| partial`. `formatTagConfidence` locks PT-BR labels. `methodology.mdx` states rótulo = força da evidência, não qualidade da escola. `docs/DATA_MODEL.md` states evidence strength, never school quality. Bidirectional confidence↔citation consistency enforced in `validateTagEvidence`. |
| 5 | Fixture-based unit tests demonstrate both valid and invalid tag/evidence combinations are correctly accepted or rejected | ✓ VERIFIED | `validateTagEvidence/index.test.ts` (11 cases) + fixtures matrix; `school/index.test.ts` tagged accept/reject cases; 141 related Jest tests passed. |

**Score:** 5/5 truths verified

### Required Artifacts

| Artifact | Expected | Status | Details |
| -------- | -------- | ------ | ------- |
| `src/features/evidence/sourceTypes/index.ts` | Extended source types + factual allowlist | ✓ VERIFIED | Exists, substantive, exported; wired into `validateFieldCitations` / `validateTagEvidence` |
| `src/features/evidence/formatSourceType/index.ts` | PT-BR labels for new types | ✓ VERIFIED | journalism + triangulated_community labeled; anecdotal → null |
| `docs/RESEARCH.md` | Corrected Reliability Levels (D-06) | ✓ VERIFIED | Four reliability bullets present; explicitly states community is a `sourceType`, not a reliability value. SDK pattern `"primary \| secondary \| anecdotal \| unknown"` is a false negative (values documented as separate bullets). |
| `src/features/evidence/independenceLog/index.ts` | independenceLogSchema | ✓ VERIFIED | venue, identifier, dateAccessed, independenceRationale, echoCheckNote |
| `src/features/evidence/tagCitation/index.ts` | tagCitationSchema + optional independenceLog | ✓ VERIFIED | Nested optional log; wired into `schoolTagSchema` |
| `src/features/schools/tagTaxonomy/index.ts` | taxonomy, confidence, schoolTagSchema | ✓ VERIFIED | 10 IDs; confidence enum; citations.min(1); formatTagId |
| `src/features/evidence/formatTagConfidence/index.ts` | D-17 PT-BR labels | ✓ VERIFIED | Three locked labels; unit tests |
| `src/features/evidence/validateTagEvidence/index.ts` | Pure triangulation validator | ✓ VERIFIED | sourceById map; allowlist corroboration; confidence derive |
| `src/features/evidence/validateTagEvidence/index.test.ts` | Valid/invalid matrix | ✓ VERIFIED | 101 lines; accept + reject coverage |
| `src/features/schools/school/index.ts` | optional tags + qualitativeLastReviewed + superRefine | ✓ VERIFIED | validateTagEvidence loop; review date required when tags.length &gt; 0 |
| `src/features/schools/school/fixtures.ts` | Synthetic tagged fixtures | ✓ VERIFIED | validTaggedSchool, invalidTaggedWithoutReviewDate, invalidCommunityOnlyTag |
| `src/features/schools/school/index.test.ts` | TAG-01 integration tests | ✓ VERIFIED | empty tags, tagged+date, missing date, community-only reject |

### Key Link Verification

| From | To | Via | Status | Details |
| ---- | --- | --- | ------ | ------- |
| `validateFieldCitations` | `sourceTypes` | `isAcceptableFactualEvidence` | ✓ WIRED | Import + call in citation acceptability check |
| `collectCitedSources` | SourceType order | `journalism` / `triangulated_community` | ✓ WIRED | Both present in `SOURCE_TYPE_ORDER` |
| `tagCitation` | `independenceLog` | optional field | ✓ WIRED | `independenceLog: independenceLogSchema.optional()` |
| `tagTaxonomy` | `tagCitation` | citations.min(1) | ✓ WIRED | `z.array(tagCitationSchema).min(1)` |
| `validateTagEvidence` | `school.sources[]` | Map by sourceId | ✓ WIRED | `sourceById = new Map(sources.map(...))` (SDK path miss; manual verify) |
| `validateTagEvidence` | factual allowlist | `acceptableFactualSourceTypes` | ✓ WIRED | Import used for non-community corroboration (SDK path miss; manual verify) |
| `schoolSchema.superRefine` | `validateTagEvidence` | loop over tags | ✓ WIRED | Lines 132–139 school/index.ts |
| `schoolSchema.superRefine` | `qualitativeLastReviewed` | required when tags non-empty | ✓ WIRED | Lines 141–148 school/index.ts |

### Data-Flow Trace (Level 4)

| Artifact | Data Variable | Source | Produces Real Data | Status |
| -------- | ------------- | ------ | ------------------ | ------ |
| `schoolSchema` tags | `school.tags` / citations → sources | Author-supplied school records + Zod parse | Real schema path; no hollow hardcoded empty tags on real schools (intentionally omitted until Phase 14) | ✓ FLOWING (validation path) |
| `validateTagEvidence` | `tag` + `sources` | Callers pass school tag + `school.sources` | Fixture sources and school fixtures supply real shapes | ✓ FLOWING |
| `formatTagConfidence` / `formatSourceType` | enum → label maps | Static Record maps | Locked vocabulary (not empty stubs) | ✓ FLOWING |

Note: Real Lichtenberg schools remain untagged by design (Phase 14 authors content). Schema accepts omission; gates fire when tags are present — verified via synthetic fixtures.

### Behavioral Spot-Checks

| Behavior | Command | Result | Status |
| -------- | ------- | ------ | ------ |
| Phase unit tests | `pnpm exec jest --testPathPatterns='sourceTypes\|...\|validateTagEvidence\|features/schools/school'` | 19 suites, 141 tests passed | ✓ PASS |
| `pnpm validate:data` | validateSchools | Validated 2 fixtures + 10 real schools | ✓ PASS |
| Community-only reject | tsx spot-check `validateTagEvidence(communityOnlyTag, …)` | `ok: false` (never sole basis) | ✓ PASS |
| Triangulated accept | tsx spot-check valid community tag | `ok: true` | ✓ PASS |
| School omit tags / tagged / invalid | tsx `schoolSchema.safeParse` | omit ✓, tagged ✓, missing review ✗, community-only ✗ | ✓ PASS |

### Requirements Coverage

| Requirement | Source Plan | Description | Status | Evidence |
| ----------- | ---------- | ----------- | ------ | -------- |
| TAG-01 | 13-02, 13-04 | Structured tags with per-tag citations and evidence status | ✓ SATISFIED | `schoolTagSchema` + optional `school.tags` + confidence + citations |
| TAG-02 | 13-01 | Journalism + displayable triangulated-community tier | ✓ SATISFIED | Extended `sourceTypeSchema`, format labels, factual allowlist excludes community |
| TAG-03 | 13-03, 13-04 | ≥2 independent community sources, independence log, never sole basis | ✓ SATISFIED | `validateTagEvidence` + school superRefine |
| TAG-04 | 13-02, 13-03 | Qualitative confidence = evidence strength, not school quality | ✓ SATISFIED | Enum + formatTagConfidence + methodology/DATA_MODEL copy + consistency check |

No orphaned requirements: REQUIREMENTS.md maps TAG-01–04 exclusively to Phase 13; all claimed by plans.

### Anti-Patterns Found

| File | Line | Pattern | Severity | Impact |
| ---- | ---- | ------- | -------- | ------ |
| `formatSourceType/index.ts` | 14 | `return null` for `anecdotal_reserved` | ℹ️ Info | Intentional — reserved tier must not display |
| — | — | TODO/FIXME/placeholder stubs in phase artifacts | — | None found |
| `school/index.ts` | 58 | No unique-tag-id refine | ℹ️ Info | Code review IN-01; does not break Phase 13 goal (duplicate IDs not required by SC) |

### Human Verification Required

None. This phase is schema/validation-only; acceptance is fully covered by Zod contracts, unit fixtures, and `pnpm validate:data`. UI rendering of tags is Phase 15.

### Gaps Summary

No gaps. All five roadmap success criteria verified against the codebase. SDK artifact check false-negative on `docs/RESEARCH.md` pipe-separated pattern; content is correct. SDK key-link misses for plans 03/04 were path-resolution artifacts; manual wiring confirmed.

---

_Verified: 2026-07-29T17:59:09Z_
_Verifier: Claude (gsd-verifier)_
