# Phase 6: School Comparison - Research

**Researched:** 2026-07-11
**Domain:** Static Next.js comparison UX — URL-driven multi-school selection, criteria table with evidence labels
**Confidence:** HIGH

## Summary

Phase 6 adds a trust-first school comparison flow on top of the existing static data model and profile field infrastructure. The codebase already owns the hard parts: `PROFILE_SECTIONS` / `profileFieldLabels` as row definitions, `getSchoolFieldByPath` + `formatSchoolField` + `StatusBadge` for per-cell value/status rendering, `calculateEvidenceCoverage` + `getCoverageTierLabel` for column headers, and `SchoolDirectory`'s `router.replace` + `toQueryString` pattern for shareable URL state. No new libraries are required.

The main engineering work is structural: (1) extend `SchoolCard` so a compare checkbox does not nest inside the profile link (invalid HTML / accidental navigation), (2) add `compare` query param sync to `SchoolDirectory` alongside existing filter params, (3) build `/compare` as a client-driven page inside `Suspense` (same constraint as `/schools`), and (4) render a horizontally scrollable criteria table with a sticky label column on mobile. Comparison must never introduce ranking semantics — no sort-by-coverage columns, no winner highlighting, no composite scores.

**Primary recommendation:** Create a `SchoolComparison` feature unit with pure URL/slug utilities and a table component that reuses extracted profile field formatting; wire selection through `SchoolDirectory` + `CompareBar`; add thin `src/app/compare/page.tsx` with Suspense; extend `NAV_ITEMS` when the route ships.

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions

#### School selection from directory (COMP-01)
- **D-01:** Each `SchoolCard` gets a **compare checkbox** (separate from the profile link — checkbox click must not navigate to profile).
- **D-02:** **Minimum 2 schools** required to open the comparison view; **maximum 4 schools** in one comparison.
- **D-03:** When ≥1 school is selected, show a **sticky compare bar** (mobile + desktop) with count — e.g. `"2 escolas selecionadas"` — and primary CTA **"Comparar escolas"** linking to `/compare`.
- **D-04:** Selection state **persists in URL** as `?compare=slug1,slug2` on `/schools` (comma-separated slugs, English param name) so refresh and back/forward restore selection; navigating to `/compare` uses the same slug list in `?schools=slug1,slug2`.

#### Comparison page layout (COMP-02, COMP-03)
- **D-05:** Route **`/compare`** with visible heading **"Comparar"** per `docs/INFORMATION_ARCHITECTURE.md`.
- **D-06:** Layout is a **criteria table**: rows = comparison fields grouped by section (matching `SchoolProfile` section headings), columns = selected schools (school name in column header).
- **D-07:** Each cell shows **formatted value + evidence status badge** (reuse `StatusBadge` / `formatFieldStatus` patterns from profile pages) — unverified data never styled as fact.
- **D-08:** Column header for each school includes **research tier label + coverage %** (same semantics as directory cards — coverage = research completeness, not quality).
- **D-09:** **No composite score**, no column highlighting as "winner", no default sort by quality, no ranking language anywhere on the page.

#### Comparison criteria (COMP-02, COMP-03)
- **D-10:** Compare the **priority criteria from `docs/COMPARISON.md`** using the same important field paths as detailed profiles where data exists; for directory-only schools, show missing/not_confirmed honestly.
- **D-11:** Field groups mirror profile sections: **Identificação**, **Oferta pedagógica**, **Apoio à família**, **Inspeção** — reuse `PROFILE_SECTIONS` / `profileFieldLabels` as the row source of truth.
- **D-12:** **Inspection availability** compared as available / unavailable / not_confirmed only — no quality interpretation (per COMPARISON.md).

#### Limitations copy (COMP-04)
- **D-13:** Page opens with a **Portuguese limitations block** explaining what comparison can and cannot tell a family (no ranking, coverage ≠ quality, missing fields mean ask on visit) — link to `/methodology`.
- **D-14:** Limitations copy is **always visible** above the table (not collapsed behind a tooltip).

