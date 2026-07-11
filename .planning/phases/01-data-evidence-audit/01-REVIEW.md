---
phase: 01-data-evidence-audit
reviewed: 2026-07-11T11:04:00Z
depth: standard
files_reviewed: 15
files_reviewed_list:
  - src/content/schools/real/lichtenbergPrimarySchools/inferredFrom/index.ts
  - src/content/schools/real/lichtenbergPrimarySchools/inferredFrom/types.ts
  - src/content/schools/real/lichtenbergPrimarySchools/index.ts
  - src/features/evidence/fieldEvidence/index.ts
  - src/features/schools/formatSchoolField/index.ts
  - src/features/schools/school/constants.ts
  - src/features/evidence/calculateEvidenceCoverage/index.ts
  - src/features/schools/getCoverageTierLabel/index.ts
  - src/features/schools/filterSchools/types.ts
  - src/features/schools/schoolDirectoryData/index.ts
  - src/features/schools/SchoolCard/index.tsx
  - src/features/schools/SchoolCard/utils.ts
  - src/features/schools/SchoolDirectory/index.tsx
  - src/app/schools/page.tsx
  - src/app/page.tsx
findings:
  critical: 0
  warning: 3
  info: 4
  total: 7
status: issues_found
---

# Phase 01: Code Review Report

**Reviewed:** 2026-07-11T11:04:00Z
**Depth:** standard
**Files Reviewed:** 15
**Status:** issues_found

## Summary

Reviewed all non-test source files changed across plans 01-01, 01-02, and 01-03 for the data-evidence-audit phase. The core evidence-integrity work is sound: `inferredFrom()` correctly emits `not_confirmed` evidence, coverage v2 selects level-appropriate denominators and counts only `verified` fields in the numerator, and SchoolCard visibility rules hide missing facts while muting non-verified tones.

No security vulnerabilities or crash-level bugs were found in this static, build-time data pipeline. Findings are limited to data-integrity edge cases, a display inconsistency on the Ganztag fact, and minor code-quality items. `pnpm typecheck` passes.

## Warnings

### WR-01: Empty name fallback masks data integrity failures

**File:** `src/features/schools/schoolDirectoryData/index.ts:23`
**Issue:** `toSchoolDirectoryItem` maps `school.name.value ?? ""` when the name is null. A school record that slips through validation with a null name would render a blank `<h2>` in `SchoolCard` instead of surfacing the problem via a status label or build failure.
**Fix:** Prefer failing closed or showing evidence status when the value is absent:

```typescript
name:
  school.name.value ??
  formatFieldStatus(school.name.evidence.status),
```

Alternatively, keep the strict `schoolSchema` invariant that verified names are non-null and throw if `school.name.value` is null after parse.

### WR-02: Schema does not require a note on `not_confirmed` evidence

**File:** `src/features/evidence/fieldEvidence/index.ts:26-34`
**Issue:** `fieldEvidenceSchema.superRefine` enforces a mandatory `note` for `conflicting` status, but not for `not_confirmed`. The `inferredFrom()` helper enforces notes at runtime, yet hand-authored or future data paths can set `not_confirmed` without explanation and still pass `pnpm validate:data`.
**Fix:** Extend `superRefine` to mirror the conflicting rule:

```typescript
if (
  (evidence.status === "conflicting" || evidence.status === "not_confirmed") &&
  !evidence.note?.trim()
) {
  context.addIssue({
    code: "custom",
    path: ["note"],
    message:
      evidence.status === "conflicting"
        ? "Conflicting fields must explain the material conflict."
        : "Inferred or not-confirmed fields must explain why the value is not independently verified.",
  });
}
```

### WR-03: Ganztag fact bypasses status formatting for non-verified evidence

**File:** `src/features/schools/SchoolCard/index.tsx:54`
**Issue:** The Ganztag `Fact` uses `school.ganztag ?? formatFieldStatus(school.ganztagStatus)`. When `ganztag` is non-null but `ganztagStatus` is `not_confirmed` (or any non-`verified` status), the card shows the raw inferred string instead of the Portuguese status label (`"Informação inferida, não confirmada"`). Other facts route through `formatStringList` / `formatBoolean`, which correctly prefer `formatFieldStatus` when status is not `verified`. This is a latent inconsistency if inferred ganztag values are ever surfaced.
**Fix:** Align Ganztag with other facts:

```tsx
value={
  school.ganztagStatus === "verified" && school.ganztag !== null
    ? school.ganztag
    : formatFieldStatus(school.ganztagStatus)
}
```

## Info

### IN-01: Dead `notApplicable()` helper after refactor

**File:** `src/content/schools/real/lichtenbergPrimarySchools/index.ts:65-72`
**Issue:** `notApplicable()` is defined but no longer called anywhere in the module (noted in 01-01-SUMMARY as leftover from the audit refactor).
**Fix:** Remove the unused helper in a cleanup pass.

### IN-02: `sourceField` parameter is never validated or used

**File:** `src/content/schools/real/lichtenbergPrimarySchools/inferredFrom/types.ts:4` and `inferredFrom/index.ts:7-17`
**Issue:** `InferredFromInput.sourceField` documents intent but is ignored by `inferredFrom()`. Callers can pass a mismatched `sourceField` with no runtime check.
**Fix:** Either use `sourceField` in the returned evidence note prefix, or drop it from the type until cross-field validation exists.

### IN-03: English editorial note in Portuguese content layer

**File:** `src/content/schools/real/lichtenbergPrimarySchools/index.ts:209`
**Issue:** The default detailed-school inspection fallback note is in English (`"The official portrait was checked, but a specific inspection report was not confirmed for this spike."`) while surrounding notes and user-facing copy use Brazilian Portuguese.
**Fix:** Translate the note to Portuguese for consistency with `docs/EDITORIAL_GUIDE.md`.

### IN-04: Misleading return type on coverage path selector

**File:** `src/features/schools/school/constants.ts:55-60`
**Issue:** `getImportantFieldPathsForCoverage` always declares `readonly ImportantSchoolFieldPathDetailedV2[]` even when returning the 11-field directory set. Typecheck passes because directory paths are a subset of detailed paths, but the signature obscures the level-specific contract.
**Fix:** Use a union return type or a generic constrained to both path unions.

---

_Reviewed: 2026-07-11T11:04:00Z_
_Reviewer: Claude (gsd-code-reviewer)_
_Depth: standard_
