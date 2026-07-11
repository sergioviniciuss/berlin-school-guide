# Architecture

**Analysis Date:** 2026-07-11

## Pattern Overview

**Overall:** Statically-exported Next.js App Router site with a feature-first domain layer and a schema-validated, evidence-tracked content model.

**Key Characteristics:**

- Fully static output (`output: "export"` in `next.config.mjs`) — no server runtime, no API routes, no database. All data is compiled into the build.
- Domain data (schools) is modeled as a graph of "field values," where every meaningful field carries both a `value` and an `evidence` record (status, citations, source references). This is the core abstraction of the whole app — see `src/features/evidence/fieldEvidence/index.ts`.
- Zod schemas (`zod` v4) are the single source of truth for both runtime validation and TypeScript types (`z.infer<...>`) across the domain (`src/features/schools/school/index.ts`, `src/features/evidence/*`).
- Feature-first organization under `src/features/`, grouped by domain (`schools`, `evidence`, `guides`), not by technical layer. Each unit (component, schema, util) is a directory with `index.ts`/`index.tsx` as the implementation and colocated `types.ts`, `utils.ts`, `constants.ts`, `fixtures.ts`, `index.test.ts`.
- `src/app` is intentionally thin: it contains only routing, layout, and page composition. All real logic lives in `src/features`.
- Content is split between structured JSON/TS fixtures (`src/content/schools/`) and MDX prose (`src/content/guides/`), both consumed at build time.
- Client-side interactivity (search/filter state) is synced to the URL query string rather than a client store, keeping filtering shareable/bookmarkable while the underlying data stays static.

## Layers

**Routing / Composition (`src/app`):**

- Purpose: Next.js App Router route segments, layout, metadata, and page-level composition only.
- Location: `src/app/layout.tsx`, `src/app/page.tsx`, `src/app/schools/page.tsx`, `src/app/guides/m2-smoke/page.tsx`.
- Contains: Route components that import feature components/data-loaders and arrange them with layout markup (Tailwind classes). No business logic.
- Depends on: `src/features/*` (domain components and data getters), `src/content/guides/*.mdx` (via MDX page imports), `src/components/ui/*`.
- Used by: Next.js router / build process (`next build` with `output: "export"`).

**Feature Domain Layer (`src/features`):**

- Purpose: All product-domain behavior: schemas, data transforms, filtering logic, and domain-specific UI components.
- Location: `src/features/schools/*`, `src/features/evidence/*`, `src/features/guides/*`.
- Contains: Zod schemas + inferred types, pure functions (filtering, formatting, coverage calculation), React components scoped to a single responsibility, colocated unit tests and fixtures.
- Depends on: Other feature units via `@/features/...` path alias, `zod`, `src/components/ui`.
- Used by: `src/app` pages, other feature units (e.g. `schools/school` depends on `evidence/fieldEvidence`).

**UI Primitives (`src/components/ui`)::**

- Purpose: Design-system primitives only (shadcn/ui-style), no domain awareness.
- Location: `src/components/ui/Button/index.tsx`, `src/components/ui/utils/index.ts` (the `cn()` class-merge helper using `clsx` + `tailwind-merge`).
- Contains: Presentational components built on Radix primitives (`@radix-ui/react-slot`) and `class-variance-authority` for variants.
- Depends on: `clsx`, `tailwind-merge`, `class-variance-authority`, `@radix-ui/react-slot`.
- Used by: `src/app/page.tsx`, feature components that need a styled base (e.g. buttons).

**Content Layer (`src/content`):**

- Purpose: Static content inputs — both structured domain records and long-form editorial prose.
- Location: `src/content/schools/real/lichtenbergPrimarySchools/index.ts` (real records), `src/content/schools/fixtures/*.json` (schema-validation fixtures), `src/content/guides/m2-smoke.mdx` (MDX prose).
- Contains: TypeScript modules exporting arrays of raw school objects (typed against `School` before Zod parsing), and MDX files compiled via `@next/mdx`.
- Depends on: Types from `src/features/schools/school`.
- Used by: `src/features/schools/schoolDirectoryData` (loads and parses real school data), `src/features/schools/validateSchools` (validates fixtures + real data at build/CI time), `src/app/guides/m2-smoke/page.tsx` (imports MDX directly as a component).

**Test Infrastructure (`src/test`):**

- Purpose: Shared test-only type declarations and infrastructure (not test cases themselves — those are colocated with implementation).
- Location: `src/test/types/mdx.d.ts` (module declaration so `.mdx` imports type-check in tests/build).
- Depends on: Nothing domain-specific.
- Used by: TypeScript compiler globally via `tsconfig.json` include glob.

**E2E Layer (`e2e/`):**

- Purpose: Playwright browser tests against the built/dev site, validating full user journeys (navigation, search, filters).
- Location: `e2e/smoke.spec.ts`.
- Depends on: A running instance of the app (`playwright.config.ts` drives `next dev`/build).
- Used by: CI (`pnpm e2e`), not imported by app code.

