# Phase 15: Profile UI (Tags & Narrative) - Research

**Researched:** 2026-07-29
**Domain:** Next.js static school profile UI — editorial narrative, taxonomy tags, Fontes merge, correction path
**Confidence:** HIGH

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions
#### Page placement & naming
- **D-01:** Place editorial content **immediately after the page header**, before Identificação — families first understand “what kind of school this is,” then read factual sections.
- **D-02:** Editorial block order: **“Perfil da escola”** narrative first, then tags section beneath it (same post-header zone).
- **D-03:** Reserve the heading **“Perfil da escola”** exclusively for the editorial narrative (`perfilDaEscola`).
- **D-04:** Rename the factual `schoolProfile` field label from “Perfil da escola” to **“Perfil oficial”** (preferred exact string; similar wording only if localization conflict arises).
- **D-05:** Clear hierarchy: verified source data (factual sections) vs guide’s evidence-backed synthesis (editorial narrative + tags).

#### Tag presentation & evidence expand
- **D-06:** Render tags in a dedicated section titled **“Características da escola”**, below the editorial narrative.
- **D-07:** Group tags by taxonomy **category**; **omit empty categories**.
- **D-08:** If a school has **no tags**, omit the Características section entirely (narrative-only pilots remain valid).
- **D-09:** Default collapsed state per tag: **tag label + confidence badge only** (highly scannable).
- **D-10:** Independent per-tag control **“Ver evidência” / “Ocultar”** reveals source types and citations for that tag only (NARR-04 — independently supported/removable).
- **D-11:** Do not put tags inline inside the narrative paragraph.

#### Official vs community distinction
- **D-12:** Show official vs community distinctions **only inside expanded evidence**, via existing `formatSourceType` labels on citations.
- **D-13:** Use the **same visual treatment** as other source-type chips/labels (e.g. Fontes / SourcesSection language) — community is another evidence source that already met a higher editorial bar before publication; no warning/stigma styling.
- **D-14:** No persistent collapsed-state “Comunidade” badge on tags unless revisited later.
- **D-15:** Keep the editorial narrative **free** of official/community indicators; provenance stays on tags + merged Fontes.

#### Fontes merge & correction path
- **D-16:** Extend citation collection so **field, tag, and qualitative** references merge into a **single** Fontes section, **deduplicated by source id** (extend `collectCitedSources` or equivalent).
- **D-17:** When feasible, each source card briefly indicates which **fields, tags, and/or the editorial narrative** reference it — improve transparency without complex bidirectional navigation systems.
- **D-18:** Add a lightweight **`/report-correction/`** page linked from **every** school profile.
- **D-19:** Correction copy and flow **explicitly cover** factual fields, tags, and **Perfil da escola**.
- **D-20:** Keep the page **minimal for v1.2**: explanation + how to report; **school prefilled** when arriving from a profile link (query/slug). No production backend/auth required — static page + mailto or equivalent is in scope; full interactive server-backed forms are out of scope.

#### Carried forward (do not reopen)
- Confidence PT-BR labels and “evidence strength ≠ school quality” (Phase 13 / methodology).
- Tags profile-only this milestone; directory/compare tag surfaces deferred (Phase 12 / FUT-02).
- Plain-text `perfilDaEscola`; sparse/zero tags OK (Phase 14).
- `qualitativeResearchNotes` is research/withhold metadata — **not** a public profile section (do not render).
- Non-pilot schools: no forced empty qualitative chrome; optional fields simply absent (NARR-04 / VAL-01 spirit).

### Claude's Discretion
- Exact spacing/typography of the post-header editorial zone and whether narrative + Características share one wrapper vs two sibling sections.
- Microcopy polish for “Ver evidência” / “Ocultar” and empty-pilot edge cases beyond D-08.
- Component directory names (`TagsSection`, editorial narrative component naming) as long as ROADMAP names remain recognizable for Phase 16 tests.
- Exact Fontes “cited by” label formatting (D-17) within “brief indication, no complex backlinking.”
- Whether `/report-correction/` uses mailto, a static form posting elsewhere, or both — must stay static-export friendly and school-prefilled (D-20).
- How `qualitativeLastReviewed` appears (if at all) near editorial content — optional small metadata; not a success criterion.

