# Phase 4: School Detail Profiles - Research

**Researched:** 2026-07-11
**Domain:** Next.js 16 App Router static export, dynamic `[slug]` routes, evidence-labeled school profile UI, citation aggregation
**Confidence:** HIGH

## Summary

Phase 4 delivers the trust centerpiece of V1: static school detail pages at `/schools/[slug]` for all 10 Lichtenberg schools. The brownfield codebase already has the data model (`School`, `collectFieldEvidence`, `formatFieldStatus`, coverage v2, citation validation) and directory UI (`SchoolCard`, `SchoolDirectory`). Phase 4 adds a thin route shell in `src/app/schools/[slug]/`, a `getSchoolBySlug` lookup over `getRealSchools()`, and feature components (`SchoolProfile`, `ProfileFieldRow`, `StatusBadge`, `SourcesSection`, `formatSourceType`) that render all 23 important detailed fields with honest status badges and a deduplicated Fontes bibliography.

Static export (`output: "export"` in `next.config.mjs`) requires `generateStaticParams` returning all 10 slugs at build time [CITED: https://nextjs.org/docs/app/api-reference/functions/generate-static-params]. Set `export const dynamicParams = false` so unknown slugs 404 instead of attempting runtime generation — correct for a closed dataset of 10 schools [CITED: same doc, `dynamicParams` section]. The page calls `notFound()` when `getSchoolBySlug` returns undefined; segment-level `not-found.tsx` supplies Portuguese copy per UI-SPEC [CITED: https://nextjs.org/docs/app/api-reference/file-conventions/not-found].

Three schools (Adam-Ries, Lew-Tolstoi, Richard-Wagner) already have deeper multi-source research in data but remain `directory_only` / `directory` metadata. Phase 4 upgrades them to `detailed` / `profile_ready` only after per-field re-audit against `docs/research/SCHOOL_RESEARCH_WORKFLOW.md` — coverage percentage will stay well below 100% and that is honest. Seven directory schools render all 23 fields with unsupported ones explicitly `missing`.

**Primary recommendation:** Add `src/app/schools/[slug]/page.tsx` with `generateStaticParams` + `dynamicParams = false`; implement `getSchoolBySlug` and profile feature components following UI-SPEC; aggregate citations via a dedicated `collectCitedSources` utility; wrap `SchoolCard` in a single `Link`; fix `SiteHeader` `isActive` with `startsWith("/schools/")`; upgrade three schools in data after field audit; extend unit tests for profile components and one minimal Playwright navigation test.

## Architectural Responsibility Map

| Capability | Primary Tier | Secondary Tier | Rationale |
|------------|-------------|----------------|-----------|
| School detail page HTML | Frontend Server (static build) | CDN / Static | `page.tsx` server component pre-rendered at `next build`; no runtime API |
| Slug resolution / 404 | Frontend Server (build + SSG) | — | `getSchoolBySlug` + `notFound()` at build; static host serves only generated HTML |
| Per-field evidence rendering | Frontend Server (static) | — | All field values resolved at build from Zod-validated JSON records |
| Citation aggregation / Fontes | Frontend Server (static) | — | Dedup/group computed from school record at render time |
| Directory card → profile nav | Browser (client Link) | CDN (static HTML) | `next/link` client navigation between pre-built pages |
| SiteHeader active state | Browser / Client | — | `usePathname()` in client `SiteHeader`; needs `startsWith` for nested `/schools/*` |
| Three-school metadata upgrade | Build / Static (data layer) | — | Content edits in `lichtenbergPrimarySchools/index.ts`; validated by `pnpm validate:data` |
| Profile e2e smoke | Test runner (Playwright) | Dev server | Validates rendered static pages + client navigation |

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions

#### Profile layout and sections
- **D-01:** Detail pages use a **single long scroll** with clearly labeled sections — no tabs or accordion-first layout.
- **D-02:** Fields are **grouped into thematic sections** (e.g. Identificação, Oferta pedagógica, Apoio à família, Inspeção, Fontes) aligned with the school-page journey in `docs/INFORMATION_ARCHITECTURE.md`.
- **D-03:** Profile header is **rich** — school name, profile badge, district/neighbourhood, coverage tier + %, research dates, plus **website link and address prominently** in the hero area.
- **D-04:** On mobile, **identity and evidence summary appear first** — name, type, location, coverage badge, then field sections (no mobile-specific field reorder beyond header priority).
- **D-05:** Section names, exact groupings, and hero layout details are Claude's discretion within the grouped-section model.

#### Per-field evidence labels
- **D-06:** **Every field shows an explicit status badge** (Verificado / Não confirmado / Ausente / Não aplicável / etc.) using existing `formatFieldStatus` vocabulary.
- **D-07:** **Inferred / `not_confirmed` fields** show the value, a "Não confirmado" badge, and an **inline evidence note** explaining the inference (Phase 1 D-04).
- **D-08:** Verified fields get **both** inline citation affordances **and** entries in the consolidated Fontes section — not sources-only.
- **D-09:** **Conflicting fields** show the value, a "Conflitante" badge, and the mandatory conflict note from evidence.

#### Directory vs detailed research depth
- **D-10:** **Upgrade Adam-Ries, Lew-Tolstoi, and Richard-Wagner** to `detailed` / `profile_ready` metadata in Phase 4 after honest re-evaluation against the detailed publication bar (PROF-05, ROADMAP SC #4) — only fields that meet verified standards count.
- **D-11:** The **seven directory schools** show **all 23 important detailed fields** on the profile page, with unsupported fields explicitly marked **Ausente** (not hidden).
- **D-12:** **Detailed-tier schools** show extra detailed-level sections **only when fields are verified**; missing detailed fields are still listed with Ausente status.
- **D-13:** **Defer Open Day / visit questions** — not in Phase 4 scope despite `docs/DATA_MODEL.md` mention; belongs to a later phase.

#### Sources and citations UX
- **D-14:** A consolidated **"Fontes" section at the bottom** lists all sources cited on the page, **deduplicated and grouped by source type** (official directory, school website, inspection report, etc.).
- **D-15:** On verified fields, inline citations provide **both** an anchor link to the matching Fontes entry **and** a direct external URL link.
- **D-16:** Each source entry shows **rich metadata**: source type badge (Oficial / Site da escola / etc.), publisher, access date, title, URL, and optional quote/note from the citation when present.
- **D-17:** **Inferred fields** inherit portrait/source citations in Fontes; the field-level note explains the inference — no separate invented source.

#### Missing and not-applicable fields
- **D-18:** **Always show every important field** for the school's tier with explicit status — never hide Ausente fields.
- **D-19:** **`not_applicable` fields are shown explicitly** with "Não aplicável" status (not hidden).
- **D-20:** Include a **short disclaimer near the coverage block** linking to `/methodology` — e.g. that Ausente means the information has not yet been confirmed.

#### Directory card → profile navigation
- **D-21:** The **entire school card is clickable** — wraps in a link to `/schools/[slug]` (remove "em breve" coming-soon copy).
- **D-22:** Exact Portuguese affordance copy for whole-card navigation is Claude's discretion (visible hint, aria-label, or subtle chevron — card must remain accessible).
- **D-23:** **Keep profile badge and coverage block** on directory cards after profiles ship — detail page expands, card stays scannable.

### Claude's Discretion

- `getSchoolBySlug` helper and `generateStaticParams` for 10 slugs
- Per-school `generateMetadata` (title/description in Portuguese)
- 404 handling for unknown slugs
- `SiteHeader` active state for `/schools/[slug]` (may need pathname `startsWith` for Escolas)
- New profile components (`SchoolProfile`, field row with badge, `SourcesSection`, etc.)
- Exact reclassification criteria and field updates when upgrading the three detailed schools
- E2e extension for directory → profile navigation (minimal smoke addition; full CI in Phase 8)

### Deferred Ideas (OUT OF SCOPE)

- Open Day / "Perguntas para visita" sections — future phase (not PROF-01–07)
- Directory UX polish (sort, filter summary, mobile layout) — Phase 5
- Comparison from profile pages — Phase 6
- Full e2e CI for profile flows — Phase 8
- Per-field anecdotal signals — out of V1 scope per `docs/DATA_MODEL.md`
</user_constraints>

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|------------------|
| PROF-01 | User can open a school detail page at `/schools/[slug]` for every school in the directory | `generateStaticParams` over 10 slugs; `getSchoolBySlug`; route `src/app/schools/[slug]/page.tsx` |
| PROF-02 | Detail page shows key facts with per-field evidence status labels | `ProfileFieldRow` + `StatusBadge` + `formatFieldStatus` on all 23 `importantSchoolFieldPathsDetailedV2` fields |
| PROF-03 | Detail page shows consolidated sources section with publisher and access date | `SourcesSection` + `collectCitedSources` dedup/group algorithm; rich metadata per UI-SPEC |
| PROF-04 | Missing and unconfirmed fields are clearly labeled — never shown as verified | Status-driven value formatters; `not_confirmed` shows badge + `evidence.note`; no verified styling on non-verified |
| PROF-05 | Three deeply researched schools meet detailed profile publication standards | Data upgrade in `lichtenbergPrimarySchools/index.ts` to `coverageLevel: "detailed"`, `status: "profile_ready"` after field audit + `pnpm validate:data` |
| PROF-06 | Seven directory-only schools show only portrait-supported claims; other fields marked missing | Keep `directory_only` metadata; profile renders all 23 fields; unsupported = `missing` status visible |
| PROF-07 | School cards in directory link to detail pages | `SchoolCard` wrapped in `<Link href={/schools/${slug}}>`; remove em-breve copy; e2e navigation test |
</phase_requirements>

## Project Constraints (from .cursor/rules/)

From `AGENTS.md` and `.cursor/rules/gsd.mdc` — planner must verify compliance:

- **Package manager:** pnpm only (Corepack); no npm/yarn [VERIFIED: AGENTS.md]
- **Architecture:** `src/app` = routing/layout/metadata only; `src/features` = domain behavior; `src/components/ui` = shadcn primitives only [VERIFIED: AGENTS.md]
- **Colocation:** Directory-named folders with `index.tsx` / `index.test.tsx`; no repeated directory name in file names [VERIFIED: AGENTS.md]
- **Language split:** English paths/identifiers; Brazilian Portuguese user-facing copy [VERIFIED: AGENTS.md, INFORMATION_ARCHITECTURE.md]
- **Static-first:** `output: "export"` — no backend, auth, or production APIs [VERIFIED: next.config.mjs]
- **Data path:** Production pages use `getRealSchools()` only; synthetic fixtures isolated [VERIFIED: schoolDirectoryData, Phase 1 DATA-06]
- **UI-SPEC:** Tailwind-only status badges; no new shadcn installs; `max-w-3xl px-6 py-12` profile shell [VERIFIED: 04-UI-SPEC.md]
- **Testing:** Jest + RTL colocated; Playwright in `e2e/`; proportionate coverage [VERIFIED: AGENTS.md, jest.config.mjs]

## Standard Stack

### Core

| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| next | 16.2.10 | App Router, `generateStaticParams`, `generateMetadata`, `notFound` | Project baseline; static export [VERIFIED: package.json, next.config.mjs] |
| react / react-dom | 19.2.7 | UI runtime | Matches Next 16 [VERIFIED: package.json] |
| next/link | (bundled) | Directory card + profile citation anchors | Standard client navigation between static pages |
| next/navigation | (bundled) | `notFound()` in server page | Official 404 trigger [CITED: Next.js not-found docs] |
| zod | 4.4.3 | School schema validation at data boundary | Existing `schoolSchema.parse` in `getRealSchools` [VERIFIED: codebase] |
| lucide-react | 1.24.0 | `ExternalLink`, `ChevronRight` on profile/cards | UI-SPEC locked icons [VERIFIED: package.json] |
| tailwindcss | 4.3.2 | Profile layout, badges, field rows | Existing design system [VERIFIED: package.json] |

### Supporting

| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| formatSchoolField | (internal) | Portuguese labels + value formatters | Every `ProfileFieldRow` value column |
| collectFieldEvidence | (internal) | Walk school object for field evidence | Citation aggregation input |
| calculateEvidenceCoverage | (internal) | Coverage block in hero | Reuse directory card pattern |
| @testing-library/react | 16.3.2 | Component unit tests | ProfileFieldRow, SourcesSection, SchoolCard |
| @playwright/test | 1.61.1 | E2E directory → profile | Minimal smoke extension |

### Alternatives Considered

| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| `generateStaticParams` + `dynamicParams = false` | Catch-all with client slug lookup | Breaks static export purity; SEO/host 404 worse — rejected |
| shadcn Badge | Tailwind pills per UI-SPEC | Extra install for no gain — rejected per UI-SPEC |
| MDX profile pages | React feature components | Data-driven fields need programmatic rendering — rejected |
| Hide missing fields on directory schools | Show all 23 with `missing` | Violates D-11/D-18 — rejected |

**Installation:** No new packages required for Phase 4.

**Version verification:** `next@16.2.10`, `react@19.2.7`, `@playwright/test@1.61.1`, `jest@30.4.2` [VERIFIED: package.json 2026-07-11]

## Architecture Patterns

### System Architecture Diagram

```text
                    ┌──────────────────────────────────────────┐
                    │  next build (output: "export")           │
                    │  generateStaticParams → 10 slugs         │
                    └────────────────────┬─────────────────────┘
                                         │
                    ┌────────────────────▼─────────────────────┐
                    │  src/app/schools/[slug]/page.tsx       │
                    │    getSchoolBySlug(slug)               │
                    │    ├─ undefined → notFound()           │
                    │    └─ School → <SchoolProfile />       │
                    │    generateMetadata(school)          │
                    └────────────────────┬─────────────────────┘
                                         │
          ┌──────────────────────────────┼──────────────────────────────┐
          │                              │                              │
          ▼                              ▼                              ▼
   SchoolProfile                 ProfileSection ×4              SourcesSection
   (hero: name, badge,          (h2 + dl)                      (deduped Fontes)
    coverage, dates,
    website, address)
          │                              │
          │                              ▼
          │                      ProfileFieldRow ×23
          │                        ├─ formatSchoolField value
          │                        ├─ StatusBadge
          │                        ├─ evidence.note (if any)
          │                        └─ citation links (verified)
          │
          ▼
   getRealSchools() ← schoolSchema.parse ← lichtenbergPrimarySchools/index.ts
```

### Recommended Project Structure

```text
src/
├── app/
│   └── schools/
│       ├── page.tsx                    # unchanged directory shell
│       └── [slug]/
│           ├── page.tsx                # generateStaticParams, generateMetadata, SchoolProfile
│           └── not-found.tsx           # Portuguese 404 copy
├── features/
│   ├── evidence/
│   │   └── formatSourceType/           # NEW — enum → Portuguese badge label
│   │       ├── index.ts
│   │       └── index.test.ts
│   └── schools/
│       ├── getSchoolBySlug/            # NEW — slug lookup
│       │   ├── index.ts
│       │   └── index.test.ts
│       ├── getSchoolFieldByPath/       # NEW — resolve dotted field paths (shared with coverage)
│       │   ├── index.ts
│       │   └── index.test.ts
│       ├── collectCitedSources/        # NEW — dedup + group for Fontes
│       │   ├── index.ts
│       │   ├── index.test.ts
│       │   └── types.ts
│       ├── SchoolProfile/              # NEW — hero + section orchestration
│       ├── ProfileSection/             # NEW — h2 + dl wrapper
│       ├── ProfileFieldRow/            # NEW — label, value, badge, citations
│       ├── StatusBadge/                # NEW — Tailwind pill
│       ├── SourcesSection/             # NEW — grouped bibliography
│       ├── SchoolCard/                 # MODIFY — Link wrapper, remove em breve
│       └── formatSchoolField/          # existing — reuse formatters
└── features/navigation/
    └── SiteHeader/                     # MODIFY — isActive startsWith /schools/
```

### Pattern 1: Static `[slug]` page with generateStaticParams

**What:** Pre-render exactly the 10 known school slugs at build time; reject unknown slugs.
**When to use:** All dynamic routes under `output: "export"`.
**Example:**

```typescript
// Source: https://nextjs.org/docs/app/api-reference/functions/generate-static-params
import { notFound } from "next/navigation";
import { getRealSchools } from "@/features/schools/schoolDirectoryData";
import { getSchoolBySlug } from "@/features/schools/getSchoolBySlug";
import { SchoolProfile } from "@/features/schools/SchoolProfile";

export const dynamicParams = false;

export function generateStaticParams() {
  return getRealSchools().map((school) => ({ slug: school.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const school = getSchoolBySlug(slug);
  if (!school) return { title: "Escola não encontrada" };
  const district = school.location.district.value ?? "Berlim";
  return {
    title: `${school.name.value} — Berlin School Guide`,
    description: `Perfil de ${school.name.value} em ${district} com status de evidência em cada informação — o que confirmamos, o que falta e de onde veio.`,
  };
}

export default async function SchoolProfilePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
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

### Pattern 2: getSchoolBySlug data layer

**What:** Thin lookup over validated real schools; single source of truth for pages and static params.
**When to use:** Any route or test needing one school by slug.

```typescript
// Source: established pattern from getSchoolDirectoryItems [VERIFIED: schoolDirectoryData/index.ts]
import { getRealSchools } from "@/features/schools/schoolDirectoryData";
import type { School } from "@/features/schools/school";

export function getSchoolBySlug(slug: string): School | undefined {
  return getRealSchools().find((school) => school.slug === slug);
}

export function getAllSchoolSlugs(): string[] {
  return getRealSchools().map((school) => school.slug);
}
```

### Pattern 3: Citation aggregation and dedup

**What:** Collect unique `sourceId`s cited by the 23 important profile fields; resolve against `school.sources`; attach per-field citation quotes/notes for Fontes display.
**When to use:** `SourcesSection` rendering and unit tests.

```typescript
// Source: D-14/D-16 + UI-SPEC ordering [VERIFIED: 04-UI-SPEC.md]
import type { School } from "@/features/schools/school";
import { importantSchoolFieldPathsDetailedV2 } from "@/features/schools/school/constants";
import { getSchoolFieldByPath } from "@/features/schools/getSchoolFieldByPath";
import type { SourceType } from "@/features/evidence/sourceTypes";

const SOURCE_TYPE_ORDER: SourceType[] = [
  "official_government",
  "official_inspection",
  "school_website",
  "public_dataset",
];

export function collectCitedSources(school: School) {
  const sourceById = new Map(school.sources.map((s) => [s.id, s]));
  const citationsBySourceId = new Map<
    string,
    { quote?: string; note?: string }[]
  >();

  for (const path of importantSchoolFieldPathsDetailedV2) {
    const field = getSchoolFieldByPath(school, path);
    if (!field) continue;
    for (const citation of field.evidence.citations) {
      if (!sourceById.has(citation.sourceId)) continue;
      const existing = citationsBySourceId.get(citation.sourceId) ?? [];
      existing.push({ quote: citation.quote, note: citation.note });
      citationsBySourceId.set(citation.sourceId, existing);
    }
  }

  const cited = [...citationsBySourceId.keys()]
    .map((id) => ({
      source: sourceById.get(id)!,
      citations: citationsBySourceId.get(id)!,
    }))
    .sort((a, b) => a.source.title.localeCompare(b.source.title, "pt-BR"));

  const grouped = SOURCE_TYPE_ORDER.map((type) => ({
    type,
    entries: cited
      .filter((e) => e.source.type === type)
      .sort((a, b) => a.source.title.localeCompare(b.source.title, "pt-BR")),
  })).filter((g) => g.entries.length > 0);

  return grouped;
}
```

**Filter rule:** Exclude `anecdotal_reserved` sources from render; if present in cited set, treat as data error surfaced at `pnpm validate:data` [VERIFIED: UI-SPEC, sourceTypes].

### Pattern 4: ProfileFieldRow value + badge rendering

**What:** Map evidence status to display rules from UI-SPEC; reuse existing formatters.
**When to use:** Every row in thematic sections.

| Status | Value column | Badge | Extra |
|--------|--------------|-------|-------|
| `verified` | `formatClassification` / `formatBoolean` / etc. | `formatFieldStatus` | Citation row: `Ver fonte` + `Abrir original` |
| `missing`, `unverified`, `outdated` | `formatFieldStatus(status)` | same | — |
| `not_confirmed` | formatted value if present | same | `evidence.note` below |
| `conflicting` | formatted value | same | mandatory `evidence.note` |
| `not_applicable` | `Não se aplica` | same | — |

### Pattern 5: Whole-card Link accessibility

**What:** Single interactive element per card; no nested links/buttons.
**When to use:** `SchoolCard` directory navigation (D-21).

```tsx
// Source: UI-SPEC accessibility checklist + HTML5 pattern [VERIFIED: 04-UI-SPEC.md]
import Link from "next/link";
import { ChevronRight } from "lucide-react";

<Link
  href={`/schools/${school.slug}`}
  aria-label={`Ver perfil de ${school.name}`}
  className="block rounded-lg border ... focus-within:ring-2 focus-within:ring-primary"
>
  <article className="p-5 ...">
    <h2>...</h2>
    {/* facts, coverage — no <a> or <button> inside */}
    <p className="text-sm text-blue-700 flex items-center justify-end gap-1">
      Ver perfil <ChevronRight className="size-4" aria-hidden />
    </p>
  </article>
</Link>
```

### Pattern 6: SiteHeader pathname startsWith fix

**What:** Escolas nav active on both `/schools` and `/schools/[slug]`.
**When to use:** Replace current exact-match `isActive` in `SiteHeader/index.tsx` [VERIFIED: current code line 19-21].

```typescript
function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  if (href === "/schools") {
    return pathname === "/schools" || pathname.startsWith("/schools/");
  }
  return pathname === href;
}
```

Update `SiteHeader/index.test.tsx`: add case `pathname = "/schools/adam-ries-schule"` → Escolas highlighted.

### Anti-Patterns to Avoid

- **Nested links in SchoolCard:** Putting "Ver perfil" as a separate `<a>` inside a card `<Link>` — invalid HTML and breaks a11y. Use one wrapper Link only.
- **Hiding missing detailed fields on directory schools:** Directory tier still renders all 23 rows per D-11.
- **Marking inferred fields verified on upgrade:** `afterSchoolCare` inferred from `ganztag` must stay `not_confirmed` unless independent Hort/eFöB source found [VERIFIED: SCHOOL_RESEARCH_WORKFLOW.md].
- **Runtime slug fetching:** No `fetch()` or dynamic APIs — static data only.
- **Duplicating field label map:** Use constants file keyed by `importantSchoolFieldPathsDetailedV2` paths; labels from UI-SPEC table.

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Portuguese evidence status labels | Custom badge text | `formatFieldStatus` | Single vocabulary across directory + profile [VERIFIED: formatSchoolField] |
| Field value formatting | Per-component string logic | `formatClassification`, `formatBoolean`, `formatStringList`, etc. | Existing formatters handle null/status cases |
| Walking school fields | Custom recursion | `getSchoolFieldByPath` (extract from coverage) + path constants | `calculateEvidenceCoverage` already has dotted-path resolver pattern |
| Source type labels | Inline switch in JSX | `formatSourceType` feature | Reusable; matches UI-SPEC enum table |
| 404 page | Global-only not-found | Segment `not-found.tsx` + `notFound()` | Root layout chrome preserved; Portuguese copy scoped to schools |
| Evidence coverage % | Custom profile math | `calculateEvidenceCoverage` + `getCoverageTierLabel` | Level-aware v2 denominators already implemented |

**Key insight:** Phase 4 is primarily a *rendering* phase — the data model, validation, and formatters exist. New code should compose existing evidence primitives, not re-derive status semantics.

## Three-School Metadata Upgrade Approach

**Publication bar** [VERIFIED: docs/RESEARCH.md, SCHOOL_RESEARCH_WORKFLOW.md]:
- `research.status: "profile_ready"` requires `coverageLevel: "detailed"` (Zod enforced)
- Detailed tier requires `lastResearched` + `lastSourceChecked` dates
- Each `verified` field needs ≥1 acceptable citation; inferred fields stay `not_confirmed`
- **No numeric coverage threshold** for `profile_ready` — honest field audit + `pnpm validate:data` pass is the gate
- UI shows `Perfil detalhado` / `Pesquisa detalhada` after upgrade; coverage % will reflect only verified fields (likely 30–60%, not 100%)

### Verified 10 slugs [VERIFIED: lichtenbergPrimarySchools/index.ts]

```
adam-ries-schule
bernhard-grzimek-schule
buergermeister-ziethen-schule
friedrichsfelder-schule
grundschule-am-traenkegraben
schmetterlings-grundschule
karlshorster-schule
lew-tolstoi-schule
richard-wagner-schule
seepark-grundschule
```

### Per-school upgrade checklist (re-audit before metadata change)

| School | Current metadata | Extra sources beyond portrait | Verified detailed fields (already in data) | Fields to fix/keep honest | Upgrade action |
|--------|-----------------|------------------------------|---------------------------------------------|---------------------------|----------------|
| **Adam-Ries** | `directory_only` / `directory` | 2 school website pages | `bilingualPrograms`, `welcomeClasses`, `schoolProfile`, `pedagogyFocus`, `inclusionSupport` (portrait-cited) | `afterSchoolCare` stays `not_confirmed` (ganztag inference default); `inspection*`, `familyCommunication`, `transitionAfterGrade6`, `facilities` likely `missing`; re-check `schoolProfile`/`pedagogyFocus` are portrait-verified not offers-inferred | Set `coverageLevel: "detailed"`, `status: "profile_ready"`, update `lastResearched`/`lastSourceChecked` to actual audit dates |
| **Lew-Tolstoi** | `directory_only` / `directory` | Website + Ganztag page | `afterSchoolCare`, `bilingualPrograms`, `internationalPrograms`, `schoolProfile`, `pedagogyFocus`, `familyCommunication` | `welcomeClasses` = `missing` (already correct); inspection fields `missing` at directory default | Same metadata upgrade after audit |
| **Richard-Wagner** | `directory_only` / `directory` | Website, Ganztag, inspection, music pages | `afterSchoolCare`, `schoolProfile`, `pedagogyFocus`, `familyCommunication`, `inspectionAvailability`, `inspectionData`, `facilities` | Strongest candidate; `transitionAfterGrade6` likely `missing`; verify inspection citations use acceptable sources | Same metadata upgrade after audit |

**Seven directory schools:** Leave `directory_only` / `directory`. Profile page still lists all 23 fields — `primarySchool()` defaults fill detailed fields with `missing` or `not_confirmed` (inferred from offers/ganztag where applicable). UI must not imply detailed research depth beyond data.

**Executor workflow:**
1. Walk per-field decision trees in `SCHOOL_RESEARCH_WORKFLOW.md` for each of the three schools
2. Fix any incorrectly `verified` fields (especially offers→profile inference on schools without explicit overrides)
3. Run `pnpm validate:data` — must exit 0
4. Update `researchStatus` + `coverageLevel` only after validation passes
5. Confirm profile UI shows `Perfil detalhado` badge and detailed coverage denominator (23 fields)

## Common Pitfalls

### Pitfall 1: Static export without generateStaticParams

**What goes wrong:** Build fails or `/schools/[slug]` not emitted in `out/` directory.
**Why it happens:** `output: "export"` cannot serve dynamic routes on demand.
**How to avoid:** Export `generateStaticParams` returning all 10 `{ slug }` objects; verify `out/schools/<slug>/index.html` after `pnpm build`.
**Warning signs:** Missing HTML files under `out/schools/`; build warning about dynamic server usage.

### Pitfall 2: Unknown slugs rendering empty or fallback pages

**What goes wrong:** Typo slugs show broken page or client error instead of 404.
**Why it happens:** Default `dynamicParams: true` may attempt on-demand behavior incompatible with static hosting.
**How to avoid:** `export const dynamicParams = false` + `notFound()` guard in page [CITED: Next.js generateStaticParams docs].
**Warning signs:** Dev-only pages work but production host serves `index.html` fallback for all routes.

### Pitfall 3: Whole-card link nesting

**What goes wrong:** Invalid HTML, unpredictable screen reader behavior, hydration warnings.
**Why it happens:** Card contains separate CTAs or fact links while wrapped in `Link`.
**How to avoid:** One `Link` wrapper; citation/external links only on profile page field rows, not directory cards.
**Warning signs:** Lighthouse/HTML validator reports nested interactive controls.

### Pitfall 4: Fontes missing inferred-field sources

**What goes wrong:** Parents cannot trace inferred claims to underlying portrait/website.
**Why it happens:** Only collecting citations from `verified` fields.
**How to avoid:** `collectCitedSources` walks all 23 fields regardless of status; `not_confirmed` citations still appear in Fontes (D-17).
**Warning signs:** `not_confirmed` field shows note but Fontes section lacks cited portrait.

### Pitfall 5: Profile shell width mismatch

**What goes wrong:** Profile feels like directory page; breaks editorial trust layout.
**Why it happens:** Reusing `max-w-7xl` from directory page.
**How to avoid:** Profile + 404 use `max-w-3xl px-6 py-12` per UI-SPEC and methodology page pattern [VERIFIED: methodology/page.tsx].
**Warning signs:** Wide field rows on desktop; inconsistent with `/methodology`.

### Pitfall 6: SiteHeader Escolas inactive on profile pages

**What goes wrong:** User loses nav context when reading a school profile.
**Why it happens:** `isActive` uses exact `pathname === "/schools"` only [VERIFIED: SiteHeader/index.tsx:19-21].
**How to avoid:** `startsWith("/schools/")` for Escolas href.
**Warning signs:** Manual QA on `/schools/adam-ries-schule` shows no active Escolas state.

### Pitfall 7: SchoolCard test regression

**What goes wrong:** CI fails after removing em-breve copy.
**Why it happens:** `SchoolCard/index.test.tsx` explicitly expects coming-soon message [VERIFIED: line 51-58].
**How to avoid:** Update test to assert `Link` with `aria-label` and `href="/schools/..."`; remove em-breve assertion in same task.

## Code Examples

### getSchoolFieldByPath (extract shared resolver)

```typescript
// Source: pattern from calculateEvidenceCoverage [VERIFIED: calculateEvidenceCoverage/index.ts]
import type { FieldValue } from "@/features/evidence/fieldEvidence";
import type { School } from "@/features/schools/school";

export function getSchoolFieldByPath(
  school: School,
  path: string,
): FieldValue<unknown> | undefined {
  const value = path.split(".").reduce<unknown>((current, segment) => {
    if (typeof current !== "object" || current === null) return undefined;
    return (current as Record<string, unknown>)[segment];
  }, school);

  if (
    typeof value === "object" &&
    value !== null &&
    "value" in value &&
    "evidence" in value
  ) {
    return value as FieldValue<unknown>;
  }
  return undefined;
}
```

### formatSourceType

```typescript
// Source: UI-SPEC source type table [VERIFIED: 04-UI-SPEC.md]
import type { SourceType } from "@/features/evidence/sourceTypes";

const labels: Record<Exclude<SourceType, "anecdotal_reserved">, string> = {
  official_government: "Oficial",
  school_website: "Site da escola",
  official_inspection: "Inspeção oficial",
  public_dataset: "Dados públicos",
};

export function formatSourceType(type: SourceType): string | null {
  if (type === "anecdotal_reserved") return null;
  return labels[type];
}
```

### Profile section field map (constants)

```typescript
// Source: UI-SPEC section assignment [VERIFIED: 04-UI-SPEC.md]
export const PROFILE_SECTIONS = [
  {
    key: "identification",
    heading: "Identificação",
    fields: [
      "name", "schoolNumber", "website", "classification", "level",
      "location.district", "location.neighbourhood", "location.address",
      "gradesServed",
    ],
  },
  {
    key: "pedagogy",
    heading: "Oferta pedagógica",
    fields: [
      "ganztag", "afterSchoolCare", "languages", "bilingualPrograms",
      "internationalPrograms", "welcomeClasses", "schoolProfile",
      "pedagogyFocus", "inclusionSupport",
    ],
  },
  // family, inspection per UI-SPEC...
] as const;
```

### Minimal e2e: directory card → profile

```typescript
// Source: existing smoke.spec.ts patterns [VERIFIED: e2e/smoke.spec.ts]
test("navigates from directory card to school profile", async ({ page }) => {
  await page.goto("/schools");
  await page
    .getByRole("link", { name: "Ver perfil de Lew-Tolstoi-Schule" })
    .click();
  await expect(page).toHaveURL(/\/schools\/lew-tolstoi-schule$/);
  await expect(
    page.getByRole("heading", { level: 1, name: "Lew-Tolstoi-Schule" }),
  ).toBeVisible();
  await expect(page.getByRole("heading", { name: "Fontes" })).toBeVisible();
  await expect(page.getByText("Verificado").first()).toBeVisible();
});
```

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| Directory cards with "em breve" copy | Whole-card link to profile | Phase 4 (D-21) | PROF-07; remove placeholder |
| No `/schools/[slug]` route | `generateStaticParams` static pages | Phase 4 | PROF-01 |
| Escolas nav exact match | `startsWith("/schools/")` | Phase 4 | Active state on profiles |
| Citation data only in JSON | Rendered Fontes + inline anchors | Phase 4 (RSCH-04 UI) | Trust visibility |
| All schools `directory_only` | 3 upgraded to `profile_ready` | Phase 4 data task | PROF-05/06 distinction |

**Deprecated/outdated:**
- `SchoolCard` coming-soon paragraph — remove (D-21)
- `SchoolCard/index.test.tsx` em-breve assertion — replace with link assertions

## Assumptions Log

| # | Claim | Section | Risk if Wrong |
|---|-------|---------|---------------|
| A1 | `dynamicParams = false` produces correct 404 for unlisted slugs under static export | Pattern 1 | Unknown slugs might build fallback pages or break export |
| A2 | `profile_ready` does not require a minimum verified-field percentage | Three-school upgrade | Executor might block upgrade waiting for arbitrary % threshold |
| A3 | Heading inside `<Link><article><h2>` is acceptable for screen readers with `aria-label` on Link | Pattern 5 | May need alternative card click pattern if a11y review flags it |
| A4 | `collectCitedSources` should include citations from all statuses, not only `verified` | Pattern 3 | Inferred fields would lack Fontes entries (violates D-17) |

## Open Questions

1. **Minimum field label constants location**
   - What we know: UI-SPEC defines 23 Portuguese labels; `formatSchoolField` has formatters but not profile labels.
   - What's unclear: Whether labels live in `SchoolProfile/constants.ts` or beside `importantSchoolFieldPathsDetailedV2`.
   - Recommendation: Add `profileFieldLabels: Record<ImportantSchoolFieldPathDetailedV2, string>` in `src/features/schools/SchoolProfile/constants.ts` mapping paths to UI-SPEC labels.

2. **Hero website link when website not verified**
   - What we know: UI-SPEC says show website in Identificação only when not verified; hero link only when verified.
   - What's unclear: None — UI-SPEC is explicit.
   - Recommendation: `SchoolProfile` hero checks `school.website.evidence.status === "verified"`.

3. **404 behavior in `next dev` vs static `out/`**
   - What we know: `notFound()` triggers segment `not-found.tsx`; static host serves file-based 404.
   - What's unclear: Whether executor should add e2e for unknown slug (optional).
   - Recommendation: Unit/integration coverage via `getSchoolBySlug` + manual build check; defer unknown-slug e2e to Phase 8.

## Environment Availability

**Step 2.6: SKIPPED** — Phase 4 is code/config-only changes with no new external dependencies. Existing toolchain (`pnpm`, Node 22+, Next 16) already validated in Phases 1–3 [VERIFIED: .cursor/rules/gsd.mdc, CI].

## Validation Architecture

### Test Framework

| Property | Value |
|----------|-------|
| Framework | Jest 30.4.2 + jest-environment-jsdom 30.4.1 |
| Config file | `jest.config.mjs` (via `next/jest`) |
| Quick run command | `pnpm test -- --testPathPattern="getSchoolBySlug\|ProfileFieldRow\|SourcesSection\|SchoolCard\|SiteHeader" -x` |
| Full suite command | `pnpm test` |
| E2E command | `pnpm e2e` (Playwright 1.61.1, `playwright.config.ts`) |

### Phase Requirements → Test Map

| Req ID | Behavior | Test Type | Automated Command | File Exists? |
|--------|----------|-----------|-------------------|-------------|
| PROF-01 | Detail page exists for each slug | unit + build | `pnpm test -- getSchoolBySlug -x` + `pnpm build` | ❌ Wave 0 |
| PROF-02 | Per-field evidence badges | unit | `pnpm test -- ProfileFieldRow -x` | ❌ Wave 0 |
| PROF-03 | Fontes dedup/group/metadata | unit | `pnpm test -- collectCitedSources -x` | ❌ Wave 0 |
| PROF-04 | Missing/not_confirmed never shown as verified | unit | `pnpm test -- ProfileFieldRow -x` | ❌ Wave 0 |
| PROF-05 | Three schools detailed/profile_ready | data validation | `pnpm validate:data` | ✅ (extend assertions manually) |
| PROF-06 | Directory schools show missing fields | unit | `pnpm test -- SchoolProfile -x` with directory fixture | ❌ Wave 0 |
| PROF-07 | Card links to profile | unit + e2e | `pnpm test -- SchoolCard -x` + `pnpm e2e -- -g "profile"` | ✅ partial (SchoolCard exists; e2e ❌) |

### Sampling Rate

- **Per task commit:** `pnpm test -- <component> -x` for touched components
- **Per wave merge:** `pnpm test` + `pnpm validate:data`
- **Phase gate:** `pnpm build` (confirms `generateStaticParams` emits 10 pages) + `pnpm e2e` + full unit suite green before `/gsd-verify-work`

### Wave 0 Gaps

- [ ] `src/features/schools/getSchoolBySlug/index.test.ts` — slug lookup, undefined for unknown
- [ ] `src/features/schools/getSchoolFieldByPath/index.test.ts` — dotted paths including `location.district`
- [ ] `src/features/schools/collectCitedSources/index.test.ts` — dedup, type ordering, citation notes
- [ ] `src/features/evidence/formatSourceType/index.test.ts` — enum labels, `anecdotal_reserved` → null
- [ ] `src/features/schools/ProfileFieldRow/index.test.tsx` — verified/missing/not_confirmed/conflicting rows
- [ ] `src/features/schools/SourcesSection/index.test.tsx` — grouped render, anchor ids
- [ ] `src/app/schools/[slug]/page.tsx` — route + `generateStaticParams`
- [ ] Update `src/features/schools/SchoolCard/index.test.tsx` — link wrapper, remove em-breve
- [ ] Update `src/features/navigation/SiteHeader/index.test.tsx` — `/schools/adam-ries-schule` active
- [ ] Extend `e2e/smoke.spec.ts` — directory card → profile navigation

## Security Domain

### Applicable ASVS Categories

| ASVS Category | Applies | Standard Control |
|---------------|---------|-----------------|
| V2 Authentication | no | N/A — static site |
| V3 Session Management | no | N/A |
| V4 Access Control | no | N/A — public read-only content |
| V5 Input Validation | yes | Slugs from `generateStaticParams` only; `getSchoolBySlug` on static set; `schoolSchema` Zod validation |
| V6 Cryptography | no | N/A |

### Known Threat Patterns for static Next.js profile pages

| Pattern | STRIDE | Standard Mitigation |
|---------|--------|---------------------|
| XSS via school field values | Tampering/Spoofing | React text escaping; no `dangerouslySetInnerHTML` on field values |
| Tabnabbing from external source links | Spoofing | `rel="noopener noreferrer"` on all external URLs [VERIFIED: UI-SPEC] |
| Open redirect via slug param | Spoofing | Closed slug set; `notFound()` for unknown; no redirect logic |
| Rendering anecdotal sources | Repudiation | Filter `anecdotal_reserved` from Fontes; validate at data layer |

## Sources

### Primary (HIGH confidence)
- [Next.js generateStaticParams](https://nextjs.org/docs/app/api-reference/functions/generate-static-params) — static pre-render, `dynamicParams`, params Promise shape
- [Next.js not-found convention](https://nextjs.org/docs/app/api-reference/file-conventions/not-found) — segment 404 UI
- `next.config.mjs` — `output: "export"` confirmed
- `package.json` — dependency versions
- `04-CONTEXT.md`, `04-UI-SPEC.md` — locked UI/UX contract
- `docs/DATA_MODEL.md`, `docs/INFORMATION_ARCHITECTURE.md` — field model and journey
- `docs/research/SCHOOL_RESEARCH_WORKFLOW.md` — upgrade bar, inference rules
- `src/features/schools/school/index.ts` — `collectFieldEvidence`, schema
- `src/content/schools/real/lichtenbergPrimarySchools/index.ts` — current school data state

### Secondary (MEDIUM confidence)
- `.planning/phases/03-homepage-navigation-core-journey/03-RESEARCH.md` — research doc pattern, validation architecture template
- `src/features/navigation/SiteHeader/index.tsx` — current `isActive` bug confirmed

### Tertiary (LOW confidence)
- None requiring validation — static export 404 on generic hosts depends on host config (Phase 8 REL-07)

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH — no new dependencies; Next 16 patterns verified against official docs
- Architecture: HIGH — composes existing evidence/school features; UI-SPEC is approved
- Pitfalls: HIGH — static export and whole-card link risks documented with mitigations

**Research date:** 2026-07-11
**Valid until:** 2026-08-11 (stable stack; Next 16 App Router)
