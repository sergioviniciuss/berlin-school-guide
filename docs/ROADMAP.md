# Roadmap

## Purpose

This roadmap defines implementation milestones for V1.

It is not a long feature backlog. Each milestone should have a clear goal, scope, and completion criteria.

## M1: Project Documentation And Repository Instructions

### Goal

Establish the product, research, comparison, data, information architecture, editorial, roadmap, and agent-working rules before implementation begins.

### Scope

- Product definition.
- Research methodology.
- Comparison philosophy.
- Data model direction.
- Information architecture.
- Editorial guide.
- Decision log.
- Repository working instructions.

### Completion Criteria

- Core documentation exists in `docs/`.
- `AGENTS.md` clearly explains how Codex should work in the repo.
- V1 scope and out-of-scope items are explicit.

## M2: Static Next.js Foundation And Design-System Setup

### Goal

Create the static application foundation and baseline tooling using the planned technical stack.

### Scope

- Next.js App Router foundation.
- TypeScript strict mode.
- Tailwind CSS.
- shadcn/ui baseline.
- Jest.
- React Testing Library.
- Playwright.
- Zod.
- MDX.
- Basic layout structure.
- Static export compatibility.
- pnpm with Corepack.

M2 should only configure these tools and prove they work together with minimal smoke tests or validation. Feature-specific tests, schemas, guides, and content belong in later milestones.

### Completion Criteria

- Development server works.
- Production build succeeds.
- Static generation is verified.
- Jest runs a minimal unit test.
- React Testing Library runs a minimal component test.
- Playwright runs a minimal smoke test.
- MDX renders a minimal static page.
- Zod is installed and usable.
- shadcn/ui is initialized.
- pnpm scripts for `dev`, `lint`, `typecheck`, `test`, `test:watch`, `test:coverage`, `e2e`, `format`, `format:check`, and `build` are documented.
- No production database or server-side API dependency is introduced.

## M3: School And Evidence Data Model

### Goal

Define validated structured data for schools, evidence, citations, and research status.

### Scope

- School directory data shape.
- Detailed profile data shape.
- Source and citation model.
- Evidence coverage calculation.
- Zod validation.

### Completion Criteria

- School data can be validated.
- Field-level evidence is supported.
- Evidence coverage can be computed.
- The model supports V1 primary-school needs and can evolve later without breaking existing data.
- Static synthetic school fixtures can be validated with `pnpm validate:data`.

## M4: Static Directory And Filters

### Goal

Build a searchable static `/schools` directory using structured school data.

### Scope

- Directory page.
- Static search.
- District and neighbourhood filters.
- Public/private filter.
- Ganztag, bilingual, welcome classes, language, focus, after-school care, inspection, and evidence coverage filters.

### Completion Criteria

- Users can browse schools from static data.
- Filters work without external APIs.
- Missing or incomplete data is visible.
- Directory behavior is covered by appropriate tests.

## M5: Detailed School Profile

### Goal

Create the detailed school profile experience.

### Scope

- School overview.
- Key facts.
- Verified and missing information.
- Evidence coverage.
- Educational profile.
- Languages and German support.
- Ganztag and after-school care.
- Communication with families.
- Transition after grade 6.
- Facilities and programs.
- Practical notes for Brazilian families.
- Open Day questions.
- Sources and citations.
- Correction/update section.

### Completion Criteria

- A detailed profile can be generated from structured data and editorial content.
- Citations are visible inline and in a consolidated sources section.
- Missing and unconfirmed data are clearly labeled.
- Open Day questions reflect available research.

## M6: Comparison Experience

### Goal

Allow families to compare schools through transparent criteria without ranking them by quality.

### Scope

- Compare selected schools.
- Display relevant criteria side by side.
- Show missing data and evidence coverage.
- Explain comparison limitations.

### Completion Criteria

- Users can compare multiple schools.
- No universal ranking or quality score is introduced.
- Evidence and missing data remain visible.
- Comparison workflow has critical test coverage.

## M7: Educational Guides And Checklists

### Goal

Publish practical Brazilian Portuguese guidance for understanding the Berlin primary school system.

### Scope

- Primary education system guide.
- Enrollment guide.
- Einzugsgebiet guide.
- Ganztag guide.
- Public vs private school guide.
- School inspection guide.
- Enrollment and school visit checklists.

### Completion Criteria

- Core guide pages exist.
- German terms are explained in Portuguese.
- Practical checklists support parent decision-making.
- Factual claims are cited where appropriate.

## M8: Berlin School Directory Import

### Goal

Create the broad static directory of Berlin primary schools using official or easily verifiable data.

### Scope

- Public primary schools.
- Private primary schools where reliable basic data is available.
- Basic metadata import.
- Source attribution for imported fields.

### Completion Criteria

- Broad directory data exists.
- Imported records pass validation.
- Basic source information is preserved.
- Incomplete records are handled explicitly.

## M9: Researched Pilot Profiles

### Goal

Publish 20-30 detailed school profiles with strong research depth.

### Scope

- Prioritize schools relevant to international and Brazilian families.
- Maintain geographic diversity across Berlin.
- Include selected public schools first.
- Include selected private, bilingual, or international schools when especially relevant.
- Apply the research methodology consistently.

### Completion Criteria

- 20-30 detailed profiles meet publication standards.
- Each factual attribute has evidence or is marked missing/unconfirmed.
- Each profile has Open Day questions.
- Last researched and last source checked dates are present.

## M10: Accessibility, Validation, And Release Readiness

### Goal

Prepare V1 for release with accessibility, validation, quality checks, and critical workflow coverage.

### Scope

- Accessibility review.
- Static build validation.
- Data validation.
- Content review.
- Critical Playwright workflows.
- Jest/React Testing Library coverage for important components.
- Release checklist.

### Completion Criteria

- Static build passes.
- Structured data validates.
- Critical workflows pass.
- Accessibility issues are reviewed and addressed where practical.
- V1 release scope is complete.