### Deferred Ideas (OUT OF SCOPE)
- Tags on directory cards / compare — FUT-02 / later milestone
- Stronger community visual contrast or collapsed “Comunidade” badge — rejected for Phase 15
- Full server-backed correction form with persistence — out of v1.2 static scope
- Tag-aware Open Day questions — FUT-04
- Rendering `qualitativeResearchNotes` publicly — rejected
</user_constraints>

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|------------------|
| NARR-01 | Pilot school profiles render structured tags (grouped, cited, with evidence-strength labels) | `TagsSection` + category map in `tagTaxonomy`; `formatTagId` / `formatTagConfidence`; expand shows `formatSourceType` + `#source-{id}` links |
| NARR-03 | UI clearly distinguishes official information from community observations | Locked to expanded evidence only via `formatSourceType` chips (same blue chip language as Fontes); no collapsed community badge |
| NARR-04 | Every qualitative element independently supported and removable without breaking the profile | Conditional render per `perfilDaEscola` / each tag; no shared required chrome; omit empty Características |
| NARR-05 | Fontes includes citations from tags and narrative as well as existing fields | Extend `collectCitedSources` to walk tag citations + field citations, dedupe by source id; narrative has no citation array — see Open Questions / recommendation |
| NARR-06 | Correction / report-an-issue path explicitly covers tags and narrative | New `/report-correction/?school={slug}` route + profile CTA with locked PT-BR copy naming tags + Perfil da escola |
</phase_requirements>

## Summary

Phase 15 is a **composition + presentation** phase on top of completed Phase 13–14 data. Pilot schools already carry optional `perfilDaEscola`, `tags[]`, and `qualitativeLastReviewed`. The profile shell (`SchoolProfile`) currently renders header → factual `PROFILE_SECTIONS` → `SourcesSection` fed only by **field** citations. This phase inserts an editorial zone after the header, renames the factual `schoolProfile` label to **“Perfil oficial”**, extends Fontes collection for tags, and adds a static-export-safe correction page.

The approved `15-UI-SPEC.md` locks copy, spacing, color, a11y, and component inventory. No new shadcn blocks are required. Expand/collapse should mirror `ComparisonEvidenceNote` (client `useState` + `aria-expanded`), not couple to compare. Category grouping metadata does **not** exist in code yet — only English category names live in `docs/DECISIONS.md`; planners must add PT-BR category helpers under `tagTaxonomy`.

**Primary recommendation:** Keep `SchoolProfile` as a Server Component; add `EditorialNarrative` (server) + client `TagsSection`; extend `collectCitedSources` for field+tag merge with cite-back labels; ship `/report-correction/` using the existing Compare-page `Suspense` + `useSearchParams` pattern; follow UI-SPEC copy/visuals verbatim.

## Architectural Responsibility Map

| Capability | Primary Tier | Secondary Tier | Rationale |
|------------|-------------|----------------|-----------|
| Editorial narrative render | CDN / Static (SSG) | — | Plain string from static school data; no client state |
| Tags list + confidence badges | CDN / Static (SSG) | Browser / Client | Markup is static; expand/collapse needs client state |
| Official vs community distinction | CDN / Static | Browser (expand) | Labels from `formatSourceType`; shown only when expanded |
| Fontes merge + cite-back | CDN / Static | — | Pure data transform at render time from school record |
| Correction CTA on profile | CDN / Static | — | Static `Link` with query string |
| Report-correction prefill | Browser / Client | CDN / Static shell | Query string read via `useSearchParams` under Suspense (static export) |
| Mailto submit | Browser / Client | — | `mailto:` href; no backend |
| Non-pilot absence of qualitative chrome | CDN / Static | — | Optional fields omitted; no empty shells |

## Project Constraints (from .cursor/rules/)

`.cursor/rules/` is **absent**. Apply `AGENTS.md` + product docs as binding constraints:

- Use **pnpm** / Corepack; no npm/yarn in docs or scripts.
- Static-first Next.js; **no** production DB, server API, auth for V1.
- Feature-first `src/`: routes thin in `src/app`; domain in `src/features`; shadcn only in `src/components/ui`.
- Directory-colocation (`ComponentName/index.tsx` + colocated tests).
- English code/paths; **Brazilian Portuguese** UI copy.
- Avoid premature abstractions until two concrete use cases exist.
- Do not silently expand V1 / FUT-02 scope (no directory/compare tags).

