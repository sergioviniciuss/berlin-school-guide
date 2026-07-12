# Phase 2: Research Process & Attribution - Pattern Map

**Mapped:** 2026-07-11
**Files analyzed:** 11 new/modified files
**Analogs found:** 10 / 11

## File Classification

| New/Modified File | Role | Data Flow | Closest Analog | Match Quality |
|-------------------|------|-----------|----------------|---------------|
| `docs/research/SCHOOL_RESEARCH_WORKFLOW.md` | config (documentation) | file-I/O | `docs/RESEARCH.md` + `docs/research/REAL_SCHOOL_RESEARCH_SPIKE.md` | role-match |
| `src/content/guides/methodology.mdx` | config (content) | file-I/O | `src/content/guides/m2-smoke.mdx` | exact |
| `src/app/methodology/page.tsx` | route | request-response (static build) | `src/app/guides/m2-smoke/page.tsx` | exact |
| `src/app/methodology/page.test.tsx` | test | — | `src/features/guides/GuideIntro/index.test.tsx` | partial (no app page tests exist) |
| `src/features/schools/validateResearchDates/index.ts` | utility | transform / batch | `src/features/evidence/validateFieldCitations/index.ts` + `src/features/evidence/calculateEvidenceCoverage/index.ts` | role-match |
| `src/features/schools/validateResearchDates/index.test.ts` | test | — | `src/features/evidence/validateFieldCitations/index.test.ts` | exact |
| `src/features/schools/validateSchools/index.ts` | service | batch | `src/features/schools/validateSchools/index.ts` (extend in place) | exact |
| `src/features/schools/SchoolDirectory/index.tsx` | component | event-driven (client nav) | `src/app/page.tsx` (Link) + existing `SchoolDirectory` header | partial |
| `src/features/schools/SchoolDirectory/index.test.tsx` | test | — | `src/features/schools/SchoolDirectory/index.test.tsx` | exact |
| `src/content/schools/real/lichtenbergPrimarySchools/index.ts` | model (static data) | transform | same file + Phase 1 `01-PATTERNS.md` field builders | exact |

## Pattern Assignments

### `docs/research/SCHOOL_RESEARCH_WORKFLOW.md` (config, file-I/O)

**Analog:** `docs/RESEARCH.md` (policy structure) + `docs/research/REAL_SCHOOL_RESEARCH_SPIKE.md` (executable spike findings)

**Section heading pattern** from `docs/RESEARCH.md` (lines 3-9):

```markdown
## Research Standard

Every factual school attribute should be supported by evidence.

If a claim cannot be verified, it should be omitted, marked as missing, or labeled `não confirmado`, depending on the context.
```

**Cross-link pattern** — workflow opens with canonical refs, links policy instead of duplicating (D-03):

```markdown
## Prerequisites

- Policy: [docs/RESEARCH.md](../../RESEARCH.md) — source hierarchy, citation philosophy
- Data model: [docs/DATA_MODEL.md](../../DATA_MODEL.md) — coverage levels, field evidence
- Spike baseline: [REAL_SCHOOL_RESEARCH_SPIKE.md](./REAL_SCHOOL_RESEARCH_SPIKE.md)
```

**Executable checklist pattern** from spike doc (lines 1-9, 11-24):

```markdown
# Real School Research Spike

Date checked: 2026-07-10

## Purpose

This spike tests whether Berlin School Guide can use real Berlin school data…

## Official Sources Found

### Official Berlin School Directory

Source: `https://www.bildung.berlin.de/Schulverzeichnis/`
```

**Decision-tree block pattern** (new — mirror Phase 1 code semantics):

```markdown
### Field: afterSchoolCare (directory tier)

