# Decisions

## Purpose

This document records important product and architecture decisions.

It should capture why a decision was made, what alternatives were considered, and what consequences the project accepts as a result.

## Decision Format

Each decision should use this format:

```md
## YYYY-MM-DD: Decision title

### Context

What situation, constraint, or problem led to the decision?

### Decision

What was decided?

### Alternatives Considered

What other options were considered?

### Consequences

What tradeoffs, limitations, or follow-up work result from this decision?
```

## 2026-07-10: Use Static-First Architecture

### Context

The first version needs to be trustworthy, maintainable, and simple to deploy. The product does not require user accounts, dynamic personalization, server-side search, or live integrations.

### Decision

V1 will use a fully static architecture. School data, guides, filters, comparisons, and school pages should be generated from static content and structured data.

### Alternatives Considered

- Production database.
- Server-side APIs.
- External search or map APIs.
- Dynamic application backend.

### Consequences

The site remains simpler to host, test, and reason about. Features requiring live data, accounts, route planning, or dynamic personalization are out of scope for V1.

## 2026-07-10: Standardize On pnpm With Corepack

### Context

The project needs consistent install, script, and CI commands before application scaffolding begins.

### Decision

The repository will standardize on `pnpm`, managed through Corepack. Documentation, examples, scripts, CI configuration, and setup instructions should use `pnpm`.

### Alternatives Considered

- npm.
- Yarn.
- Leaving the package manager unspecified.

### Consequences

Contributors and automation should use one package manager consistently. npm or Yarn commands should not be introduced unless explicitly requested.

## 2026-07-10: Avoid Universal School Rankings

### Context

Families need help comparing schools, but a universal ranking would imply a false objectivity and could misrepresent school quality.

### Decision

The site will not publish universal "best school" rankings or overall school quality scores.

### Alternatives Considered

- Ranking schools by editorial judgment.
- Calculating an overall score.
- Sorting schools by perceived quality.

### Consequences

The product must invest in comparison tools, filters, explanations, and parent-centered guidance instead of simple ranked lists.

## 2026-07-10: Evidence Coverage Measures Research Completeness

### Context

Families need to know how much information has been verified for each school. This should not be confused with school quality.

### Decision

Evidence coverage will be represented as the percentage of important fields with verified information.

### Alternatives Considered

- No evidence completeness metric.
- Letter grades.
- Quality scores.
- Editorial confidence labels only.

### Consequences

The site can show research completeness transparently. It must clearly explain that evidence coverage is not a judgment about whether a school is good.

## 2026-07-10: Do Not Display Parent-Review Signals In V1

### Context

Parent reviews, forums, ratings, and social media can contain useful signals but are subjective, difficult to verify, and prone to bias.

### Decision

The data model may reserve space for anecdotal parent signals, but V1 will not display them.

### Alternatives Considered

- Displaying Google ratings.
- Summarizing parent reviews.
- Including forum/social media excerpts.
- Treating reviews as weak evidence.

### Consequences

V1 focuses on authoritative and verifiable information. Future versions may revisit anecdotal signals with stronger disclaimers and methodology.

## 2026-07-10: Prioritize Research Depth Over Broad Detailed Coverage

### Context

The site aims to become trustworthy before becoming comprehensive. Detailed research for every Berlin school would reduce quality and slow validation.

### Decision

V1 will include a broad basic directory, but detailed profiles will be limited to a carefully researched pilot set of 20-30 schools.

### Alternatives Considered

- Detailed profiles for every Berlin primary school.
- A directory-only V1.
- A small site with no broad directory.

### Consequences

The product can demonstrate a rigorous research model while still giving families broad orientation. More schools can be upgraded from directory entries to detailed profiles over time.

## 2026-07-10: Use Directory-Based Colocation

### Context

The project is expected to grow around durable product domains such as schools, evidence, comparison, guides, methodology, and checklists. Components, utilities, hooks, schemas, tests, fixtures, and constants will often belong to a specific domain unit rather than to broad generic folders.

### Decision

Use a directory-based colocation pattern. Each meaningful component, utility, hook, schema, or domain unit should live in its own directory. The directory name provides the context, so the primary implementation file should be named `index.ts` or `index.tsx`, with colocated supporting files using generic names such as `types.ts`, `utils.ts`, `constants.ts`, `fixtures.ts`, and `hooks.ts`.

Tests should be colocated as `index.test.ts` or `index.test.tsx`.

### Alternatives Considered

- Repeating the unit name in every file, such as `SchoolCard.tsx`, `SchoolCard.test.tsx`, and `SchoolCard.types.ts`.
- Organizing primarily by technical file type, such as global `components/`, `utils/`, `schemas/`, and `tests/` directories.
- Creating generic shared utilities before concrete reuse exists.

### Consequences

