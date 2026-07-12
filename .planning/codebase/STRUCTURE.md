# Codebase Structure

**Analysis Date:** 2026-07-11

## Directory Layout

```
berlin-school-guide/
├── .github/                      # CI workflow configuration
├── .planning/                    # GSD planning artifacts (docs, roadmap, codebase maps)
├── docs/                         # Product/architecture/editorial source-of-truth docs
├── e2e/                          # Playwright end-to-end tests
│   └── smoke.spec.ts
├── src/
│   ├── app/                      # Routing, layouts, metadata, page composition (Next.js App Router)
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   ├── globals.css
│   │   ├── guides/m2-smoke/page.tsx
│   │   └── schools/page.tsx
│   ├── components/
│   │   └── ui/                   # shadcn/ui-style primitives only
│   │       ├── Button/
│   │       └── utils/            # cn() class-merge helper
│   ├── content/                  # Static MDX and structured content inputs
│   │   ├── guides/m2-smoke.mdx
│   │   └── schools/
│   │       ├── fixtures/         # JSON fixtures for schema validation tests
│   │       └── real/lichtenbergPrimarySchools/  # Real school records (TS)
│   ├── features/                 # Product-domain behavior, feature-specific code
│   │   ├── evidence/             # Field-evidence/citation/source domain
│   │   ├── guides/                # Guide-page domain components
│   │   └── schools/               # School directory domain (schemas, filtering, UI)
│   ├── test/
│   │   └── types/mdx.d.ts        # Shared test-only type declarations
│   └── mdx-components.tsx        # Global MDX component overrides
├── test-results/, coverage/, out/, .next/, .swc/   # Build/test output (generated, gitignored)
├── AGENTS.md                     # Agent operating rules for this repo
├── next.config.mjs               # output: "export" static site config + MDX plugin
├── tailwind.config.ts, postcss.config.mjs, prettier.config.mjs, eslint.config.mjs
├── jest.config.mjs, jest.setup.ts
├── playwright.config.ts
├── tsconfig.json
├── components.json                # shadcn/ui CLI configuration
└── package.json
```

## Directory Purposes

**`src/app`:**

- Purpose: Next.js App Router routing, layouts, metadata, and page composition only — per `AGENTS.md`, no business logic belongs here.
- Contains: `page.tsx`/`layout.tsx` route files, route-level `metadata` exports, minimal Tailwind-styled JSX that wires feature components together.
- Key files: `src/app/layout.tsx` (root layout), `src/app/page.tsx` (home), `src/app/schools/page.tsx` (directory route), `src/app/guides/m2-smoke/page.tsx` (MDX route).

**`src/components/ui`:**

- Purpose: Design-system primitives only (shadcn/ui pattern), no product-domain awareness — per `AGENTS.md`.
- Contains: One directory per primitive (`Button/`), plus a shared `utils/` directory for the `cn()` helper (`clsx` + `tailwind-merge`).
- Key files: `src/components/ui/Button/index.tsx`, `src/components/ui/utils/index.ts`.

**`src/content`:**

- Purpose: Static content inputs consumed at build time — structured school records and long-form MDX guide prose.
- Contains: `schools/real/lichtenbergPrimarySchools/index.ts` (TS module exporting real school data, typed against `School` before Zod parsing); `schools/fixtures/*.json` (hand-written fixtures used by `validateSchools` and by unit tests, e.g. `valid-directory-only-school.json`, `valid-detailed-public-school.json`); `guides/m2-smoke.mdx` (MDX prose imported directly as a page component).
- Key files: `src/content/schools/real/lichtenbergPrimarySchools/index.ts`.

**`src/features`:**

