# Coding Conventions

**Analysis Date:** 2026-07-11

## Naming Patterns

**Files:**
- Every meaningful component, hook, utility, or schema gets its own directory with `index.ts`/`index.tsx` as the implementation. Example: `src/features/schools/filterSchools/index.ts`, `src/features/schools/SchoolCard/index.tsx`.
- Supporting files inside a unit directory use fixed generic names: `types.ts`, `utils.ts`, `constants.ts`, `fixtures.ts`. Example: `src/features/schools/school/{index.ts,types.ts,constants.ts,fixtures.ts}`.
- Test files are colocated as `index.test.ts` or `index.test.tsx` next to `index.ts`/`index.tsx` (never a separate `__tests__` folder). Example: `src/features/schools/school/index.test.ts`.
- Directory names are never repeated inside file names (no `SchoolCard/SchoolCard.tsx`; it is `SchoolCard/index.tsx`).

**Directories:**
- PascalCase for React component directories: `SchoolCard/`, `SchoolFilters/`, `ActiveFilterSummary/`, `SchoolDirectory/`, `SchoolSearch/`, `SchoolResults/`, `GuideIntro/`.
- camelCase for non-component domain units (pure logic, schemas, data): `filterSchools/`, `formatSchoolField/`, `validateSchools/`, `schoolDirectoryData/`, `calculateEvidenceCoverage/`, `fieldEvidence/`, `validateFieldCitations/`.
- Feature domains live directly under `src/features/<domain>/` (e.g. `src/features/schools/`, `src/features/evidence/`, `src/features/guides/`), with each unit as a subdirectory.

**Functions:**
- camelCase, verb-first, descriptive of the exact operation: `filterSchools`, `validateFieldCitations`, `formatFieldStatus`, `getSchoolDirectoryItems`, `toSchoolDirectoryItem`, `calculateEvidenceCoverage`.
- Internal (non-exported) helper functions follow the same camelCase style but stay local to the module: `normalize`, `matchesStringFilter`, `matchesBinaryFilter`, `collectFieldEvidence` in `src/features/schools/filterSchools/index.ts` and `src/features/schools/school/index.ts`.
- Predicate/type-guard functions are prefixed with `is`: `isFieldValue` (`src/features/schools/school/index.ts`), `isAcceptableReliabilityLevel` (`src/features/evidence/sourceTypes/index.ts`).
- Factory-style functions are prefixed with `create`: `createFieldValueSchema` (`src/features/evidence/fieldEvidence/index.ts`).

**Variables:**
- camelCase everywhere; no Hungarian notation or type suffixes.
- Zod schema constants use a `<Thing>Schema` suffix: `schoolSchema`, `sourceSchema`, `fieldEvidenceSchema`, `fieldStatusSchema`, `researchMetadataSchema` (see `src/features/schools/school/index.ts`, `src/features/evidence/fieldEvidence/index.ts`).
- Fixture constants use a descriptive `valid<Scenario>` / `invalid<Scenario>` prefix for schema test fixtures: `validDirectoryOnlySchool`, `invalidVerifiedWithoutCitation`, `invalidMixedLevelWithoutPrimaryDescription` (`src/features/schools/school/fixtures.ts`).
- Non-schema domain fixtures name the scenario directly: `officialDirectorySource`, `schoolWebsiteSource`, `anecdotalSource` (`src/features/evidence/source/fixtures.ts`); `verifiedEvidence`, `missingEvidence`, `notApplicableEvidence` (`src/features/evidence/fieldEvidence/fixtures.ts`).

**Types:**
- PascalCase for all types and Zod-inferred types: `School`, `Source`, `FieldEvidence`, `FieldStatus`, `SchoolDirectoryItem`, `DirectoryFilterState`.
- Types are derived from schemas with `z.infer<typeof xSchema>` rather than hand-written duplicates wherever a schema exists: `export type School = z.infer<typeof schoolSchema>;` (`src/features/schools/school/index.ts`), `export type FieldStatus = z.infer<typeof fieldStatusSchema>;` (`src/features/evidence/fieldEvidence/index.ts`).
- Union/enum-like string types are named `<Domain>Value` or plain descriptive names: `BinaryFilterValue`, `StatusFilterValue`, `CoverageFilterValue` (`src/features/schools/filterSchools/types.ts`).
- Component prop types use a `<ComponentName>Props` suffix and are declared as `type`, not `interface`: `SchoolCardProps`, `ButtonProps`, `FactProps` (`src/features/schools/SchoolCard/index.tsx`, `src/components/ui/Button/index.tsx`).

## Code Style

**Formatting:**
- Prettier (`prettier.config.mjs`) with `semi: true`, `singleQuote: false` (double quotes), `trailingComma: "all"`. All other options use Prettier defaults (2-space indent, 80-char print width).
- Run via `pnpm format` (write) and `pnpm format:check` (CI-safe check), see `package.json`.

**Linting:**
- ESLint flat config (`eslint.config.mjs`) built on `eslint-config-next/core-web-vitals` and `eslint-config-next/typescript` — no custom rule overrides beyond `ignores` for `.next/`, `out/`, `coverage/`, `playwright-report/`, `test-results/`.
- Run via `pnpm lint`. TypeScript is checked separately with `pnpm typecheck` (`tsc --noEmit`), configured in `tsconfig.json` with `"strict": true`.
- No `any` usage observed in source files reviewed; unknown/external input is typed `unknown` and narrowed explicitly (see `isFieldValue` type guard in `src/features/schools/school/index.ts`).

## Import Organization

