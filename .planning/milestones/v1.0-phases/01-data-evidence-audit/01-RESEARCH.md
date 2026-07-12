# Phase 1 Research: Data & Evidence Audit

**Researched:** 2026-07-11  
**Phase:** 01-data-evidence-audit  
**Requirements:** DATA-01, DATA-02, DATA-03, DATA-04, DATA-05, DATA-06

## Executive Summary

Phase 1 is a brownfield data-integrity pass over 10 real Lichtenberg schools already wired to production via `getRealSchools() → getSchoolDirectoryItems() → SchoolDirectory`. The core problem is **implicit cross-field verification reuse** in `primarySchool()` that inflates `verified` counts and misleads parents. Fixes cluster into four workstreams: (1) explicit inference helper + per-school audit, (2) coverage v2 with level-aware denominators, (3) directory UI signaling, (4) honest copy + synthetic path isolation.

## Current State

### Production data flow

```
realLichtenbergPrimarySchools (10 schools)
  → getRealSchools() [schoolDirectoryData/index.ts]
  → toSchoolDirectoryItem() + calculateEvidenceCoverage()
  → SchoolDirectory → SchoolCard
```

### Known fallback bugs (must fix)

| Location | Issue | Impact |
|----------|-------|--------|
| `lichtenbergPrimarySchools/index.ts:144-148` | `afterSchoolCare` reuses `ganztag` value + portrait evidence as `verified` | 7/10 schools show verified after-school care without independent research |
| `lichtenbergPrimarySchools/index.ts:167-176` | `schoolProfile` / `pedagogyFocus` reuse `offers[]` with portrait `verified` | Directory-only schools appear deeply researched |
| `lichtenbergPrimarySchools/index.ts:150-165` | `bilingualPrograms` / `internationalPrograms` default to `not_applicable` from silence | Violates D-26/D-28 — should be `missing` until explicitly verified |
| `lichtenbergPrimarySchools/index.ts:181-186` | `inspectionAvailability` defaults to `not_confirmed` with portrait citation for all directory-only schools | Should be `missing` per D-07 |
| `schoolDirectoryData/index.ts:44` | `"Escola sintética sem nome"` fallback in production mapper | Synthetic wording in production path |
| `schoolDirectoryData/index.ts:26-28` | `getSyntheticSchools()` exported from production module | Risk of synthetic data leaking to pages |

### Coverage algorithm (v1)

- File: `src/features/evidence/calculateEvidenceCoverage/index.ts`
- Uses flat `importantSchoolFieldPathsV1` (23 fields) for all schools regardless of `research.coverageLevel`
- Counts only `verified` in numerator; excludes `not_applicable` from denominator
- **Does not exclude `not_confirmed`** — but inferred fields are currently marked `verified`, so the bug is upstream in data
- v1 baseline test: directory-only fixture = 43% (10/23 verified)

### UI touchpoints

| File | Current | Target |
|------|---------|--------|
| `SchoolCard/index.tsx` | Shows 6 facts including unverified fields; coverage box says "% verificada" only | Badge (Perfil básico/detalhado), tier label (Pesquisa básica/detalhada), hide missing/inferred fields on cards |
| `SchoolDirectory/index.tsx:104-112` | "escolas sintéticas" copy | Honest Berlin-wide framing, Lichtenberg as initial district |
| `src/app/schools/page.tsx:8-9` | metadata mentions "escolas sintéticas" | Honest partial-coverage description |
| `src/app/page.tsx` | M2 eyebrow, link to `/guides/m2-smoke` only | Remove M2 framing, link to `/schools` |

### School research levels (pre-audit)

| School | Current `coverageLevel` | Notes |
|--------|-------------------------|-------|
| Adam-Ries, Lew-Tolstoi, Richard-Wagner | `detailed` | Must re-earn status after audit |
| Other 7 | `directory` (default) | Portrait-only research |

## Recommended Implementation Approach

### 1. `inferredFrom()` helper (D-08)

Create colocated helper under the real-school builder:

```
src/content/schools/real/lichtenbergPrimarySchools/inferredFrom/
├── index.ts
├── index.test.ts
└── types.ts
```

API shape:

```typescript
inferredFrom({
  value: string,
  sourceField: "ganztag" | "offers",
  sourceEvidence: FieldEvidence,
  note: string, // mandatory Portuguese note
}): FieldEvidence // status: "not_confirmed"
```

Use for `afterSchoolCare` (from ganztag), `schoolProfile`/`pedagogyFocus` (from offers) when value is helpful but not independently verified.