## Data Flow

**School Directory Rendering (primary flow):**

1. `src/app/schools/page.tsx` (server component) calls `getSchoolDirectoryItems()` from `src/features/schools/schoolDirectoryData/index.ts` at render/build time.
2. `getSchoolDirectoryItems` reads raw records from `src/content/schools/real/lichtenbergPrimarySchools`, parses each through `schoolSchema.parse()` (`src/features/schools/school/index.ts`) — this both validates and narrows the type to `School`.
3. Each validated `School` is mapped to a flat `SchoolDirectoryItem` (`toSchoolDirectoryItem`), pulling `.value` and `.evidence.status` out of every field-value, plus a computed `evidenceCoverage` via `calculateEvidenceCoverage()` (`src/features/evidence/calculateEvidenceCoverage/index.ts`).
4. The flattened array of `SchoolDirectoryItem` is passed as a prop into the client component `SchoolDirectory` (`src/features/schools/SchoolDirectory/index.tsx`), wrapped in `<Suspense>` because it reads `useSearchParams()`.
5. `SchoolDirectory` derives `DirectoryFilterState` from the URL query string (`filtersFromSearchParams`), computes available filter options from the dataset (`getDirectoryFilterOptions`), and filters the dataset in-memory (`filterSchools`, `src/features/schools/filterSchools/index.ts`).
6. User interactions (search input, filter toggles, remove/reset) call `updateFilters`, which serializes the new `DirectoryFilterState` back into the URL via `router.replace()` — no client-side data store; the URL is the state.
7. Filtered results render through `SchoolResults` → `SchoolCard` (`src/features/schools/SchoolCard/index.tsx`), which formats each field via `src/features/schools/formatSchoolField` and colors it by evidence status (`getStatusTone` in `SchoolCard/utils.ts`).

**Data Validation Flow (build/CI time):**

1. `pnpm validate:data` runs `src/features/schools/validateSchools/index.ts` directly via `tsx`.
2. It reads every JSON fixture in `src/content/schools/fixtures/` plus every real record in `src/content/schools/real/lichtenbergPrimarySchools`, parsing each with `schoolSchema.safeParse()`.
3. `schoolSchema`'s `.superRefine()` (in `src/features/schools/school/index.ts`) recursively walks every field-value in the record (`collectFieldEvidence`) and cross-checks each against `validateFieldCitations` (`src/features/evidence/validateFieldCitations/index.ts`), enforcing that `verified` fields have a non-null value, at least one citation, and at least one citation pointing to an acceptable-reliability source.
4. On failure (outside test env), the script logs JSON errors and exits with code 1 — this is the mechanism that keeps static content schema-correct without a database.

**State Management:**

- No global client state library. All directory interaction state (search query + filters) is derived from and written to the URL search params (`usePathname`/`useSearchParams`/`useRouter` from `next/navigation`), making `SchoolDirectory` a controlled component driven by the URL.
- Local ephemeral UI state (e.g. `mobileFiltersOpen` in `SchoolDirectory`) uses plain `useState`.

## Key Abstractions

**Field Value / Evidence (`FieldValue<T>`):**

- Purpose: Wraps every "researched" fact about a school with provenance metadata so the UI can distinguish "verified," "missing," "unverified," "outdated," "conflicting," and "not_applicable" data, rather than treating `null` as the only signal of missing data.
- Examples: `src/features/evidence/fieldEvidence/index.ts` (`createFieldValueSchema`, `FieldValue<Value>` type), used pervasively in `src/features/schools/school/index.ts` (nearly every field on `schoolSchema` is wrapped via `createFieldValueSchema(...)`).
- Pattern: `{ value: Value | null; evidence: { status, citations, note?, lastChecked? } }`. Schemas are built with `createFieldValueSchema(valueSchema)` which nests a `fieldEvidenceSchema`.

**Evidence Coverage:**

- Purpose: Produces a single percentage score summarizing how much of a school's "important" data is verified, used both as a directory filter and as a per-school trust signal.
- Examples: `src/features/evidence/calculateEvidenceCoverage/index.ts`, field allowlist in `src/features/schools/school/constants.ts` (`importantSchoolFieldPathsV1`).
- Pattern: Walks a fixed, versioned list of dot-path field names (`evidenceCoverageVersion` + `importantSchoolFieldPathsV1`), resolves each path via reflection (`getFieldValue`), excludes `not_applicable` fields, and divides verified-count by total-count.

**Source / Citation Model:**

- Purpose: Every citation on a field must reference a real, sufficiently reliable source record attached to the school, preventing unverifiable claims from being marked "verified."
- Examples: `src/features/evidence/source/index.ts` (`sourceSchema`), `src/features/evidence/sourceTypes/index.ts` (`reliabilityLevelSchema`, `isAcceptableReliabilityLevel`), `src/features/evidence/validateFieldCitations/index.ts`.
- Pattern: `School.sources: Source[]` is the record's citation pool; `FieldEvidence.citations[].sourceId` must resolve to an entry in that pool via `validateFieldCitations`, checked during Zod's `.superRefine()`.