## Standard Stack

### Core

| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| Next.js | 16.2.10 (`output: "export"`) | Static school pages + new report route | Already project standard `[VERIFIED: package.json]` |
| React / React DOM | 19.2.7 | Server + client components | Already project standard `[VERIFIED: package.json]` |
| Zod | 4.4.3 | School/tag schemas (consume only) | Phase 13–14; no schema redesign this phase `[VERIFIED: package.json]` |
| Tailwind CSS | 4.3.2 | UI-SPEC spacing/color/typography | Matches existing profile chrome `[VERIFIED: package.json]` |
| lucide-react | 1.24.0 | `ExternalLink` on citation links | Already used on profile / Fontes `[VERIFIED: package.json]` |

### Supporting

| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| Jest | 30.4.2 | Unit/RTL tests | Wave 0 + per-task `[VERIFIED: package.json]` |
| @testing-library/react | 16.3.2 | Component tests | TagsSection / narrative / Fontes / report page `[VERIFIED: package.json]` |
| @testing-library/user-event | 14.6.1 | Expand toggle interactions | Tag evidence button `[VERIFIED: package.json]` |
| @radix-ui/react-collapsible | ^1.1.16 | Available | **Do not require** for tags — UI-SPEC points at `ComparisonEvidenceNote` pattern `[VERIFIED: package.json]` |
| Playwright | 1.61.1 | E2E | Prefer Phase 16 for pilot page e2e; optional thin smoke only if planner wants `[VERIFIED: package.json]` |

### Alternatives Considered

| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| `useState` expand (ComparisonEvidenceNote) | Radix Collapsible | Collapsible already in repo for guides; UI-SPEC + CONTEXT prefer compare note pattern and no new registry blocks — stick to `useState` |
| Client `useSearchParams` for report page | Page `searchParams` prop only | With `output: "export"`, client query reading under Suspense matches Compare and official Next.js prerender guidance `[CITED: nextjs.org/docs/.../use-search-params]` |
| mailto | Server form / third-party form | Locked out by D-20 / deferred ideas |

**Installation:** No new packages required for the recommended approach.

**Version verification:** Versions taken from workspace `package.json` on 2026-07-29 (`pnpm list` blocked by local store SQLite error in sandbox; pins are authoritative in-repo). `[VERIFIED: package.json]`

## Architecture Patterns

### System Architecture Diagram

```text
Static school JSON (lichtenbergPrimarySchools)
        │
        ▼
schoolSchema / getSchoolBySlug
        │
        ▼
/schools/[slug]/page.tsx  ──►  SchoolProfile (Server)
        │                         │
        │                         ├─ header (unchanged)
        │                         │
        │                         ├─ Editorial zone (conditional)
        │                         │     ├─ EditorialNarrative  ← perfilDaEscola?
        │                         │     └─ TagsSection (client) ← tags?.length?
        │                         │            └─ expand → formatSourceType + #source-{id}
        │                         │
        │                         ├─ PROFILE_SECTIONS (schoolProfile label → "Perfil oficial")
        │                         │
        │                         ├─ collectCitedSources(school)
        │                         │     field citations ∪ tag citations
        │                         │     dedupe by sourceId
        │                         │     citedBy: field labels + tag labels
        │                         │
        │                         ├─ SourcesSection (+ "Citado em:" line)
        │                         │
        │                         └─ Link → /report-correction/?school={slug}
        │
        ▼
/report-correction/page.tsx (static shell + Suspense)
        └─ ReportCorrection (client): read ?school= → getSchoolBySlug → mailto
```

### Recommended Project Structure