### 2. Coverage v2 (D-09–D-14)

- Bump `evidenceCoverageVersion` to `"v2"` in `src/features/schools/school/constants.ts`
- Add two field path arrays:
  - `importantSchoolFieldPathsDirectoryV2` (~12 fields: identity, location, ganztag, languages)
  - `importantSchoolFieldPathsDetailedV2` (full 23-field set from v1)
- Update `calculateEvidenceCoverage(school)` to select denominator by `school.research.coverageLevel`
- Numerator: only `verified` (unchanged); `not_confirmed` never counts
- Add `coverageTierLabel` helper returning `"Pesquisa básica"` | `"Pesquisa detalhada"`

### 3. SchoolDirectoryItem extensions (D-15–D-17)

Add to `filterSchools/types.ts`:

```typescript
coverageLevel: "directory" | "detailed";
researchStatus: School["research"]["status"];
coverageTierLabel: "Pesquisa básica" | "Pesquisa detalhada";
```

Map in `toSchoolDirectoryItem()`. SchoolCard shows badge + tier; hide facts where status is `missing` or value is null (D-16). Profile CTA: link to `/schools/${slug}` with honest label — route doesn't exist yet (Phase 4), so use `"Ver perfil (em breve)"` as disabled text or a `<span>` with aria-disabled until Phase 4 ships (planner choice: non-link honest label).

### 4. Per-school audit checklist

For each of 10 schools, re-check against:
- Official Berlin portrait URL (`bildung.berlin.de/Schulverzeichnis/...`)
- School website sources already in record (detailed schools)
- `docs/research/REAL_SCHOOL_RESEARCH_SPIKE.md` baseline

Correct: evidence status, inference notes, `research.coverageLevel` downgrade if detailed bar not met, `not_applicable` only with explicit negative evidence.

### 5. Synthetic isolation (D-25)

- Move `getSyntheticSchools` to test-only import path OR unexport and import fixtures directly in test
- Replace production name fallback with throw or empty string + test-only path
- Grep guard: no `sintétic|synthetic|getSyntheticSchools` in `src/app/` or production exports

## File Modification Map

| File | Plans |
|------|-------|
| `src/content/schools/real/lichtenbergPrimarySchools/inferredFrom/*` | 01-01 |
| `src/content/schools/real/lichtenbergPrimarySchools/index.ts` | 01-01 |
| `src/features/schools/school/constants.ts` | 01-02 |
| `src/features/evidence/calculateEvidenceCoverage/*` | 01-02 |
| `src/features/schools/filterSchools/types.ts` | 01-02, 01-03 |
| `src/features/schools/schoolDirectoryData/index.ts` | 01-02, 01-03 |
| `src/features/schools/SchoolCard/*` | 01-03 |
| `src/features/schools/SchoolDirectory/index.tsx` | 01-03 |
| `src/app/schools/page.tsx` | 01-03 |
| `src/app/page.tsx` | 01-03 |

## Risks and Mitigations

| Risk | Mitigation |
|------|------------|
| Coverage percentages drop sharply post-audit | Expected — update disclaimer copy (D-14); tier labels explain level difference |
| Filter tests assume old coverage ranges | Update fixture expectations in `calculateEvidenceCoverage/index.test.ts` |
| `/schools/[slug]` doesn't exist | Non-navigating CTA or "em breve" label per D-17 |
| Reclassifying detailed schools breaks narrative | Document in commit; three candidates must earn detailed status with independent citations |

## Validation Architecture

### Framework

- **Unit tests:** Jest (`pnpm test`)
- **Data validation:** `pnpm validate:data` (Zod schema + citation existence)
- **Typecheck:** `pnpm typecheck`
- **Quick run:** `pnpm test -- --testPathPattern="calculateEvidenceCoverage|inferredFrom|schoolDirectoryData"`
- **Full suite:** `pnpm test && pnpm validate:data && pnpm typecheck`

### Critical test scenarios

1. `inferredFrom()` returns `not_confirmed` with mandatory note
2. Coverage v2: directory school denominator < detailed school denominator
3. `not_confirmed` fields excluded from coverage numerator
4. `getSyntheticSchools` not importable from production pages (grep + test)
5. Real schools: no field has `verified` status with cross-topic citation reuse after audit

### Manual verification

- Visual check of `/schools` directory: badges, tier labels, no synthetic copy
- Spot-check 2 directory-only + 1 detailed school card field display

## RESEARCH COMPLETE
