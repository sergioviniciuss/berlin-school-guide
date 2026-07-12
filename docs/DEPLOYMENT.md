# Deployment

Berlin School Guide is a **static export** Next.js site. Production output lives in the `out/` directory after `pnpm build`. No Node server is required in production.

## Prerequisites

- Node.js 22+
- Corepack enabled
- pnpm 11.11.0 (via Corepack)

## Build

```bash
corepack enable
pnpm install
pnpm validate:data
pnpm build
```

The static site is written to `out/`. Serve that directory with any static host or CDN.

## Environment variables

| Variable | Required | Description |
|----------|----------|-------------|
| `NEXT_PUBLIC_SITE_URL` | Production: yes | Public site URL used for canonical links and Open Graph metadata (e.g. `https://berlin-school-guide.example`) |

For local development and CI, defaults to `http://127.0.0.1:4310`.

Copy `.env.example` to `.env.local` when deploying:

```bash
cp .env.example .env.local
```

## Vercel (recommended)

1. Import the GitHub repository in Vercel.
2. Framework preset: **Next.js**.
3. Build command: `pnpm build` (Vercel detects static export from `next.config.mjs`).
4. Set **Environment variable** `NEXT_PUBLIC_SITE_URL` to your production domain.
5. Deploy. Vercel serves the static export and handles HTTPS.

Vercel automatically applies sensible defaults for static assets. You can add custom headers in `vercel.json` if needed (see [Recommended headers](#recommended-headers)).

## Generic static host

Upload the contents of `out/` to object storage or any static web host (S3 + CloudFront, Netlify, GitHub Pages with actions, nginx, etc.).

### SPA / 404 fallback

Most routes are pre-rendered HTML files. For client-side navigation edge cases on hosts without Next.js rewrites:

- Configure the host to serve `404.html` or rewrite unknown paths to `index.html` **only if** your host requires it for direct URL loads.
- Next.js static export generates HTML per route under `out/` — direct loads to `/schools`, `/guides`, etc. work when the host maps paths to files correctly.

### Cache

- Long cache (`Cache-Control: public, max-age=31536000, immutable`) for hashed assets under `out/_next/static/`.
- Short or no cache for HTML documents so content updates propagate quickly.

## Recommended headers

Apply on production (Vercel dashboard, `vercel.json`, CloudFront, nginx, etc.):

| Header | Example value | Purpose |
|--------|---------------|---------|
| `Cache-Control` | `public, max-age=31536000, immutable` (static assets) | Performance |
| `X-Content-Type-Options` | `nosniff` | MIME sniffing protection |
| `Referrer-Policy` | `strict-origin-when-cross-origin` | Privacy |
| `Permissions-Policy` | `camera=(), microphone=(), geolocation=()` | Reduce browser feature exposure |

Optional future hardening (not V1 blockers):

- `Content-Security-Policy` — tune after auditing inline styles/scripts
- `Strict-Transport-Security` — when HTTPS is enforced end-to-end

## CI quality gates

On every pull request to `main`:

- `pnpm lint`, `pnpm typecheck`, `pnpm test`, `pnpm validate:data`, `pnpm build`
- Playwright smoke e2e against the built `out/` directory (skipped for docs-only changes)

On push to `main`:

- Full Playwright suite across Chromium, Firefox, and WebKit

Local CI-parity e2e:

```bash
pnpm build
pnpm e2e:ci
```

## Pre-release checklist

1. `pnpm lint && pnpm typecheck && pnpm test && pnpm validate:data && pnpm build`
2. `pnpm e2e:ci` (smoke, metadata, accessibility)
3. Set `NEXT_PUBLIC_SITE_URL` to production domain before final build
4. Manual spot-check: Open Graph preview on homepage and one school profile
5. Manual keyboard navigation through header → directory → profile
