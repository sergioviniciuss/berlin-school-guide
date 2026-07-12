# Phase 4: School Detail Profiles - Pattern Map

**Mapped:** 2026-07-11
**Files analyzed:** 26 new/modified files
**Analogs found:** 22 / 26

## File Classification

| New/Modified File | Role | Data Flow | Closest Analog | Match Quality |
|-------------------|------|-----------|----------------|---------------|
| `src/app/schools/[slug]/page.tsx` | route | transform | `src/app/methodology/page.tsx` + `src/app/schools/page.tsx` | role-match |
| `src/app/schools/[slug]/not-found.tsx` | route | request-response | `src/features/schools/SchoolResults/index.tsx` | partial |
| `src/features/schools/getSchoolBySlug/index.ts` | service | CRUD | `src/features/schools/schoolDirectoryData/index.ts` | exact |
| `src/features/schools/getSchoolBySlug/index.test.ts` | test | — | `src/features/schools/schoolDirectoryData/index.test.ts` | exact |
| `src/features/schools/getSchoolFieldByPath/index.ts` | utility | transform | `src/features/evidence/calculateEvidenceCoverage/index.ts` | exact |
| `src/features/schools/getSchoolFieldByPath/index.test.ts` | test | — | `src/features/evidence/calculateEvidenceCoverage/index.test.ts` | role-match |
| `src/features/schools/collectCitedSources/index.ts` | utility | transform | `src/features/evidence/validateFieldCitations/index.ts` | role-match |
| `src/features/schools/collectCitedSources/types.ts` | model | — | `src/features/evidence/calculateEvidenceCoverage/types.ts` | role-match |
| `src/features/schools/collectCitedSources/index.test.ts` | test | — | `src/features/evidence/calculateEvidenceCoverage/index.test.ts` | role-match |
| `src/features/evidence/formatSourceType/index.ts` | utility | transform | `src/features/schools/getCoverageTierLabel/index.ts` | exact |
| `src/features/evidence/formatSourceType/index.test.ts` | test | — | `src/features/schools/getCoverageTierLabel/index.test.ts` | exact |
| `src/features/schools/SchoolProfile/index.tsx` | component | transform | `src/features/schools/SchoolCard/index.tsx` + `src/features/guides/GuideIntro/index.tsx` | role-match |
| `src/features/schools/SchoolProfile/constants.ts` | config | — | `src/features/schools/school/constants.ts` | exact |
| `src/features/schools/SchoolProfile/index.test.tsx` | test | — | `src/features/schools/SchoolCard/index.test.tsx` | role-match |
| `src/features/schools/ProfileSection/index.tsx` | component | transform | `src/features/schools/SchoolCard/index.tsx` (`Fact` + `dl`) | role-match |
| `src/features/schools/ProfileFieldRow/index.tsx` | component | transform | `src/features/schools/SchoolCard/index.tsx` (`Fact`) | role-match |
| `src/features/schools/ProfileFieldRow/index.test.tsx` | test | — | `src/features/schools/formatSchoolField/index.test.ts` | role-match |
| `src/features/schools/StatusBadge/index.tsx` | component | transform | `src/features/schools/SchoolCard/index.tsx` (profile badge) | role-match |
| `src/features/schools/SourcesSection/index.tsx` | component | transform | `src/features/schools/SchoolCard/index.tsx` (coverage block) | partial |
| `src/features/schools/SourcesSection/index.test.tsx` | test | — | `src/features/schools/SchoolCard/index.test.tsx` | role-match |
| `src/features/schools/SchoolCard/index.tsx` | component | request-response | `src/features/home/HomeJourneyCards/index.tsx` (Link) | role-match |
| `src/features/schools/SchoolCard/index.test.tsx` | test | — | `src/features/schools/SchoolCard/index.test.tsx` (self) | exact |
| `src/features/navigation/SiteHeader/index.tsx` | component | event-driven | `src/features/navigation/SiteHeader/index.tsx` (self) | exact |
| `src/features/navigation/SiteHeader/index.test.tsx` | test | — | `src/features/navigation/SiteHeader/index.test.tsx` (self) | exact |
| `src/content/schools/real/lichtenbergPrimarySchools/index.ts` | model | file-I/O | `src/content/schools/real/lichtenbergPrimarySchools/index.ts` (self) | exact |
| `e2e/smoke.spec.ts` | test | — | `e2e/smoke.spec.ts` (self) | exact |