#### Navigation and discoverability
- **D-15:** Add **`Comparar`** to `SiteHeader` / `SiteFooter` nav when `/compare` ships (Phase 3 D-07 — live routes only).
- **D-16:** Compare bar CTA and empty `/compare` state link back to **`/schools`** to pick schools.

#### Shareable comparison URLs
- **D-17:** `/compare?schools=slug1,slug2,slug3` restores the same schools in a fresh session (static lookup via `getSchoolBySlug`).
- **D-18:** Invalid or unknown slugs in the URL are **skipped with a visible notice**; if fewer than 2 valid schools remain, show empty state with link to directory.

#### Mobile behavior
- **D-19:** On viewports below `lg`, comparison table uses **horizontal scroll** with the criteria label column **sticky** on the left — no card-per-school rewrite in V1.
- **D-20:** Compare checkbox and sticky bar meet **≥44px tap targets** on mobile (consistent with Phase 5).

### Claude's Discretion
- Exact sticky compare bar visual treatment (bottom vs top)
- Remove-school control on `/compare` (per-column X vs edit link back to directory)
- Whether selection also mirrors in `sessionStorage` for cross-tab resilience (URL is source of truth regardless)
- Unit test depth for comparison formatters vs e2e coverage split

### Deferred Ideas (OUT OF SCOPE)
- **User-configurable compatibility score** — explicitly deferred in `docs/COMPARISON.md`; not V1
- **Compare from profile page** ("Add to comparison" on `/schools/[slug]`) — nice-to-have; directory selection is sufficient for V1 unless planner finds trivial wiring
- **Print/export comparison** — backlog
- **Guias nav link** — Phase 7
</user_constraints>

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|------------------|
| COMP-01 | User can select schools from the directory to compare | Extend `SchoolCard` with checkbox; `SchoolDirectory` syncs `compare` param; `CompareBar` with min-2/max-4 gating |
| COMP-02 | Comparison shows criteria side by side without a universal quality ranking | Criteria table from `PROFILE_SECTIONS`; no sort-by-coverage, no winner styling, no composite score (D-09) |
| COMP-03 | Comparison surfaces missing data and evidence coverage per school | Reuse `StatusBadge` + field formatters per cell; column headers show tier + `calculateEvidenceCoverage` % |
| COMP-04 | Comparison limitations are explained in Portuguese | Always-visible limitations block above table with `/methodology` link (D-13, D-14) |
</phase_requirements>

## Architectural Responsibility Map

| Capability | Primary Tier | Secondary Tier | Rationale |
|------------|-------------|----------------|-----------|
| Compare checkbox selection | Browser / Client | — | Interactive selection state; no server |
| Selection URL sync (`?compare=`) | Browser / Client | CDN / Static | Client reads/writes search params; static HTML shell from build |
| Compare page slug resolution | Browser / Client | — | `getSchoolBySlug` over static bundled data at hydration |
| Criteria table rendering | Browser / Client | — | Pure presentation of preloaded school records |
| Field value + evidence formatting | Browser / Client | — | Reuses existing formatters; no API |
| Shareable compare URL (`?schools=`) | Browser / Client | CDN / Static | Same static-export + client param pattern as directory filters |
| Navigation link to `/compare` | CDN / Static | Browser / Client | Pre-rendered nav; active state client-side via `usePathname` |

## Standard Stack

### Core

| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| Next.js | 16.2.10 | App Router, static export | Project framework; `output: "export"` already configured [VERIFIED: package.json, next.config.mjs] |
| React | 19.2.7 | Client components for URL-driven UI | Existing pattern in `SchoolDirectory` [VERIFIED: package.json] |
| Tailwind CSS | 4.3.2 | Sticky columns, horizontal scroll, responsive layout | Project styling standard [VERIFIED: package.json] |
| Existing field formatters | — | `formatSchoolField`, `StatusBadge`, `getSchoolFieldByPath` | Single source of truth with profile pages [VERIFIED: codebase grep] |

