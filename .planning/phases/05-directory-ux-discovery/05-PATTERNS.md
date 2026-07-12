# Phase 5: Directory UX & Discovery - Pattern Map

**Mapped:** 2026-07-11
**Files analyzed:** 18
**Analogs found:** 16 / 18

## File Classification

| New/Modified File | Role | Data Flow | Closest Analog | Match Quality |
|-------------------|------|-----------|----------------|---------------|
| `src/features/schools/useDebouncedValue/index.ts` | hook | event-driven | `src/features/schools/SchoolDirectory/index.tsx` | partial |
| `src/features/schools/useDebouncedValue/index.test.ts` | test | batch | `src/features/schools/filterSchools/index.test.ts` | role-match |
| `src/features/schools/sortSchools/index.ts` | utility | transform | `src/features/schools/filterSchools/index.ts` | exact |
| `src/features/schools/sortSchools/types.ts` | model | transform | `src/features/schools/filterSchools/types.ts` | exact |
| `src/features/schools/sortSchools/index.test.ts` | test | transform | `src/features/schools/filterSchools/index.test.ts` | exact |
| `src/features/schools/SchoolDirectorySort/index.tsx` | component | request-response | `src/features/schools/SchoolSearch/index.tsx` | role-match |
| `src/features/schools/MobileFilterSheet/index.tsx` | component | event-driven | `src/features/navigation/SiteHeader/index.tsx` | exact |
| `src/features/schools/SchoolDirectory/index.tsx` | component | transform + request-response | `src/features/schools/SchoolDirectory/index.tsx` | exact (extend) |
| `src/features/schools/SchoolSearch/index.tsx` | component | request-response | `src/features/schools/SchoolSearch/index.tsx` | exact (extend) |
| `src/features/schools/SchoolFilters/index.tsx` | component | request-response | `src/features/schools/SchoolFilters/index.tsx` | exact (extend) |
| `src/features/schools/SchoolResults/index.tsx` | component | transform | `src/features/schools/SchoolResults/index.tsx` | exact (extend) |
| `src/features/schools/SchoolCard/index.tsx` | component | transform | `src/features/schools/SchoolCard/index.tsx` | exact (extend) |
| `src/features/schools/ActiveFilterSummary/index.tsx` | component | transform | `src/features/schools/ActiveFilterSummary/index.tsx` | exact (extend) |
| `src/features/schools/filterSchools/index.ts` | utility | transform | `src/features/schools/filterSchools/index.ts` | exact (comment only) |
| `docs/INFORMATION_ARCHITECTURE.md` | config | — | `docs/INFORMATION_ARCHITECTURE.md` | exact (extend) |
| `src/features/schools/SchoolDirectory/index.test.tsx` | test | request-response | `src/features/schools/SchoolDirectory/index.test.tsx` | exact (extend) |
| `src/features/schools/SchoolResults/index.test.tsx` | test | transform | `src/features/schools/SchoolResults/index.test.tsx` | exact (extend) |
| `e2e/smoke.spec.ts` | test | request-response | `e2e/smoke.spec.ts` | exact (extend) |

## Pattern Assignments

### `src/features/schools/useDebouncedValue/index.ts` (hook, event-driven)

**Analog:** `src/features/schools/SchoolDirectory/index.tsx` (client state + effects pattern; no hooks directory exists yet)

**Imports pattern** (lines 1-5):
```typescript
"use client";

import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
```

**Core hook pattern** (from RESEARCH — colocate under feature, `useEffect` + cleanup):
```typescript
import { useEffect, useState } from "react";

export function useDebouncedValue<T>(value: T, delayMs: number): T {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const id = setTimeout(() => setDebounced(value), delayMs);
    return () => clearTimeout(id);
  }, [value, delayMs]);

  return debounced;
}
```

**Integration pattern in orchestrator** (SchoolDirectory lines 40-67, 59-67 — replace instant `setQuery`):
```typescript
const [searchInput, setSearchInput] = useState(filters.query);
const debouncedQuery = useDebouncedValue(searchInput, 300);
const isSearchPending = searchInput !== debouncedQuery;

useEffect(() => {
  if (debouncedQuery === filters.query) return;
  updateFilters({ ...filters, query: debouncedQuery });
}, [debouncedQuery]);

useEffect(() => {
  setSearchInput(filters.query);
}, [filters.query]);
```

