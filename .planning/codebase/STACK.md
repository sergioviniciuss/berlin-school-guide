# Technology Stack

**Analysis Date:** 2026-07-11

## Languages

**Primary:**
- TypeScript 5.9.3 (strict mode) - all application code under `src/` and `e2e/`

**Secondary:**
- MDX (via `@mdx-js/react` 3.1.1, `@mdx-js/loader` 3.1.1, `@next/mdx` 16.2.10) - static content authoring in `src/content/`
- CSS (Tailwind utility classes, no separate stylesheets beyond Tailwind config)

## Runtime

**Environment:**
- Node.js 22 or newer (`README.md` "Requirements"; enforced in CI via `actions/setup-node@v4` with `node-version: 22` in `.github/workflows/ci.yml`)
- No `.nvmrc` or `.node-version` file present in the repo; Node version is documented only, not pinned by a version file

**Package Manager:**
- pnpm 11.11.0, managed via Corepack (`"packageManager": "pnpm@11.11.0"` in `package.json`)
- Lockfile: `pnpm-lock.yaml` present at repo root
- CI activates the exact version with `corepack prepare pnpm@11.11.0 --activate`

## Frameworks

**Core:**
- Next.js 16.2.10 - App Router, configured for static export (`next.config.mjs`: `output: "export"`, `images.unoptimized: true`)
- React 19.2.7 / React DOM 19.2.7 - UI rendering
- Tailwind CSS 4.3.2 via `@tailwindcss/postcss` 4.3.2 - utility-first styling, configured in `tailwind.config.ts` and `postcss.config.mjs`
- shadcn/ui-style primitives - hand-authored, colocated under `src/components/ui/` (e.g. `src/components/ui/Button/index.tsx`), built on `@radix-ui/react-slot` 1.3.0, `class-variance-authority` 0.7.1, `clsx` 2.1.1, `tailwind-merge` 3.6.0

**Testing:**
- Jest 30.4.2 with `jest-environment-jsdom` 30.4.1 - unit/component tests, configured via `next/jest` in `jest.config.mjs`
- React Testing Library (`@testing-library/react` 16.3.2, `@testing-library/jest-dom` 6.9.1, `@testing-library/user-event` 14.6.1) - component test utilities
- Playwright (`@playwright/test` 1.61.1) - end-to-end tests, configured in `playwright.config.ts`, tests live in `e2e/`

**Build/Dev:**
- TypeScript compiler (`tsc --noEmit`) - typechecking only, no direct emit (`pnpm typecheck`)
- ESLint 9.39.4 with `eslint-config-next` 16.2.10 (`core-web-vitals` + `typescript` rule sets), configured in `eslint.config.mjs`
- Prettier 3.9.4, configured in `prettier.config.mjs` (double quotes off i.e. `singleQuote: false`, semicolons on, trailing commas everywhere)
- `tsx` 4.21.0 - runs TypeScript scripts directly, used for `pnpm validate:data` (`src/features/schools/validateSchools/index.ts`)
- PostCSS 8.5.16 + Autoprefixer 10.5.2 - CSS processing pipeline for Tailwind

## Key Dependencies

**Critical:**
- `zod` 4.4.3 - runtime schema validation for the school data model (e.g. `schoolSchema` used in `src/features/schools/validateSchools/index.ts`); this is the enforcement mechanism for the static-first data architecture
- `next` 16.2.10 - the entire app is built around Next.js's static export mode; no server runtime is used in production

**Infrastructure:**
- `lucide-react` 1.24.0 - icon set for UI components
- `class-variance-authority` + `tailwind-merge` + `clsx` - variant/class-composition utilities backing the `src/components/ui/` primitives

## Configuration

**Environment:**
- No `.env` or `.env.*` files exist in the repo
- No environment variables are read anywhere in application source except `process.env.NODE_ENV` (standard Next.js/Jest built-in), checked in `src/features/schools/validateSchools/index.ts` to skip auto-run validation during tests
- No `NEXT_PUBLIC_*` variables or custom env config found

**Build:**
- `next.config.mjs` - static export configuration, MDX integration via `createMDX`
- `tsconfig.json` - strict TypeScript, `@/*` path alias mapped to `./src/*`, `moduleResolution: "bundler"`
- `tailwind.config.ts` - content globs over `src/**/*.{ts,tsx,md,mdx}`, CSS-variable-driven theme tokens (border/background/foreground/primary/radius)
- `postcss.config.mjs` - Tailwind + Autoprefixer pipeline
- `jest.config.mjs` - uses `next/jest` preset, `@/` alias mapped via `moduleNameMapper`, jsdom test environment, excludes `e2e/`, `.next/`, `out/` from Jest's test discovery
- `playwright.config.ts` - dev server started on port 4310 for E2E runs, Chromium-only project

## Platform Requirements

**Development:**
- Node.js 22+, Corepack enabled, pnpm 11.11.0
- Dev server runs at `http://127.0.0.1:3000` by default (`pnpm dev` uses `next dev --hostname 127.0.0.1`)

**Production:**
- Fully static export (`next build` with `output: "export"`) producing static HTML/CSS/JS with no Node.js server required at runtime
- No production backend, database, or server-side API dependency (per `docs/DECISIONS.md` and `AGENTS.md`)
- No hosting platform or deployment configuration (e.g. Vercel/Netlify config files) present in the repo; deployment target is undetermined by the codebase itself

---

*Stack analysis: 2026-07-11*
