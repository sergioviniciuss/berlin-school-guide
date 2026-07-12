# Phase 8: Release Readiness - Research

**Researched:** 2026-07-12
**Domain:** CI e2e gates, SEO metadata, accessibility automation, static deployment docs
**Confidence:** HIGH

## Summary

Phase 8 closes the V1 release gate without new product features. The brownfield site already has: static export (`output: "export"` in `next.config.mjs`), CI running lint/typecheck/test/validate:data/build, and 11 local Playwright smoke tests. Gaps are e2e in CI, complete social metadata, axe accessibility scans, and deployment documentation.

**Primary recommendation:** Four-plan wave — (1) CI e2e split jobs, (2) shared metadata + OG image, (3) axe automation + fixes + human UAT doc, (4) DEPLOYMENT.md + release verification.

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions
- D-01–D-16: PR-required smoke e2e with docs path filters; split smoke (Chromium PR) vs fuller (multi-browser main); hybrid axe zero-violations on core journeys; full metadata package; Vercel + generic DEPLOYMENT.md; essential security headers

### Claude's Discretion
- Path-filter globs, axe package wiring, OG image asset, fuller job schedule, metadata helper location

### Deferred (OUT OF SCOPE)
- Dynamic OG images, strict CSP/HSTS program, Lighthouse gates, axe on all 10 profiles
</user_constraints>

<phase_requirements>
| ID | Description | Research Support |
|----|-------------|------------------|
| REL-01 | Static build passes | Existing CI build step; verify `out/` in release plan |
| REL-02 | validate:data passes | Already in CI; keep required |
| REL-03 | e2e in CI for critical flows | Wire `e2e/smoke.spec.ts` to PR job; expand on main |
| REL-04 | Portuguese SEO metadata | Next.js Metadata API: metadataBase, openGraph, twitter, alternates.canonical |
| REL-05 | Mobile/desktop usable | Covered by existing responsive layouts + e2e mobile compare test |
| REL-06 | Accessibility basics | `@axe-core/playwright` on core routes; manual UAT doc |
| REL-07 | Deployment docs | New `docs/DEPLOYMENT.md` |
</phase_requirements>

## Standard Stack

| Layer | Choice | Notes |
|-------|--------|-------|
| CI | GitHub Actions | Extend `.github/workflows/ci.yml` + optional `e2e-full.yml` |
| E2E | Playwright 1.61 | Existing config; add `pnpm exec playwright install --with-deps chromium` in CI |
| A11y | `@axe-core/playwright` | Industry standard; inject into Playwright page tests |
| Metadata | Next.js `Metadata` type | `metadataBase` in root layout; per-page overrides |
| Export | `next build` → `out/` | Already configured; document in DEPLOYMENT.md |

## Architecture Patterns

### Recommended plan structure
1. **08-01** — CI: PR smoke e2e + path filters + main fuller job skeleton
2. **08-02** — Metadata helper, default OG image, canonical/OG/Twitter on all routes + tests
3. **08-03** — Axe e2e suite on core journeys, fix violations, HUMAN-UAT template
4. **08-04** — `docs/DEPLOYMENT.md`, release verification checklist, ROADMAP closeout

### CI path-filter strategy
Skip e2e when changes touch **only**:
- `docs/**`
- `.planning/**`
- `README*` / `AGENTS.md`
- Root `*.md` (not under `src/`)

**Never skip** when `src/**`, `e2e/**`, `playwright.config.ts`, `.github/**`, or `package.json` change.

### Playwright in CI
- PR job: `pnpm exec playwright install chromium --with-deps` then `pnpm e2e -- e2e/smoke.spec.ts`
- Use `pnpm build && pnpm exec serve out` OR keep dev server — **prefer `next start` won't work with static export**; use `npx serve out -p 4310` or Playwright `webServer` pointing to static build for CI reliability
- Current config uses `pnpm dev` — for CI, add `webServer` override or separate `playwright.ci.config.ts` serving `out/` after build

### Metadata pattern
```typescript
// src/features/siteMetadata/constants.ts
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://berlin-school-guide.example";
export const DEFAULT_OG_IMAGE = "/og-default.png";
```
Root `layout.tsx`: `metadataBase`, default `openGraph`, `twitter`, `alternates.canonical` template.
Per-page: spread `buildPageMetadata({ title, description, path })` helper.

## Don't Hand-Rool

| Problem | Use Instead |
|---------|-------------|
| Custom OG tag injection | Next.js Metadata API |
| Manual sitemap for 8 routes | Optional later; not REL-04 minimum |
| jest-axe for static pages | `@axe-core/playwright` on rendered routes |

## Common Pitfalls

1. **Dev server lock in CI** — use static `serve out` not `next dev` to avoid port conflicts
2. **metadataBase missing** — OG URLs break without it
3. **Axe on dynamic compare URL** — pass valid `?schools=` query in a11y tests
4. **Path filters too broad** — don't ignore `src/content/**` (MDX affects build)

## RESEARCH COMPLETE