### Supporting

| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| `@/components/ui/Button` | — | Compare bar CTA, empty-state actions | Primary actions (Phase 5 pattern) [VERIFIED: SchoolDirectory, MobileFilterSheet] |
| `lucide-react` | 1.24.0 | Optional remove-school icon | Per-column remove if chosen in discretion |
| Jest + RTL | 30.4.2 / 16.3.2 | Unit/component tests | Colocated `index.test.tsx` [VERIFIED: jest.config.mjs] |
| Playwright | 1.61.1 | E2E compare journey | `e2e/smoke.spec.ts` extension [VERIFIED: playwright.config.ts] |

### Alternatives Considered

| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| Native `<table>` + Tailwind sticky | Card-per-school mobile layout | Rejected by D-19 — horizontal scroll table is locked |
| `sessionStorage` mirror | URL-only state | Optional discretion; URL remains source of truth |
| New comparison-specific field list | `PROFILE_SECTIONS` | Rejected by D-11 — profile sections are source of truth |
| Client state library (Zustand) | URL params | Violates static-first shareable-state architecture [VERIFIED: docs/INFORMATION_ARCHITECTURE.md, SchoolDirectory pattern] |

**Installation:** No new packages required.

**Version verification:** All versions confirmed from `package.json` in this session [VERIFIED: package.json].

## Architecture Patterns

### System Architecture Diagram

```text
User on /schools
    │
    ▼
[SchoolDirectory] ◄── reads/writes URL (?q, filters, sort, compare)
    │
    ├──► [SchoolCard × N] ── checkbox toggles slug in compare[]
    │
    └──► [CompareBar] (visible when compare.length ≥ 1)
              │
              │ CTA "Comparar escolas" (enabled when compare.length ≥ 2)
              ▼
         /compare?schools=slug1,slug2
              │
              ▼
[SchoolComparison] ◄── reads ?schools param
    │
    ├──► [resolveCompareSchools] ── getSchoolBySlug per slug; collect skipped
    │
    ├──► [ComparisonLimitations] ── static PT copy + /methodology link
    │
    └──► [ComparisonTable]
              │
              ├── rows: PROFILE_SECTIONS → profileFieldLabels
              └── cells: formatProfileFieldValue + StatusBadge per school column
```

### Recommended Project Structure

```text
src/
├── app/
│   └── compare/
│       └── page.tsx              # metadata + Suspense + SchoolComparison
├── features/
│   └── schools/
│       ├── CompareBar/           # sticky bar, count, CTA link
│       ├── SchoolComparison/     # page shell: limitations, table, empty states
│       ├── ComparisonTable/      # criteria table (or nested under SchoolComparison)
│       ├── parseCompareSlugs/    # comma-slug parse, dedupe, cap at 4
│       ├── resolveCompareSchools/ # slug[] → School[] + skippedSlugs[]
│       ├── formatProfileFieldValue/  # EXTRACT from ProfileFieldRow (shared)
│       ├── SchoolCard/           # add compare checkbox props
│       └── SchoolDirectory/      # extend toQueryString with compare param
└── features/navigation/
    └── SiteHeader/constants.ts   # add Comparar nav item
```

Planner may colocate `ComparisonTable` inside `SchoolComparison/` if it stays single-use — follow existing convention (one directory per meaningful unit).

### Pattern 1: URL as selection source of truth

**What:** Mirror Phase 5 directory filter sync for compare selection on `/schools` and school list on `/compare`.

**When to use:** Any shareable multi-select state in this static app.

**Example:**

```typescript
// Pattern from SchoolDirectory — extend, do not replace
const COMPARE_PARAM = "compare";
const COMPARE_PAGE_PARAM = "schools";

function parseCompareSlugs(raw: string | null, max = 4): string[] {
  if (!raw) return [];
  const seen = new Set<string>();
  const slugs: string[] = [];
  for (const part of raw.split(",")) {
    const slug = part.trim();
    if (!slug || seen.has(slug)) continue;
    seen.add(slug);
    slugs.push(slug);
    if (slugs.length >= max) break;
  }
  return slugs;
}

function compareSelectionToParam(slugs: string[]): string {
  return slugs.length ? slugs.join(",") : "";
}

// Directory: router.replace with compare appended to existing toQueryString
// Compare page link: `/compare?schools=${slugs.join(",")}`
```

