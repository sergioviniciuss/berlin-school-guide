# Phase 15: Profile UI (Tags & Narrative) - Pattern Map

**Mapped:** 2026-07-29
**Files analyzed:** 18
**Analogs found:** 18 / 18

## File Classification

| New/Modified File | Role | Data Flow | Closest Analog | Match Quality |
|-------------------|------|-----------|----------------|---------------|
| `src/features/schools/EditorialNarrative/index.tsx` | component | request-response | `src/features/schools/ProfileSection/index.tsx` | role-match |
| `src/features/schools/EditorialNarrative/index.test.tsx` | test | request-response | `src/features/schools/SourcesSection/index.test.tsx` | role-match |
| `src/features/schools/TagsSection/index.tsx` | component | event-driven | `src/features/schools/ComparisonEvidenceNote/index.tsx` | exact |
| `src/features/schools/TagsSection/index.test.tsx` | test | event-driven | `src/features/schools/SchoolComparison/index.test.tsx` | role-match |
| `src/features/schools/TagsSection/utils.ts` (optional) | utility | transform | `src/features/schools/tagTaxonomy/index.ts` | role-match |
| `src/features/schools/TagEvidence/index.tsx` (optional) | component | request-response | `src/features/schools/ProfileFieldRow/index.tsx` | role-match |
| `src/features/schools/SchoolProfile/index.tsx` | component | request-response | self (extend composition) | exact |
| `src/features/schools/SchoolProfile/constants.ts` | config | transform | self (`profileFieldLabels`) | exact |
| `src/features/schools/SchoolProfile/index.test.tsx` | test | request-response | self | exact |
| `src/features/schools/collectCitedSources/index.ts` | utility | transform | self (extend Map merge) | exact |
| `src/features/schools/collectCitedSources/types.ts` | model | transform | self (`CitedSourceEntry`) | exact |
| `src/features/schools/collectCitedSources/index.test.ts` | test | transform | self | exact |
| `src/features/schools/SourcesSection/index.tsx` | component | request-response | self (extend article) | exact |
| `src/features/schools/SourcesSection/index.test.tsx` | test | request-response | self | exact |
| `src/features/schools/tagTaxonomy/index.ts` | utility | transform | self (`formatTagId` label map) | exact |
| `src/features/schools/tagTaxonomy/index.test.ts` | test | transform | self | exact |
| `src/features/schools/ReportCorrection/index.tsx` | component | request-response | `src/features/schools/SchoolComparison/index.tsx` | exact |
| `src/features/schools/ReportCorrection/constants.ts` | config | request-response | `src/features/schools/SchoolProfile/constants.ts` | role-match |
| `src/features/schools/ReportCorrection/index.test.tsx` | test | request-response | `src/features/schools/SchoolComparison/index.test.tsx` | exact |
| `src/app/report-correction/page.tsx` | route | request-response | `src/app/compare/page.tsx` | exact |

**Not modified (consume only):** `src/app/schools/[slug]/page.tsx` — thin shell already correct; all Phase 15 UI lands inside `SchoolProfile`. Pilot content in `lichtenbergPrimarySchools` is read-only.

## Pattern Assignments

### `src/features/schools/EditorialNarrative/index.tsx` (component, request-response)

**Analog:** `src/features/schools/ProfileSection/index.tsx`

**Imports / props pattern** (lines 1-15):
```tsx
import type { ReactNode } from "react";

type ProfileSectionProps = {
  heading: string;
  children: ReactNode;
};

export function ProfileSection({ heading, children }: ProfileSectionProps) {
  return (
    <section>
      <h2 className="text-xl font-semibold text-neutral-950">{heading}</h2>
```

**Core pattern to copy:** Server component section with locked H2 typography (`text-xl font-semibold text-neutral-950`). For editorial narrative: H2 = `"Perfil da escola"`, body = `text-base text-neutral-900` paragraph — no card chrome, no official/community chips (D-15). Conditionally render only when `perfilDaEscola` is truthy (parent may gate, or component returns null).

**Do not copy:** `<dl>` / field-row structure — narrative is prose, not a definition list.

---

### `src/features/schools/TagsSection/index.tsx` (component, event-driven)

**Analog:** `src/features/schools/ComparisonEvidenceNote/index.tsx` (expand/collapse)