1. Portrait lists Ganztag model? → record `ganztag` as `verified`
2. Infer afterSchoolCare from Ganztag? → `not_confirmed` via `inferredFrom()` + mandatory Portuguese note
3. No portrait? → `missing`
```

**Completion gate** — end every workflow pass with `pnpm validate:data` (matches `validateSchools/index.ts` CLI entry).

---

### `src/content/guides/methodology.mdx` (config, file-I/O)

**Analog:** `src/content/guides/m2-smoke.mdx`

**MDX prose pattern** (lines 1-4):

```mdx
# Página MDX de validação

Esta página existe apenas para validar que o App Router renderiza conteúdo MDX de forma estática.
```

**Apply for methodology:** H1 + short sections in Brazilian Portuguese; no React imports in MDX. Use `##` subsections for evidence statuses, coverage v2, glossary (D-06–D-08).

**Label sync — do not hand-write status strings.** Mirror exact labels from `formatFieldStatus` and `getCoverageTierLabel` (see Shared Patterns).

**German term gloss** — follow `docs/EDITORIAL_GUIDE.md` (lines 9-17):

```markdown
- Ganztag: modelo de escola em tempo integral ou com atividades ao longo do dia.
- Hort: cuidado ou atividades supervisionadas após o horário regular de aula.
- Willkommensklasse: turma de acolhimento para crianças recém-chegadas.
```

---

### `src/app/methodology/page.tsx` (route, static build)

**Analog:** `src/app/guides/m2-smoke/page.tsx`

**Imports + metadata pattern** (lines 1-12):

```tsx
import M2SmokeGuide from "@/content/guides/m2-smoke.mdx";

export const metadata = {
  title: "Página MDX de validação",
};

export default function M2SmokeGuidePage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-12">
      <M2SmokeGuide />
    </main>
  );
}
```

**Recommended methodology variant** — optional `GuideIntro` above MDX (hybrid with `src/app/page.tsx`):

```tsx
import MethodologyGuide from "@/content/guides/methodology.mdx";
import { GuideIntro } from "@/features/guides/GuideIntro";

export const metadata = {
  title: "Metodologia",
  description:
    "Como interpretamos evidências, dados ausentes e cobertura da pesquisa.",
};

export default function MethodologyPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-12 space-y-8">
      <GuideIntro
        eyebrow="Berlin School Guide"
        title="Como funciona nossa pesquisa"
        description="Entenda o que significam os status de evidência, a cobertura da pesquisa e os termos alemães que você vê nos cartões."
      />
      <MethodologyGuide />
    </main>
  );
}
```

---

### `src/app/methodology/page.test.tsx` (test, optional)

**Analog:** `src/features/guides/GuideIntro/index.test.tsx` (no `src/app/**/page.test.tsx` exists yet)

**Smoke test pattern** (lines 5-21):

```tsx
import { render, screen } from "@testing-library/react";

describe("GuideIntro", () => {
  it("renders the guide introduction content", () => {
    render(
      <GuideIntro
        eyebrow="Teste"
        title="Guia de validação"
        description="Componente mínimo para validar React Testing Library."
      />,
    );

    expect(
      screen.getByRole("heading", { name: "Guia de validação" }),
    ).toBeInTheDocument();
  });
});
```

**Apply:** Import `MethodologyPage` default export; assert `getByRole("heading", { name: /metodologia|pesquisa/i })`. Metadata assertions optional (static export).

---

### `src/features/schools/validateResearchDates/index.ts` (utility, transform/batch)

**Analog:** `src/features/evidence/validateFieldCitations/index.ts` (pure function) + `src/features/evidence/calculateEvidenceCoverage/index.ts` (School in → result out)

**Pure function signature pattern** from `validateFieldCitations` (lines 5-22):

```typescript
export function validateFieldCitations(
  evidence: FieldEvidence,
  sources: Source[],
) {
  const sourceById = new Map(sources.map((source) => [source.id, source]));
  // ...
  return {
    hasUnknownSource,
    hasAcceptableSource,
  };
}
```

**Recommended `validateResearchDates` shape:**