Source: Phase 5 `SchoolDirectory/index.tsx` `toQueryString` + `router.replace` [VERIFIED: codebase].

### Pattern 2: Suspense boundary for `useSearchParams`

**What:** Wrap client components that call `useSearchParams()` in `<Suspense>` on the page route.

**When to use:** `/compare` page (same as `/schools`).

**Example:**

```tsx
// src/app/compare/page.tsx — mirrors src/app/schools/page.tsx
import { Suspense } from "react";
import { SchoolComparison } from "@/features/schools/SchoolComparison";

export const metadata = {
  title: "Comparar",
  description: "Compare escolas lado a lado com transparência sobre evidências e limitações.",
};

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

Source: [CITED: https://github.com/vercel/next.js/blob/canary/docs/01-app/03-api-reference/04-functions/use-search-params.mdx]

### Pattern 3: SchoolCard checkbox without nested interactive elements

**What:** Refactor card layout so the compare checkbox is **not** a descendant of the profile `<Link>`.

**When to use:** D-01 — checkbox click must not navigate.

**Example structure:**

```tsx
<article className="rounded-lg border ...">
  <div className="flex gap-3 p-5">
    <CompareCheckbox
      checked={isSelected}
      disabled={!isSelected && selectionFull}
      onChange={onToggleCompare}
      aria-label={`Selecionar ${school.name} para comparar`}
      className="min-h-11 min-w-11"
    />
    <div className="min-w-0 flex-1">
      <Link href={`/schools/${school.slug}`} aria-label={`Ver perfil de ${school.name}`}>
        {/* existing card content */}
      </Link>
    </div>
  </div>
</article>
```

**Anti-pattern:** Placing `<input type="checkbox">` inside `<Link>` and relying on `stopPropagation` (used for `TierHelpButton` today) — works for buttons but fails HTML validity and screen-reader expectations for form controls [VERIFIED: SchoolCard/index.tsx TierHelpButton pattern vs D-01 requirement].

### Pattern 4: Comparison table with sticky criteria column

**What:** Semantic `<table>` inside `overflow-x-auto`; first column `sticky left-0 z-10 bg-white` below `lg`.

**When to use:** D-19 mobile horizontal scroll.

**Example:**

```tsx
<div className="overflow-x-auto">
  <table className="w-full min-w-[640px] border-collapse text-sm">
    <thead>
      <tr>
        <th scope="col" className="sticky left-0 z-10 bg-white ...">Critério</th>
        {schools.map((s) => (
          <th key={s.slug} scope="col" className="min-w-[12rem] ...">
            {s.name.value}
            <span className="block text-xs">{tierLabel} · {coverage}%</span>
          </th>
        ))}
      </tr>
    </thead>
    <tbody>
      {PROFILE_SECTIONS.map((section) => (
        <>
          <tr key={section.key}>
            <th colSpan={schools.length + 1} scope="colgroup" className="bg-neutral-50 ...">
              {section.heading}
            </th>
          </tr>
          {section.fields.map((fieldPath) => (
            <tr key={fieldPath}>
              <th scope="row" className="sticky left-0 z-10 bg-white ...">
                {profileFieldLabels[fieldPath]}
              </th>
              {schools.map((school) => (
                <ComparisonCell key={`${school.slug}-${fieldPath}`} school={school} fieldPath={fieldPath} />
              ))}
            </tr>
          ))}
        </>
      ))}
    </tbody>
  </table>