**Imports + expand pattern** (lines 1-29):
```tsx
"use client";

import { useId, useState } from "react";

export function ComparisonEvidenceNote({ note }: ComparisonEvidenceNoteProps) {
  const [expanded, setExpanded] = useState(false);
  const noteId = useId();

  return (
    <div className="mt-1 text-sm text-neutral-600">
      <button
        type="button"
        aria-expanded={expanded}
        aria-controls={noteId}
        onClick={() => setExpanded((current) => !current)}
        className="text-blue-700 hover:underline"
      >
        {expanded ? "Ocultar nota de evidência" : "Ver nota de evidência"}
      </button>
      {expanded ? (
        <p id={noteId} className="mt-1">
          {note}
        </p>
      ) : null}
    </div>
  );
}
```

**Adapt for UI-SPEC:**
- Copy: `"use client"`, per-control `useState` + `useId`, `type="button"`, `aria-expanded` / `aria-controls`, conditional reveal.
- Toggle copy (locked): `"Ver evidência"` / `"Ocultar evidência"` (not compare’s “nota de evidência”).
- Add `min-h-11` on the button (UI-SPEC 44px hit area; see Compare link pattern below).
- Collapsed row: `formatTagId(tag.id)` + confidence chip only — no community badge (D-14).
- Confidence chip: StatusBadge verified tone — `bg-neutral-100 text-neutral-800 rounded-full px-2 py-1 text-sm font-semibold` + `formatTagConfidence(...)`.
- Section chrome: H2 `"Características da escola"` from `ProfileSection` heading classes; category H3 from Fontes group labels (`text-sm font-semibold text-neutral-700`).
- Omit entire section when `tags.length === 0` (D-08) — prefer parent gate or early return null.

**Secondary analog — confidence chip:** `src/features/schools/StatusBadge/index.tsx` lines 4-25 (`verified` → neutral chip; do **not** use amber/red for `partial`).

**Secondary analog — citation links in expanded panel:** `src/features/schools/ProfileFieldRow/index.tsx` lines 35-63 (`#source-${id}` + optional external URL + `ExternalLink`).

**Source-type chips in expanded evidence:** `src/features/schools/SourcesSection/index.tsx` lines 50-52:
```tsx
<span className="inline-flex rounded-full bg-blue-50 px-2 py-1 text-sm font-semibold text-blue-800">
  {group.label}
</span>
```
Use `formatSourceType(source.type)` for the label string — same treatment for community (D-13).

**Touch-target link reference** (`SchoolComparison` lines 59-64):
```tsx
className="min-h-11 inline-flex items-center text-sm font-medium text-blue-700 underline hover:opacity-90"
```

---

### `src/features/schools/TagEvidence/index.tsx` (optional component, request-response)

**Analog:** `src/features/schools/ProfileFieldRow/index.tsx` (citation links)

**Core citation pattern** (lines 35-63):
```tsx
{evidence.status === "verified" && evidence.citations.length > 0 ? (
  <div className="text-sm flex flex-wrap gap-x-4 gap-y-1">
    {evidence.citations.map((citation) => {
      const source = sourceById.get(citation.sourceId);
      if (!source) {
        return null;
      }

      return (
        <span key={citation.sourceId} className="inline-flex gap-x-4">
          <a
            href={`#source-${citation.sourceId}`}
            className="text-blue-700 hover:underline"
          >
            Ver fonte
          </a>
          <a
            href={source.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-blue-700 hover:underline"
          >
            Abrir original
            <ExternalLink className="size-3.5" aria-hidden />
          </a>
        </span>
      );
    })}
  </div>
) : null}
```

**Adapt:** Resolve tag citations against `school.sources`; show `formatSourceType` chip + `#source-{id}` (and optional external URL). Skip missing sourceIds silently (same as field row). Optional split — may live inline inside `TagsSection` if one use case only (AGENTS.md: avoid premature abstraction).

---

### `src/features/schools/SchoolProfile/index.tsx` (component, request-response)

**Analog:** self — extend existing Server Component composition

**Composition order today** (lines 50-142):
```tsx
return (
  <div className="space-y-12">
    <header className="space-y-4">
      {/* ... unchanged ... */}
    </header>

    {PROFILE_SECTIONS.map((section) => (
      <ProfileSection key={section.key} heading={section.heading}>
        {/* fields */}
      </ProfileSection>
    ))}

    <SourcesSection groupedSources={groupedSources} />
  </div>
);
```

