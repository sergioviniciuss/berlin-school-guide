# Testing Patterns

**Analysis Date:** 2026-07-11

## Test Framework

**Runner:**
- Jest 30 (`jest`), bootstrapped via `next/jest.js` in `jest.config.mjs` so Next.js compilation (SWC, CSS/module mocking, `.env` loading) works inside tests.
- Config: `jest.config.mjs` — `testEnvironment: "jest-environment-jsdom"`, `clearMocks: true`, `setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"]`, `moduleNameMapper: { "^@/(.*)$": "<rootDir>/src/$1" }`, `testPathIgnorePatterns: ["<rootDir>/e2e/", "<rootDir>/.next/", "<rootDir>/out/"]`.
- Setup file `jest.setup.ts` only adds `import "@testing-library/jest-dom";` — no other global mocks or polyfills.

**Assertion Library:**
- Jest's built-in `expect` plus `@testing-library/jest-dom` matchers (`toBeVisible()`, etc.) for DOM assertions.

**Run Commands:**
```bash
pnpm test              # Run all Jest tests once
pnpm test:watch         # Watch mode
pnpm test:coverage      # Run with coverage report
pnpm e2e                # Run Playwright end-to-end tests (separate from Jest)
```

## Test File Organization

**Location:**
- Colocated: every test lives beside the code it exercises, inside the same unit directory.

**Naming:**
- Unit/component tests: `index.test.ts` (pure logic/schemas) or `index.test.tsx` (React components), always sibling to `index.ts`/`index.tsx`.
- End-to-end tests live outside `src/`, in `e2e/*.spec.ts`, run by Playwright (excluded from Jest via `testPathIgnorePatterns`).

**Structure:**
```
src/features/schools/filterSchools/
├── index.ts
├── index.test.ts
└── types.ts

src/features/schools/school/
├── index.ts
├── index.test.ts
├── fixtures.ts
└── types.ts

src/features/schools/SchoolCard/
├── index.tsx
├── index.test.tsx
└── utils.ts

e2e/
└── smoke.spec.ts
```

## Test Structure

**Suite Organization:**
```typescript
import { filterSchools, defaultDirectoryFilters } from ".";
import { getSchoolDirectoryItems } from "@/features/schools/schoolDirectoryData";

const schools = getSchoolDirectoryItems();

describe("filterSchools", () => {
  it("searches by school name", () => {
    expect(
      filterSchools(schools, { ...defaultDirectoryFilters, query: "Lew-Tolstoi" }),
    ).toHaveLength(1);
  });
  // ...one `it` per behavior/scenario
});
```
(from `src/features/schools/filterSchools/index.test.ts`)

**Patterns:**
- One top-level `describe` per unit, named exactly after the exported function/component/schema (`describe("filterSchools", ...)`, `describe("schoolSchema", ...)`, `describe("SchoolCard", ...)`).
- No shared `beforeEach`/`afterEach` observed; setup is inlined per test or hoisted to a `const` at module scope when shared across all tests in the file (e.g. `const schools = getSchoolDirectoryItems();` reused by every `it` in `filterSchools/index.test.ts`).
- Test descriptions are behavior-focused, written as plain lowercase sentences starting with a verb: `"searches by school name"`, `"rejects verified fields without citations"`, `"renders missing data neutrally"`.
- Multiple related assertions are grouped into a single `it` when they test the same behavioral theme (e.g. `"filters after-school care and inspection availability"` asserts two related filter cases in one test), rather than one assertion per test.
- `jest.fn()` clears automatically between tests because `clearMocks: true` is set globally in `jest.config.mjs` — no manual `mockClear()`/`mockReset()` calls needed.

## Mocking

**Framework:** Jest's built-in `jest.fn()`. No mocking library (no `jest-mock-extended`, no `sinon`, no MSW).

**Patterns:**
```typescript
const onToggle = jest.fn();

render(
  <SchoolFilters
    filters={defaultDirectoryFilters}
    options={getDirectoryFilterOptions(getSchoolDirectoryItems())}
    onToggle={onToggle}
  />,
);

await user.click(screen.getByLabelText("Lichtenberg"));
expect(onToggle).toHaveBeenCalledWith("districts", "Lichtenberg");
```
(from `src/features/schools/SchoolFilters/index.test.tsx`)

**What to Mock:**
- Only callback props passed into components under test (`onToggle`, similar event handlers) are mocked with `jest.fn()`.

**What NOT to Mock:**
- Domain/data functions are never mocked. Tests call the real `getSchoolDirectoryItems()`, `getSyntheticSchools()`, `schoolSchema.parse()`, etc., against real static fixture/content data — the static-first architecture means there is no network or database layer to mock out.
- No module-level `jest.mock(...)` calls were found anywhere in the test suite; all tests exercise real implementations end-to-end within the unit boundary.

## Fixtures and Factories

**Test Data:**
```typescript
// src/features/evidence/source/fixtures.ts
export const officialDirectorySource: Source = {
  id: "berlin-directory",
  title: "Synthetic Berlin school directory",
  url: "https://example.test/berlin-directory",
  type: "official_government",
  reliability: "primary",
  publisher: "Synthetic Berlin Senate source",
  dateAccessed: "2026-07-10",
  datePublished: "2026-07-01",
};
```

```typescript
// src/features/schools/school/fixtures.ts (referenced by index.test.ts)
import {
  invalidUnknownSourceCitation,
  validDetailedPublicSchool,
  validDirectoryOnlySchool,
  // ...
} from "./fixtures";
```