**Error handling:** None — hook is pure timing; URL sync errors handled by Next router at call site.

---

### `src/features/schools/useDebouncedValue/index.test.ts` (test, batch)

**Analog:** `src/features/schools/filterSchools/index.test.ts` (colocated pure-function test structure)

**Test structure pattern** (lines 1-14, 56-64):
```typescript
import { filterSchools, defaultDirectoryFilters } from ".";
import {
  getSchoolDirectoryItems,
  toSchoolDirectoryItem,
} from "@/features/schools/schoolDirectoryData";

const schools = getSchoolDirectoryItems();

describe("filterSchools", () => {
  it("searches by school name", () => {
    expect(
      filterSchools(schools, {
        ...defaultDirectoryFilters,
        query: "Lew-Tolstoi",
      }),
    ).toHaveLength(1);
  });
```

**Debounce timing pattern** (from RESEARCH — first fake-timer test in repo):
```typescript
import { renderHook, act } from "@testing-library/react";
import { useDebouncedValue } from ".";

jest.useFakeTimers();

it("updates debounced value after delay", () => {
  const { result, rerender } = renderHook(
    ({ value }) => useDebouncedValue(value, 300),
    { initialProps: { value: "a" } },
  );
  rerender({ value: "ab" });
  expect(result.current).toBe("a");
  act(() => jest.advanceTimersByTime(300));
  expect(result.current).toBe("ab");
});
```

---

### `src/features/schools/sortSchools/index.ts` (utility, transform)

**Analog:** `src/features/schools/filterSchools/index.ts`

**Imports pattern** (lines 1-7):
```typescript
import type {
  BinaryFilterValue,
  CoverageFilterValue,
  DirectoryFilterState,
  SchoolDirectoryItem,
  StatusFilterValue,
} from "./types";
```

**Pure transform pattern** (lines 24-28, 112-117):
```typescript
export function filterSchools(
  schools: SchoolDirectoryItem[],
  filters: DirectoryFilterState,
): SchoolDirectoryItem[] {
  const query = normalize(filters.query);

  return schools.filter((school) => {
```

```typescript
function normalize(value: string) {
  return value
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .toLowerCase()
    .trim();
}
```

**Sort comparator pattern** (tie-breaker from `collectCitedSources/index.ts` lines 49-51):
```typescript
.sort((a, b) =>
  a.source.title.localeCompare(b.source.title, "pt-BR"),
)
```

**Core sortSchools pattern** (from RESEARCH — copy array before sort like filter returns new array):
```typescript
export function sortSchools(
  schools: SchoolDirectoryItem[],
  sortKey: DirectorySortKey = "name",
): SchoolDirectoryItem[] {
  const copy = [...schools];

  switch (sortKey) {
    case "coverage":
      return copy.sort(
        (a, b) =>
          b.evidenceCoverage.percentage - a.evidenceCoverage.percentage ||
          a.name.localeCompare(b.name, "pt-BR"),
      );
    case "tier":
      return copy.sort((a, b) => {
        const tierRank = (s: SchoolDirectoryItem) =>
          s.coverageLevel === "detailed" ? 0 : 1;
        return tierRank(a) - tierRank(b) || a.name.localeCompare(b.name, "pt-BR");
      });
    case "name":
    default:
      return copy.sort((a, b) => a.name.localeCompare(b.name, "pt-BR"));
  }
}
```

---

### `src/features/schools/sortSchools/types.ts` (model, transform)

**Analog:** `src/features/schools/filterSchools/types.ts`

**Type export pattern** (lines 12-29):
```typescript
export type BinaryFilterValue = "yes" | "no" | "missing_or_unconfirmed";
export type StatusFilterValue = "verified" | "missing_or_unconfirmed";
export type CoverageFilterValue = "0-49" | "50-79" | "80-100";

export type DirectoryFilterState = {
  query: string;
  districts: string[];
  // ...
};
```

**New type** (keep sort separate from `DirectoryFilterState` per RESEARCH anti-pattern):
```typescript
import type { SchoolDirectoryItem } from "@/features/schools/filterSchools/types";

export type DirectorySortKey = "name" | "coverage" | "tier";
```

---

### `src/features/schools/sortSchools/index.test.ts` (test, transform)

**Analog:** `src/features/schools/filterSchools/index.test.ts`