## Pattern Assignments

### `src/app/schools/[slug]/page.tsx` (route, transform)

**Analog:** `src/app/methodology/page.tsx` (editorial shell) + `src/app/schools/page.tsx` (schools route + data import)

No dynamic `[slug]` route exists yet — compose from static page conventions and RESEARCH Pattern 1.

**Imports pattern** (methodology page, lines 1-2):

```typescript
import MethodologyGuide from "@/content/guides/methodology.mdx";
import { GuideIntro } from "@/features/guides/GuideIntro";
```

**Route shell pattern** (methodology page, lines 10-20):

```typescript
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

**Metadata pattern** (schools page, lines 6-10):

```typescript
export const metadata = {
  title: "Escolas",
  description:
    "Diretório de escolas primárias em Berlim com pesquisa parcial em Lichtenberg. Cada fato indica seu status de evidência.",
};
```

**Data import pattern** (schools page, lines 3-4):

```typescript
import { SchoolDirectory } from "@/features/schools/SchoolDirectory";
import { getSchoolDirectoryItems } from "@/features/schools/schoolDirectoryData";
```

**Phase 4 additions** (from RESEARCH Pattern 1 — no codebase analog):

```typescript
import { notFound } from "next/navigation";
import { getRealSchools } from "@/features/schools/schoolDirectoryData";
import { getSchoolBySlug } from "@/features/schools/getSchoolBySlug";
import { SchoolProfile } from "@/features/schools/SchoolProfile";

export const dynamicParams = false;

