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
