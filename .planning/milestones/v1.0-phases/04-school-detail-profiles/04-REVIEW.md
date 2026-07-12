---
phase: 04-school-detail-profiles
reviewed: 2026-07-11T19:45:00+02:00
depth: standard
files_reviewed: 26
files_reviewed_list:
  - src/features/schools/getSchoolBySlug/index.ts
  - src/features/schools/getSchoolBySlug/index.test.ts
  - src/features/schools/getSchoolFieldByPath/index.ts
  - src/features/schools/getSchoolFieldByPath/index.test.ts
  - src/features/schools/collectCitedSources/index.ts
  - src/features/schools/collectCitedSources/index.test.ts
  - src/features/schools/collectCitedSources/types.ts
  - src/features/evidence/formatSourceType/index.ts
  - src/features/evidence/formatSourceType/index.test.ts
  - src/features/schools/StatusBadge/index.tsx
  - src/features/schools/ProfileFieldRow/index.tsx
  - src/features/schools/ProfileFieldRow/index.test.tsx
  - src/features/schools/ProfileSection/index.tsx
  - src/features/schools/SchoolProfile/constants.ts
  - src/features/schools/SchoolProfile/index.tsx
  - src/features/schools/SchoolProfile/index.test.tsx
  - src/features/schools/SourcesSection/index.tsx
  - src/features/schools/SourcesSection/index.test.tsx
  - src/app/schools/[slug]/page.tsx
  - src/app/schools/[slug]/not-found.tsx
  - src/content/schools/real/lichtenbergPrimarySchools/index.ts
  - src/features/schools/SchoolCard/index.tsx
  - src/features/schools/SchoolCard/index.test.tsx
  - src/features/navigation/SiteHeader/index.tsx
  - src/features/navigation/SiteHeader/index.test.tsx
  - e2e/smoke.spec.ts
findings:
  critical: 0
  high: 0
  medium: 0
  low: 4
  total: 4
status: issues_found
---

# Phase 4: Code Review Report

**Reviewed:** 2026-07-11T19:45:00+02:00
**Depth:** standard
**Files Reviewed:** 26
**Status:** issues_found

## Summary

Phase 4 delivers a solid static school-profile stack: slug lookup, field-path resolution, citation aggregation, profile UI primitives, `/schools/[slug]` static route with `dynamicParams = false`, directory card navigation, and header active-state handling. Security patterns are sound — external links use `rel="noopener noreferrer"`, React text escaping is used throughout (no `dangerouslySetInnerHTML`), and data flows from validated static sources.

No critical or high-severity bugs were found. Four low-severity items remain: dead imports in `SourcesSection`, a React key edge case in citation links, metadata that may echo unverified district values, and a minor static-route helper inconsistency. Accessibility is generally good (SchoolCard `aria-label`, semantic headings, Fontes anchors); no blocking a11y defects were identified.

## Critical Issues

None.

## High Issues

None.

## Medium Issues

None.

## Low Issues

### LO-01: Unused imports in SourcesSection

**File:** `src/features/schools/SourcesSection/index.tsx:1-8`
**Issue:** Four imports (`Link`, `calculateEvidenceCoverage`, `formatFieldStatus`, `getCoverageTierLabel`) are never used. ESLint reports `@typescript-eslint/no-unused-vars` warnings. Likely leftover from an earlier draft.
**Fix:** Remove the unused imports.

```typescript
import { ExternalLink } from "lucide-react";

import { formatSourceType } from "@/features/evidence/formatSourceType";
import type { GroupedCitedSources } from "@/features/schools/collectCitedSources";
```

### LO-02: Duplicate React keys when one field cites the same source twice

**File:** `src/features/schools/ProfileFieldRow/index.tsx:47-54`
**Issue:** Citation links use `key={citation.sourceId}`. If a single field's `evidence.citations` array contains two entries with the same `sourceId` (allowed by schema), React emits duplicate-key warnings and link reconciliation may be incorrect.
**Fix:** Use a composite key including the index:

```tsx
{evidence.citations.map((citation, index) => {
  const source = sourceById.get(citation.sourceId);
  if (!source) return null;

  return (
    <span key={`${citation.sourceId}-${index}`} className="inline-flex gap-x-4">
      {/* ... */}
    </span>
  );
})}
```

### LO-03: generateMetadata may include unverified district in description

**File:** `src/app/schools/[slug]/page.tsx:21-24`
**Issue:** Metadata description uses `school.location.district.value ?? "Berlim"` without checking `evidence.status`. If a district value exists but is not verified, the SEO description could present it as factual — inconsistent with the product's evidence-first positioning.
**Fix:** Mirror the hero pattern in `SchoolProfile`:

```typescript
const district =
  school.location.district.evidence.status === "verified" &&
  school.location.district.value
    ? school.location.district.value
    : "Berlim";
```

### LO-04: generateStaticParams bypasses getAllSchoolSlugs helper

**File:** `src/app/schools/[slug]/page.tsx:9-11`
**Issue:** `generateStaticParams` calls `getRealSchools().map(...)` directly while `getAllSchoolSlugs()` exists for the same purpose (added in 04-01). If slug derivation logic ever diverges, static params and runtime lookup could drift.
**Fix:**

```typescript
import { getAllSchoolSlugs } from "@/features/schools/getSchoolBySlug";

export function generateStaticParams() {
  return getAllSchoolSlugs().map((slug) => ({ slug }));
}
```

---

_Reviewed: 2026-07-11T19:45:00+02:00_
_Reviewer: Claude (gsd-code-reviewer)_
_Depth: standard_
