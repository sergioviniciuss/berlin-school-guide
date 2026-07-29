---
phase: 13-evidence-tag-schema-layer
reviewed: 2026-07-29T17:55:00Z
depth: standard
files_reviewed: 14
files_reviewed_list:
  - src/features/evidence/sourceTypes/index.ts
  - src/features/evidence/source/fixtures.ts
  - src/features/evidence/validateFieldCitations/index.ts
  - src/features/evidence/formatSourceType/index.ts
  - src/features/schools/collectCitedSources/index.ts
  - docs/RESEARCH.md
  - src/features/evidence/independenceLog/index.ts
  - src/features/evidence/tagCitation/index.ts
  - src/features/schools/tagTaxonomy/index.ts
  - src/features/evidence/formatTagConfidence/index.ts
  - src/features/evidence/validateTagEvidence/index.ts
  - src/features/evidence/validateTagEvidence/fixtures.ts
  - src/features/schools/school/index.ts
  - src/features/schools/school/fixtures.ts
findings:
  critical: 0
  warning: 0
  info: 2
  total: 2
status: issues_found
---

# Phase 13: Code Review Report

**Reviewed:** 2026-07-29T17:55:00Z
**Depth:** standard
**Files Reviewed:** 14
**Status:** issues_found

## Summary

Phase 13’s evidence/tag schema layer is solid: source-type allowlisting correctly blocks community from factual verification, `validateTagEvidence` matches D-07–D-10 / Pattern 5 (triangulation, independence logs, never-sole-basis, bidirectional confidence), and `schoolSchema` wires optional tags with conditional `qualitativeLastReviewed` without breaking untagged schools. `docs/RESEARCH.md` Reliability Levels correctly treat `triangulated_community` as a source type, not a reliability value. No critical or warning defects found; two low-severity maintainability notes only.

## Info

### IN-01: Duplicate tag taxonomy IDs allowed on a school

**File:** `src/features/schools/school/index.ts:58-59`
**Issue:** `tags` is `z.array(schoolTagSchema).optional()` with no uniqueness refine on `id`. A school can carry two `stem-focus` (or any ID) entries with different confidence/citations. Validators would accept both; Phase 15 UI could render duplicate chips.
**Fix:** Add a `superRefine` uniqueness check when tags are present:

```typescript
const tagIds = (school.tags ?? []).map((tag) => tag.id);
if (new Set(tagIds).size !== tagIds.length) {
  context.addIssue({
    code: "custom",
    path: ["tags"],
    message: "School tags must use unique taxonomy IDs.",
  });
}
```

### IN-02: Mixed-level verified-citation message not updated with allowlist wording

**File:** `src/features/schools/school/index.ts:125-127`
**Issue:** Phase 13 updated the general verified-field message to mention primary/secondary reliability and allowlisted source types (lines 98–100), but the mixed-level `primarySectionDescription` branch still says only “an acceptable source.” Same gate (`isAcceptableFactualEvidence`) runs; messaging is inconsistent for authors reading Zod errors.
**Fix:** Align the message with the main allowlist wording:

```typescript
message:
  "Verified primary section descriptions must cite at least one acceptable factual source (primary/secondary reliability and an allowlisted source type).",
```

---

_Reviewed: 2026-07-29T17:55:00Z_
_Reviewer: Claude (gsd-code-reviewer)_
_Depth: standard_
