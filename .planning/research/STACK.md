# Stack Research

**Domain:** Evidence-backed content modeling (structured tags + editorial narrative + mixed-source citations) on a static Next.js site
**Researched:** 2026-07-26
**Confidence:** HIGH

## Headline Finding

This milestone needs **little to no new production npm dependency**. The existing Zod-based field-evidence layer (`createFieldValueSchema`, `fieldEvidenceSchema`, `sourceSchema`, `sourceTypeSchema`) already models exactly the shape v1.2 needs — a value, a status, citations, and reliability. Tags, editorial narrative, and mixed-source citations are extensions of that model, not new categories of software. The main "stack" work is:

1. widening two existing Zod enums (`sourceTypeSchema`, and a new tag catalog) plus one new evidence rule (community sources require triangulation before use), and
2. one small, dependency-free UI pattern for citation disclosure in prose (native `<details>`/`<summary>`), reusing the label-map convention already used by `formatSourceType`/`getCoverageTierLabel`.

Introducing a CMS, a markdown-remote pipeline, a tagging library, or a UI framework for this would violate `AGENTS.md` ("prefer evolving the existing architecture... avoid generic utilities until at least two concrete use cases exist") and is not justified by a 3–5 school pilot.

## Recommended Stack

### Core Technologies (extend, don't replace)

| Technology | Version (installed) | Purpose for v1.2 | Why Recommended |
|------------|---------|---------|-----------------|
| `zod` | 4.4.3 (already pinned — current stable, no 4.5.x stable release yet) | Extend `sourceTypeSchema`/`reliabilityLevelSchema` with `journalism` + community-triangulation rules; add a `tag` catalog schema and per-tag `FieldValue` wrapper | Every fact-shaped thing in this codebase (fields, sources, research metadata) is already a Zod schema with a `superRefine` gate. Tags and narrative are the same shape — reuse it instead of inventing a second validation system |
| `@next/mdx` + `@mdx-js/react` | 16.2.10 / 3.1.1 (already pinned) | Editorial & research framework deliverable as a new `/methodology`-style MDX guide (voice, tag taxonomy, source hierarchy, citation rules) | `docs/EDITORIAL_GUIDE.md` and `docs/RESEARCH.md` are internal docs; the milestone also wants a *public-facing* explanation. `src/content/guides/methodology.mdx` already proves the MDX-guide pattern renders well under static export — reuse it rather than adding a docs/CMS tool |
| `class-variance-authority` | 0.7.1 (already pinned) | Backing library for one new shared `Badge` UI primitive (tag chips, confidence pills, source-type pills) | `StatusBadge` is the only badge-like component today; tags will add "tag chip" and "source type / triangulated-community" pills — three concrete variants now justifies promoting a shared `src/components/ui/Badge` (shadcn "Badge" pattern) instead of three near-duplicate feature components. No new package: `cva` is already a dependency |
| Native `<details>`/`<summary>` (HTML, not a library) | n/a | Inline citation disclosure inside editorial narrative prose ("[fonte]" marker → expands source card without navigation) | Solves the exact UX problem in the research brief ("citations without overwhelming parents") with zero JavaScript, zero bundle cost, and full static-export compatibility. Matches the existing preference for boring, durable primitives over client-side widgets |

### Supporting Libraries (optional — only if scope grows beyond the pilot)

| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| `@radix-ui/react-popover` | 1.1.23 | Richer citation card (source type pill, reliability, quote, "abrir original" link) triggered by click, positioned as a floating panel instead of inline disclosure | Only if user testing shows `<details>` inline expansion is visually disruptive in dense narrative paragraphs. Same primitive family as the already-installed `@radix-ui/react-dialog` (`Sheet`) and `@radix-ui/react-collapsible`, so it fits the existing shadcn-style `src/components/ui` pattern with no new architectural concept |
| `remark-gfm` | 4.0.1 | Enables Markdown footnote syntax (`[^1]`) inside `.mdx` guide content | Only relevant if the *editorial framework deliverable* (the methodology-style guide) wants footnote-style citations in long-form MDX prose. Not needed for per-school data, which stays in typed TS/Zod fixtures, not MDX |
| `@radix-ui/react-tooltip` | 1.2.16 | Hover-only preview of a source on desktop | Not recommended as primary: tooltips are hover-only and unusable on mobile/touch, where most parent-facing traffic likely lands. Prefer Popover (click, works on touch) or native `<details>` over Tooltip for anything citation-related |

### Development Tools

No new dev tools are needed. Continue using:

| Tool | Purpose | Notes |
|------|---------|-------|
| `tsx` via `pnpm validate:data` | Extend the existing validation script's `superRefine` checks to cover tag citation rules and community-triangulation rules | Same script, same pattern as the current "Verified fields must cite an acceptable source" check in `src/features/schools/school/index.ts` |
| Jest + RTL | Unit test new label-map functions (`formatTag`, `formatSourceType` extension) and new `superRefine` rules | Mirrors existing `formatSourceType/index.test.ts`, `validateFieldCitations/index.test.ts` |
| Playwright | Add/extend a profile smoke test asserting tag chips + narrative + "Fontes" section render together on a pilot school page | Extends existing profile e2e coverage, no new tooling |