**Insert after `</header>`, before `PROFILE_SECTIONS` (D-01/D-02):**
```tsx
{school.perfilDaEscola ? (
  <EditorialNarrative text={school.perfilDaEscola} />
) : null}
{school.tags && school.tags.length > 0 ? (
  <TagsSection tags={school.tags} sources={school.sources} />
) : null}
```

**Correction CTA after Fontes** (link pattern from same file lines 93-98 + Compare min-h-11):
```tsx
<Link
  href={`/report-correction/?school=${school.slug}`}
  className="inline-flex min-h-11 items-center text-sm font-medium text-blue-700 underline"
>
  Sugerir correção ou atualização
</Link>
```

**Keep:** No `"use client"` on `SchoolProfile`; `collectCitedSources(school)` at top; `space-y-12` root rhythm.

---

### `src/features/schools/SchoolProfile/constants.ts` (config, transform)

**Analog:** self — `profileFieldLabels.schoolProfile`

**Change** (line 77):
```ts
schoolProfile: "Perfil da escola",
```
→
```ts
schoolProfile: "Perfil oficial",
```

Existing tests iterate `Object.values(profileFieldLabels)` — they pick up the rename automatically; add an explicit assertion for `"Perfil oficial"` and that editorial H2 `"Perfil da escola"` is distinct when present.

---

### `src/features/schools/collectCitedSources/index.ts` + `types.ts` (utility/model, transform)

**Analog:** self — Map-by-`sourceId` field walk

**Core merge pattern** (lines 16-54):
```ts
export function collectCitedSources(school: School): GroupedCitedSources[] {
  const sourceById = new Map(school.sources.map((source) => [source.id, source]));
  const citationsBySourceId = new Map<
    string,
    Array<{ quote?: string; note?: string }>
  >();

  for (const path of importantSchoolFieldPathsDetailedV2) {
    const fieldValue = getSchoolFieldByPath(school, path);
    if (!fieldValue) {
      continue;
    }

    for (const citation of fieldValue.evidence.citations) {
      if (!sourceById.has(citation.sourceId)) {
        continue;
      }

      const existing = citationsBySourceId.get(citation.sourceId) ?? [];
      existing.push({ quote: citation.quote, note: citation.note });
      citationsBySourceId.set(citation.sourceId, existing);
    }
  }

  const cited: CitedSourceEntry[] = [...citationsBySourceId.entries()].map(
    ([sourceId, citations]) => ({
      source: sourceById.get(sourceId)!,
      citations,
    }),
  );

  return SOURCE_TYPE_ORDER.map((type) => ({
    type,
    entries: cited
      .filter((entry) => entry.source.type === type)
      .sort((a, b) =>
        a.source.title.localeCompare(b.source.title, "pt-BR"),
      ),
  })).filter((group) => group.entries.length > 0);
}
```

**Extend (do not replace):**
1. Track `citedBy: Set<string>` or `string[]` per sourceId while iterating fields (push `profileFieldLabels[path]`).
2. Second loop: `for (const tag of school.tags ?? [])` — same citation merge; push `formatTagId(tag.id)` into `citedBy`.
3. Keep `SOURCE_TYPE_ORDER` and title sort unchanged.
4. **Do not** invent `perfilDaEscola` citation IDs (RESEARCH Open Question / A2).

**Types extension** (`types.ts` lines 4-7):
```ts
export type CitedSourceEntry = {
  source: Source;
  citations: Array<{ quote?: string; note?: string }>;
  citedBy: string[]; // unique PT-BR labels; omit empty in UI
};
```

---

### `src/features/schools/SourcesSection/index.tsx` (component, request-response)

**Analog:** self — source `<article>` card

**Article structure** (lines 44-95): keep chips, title, publisher, dates, URL, citation quotes. After publisher/date metadata (UI-SPEC), add:
```tsx
{entry.citedBy && entry.citedBy.length > 0 ? (
  <p className="text-sm text-neutral-600">
    <span className="font-semibold">Citado em:</span>{" "}
    {entry.citedBy.join(", ")}
  </p>
) : null}
```

