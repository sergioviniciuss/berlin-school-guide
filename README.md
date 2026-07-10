# Berlin School Guide

A fully static Next.js site for Brazilian families evaluating primary schools in Berlin.

The project is written in Brazilian Portuguese for readers, while routes, directories, file names, code identifiers, and query parameters use English.

## Status

This repository is in active early development. The current application contains the static foundation, validated synthetic school/evidence fixtures, and a static school directory prototype. It does not yet contain real Berlin-wide school research or detailed school profiles.

See [docs/ROADMAP.md](docs/ROADMAP.md) for the milestone plan.

## Product Scope

Berlin School Guide is an evidence-first decision-support tool with the tone of a practical relocation guide. It helps families understand the Berlin primary education system and compare schools using transparent, evidence-backed criteria.

The project does not publish universal "best school" rankings or overall school quality scores. Evidence coverage means research completeness, not school quality.

Authoritative product and research decisions live in:

- [docs/PRODUCT.md](docs/PRODUCT.md)
- [docs/RESEARCH.md](docs/RESEARCH.md)
- [docs/DATA_MODEL.md](docs/DATA_MODEL.md)
- [docs/COMPARISON.md](docs/COMPARISON.md)
- [docs/INFORMATION_ARCHITECTURE.md](docs/INFORMATION_ARCHITECTURE.md)
- [docs/EDITORIAL_GUIDE.md](docs/EDITORIAL_GUIDE.md)
- [docs/DECISIONS.md](docs/DECISIONS.md)

## Tech Stack

- Next.js App Router with static export
- TypeScript in strict mode
- Tailwind CSS
- shadcn/ui-style primitives
- MDX
- Zod
- Jest and React Testing Library
- Playwright
- pnpm managed with Corepack

## Requirements

- Node.js 22 or newer
- Corepack enabled

## Local Development

Enable Corepack and install dependencies:

```bash
corepack enable
pnpm install
```

Run the development server:

```bash
pnpm dev
```

The app runs at `http://127.0.0.1:3000` by default.

## Useful Commands

```bash
pnpm lint
pnpm typecheck
pnpm test
pnpm test:coverage
pnpm validate:data
pnpm build
pnpm e2e
pnpm format:check
pnpm format
```

The production build uses static export and must not require a production backend.

## Repository Layout

```text
src/
├── app/          # App Router routes, layouts, metadata, page composition
├── components/   # shadcn/ui primitives only
├── content/      # static MDX and structured content inputs
├── features/     # product-domain behavior
└── test/         # shared test infrastructure

e2e/              # Playwright tests
docs/             # product, research, architecture, and roadmap decisions
```

Follow the directory-based colocation convention described in [AGENTS.md](AGENTS.md).

## Data

Current school data is synthetic and exists only to validate schemas, filtering, and static rendering. Do not add real school data without following the research methodology in [docs/RESEARCH.md](docs/RESEARCH.md).

Validate static data with:

```bash
pnpm validate:data
```

## Contributing

Read [CONTRIBUTING.md](CONTRIBUTING.md) before opening changes. Product, research, content, and data-model changes should reference the relevant documents under `docs/`.

## License

This project is licensed under the MIT License. See [LICENSE](LICENSE).
