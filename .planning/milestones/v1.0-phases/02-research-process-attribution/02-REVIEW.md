---
phase: 02-research-process-attribution
reviewed: 2026-07-11T12:04:00Z
depth: standard
files_reviewed: 8
files_reviewed_list:
  - docs/research/SCHOOL_RESEARCH_WORKFLOW.md
  - src/features/schools/validateResearchDates/index.ts
  - src/features/schools/validateSchools/index.ts
  - src/features/schools/school/index.ts
  - src/content/schools/real/lichtenbergPrimarySchools/index.ts
  - src/content/guides/methodology.mdx
  - src/app/methodology/page.tsx
  - src/features/schools/SchoolDirectory/index.tsx
findings:
  critical: 0
  warning: 1
  info: 3
  total: 4
status: warnings
---

# Phase 02: Code Review Report

**Reviewed:** 2026-07-11T12:04:00Z
**Depth:** standard
**Files Reviewed:** 8
**Status:** warnings

## Summary

Phase 02 delivers a coherent research-attribution stack: an executable workflow doc, real-school date validation wired into `validate:data`, audited Lichtenberg school metadata, and a parent-facing `/methodology` page linked from the directory header. `pnpm validate:data` passes for all 10 real schools; `validateResearchDates` unit tests pass; methodology MDX labels match `formatFieldStatus` and `getCoverageTierLabel` strings.

No critical security or crash risks were found. One warning: the `primarySchool()` builder defaults `lastSourceChecked` from all sources in `sources[]`, while the workflow doc and `validateResearchDates` logic assume cited sources only — a latent metadata drift risk when uncited sources carry newer `dateAccessed` values. Remaining items are documentation accuracy and maintainability suggestions.

## Warnings

### WR-01: `lastSourceChecked` default uses all sources, not cited sources

**File:** `src/content/schools/real/lichtenbergPrimarySchools/index.ts:233`
**Issue:** `lastSourceChecked` defaults to `maxDateAccessed(sources)`, which considers every entry in `sources[]`. The workflow doc (line 171) defines `lastSourceChecked` as the max `dateAccessed` among **cited** sources, and `validateResearchDates` only validates against cited sources. Schools can include uncited sources (e.g. Adam-Ries lists `adam-ries-website` and `adam-ries-welcome-classes` without field citations). If a researcher adds an uncited source with a newer `dateAccessed`, `lastSourceChecked` will inflate beyond what citations support while still passing validation.
**Fix:** Derive the default from cited sources only, reusing the same walk as `validateResearchDates`:

```typescript
import { collectFieldEvidence } from "@/features/schools/school";

function maxCitedDateAccessed(school: Pick<School, "sources"> & { fields: School }): string {
  const citedIds = new Set(
    collectFieldEvidence(school).flatMap(({ evidence }) =>
      evidence.citations.map((c) => c.sourceId),
    ),
  );
  const cited = school.sources.filter((s) => citedIds.has(s.id));
  return maxDateAccessed(cited.length > 0 ? cited : school.sources);
}
```

Or compute `lastSourceChecked` after the school object is built and pass it explicitly per school during data entry.

## Info

### IN-01: Redundant min-date check in `validateResearchDates`

**File:** `src/features/schools/validateResearchDates/index.ts:46-56`
**Issue:** When `lastSourceChecked` is earlier than the oldest cited `dateAccessed`, both the min-date and max-date checks fail, emitting two errors for the same root cause. The min check is also logically redundant: requiring `lastSourceChecked >= max(cited dates)` already implies `lastSourceChecked >= min(cited dates)`.
**Fix:** Keep only the max-date check:

```typescript
if (compareDates(lastSourceChecked, maxDateAccessed) < 0) {
  failures.push(
    `${school.id}: lastSourceChecked (${lastSourceChecked}) must be >= most recent cited source dateAccessed (${maxDateAccessed}).`,
  );
}
```

### IN-02: Workflow doc references wrong formatter name

**File:** `docs/research/SCHOOL_RESEARCH_WORKFLOW.md:109`
**Issue:** The evidence-status table says UI labels come from `formatSchoolField`, but the actual function exporting status labels is `formatFieldStatus` in `src/features/schools/formatSchoolField/index.ts`. Minor doc inaccuracy may confuse researchers grepping the codebase.
**Fix:** Replace `formatSchoolField` with `formatFieldStatus` (or note the module path: `formatSchoolField/formatFieldStatus`).

### IN-03: English evidence notes in Portuguese-facing content

**File:** `src/content/schools/real/lichtenbergPrimarySchools/index.ts:138,224,324,452`
**Issue:** Several `note` strings on field evidence remain in English (e.g. missing-research default, Lew-Tolstoi welcome-classes note, Adam-Ries inclusion note). Per `AGENTS.md` and `docs/EDITORIAL_GUIDE.md`, user-visible copy should be Brazilian Portuguese. Notes may surface in future detail-page rendering.
**Fix:** Translate evidence notes to Portuguese, matching the tone of existing PT-BR notes such as `afterSchoolCareInferredNote` and directory `inspectionAvailability` missing text.

---

_Reviewed: 2026-07-11T12:04:00Z_
_Reviewer: Claude (gsd-code-reviewer)_
_Depth: standard_