</div>
```

Use neutral cell styling only — no green/red conditional formatting by value.

### Pattern 5: Extract shared field formatting

**What:** Move `formatProfileFieldValue` / `formatValueForPath` from `ProfileFieldRow/index.tsx` into `formatProfileFieldValue/index.ts`; import from both profile rows and comparison cells.

**When to use:** D-07 — same formatted values and status gating as profiles.

**Rationale:** `ProfileFieldRow` currently embeds ~55 lines of formatting logic privately [VERIFIED: ProfileFieldRow/index.tsx lines 84–139]. Comparison cells need value + badge without citation links.

### Anti-Patterns to Avoid

- **Ranking by coverage:** Sorting columns or rows by `calculateEvidenceCoverage().percentage` — implies quality (violates D-09, `docs/COMPARISON.md`).
- **Winner highlighting:** `bg-green-50` on "better" Ganztag/bilingual values — editorial judgment.
- **Composite compatibility score:** Even a simple average — explicitly deferred.
- **Hiding missing fields:** Empty cells without `StatusBadge` — violates COMP-03 and trust model.
- **Nested checkbox in link:** Invalid HTML; use flex layout refactor.
- **Server API for compare:** Static export has no runtime API [VERIFIED: next.config.mjs `output: "export"`, AGENTS.md].

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Field display formatting | Custom comparison formatters | Extract `formatProfileFieldValue` + `formatSchoolField` | Divergence from profile pages breaks trust |
| Evidence status labels | New badge variants | `StatusBadge` + `formatFieldStatus` | Consistent PT copy and color semantics |
| Row/column definitions | Ad-hoc comparison field list | `PROFILE_SECTIONS` + `profileFieldLabels` | D-11 locked |
| Coverage percentage | Recompute with different denominator | `calculateEvidenceCoverage(school)` | Level-aware v2 logic already exists |
| Slug → school lookup | New data loader | `getSchoolBySlug` | Static bundled data path |
| URL state management | Zustand/Context for selection | `useSearchParams` + `router.replace` | Shareable URLs, Phase 5 precedent |
| Data table library | TanStack Table etc. | Native `<table>` + Tailwind | 4 columns max, no sort/filter — YAGNI per AGENTS.md |

**Key insight:** Comparison is a **projection** of existing profile data, not a new domain. The planner should budget refactors (SchoolCard layout, formatter extraction) not new abstractions.

## Common Pitfalls

### Pitfall 1: Checkbox inside profile link

**What goes wrong:** Selecting a school navigates to profile; invalid HTML for nested interactive elements.

**Why it happens:** Current `SchoolCard` wraps entire card in `<Link>` [VERIFIED: SchoolCard/index.tsx lines 25–29].

**How to avoid:** Flex layout with checkbox sibling to link wrapper (Pattern 3).

**Warning signs:** E2E click on checkbox changes URL to `/schools/[slug]`.

### Pitfall 2: Dropping filter params when toggling compare

**What goes wrong:** Selecting a school clears active directory filters from URL.

**Why it happens:** `toQueryString` rewrite omits existing params if not merged.

**How to avoid:** Extend `toQueryString(filters, sortKey, compareSlugs?)` — append `compare` only when non-empty; preserve all filter keys (same function, new optional arg).

**Warning signs:** Unit test shows `router.replace("/schools?compare=foo")` without `q`/`district` that were active.

### Pitfall 3: Max-4 selection silent failure

**What goes wrong:** User selects 5th school with no feedback.

**How to avoid:** Disable unchecked checkboxes when `selectedSlugs.length >= 4`; optional `aria-disabled` + title "Máximo de 4 escolas".

**Warning signs:** URL contains more than 4 slugs (parser must also cap on read).

### Pitfall 4: Compare CTA enabled with 1 school

**What goes wrong:** User lands on empty/partial compare page.

**How to avoid:** CTA disabled or non-link until `selectedSlugs.length >= 2` (D-02); bar still visible at ≥1 for count feedback (D-03).

### Pitfall 5: Invalid slugs crash or blank page

**What goes wrong:** `/compare?schools=fake-slug` throws or shows broken table.

**How to avoid:** `resolveCompareSchools` filters unknown slugs, returns `skippedSlugs[]`, renders notice; if `< 2` valid, empty state + link to `/schools` (D-18).

### Pitfall 6: Sticky column scroll jank

**What goes wrong:** Criteria labels scroll away or overlap headers on mobile.

**How to avoid:** `sticky left-0` on both header corner cell and row labels; explicit `bg-white` / `bg-neutral-50` on sticky cells; test at 375px width.

### Pitfall 7: Ranking language in copy

**What goes wrong:** "Melhor opção", "Recomendada", sort labels implying quality.

**How to avoid:** Copy review against `docs/COMPARISON.md`; limitations block states coverage ≠ quality explicitly.

## Code Examples

### Resolve compare schools from URL

```typescript
// Source: project pattern — getSchoolBySlug + D-17/D-18
import { getSchoolBySlug } from "@/features/schools/getSchoolBySlug";
import type { School } from "@/features/schools/school";

