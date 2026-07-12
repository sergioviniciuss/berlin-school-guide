# Phase 8: Release Readiness - Discussion Log

> **Audit trail only.** Do not use as input to planning, research, or execution agents.
> Decisions are captured in CONTEXT.md — this log preserves the alternatives considered.

**Date:** 2026-07-12
**Phase:** 8-release-readiness
**Areas discussed:** CI & e2e, Accessibility, SEO & metadata, Deployment documentation

---

## CI & e2e

| Option | Description | Selected |
|--------|-------------|----------|
| Required CI gate on every PR | e2e blocks merge; satisfies REL-03 | ✓ (custom) |
| Main branch only | e2e on main push, not PRs | |
| Manual/nightly only | documented, not in CI | |

**User's choice:** Run Playwright on every PR targeting main as required status check. Skip e2e on documentation-only changes (README, MDX, docs) using path filters. Also run on direct pushes to main. Keep suite fast (<2–3 minutes).

| Option | Description | Selected |
|--------|-------------|----------|
| smoke.spec.ts only | 11 tests, fast PR gate | |
| Split smoke + fuller suite | PR smoke, expanded on main/nightly | ✓ |
| Expand smoke now | add more to PR gate | |

| Option | Description | Selected |
|--------|-------------|----------|
| Chromium only both jobs | fastest | |
| Chromium PR + multi-browser main | | ✓ |
| You decide | | |

**Notes:** User explicitly chose split jobs and multi-browser on main/nightly fuller run.

---

## Accessibility

| Option | Description | Selected |
|--------|-------------|----------|
| Automated axe in CI | fail on violations | |
| Manual checklist only | human UAT | |
| Hybrid axe + manual | | ✓ |

| Option | Description | Selected |
|--------|-------------|----------|
| Core journey routes only | /, /schools, sample profile, /compare, /guides, /methodology | ✓ |
| All routes including 10 profiles | | |
| You decide | | |

| Option | Description | Selected |
|--------|-------------|----------|
| Fail serious/critical only | | |
| Zero violations policy | fix all axe findings | ✓ |
| Axe advisory, manual gates release | | |

---

## SEO & metadata

| Option | Description | Selected |
|--------|-------------|----------|
| Title + description only | | |
| Basic Open Graph | | |
| Full social preview | | |
| Custom: complete metadata package | title, description, canonical, OG, Twitter, pt_BR, default share image; dynamic OG deferred | ✓ |

| Option | Description | Selected |
|--------|-------------|----------|
| Automated metadata test | | |
| Manual audit only | | |
| Both automated + manual | | ✓ |

**Notes:** School profiles use generateMetadata(). One default OG image for V1.

---

## Deployment documentation

| Option | Description | Selected |
|--------|-------------|----------|
| Generic static host | host-agnostic | |
| Vercel-specific | | |
| GitHub Pages | | |
| Multi-host (Vercel + generic) | | ✓ |

| Option | Description | Selected |
|--------|-------------|----------|
| Essential headers only | Cache-Control, X-Content-Type-Options, Referrer-Policy, Permissions-Policy | ✓ |
| Full security header set | CSP, HSTS | |
| Minimal (out/ + 404 only) | | |

---

## Claude's Discretion

- CI path-filter exact globs
- Axe tooling choice and fuller e2e suite contents
- Default OG image asset design
- Shared metadata helper vs per-page duplication

## Deferred Ideas

- Dynamic OG images per page
- Strict CSP/HSTS as V1 blockers
- Lighthouse performance gates
- axe on all 10 school profiles