**Do not** show empty “Citado em:”. Keep `id={`source-${entry.source.id}`}` (TagsSection `#source-` links depend on it). Keep blue chip language for all source types including community.

**Unused imports note:** Current file imports `calculateEvidenceCoverage`, `formatFieldStatus`, `getCoverageTierLabel` but does not use them — do not proliferate dead imports when editing.

---

### `src/features/schools/tagTaxonomy/index.ts` (utility, transform)

**Analog:** self — `formatTagId` Record + formatter

**Existing label map pattern** (lines 34-49):
```ts
const tagIdLabels: Record<TagTaxonomyId, string> = {
  "stem-focus": "Foco em STEM",
  // ...
};

export function formatTagId(id: TagTaxonomyId): string {
  return tagIdLabels[id];
}
```

**Add (RESEARCH Code Examples + DECISIONS Tag Taxonomy V1):**
- `TagCategoryId` union + `TAG_CATEGORY_ORDER`
- `tagCategoryById: Record<TagTaxonomyId, TagCategoryId>`
- `tagCategoryLabels` PT-BR: Foco acadêmico / Modelo de aprendizagem / Apoio ao aluno / Ambiente escolar
- `getTagCategory(id)`, `formatTagCategory(categoryId)`
- Optional `groupTagsByCategory(tags)` in this file or `TagsSection/utils.ts`

**Test pattern:** extend `tagTaxonomy/index.test.ts` the same way `formatTagId` is asserted (lines 77+).

---

### `src/features/schools/ReportCorrection/index.tsx` (component, request-response)

**Analog:** `src/features/schools/SchoolComparison/index.tsx`

**Client + query prefill** (lines 1-22):
```tsx
"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
// ...

export function SchoolComparison() {
  const searchParams = useSearchParams();
  const slugs = parseCompareSlugs(searchParams.get(COMPARE_PAGE_PARAM));
  const { schools, skippedSlugs } = resolveCompareSchools(slugs);
```

**Adapt:**
```tsx
"use client";

import { useSearchParams } from "next/navigation";
import { getSchoolBySlug } from "@/features/schools/getSchoolBySlug";
import { SCHOOL_QUERY_PARAM, CORRECTION_EMAIL, /* copy */ } from "./constants";

export function ReportCorrection() {
  const searchParams = useSearchParams();
  const slug = searchParams.get(SCHOOL_QUERY_PARAM); // "school"
  const school = slug ? getSchoolBySlug(slug) : undefined;
  // H1 "Sugerir correção"; scope line naming tags + Perfil da escola
  // Prefill: "Escola: {name}" when found
  // mailto via encodeURIComponent subject/body (RESEARCH)
}
```

**Slug resolution:** `src/features/schools/getSchoolBySlug/index.ts` — allowlist via directory; never trust raw query as HTML.

**Page shell / Suspense analog:** `src/app/compare/page.tsx`:
```tsx
import { Suspense } from "react";
import { buildPageMetadata } from "@/features/siteMetadata";

export const metadata = buildPageMetadata({
  title: "Comparar",
  description: "...",
  path: "/compare",
});

export default function ComparePage() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <Suspense fallback={<p>Carregando comparação...</p>}>
        <SchoolComparison />
      </Suspense>
    </main>
  );
}
```

**Report page shell** should use profile-width main (from `schools/[slug]/page.tsx` line 39):
```tsx
<main className="mx-auto max-w-3xl px-6 py-12">
  <Suspense fallback={<p>Carregando…</p>}>
    <ReportCorrection />
  </Suspense>
</main>
```

Metadata: `buildPageMetadata({ title: "Sugerir correção", path: "/report-correction", description: "..." })`.

---

### `src/features/schools/ReportCorrection/constants.ts` (config)

**Analog:** `SchoolProfile/constants.ts` — colocated PT-BR strings + config constants.

Store: query param name `"school"`, `CORRECTION_EMAIL` (or `NEXT_PUBLIC_CORRECTION_EMAIL`), locked UI-SPEC copy strings (H1, scope line, missing-school message, mailto blocked fallback, CTA label if shared).

---

### Tests