export function resolveCompareSchools(slugs: string[]) {
  const schools: School[] = [];
  const skippedSlugs: string[] = [];

  for (const slug of slugs) {
    const school = getSchoolBySlug(slug);
    if (school) {
      schools.push(school);
    } else {
      skippedSlugs.push(slug);
    }
  }

  return { schools, skippedSlugs };
}
```

### Comparison cell (value + badge, no citations)

```tsx
// Source: ProfileFieldRow pattern, simplified for table
import { getSchoolFieldByPath } from "@/features/schools/getSchoolFieldByPath";
import { formatProfileFieldValue } from "@/features/schools/formatProfileFieldValue";
import { StatusBadge } from "@/features/schools/StatusBadge";
import type { School } from "@/features/schools/school";

function ComparisonCell({ school, fieldPath }: { school: School; fieldPath: string }) {
  const field = getSchoolFieldByPath(school, fieldPath);
  if (!field) return <td>—</td>;

  return (
    <td className="align-top p-3">
      <div className="flex flex-col gap-1">
        <span className="text-neutral-900">{formatProfileFieldValue(fieldPath, field)}</span>
        <StatusBadge status={field.evidence.status} />
      </div>
    </td>
  );
}
```

### Compare bar CTA href

```typescript
// Source: D-04
function buildComparePageHref(slugs: string[]): string {
  if (slugs.length < 2) return "/compare"; // CTA should be disabled anyway
  return `/compare?schools=${encodeURIComponent(slugs.join(","))}`;
}
```

Note: comma-separated slugs in query values are conventional here (same as D-04); slugs are URL-safe `[a-z0-9-]`.

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| No comparison route | `/compare` in IA | Pre-V1 planning | Nav link deferred until Phase 6 ships |
| Profile-only field display | Shared formatter extraction | Phase 6 (planned) | ProfileFieldRow imports extracted util |
| Directory URL filters only | + `compare` param on `/schools` | Phase 6 | Selection shareable on directory |

**Deprecated/outdated:**
- None for comparison — greenfield within brownfield codebase.

## Assumptions Log

| # | Claim | Section | Risk if Wrong |
|---|-------|---------|---------------|
| A1 | Sticky bottom compare bar is preferable to top on mobile (avoids conflict with filter sticky bar at `top-0`) | Discretion recommendation | Minor UX iteration |
| A2 | Per-column remove (X) is simpler than "edit on directory" for V1 | Discretion recommendation | Extra click path for users |
| A3 | `sessionStorage` mirror is unnecessary when URL is source of truth | Discretion recommendation | Cross-tab selection not synced — acceptable per CONTEXT |
| A4 | SiteFooter nav extension means adding Comparar link alongside methodology, not full NAV_ITEMS mirror | D-15 interpretation | Footer may only need one link if header carries primary nav |

## Open Questions

1. **SiteFooter scope for D-15**
   - What we know: `SiteFooter` currently only links to `/methodology`; `SiteHeader` uses `NAV_ITEMS` [VERIFIED: SiteFooter/index.tsx, SiteHeader/constants.ts].
   - What's unclear: Whether D-15 requires duplicating full nav in footer or a single "Comparar" link.
   - Recommendation: Add `Comparar` to `NAV_ITEMS` (header + mobile sheet); add footer link to `/compare` for discoverability — minimal scope.

2. **Compare bar z-index vs mobile filter bar**
   - What we know: Mobile filter bar uses `sticky top-0 z-10` [VERIFIED: SchoolDirectory/index.tsx line 228].
   - What's unclear: Bottom bar may be cleaner to avoid stacking stickies.
   - Recommendation: Bottom-fixed compare bar at `z-20` with `pb-safe` padding so it clears footer; document in UI-SPEC during plan phase.

## Environment Availability

Step 2.6: SKIPPED — phase is code/config-only; no new external services. Existing toolchain verified:

| Dependency | Required By | Available | Version | Fallback |
|------------|------------|-----------|---------|----------|
| Node.js | build/test | ✓ | v24.12.0 | — |
| pnpm | package manager | ✓ | 11.11.0 | — |
| Next.js dev server | Playwright e2e | ✓ | 16.2.10 | `pnpm dev --port 4310` |

## Validation Architecture

### Test Framework

| Property | Value |
|----------|-------|
| Framework | Jest 30.4.2 + jsdom + RTL 16.3.2 |
| Config file | `jest.config.mjs` |
| Quick run command | `pnpm test -- --testPathPattern="parseCompareSlugs|resolveCompareSchools|SchoolComparison|CompareBar|SchoolCard" --no-coverage` |
| Full suite command | `pnpm test` |
| E2E command | `pnpm e2e` |

### Phase Requirements → Test Map

| Req ID | Behavior | Test Type | Automated Command | File Exists? |
|--------|----------|-----------|-------------------|-------------|
| COMP-01 | Checkbox toggles selection; URL syncs `compare` param | unit + component | `pnpm test -- SchoolDirectory/index.test.tsx -t compare` | ❌ Wave 0 |
| COMP-01 | Max 4 / min 2 gating on bar CTA | component | `pnpm test -- CompareBar/index.test.tsx` | ❌ Wave 0 |
| COMP-01 | Checkbox does not navigate to profile | component | `pnpm test -- SchoolCard/index.test.tsx -t compare` | ❌ Wave 0 |
| COMP-02 | Table renders PROFILE_SECTIONS rows without ranking UI | component | `pnpm test -- SchoolComparison/index.test.tsx` | ❌ Wave 0 |
| COMP-03 | Cells show StatusBadge for missing/unverified fields | component | `pnpm test -- ComparisonTable` or SchoolComparison | ❌ Wave 0 |
| COMP-03 | Column headers show tier + coverage % | component | same as above | ❌ Wave 0 |
| COMP-04 | Limitations block visible with methodology link | component | `pnpm test -- SchoolComparison -t limitations` | ❌ Wave 0 |
| COMP-01–04 | E2E: select 2 schools → compare → shared URL | e2e | `pnpm e2e -- e2e/smoke.spec.ts -g compare` | ❌ Wave 0 |
| D-17 | Shareable `/compare?schools=` restores view | e2e | same e2e spec | ❌ Wave 0 |
| D-18 | Invalid slug notice + empty state | unit | `pnpm test -- resolveCompareSchools` | ❌ Wave 0 |

### Sampling Rate

- **Per task commit:** `pnpm test -- --testPathPattern="<changed-module>"`
- **Per wave merge:** `pnpm test`
- **Phase gate:** `pnpm test && pnpm e2e && pnpm build`

### Wave 0 Gaps

- [ ] `src/features/schools/parseCompareSlugs/index.test.ts` — slug parse, dedupe, max-4 cap
- [ ] `src/features/schools/resolveCompareSchools/index.test.ts` — valid/invalid/mixed slugs
- [ ] `src/features/schools/formatProfileFieldValue/index.ts` — extract from ProfileFieldRow + tests
- [ ] `src/features/schools/CompareBar/index.test.tsx` — count copy, CTA disabled/enabled
- [ ] `src/features/schools/SchoolComparison/index.test.tsx` — limitations, empty state, table sections
- [ ] Extend `SchoolDirectory/index.test.tsx` — compare param round-trip with filters
- [ ] Extend `SchoolCard/index.test.tsx` — checkbox isolation from link
- [ ] `e2e/smoke.spec.ts` — compare journey + URL restore
- [ ] `src/app/compare/page.tsx` — route + metadata

## Security Domain

### Applicable ASVS Categories

| ASVS Category | Applies | Standard Control |
|---------------|---------|------------------|
| V2 Authentication | no | N/A — static public site |
| V3 Session Management | no | N/A |
| V4 Access Control | no | N/A |
| V5 Input Validation | yes | Parse/sanitize slug list from URL; reject unknown slugs silently with notice (no execution path) |
| V6 Cryptography | no | N/A |

### Known Threat Patterns for {stack}

| Pattern | STRIDE | Standard Mitigation |
|---------|--------|---------------------|
| XSS via URL params reflected in DOM | Tampering / Spoofing | React text escaping; slugs resolved to known school records only — never `dangerouslySetInnerHTML` |
| Open redirect via compare CTA | Spoofing | Hardcode `/compare` path; slugs from internal allowlist (`getAllSchoolSlugs`) |
| DoS via huge slug list | Denial of Service | Cap at 4 slugs on parse; ignore excess |

## Project Constraints (from .cursor/rules/)

- **Static-first:** No production API, database, or auth for V1 [VERIFIED: .cursor/rules/gsd.mdc, AGENTS.md]
- **pnpm only:** Use Corepack-managed pnpm 11.11.0 [VERIFIED: AGENTS.md]
- **Language split:** Brazilian Portuguese UI; English routes and query param names (`compare`, `schools`) [VERIFIED: AGENTS.md, INFORMATION_ARCHITECTURE.md]
- **Feature-first colocation:** One directory per unit with `index.tsx` + colocated tests [VERIFIED: AGENTS.md]
- **No quality rankings:** Per `docs/COMPARISON.md` and project constraints [VERIFIED: .cursor/rules/gsd.mdc]
- **Reuse over new abstractions:** Extend SchoolDirectory/SchoolCard patterns; no state library [VERIFIED: AGENTS.md]
- **GSD workflow:** Phase work through planning artifacts — research only in this step [VERIFIED: .cursor/rules/gsd.mdc]

## Sources

### Primary (HIGH confidence)

- Codebase: `src/features/schools/SchoolProfile/constants.ts`, `ProfileFieldRow/index.tsx`, `SchoolDirectory/index.tsx`, `SchoolCard/index.tsx`, `getSchoolBySlug/index.ts`, `formatSchoolField/index.ts`, `StatusBadge/index.tsx`
- [CITED: https://github.com/vercel/next.js/blob/canary/docs/01-app/03-api-reference/04-functions/use-search-params.mdx] — Suspense + useSearchParams
- [CITED: https://github.com/vercel/next.js/blob/canary/docs/01-app/02-guides/static-exports.mdx] — static export compatibility
- Project docs: `docs/COMPARISON.md`, `docs/INFORMATION_ARCHITECTURE.md`, `docs/DATA_MODEL.md`
- `.planning/phases/06-school-comparison/06-CONTEXT.md` — locked decisions

### Secondary (MEDIUM confidence)

- Phase 5 patterns: `.planning/phases/05-directory-ux-discovery/05-RESEARCH.md`, `05-UI-SPEC.md` — sticky bar, 44px targets, URL sync

### Tertiary (LOW confidence)

- None material — all critical claims verified in codebase or official docs.

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH — no new dependencies; patterns exist in repo
- Architecture: HIGH — PROFILE_SECTIONS + URL sync + static lookup are deterministic
- Pitfalls: HIGH — SchoolCard link nesting and filter param merge are known concrete risks

**Research date:** 2026-07-11
**Valid until:** 2026-08-11 (stable stack; UI discretion items may iterate within phase)