```text
src/features/schools/
├── SchoolProfile/
│   ├── index.tsx              # compose editorial zone + correction link
│   ├── constants.ts           # schoolProfile → "Perfil oficial"
│   └── index.test.tsx         # extend for pilots / non-pilots / rename
├── EditorialNarrative/        # or PerfilDaEscola — ROADMAP-recognizable
│   ├── index.tsx
│   └── index.test.tsx
├── TagsSection/
│   ├── index.tsx              # "use client"; category groups + TagEvidence
│   ├── index.test.tsx
│   └── utils.ts               # optional: groupTagsByCategory
├── TagEvidence/               # optional split of expanded panel
│   └── index.tsx
├── collectCitedSources/
│   ├── index.ts               # merge tags; cite-back metadata
│   ├── types.ts               # CitedSourceEntry.citedBy?
│   └── index.test.ts
├── SourcesSection/
│   └── index.tsx              # render "Citado em:"
├── tagTaxonomy/
│   └── index.ts               # ADD category id, order, formatTagCategory
└── ReportCorrection/          # page body component
    ├── index.tsx              # "use client"
    ├── constants.ts           # mailto address, query param name, copy
    └── index.test.tsx

src/app/report-correction/
└── page.tsx                   # metadata + Suspense wrapper
```

### Pattern 1: Server profile + client expand island

**What:** Keep `SchoolProfile` without `"use client"`. Pass `school.tags` into a client `TagsSection` that owns expand state per tag.

**When to use:** Always for this phase — matches existing Server Component profile + client compare/directory islands.

**Example:**

```tsx
// Source: codebase SchoolProfile + ComparisonEvidenceNote pattern
// SchoolProfile/index.tsx (Server)
{school.perfilDaEscola ? (
  <EditorialNarrative text={school.perfilDaEscola} />
) : null}
{school.tags && school.tags.length > 0 ? (
  <TagsSection tags={school.tags} sources={school.sources} />
) : null}
```

### Pattern 2: Per-tag evidence toggle

**What:** Adapt `ComparisonEvidenceNote` — `type="button"`, `aria-expanded`, `aria-controls`, `useId`, collapsed = label + confidence only.

**When to use:** Each tag row independently (NARR-04 / D-10).

**Example:**

```tsx
// Source: src/features/schools/ComparisonEvidenceNote/index.tsx
<button
  type="button"
  aria-expanded={expanded}
  aria-controls={evidenceId}
  onClick={() => setExpanded((v) => !v)}
  className="min-h-11 text-sm text-blue-700 hover:underline"
>
  {expanded ? "Ocultar evidência" : "Ver evidência"}
</button>
```

### Pattern 3: Static report page with query prefill

**What:** Mirror `/compare` — server page wraps client component in `Suspense`; client reads `useSearchParams().get("school")` and resolves via `getSchoolBySlug`.

**When to use:** `/report-correction/` (D-18–D-20).

**Example:**

```tsx
// Source: nextjs.org useSearchParams + src/app/compare/page.tsx
import { Suspense } from "react";
import { ReportCorrection } from "@/features/schools/ReportCorrection";

export default function ReportCorrectionPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-12">
      <Suspense fallback={<p>Carregando…</p>}>
        <ReportCorrection />
      </Suspense>
    </main>
  );
}
```

### Pattern 4: Fontes merge with cite-back

**What:** Extend `collectCitedSources` to also iterate `school.tags ?? []` citations; keep Map-by-`sourceId` dedupe; attach `citedBy: string[]` (PT-BR field labels from `profileFieldLabels`, tag labels from `formatTagId`).

**When to use:** Every profile render.

**Example (conceptual):**

```ts
// Extend existing Map aggregation — do not replace grouping/order
for (const tag of school.tags ?? []) {
  for (const citation of tag.citations) {
    // same sourceById / citationsBySourceId merge as fields
    // citedBy.push(formatTagId(tag.id))
  }
}
```

### Anti-Patterns to Avoid