## Installation

```bash
# No required installs for the core work — it is a schema/component extension,
# not a new dependency surface.

# Optional, only if a floating citation card is chosen over native <details>:
pnpm add @radix-ui/react-popover@1.1.23

# Optional, only if the editorial-framework MDX guide wants footnote syntax:
pnpm add remark-gfm@4.0.1
```

If `remark-gfm` is added, wire it into the existing MDX pipeline in `next.config.mjs`:

```js
import createMDX from "@next/mdx";
import remarkGfm from "remark-gfm";

const withMDX = createMDX({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [remarkGfm],
  },
});
```

## Alternatives Considered

| Recommended | Alternative | When to Use Alternative |
|-------------|-------------|-------------------------|
| Extend existing `sourceTypeSchema`/`fieldEvidenceSchema` for tags | A separate "tag evidence" schema/type system | Only if tags ever need evidence shapes that fields fundamentally can't express (unlikely — a tag is just a categorical field) |
| Per-tag `FieldValue<TagId>` entries (each tag cites its own sources) | A single `FieldValue<TagId[]>` (one evidence block for the whole tag list) | Use the single-array form only if every tag on a school will always share identical sourcing — not expected once journalism/community sources are mixed in |
| Native `<details>`/`<summary>` for inline citation disclosure | `@radix-ui/react-popover` floating citation card | Once profiles have enough narrative density (post-pilot) that inline expansion visibly breaks prose flow, or design wants a richer card (favicon, reliability badge, quote) |
| TS/Zod object fixtures for per-school editorial narrative (current pattern) | MDX file per school (`schools/[slug].mdx`) via `next-mdx-remote` or `contentlayer`/`velite` | Only if editorial narrative grows into long, richly formatted multi-section essays per school — not the case for a "short PT-BR narrative" pilot on 3–5 schools |
| `formatSourceType`-style `Record<Enum, string>` label maps for tags | A generic i18n/label library (e.g. `react-intl`) | Only if the site adds a second UI language; PT-BR-only labels don't justify an i18n framework |

## What NOT to Use

| Avoid | Why | Use Instead |
|-------|-----|-------------|
| Any headless CMS (Contentful, Sanity, etc.) or content framework (`contentlayer`, `velite`, `next-mdx-remote`) | Adds a build/runtime dependency and a second content-authoring mental model for a 3–5 school pilot; conflicts with `docs/DECISIONS.md` static-first stance and "no production DB/API" constraint | Continue typed TS/Zod fixtures (`src/content/schools/real/...`) validated by `pnpm validate:data` |
| A tagging/taxonomy library (e.g. generic "tag input" npm packages) | Tags here are a **controlled, evidence-backed vocabulary**, not free-text user tags — a generic tagging UI library solves the wrong problem (open-ended tag entry) and adds unneeded client JS | A closed `z.enum` catalog (mirrors `schoolClassificationSchema`) with a `formatTag` label map and `TAG_CATALOG` metadata object for descriptions |
| Review-aggregation or scraping libraries/APIs (Google Places, Yelp Fusion, review-scraping SDKs) | `docs/DATA_MODEL.md` and `docs/DECISIONS.md` explicitly reserve anecdotal signals and forbid third-party review scraping in V1; "triangulated community" evidence must come from editorially reviewed sources, not automated aggregation | Manually researched community sources added to the existing `sources` array with a new `journalism`/triangulated classification, reviewed like any other citation |
| A ranking/scoring engine or recommendation library | Direct violation of `docs/COMPARISON.md` and the "what kind of school, not is it good" product decision | Keep tags descriptive/categorical (e.g. `bilingual_immersion`, `montessori_inspired`), never scored or weighted |
| A generic rich-text editor or Markdown-it/remark pipeline for per-school narrative | Narrative is short, structured, and needs the same evidence wrapper as every other field — introducing a rich-text pipeline for a few PT-BR sentences per school is disproportionate | Plain `FieldValue<string>` or `FieldValue<string[]>` (paragraph array), same as existing `schoolProfile`/`facilities` fields |
| Content-tone linters (`alex`, `write-good`, `retext-*`) | Editorial voice is already specified in `docs/EDITORIAL_GUIDE.md` and enforced by human review on a 3–5 school pilot; automated tone linting is premature tooling for this volume | Manual editorial review against `docs/EDITORIAL_GUIDE.md`, same as today |
| `@radix-ui/react-tooltip` as the primary citation-reveal mechanism | Hover-only interaction is inaccessible on touch devices, which is most of the target audience's browsing context | `<details>`/`<summary>` (no JS) or `@radix-ui/react-popover` (click-triggered, touch-friendly) |

## Stack Patterns by Variant

