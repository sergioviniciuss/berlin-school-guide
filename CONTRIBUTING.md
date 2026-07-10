# Contributing

Thanks for considering a contribution to Berlin School Guide.

This project is intended to become a trustworthy, evidence-backed resource for Brazilian families evaluating primary schools in Berlin. Accuracy, clarity, and scope control matter more than speed.

## Before You Start

Read the relevant project documents before proposing product, research, content, data-model, or architecture changes:

- Product scope: [docs/PRODUCT.md](docs/PRODUCT.md)
- Research methodology: [docs/RESEARCH.md](docs/RESEARCH.md)
- Data model: [docs/DATA_MODEL.md](docs/DATA_MODEL.md)
- Comparison policy: [docs/COMPARISON.md](docs/COMPARISON.md)
- Information architecture: [docs/INFORMATION_ARCHITECTURE.md](docs/INFORMATION_ARCHITECTURE.md)
- Editorial guidance: [docs/EDITORIAL_GUIDE.md](docs/EDITORIAL_GUIDE.md)
- Decision log: [docs/DECISIONS.md](docs/DECISIONS.md)
- Roadmap: [docs/ROADMAP.md](docs/ROADMAP.md)

Use [AGENTS.md](AGENTS.md) for repository workflow and implementation conventions.

## Development Setup

Use pnpm through Corepack:

```bash
corepack enable
pnpm install
```

Run the app locally:

```bash
pnpm dev
```

## Checks

Run the relevant checks before opening a pull request:

```bash
pnpm lint
pnpm typecheck
pnpm test
pnpm validate:data
pnpm build
pnpm format:check
```

Use Playwright for critical browser workflows:

```bash
pnpm e2e
```

## Scope Rules

- Do not silently expand V1 scope.
- Do not add a production database, server-side API dependency, authentication, user accounts, maps, address search, or external API requirement unless the product scope is explicitly changed.
- Do not add universal school rankings or overall school quality scores.
- Treat evidence coverage as research completeness, never school quality.
- Do not add real school research without citations and field-level evidence.

## Data Contributions

For school data:

- cite every factual attribute;
- preserve source dates where available;
- mark missing, unverified, outdated, conflicting, and not-applicable information explicitly;
- distinguish official information from school-published claims;
- do not use anecdotal parent-review signals in V1 display data.

Synthetic fixtures should be clearly synthetic and must not look like real school research.

## Pull Requests

Pull requests should:

- explain what changed and why;
- reference the relevant milestone or decision where applicable;
- include tests for behavior changes;
- keep documentation and implementation in sync;
- avoid unrelated refactors.

Use the pull request template when opening a PR.