- **Empty qualitative shells on non-pilots:** Never render empty “Perfil da escola” / “Características” headings when data is absent.
- **Rendering `qualitativeResearchNotes`:** Research/withhold only — not public UI.
- **Collapsed “Comunidade” badge or amber/red confidence:** Violates D-12–D-14 and UI-SPEC (confidence ≠ quality warning).
- **Putting tags inside the narrative paragraph:** Violates D-11.
- **Leaving factual label as “Perfil da escola”:** Conflicts with D-03/D-04 — two different concepts sharing one string.
- **Schema change for narrative→sourceId maps:** Phase 14 D-10 explicitly deferred sentence→sourceId; do not reopen.
- **Directory/compare tag UI:** FUT-02 deferred.
- **New shadcn registry pulls:** UI-SPEC Registry Safety — compose with existing Tailwind.

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Expand/collapse a11y | Custom focus traps / accordion framework | `ComparisonEvidenceNote` button + `aria-*` pattern | Already proven in repo; UI-SPEC names it |
| Source-type / confidence / tag labels | Duplicate PT-BR strings in components | `formatSourceType`, `formatTagConfidence`, `formatTagId` | Locked to methodology / Phase 13 |
| Fontes grouping order | New sort inventiveness | Existing `SOURCE_TYPE_ORDER` in `collectCitedSources` | Keeps official→community hierarchy |
| School lookup by slug | Ad-hoc filter | `getSchoolBySlug` | Single directory source of truth |
| Query-param reading on static export | Server-only searchParams without Suspense | Client + Suspense (Compare pattern) | Avoids Missing Suspense / CSR bailout on `next build` `[CITED: nextjs.org/docs/.../use-search-params]` |
| Category taxonomy | Hard-coded category strings only in JSX | `tagTaxonomy` helpers (`getTagCategory`, `formatTagCategory`, ordered categories) | One place aligned with DECISIONS ADR |

**Key insight:** Phase 15 is almost entirely wiring existing formatters and data into profile chrome. The only net-new domain logic is **category grouping** + **Fontes cite-back metadata** + **mailto report page**.

## Common Pitfalls

### Pitfall 1: Heading collision — two “Perfil da escola”

**What goes wrong:** Editorial H2 and factual field both say “Perfil da escola,” confusing families and failing D-03/D-04.

**Why it happens:** `profileFieldLabels.schoolProfile` is still `"Perfil da escola"` today `[VERIFIED: SchoolProfile/constants.ts]`.

**How to avoid:** Rename factual label to **“Perfil oficial”** in the same plan that introduces `EditorialNarrative`. Update `SchoolProfile` tests that iterate `profileFieldLabels`.

**Warning signs:** Jest still asserting the old factual label string; snapshot/DOM has two identical H2/dt strings.

### Pitfall 2: Fontes misses tag-only source ids

**What goes wrong:** A source cited only by a tag never appears in Fontes (NARR-05 fail).

**Why it happens:** `collectCitedSources` today walks only `importantSchoolFieldPathsDetailedV2` `[VERIFIED: collectCitedSources/index.ts]`.

**How to avoid:** Explicitly merge tag citations; add a unit test where a source is cited **only** by a tag and must appear once.

**Warning signs:** Pilot with tag citations to journalism/community sources absent from Fontes groups.

### Pitfall 3: Assuming narrative has citation arrays

**What goes wrong:** Planner invents `perfilDaEscola.citations` or crashes when collecting “narrative citations.”

**Why it happens:** NARR-05 wording + D-16 “qualitative references” vs Phase 14 plain-string schema.

**How to avoid:** See Open Questions — recommended approach: merge **fields + tags**; do **not** invent narrative citation IDs; omit automatic “Perfil da escola” cite-back unless an explicit association exists (none today).

**Warning signs:** Schema/PR adding citation fields to perfil outside phase scope.

### Pitfall 4: Static export + `useSearchParams` without Suspense

**What goes wrong:** `next build` fails with Missing Suspense boundary.

**Why it happens:** Official Next.js prerender behavior for client query hooks `[CITED: nextjs.org/docs/.../use-search-params]`.

**How to avoid:** Copy Compare page’s `Suspense` wrapper.

**Warning signs:** Green in `next dev`, red in `pnpm build`.

### Pitfall 5: Breaking non-pilot / VAL-01 spirit

**What goes wrong:** Empty editorial chrome or coverage changes on untouched schools.

**Why it happens:** Unconditional section wrappers.

**How to avoid:** Conditional render only; no coverage calculator changes; no data authoring this phase.

**Warning signs:** Directory-only fixture tests suddenly showing “Características da escola.”

### Pitfall 6: Community stigma styling

**What goes wrong:** Amber/red chips for community or collapsed “Comunidade” badge — fails NARR-03 as interpreted by CONTEXT (calm equal treatment).

**How to avoid:** Same `bg-blue-50 text-blue-800` chip as Fontes; distinction is the **label string** only.