**Directory Filter State ↔ URL Query Params:**

- Purpose: Makes directory filtering shareable/bookmarkable and avoids client state management overhead, per the static-first architecture constraint (`docs/INFORMATION_ARCHITECTURE.md`).
- Examples: `queryParamMap` and `filtersFromSearchParams`/`toQueryString` in `src/features/schools/SchoolDirectory/index.tsx`; filter shape in `src/features/schools/filterSchools/types.ts`.
- Pattern: A `Record<keyof DirectoryFilterState, string>` const maps internal filter keys to short English query param names (`q`, `district`, `type`, `coverage`, etc., matching `docs/INFORMATION_ARCHITECTURE.md`); parsing/serializing is symmetric and centralized in one component.

**Schema-Derived Types:**

- Purpose: Eliminates duplicate type/validation definitions; the Zod schema is the single authority.
- Examples: `export type School = z.infer<typeof schoolSchema>` (`src/features/schools/school/index.ts`), same pattern in `fieldEvidence`, `source`, `sourceTypes`, `schoolClassification`, `schoolLocation`, `researchMetadata`.
- Pattern: Define a `zSchema`, export `type X = z.infer<typeof xSchema>` immediately after.

## Entry Points

**Root layout (`src/app/layout.tsx`):**

- Location: `src/app/layout.tsx`.
- Triggers: Every route, on every navigation (Next.js App Router root layout).
- Responsibilities: Sets `<html lang="pt-BR">`, global metadata (title/description in Portuguese), imports `globals.css`.

**Home page (`src/app/page.tsx`):**

- Location: `src/app/page.tsx`.
- Triggers: `/` route.
- Responsibilities: Renders `GuideIntro` and a link into the MDX smoke-test guide; currently a scaffolding/validation page ("M2" milestone), not final product copy.

**School directory page (`src/app/schools/page.tsx`):**

- Location: `src/app/schools/page.tsx`.
- Triggers: `/schools` route.
- Responsibilities: Server-side loads all directory items via `getSchoolDirectoryItems()` and hands them to the client `SchoolDirectory` component inside a `Suspense` boundary (required because the child reads `useSearchParams()`).

**MDX guide page (`src/app/guides/m2-smoke/page.tsx`):**

- Location: `src/app/guides/m2-smoke/page.tsx`.
- Triggers: `/guides/m2-smoke` route.
- Responsibilities: Renders an MDX document as a page component, validating the MDX pipeline (`@next/mdx`, `src/mdx-components.tsx`) end-to-end.

**Data validation script (`src/features/schools/validateSchools/index.ts`):**

- Location: `src/features/schools/validateSchools/index.ts`.
- Triggers: `pnpm validate:data` (run via `tsx`, intended for local/CI use — see `.github/` workflows for automated invocation).
- Responsibilities: Validates all fixture and real school content against `schoolSchema`; exits non-zero on failure so bad data cannot ship.

## Error Handling

**Strategy:** Validate at the boundary (Zod parse), fail loudly and early for content data; degrade gracefully in the UI for missing/unverified fields rather than throwing.

**Patterns:**

- Content correctness is enforced via Zod schemas with `.superRefine()` for cross-field invariants (e.g. `schoolSchema` requires citations for verified fields, requires notes on conflicting evidence, requires a `primarySectionDescription` for `mixed_with_primary` schools). See `src/features/schools/school/index.ts` and `src/features/evidence/fieldEvidence/index.ts`.
- `schoolDirectoryData` uses `.parse()` (throwing) because content is build-time and trusted-but-verified; `validateSchools` uses `.safeParse()` (non-throwing) because it needs to aggregate all failures across many files before reporting them.
- UI-level "errors" (missing/unverified/conflicting data) are not exceptions — they are rendered as status text via `formatFieldStatus` (`src/features/schools/formatSchoolField`) and colored via `getStatusTone` (`src/features/schools/SchoolCard/utils.ts`), keeping incomplete research visible to families rather than hidden or crashing the page.

## Cross-Cutting Concerns

**Logging:** No logging framework. The only intentional logging is `console.error`/`console.log` in the standalone `validateSchools` script for CI/local diagnostics.

**Validation:** Centralized through Zod v4 schemas colocated with each domain concept (`*/index.ts` exporting a `xSchema` and `type X = z.infer<typeof xSchema>`). No separate validation layer or middleware — validation happens at data-loading time (`schoolDirectoryData`) and at a dedicated CI-time script (`validateSchools`).

**Authentication:** None. Static site with no accounts, sessions, or auth per `AGENTS.md` V1 constraints.

**Internationalization split:** Enforced structurally, not via an i18n library — code identifiers, route segments, and file/directory names are English; all user-visible strings (labels, headings, ARIA text) are Brazilian Portuguese, visible throughout `src/app` and `src/features/schools/*` components (e.g. `"Diretório estático"`, `"Buscar escola pelo nome"`).

---

*Architecture analysis: 2026-07-11*