- Fixtures are plain typed constants (not factory functions) exported from a colocated `fixtures.ts` file, typed against the domain's real type (`Source`, `FieldEvidence`, `FieldValue<string>`, `School`).
- Fixture data is explicitly marked as synthetic in its content (e.g. `"Synthetic Berlin school directory"`, `"Synthetic fixture did not find this information."`) to keep it clearly distinguishable from `src/content/schools/real/` production content and from `src/content/schools/fixtures/*.json` sample records used by `validateSchools`.
- Schema-validation test fixtures follow a `valid<Scenario>` / `invalid<Scenario>` naming convention so each fixture documents exactly which rule it satisfies or violates (`validMixedLevelPrimarySchool`, `invalidMixedLevelWithoutPrimaryDescription`).
- Higher-level tests reuse lower-level real/derived data instead of re-declaring fixtures: `getSchoolDirectoryItems()` (`src/features/schools/schoolDirectoryData/index.ts`) is called directly in `filterSchools`, `SchoolCard`, and `SchoolFilters` tests to get realistic `SchoolDirectoryItem[]` data end-to-end.

**Location:**
- Colocated as `fixtures.ts` inside the same unit directory as `index.ts`, e.g. `src/features/evidence/source/fixtures.ts`, `src/features/evidence/fieldEvidence/fixtures.ts`, `src/features/schools/school/fixtures.ts`.
- JSON-shaped sample content lives separately under `src/content/schools/fixtures/*.json`, validated by `src/features/schools/validateSchools/index.ts` against `schoolSchema` (distinct from TypeScript `fixtures.ts` test fixtures).

## Coverage

**Requirements:** No enforced coverage threshold configured in `jest.config.mjs` (no `coverageThreshold` block). Coverage is collected but not gated.

**View Coverage:**
```bash
pnpm test:coverage
```
Collected from `collectCoverageFrom` in `jest.config.mjs`: `src/**/*.{ts,tsx}`, excluding `*.d.ts`, `src/app/**/page.{ts,tsx,mdx}`, and `src/app/layout.tsx` (routing/layout files are intentionally excluded since they contain no business logic to unit test).

## Test Types

**Unit Tests:**
- Pure-function and schema tests dominate: filters (`filterSchools`), formatters (`formatSchoolField`), schema validators (`schoolSchema`, `fieldEvidenceSchema`), coverage calculators (`calculateEvidenceCoverage`), citation validators (`validateFieldCitations`). Roughly 21 test files under `src/`, most `.test.ts` rather than `.test.tsx`.

**Integration Tests:**
- React component tests using `@testing-library/react` render real components with real data derived from `getSchoolDirectoryItems()`/`getDirectoryFilterOptions()` rather than isolated mocks, effectively integration-testing the component against the actual data-shaping layer (`SchoolCard/index.test.tsx`, `SchoolFilters/index.test.tsx`, `SchoolDirectory/index.test.tsx`, `SchoolResults/index.test.tsx`, `ActiveFilterSummary/index.test.tsx`, `SchoolSearch/index.test.tsx`, `GuideIntro/index.test.tsx`).

**E2E Tests:**
- Playwright (`@playwright/test` 1.61.1), config at `playwright.config.ts`: single `chromium` project, `testDir: "./e2e"`, boots the real Next.js dev server on `http://127.0.0.1:4310` via `webServer.command: "pnpm dev --port 4310"`.
- Currently one spec, `e2e/smoke.spec.ts`, covering the static home page + MDX guide route and the full school-directory search/filter/clear-filter flow, asserting on real rendered Portuguese-language UI text (e.g. `"10 de 10 escolas encontradas"`).
- Run with `pnpm e2e`.

## Common Patterns

**Async Testing (user interaction):**
```typescript
const user = userEvent.setup();
render(<SchoolFilters ... onToggle={onToggle} />);
await user.click(screen.getByLabelText("Lichtenberg"));
expect(onToggle).toHaveBeenCalledWith("districts", "Lichtenberg");
```
(`src/features/schools/SchoolFilters/index.test.tsx`) — `@testing-library/user-event` is always awaited (`await user.click(...)`), never fired synchronously with `fireEvent`.

**Error Testing (schema rejection):**
```typescript
it("rejects verified fields without citations", () => {
  expect(() => schoolSchema.parse(invalidVerifiedWithoutCitation)).toThrow();
});
```
(`src/features/schools/school/index.test.ts`) — invalid-input tests assert `.toThrow()` on `schema.parse(...)` rather than inspecting `ZodError` internals; when the failure detail matters, the code instead uses `.safeParse(...)` and asserts on the returned `errors`/`failures` shape (`src/features/schools/validateSchools/index.test.ts`).

**Playwright E2E (async page interaction):**
```typescript
test("searches and filters the static school directory", async ({ page }) => {
  await page.goto("/schools");
  await page.getByLabel("Buscar escola pelo nome").fill("Lew-Tolstoi");
  await expect(page.getByText("1 de 10 escolas encontradas")).toBeVisible();
});
```
(`e2e/smoke.spec.ts`) — all Playwright assertions use accessible role/label queries (`getByRole`, `getByLabel`, `getByText`) matching the exact Portuguese copy rendered by the app, mirroring the accessibility-first query style used in Jest/RTL tests (`screen.getByRole`, `screen.getByLabelText`).

---

*Testing analysis: 2026-07-11*
