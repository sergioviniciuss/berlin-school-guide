# Codebase Concerns

**Analysis Date:** 2026-07-11

## Tech Debt

**Homepage still shows M2 scaffolding content, not an M4-appropriate entry point:**
- Issue: `src/app/page.tsx` renders a `GuideIntro` with `eyebrow="M2"` and the description "Fundação estática validada para o futuro guia de escolas primárias em Berlim" (a foundation validation message), plus a single link to the `/guides/m2-smoke` MDX smoke-test page. It does not link to `/schools`, which is the milestone's main feature.
- Files: `src/app/page.tsx`, `src/features/guides/GuideIntro/index.tsx`
- Impact: A visitor landing on `/` has no in-UI path to the school directory. The homepage copy also misrepresents project status (still describing itself as an M2 validation artifact after M4 shipped real functionality).
- Fix approach: Update the homepage copy and add a link/CTA to `/schools` once M4 is considered "live," or explicitly scope homepage content into a future milestone if M2 copy is intentionally a placeholder.

**Site-wide navigation does not exist:**
- Issue: `src/app/layout.tsx` renders only `<html><body>{children}</body></html>` with no header, nav, or footer. There is no shared navigation component anywhere in `src/features` or `src/components`.
- Files: `src/app/layout.tsx`
- Impact: `docs/INFORMATION_ARCHITECTURE.md` specifies primary navigation across guides, directory, comparison, checklists, and methodology, but none of this exists yet. Every route is only reachable by typing a URL directly (no way to get from `/schools` back to `/`, or from `/` to `/schools`, through UI).
- Fix approach: Introduce a shared layout/navigation component once enough routes exist to justify one (per the "avoid generic abstractions before two use cases exist" convention, this is reasonable to defer, but should be tracked before V1 release since M10's release-readiness checklist implies a coherent navigable site).

**Directory UI copy still describes the data as "synthetic," but the page now renders real research data:**
- Issue: `src/features/schools/SchoolDirectory/index.tsx` header copy reads "Busque e filtre escolas sintéticas para validar a experiência do diretório," and `src/app/schools/page.tsx` metadata description reads "Diretório estático de escolas sintéticas para validar busca e filtros." Both predate `getSchoolDirectoryItems()` being wired to `getRealSchools()` (real Lichtenberg data, `src/content/schools/real/lichtenbergPrimarySchools/index.ts`).
- Files: `src/features/schools/SchoolDirectory/index.tsx` (lines ~104-112), `src/app/schools/page.tsx` (lines 6-10)
- Impact: User-facing copy misrepresents the page's purpose. A visitor or reviewer would reasonably conclude the directory only contains placeholder/test data, undermining trust in a product whose core value proposition is trustworthy, evidence-based information.
- Fix approach: Update copy to describe the directory as showing real (partial, Lichtenberg-only) research data with appropriate caveats about coverage, rather than "synthetic" validation data.

**Dead/test-only export in production data module:**
- Issue: `getSyntheticSchools` in `src/features/schools/schoolDirectoryData/index.ts` is exported but only consumed by its own test file (`src/features/schools/schoolDirectoryData/index.test.ts`, asserting `toHaveLength(7)`). No page or feature calls it.
- Files: `src/features/schools/schoolDirectoryData/index.ts` (lines 16-28), `src/features/schools/schoolDirectoryData/index.test.ts`
- Impact: Low-risk, but it is dead weight in a "current state" module and could be mistaken for a still-used data source. If a new page wires it in without noticing `getRealSchools` is the production path, synthetic fixtures could leak into a real page.
- Fix approach: Either delete `getSyntheticSchools`/its test if fixtures are only needed via `src/features/schools/school/fixtures.ts` directly, or clearly comment that it exists for fixture-shape regression testing only.

**Implicit `ganztag` → `afterSchoolCare` fallback in the real-data builder:**
- Issue: In `src/content/schools/real/lichtenbergPrimarySchools/index.ts` (lines 144-148), `afterSchoolCare` defaults to reusing the `ganztag` field value/evidence when no explicit `afterSchoolCare` is provided. Ganztag program type (e.g., "Offene Ganztagbetreuung (OGB)") is not the same claim as after-school care details, but they share one citation and one verified status.
- Files: `src/content/schools/real/lichtenbergPrimarySchools/index.ts`
- Impact: Evidence coverage calculations (`calculateEvidenceCoverage`) and the UI will show `afterSchoolCare` as "verified" for 7 of 10 schools purely because a Ganztag type was found, not because after-school care specifics were actually researched. This inflates evidence coverage percentages beyond what was truly verified, which conflicts with the project's decision that "evidence coverage measures research completeness" (`docs/DECISIONS.md`, 2026-07-10 entry).
- Fix approach: Give `afterSchoolCare` its own `missing` evidence by default and only mark it verified when after-school care specifics (hours, provider, cost) are independently confirmed.

## Known Bugs

No functional bugs were identified during this analysis. The codebase has no `TODO`/`FIXME`/`HACK` markers, no `eslint-disable` or `@ts-ignore`/`@ts-expect-error` comments, and no stray `any` usages in `src/`.

## Security Considerations

**No HTTP security headers configured for the static export:**
- Risk: `next.config.mjs` sets `output: "export"` with no `headers()` configuration (which is unsupported for static export anyway). Whatever static host serves `out/` determines headers; there is no CSP, `X-Frame-Options`, or `Referrer-Policy` guidance documented for deployment.
- Files: `next.config.mjs`
- Current mitigation: None in-repo. `SECURITY.md` only documents vulnerability reporting process, not deployment hardening.
- Recommendations: Once a hosting target is chosen, document required response headers (CSP, frame protections) in `docs/` or a deployment config for that host, since this repo cannot enforce them itself.

**No automated dependency vulnerability scanning in CI:**
- Risk: `.github/workflows/ci.yml` runs lint/typecheck/test/validate:data/build but does not run `pnpm audit` or a Dependabot/Renovate equivalent.
- Files: `.github/workflows/ci.yml`
- Current mitigation: None detected (no `.github/dependabot.yml` present).
- Recommendations: Add a dependency-update bot or a periodic `pnpm audit --prod` CI job before V1 release, especially given the stack uses several bleeding-edge major versions (see Dependencies at Risk below).

Overall security exposure is low: this is a static-export site with no backend, no user input persistence, no authentication, and no secrets in the repository (no `.env*` files are tracked; `.gitignore` excludes `.env*.local`).

## Performance Bottlenecks

**All filtering happens client-side with no pagination, virtualization, or debounce:**
- Problem: `SchoolDirectory` (`src/features/schools/SchoolDirectory/index.tsx`) is a `"use client"` component that receives the full school array as a prop and recomputes `filterSchools`/`getDirectoryFilterOptions` on every keystroke via `useMemo`. `SchoolSearch` has no debounce.
- Files: `src/features/schools/SchoolDirectory/index.tsx`, `src/features/schools/filterSchools/index.ts`, `src/features/schools/SchoolSearch/index.tsx`
- Cause: Acceptable for the current 10-school Lichtenberg dataset (`src/content/schools/real/lichtenbergPrimarySchools/index.ts`), but `docs/ROADMAP.md` M8 calls for a broad Berlin-wide directory (hundreds of public/private primary schools).
- Improvement path: Before M8 lands full-city data, revisit whether client-side full-array filtering still performs acceptably, or whether pagination/virtualized lists become necessary. `matchesArrayFilter`/`matchesStringFilter` are O(n) per school per filter, which is fine at this scale but should be re-measured at hundreds of records with many active filters.

## Fragile Areas

**Manual three-way sync required to add a new directory filter:**
- Files: `src/features/schools/filterSchools/types.ts` (defines `DirectoryFilterState`), `src/features/schools/SchoolDirectory/index.tsx` (`queryParamMap`, `filtersFromSearchParams`, `toQueryString`), `src/features/schools/filterSchools/index.ts` (`filterSchools` matcher logic), `src/features/schools/SchoolFilters/index.tsx` (rendered controls)
- Why fragile: Adding a new filterable field requires touching four separate files by hand (type definition, query-param mapping, matcher function, and UI control), with no compiler-enforced link between `queryParamMap`'s keys and the matcher logic beyond the `satisfies` constraint on key names. A forgotten matcher branch would silently filter fewer schools than the URL/UI implies.
- Safe modification: When adding a filter, update `types.ts` first, then follow the existing filters (e.g., `ganztag`) as a template across all four files, and add both a unit test in `filterSchools/index.test.ts` and (ideally) an e2e assertion in `e2e/smoke.spec.ts`.
- Test coverage: `src/features/schools/filterSchools/index.test.ts` (122 lines) covers matcher logic well; there is no test asserting that every key in `DirectoryFilterState` has a corresponding branch in `filterSchools`, so a missing branch would not fail any test.

**Real-school data defaults are easy to get wrong silently:**
- Files: `src/content/schools/real/lichtenbergPrimarySchools/index.ts` (`primarySchool()` builder, lines 112-197)
- Why fragile: The builder has many implicit fallbacks (`ganztag` reused for `afterSchoolCare`; `offers` reused for both `schoolProfile` and `pedagogyFocus`) that make it easy to mark a field "verified" based on evidence that does not directly support that specific field's claim. There is no schema-level or test-level check that a field's evidence source actually discusses that field's topic — `schoolSchema`'s `superRefine` (`src/features/schools/school/index.ts`) only checks that cited sources exist and that verified fields have citations, not that the citation is topically relevant.
- Safe modification: When adding a new real school, prefer explicit `missing()`/`notApplicable()` evidence over the builder's implicit reuse defaults unless the shared source genuinely covers both fields.
- Test coverage: `src/features/schools/validateSchools/index.ts` validates schema shape and citation existence but cannot detect topically-mismatched evidence, since that is a research-judgment problem, not a structural one.

## Scaling Limits

**Single-file real school dataset will not scale to full-city import:**
- Current capacity: `src/content/schools/real/lichtenbergPrimarySchools/index.ts` holds 10 schools in 472 lines (~47 lines/school average, more for schools with `detailed` coverage).
- Limit: `docs/ROADMAP.md` M8 requires importing "public primary schools" and "private primary schools where reliable basic data is available" city-wide — Berlin has several hundred primary schools. A single flat array in one file would become very large and hard to review/diff.
- Scaling path: Introduce a per-district or per-batch content module structure (e.g., one file per district under `src/content/schools/real/`, mirroring the existing `lichtenbergPrimarySchools` pattern) before M8's broad import begins, and aggregate them in `schoolDirectoryData`.

**No pagination for directory results:**
- Current capacity: `SchoolResults` (`src/features/schools/SchoolResults/index.tsx`) renders every filtered school as a full `SchoolCard` in one pass.
- Limit: Fine for 10 records; a city-wide directory (hundreds of records, M8) rendered without pagination or windowing would produce a very tall DOM and slower interaction/filter response, especially on mobile.
- Scaling path: Add pagination or infinite scroll once real record counts grow substantially; revisit after M8 data volume is known.

## Dependencies at Risk

**Stack relies on very new major/minor versions across the board:**
- Risk: `package.json` pins `next@16.2.10`, `react@19.2.7`/`react-dom@19.2.7`, `tailwindcss@4.3.2`, `zod@4.4.3`, `eslint@9.39.4`, and `@types/node@26.1.1` — all recent major-version lines. Bleeding-edge framework versions can have less community troubleshooting content, more frequent breaking patch releases, and slower third-party plugin compatibility.
- Impact: Upgrades may require closer-than-usual attention to changelogs; some ecosystem tooling (editor plugins, community examples) may lag behind these versions.
- Migration plan: No action needed today since the project intentionally started on current versions, but track upstream release notes for `next`, `react`, and `tailwindcss` before each `pnpm update`, and keep `pnpm-lock.yaml` reviewed in PRs rather than auto-merged.

## Missing Critical Features

**No school detail page (`/schools/[slug]`):**
- Problem: `docs/ROADMAP.md` M5 ("Detailed School Profile") is not started. `SchoolCard` (`src/features/schools/SchoolCard/index.tsx`) renders as a non-interactive `<article>` with no link to a detail route.
- Blocks: Families cannot currently see full evidence, citations, Open Day questions, or a single school's complete profile — only the directory card summary.

**No comparison page (`/compare`):**
- Problem: `docs/ROADMAP.md` M6 is not started; there is no `src/app/compare` route or comparison feature under `src/features`.
- Blocks: The "Compare Nearby Options" user journey described in `docs/INFORMATION_ARCHITECTURE.md` is entirely unimplemented.

**No guides/methodology content beyond the M2 smoke page:**
- Problem: `src/content/guides/` contains only `m2-smoke.mdx`; `docs/ROADMAP.md` M7 (education system guide, enrollment, Ganztag, inspections, etc.) and the methodology page from `docs/INFORMATION_ARCHITECTURE.md` are not started.
- Blocks: The "Understand First" and "Check Trustworthiness" user journeys have no content to support them yet.

**E2E test suite is not run in CI:**
- Problem: `.github/workflows/ci.yml` runs `lint`, `typecheck`, `test`, `validate:data`, and `build`, but never `pnpm e2e`. `e2e/smoke.spec.ts` exists and passes locally but is not a CI gate.
- Blocks: Regressions in the directory search/filter UI flow (or navigation) could be merged without the existing Playwright coverage catching them, since it only runs when a contributor remembers to run it manually.
- Fix approach: Add an `e2e` job to `.github/workflows/ci.yml` using `pnpm exec playwright install --with-deps` followed by `pnpm e2e` (Playwright's `webServer` config already starts `pnpm dev --port 4310` automatically).

## Test Coverage Gaps

**No accessibility (a11y) automated testing:**
- What's not tested: There is no `axe-core`/`jest-axe`/Playwright accessibility scan anywhere in the repo, despite `docs/ROADMAP.md` M10 explicitly requiring an "Accessibility review."
- Files: No test file references accessibility tooling; `package.json` has no `@axe-core/*` or `jest-axe` dependency.
- Risk: Manual-only accessibility review at M10 may surface issues far later than necessary, after UI patterns have already propagated across `SchoolFilters`, `SchoolCard`, `ActiveFilterSummary`, etc.
- Priority: Medium — worth introducing incrementally now (e.g., one Playwright + axe smoke check) rather than deferring entirely to M10.

**Homepage and root layout have zero test coverage (both unit and e2e beyond one heading check):**
- What's not tested: `src/app/page.tsx` and `src/app/layout.tsx` are excluded from Jest coverage collection entirely (`jest.config.mjs` `collectCoverageFrom` excludes `src/app/**/page.{ts,tsx,mdx}` and `layout.tsx`), and `e2e/smoke.spec.ts` only checks that the homepage heading and one MDX link work.
- Files: `src/app/page.tsx`, `src/app/layout.tsx`, `jest.config.mjs`
- Risk: Low today (homepage is simple), but as navigation and richer homepage content are added (see Tech Debt above), this coverage gap should close alongside that work rather than staying permanently excluded.
- Priority: Low for now; revisit once real navigation/homepage content ships.

**No test asserts that all `DirectoryFilterState` keys have matching filter logic and query-param wiring:**
- What's not tested: See "Fragile Areas" above — `filterSchools/index.test.ts` tests each filter's *behavior* but nothing enforces that every key added to `DirectoryFilterState` (`src/features/schools/filterSchools/types.ts`) is wired into `filterSchools`, `queryParamMap`, and `SchoolFilters`.
- Files: `src/features/schools/filterSchools/types.ts`, `src/features/schools/filterSchools/index.test.ts`
- Risk: A future filter field could be added to the type and UI but silently do nothing if the matcher branch is forgotten, with no test failure.
- Priority: Low — most naturally caught by TypeScript exhaustiveness if `filterSchools` is refactored to switch over `Object.keys` with a typed matcher map, but not required immediately given the current filter count is stable.

---

*Concerns audit: 2026-07-11*