**Fixture pattern** (lines 13-14, 56-64):
```typescript
const schools = getSchoolDirectoryItems();

describe("filterSchools", () => {
  it("searches by school name", () => {
    expect(
      filterSchools(schools, {
        ...defaultDirectoryFilters,
        query: "Lew-Tolstoi",
      }),
    ).toHaveLength(1);
  });
```

**Coverage/tier ordering tests** (use `toSchoolDirectoryItem` + fixtures like filterSchools lines 14-54):
```typescript
const detailed = { ...base, coverageLevel: "detailed" as const, name: "B School" };
const directory = { ...base, coverageLevel: "directory" as const, name: "A School" };
expect(sortSchools([directory, detailed], "tier")[0].coverageLevel).toBe("detailed");
```

---

### `src/features/schools/SchoolDirectorySort/index.tsx` (component, request-response)

**Analog:** `src/features/schools/SchoolSearch/index.tsx` (labeled form control; no `<select>` exists in repo)

**Labeled control pattern** (SchoolSearch lines 8-26):
```typescript
export function SchoolSearch({ value, onChange }: SchoolSearchProps) {
  return (
    <div className="space-y-2">
      <label
        htmlFor="school-search"
        className="block text-sm font-medium text-neutral-900"
      >
        Buscar escola pelo nome
      </label>
      <input
        id="school-search"
        type="search"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Digite o nome da escola"
        className="w-full rounded-md border border-neutral-300 bg-white px-3 py-2 text-base shadow-sm outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
      />
    </div>
  );
}
```

**Placement pattern** (SchoolDirectory lines 167-169 — flex row beside count):
```typescript
<p aria-live="polite" className="text-sm text-neutral-700">
  {filteredSchools.length} de {schools.length} escolas encontradas
</p>
```

**Sort select** — reuse input border/focus classes from SchoolSearch; native `<select>` per RESEARCH (no shadcn Select in `src/components/ui/`).

---

### `src/features/schools/MobileFilterSheet/index.tsx` (component, event-driven)

**Analog:** `src/features/navigation/SiteHeader/index.tsx` + `src/components/ui/Sheet/index.tsx`

**Sheet state pattern** (SiteHeader lines 43-45, 68-103):
```typescript
export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    // ...
    <Sheet open={open} onOpenChange={setOpen}>
      {!open ? (
        <Button
          type="button"
          variant="outline"
          aria-label="Abrir menu de navegação"
          aria-expanded={false}
          aria-controls="mobile-nav"
          onClick={() => setOpen(true)}
          className="md:hidden size-11"
        >
          <Menu className="size-5" />
        </Button>
      ) : null}
      <SheetContent
        side="right"
        id="mobile-nav"
        className="w-[280px] max-w-[85vw]"
      >
        <SheetHeader>
          <SheetTitle>Navegação</SheetTitle>
        </SheetHeader>
        {/* scrollable body */}
      </SheetContent>
    </Sheet>
  );
}
```

**Sheet primitive imports** (Sheet lines 1-14, 109-116):
```typescript
"use client";

import * as SheetPrimitive from "@radix-ui/react-dialog";
import { cva, type VariantProps } from "class-variance-authority";
import { X } from "lucide-react";
// ...

export {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
};
```