- Purpose: All product-domain behavior and feature-specific code, organized by domain rather than technical layer.
- Contains: Three top-level domains — `evidence/` (field evidence, sources, citation validation, coverage calculation), `schools/` (school schema, filtering, directory data, UI components), `guides/` (guide intro component, example schema).
- Key files: see per-unit breakdown below.

  - `src/features/evidence/`:
    - `fieldEvidence/` — `FieldValue<T>` / `FieldEvidence` schema and type, the core "value + provenance" abstraction (`index.ts`, `fixtures.ts`, `index.test.ts`).
    - `source/` — `Source` schema for citation records (`index.ts`, `fixtures.ts`, `index.test.ts`).
    - `sourceTypes/` — enums for source type/reliability level and `isAcceptableReliabilityLevel` (`index.ts`, `index.test.ts`).
    - `validateFieldCitations/` — cross-checks a field's citations against a school's `sources[]` (`index.ts`, `index.test.ts`).
    - `calculateEvidenceCoverage/` — computes the verified/total percentage for a school (`index.ts`, `types.ts`, `index.test.ts`).

  - `src/features/schools/`:
    - `school/` — the central `schoolSchema`/`School` type, composing all other schemas (`index.ts`, `types.ts`, `constants.ts` [`importantSchoolFieldPathsV1`, `evidenceCoverageVersion`], `fixtures.ts`, `index.test.ts`).
    - `schoolClassification/` — enums: `SchoolClassification`, `SchoolLevel`, `InspectionAvailability` (`index.ts`, `index.test.ts`).
    - `schoolLocation/` — `district`/`neighbourhood`/`address` field-value schema (`index.ts`).
    - `researchMetadata/` — schema for research/audit metadata on a school record (`index.ts`, `index.test.ts`).
    - `schoolDirectoryData/` — loads real + synthetic schools, parses them, flattens to `SchoolDirectoryItem` (`index.ts`, `index.test.ts`).
    - `filterSchools/` — pure filtering function + `DirectoryFilterState`/`SchoolDirectoryItem` types (`index.ts`, `types.ts`, `index.test.ts`).
    - `getDirectoryFilterOptions/` — derives available filter option lists from a dataset (`index.ts`, `index.test.ts`).
    - `formatSchoolField/` — formats field values/status for display in Portuguese (`index.ts`, `index.test.ts`).
    - `validateSchools/` — standalone CI/local script validating all fixtures + real records (`index.ts`).
    - `SchoolDirectory/`, `SchoolFilters/`, `SchoolSearch/`, `SchoolResults/`, `SchoolCard/`, `ActiveFilterSummary/` — React components for the directory page, each with `index.tsx` + `index.test.tsx` (+ `types.ts`/`utils.ts` where needed, e.g. `SchoolCard/utils.ts` for `getStatusTone`).

  - `src/features/guides/`:
    - `GuideIntro/` — intro header component for guide/home pages (`index.tsx`, `index.test.tsx`).
    - `exampleSchema/` — example/scaffold schema (no `index.test.ts` observed; verify before extending).

**`src/test`:**

- Purpose: Shared test infrastructure only (not test files themselves — those are colocated with implementation as `index.test.ts(x)`).
- Contains: TypeScript ambient module declarations needed for tests/build to type-check non-standard imports.
- Key files: `src/test/types/mdx.d.ts` (declares the `*.mdx` module shape).

**`e2e/`:**

- Purpose: Playwright browser tests validating full user journeys against a running instance of the site.
- Contains: `smoke.spec.ts` — home page + MDX navigation, and school directory search/filter journeys.
- Key files: `e2e/smoke.spec.ts`.

**`docs/`:**

- Purpose: Source-of-truth documents for product, research, architecture, editorial, and decision guidance (per `AGENTS.md`, this directory outranks ad-hoc assumptions).
- Contains: `PRODUCT.md`, `RESEARCH.md`, `COMPARISON.md`, `DATA_MODEL.md`, `INFORMATION_ARCHITECTURE.md`, `EDITORIAL_GUIDE.md`, `DECISIONS.md`, `ROADMAP.md`, and related files.

**`.planning/`:**

- Purpose: GSD workflow artifacts — roadmap state, phase plans, and codebase maps (this document included).
- Contains: `.planning/codebase/*.md` (this analysis and siblings), plus other GSD-managed planning files.

**Generated/output directories (`.next/`, `out/`, `coverage/`, `test-results/`, `.swc/`):**

- Purpose: Build and test tool output.
- Generated: Yes, by `next build` (`.next/`, `out/` for the static export), Jest (`coverage/`), Playwright (`test-results/`), SWC (`.swc/`).
- Committed: No — these should be covered by `.gitignore`; do not hand-edit or reference their contents in planning docs.

## Key File Locations

**Entry Points:**

- `src/app/layout.tsx`: Root HTML shell, global metadata, `pt-BR` lang.
- `src/app/page.tsx`: Home route (`/`).
- `src/app/schools/page.tsx`: School directory route (`/schools`).
- `src/app/guides/m2-smoke/page.tsx`: MDX-rendered guide route.
- `src/mdx-components.tsx`: Global MDX element overrides (applies to every `.mdx` page).

**Configuration:**

- `next.config.mjs`: Static export (`output: "export"`), MDX page extensions, unoptimized images.
- `tsconfig.json`: `@/*` → `./src/*` path alias, strict mode, bundler resolution.
- `tailwind.config.ts`, `postcss.config.mjs`: Styling pipeline (Tailwind v4 + PostCSS).
- `eslint.config.mjs`, `prettier.config.mjs`: Lint/format rules.
- `jest.config.mjs`, `jest.setup.ts`: Unit/component test runner config (jsdom environment).
- `playwright.config.ts`: E2E runner config.
- `components.json`: shadcn/ui CLI generator configuration (aliases, style).

**Core Logic:**

- `src/features/schools/school/index.ts`: Central domain schema (`schoolSchema`) composing evidence, location, classification, sources, and research metadata, with cross-field validation.
- `src/features/evidence/fieldEvidence/index.ts`: The `FieldValue<T>`/evidence primitive used throughout the domain.
- `src/features/schools/schoolDirectoryData/index.ts`: Loads and flattens school data for the directory.
- `src/features/schools/filterSchools/index.ts`: Directory filtering logic.
- `src/features/schools/validateSchools/index.ts`: Standalone content-validation script (`pnpm validate:data`).