export function generateStaticParams() {
  return getRealSchools().map((school) => ({ slug: school.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const school = getSchoolBySlug(slug);
  if (!school) return { title: "Escola não encontrada" };
  // Portuguese title/description per UI-SPEC
}

export default async function SchoolProfilePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const school = getSchoolBySlug(slug);
  if (!school) notFound();
  return (
    <main className="mx-auto max-w-3xl px-6 py-12 space-y-12">
      <SchoolProfile school={school} />
    </main>
  );
}
```

---

### `src/app/schools/[slug]/not-found.tsx` (route, request-response)

**Analog:** `src/features/schools/SchoolResults/index.tsx` (empty state) + `src/app/methodology/page.tsx` (shell) + `src/features/home/HomeJourneyCards/index.tsx` (Button + Link)

**Empty-state copy pattern** (SchoolResults, lines 9-19):

```typescript
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

**CTA pattern** (HomeJourneyCards, lines 14-16):

```typescript
<Button asChild className="mt-4">
  <Link href="/schools">Ver escolas em Lichtenberg</Link>
</Button>
```

**Shell:** `max-w-3xl px-6 py-12 space-y-6` per UI-SPEC; h1 uses `text-4xl font-semibold` (GuideIntro line 13). Copy from UI-SPEC 404 table.

---

### `src/features/schools/getSchoolBySlug/index.ts` (service, CRUD)

**Analog:** `src/features/schools/schoolDirectoryData/index.ts`

**Imports pattern** (lines 1-6):

```typescript
import { calculateEvidenceCoverage } from "@/features/evidence/calculateEvidenceCoverage";
import type { School } from "@/features/schools/school";
import { schoolSchema } from "@/features/schools/school";
import { getCoverageTierLabel } from "@/features/schools/getCoverageTierLabel";
import { realLichtenbergPrimarySchools } from "@/content/schools/real/lichtenbergPrimarySchools";
import type { SchoolDirectoryItem } from "@/features/schools/filterSchools/types";
```

**Core lookup pattern** (lines 8-12):

```typescript
export function getRealSchools() {
  return realLichtenbergPrimarySchools.map((school) =>
    schoolSchema.parse(school),
  );
}
```

**Phase 4 implementation** — thin `find` over `getRealSchools()`:

```typescript
import { getRealSchools } from "@/features/schools/schoolDirectoryData";
import type { School } from "@/features/schools/school";

export function getSchoolBySlug(slug: string): School | undefined {
  return getRealSchools().find((school) => school.slug === slug);
}

export function getAllSchoolSlugs(): string[] {
  return getRealSchools().map((school) => school.slug);
}
```

---

### `src/features/schools/getSchoolBySlug/index.test.ts` (test)

**Analog:** `src/features/schools/schoolDirectoryData/index.test.ts`

**Test structure** (lines 6-14):

```typescript
describe("schoolDirectoryData", () => {
  it("parses real schools through the validated school schema", () => {
    expect(getRealSchools()).toHaveLength(10);
  });
```

**Assertions to add:** known slug returns `School`; unknown slug returns `undefined`; `getAllSchoolSlugs()` length 10.

---

### `src/features/schools/getSchoolFieldByPath/index.ts` (utility, transform)

**Analog:** `src/features/evidence/calculateEvidenceCoverage/index.ts` (`getFieldValue` + `isFieldValue`)

**Core dotted-path resolver** (lines 32-58):

```typescript
function getFieldValue(
  school: School,
  path: string,
): FieldValue<unknown> | undefined {
  const value = path.split(".").reduce<unknown>((current, segment) => {
    if (typeof current !== "object" || current === null) {
      return undefined;
    }

    return (current as Record<string, unknown>)[segment];
  }, school);

  if (isFieldValue(value)) {
    return value;
  }

  return undefined;
}

function isFieldValue(input: unknown): input is FieldValue<unknown> {
  return (
    typeof input === "object" &&
    input !== null &&
    "value" in input &&
    "evidence" in input
  );
}
```

**Extract** `getFieldValue` → exported `getSchoolFieldByPath`; keep `isFieldValue` private. Used by `collectCitedSources` and `ProfileFieldRow`.

---

### `src/features/schools/getSchoolFieldByPath/index.test.ts` (test)

**Analog:** `src/features/evidence/calculateEvidenceCoverage/index.test.ts`

**Fixture import pattern** (lines 1-7):

```typescript
import { calculateEvidenceCoverage } from ".";
import {
  field,
  validDetailedPublicSchool,
  validDirectoryOnlySchool,
  validNotApplicableInspectionSchool,
} from "@/features/schools/school/fixtures";
```

**Test cases:** `location.district` nested path; top-level `name`; invalid path returns `undefined`.

---

### `src/features/schools/collectCitedSources/index.ts` (utility, transform)

**Analog:** `src/features/evidence/validateFieldCitations/index.ts` (source resolution) + `src/features/schools/school/constants.ts` (field paths)

**Source map pattern** (validateFieldCitations, lines 5-12):

```typescript
export function validateFieldCitations(
  evidence: FieldEvidence,
  sources: Source[],
) {
  const sourceById = new Map(sources.map((source) => [source.id, source]));

  const citationSources = evidence.citations.map((citation) =>
    sourceById.get(citation.sourceId),
  );
```

**Field path constants** (school/constants, lines 3-27):

```typescript
export const importantSchoolFieldPathsDetailedV2 = [
  "name",
  "schoolNumber",
  "website",
  // ...
  "facilities",
] as const;
```

**Algorithm:** Walk all 23 paths via `getSchoolFieldByPath`; collect citations regardless of status (D-17); dedupe by `sourceId`; group by `source.type` in `SOURCE_TYPE_ORDER`; sort titles with `localeCompare("pt-BR")`. Filter `anecdotal_reserved` at render time in `SourcesSection`.

---

### `src/features/schools/collectCitedSources/types.ts` (model)

**Analog:** `src/features/evidence/calculateEvidenceCoverage/types.ts` pattern — export result types beside utility.

```typescript
import type { Source } from "@/features/evidence/source";
import type { SourceType } from "@/features/evidence/sourceTypes";

export type CitedSourceEntry = {
  source: Source;
  citations: Array<{ quote?: string; note?: string }>;
};

export type GroupedCitedSources = {
  type: SourceType;
  entries: CitedSourceEntry[];
};
```

---

### `src/features/schools/collectCitedSources/index.test.ts` (test)

**Analog:** `src/features/evidence/calculateEvidenceCoverage/index.test.ts`

**Fixture-driven assertions** (lines 9-17):

```typescript
describe("calculateEvidenceCoverage", () => {
  it("calculates v2 coverage for a directory-only school", () => {
    expect(calculateEvidenceCoverage(validDirectoryOnlySchool)).toEqual({
      version: "v2",
      verified: 9,
      total: 11,
      percentage: 82,
    });
  });
```

**Test cases:** dedup when two fields cite same `sourceId`; type group ordering; `not_confirmed` field citations included; empty when no citations.

---

### `src/features/evidence/formatSourceType/index.ts` (utility, transform)

**Analog:** `src/features/schools/getCoverageTierLabel/index.ts` + `src/features/schools/formatSchoolField/index.ts`

**Enum-to-label pattern** (getCoverageTierLabel, lines 1-7):

```typescript
export function getCoverageTierLabel(
  coverageLevel: "directory" | "detailed",
): "Pesquisa básica" | "Pesquisa detalhada" {
  return coverageLevel === "directory"
    ? "Pesquisa básica"
    : "Pesquisa detalhada";
}
```

**Record map pattern** (formatFieldStatus, lines 7-18):

```typescript
export function formatFieldStatus(status: FieldStatus) {
  const labels: Record<FieldStatus, string> = {
    verified: "Verificado",
    missing: "Informação não encontrada",
    // ...
  };

  return labels[status];
}
```

**Implementation:** `Record<Exclude<SourceType, "anecdotal_reserved">, string>` per UI-SPEC; return `null` for `anecdotal_reserved`.

---

### `src/features/evidence/formatSourceType/index.test.ts` (test)

**Analog:** `src/features/schools/getCoverageTierLabel/index.test.ts`

**Structure** (lines 3-10):

```typescript
describe("getCoverageTierLabel", () => {
  it('returns "Pesquisa básica" for directory coverage level', () => {
    expect(getCoverageTierLabel("directory")).toBe("Pesquisa básica");
  });

  it('returns "Pesquisa detalhada" for detailed coverage level', () => {
    expect(getCoverageTierLabel("detailed")).toBe("Pesquisa detalhada");
  });
});
```

---

### `src/features/schools/SchoolProfile/index.tsx` (component, transform)

**Analog:** `src/features/schools/SchoolCard/index.tsx` (coverage, badge, facts) + `src/features/guides/GuideIntro/index.tsx` (hero typography)

**Profile badge pattern** (SchoolCard, lines 17-18):

```typescript
const profileBadge =
  school.coverageLevel === "directory" ? "Perfil básico" : "Perfil detalhado";
```

**Hero eyebrow pattern** (GuideIntro, lines 9-12):

```typescript
<p className="text-sm font-semibold uppercase tracking-wide text-blue-700">
  {eyebrow}
</p>
<h1 className="text-4xl font-semibold">{title}</h1>
```

**Coverage block pattern** (SchoolCard, lines 106-114):

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

**Orchestration:** Accept `School` prop (not `SchoolDirectoryItem`); compute coverage via `calculateEvidenceCoverage(school)` + `getCoverageTierLabel(school.research.coverageLevel)`; render `ProfileSection` × 4 + `SourcesSection`; hero website link only when `school.website.evidence.status === "verified"`; methodology disclaimer `Link` matches SchoolDirectory (line 114).

---

### `src/features/schools/SchoolProfile/constants.ts` (config)

**Analog:** `src/features/schools/school/constants.ts`

**Path constant pattern** (lines 3-27):

```typescript
export const importantSchoolFieldPathsDetailedV2 = [
  "name",
  "schoolNumber",
  // ...
] as const;

export type ImportantSchoolFieldPathDetailedV2 =
  (typeof importantSchoolFieldPathsDetailedV2)[number];
```

**Add:** `PROFILE_SECTIONS` (key, heading, fields[]) and `profileFieldLabels: Record<ImportantSchoolFieldPathDetailedV2, string>` per UI-SPEC section assignment table.

---

### `src/features/schools/SchoolProfile/index.test.tsx` (test)

**Analog:** `src/features/schools/SchoolCard/index.test.tsx`

**Fixture render pattern** (lines 25-31):

```typescript
it("renders Perfil básico for directory-level schools", () => {
  render(
    <SchoolCard school={toSchoolDirectoryItem(validDirectoryOnlySchool)} />,
  );

  expect(screen.getByText("Perfil básico")).toBeVisible();
```

**Test cases:** directory school shows all 23 field labels; detailed school shows `Perfil detalhado`; Fontes heading present; methodology disclaimer link.

---

### `src/features/schools/ProfileSection/index.tsx` (component, transform)

**Analog:** `src/features/schools/SchoolCard/index.tsx` (`dl` + section heading)

**Section heading pattern** (SchoolDirectory, lines 123-125):

```typescript
<h2 className="mb-5 text-lg font-semibold text-neutral-950">
  Filtros
</h2>
```

**Definition list pattern** (SchoolCard, lines 40-41):

```typescript
<dl className="mt-5 grid gap-3 sm:grid-cols-2">
```

**Profile variant:** Single-column `<dl className="divide-y divide-neutral-100">` with h2 `text-xl font-semibold text-neutral-950`; map `fields` to `ProfileFieldRow` children.

---

### `src/features/schools/ProfileFieldRow/index.tsx` (component, transform)

**Analog:** `src/features/schools/SchoolCard/index.tsx` (`Fact` component + formatters)

**Fact structure** (SchoolCard, lines 129-137):

```typescript
function Fact({ label, value, status }: FactProps) {
  return (
    <div>
      <dt className="text-xs font-medium uppercase text-neutral-500">
        {label}
      </dt>
      <dd className={`text-sm ${getStatusTone(status)}`}>{value}</dd>
    </div>
  );
}
```

**Formatter imports** (SchoolCard, lines 3-9):

```typescript
import {
  formatBoolean,
  formatClassification,
  formatFieldStatus,
  formatInspectionAvailability,
  formatStringList,
} from "@/features/schools/formatSchoolField";
```

**Profile differences:** Always render (no `shouldRenderFact`); add `StatusBadge`; status-driven value column per UI-SPEC table; `evidence.note` for `not_confirmed`/`conflicting`; citation row with `Ver fonte` (`#source-{id}`) + `Abrir original` (`rel="noopener noreferrer"`, `ExternalLink` icon). Value formatter switch keyed by field path type (reuse existing formatters).

**Status tone utility** (SchoolCard/utils, lines 3-5):

```typescript
export function getStatusTone(status: FieldStatus) {
  return status === "verified" ? "text-neutral-900" : "text-neutral-600";
}
```

---

### `src/features/schools/ProfileFieldRow/index.test.tsx` (test)

**Analog:** `src/features/schools/formatSchoolField/index.test.ts` + `src/features/schools/SchoolCard/index.test.tsx`

**Status label assertions** (formatSchoolField test, lines 10-15):

```typescript
it("formats every field status in Brazilian Portuguese", () => {
  expect(formatFieldStatus("missing")).toBe("Informação não encontrada");
  expect(formatFieldStatus("unverified")).toBe("Informação não verificada");
  expect(formatFieldStatus("outdated")).toBe("Precisa de nova verificação");
  expect(formatFieldStatus("conflicting")).toBe("Informação conflitante");
  expect(formatFieldStatus("not_applicable")).toBe("Não se aplica");
});
```

**Render cases:** verified with citation links; missing shows status as value; not_confirmed shows note; conflicting shows mandatory note.

---

### `src/features/schools/StatusBadge/index.tsx` (component, transform)

**Analog:** `src/features/schools/SchoolCard/index.tsx` (inline profile badge, line 26-28)

```typescript
<span className="inline-block text-sm font-medium text-blue-700">
  {profileBadge}
</span>
```

**Wrap `formatFieldStatus(status)`** with UI-SPEC Tailwind pill classes per status (verified → neutral-100; not_confirmed → amber-50; conflicting → red-50). Server component — no `"use client"`.

---

### `src/features/schools/SourcesSection/index.tsx` (component, transform)

**Analog:** `src/features/schools/SchoolCard/index.tsx` (coverage card surface) + `src/features/evidence/source/index.ts` (metadata shape)

**Card surface pattern** (SchoolCard, lines 106-107):

```typescript
<div className="mt-5 rounded-md bg-neutral-50 p-3">
```

**Source metadata shape** (source/index.ts, lines 8-18):

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

**Render:** `id="source-{sourceId}"` anchor targets; `formatSourceType` badge; group headings; external URL with `ExternalLink`; quote/note from citation attachments. Empty state: `Nenhuma fonte citada nesta página.`

---

### `src/features/schools/SourcesSection/index.test.tsx` (test)

**Analog:** `src/features/schools/SchoolCard/index.test.tsx`

**Visibility assertions** (lines 15-22):

```typescript
expect(
  screen.getByRole("heading", { name: "Bernhard-Grzimek-Schule" }),
).toBeVisible();
expect(screen.getByText(/Número oficial:/)).toBeVisible();
expect(screen.getByText("Cobertura da pesquisa")).toBeVisible();
```

**Add:** group headings (Oficial, Site da escola); anchor `id` attributes; publisher/access date labels.

---

### `src/features/schools/SchoolCard/index.tsx` (component, request-response) — MODIFY

**Analog:** `src/features/home/HomeJourneyCards/index.tsx` (Link + article) — whole-card navigation is new to SchoolCard

**Link import pattern** (HomeJourneyCards, lines 1-3):

```typescript
import Link from "next/link";

import { Button } from "@/components/ui/Button";
```

**Wrap entire card** (SchoolCard, lines 20-119):

```typescript
return (
  <article className="rounded-lg border border-neutral-200 bg-white p-5 shadow-sm">
    {/* existing content */}
    <p className="mt-3 text-sm text-neutral-600">
      Perfil completo em breve — estamos expandindo as páginas de detalhe.
    </p>
  </article>
);
```

**Replace with:**

```typescript
import Link from "next/link";
import { ChevronRight } from "lucide-react";

<Link
  href={`/schools/${school.slug}`}
  aria-label={`Ver perfil de ${school.name}`}
  className="block rounded-lg border border-neutral-200 bg-white shadow-sm hover:border-neutral-300 hover:shadow-md transition-shadow cursor-pointer focus-within:ring-2 focus-within:ring-primary"
>
  <article className="p-5">
    {/* existing h2, facts, coverage — no nested <a> or <button> */}
    <p className="text-sm text-blue-700 flex items-center justify-end gap-1">
      Ver perfil <ChevronRight className="size-4" aria-hidden />
    </p>
  </article>
</Link>
```

**Remove** em-breve paragraph (lines 116-118). **Keep** profile badge and coverage block (D-23).

---

### `src/features/schools/SchoolCard/index.test.tsx` (test) — MODIFY

**Analog:** self — update existing tests

**Remove** (lines 51-58):

```typescript
it("renders profile coming-soon message", () => {
  render(<SchoolCard school={getSchoolDirectoryItems()[0]} />);

  expect(
    screen.getByText(
      "Perfil completo em breve — estamos expandindo as páginas de detalhe.",
    ),
  ).toBeVisible();
});
```

**Add:** `getByRole("link", { name: /Ver perfil de/ })` with `href="/schools/{slug}"`; assert em-breve text absent.

---

### `src/features/navigation/SiteHeader/index.tsx` (component, event-driven) — MODIFY

**Analog:** self (`isActive` function, lines 19-21)

**Current pattern:**

```typescript
function isActive(pathname: string, href: string) {
  return href === "/" ? pathname === "/" : pathname === href;
}
```

**Replace with** (RESEARCH Pattern 6):

```typescript
function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  if (href === "/schools") {
    return pathname === "/schools" || pathname.startsWith("/schools/");
  }
  return pathname === href;
}
```

Applies to both `getDesktopLinkClassName` and `getMobileLinkClassName` — no other changes.

---

### `src/features/navigation/SiteHeader/index.test.tsx` (test) — MODIFY

**Analog:** self — extend `pathname` mock pattern (lines 5-14)

**Existing Escolas test** (lines 44-56):

```typescript
it("highlights Escolas when pathname is /schools", () => {
  pathname = "/schools";

  render(<SiteHeader />);
  // ...
  expect(escolasLink).toHaveClass("text-primary");
});
```

**Add:** `pathname = "/schools/adam-ries-schule"` → Escolas link has `text-primary` and `font-semibold`.

---

### `src/content/schools/real/lichtenbergPrimarySchools/index.ts` (model, file-I/O) — MODIFY

**Analog:** self + `src/features/schools/school/index.ts` (Zod validation gate)

**Validation gate** (school/index.ts, lines 57-58):

```typescript
// Citation quality gate (RSCH-04 data layer) — verified fields require acceptable primary/secondary source
.superRefine((school, context) => {
```

**Workflow:** Per-field audit for Adam-Ries, Lew-Tolstoi, Richard-Wagner; set `research.coverageLevel: "detailed"`, `research.status: "profile_ready"`, update dates; run `pnpm validate:data` before metadata change. Seven schools stay `directory_only`.

---

### `e2e/smoke.spec.ts` (test) — MODIFY

**Analog:** self (lines 3-16)

**Navigation test pattern:**

```typescript
test("navigates from homepage to school directory via journey CTA", async ({
  page,
}) => {
  await page.goto("/");
  // ...
  await page.getByRole("link", { name: "Ver escolas em Lichtenberg" }).click();
  await expect(page).toHaveURL(/\/schools$/);
});
```

**Add:** directory card `aria-label` click → profile URL; h1 school name; Fontes heading; Verificado badge visible.

---

## Shared Patterns

### Brazilian Portuguese copy via formatters
**Source:** `src/features/schools/formatSchoolField/index.ts`
**Apply to:** `ProfileFieldRow`, `StatusBadge`, `SchoolProfile` hero fallbacks

```typescript
export function formatFieldStatus(status: FieldStatus) {
  const labels: Record<FieldStatus, string> = {
    verified: "Verificado",
    missing: "Informação não encontrada",
    unverified: "Informação não verificada",
    not_confirmed: "Informação inferida, não confirmada",
    outdated: "Precisa de nova verificação",
    conflicting: "Informação conflitante",
    not_applicable: "Não se aplica",
  };

  return labels[status];
}
```

### Evidence coverage block
**Source:** `src/features/schools/SchoolCard/index.tsx` + `src/features/evidence/calculateEvidenceCoverage/index.ts`
**Apply to:** `SchoolProfile` hero, `SchoolCard` (unchanged)

```typescript
// SchoolCard coverage display (lines 106-113)
{school.coverageTierLabel} · {school.evidenceCoverage.percentage}% ·
mede completude da pesquisa neste nível, não qualidade da escola.

// Profile: compute from School directly
const coverage = calculateEvidenceCoverage(school);
const coverageTierLabel = getCoverageTierLabel(school.research.coverageLevel);
```

### Editorial page shell (`max-w-3xl`)
**Source:** `src/app/methodology/page.tsx`
**Apply to:** `src/app/schools/[slug]/page.tsx`, `not-found.tsx`

```typescript
<main className="mx-auto max-w-3xl px-6 py-12 space-y-12">
```

Directory page stays `max-w-7xl` — do not reuse for profile.

### Citation source resolution
**Source:** `src/features/evidence/validateFieldCitations/index.ts`
**Apply to:** `collectCitedSources`, `ProfileFieldRow` citation links

```typescript
const sourceById = new Map(sources.map((source) => [source.id, source]));
const citationSources = evidence.citations.map((citation) =>
  sourceById.get(citation.sourceId),
);
```

### External link safety
**Source:** UI-SPEC + `src/features/schools/SchoolDirectory/index.tsx` (line 114)
**Apply to:** Hero website link, `Abrir original`, source URLs in Fontes

```typescript
<Link href="/methodology" className="font-medium text-blue-700 underline">
  Como funciona nossa pesquisa?
</Link>
// External: target="_blank" rel="noopener noreferrer"
```

### Colocated test conventions
**Source:** `src/features/schools/SchoolCard/index.test.tsx`, `src/features/schools/schoolDirectoryData/index.test.ts`
**Apply to:** All new `index.test.ts` / `index.test.tsx` files

- Import from `"."` for unit under test
- Use `validDirectoryOnlySchool` / `validDetailedPublicSchool` from `@/features/schools/school/fixtures`
- Use `getSchoolDirectoryItems()` for real-school integration smoke in component tests
- `describe("<featureName>")` + focused `it("...")` per behavior

### Feature directory structure
**Source:** `AGENTS.md` colocation rules
**Apply to:** All new feature units

```text
SchoolProfile/
├── index.tsx
├── index.test.tsx
├── constants.ts
```

No repeated directory name in file names; `index.ts`/`index.tsx` as primary export.

## No Analog Found

| File | Role | Data Flow | Reason |
|------|------|-----------|--------|
| `src/app/schools/[slug]/page.tsx` (`generateStaticParams`) | route | transform | No dynamic App Router routes exist yet — use RESEARCH Pattern 1 + Next.js 16 docs |
| `src/app/schools/[slug]/not-found.tsx` | route | request-response | No segment `not-found.tsx` in codebase — compose from empty-state + editorial shell |
| `src/features/schools/SourcesSection/index.tsx` | component | transform | No bibliography/source list UI exists — card surface + source schema are partial analogs only |

## Metadata

**Analog search scope:** `src/app/`, `src/features/schools/`, `src/features/evidence/`, `src/features/navigation/`, `src/features/guides/`, `src/features/home/`, `e2e/`
**Files scanned:** ~45
**Pattern extraction date:** 2026-07-11