```typescript
import type { School } from "@/features/schools/school";

export function validateResearchDates(school: School): string[] {
  const failures: string[] = [];
  const { lastResearched, lastSourceChecked } = school.research;

  if (!lastResearched || !lastSourceChecked) {
    failures.push(
      `${school.id}: Real schools must include lastResearched and lastSourceChecked.`,
    );
    return failures;
  }

  // Collect cited source IDs from field evidence (mirror schoolSchema walk)
  // Compare lastSourceChecked against min/max dateAccessed on cited sources
  return failures;
}
```

**Field name:** Use `dateAccessed` on `Source`, not `accessedAt` (`src/features/evidence/source/index.ts` lines 8-18).

**Cited-source collection:** `collectFieldEvidence` is private in `school/index.ts` (lines 148-166). Options: (a) export a shared `collectFieldEvidence` from `school/` for reuse, or (b) duplicate the recursive walk locally — prefer (a) to avoid drift.

**Date coherence rules (D-15–D-17, D-16 recommendation):**
- Require both dates on all 10 real schools
- `lastSourceChecked >= min(cited source dateAccessed)`
- `lastSourceChecked >= max(cited source dateAccessed)` (aligns with D-16 semantics)

---

### `src/features/schools/validateResearchDates/index.test.ts` (test)

**Analog:** `src/features/evidence/validateFieldCitations/index.test.ts`

**Fixture-driven unit test pattern** (lines 7-36):

```typescript
describe("validateFieldCitations", () => {
  it("detects acceptable cited sources", () => {
    expect(
      validateFieldCitations(
        {
          status: "verified",
          citations: [{ sourceId: officialDirectorySource.id }],
        },
        [officialDirectorySource],
      ),
    ).toEqual({
      hasUnknownSource: false,
      hasAcceptableSource: true,
    });
  });
});
```

**Apply:** Build minimal `School` stubs (or slice from `validDetailedPublicSchool` fixture) with controlled `research` dates and `sources[].dateAccessed`. Test: missing dates → failure; `lastSourceChecked` before cited `dateAccessed` → failure; coherent dates → `[]`.

**Schema date rules analog** from `researchMetadata/index.test.ts` (lines 16-23) — detailed tier requires dates globally, but directory fixtures omit them; real-school-only helper avoids breaking fixtures.

---

### `src/features/schools/validateSchools/index.ts` (service, batch — EXTEND)

**Analog:** same file

**Real-school validation loop** (lines 45-66):

```typescript
export function validateRealSchools() {
  const failures = realLichtenbergPrimarySchools.flatMap((school) => {
    const result = schoolSchema.safeParse(school);

    if (result.success) {
      return [];
    }

    return [
      {
        fileName: `real:${school.id}`,
        errors: result.error.issues.map(
          (issue) => `${issue.path.join(".")}: ${issue.message}`,
        ),
      },
    ];
  });

  return {
    checked: realLichtenbergPrimarySchools.length,
    failures,
  };
}
```

**Extension pattern** — after `schoolSchema.safeParse` succeeds, run `validateResearchDates(school)` and merge errors:

```typescript
if (result.success) {
  const dateErrors = validateResearchDates(result.data);
  if (dateErrors.length === 0) {
    return [];
  }
  return [{ fileName: `real:${school.id}`, errors: dateErrors }];
}
```

**CLI aggregation** (lines 69-81) — unchanged; new failures surface through same `failures` array and `process.exit(1)`.

**Note on D-13:** Citation acceptability is already enforced in `schoolSchema.superRefine` (lines 57-97 of `school/index.ts`). Do not re-wire `validateFieldCitations` separately.

---

### `src/features/schools/SchoolDirectory/index.tsx` (component — EXTEND)

**Analog:** existing header block (lines 103-114) + `src/app/page.tsx` Link (lines 1-17)

**Current header copy** (lines 103-113):

