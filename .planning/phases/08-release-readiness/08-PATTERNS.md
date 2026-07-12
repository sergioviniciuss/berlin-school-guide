# Phase 8: Release Readiness - Patterns

**Mapped:** 2026-07-12
**Phase:** 08-release-readiness

## Pattern Map

| New artifact | Pattern source | Relationship |
|--------------|----------------|--------------|
| CI e2e job | `.github/workflows/ci.yml` | extend |
| Playwright CI server | `playwright.config.ts` | extend (CI config or env flag) |
| Site metadata helper | `src/app/layout.tsx` metadata | extend |
| Profile metadata | `src/app/schools/[slug]/page.tsx` generateMetadata | extend |
| Axe e2e tests | `e2e/smoke.spec.ts` | parallel new file |
| Deployment docs | `docs/DECISIONS.md`, `docs/PRODUCT.md` | new DEPLOYMENT.md |

## CI Workflow Pattern

**Source:** `.github/workflows/ci.yml`

Existing validate job: checkout → corepack → pnpm install → lint → typecheck → test → validate:data → build.

**Apply:** Add `e2e-smoke` job (or step) after build:
- Install Playwright Chromium
- Serve static `out/` on port 4310
- Run `pnpm e2e -- e2e/smoke.spec.ts`
- Use `paths`/`paths-ignore` on workflow trigger for docs-only skip

## Metadata Pattern

**Source:** `src/app/layout.tsx` (minimal title/description today)

**Source:** `src/app/schools/[slug]/page.tsx` (dynamic generateMetadata)

**Apply:** Extract `buildPageMetadata()` in `src/features/siteMetadata/`:
- Input: `{ title, description, path }`
- Output: `Metadata` with openGraph, twitter, alternates.canonical
- Root layout sets `metadataBase`, locale `pt_BR`, default OG image

## E2E Pattern

**Source:** `e2e/smoke.spec.ts`

Structure: describe blocks, role-based selectors, Portuguese labels, mobile viewport test in compare block.

**Apply for a11y:** New `e2e/a11y.spec.ts` — visit core URLs, run `AxeBuilder`, assert zero violations.

## Human UAT Pattern

**Source:** `.planning/phases/07-essential-parent-guides/07-HUMAN-UAT.md`

**Apply:** `08-HUMAN-UAT.md` with keyboard/focus + OG preview manual checks.

## Test Pattern

**Source:** `src/app/page.test.tsx`, `src/app/methodology/page.test.tsx`

**Apply:** Metadata unit test asserting helper output includes canonical, openGraph.locale, twitter.card.

## PATTERNS COMPLETE
