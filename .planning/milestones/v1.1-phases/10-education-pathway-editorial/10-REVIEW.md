---
phase: 10-education-pathway-editorial
reviewed: 2026-07-24T21:45:00Z
depth: standard
files_reviewed: 9
files_reviewed_list:
  - src/content/guides/german-education-system.mdx
  - src/features/guides/BerlinCallout/index.test.tsx
  - src/features/guides/BerlinCallout/index.tsx
  - src/features/guides/EducationTimeline/constants.test.ts
  - src/features/guides/EducationTimeline/constants.ts
  - src/features/guides/EducationTimeline/fixtures.ts
  - src/features/guides/EducationTimeline/index.test.tsx
  - src/features/guides/GlossaryTerm/index.test.tsx
  - src/features/guides/GlossaryTerm/index.tsx
findings:
  critical: 0
  warning: 1
  info: 2
  total: 3
status: issues_found
---

# Phase 10: Code Review Report

**Reviewed:** 2026-07-24T21:45:00Z
**Depth:** standard
**Files Reviewed:** 9
**Status:** issues_found

## Summary

Reviewed Phase 10 source under `src/` from SUMMARY key-files (no `e2e/` changes in this phase). Focus areas: `GlossaryTerm` deep-link ids, `EducationTimeline` DEMO constants/anchors, `BerlinCallout` inline typographic line, and `german-education-system.mdx` editorial.

Overall the phase is solid: glossary hashes use the same `slugifyHeading` as H2 anchors, timeline `anchorHref` values match locked chapter slugs, ONBD-05 narrative deep-links are present, placeholders are gone, and the inline Berlin treatment is safe React text (no XSS surface). One pre-existing Warning remains in `BerlinCallout` summary markup (hardcoded DOM id). Two Info notes cover future id-namespace risk and a weak multi-instance test assertion.

### Area notes (requested focus)

| Area | Assessment |
|------|------------|
| **GlossaryTerm id** | `id={slugifyHeading(term)}` + `scroll-mt-20` on root `<dl>` matches UI-SPEC; Duales Studium → `#duales-studium` correct. No collision with H2 ids today (H3s do not emit ids). |
| **EducationTimeline constants** | Locked anchors (`#antes-da-escola`, `#ensino-primario`, `#os-caminhos-possiveis`, `#formacao-profissional`, `#ensino-superior`) match `slugifyHeading` of journey H2s; Germany-first Grundschule grades + `berlinNote`; Fase 10 / stub hash banned by tests. |
| **BerlinCallout inline** | Pill → left-ruled typographic line (`Berlim: …`); note rendered as text children; no `dangerouslySetInnerHTML`. MDX correctly avoids `variant="inline"` (prose “Em Berlim…” only). |
| **german-education-system.mdx** | Full H2 journey + Glossário; exactly three “O que verificar”; one summary callout; six ONBD-05 `#slug` links before Glossário; D-11 enrollment fence held (no Einzugsgebiet/Anmeldung procedures). |

## Warnings

### WR-01: `BerlinCallout` summary variant still hardcodes a DOM id

**File:** `src/features/guides/BerlinCallout/index.tsx:16-22`
**Issue:** The summary variant still uses a fixed `id="berlin-em-destaque-heading"` / `aria-labelledby="berlin-em-destaque-heading"`. Phase 10 editorial correctly ships exactly one summary box (D-10), so the live guide page is fine today — but the component remains unsafe if a second summary is ever added on the same page (invalid duplicate ids; ambiguous `aria-labelledby`). This was flagged in Phase 9 and was not fixed when the inline variant was updated.
**Fix:** Generate a per-instance id (requires marking the module a client component, or accept an optional `headingId` prop from the caller):

```tsx
"use client";

import { useId } from "react";
import Link from "next/link";

import type { BerlinCalloutProps } from "./types";

export function BerlinCallout(props: BerlinCalloutProps) {
  const headingId = useId();

  if (props.variant === "inline") {
    // ...unchanged typographic line...
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
      {/* ... */}
    </aside>
  );
}
```

## Info

### IN-01: GlossaryTerm ids share the bare `slugifyHeading` namespace with future H3 anchors

**File:** `src/features/guides/GlossaryTerm/index.tsx:12-14`
**Issue:** Terms such as `Gymnasium`, `ISS`, and `Gemeinschaftsschule` produce `#gymnasium`, `#iss`, `#gemeinschaftsschule`. Journey H3s currently have no `id` (`src/mdx-components.tsx` only slugs H2s), so deep links work. If H3s later gain `slugifyHeading` ids, those three glossary entries will collide with subsection headings.
**Fix:** Prefer a namespaced id (e.g. `glossary-${slugifyHeading(term)}`) and update narrative `#…` links, or document that H3s must never receive bare term slugs.

### IN-02: Multi-instance GlossaryTerm test does not assert unique ids

**File:** `src/features/guides/GlossaryTerm/index.test.tsx:22-32`
**Issue:** The test titled “without shared state or id collisions” only checks visible text. Duplicate `term` values would still produce duplicate DOM ids and the test would pass.
**Fix:** Assert distinct `id` attributes (or that `document.querySelectorAll('#ganztag')` has length 1 when rendering two different terms).

---

_Reviewed: 2026-07-24T21:45:00Z_
_Reviewer: Claude (gsd-code-reviewer)_
_Depth: standard_