```tsx
<header className="space-y-3">
  <p className="text-sm font-semibold uppercase text-blue-700">
    Berlin School Guide
  </p>
  <h1 className="text-4xl font-semibold text-neutral-950">Escolas</h1>
  <p className="max-w-3xl text-lg leading-8 text-neutral-700">
    Explore escolas primárias em Berlim com informações verificadas e
    transparência sobre o que ainda não confirmamos. Começamos por
    Lichtenberg — mais distritos em breve. A cobertura da pesquisa mede
    completude dos dados neste nível, não qualidade da escola.
  </p>
</header>
```

**Link pattern** from `src/app/page.tsx` (lines 1, 15-17):

```tsx
import Link from "next/link";

<Link href="/schools">Ver escolas em Lichtenberg</Link>
```

**Apply inside header paragraph (D-10):**

```tsx
import Link from "next/link";

<p className="max-w-3xl text-lg leading-8 text-neutral-700">
  …cobertura da pesquisa mede completude dos dados neste nível, não qualidade da escola.{" "}
  <Link href="/methodology" className="font-medium text-blue-700 underline">
    Como funciona nossa pesquisa?
  </Link>
</p>
```

`"use client"` already present — `next/link` works without extra wrapper.

---

### `src/features/schools/SchoolDirectory/index.test.tsx` (test — EXTEND)

**Analog:** same file

**Existing render + heading assertion** (lines 21-26):

```tsx
it("renders the directory and result count", () => {
  render(<SchoolDirectory schools={getSchoolDirectoryItems()} />);

  expect(screen.getByRole("heading", { name: "Escolas" })).toBeVisible();
  expect(screen.getByText("10 de 10 escolas encontradas")).toBeVisible();
});
```

**Add methodology link test:**

```tsx
it("links to the methodology page from the header", () => {
  render(<SchoolDirectory schools={getSchoolDirectoryItems()} />);

  expect(
    screen.getByRole("link", { name: /como funciona nossa pesquisa/i }),
  ).toHaveAttribute("href", "/methodology");
});
```

**Router mock** (lines 6-13) — keep unchanged.

---

### `src/content/schools/real/lichtenbergPrimarySchools/index.ts` (model — EXTEND)

**Analog:** same file + Phase 1 `01-PATTERNS.md`

**Current shared-date anti-pattern** (lines 10-18, 214-219):

```typescript
const checkedAt = "2026-07-10";

function source(input: SourceInput): Source {
  return {
    ...input,
    dateAccessed: checkedAt,
  };
}

// ...
research: {
  status: researchStatus,
  coverageLevel,
  lastResearched: checkedAt,
  lastSourceChecked: checkedAt,
},
```

**Target pattern — per-source `dateAccessed`:**

```typescript
type SourceInput = Omit<Source, "dateAccessed"> & { dateAccessed: string };

function source(input: SourceInput): Source {
  return input;
}
```

**Per-school research dates** — extend `BaseSchoolInput`:

```typescript
type BaseSchoolInput = {
  // ...existing fields
  lastResearched?: string;
  lastSourceChecked?: string;
};

// inside primarySchool():
research: {
  status: researchStatus,
  coverageLevel,
  lastResearched: input.lastResearched ?? deriveLastResearched(sources),
  lastSourceChecked: input.lastSourceChecked ?? maxDateAccessed(sources),
},
```

**Multi-source school pattern** (lines 283-284) — each extra source gets its own `dateAccessed`:

```typescript
sources: [adamRiesWebsite, adamRiesWelcomeClasses],
```

**Inference pattern** — workflow must document; code already uses `inferredFrom` (`inferredFrom/index.ts` lines 7-17):

```typescript
return {
  status: "not_confirmed",
  citations: input.sourceEvidence.citations,
  note: input.note,
  lastChecked: input.sourceEvidence.lastChecked,
};
```

**Evidence helpers** (lines 48-53) — keep `lastChecked` aligned with source check date for that field.

---

## Shared Patterns

### Citation validation (already wired — do not duplicate)