### Pitfall 7: Touch target / a11y regressions

**What goes wrong:** Tiny “Ver evidência” text links fail UI-SPEC 44px hit area; missing `aria-controls`.

**How to avoid:** `min-h-11` on toggle; unique ids via `useId`; headings H1→H2→H3 hierarchy per UI-SPEC.

## Code Examples

### Category grouping (must add — does not exist yet)

```ts
// Recommended addition to src/features/schools/tagTaxonomy/index.ts
// Categories from docs/DECISIONS.md Tag Taxonomy V1 ADR [CITED: docs/DECISIONS.md]

export type TagCategoryId =
  | "academic_focus"
  | "learning_model"
  | "student_support"
  | "school_environment";

export const TAG_CATEGORY_ORDER: TagCategoryId[] = [
  "academic_focus",
  "learning_model",
  "student_support",
  "school_environment",
];

const tagCategoryById: Record<TagTaxonomyId, TagCategoryId> = {
  "stem-focus": "academic_focus",
  "languages-focus": "academic_focus",
  "arts-music-focus": "academic_focus",
  "bilingual-program": "learning_model",
  "special-pedagogical-model": "learning_model",
  "all-day-model": "learning_model",
  "inclusion-support": "student_support",
  "transition-support": "student_support",
  "structured-learning-environment": "school_environment",
  "active-school-community": "school_environment",
};

const tagCategoryLabels: Record<TagCategoryId, string> = {
  academic_focus: "Foco acadêmico",
  learning_model: "Modelo de aprendizagem",
  student_support: "Apoio ao aluno",
  school_environment: "Ambiente escolar",
}; // [ASSUMED] PT-BR labels — not yet published in methodology.mdx
```

### collectCitedSources cite-back shape

```ts
// Recommended types extension
export type CitedSourceEntry = {
  source: Source;
  citations: Array<{ quote?: string; note?: string }>;
  citedBy: string[]; // unique PT-BR labels, omit empty
};
```

### Profile correction CTA

```tsx
// After SourcesSection — every real school profile
<Link
  href={`/report-correction/?school=${school.slug}`}
  className="inline-flex min-h-11 items-center text-sm font-medium text-blue-700 underline"
>
  Sugerir correção ou atualização
</Link>
```

### Mailto construction

```ts
const subject = encodeURIComponent(
  `Sugestão de correção: ${schoolName} (${slug})`,
);
const body = encodeURIComponent(
  `Escola: ${schoolName}\nSlug: ${slug}\n\nDescreva o problema (dados factuais, características/tags ou Perfil da escola):\n`,
);
const href = `mailto:${CORRECTION_EMAIL}?subject=${subject}&body=${body}`;
```

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| Field-only Fontes | Field + tag Fontes merge | Phase 15 | Tag provenance visible to families |
| Single “Perfil da escola” factual field | Editorial narrative H2 + factual “Perfil oficial” | Phase 15 | Clears hierarchy D-05 |
| No correction route | `/report-correction/` in IA | IA already listed; implement now | NARR-06 |
| Tags schema-only | Tags rendered profile-only | Phase 13–15 | Match-making surface without directory promotion |

**Deprecated/outdated:**
- Using factual `schoolProfile` label “Perfil da escola” for family-facing editorial meaning — superseded by D-03/D-04.
- Treating community sources as visually “risky” — superseded by D-13.

## Assumptions Log

| # | Claim | Section | Risk if Wrong |
|---|-------|---------|---------------|
| A1 | PT-BR category labels (`Foco acadêmico`, `Modelo de aprendizagem`, `Apoio ao aluno`, `Ambiente escolar`) are acceptable for H3s | Architecture / Code Examples | Copy change before ship if user prefers different strings |
| A2 | NARR-05 “narrative citations” is satisfied by field+tag Fontes merge without a perfil→sourceId map; automatic “Citado em: Perfil da escola” is omitted | Open Questions / NARR-05 | May need product confirmation if cite-back for narrative is mandatory |
| A3 | Correction mailto address can be a new constant / `NEXT_PUBLIC_CORRECTION_EMAIL` (no email exists in repo today) | Environment / Correction | Page ships with wrong or placeholder inbox |
| A4 | Optional `qualitativeLastReviewed` display near editorial zone is skippable this phase | Discretion | Fine — not a success criterion |

