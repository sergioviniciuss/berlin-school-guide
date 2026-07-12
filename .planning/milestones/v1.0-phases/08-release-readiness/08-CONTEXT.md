# Phase 8: Release Readiness - Context

**Gathered:** 2026-07-12
**Status:** Ready for planning

<domain>
## Phase Boundary

Make the Berlin School Guide production-ready for V1 launch: clean static build, validated school data, automated regression gates in CI, complete Portuguese SEO metadata, verified mobile/desktop usability on core journeys, accessibility review, and deployment documentation.

In scope: REL-01 through REL-07 — build/validate gates, e2e in CI, metadata pass, accessibility verification, deployment docs.

Out of scope: new product features, Berlin-wide expansion, dynamic OG image generation per page, full CSP/HSTS hardening program, user accounts, backend APIs, Lighthouse performance optimization as a dedicated phase.

</domain>

<decisions>
## Implementation Decisions

### CI & e2e gates (REL-01, REL-03)
- **D-01:** Playwright e2e runs on **every PR targeting `main`** as a **required status check**.
- **D-02:** **Skip e2e** on documentation-only changes using **CI path filters** — at minimum `docs/**`, `README*`, and editorial MDX/content-only paths (no app/feature code).
- **D-03:** On **direct pushes to `main`** (if permitted), run the same e2e gate.
- **D-04:** Keep the **PR e2e job under ~2–3 minutes** so developers do not avoid it.
- **D-05:** **Split e2e jobs:**
  - **PR smoke gate:** existing `e2e/smoke.spec.ts`, **Chromium only** (matches current `playwright.config.ts`).
  - **Main/nightly fuller job:** expand coverage + **Firefox and WebKit** browser matrix.
- **D-06:** Existing CI steps (lint, typecheck, unit test, `pnpm validate:data`, build) remain required — e2e is additive, not a replacement.

### Accessibility (REL-05, REL-06)
- **D-07:** **Hybrid verification** — automated axe scan **plus** a short manual keyboard/focus review for core journeys.
- **D-08:** Scope axe + manual review to **core journey routes only:**
  - `/` (homepage)
  - `/schools` (directory)
  - `/schools/[slug]` (one representative profile, e.g. Lew-Tolstoi-Schule)
  - `/compare` (with valid compare URL)
  - `/guides` and **one guide page** (e.g. `/guides/berlin-school-system`)
  - `/methodology`
- **D-09:** **Zero violations policy** — axe findings on scoped routes must be **fixed before release** (not serious/critical-only threshold).

### SEO & metadata (REL-04)
- **D-10:** **Complete metadata on every public page** for V1:
  - Unique `title` and `description` (Brazilian Portuguese)
  - `canonical` URL
  - Open Graph fields (`og:title`, `og:description`, `og:locale` = `pt_BR`, etc.)
  - Twitter/X card metadata
  - **One high-quality default social share image** used site-wide
- **D-11:** School profile pages continue to **override title/description dynamically** via existing `generateMetadata()` in `/schools/[slug]`.
- **D-12:** **Dynamic per-page OG image generation is deferred** — single default share image for V1.
- **D-13:** Verify metadata with **both** automated checks on core routes **and** a manual OG/Twitter preview spot-check before release.

### Deployment documentation (REL-07)
- **D-14:** Add **`docs/DEPLOYMENT.md`** documenting **two paths:**
  - **Primary:** Vercel deployment for the Next.js static export
  - **Fallback:** generic static host instructions (any CDN/object storage serving `out/`)
- **D-15:** Document static export output directory (`out/`), build command (`pnpm build`), and **404 / fallback routing** expectations for client-side routes on generic static hosts.
- **D-16:** Recommend **essential security headers** for production hosts:
  - `Cache-Control` for static assets
  - `X-Content-Type-Options: nosniff`
  - `Referrer-Policy`
  - `Permissions-Policy`
  - (Strict CSP and HSTS documented as optional/future hardening, not V1 blockers)

### Claude's Discretion
- Exact CI path-filter globs for docs-only skip (balance: skip pure editorial changes, never skip when `src/` or `e2e/` changes)
- Axe tooling integration (`@axe-core/playwright` vs equivalent) and fuller-suite contents beyond smoke
- Default OG image asset location, dimensions, and alt text
- Whether fuller e2e runs on every main push or scheduled nightly (prefer main push if fast enough)
- Shared metadata helper pattern in `src/app/layout.tsx` vs per-page duplication

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Requirements & product
- `.planning/REQUIREMENTS.md` — REL-01 through REL-07 acceptance criteria
- `.planning/ROADMAP.md` — Phase 8 success criteria
- `docs/PRODUCT.md` — V1 scope and static-first architecture
- `docs/DECISIONS.md` — static export and deployment philosophy

### Existing infrastructure
- `next.config.mjs` — `output: "export"`, MDX, unoptimized images
- `.github/workflows/ci.yml` — current CI jobs (no e2e yet)
- `playwright.config.ts` — e2e config, Chromium project, dev server on 4310
- `e2e/smoke.spec.ts` — PR smoke suite baseline (11 tests)
- `package.json` — `validate:data`, build, test scripts

### Metadata patterns
- `src/app/layout.tsx` — root metadata defaults
- `src/app/schools/[slug]/page.tsx` — `generateMetadata()` for profiles
- All `src/app/**/page.tsx` — per-route metadata exports

### Information architecture
- `docs/INFORMATION_ARCHITECTURE.md` — public routes and URL structure for metadata/a11y scope

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- `e2e/smoke.spec.ts` — directory, profile, compare, guides, navigation journeys already covered
- Per-page `metadata` exports on home, schools, compare, methodology, guides routes
- `generateMetadata()` on school profiles — extend pattern for OG/Twitter/canonical
- CI workflow template — add parallel or sequential e2e job with Playwright browser install

### Established Patterns
- Static export via Next.js `output: "export"` — build produces `out/` (verify in plan)
- pnpm + Corepack in CI — match for Playwright install step
- Human UAT pattern from Phases 6–7 (`*-HUMAN-UAT.md`) — reuse for manual a11y/metadata spot-checks

### Integration Points
- `.github/workflows/ci.yml` — primary change surface for e2e + optional axe job
- `src/app/layout.tsx` — central place for default OG image and locale metadata
- `docs/` — new DEPLOYMENT.md alongside existing product/architecture docs

### Known Gaps (pre-phase)
- E2e **not wired into CI** (STATE.md blocker)
- No deployment documentation (REL-07)
- No automated accessibility scanning
- Metadata lacks canonical, OG, Twitter, and default share image on most routes

</code_context>

<specifics>
## Specific Ideas

- PR e2e must stay fast enough that teams will not skip it (~2–3 min budget)
- Docs-only PRs should not pay the Playwright install/browser cost
- User wants **complete** social metadata for V1, not title/description-only minimum
- Deployment docs should not lock to one vendor — Vercel primary, generic static fallback

</specifics>

<deferred>
## Deferred Ideas

- **Dynamic OG images per school/guide page** — future phase after V1 launch
- **Strict CSP + HSTS program** — optional recommendations in DEPLOYMENT.md only for V1
- **Lighthouse performance budget / Core Web Vitals gate** — not in REL requirements; backlog if needed
- **axe scan on all 10 school profile pages** — deferred; one representative profile suffices for V1

</deferred>

---

*Phase: 08-release-readiness*
*Context gathered: 2026-07-12*