**If tags need independent citations per tag (recommended, matches "mixed-source citations"):**
- Model each tag as its own `FieldValue<TagId>`-shaped entry: `{ value: TagId, evidence: FieldEvidence }`, collected in an array on the school record.
- Because `createFieldValueSchema` already wraps `value + evidence`, apply it per tag entry rather than inventing a parallel structure.
- Because different tags can be sourced from official docs, journalism, or triangulated community input, evidence-per-tag (not evidence-per-list) is required.

**If the editorial narrative stays short (a few PT-BR sentences/paragraphs, matches the "pilot" framing):**
- Reuse `createFieldValueSchema(z.array(z.string().min(1)))` (paragraph array), same as `facilities`/`pedagogyFocus`.
- Render each paragraph as a `<p>`; attach citation disclosure at the paragraph or sentence level with `<details>`, not per-word.
- Do not reach for MDX-per-school; MDX is reserved for guide-length content (`src/content/guides/*.mdx`).

**If community sources are used ("triangulated community" per `docs/DECISIONS.md`):**
- Add a `superRefine` rule: a field/tag may only cite a community-classified source (new `sourceTypeSchema` value, e.g. `community_reported`) when **at least two independent sources** of that type corroborate the same claim, and the field/tag evidence must render a visible "não oficial, relato triangulado da comunidade" label.
- Do not reuse `anecdotal_reserved` for this — that value is explicitly reserved-and-hidden per `docs/DECISIONS.md` (2026-07-10, "Do Not Display Parent-Review Signals In V1"). Triangulated community evidence is a *new, deliberately displayed* category with stricter rules, not a re-enable of the reserved one.

**If official journalism coverage exists for a school (new source type):**
- Add `journalism` to `sourceTypeSchema` with `reliability: "secondary"` (same tier as `school_website` — independent but not governmental), and extend `formatSourceType`'s label map (`"Reportagem"` or similar) and `acceptableReliabilityLevels` usage stays unchanged since `secondary` is already acceptable.

**If citation density in narrative prose becomes visually heavy (post-pilot signal, not expected now):**
- Move from native `<details>` per-citation to a single `@radix-ui/react-popover`-based "footnote" component that all citation markers share, batching multiple citations behind one marker per sentence instead of one marker per citation.

## Version Compatibility

| Package A | Compatible With | Notes |
|-----------|-----------------|-------|
| `zod@4.4.3` | `next@16.2.10`, existing `superRefine` usage in `src/features/schools/school/index.ts` | No version change needed; v4 `z.enum`/`superRefine` API used throughout is unaffected by this milestone's additions |
| `@radix-ui/react-popover@1.1.23` (if added) | `@radix-ui/react-dialog@^1.1.19`, `@radix-ui/react-collapsible@^1.1.16` (already installed) | Same Radix release generation; installing alongside existing Radix packages carries no known peer-dependency conflicts |
| `remark-gfm@4.0.1` (if added) | `@next/mdx@16.2.10` / `@mdx-js/react@3.1.1` | `@next/mdx`'s `remarkPlugins` option accepts standard unified/remark plugins; `remark-gfm@4` targets the mdast/unified v11 pipeline that `@mdx-js` v3 uses — no shim required |
| `class-variance-authority@0.7.1` | New `Badge` primitive alongside existing `Button` (`src/components/ui/Button`) | Already used for `Button`'s variant system; adding `Badge` follows the identical `cva` + `tailwind-merge` pattern, no version bump needed |

## Sources

- Codebase inspection — `src/features/evidence/{fieldEvidence,source,sourceTypes}`, `src/features/schools/school/index.ts`, `src/features/schools/{SourcesSection,ProfileFieldRow,StatusBadge,ProfileSection,SchoolProfile}` — confirmed the existing field-evidence/citation model and label-map conventions (HIGH confidence, direct read of current implementation).
- `docs/DATA_MODEL.md`, `docs/RESEARCH.md`, `docs/DECISIONS.md`, `docs/EDITORIAL_GUIDE.md`, `.planning/PROJECT.md` — confirmed source hierarchy, reserved anecdotal-signal decision, anti-ranking policy, and v1.2 scope boundaries (HIGH confidence, canonical project docs).
- `npm view` registry checks (2026-07-26) — `@radix-ui/react-popover@1.1.23`, `@radix-ui/react-tooltip@1.2.16`, `@radix-ui/react-hover-card@1.1.23`, `@radix-ui/react-accordion@1.2.20`, `remark-gfm@4.0.1`, `rehype-slug@6.0.0`, `zod@4.4.3` (latest stable; 4.5.0 only exists as canary pre-releases) — version numbers verified live against the npm registry (HIGH confidence).
- `package.json`, `components.json`, `next.config.mjs` — confirmed already-installed Radix/cva/MDX versions and shadcn "new-york" style convention that any new UI primitive should follow (HIGH confidence).

---
*Stack research for: evidence-backed school profile tags, editorial narrative, and mixed-source citations (v1.2 milestone)*
*Researched: 2026-07-26*
