# External Integrations

**Analysis Date:** 2026-07-11

## APIs & External Services

**None detected.** No `fetch()`, HTTP client library (e.g. axios), or third-party SDK calls exist in `src/`. A search across `src/` for `process.env.`, `fetch(`, `axios`, `API_KEY`, and `NEXT_PUBLIC_` matched only `process.env.NODE_ENV` in `src/features/schools/validateSchools/index.ts` (a standard build-tool environment check, not an external service call).

This matches the documented architecture: `docs/DECISIONS.md` states the product "does not require user accounts, dynamic personalization, server-side search, or live integrations," and `AGENTS.md` explicitly forbids adding a production database, server-side API dependency, user accounts, or authentication for V1.

## Data Storage

**Databases:**
- None. No ORM, database client, or connection string handling exists anywhere in the codebase.

**File Storage:**
- Local filesystem only. School and evidence data live as static TypeScript/JSON under `src/content/schools/` (e.g. `src/content/schools/fixtures/valid-directory-only-school.json`, `src/content/schools/real/lichtenbergPrimarySchools.ts` referenced from `src/features/schools/validateSchools/index.ts`).
- Data is read at build/validate time via Node's `fs` module (`readdirSync`, `readFileSync` in `src/features/schools/validateSchools/index.ts`), not fetched over the network.

**Caching:**
- None. No caching library or CDN-cache configuration is present; static export means all pages are pre-rendered at build time.

## Authentication & Identity

**Auth Provider:**
- None. There are no user accounts, sessions, or auth middleware. This is an explicit V1 constraint (see `AGENTS.md`).

## Monitoring & Observability

**Error Tracking:**
- None. No error-tracking SDK (e.g. Sentry) is present in `package.json` dependencies.

**Logs:**
- Build-time only. `console.error` / `console.log` are used in `src/features/schools/validateSchools/index.ts` to report data-validation failures and successes; there is no runtime/production logging infrastructure since the site is statically exported.

## CI/CD & Deployment

**Hosting:**
- Not determined by the codebase. There is no hosting-provider configuration file (no `vercel.json`, `netlify.toml`, Dockerfile, or similar) checked into the repository. The production build (`next build` with static export) generates a static `out/` directory intended to be served by any static host, but the specific host is not codified here.

**CI Pipeline:**
- GitHub Actions, defined in `.github/workflows/ci.yml`. Runs on `pull_request` and `push` to `main`.
- Pipeline steps: checkout → setup Node 22 → enable Corepack → `corepack prepare pnpm@11.11.0 --activate` → `pnpm install` → `pnpm lint` → `pnpm typecheck` → `pnpm test` → `pnpm validate:data` → `pnpm build`.
- No deployment/publish step is present in the workflow; CI only validates and builds.

## Environment Configuration

**Required env vars:**
- None found. No `.env*` files exist in the repository, and no application code reads custom environment variables.

**Secrets location:**
- Not applicable. No secrets, API keys, or credential files are present or referenced anywhere in the codebase.

## Webhooks & Callbacks

**Incoming:**
- None.

**Outgoing:**
- None.

---

*Integration audit: 2026-07-11*