**Order:**
Imports consistently follow this grouping, with a blank line between groups (observed in nearly every file, e.g. `src/features/schools/filterSchools/index.test.ts`, `src/features/schools/school/index.ts`):
1. External packages (`zod`, `@testing-library/react`, `@testing-library/user-event`, `next/jest.js`, etc.)
2. `@/` path-aliased internal imports (feature/domain imports), each on its own or grouped `import type { ... }` block
3. Relative imports to the current module, typically `from "."` for the sibling `index.ts`/`index.tsx"` (used in test files to import the unit under test) or `from "./types"`, `from "./utils"`, `from "./fixtures"`

**Path Aliases:**
- `@/*` maps to `./src/*`, configured in `tsconfig.json` (`"paths": { "@/*": ["./src/*"] }`) and mirrored in `jest.config.mjs` (`moduleNameMapper: { "^@/(.*)$": "<rootDir>/src/$1" }`).
- Cross-feature imports always use the `@/` alias (e.g. `@/features/evidence/fieldEvidence`); same-directory imports always use relative `.`/`./file` syntax. Deep relative paths (`../../`) are avoided by using the alias instead.
- Type-only imports use the `import type { ... }` form consistently (e.g. `import type { FieldEvidence } from "@/features/evidence/fieldEvidence";`).

## Error Handling

**Patterns:**
- Data validity is enforced primarily through Zod schemas at the boundary, not manual `if`/`throw` checks. `schoolSchema.parse(...)` throws on invalid data by design; call sites either accept the throw (build-time/data-load context, e.g. `schoolDirectoryData/index.ts`, `validateSchools/index.ts`) or use `.safeParse(...)` when they need to collect and report multiple issues without throwing (`validateSchoolFixtures`, `validateRealSchools` in `src/features/schools/validateSchools/index.ts`).
- Cross-field/business-rule validation is expressed with Zod's `.superRefine(...)` and `context.addIssue({ code: "custom", path, message })`, not custom exception classes (see `schoolSchema` and `fieldEvidenceSchema` in `src/features/schools/school/index.ts` and `src/features/evidence/fieldEvidence/index.ts`).
- There are no custom `Error` subclasses or a centralized error-handling module in the codebase; failures surface as thrown `ZodError`s from `.parse()` or as returned structured result objects (e.g. `validateFieldCitations` returns `{ hasUnknownSource, hasAcceptableSource }` rather than throwing, in `src/features/evidence/validateFieldCitations/index.ts`).
- CLI/script-style validation entry points (`src/features/schools/validateSchools/index.ts`) print structured JSON to `console.error` and call `process.exit(1)` on failure, gated by `if (process.env.NODE_ENV !== "test")` so the same module is safely importable from Jest.
- Data absence is modeled as a first-class domain concept (`FieldStatus`: `verified | missing | unverified | outdated | conflicting | not_applicable`) rather than `null`/`undefined` checks scattered through UI code; formatting functions (`src/features/schools/formatSchoolField/index.ts`) branch on `status` before falling back to `value`.

## Logging

**Framework:** Plain `console` (no logging library).

**Patterns:**
- `console.error` + `process.exit(1)` for validation script failures (`src/features/schools/validateSchools/index.ts`).
- `console.log` for successful validation script summaries.
- No logging inside library/feature code (pure functions and components do not log); logging is confined to the standalone `validateSchools` script entry point.

## Comments

**When to Comment:**
- Comments are rare and code is written to be self-explanatory through naming. No narrative/obvious comments were observed in reviewed files (e.g. no `// loop through schools`).
- When present, comments explain a non-obvious business rule embedded in a Zod message string (e.g. the `.superRefine` issue messages in `src/features/schools/school/index.ts` double as both validation errors and inline documentation of the evidence-and-citation rules).

**JSDoc/TSDoc:**
- Not used in application code. The only doc-comment-style annotations are `/** @type {...} */` JSDoc type hints in plain `.mjs` config files (`jest.config.mjs`, `prettier.config.mjs`) to get IDE typing without TypeScript.

## Function Design

**Size:** Functions are kept small and single-purpose. Larger operations (e.g. `filterSchools`) are decomposed into private `matchesXFilter` helper functions rather than one long conditional block (`src/features/schools/filterSchools/index.ts`).

**Parameters:** Positional parameters for pure/domain functions with 2-3 args (`filterSchools(schools, filters)`, `validateFieldCitations(evidence, sources)`); destructured object props for React components (`{ school }: SchoolCardProps`).

**Return Values:** Domain validators return structured result objects (`{ checked, failures }`, `{ hasUnknownSource, hasAcceptableSource }`) instead of booleans or throwing, so callers can report on multiple issues at once. Formatter functions return plain strings ready for direct rendering (already localized to Brazilian Portuguese), pushing all "what to display when data is missing" logic into the formatter rather than the component.

## Module Design

**Exports:** Each unit's `index.ts`/`index.tsx` exports named bindings only (no default exports observed anywhere in `src/`). A unit typically exports one primary function/component plus closely related schema/type/constant exports (e.g. `filterSchools/index.ts` exports both `filterSchools` and `defaultDirectoryFilters`).

**Barrel Files:** No project-wide barrel/index re-export files. Every `index.ts`/`index.tsx` is the real implementation of its directory, not a re-export aggregator. Consumers import directly from the owning feature directory via the `@/` alias (e.g. `import { filterSchools } from "@/features/schools/filterSchools";` implied by relative test imports using `from "."`).

---

*Convention analysis: 2026-07-11*