**Source:** `src/features/schools/school/index.ts` (lines 57-97)
**Apply to:** All schools via `pnpm validate:data`; Phase 2 adds date checks only

```typescript
.superRefine((school, context) => {
  const fieldEntries = collectFieldEvidence(school);

  for (const { path, value, evidence } of fieldEntries) {
    const citationResult = validateFieldCitations(evidence, school.sources);

    if (evidence.status === "verified") {
      if (evidence.citations.length === 0) { /* addIssue */ }
      if (!citationResult.hasAcceptableSource) { /* addIssue */ }
    }
  }
});
```

### Source record shape

**Source:** `src/features/evidence/source/index.ts` (lines 8-18)
**Apply to:** All `sources[]` entries during citation audit

```typescript
export const sourceSchema = z.object({
  id: z.string().min(1),
  title: z.string().min(1),
  url: z.string().url(),
  type: sourceTypeSchema,
  reliability: reliabilityLevelSchema,
  publisher: z.string().min(1),
  dateAccessed: z.string().date(),
  datePublished: z.string().date().optional(),
  notes: z.string().optional(),
});
```

### Evidence status labels (methodology + cards)

**Source:** `src/features/schools/formatSchoolField/index.ts` (lines 7-18)
**Apply to:** `methodology.mdx` status glossary — use exact strings

```typescript
const labels: Record<FieldStatus, string> = {
  verified: "Verificado",
  missing: "Informação não encontrada",
  unverified: "Informação não verificada",
  not_confirmed: "Informação inferida, não confirmada",
  outdated: "Precisa de nova verificação",
  conflicting: "Informação conflitante",
  not_applicable: "Não se aplica",
};
```

### Coverage tier labels

**Source:** `src/features/schools/getCoverageTierLabel/index.ts` (lines 1-7)
**Apply to:** Methodology coverage v2 explanation (D-07)

```typescript
export function getCoverageTierLabel(
  coverageLevel: "directory" | "detailed",
): "Pesquisa básica" | "Pesquisa detalhada" {
  return coverageLevel === "directory"
    ? "Pesquisa básica"
    : "Pesquisa detalhada";
}
```

### Colocated feature directory

**Source:** `src/features/evidence/validateFieldCitations/` + `calculateEvidenceCoverage/`
**Apply to:** `validateResearchDates/`

```text
validateResearchDates/
├── index.ts
├── index.test.ts
└── types.ts          # only if needed
```

### MDX pipeline

**Source:** `next.config.mjs` (lines 1-16)
**Apply to:** New `methodology.mdx` — no config changes required

```javascript
import createMDX from "@next/mdx";

const withMDX = createMDX({
  extension: /\.mdx?$/,
});
```

### Validation CI gate

**Source:** `src/features/schools/validateSchools/index.ts` (lines 69-81)
**Apply to:** All Phase 2 data changes — must pass before merge

```typescript
if (failures.length > 0) {
  console.error(JSON.stringify(failures, null, 2));
  process.exit(1);
}
```

### Real-school-only rules (not global schema)

**Source:** `src/features/schools/researchMetadata/index.ts` (lines 33-50) vs `researchMetadata/index.test.ts` (lines 4-14)
**Apply to:** Date requirements — `directory_only` fixtures omit dates intentionally; enforce dates in `validateResearchDates` called from `validateRealSchools` only.

---

## No Analog Found

| File | Role | Data Flow | Reason |
|------|------|-----------|--------|
| — | — | — | All scoped files have analogs |

`src/app/methodology/page.test.tsx` is optional; nearest partial analog is component-level RTL tests, not a true app-route test precedent.

---

## Metadata

**Analog search scope:** `docs/`, `docs/research/`, `src/app/`, `src/content/guides/`, `src/content/schools/real/`, `src/features/schools/`, `src/features/evidence/`, `src/features/guides/`
**Files scanned:** ~35
**Pattern extraction date:** 2026-07-11