Related implementation, tests, fixtures, and local helpers stay close together. File names remain short and predictable. The repository must avoid creating extra files without a real need, and shared code should emerge only after at least two concrete use cases exist.

## 2026-07-10: Use Feature-First Source Architecture

### Context

The application will grow around product domains such as guides, schools, evidence, comparison, methodology, and checklists. A generic `lib/`-first structure would make those domain boundaries less visible as schemas, components, utilities, and tests grow.

### Decision

Use a feature-first `src/` architecture:

- `src/app` owns App Router routing, layouts, metadata, and page composition.
- `src/features` owns product-domain behavior and feature-specific code.
- `src/components/ui` owns shadcn/ui primitives.
- `src/content` owns static MDX and structured content inputs.
- `src/test` owns shared test infrastructure.
- `e2e` owns Playwright tests.

Do not create empty directories for future features.

### Alternatives Considered

- Generic top-level `lib/`, `components/`, and `tests/` folders for most code.
- Creating all planned feature folders during M2.
- Route-only organization under `src/app`.

### Consequences

Domain code stays close to the product capability it supports. Future milestones should add feature folders only when that feature is being implemented. Truly shared code should emerge from repeated use rather than being created speculatively.

## 2026-07-10: Use English Technical Naming

### Context

The site is written for Brazilian families in Brazilian Portuguese, but the codebase, routes, query parameters, and filesystem need consistent technical naming that stays predictable for implementation and collaboration.

### Decision

Technical structure is written in English. User-facing content is written in Brazilian Portuguese.

Use English for URL paths, route segments, directory names, file names, code identifiers, and query parameter names. Use Brazilian Portuguese for visible labels, headings, descriptions, accessibility text, and editorial copy.

Examples:

- `/schools` with visible heading `Escolas`;
- `/guides` with visible heading `Guias`;
- `/compare` with visible heading `Comparar`;
- `/methodology` with visible heading `Metodologia`.

### Alternatives Considered

- Portuguese routes and directory names matching the user-facing language.
- Mixed technical naming based on whether a feature is user-visible.
- English code identifiers with Portuguese URL paths.

### Consequences

The implementation uses one technical naming convention across routes, folders, files, identifiers, and query parameters. Existing Portuguese technical paths should be renamed before related feature work continues.

## 2026-07-10: Version V1 Evidence Coverage Fields

### Context

Evidence coverage needs to measure research completeness consistently without becoming a school quality score. Future changes to the field list must be explicit so coverage percentages remain interpretable.

### Decision

Use evidence coverage version `v1` for the initial important-field list. The V1 list covers core school identity, classification, location, grades served, Ganztag, after-school care, languages, bilingual/international programs, welcome classes, school profile, pedagogy focus, inclusion support, transition after grade 6, family communication, inspection availability/data, and facilities.

### Alternatives Considered

- Calculating coverage from every field on a school record.
- Leaving the important-field list implicit.
- Using a qualitative label instead of a percentage.

### Consequences

Coverage can be computed and tested consistently. Changes to coverage inputs should create a new version or explicit decision entry.

## 2026-07-10: Use Field-Level Evidence Statuses

### Context

The product needs to distinguish verified facts from missing, unverified, outdated, conflicting, and not-applicable information.

### Decision

Every factual field uses one of these statuses: `verified`, `missing`, `unverified`, `outdated`, `conflicting`, or `not_applicable`.

### Alternatives Considered

- A boolean verified/unverified flag.
- Page-level evidence only.
- Free-text research notes without structured status.

### Consequences

The data model can make uncertainty visible and compute evidence coverage. `not_applicable` fields are excluded from both numerator and denominator; all other non-verified statuses do not count as verified.

## 2026-07-10: Use School-Level Sources With Field-Level Citations

### Context

Many fields can cite the same official source, and each field may need multiple citations.

### Decision

Each school record stores sources once in a top-level `sources` array. Field-level citations reference those sources by `sourceId`.

### Alternatives Considered

- Embedding full source objects on every field.
- Keeping only page-level sources.
- Storing citations as unstructured prose.

### Consequences

Sources are not duplicated across fields, and field-level citations can be validated against the school source registry.

## 2026-07-10: Use Synthetic Fixtures For M3

### Context

M3 validates the data model shape and rules. It should not introduce real Berlin school research before the research methodology is applied in later milestones.

### Decision

M3 uses synthetic valid and invalid school fixtures only.

### Alternatives Considered

- Using real Berlin schools immediately.
- Skipping fixtures until import work begins.
- Testing schemas only with inline objects.

### Consequences

Schema behavior can be tested without creating production content or implying researched claims about real schools.

## 2026-07-10: Use tsx For Static Data Validation

### Context

The project needs a simple way to run TypeScript validation scripts against static fixture data.

### Decision

Use `tsx` for the `pnpm validate:data` script.