**If empty rows appear later:** Prefer verifying A1–A3 with user before execution locks copy/email.

## Open Questions

1. **Narrative association for Fontes cite-back (D-17 / NARR-05)**
   - What we know: `perfilDaEscola` is plain text with **no** citation array (Phase 14 D-10). Tag + field citations are machine-collectable. Editorial rule: narrative synthesizes already-cited evidence only.
   - What's unclear: Whether success criterion 4 requires an explicit “Citado em: Perfil da escola” line on some source cards.
   - Recommendation: **Implement field+tag merge + cite-back for fields/tags only.** Do not invent associations. Treat NARR-05 narrative coverage as satisfied because narrative cannot introduce uncitable sources. Document in PLAN acceptance notes. Escalate only if product insists on narrative cite-back → would need a Phase 14 schema reopen (out of scope).

2. **Correction inbox address**
   - What we know: No `mailto:` or contact email in `siteMetadata` / footer today `[VERIFIED: codebase grep]`.
   - What's unclear: Exact address / whether env-driven.
   - Recommendation: Add `CORRECTION_EMAIL` (or `NEXT_PUBLIC_CORRECTION_EMAIL`) in `ReportCorrection/constants.ts`; placeholder blocked on human value before release. UI-SPEC fallback copy covers blocked mailto clients.

3. **`qualitativeLastReviewed` UI**
   - What we know: Discretion allows optional small metadata.
   - Recommendation: **Omit** in Phase 15 to reduce scope; Phase 16/FUT-01 can add provenance UI later.

## Environment Availability

| Dependency | Required By | Available | Version | Fallback |
|------------|------------|-----------|---------|----------|
| Node.js | Build/test | ✓ | v24.12.0 | — |
| pnpm | Scripts | ✓ | 11.11.0 | Corepack |
| Jest + RTL | Unit tests | ✓ | 30.4.2 / 16.3.2 | — |
| Playwright | Optional e2e | ✓ | 1.61.1 | Defer full pilot e2e to Phase 16 |
| Correction email inbox | mailto | ✗ (unset) | — | Constant + human-provided address before launch |
| New npm packages | — | N/A | — | None required |

**Missing dependencies with no fallback:**
- Production correction email address (blocks real-world use of mailto, not code compile).

**Missing dependencies with fallback:**
- None for implementation/build.

Step 2.6: External tools beyond project toolchain are not required for code changes; email is a content/config dependency.

## Validation Architecture

> `workflow.nyquist_validation` is `true` in `.planning/config.json`.

### Test Framework

| Property | Value |
|----------|-------|
| Framework | Jest 30.4.2 + @testing-library/react 16.3.2 + jsdom |
| Config file | `jest.config.mjs` |
| Quick run command | `pnpm test -- TagsSection EditorialNarrative collectCitedSources SchoolProfile ReportCorrection` |
| Full suite command | `pnpm test` |

### Phase Requirements → Test Map

| Req ID | Behavior | Test Type | Automated Command | File Exists? |
|--------|----------|-----------|-------------------|-------------|
| NARR-01 | Tags grouped by category; confidence badge; expandable evidence | unit (RTL) | `pnpm test -- TagsSection` | ❌ Wave 0 |
| NARR-03 | Expanded evidence shows `formatSourceType` including community; no collapsed community badge | unit | `pnpm test -- TagsSection` | ❌ Wave 0 |
| NARR-04 | Missing perfil or single tag omitted → remaining UI still renders | unit | `pnpm test -- SchoolProfile` / component tests | ❌ Wave 0 (extend existing) |
| NARR-05 | Tag-only source appears once in Fontes; field+tag same id dedupes; cite-back labels | unit | `pnpm test -- collectCitedSources SourcesSection` | ⚠️ partial — field tests exist; tag/cite-back ❌ |
| NARR-06 | Profile link + report page copy names tags + Perfil; slug prefill | unit | `pnpm test -- ReportCorrection SchoolProfile` | ❌ Wave 0 |
| D-04 | Factual label “Perfil oficial” | unit | `pnpm test -- SchoolProfile` | ⚠️ exists but asserts old label set |
| VAL-01 spirit | Non-pilot fixture has no Características / editorial H2 | unit | `pnpm test -- SchoolProfile` | ❌ Wave 0 assertion |