| New/extended test | Analog | Pattern to copy |
|-------------------|--------|-----------------|
| `EditorialNarrative/index.test.tsx` | `SourcesSection/index.test.tsx` | `render` + `getByRole("heading", …)` + empty/absent cases |
| `TagsSection/index.test.tsx` | `SchoolComparison/index.test.tsx` | `fireEvent` / user-event on toggle; assert `aria-expanded`; no collapsed “Comunidade” |
| `ReportCorrection/index.test.tsx` | `SchoolComparison/index.test.tsx` lines 5-14 | `jest.mock("next/navigation", () => ({ useSearchParams: () => params }))` + mutate `URLSearchParams` per test |
| `collectCitedSources/index.test.ts` | self | Add tag-only source appears once; field+tag same id dedupes; `citedBy` contains field + tag labels |
| `SourcesSection/index.test.tsx` | self | Assert “Citado em:” when `citedBy` present; omit when empty |
| `SchoolProfile/index.test.tsx` | self | Editorial order after header; “Perfil oficial”; correction link href; non-pilot fixture has no Características / Perfil H2 |
| `tagTaxonomy/index.test.ts` | self | Category map coverage for all 10 ids; `formatTagCategory` PT-BR |

**Compare test mock excerpt** (lines 5-14):
```tsx
let params = new URLSearchParams();

jest.mock("next/navigation", () => ({
  useSearchParams: () => params,
}));

describe("SchoolComparison", () => {
  beforeEach(() => {
    params = new URLSearchParams();
  });
```

## Shared Patterns

### Server profile + client island
**Source:** `SchoolProfile` (server) + `ComparisonEvidenceNote` / `SchoolComparison` (client)
**Apply to:** `TagsSection`, `ReportCorrection`
- Keep page composition on the server; isolate interactivity in `"use client"` children.

### Expand / collapse a11y
**Source:** `ComparisonEvidenceNote/index.tsx` lines 15-28
**Apply to:** Per-tag evidence toggles
```tsx
<button
  type="button"
  aria-expanded={expanded}
  aria-controls={evidenceId}
  onClick={() => setExpanded((current) => !current)}
  className="min-h-11 text-sm text-blue-700 hover:underline"
>
```

### Source-type chip language (no community stigma)
**Source:** `SourcesSection/index.tsx` lines 50-52 + `formatSourceType`
**Apply to:** Expanded tag evidence + Fontes
- Same `bg-blue-50 text-blue-800 rounded-full` for all displayable types including `triangulated_community`.

### Confidence ≠ quality warning
**Source:** `StatusBadge` verified classes + `formatTagConfidence`
**Apply to:** Tag confidence badges
- Neutral chips only; never amber/red for `partial`.

### Fontes Map dedupe + type order
**Source:** `collectCitedSources/index.ts` (`SOURCE_TYPE_ORDER`, Map by sourceId)
**Apply to:** Field ∪ tag citation merge
- Extend loops; do not invent new sort order.

### Static export + `useSearchParams`
**Source:** `src/app/compare/page.tsx` + `SchoolComparison`
**Apply to:** `/report-correction/`
- Always wrap client query reader in `<Suspense>`; mock `useSearchParams` in Jest.

### Slug allowlist
**Source:** `getSchoolBySlug`
**Apply to:** ReportCorrection prefill
- Resolve `?school=` against directory; show missing-school copy when undefined.

### Feature directory colocation
**Source:** AGENTS.md + existing `SchoolProfile/`, `SourcesSection/`
**Apply to:** All new Phase 15 units
```text
ComponentName/
├── index.tsx
├── index.test.tsx
├── constants.ts   # when needed
└── utils.ts       # when needed
```

### Metadata
**Source:** `buildPageMetadata` via `@/features/siteMetadata`
**Apply to:** `src/app/report-correction/page.tsx`

## No Analog Found

| File | Role | Data Flow | Reason |
|------|------|-----------|--------|
| — | — | — | All Phase 15 files have in-repo analogs. Category helpers are new data but follow the existing `formatTagId` Record pattern. Mailto construction is new but uses standard `encodeURIComponent` + Compare Suspense shell. |

## Metadata

**Analog search scope:** `src/features/schools/**`, `src/features/evidence/**`, `src/app/compare`, `src/app/schools/[slug]`, `src/app/methodology`, `docs/DECISIONS.md` (taxonomy categories)
**Files scanned:** ~25 primary + tests
**Pattern extraction date:** 2026-07-29
