---
phase: 09-onboarding-guide-visual-foundation
reviewed: 2026-07-12T20:55:00Z
depth: standard
files_reviewed: 18
files_reviewed_list:
  - e2e/onboarding.spec.ts
  - package.json
  - src/app/globals.css
  - src/app/guides/german-education-system/page.tsx
  - src/content/guides/german-education-system.mdx
  - src/features/guides/BerlinCallout/index.test.tsx
  - src/features/guides/BerlinCallout/index.tsx
  - src/features/guides/BerlinCallout/types.ts
  - src/features/guides/EducationTimeline/EducationTimelineDesktop.tsx
  - src/features/guides/EducationTimeline/EducationTimelineMobile.tsx
  - src/features/guides/EducationTimeline/TimelineNode.tsx
  - src/features/guides/EducationTimeline/constants.ts
  - src/features/guides/EducationTimeline/fixtures.ts
  - src/features/guides/EducationTimeline/index.test.tsx
  - src/features/guides/EducationTimeline/index.tsx
  - src/features/guides/EducationTimeline/types.ts
  - src/features/guides/GlossaryTerm/index.test.tsx
  - src/features/guides/GlossaryTerm/index.tsx
  - src/mdx-components.tsx
findings:
  critical: 0
  warning: 1
  info: 2
  total: 3
status: issues_found
---

# Phase 9: Code Review Report

**Reviewed:** 2026-07-12T20:55:00Z
**Depth:** standard
**Files Reviewed:** 18
**Status:** issues_found

## Summary

Reviewed all source files added/changed for Phase 9 (Onboarding Guide Visual Foundation): `BerlinCallout`, `GlossaryTerm`, `EducationTimeline` (+ `TimelineNode`, desktop/mobile layouts), MDX wiring, the new `/guides/german-education-system` route, and the Playwright coverage in `e2e/onboarding.spec.ts`.

Verification performed beyond static reading:
- Full unit test suite: **60 suites / 280 tests passed**.
- `tsc --noEmit`: clean, no type errors.
- `eslint .`: 7 pre-existing warnings, all in files outside Phase 9 scope — none introduced by this phase.
- Cross-checked `anchorHref` values in `EducationTimeline/constants.ts` against the MDX `## O caminho da Kita à universidade` heading through `slugifyHeading` — the generated `id` (`o-caminho-da-kita-a-universidade`) matches exactly, so on-page anchor links resolve correctly.
- Confirmed the "two full render trees toggled by Tailwind `hidden`/`lg:` classes" pattern (`EducationTimeline/index.tsx`) matches an existing, established convention already used in `SchoolDirectory` and `SchoolComparison`, so it is not flagged as a new issue.

One warning was found: a reusable component uses a hardcoded DOM id that will collide if the component is rendered more than once on the same page — a realistic risk once Phase 10 adds full editorial content. Two minor maintainability notes are also included for awareness.

## Warnings

### WR-01: `BerlinCallout` summary variant uses a hardcoded `id`, risking duplicate-id collisions

**File:** `src/features/guides/BerlinCallout/index.tsx:17-21`
**Issue:** The `variant="summary"` box hardcodes `aria-labelledby="berlin-em-destaque-heading"` and `id="berlin-em-destaque-heading"`. `BerlinCallout` is registered as a public MDX component (`src/mdx-components.tsx`), so any guide's MDX content can invoke `<BerlinCallout variant="summary">` more than once on the same page. Phase 10 is explicitly scoped to add full Kita→Uni editorial content to this same route, and nothing in the component or its types prevents multiple summary boxes appearing together (e.g., one per major transition point). If that happens, the page will contain duplicate `id` attributes (invalid HTML) and `aria-labelledby` will resolve ambiguously for assistive technology (per spec, `aria-labelledby` referencing a duplicated id has undefined behavior across browsers/screen readers).

The codebase already has an established fix for exactly this class of problem: `ComparisonEvidenceNote` uses `useId()` to generate a per-instance id for its `aria-*` reference.

**Fix:**
```tsx
import { useId } from "react";
import Link from "next/link";

import type { BerlinCalloutProps } from "./types";

export function BerlinCallout(props: BerlinCalloutProps) {
  const headingId = useId();

  if (props.variant === "inline") {
    // ...unchanged...
  }

  return (
    <aside
      aria-labelledby={headingId}
      className="rounded-lg border border-neutral-200 border-l-4 border-l-primary bg-blue-50/40 p-5"
    >
      <p
        id={headingId}
        className="text-sm font-semibold uppercase tracking-wide text-blue-800"
      >
        Berlin em destaque
      </p>
      {/* ...unchanged... */}
    </aside>
  );
}
```

## Info

### IN-01: Duplicated "find the branching stage" logic between desktop and mobile layouts

**File:** `src/features/guides/EducationTimeline/EducationTimelineDesktop.tsx:13-16`, `src/features/guides/EducationTimeline/EducationTimelineMobile.tsx:18-21`
**Issue:** Both files contain the identical snippet:
```ts
const branchingStage = trunk.find(
  (stage) => (stage.branches?.length ?? 0) > 0,
);
const branches = branchingStage?.branches ?? [];
```
Per `AGENTS.md`, shared helpers should emerge once at least two concrete use cases exist — that threshold is now met by these two sibling layout components.
**Fix:** Extract a small helper (e.g. `getBranches(trunk: TimelineStage[]): TimelineStage[]` in a colocated `utils.ts` inside `EducationTimeline/`) and import it from both `EducationTimelineDesktop.tsx` and `EducationTimelineMobile.tsx`.

### IN-02: Mobile branch-picker assumes exactly one branching stage, always Grundschule

**File:** `src/features/guides/EducationTimeline/EducationTimelineMobile.tsx:37-39`
**Issue:** The decision-point label is hardcoded as `"Escolha do percurso após a Grundschule"`, and the branch-lookup logic (`IN-01`) only ever surfaces the *first* trunk stage with `branches`. This matches the Phase 9 `09-UI-SPEC.md` copywriting contract exactly (locked copy, intentional for this phase), so it is not a bug today — `DEMO_TRUNK` only ever has one branching stage (Grundschule). It is worth flagging for future maintainers: if a later phase adds a second decision point elsewhere in the trunk (e.g., after Realschule/Ausbildung), this label and the "first branching stage" lookup will silently show stale or incomplete copy without a type error or test failure.
**Fix:** No change required for Phase 9. Consider adding a short comment above the label (e.g. `// Phase 9 assumes a single branching stage (Grundschule); revisit if additional decision points are added.`) so the assumption is explicit rather than implicit, or deriving the stage name from `branchingStage?.name` if/when a second branch point is introduced.

---

_Reviewed: 2026-07-12T20:55:00Z_
_Reviewer: Claude (gsd-code-reviewer)_
_Depth: standard_