### Sampling Rate

- **Per task commit:** Targeted Jest path(s) for touched units (`pnpm test -- <name>`)
- **Per wave merge:** `pnpm test`
- **Phase gate:** `pnpm test` + `pnpm typecheck` + `pnpm build` green; Playwright pilot coverage primarily Phase 16

### Wave 0 Gaps

- [ ] `src/features/schools/TagsSection/index.test.tsx` — NARR-01/03/04 expand + empty omit
- [ ] `src/features/schools/EditorialNarrative/index.test.tsx` — heading + body; absent when undefined
- [ ] Extend `collectCitedSources/index.test.ts` — tag-only source; dedupe field+tag; `citedBy`
- [ ] Extend `SourcesSection` tests (create if missing) — “Citado em:” present/absent
- [ ] Extend `SchoolProfile/index.test.tsx` — editorial order; “Perfil oficial”; correction link; non-pilot absence
- [ ] `src/features/schools/ReportCorrection/index.test.tsx` — prefill, missing slug copy, mailto href
- [ ] `tagTaxonomy` tests for category helpers
- [ ] Framework install: none — Jest already configured

## Security Domain

### Applicable ASVS Categories

| ASVS Category | Applies | Standard Control |
|---------------|---------|-----------------|
| V2 Authentication | no | No auth in V1 static scope |
| V3 Session Management | no | — |
| V4 Access Control | no | Public static pages only |
| V5 Input Validation | yes | Treat `?school=` as untrusted string; resolve via `getSchoolBySlug` (allowlist of known slugs); never interpolate raw query into HTML without escaping (React text nodes) |
| V6 Cryptography | no | — |

### Known Threat Patterns for static profile + mailto

| Pattern | STRIDE | Standard Mitigation |
|---------|--------|---------------------|
| Query param injection / XSS | Tampering | React text rendering; validate slug against directory; no `dangerouslySetInnerHTML` for perfil |
| mailto header injection | Tampering | `encodeURIComponent` on subject/body; do not allow raw newlines from user input into headers beyond encoded body |
| Open redirect via query | Spoofing | Only link to `mailto:` and in-app paths; do not redirect to arbitrary URLs from `school` param |
| PII in URL | Information disclosure | Prefill uses public school slug/name only — acceptable for public schools |

## Sources

### Primary (HIGH confidence)

- Workspace code: `SchoolProfile`, `collectCitedSources`, `SourcesSection`, `ComparisonEvidenceNote`, `tagTaxonomy`, `formatTagConfidence`, `formatSourceType`, `school` schema, pilot content — inspected 2026-07-29
- `.planning/phases/15-profile-ui-tags-narrative/15-CONTEXT.md` — locked decisions
- `.planning/phases/15-profile-ui-tags-narrative/15-UI-SPEC.md` — approved UI contract
- `docs/DECISIONS.md` — Tag Taxonomy V1 categories
- `docs/EDITORIAL_GUIDE.md` — Perfil / Facts Versus Tags
- `docs/INFORMATION_ARCHITECTURE.md` — `/report-correction/`
- `package.json` / `next.config.mjs` — versions + `output: "export"`
- [Next.js `useSearchParams`](https://nextjs.org/docs/app/api-reference/functions/use-search-params) — Suspense + prerender behavior `[CITED]`

### Secondary (MEDIUM confidence)

- Phase 13/14 CONTEXT — confidence labels, plain-text perfil, no sentence→sourceId maps
- `src/content/guides/methodology.mdx` — public confidence + source-tier language (no category H3 labels)

### Tertiary (LOW confidence)

- Exact PT-BR category H3 strings (A1) — derived from English ADR names, not published family-facing copy yet

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH — pinned in package.json; no new deps
- Architecture: HIGH — patterns verified in repo + UI-SPEC + Next.js docs
- Pitfalls: HIGH — grounded in current `collectCitedSources` / label collision / static export Suspense
- Narrative Fontes cite-back: MEDIUM — requirement wording vs schema gap (A2)

**Research date:** 2026-07-29  
**Valid until:** 2026-08-28 (stable UI composition; re-check if Next major or schema changes)