**Draft + apply-on-close pattern** (from RESEARCH — extend SiteHeader's immediate `onOpenChange`):
```typescript
const [sheetOpen, setSheetOpen] = useState(false);
const [draftFilters, setDraftFilters] = useState(filters);

useEffect(() => {
  if (sheetOpen) setDraftFilters(filters);
}, [sheetOpen, filters]);

const handleSheetOpenChange = (open: boolean) => {
  if (!open && sheetOpen) {
    updateFilters(draftFilters);
  }
  setSheetOpen(open);
};
```

**Fixed header/footer + scrollable body** (override SheetContent default `p-6`):
```tsx
<SheetContent side="right" className="flex h-full w-[min(100%,20rem)] flex-col p-0">
  <SheetHeader className="shrink-0 border-b px-6 py-4">
    <SheetTitle>Filtros</SheetTitle>
  </SheetHeader>
  <div className="min-h-0 flex-1 overflow-y-auto px-6 py-4">
    <SchoolFilters filters={draftFilters} onToggle={toggleDraft} ... />
  </div>
  <footer className="shrink-0 border-t px-6 py-4 flex gap-3">
    <button onClick={() => updateFilters(draftFilters)}>Aplicar filtros</button>
    <button onClick={() => setDraftFilters(defaultDirectoryFilters)}>Limpar filtros</button>
  </footer>
</SheetContent>
```

**Sticky trigger bar** — replace SchoolDirectory lines 137-159 inline expand with `lg:hidden sticky` bar using `Button` from `@/components/ui/Button`.

---

### `src/features/schools/SchoolDirectory/index.tsx` (component, transform + request-response)

**Analog:** Self — extend existing orchestrator

**URL as source of truth** (lines 25-38, 46-57, 178-235):
```typescript
const queryParamMap = {
  query: "q",
  districts: "district",
  neighbourhoods: "neighbourhood",
  // ...
} as const satisfies Record<keyof DirectoryFilterState, string>;

const filters = useMemo(
  () => filtersFromSearchParams(searchParams),
  [searchParams],
);
const filteredSchools = useMemo(
  () => filterSchools(schools, filters),
  [schools, filters],
);
```

**Router replace pattern** (lines 59-63):
```typescript
const updateFilters = (nextFilters: DirectoryFilterState) => {
  router.replace(`${pathname}${toQueryString(nextFilters)}`, {
    scroll: false,
  });
};
```

**Pipeline extension** — add sort after filter (keep separate from `DirectoryFilterState`):
```typescript
const sortKey = useMemo(() => sortFromSearchParams(searchParams), [searchParams]);
const filteredSchools = useMemo(
  () => filterSchools(schools, filters),
  [schools, filters],
);
const sortedSchools = useMemo(
  () => sortSchools(filteredSchools, sortKey),
  [filteredSchools, sortKey],
);
```

**Pending search UI** (lines 167-169 — extend existing `aria-live`):
```typescript
<p aria-live="polite" className="text-sm text-neutral-700">
  {sortedSchools.length} de {schools.length} escolas encontradas
  {isSearchPending ? (
    <span className="text-neutral-500"> · Atualizando…</span>
  ) : null}
</p>
```

**Dynamic header counts** (D-19 — compute from `schools` prop, lines 104-117 header block):
```typescript
const detailed = schools.filter((s) => s.coverageLevel === "detailed").length;
const directory = schools.filter((s) => s.coverageLevel === "directory").length;
```

**Desktop sidebar unchanged** (lines 121-132 — `hidden lg:block sticky top-6`).

---

### `src/features/schools/SchoolSearch/index.tsx` (component, request-response)

**Analog:** Self — wire to local `searchInput` instead of `filters.query`

**Controlled input** (lines 3-26) stays the same; parent passes `value={searchInput}` and `onChange={setSearchInput}`.

---

### `src/features/schools/SchoolFilters/index.tsx` (component, request-response)

**Analog:** Self — extend `FilterGroup` composition

**Flat filter list pattern** (lines 10-115):
```typescript
export function SchoolFilters({ filters, options, onToggle }: SchoolFiltersProps) {
  return (
    <div className="space-y-6">
      <FilterGroup
        legend="Distrito"
        name="district"
        values={options.districts}
        selected={filters.districts}
        onToggle={(value) => onToggle("districts", value)}
      />
      {/* ... */}
    </div>
  );
}
```

**FilterGroup fieldset pattern** (lines 127-159):
```typescript
function FilterGroup<Value extends string>({ legend, name, values, selected, labels, onToggle }: FilterGroupProps<Value>) {
  return (
    <fieldset className="space-y-3">
      <legend className="text-sm font-semibold text-neutral-950">
        {legend}
      </legend>
      <div className="space-y-2">
        {values.map((value) => (
          <label key={value} className="flex items-center gap-2 text-sm text-neutral-800">
            <input
              type="checkbox"
              name={name}
              value={value}
              checked={selected.includes(value)}
              onChange={() => onToggle(value)}
              className="h-4 w-4 rounded border-neutral-300"
            />
            <span>{labels?.[value] ?? value}</span>
          </label>
        ))}
      </div>
    </fieldset>
  );
}
```

**Essenciais / Avançados split** — native `<details>` (no Collapsible in repo; RESEARCH Pattern 4):
```tsx
<div className="space-y-6">{/* Essenciais FilterGroups */}</div>
<details className="group">
  <summary className="cursor-pointer text-sm font-semibold text-neutral-950">
    Avançados
  </summary>
  <div className="mt-4 space-y-6">{/* advanced FilterGroups */}</div>
</details>
```

**Help links in legend** (methodology link from SchoolDirectory lines 114-116):
```tsx
<legend className="flex items-center gap-2 text-sm font-semibold text-neutral-950">
  Ganztag
  <Link href="/methodology" className="text-xs font-normal text-blue-700">
    O que é Ganztag?
  </Link>
</legend>
```

---

### `src/features/schools/SchoolResults/index.tsx` (component, transform)

**Analog:** Self — extend empty state stub

**Current empty state** (lines 8-19):
```typescript
export function SchoolResults({ schools }: SchoolResultsProps) {
  if (schools.length === 0) {
    return (
      <section className="rounded-lg border border-neutral-200 bg-neutral-50 p-8 text-center">
        <h2 className="text-xl font-semibold text-neutral-950">
          Nenhuma escola encontrada
        </h2>
        <p className="mt-2 text-neutral-700">
          Ajuste a busca ou remova alguns filtros para ver mais resultados.
        </p>
      </section>
    );
  }
```

**Results list pattern** (lines 22-28):
```typescript
  return (
    <section className="space-y-4" aria-label="Resultados de escolas">
      {schools.map((school) => (
        <SchoolCard key={school.id} school={school} />
      ))}
    </section>
  );
```

**Extend props** — pass `filters`, `totalCount`, `onClearSearch`, `onResetFilters`; reuse chip labels from `ActiveFilterSummary` formatter.

**Methodology CTA** — copy link pattern from SchoolDirectory header (lines 114-116):
```typescript
<Link href="/methodology" className="font-medium text-blue-700 underline">
  Como funciona nossa pesquisa?
</Link>
```

**Reset button** — mirror ActiveFilterSummary (lines 37-43):
```typescript
<button
  type="button"
  onClick={onReset}
  className="text-sm font-medium text-blue-700"
>
  Limpar filtros
</button>
```

---

### `src/features/schools/SchoolCard/index.tsx` (component, transform)

**Analog:** Self — polish coverage block only (D-17)

**Coverage block** (lines 114-122):
```typescript
<div className="mt-5 rounded-md bg-neutral-50 p-3">
  <p className="text-sm font-medium text-neutral-950">
    Cobertura da pesquisa
  </p>
  <p className="text-sm text-neutral-700">
    {school.coverageTierLabel} · {school.evidenceCoverage.percentage}% ·
    mede completude da pesquisa neste nível, não qualidade da escola.
  </p>
</div>
```

**Tier help affordance** (D-18 — `title` + `aria-label`, no Popover in ui/):
```tsx
<button
  type="button"
  title="Pesquisa detalhada inclui mais campos verificados no perfil da escola."
  aria-label="O que significa este nível de pesquisa?"
  className="text-xs text-neutral-500"
>
  ?
</button>
```

**Tier labels** — use existing `school.coverageTierLabel` from `getCoverageTierLabel` ("Pesquisa básica" / "Pesquisa detalhada").

---

### `src/features/schools/ActiveFilterSummary/index.tsx` (component, transform)

**Analog:** Self — extract `formatChipValue` for reuse in `SchoolResults`

**Chip rendering** (lines 22-45):
```typescript
return (
  <div className="space-y-3" aria-label="Filtros ativos">
    <div className="flex flex-wrap gap-2">
      {chips.map((chip) => (
        <button
          key={`${chip.key}-${chip.value ?? "query"}`}
          type="button"
          onClick={() => onRemove(chip.key, chip.value)}
          className="rounded-full border border-neutral-300 bg-white px-3 py-1 text-sm text-neutral-800"
          aria-label={`Remover filtro ${chip.label}`}
        >
          {chip.label} ×
        </button>
      ))}
    </div>
```

**Chip builder + formatter** (lines 48-104 — export `getChips` / `formatChipValue` or move to `utils.ts`):
```typescript
function formatChipValue(value: string) {
  const labels: Record<string, string> = {
    public: "Pública",
    private: "Privada",
    yes: "Sim",
    no: "Não",
    missing_or_unconfirmed: "Faltante ou incerta",
    verified: "Verificada",
    available: "Disponível",
    unavailable: "Indisponível",
    not_confirmed: "Não confirmada",
  };
  return labels[value] ?? value;
}
```

---

### `src/features/schools/filterSchools/index.ts` (utility, transform)

**Analog:** Self — add DISC-07 scaling comment only

**Export pattern** (lines 9-22, 24-27):
```typescript
export const defaultDirectoryFilters: DirectoryFilterState = {
  query: "",
  districts: [],
  // ...
};

export function filterSchools(
  schools: SchoolDirectoryItem[],
  filters: DirectoryFilterState,
): SchoolDirectoryItem[] {
```

**Scaling comment** (from RESEARCH):
```typescript
// Directory filter runs client-side on the full school list passed from static props.
// V1 Lichtenberg (~10 schools): memoized filter → sort is sufficient.
// If Berlin-wide import (500+ schools): consider pre-normalized search index,
// virtualized list rendering, and/or Web Worker for filter — out of V1 scope.
```

---

### `docs/INFORMATION_ARCHITECTURE.md` (config)

**Analog:** Self — extend query param section (lines 78-84)

**Existing param documentation**:
```text
/schools?q=example&district=Mitte&neighbourhood=Moabit&type=public&coverage=80-100
```

Supported M4 query parameter names should include `q`, `district`, `neighbourhood`, `type`, `ganztag`, `bilingual`, `welcome`, `language`, `focus`, `afterSchool`, `inspection`, and `coverage`.

**Add:** `sort=name|coverage|tier` (omit when default `name`).

---

### `src/features/schools/SchoolDirectory/index.test.tsx` (test, request-response)

**Analog:** Self — extend with fake timers and sort/Sheet cases

**Mock pattern** (lines 6-13):
```typescript
const replace = jest.fn();
let params = new URLSearchParams();

jest.mock("next/navigation", () => ({
  usePathname: () => "/schools",
  useRouter: () => ({ replace }),
  useSearchParams: () => params,
}));
```

**URL sync test to update** (lines 28-38 — add `jest.advanceTimersByTime(300)`):
```typescript
it("syncs search to URL query parameters", () => {
  render(<SchoolDirectory schools={getSchoolDirectoryItems()} />);

  fireEvent.change(screen.getByLabelText("Buscar escola pelo nome"), {
    target: { value: "Lew" },
  });

  expect(replace).toHaveBeenLastCalledWith("/schools?q=Lew", {
    scroll: false,
  });
});
```

**Sheet test analog** (SiteHeader test lines 99-110):
```typescript
fireEvent.click(
  screen.getByRole("button", { name: "Abrir menu de navegação" }),
);
expect(screen.getByRole("heading", { name: "Navegação" })).toBeVisible();
```

---

### `src/features/schools/SchoolResults/index.test.tsx` (test, transform)

**Analog:** Self + `ActiveFilterSummary/index.test.tsx` (user-event for actions)

**Empty state test** (lines 14-19):
```typescript
it("renders an accessible empty state", () => {
  render(<SchoolResults schools={[]} />);
  expect(
    screen.getByRole("heading", { name: "Nenhuma escola encontrada" }),
  ).toBeVisible();
});
```

**Action callback pattern** (ActiveFilterSummary test lines 8-31):
```typescript
const user = userEvent.setup();
const onRemove = jest.fn();
const onReset = jest.fn();
await user.click(screen.getByRole("button", { name: "Limpar filtros" }));
expect(onReset).toHaveBeenCalled();
```

---

### `e2e/smoke.spec.ts` (test, request-response)

**Analog:** Self — extend directory flow test (lines 30-63)

**Search + filter flow**:
```typescript
await page.getByLabel("Buscar escola pelo nome").fill("Lew-Tolstoi");
await expect(page.getByText("1 de 10 escolas encontradas")).toBeVisible();
```

**Empty state assertion** (lines 58-62):
```typescript
await page.getByLabel("Buscar escola pelo nome").fill("sem resultado");
await expect(page.getByText("0 de 10 escolas encontradas")).toBeVisible();
await expect(
  page.getByRole("heading", { name: "Nenhuma escola encontrada" }),
).toBeVisible();
```

**Add:** sort URL share link; optional mobile viewport Sheet test with `page.setViewportSize`.

---

## Shared Patterns

### URL sync (filters + sort)
**Source:** `src/features/schools/SchoolDirectory/index.tsx`
**Apply to:** `SchoolDirectory`, `sortSchools` integration, debounced `q`
```typescript
const updateFilters = (nextFilters: DirectoryFilterState) => {
  router.replace(`${pathname}${toQueryString(nextFilters)}`, {
    scroll: false,
  });
};

function toQueryString(filters: DirectoryFilterState) {
  const params = new URLSearchParams();
  if (filters.query) {
    params.set(queryParamMap.query, filters.query);
  }
  // append array params...
  const queryString = params.toString();
  return queryString ? `?${queryString}` : "";
}
```
Extend `toQueryString` / parsers with `sort` param; keep sort out of `DirectoryFilterState`.

### Sheet mobile drawer
**Source:** `src/features/navigation/SiteHeader/index.tsx` + `src/components/ui/Sheet/index.tsx`
**Apply to:** `MobileFilterSheet`, sticky "Filtros (N ativos)" trigger
```typescript
<Sheet open={open} onOpenChange={setOpen}>
  <SheetContent side="right" className="w-[280px] max-w-[85vw]">
    <SheetHeader>
      <SheetTitle>Filtros</SheetTitle>
    </SheetHeader>
  </SheetContent>
</Sheet>
```

### Memoized client pipeline
**Source:** `src/features/schools/SchoolDirectory/index.tsx`
**Apply to:** filter → sort chain (DISC-07)
```typescript
const filterOptions = useMemo(() => getDirectoryFilterOptions(schools), [schools]);
const filteredSchools = useMemo(() => filterSchools(schools, filters), [schools, filters]);
```

### Portuguese UI / English URL params
**Source:** `SchoolDirectory` `queryParamMap`, `ActiveFilterSummary` chip labels
**Apply to:** All new labels, sort option text, empty states; param keys `q`, `sort`, `district`, etc.

### Accessibility: live regions
**Source:** `SchoolDirectory/index.tsx` line 167
**Apply to:** Result count + "Atualizando…" pending state
```typescript
<p aria-live="polite" className="text-sm text-neutral-700">
```

### Methodology trust links
**Source:** `SchoolDirectory/index.tsx` lines 114-116
**Apply to:** Empty state (D-14), filter help links (D-22)
```typescript
<Link href="/methodology" className="font-medium text-blue-700 underline">
  Como funciona nossa pesquisa?
</Link>
```

### Colocated pure utilities + tests
**Source:** `filterSchools/`, `getDirectoryFilterOptions/`, `getCoverageTierLabel/`
**Apply to:** `sortSchools/`, `useDebouncedValue/`
```text
sortSchools/
├── index.ts
├── index.test.ts
└── types.ts
```

## No Analog Found

| File | Role | Data Flow | Reason |
|------|------|-----------|--------|
| Native `<select>` sort control | component | request-response | No `<select>` in codebase; mirror `SchoolSearch` input styling |
| `<details>` Avançados collapse | component | request-response | No collapsible primitive; RESEARCH recommends native `<details>` (zero-deps) |
| `useDebouncedValue` hook | hook | event-driven | First colocated hook in repo; follow React `useEffect` cleanup pattern from RESEARCH |

## Metadata

**Analog search scope:** `src/features/schools/`, `src/features/navigation/`, `src/components/ui/`, `e2e/`, `docs/`
**Files scanned:** 56 school feature files + navigation + ui + e2e
**Pattern extraction date:** 2026-07-11

## PATTERN MAPPING COMPLETE

**Phase:** 5 - Directory UX & Discovery
**Files classified:** 18
**Analogs found:** 16 / 18

### Coverage
- Files with exact analog: 12
- Files with role-match analog: 4
- Files with no analog: 2 (native `<select>`, `<details>` — use RESEARCH patterns)

### Key Patterns Identified
- URL is single source of truth via `router.replace` + `queryParamMap`; debounce only affects when `q` commits
- Client pipeline: `useMemo(filterSchools)` → `useMemo(sortSchools)` keyed on `[schools, filters, sortKey]`
- Mobile filters copy `SiteHeader` Sheet (`side="right"`, controlled `open`/`onOpenChange`) with draft state + apply-on-close
- Pure utilities colocated under `src/features/schools/` with `index.test.ts` (see `filterSchools`, `getDirectoryFilterOptions`)
- Chip label formatting shared between `ActiveFilterSummary` and contextual empty states in `SchoolResults`

### File Created
`.planning/phases/05-directory-ux-discovery/05-PATTERNS.md`

### Ready for Planning
Pattern mapping complete. Planner can now reference analog patterns in PLAN.md files.