**Testing:**

- Unit/component tests: colocated as `index.test.ts`/`index.test.tsx` next to each implementation file across `src/features/**` and `src/components/ui/**`.
- E2E tests: `e2e/smoke.spec.ts`.
- Test infra: `jest.setup.ts`, `src/test/types/mdx.d.ts`.

## Naming Conventions

**Files:**

- Primary implementation: always `index.ts` or `index.tsx`, never a file named after the directory (per `AGENTS.md`).
- Colocated test: `index.test.ts` or `index.test.tsx`.
- Supporting files use generic names: `types.ts` (exported TypeScript types not derived inline), `utils.ts` (small local helpers, e.g. `SchoolCard/utils.ts`), `constants.ts` (fixed values, e.g. `school/constants.ts`), `fixtures.ts` (sample data for tests, e.g. `school/fixtures.ts`), `hooks.ts` (not yet used but reserved by convention).
- JSON content fixtures use kebab-case describing the scenario: `valid-directory-only-school.json`, `valid-detailed-public-school.json`.

**Directories:**

- One directory per meaningful component, hook, schema, or domain unit — the directory name IS the identifier (no repetition in file names).
- React components use PascalCase directories: `SchoolCard/`, `SchoolDirectory/`, `SchoolFilters/`, `GuideIntro/`, `Button/`.
- Non-component logic units (schemas, pure functions, data loaders) use camelCase directories: `fieldEvidence/`, `calculateEvidenceCoverage/`, `filterSchools/`, `schoolDirectoryData/`, `validateFieldCitations/`.
- Route segments under `src/app` are lowercase/kebab-case matching the URL path (e.g. `guides/m2-smoke/`), per `docs/INFORMATION_ARCHITECTURE.md`.

## Where to Add New Code

**New Feature (new domain concept, e.g. a new filter or a comparison feature):**

- Primary code: new directory under `src/features/<domain>/<unitName>/index.ts(x)`, following the same domain grouping as `schools`/`evidence`/`guides` (create a new domain subdirectory only if the concept doesn't fit an existing one).
- Tests: colocated `index.test.ts(x)` in the same directory.
- If the feature needs a Zod schema + type, follow the `export const xSchema = z...` + `export type X = z.infer<typeof xSchema>` pattern used in `src/features/schools/school/index.ts` and siblings.

**New Component:**

- Implementation: `src/features/<domain>/<ComponentName>/index.tsx` for domain-aware components; `src/components/ui/<ComponentName>/index.tsx` only for pure, domain-agnostic design-system primitives.
- Do not add new components to `src/components/ui` unless they are generic UI primitives usable across multiple unrelated features — per `AGENTS.md`, avoid generic abstractions until at least two concrete use cases exist.

**New Route/Page:**

- Add under `src/app/<segment>/page.tsx`, matching the English route-segment naming in `docs/INFORMATION_ARCHITECTURE.md` (e.g. future `/compare`, `/methodology`, `/checklists`, `/report-correction`). Keep the page file limited to composition; delegate logic/UI to a `src/features/*` component.

**Utilities:**

- Shared helpers live inside the owning feature's directory as `utils.ts` (e.g. `SchoolCard/utils.ts`) — there is no repo-wide `src/lib` or `src/utils` catch-all. Per `AGENTS.md`, avoid creating generic shared utilities until at least two concrete use cases exist across features.

**New static content (schools/guides):**

- Real school records: add to `src/content/schools/real/lichtenbergPrimarySchools/index.ts` (or a new sibling directory if expanding beyond Lichtenberg), typed as `School[]` before being parsed by `schoolSchema`.
- Validation fixtures: add a new kebab-case JSON file to `src/content/schools/fixtures/`; it will be automatically picked up by `validateSchoolFixtures()` in `src/features/schools/validateSchools/index.ts`.
- New guide prose: add an `.mdx` file under `src/content/guides/`, then create a matching route under `src/app/guides/<slug>/page.tsx` that imports it directly.

## Special Directories

**`.next/`, `out/`:**

- Purpose: Next.js build cache and static export output (`out/` is the deployable static site from `output: "export"`).
- Generated: Yes.
- Committed: No.

**`coverage/`:**

- Purpose: Jest coverage reports (`pnpm test:coverage`).
- Generated: Yes.
- Committed: No.

**`test-results/`:**

- Purpose: Playwright test run artifacts.
- Generated: Yes.
- Committed: No.

**`.swc/`:**

- Purpose: SWC compiler cache used by Next.js.
- Generated: Yes.
- Committed: No.

**`.planning/`:**

- Purpose: GSD workflow state and generated planning/analysis documents (including this file).
- Generated: Partially (analysis docs like this one are generated; roadmap/decision docs are authored).
- Committed: Yes (tracked in git per the repo's GSD workflow).

---

*Structure analysis: 2026-07-11*