### Alternatives Considered

- Compiling scripts before running them.
- Writing validation scripts in plain JavaScript.
- Reusing Next.js runtime commands for validation.

### Consequences

Static data validation can run directly from TypeScript source. This adds a small development dependency but keeps validation scripts straightforward.

## 2026-07-26: Introduce Tag Taxonomy V1

### Context

The evidence-based profile model (v1.2) needs a way to describe a school's character beyond factual fields, without slipping into ranking or reputation claims. Families need to know what kind of school it is, not just what it has.

### Decision

Introduce a closed tag taxonomy v1 of exactly 10 tags across 4 categories: academic focus (`stem-focus`, `languages-focus`, `arts-music-focus`), learning model (`bilingual-program`, `special-pedagogical-model`, `all-day-model`), student support (`inclusion-support`, `transition-support`), and school environment (`structured-learning-environment`, `active-school-community`). A tag requires official and/or journalism evidence, except `active-school-community`, which may additionally use independently triangulated community evidence and never as the sole basis for the tag.

### Alternatives Considered

- A flat tag list without categories.
- Including a "High demand" tag for admissions pressure or popularity.
- Allowing community evidence for all tags, not only `active-school-community`.

### Consequences

Tag scope stays closed and auditable for the pilot. This introduces Metodologia v1, the first explicitly tracked methodology version, mirrored publicly in `src/content/guides/methodology.mdx`. Expanding or revising the taxonomy is deferred until pilot validation (see `docs/research/PILOT_SELECTION.md`).

## 2026-07-26: Extend Source Hierarchy With Journalism And Triangulated Community

### Context

The existing source hierarchy in `docs/RESEARCH.md` reserved a single anecdotal tier and did not distinguish independent journalism or triangulated community evidence from unverified anecdote.

### Decision

Add `journalism` as a displayable source type, and add `triangulated_community` as a new, displayable source type distinct from the reserved `anecdotal_reserved` tier. A community source is independent when it could reasonably have arisen from a separate publisher or community origin — echoes, cross-posts, and reposts of the same discussion do not count. Conflicting independent sources fail closed: no tag is published.

### Alternatives Considered

- Leaving all community signals under the reserved `anecdotal_reserved` tier.
- Displaying any single community source without requiring independent corroboration.
- Treating journalism the same as school-published (secondary) sources without a distinct type.

### Consequences

The site can display a narrow, auditable slice of community evidence for one tag (`active-school-community`) while keeping the broader anecdotal tier reserved. Phase 13 implements independence-log validation in the schema.

## 2026-07-26: Qualitative Richness Is Not A Quality Signal

### Context

The 2026-07-10 "Evidence Coverage Measures Research Completeness" decision already established that coverage percentage must not be read as school quality. Tags and narrative introduce a second axis of qualitative content that carries the same risk: a school with many tags could be misread as "better" than one with few or none.

### Decision

Extend the coverage-is-not-quality principle to qualitative content: tag and narrative density measures how much evidence was found and triangulated, never school quality. A sparse profile with one tag, or none, is a complete and honest result, not an incomplete one. Absence of a tag means insufficient evidence, not a negative signal.

### Alternatives Considered

- Leaving qualitative richness ungoverned by an explicit principle.
- Requiring a minimum number of tags per pilot school before publication.
- Treating a sparse profile as a placeholder to be filled in later.

### Consequences

The editorial guide and methodology page must both explain sparse-but-honest profiles as a first-class success. The pilot deliberately includes low-documentation schools to prove this holds under thin evidence.

## 2026-07-26: Introduce Qualitative Review Cadence Distinct From Research Status

### Context

`research_status`, `lastResearched`, and `lastSourceChecked` were designed for slow-moving factual fields. Qualitative content (tags, "Perfil da escola") can go stale on a different timeline — a forum thread ages out, or a new Schulleitung arrives — while those factual timestamps still read as current.

### Decision

Track qualitative review separately via a new field, `qualitativeLastReviewed`, documented in `docs/DATA_MODEL.md` and implemented in Phase 13. Qualitative content is reviewed on a hybrid cadence: an annual periodic baseline (community-backed `active-school-community` tags revalidated at least every ~12 months), plus event-driven triggers (major school website updates, significant press coverage, curriculum or program changes, repeated correction reports, or a methodology version change). A methodology version change requires re-reviewing every pilot school's qualitative content before the new version is declared live.

### Alternatives Considered

- Reusing `research.lastResearched` for qualitative content.
- A periodic-only cadence with no event triggers.
- No explicit cadence, relying on ad hoc review.

### Consequences

Qualitative staleness can be tracked and reviewed independently of factual rechecking. Phase 13 must add `qualitativeLastReviewed` to the school schema; Phase 16 gates on the cadence being followed for the pilot set.
