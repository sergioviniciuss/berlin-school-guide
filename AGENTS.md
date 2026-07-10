# AGENTS.md

## Project

This repository contains a fully static Next.js site for Brazilian families evaluating primary schools in Berlin.

The documents under `docs/` are the source of truth for product, research, architecture, editorial, roadmap, and decision guidance. Do not let this file become the product specification.

## Package Manager

Use pnpm.

Use Corepack to manage the pnpm version.

Do not introduce npm or yarn commands unless explicitly requested.

All documentation, examples, scripts, CI configuration, and setup instructions must use pnpm.

## Working Principles

When working in this repo:

- check the relevant `docs/` files before making product, architecture, content, or data-model changes;
- treat `docs/DECISIONS.md` as the canonical explanation for why architectural decisions exist;
- before major work, identify the relevant roadmap milestone and update the active plan;
- do not silently expand V1 scope;
- prefer evolving the existing architecture over introducing new abstractions;
- avoid generic utilities or reusable components until at least two concrete use cases exist;
- optimize for readability and maintainability rather than cleverness.

## Implementation Rules

Before implementing major features, check the relevant docs:

- product scope: `docs/PRODUCT.md`;
- research rules: `docs/RESEARCH.md`;
- comparison policy: `docs/COMPARISON.md`;
- data structures: `docs/DATA_MODEL.md`;
- navigation and URLs: `docs/INFORMATION_ARCHITECTURE.md`;
- editorial style: `docs/EDITORIAL_GUIDE.md`;
- decision log: `docs/DECISIONS.md`;
- roadmap milestone: `docs/ROADMAP.md`.

Preserve the static-first architecture unless the user explicitly changes the V1 scope.

Do not add a production database, server-side API dependency, user accounts, or authentication for V1 unless explicitly requested.

## Repository Conventions

Use the feature-first `src/` architecture:

- `src/app`: routing, layouts, metadata, and page composition only;
- `src/features`: product-domain behavior and feature-specific code;
- `src/components/ui`: shadcn/ui primitives only;
- `src/content`: static MDX and structured content inputs;
- `src/test`: shared test infrastructure only;
- `e2e`: Playwright tests.

Use directory-based colocation for meaningful components, utilities, hooks, schemas, and domain units.

The directory name provides the context, so avoid repeating it in file names.

Preferred pattern:

```text
SchoolCard/
├── index.tsx
├── index.test.tsx
├── types.ts
├── utils.ts
├── constants.ts
└── fixtures.ts
```

```text
calculateEvidenceCoverage/
├── index.ts
├── index.test.ts
├── types.ts
└── constants.ts
```

Rules:

- one directory per meaningful component, utility, hook, schema, or domain unit;
- use `index.ts` or `index.tsx` as the primary implementation;
- colocate tests as `index.test.ts` or `index.test.tsx`;
- use generic supporting file names such as `types.ts`, `utils.ts`, `constants.ts`, `fixtures.ts`, and `hooks.ts`;
- avoid repeating the directory name in file names;
- create additional files only when there is a real need.

## Testing Expectations

Use tests proportionally to risk.

Important workflows such as search, filtering, comparison, and school page rendering should eventually have automated coverage.

## Static Data

School data should be designed so the site can be generated statically.

Do not depend on external APIs in production for V1 filtering, comparison, or school pages.
