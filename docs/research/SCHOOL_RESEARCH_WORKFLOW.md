# School Research Workflow

Executable step-by-step checklist for researching Berlin primary schools and recording evidence-backed data in the Berlin School Guide codebase.

**Audience:** Human researchers and AI sessions. Follow this document as a procedural checklist — do not re-derive Phase 1 evidence rules from scratch. Policy definitions live in linked canonical docs.

## Prerequisites

Read these before starting research on a new or existing school record:

| Document | Purpose |
| -------- | ------- |
| [docs/RESEARCH.md](../RESEARCH.md) | Source hierarchy, citation philosophy, research statuses, conflict rules |
| [docs/DATA_MODEL.md](../DATA_MODEL.md) | Coverage levels, field evidence structure, minimum fields |
| [REAL_SCHOOL_RESEARCH_SPIKE.md](./REAL_SCHOOL_RESEARCH_SPIKE.md) | Lichtenberg baseline sources, portrait field patterns, field difficulty notes |
| Phase 1 code artifacts | `inferredFrom()` helper, coverage v2 denominators, `pnpm validate:data` gate |

**Policy authority:** When this workflow and [docs/RESEARCH.md](../RESEARCH.md) appear to conflict, RESEARCH.md wins. This document describes *how* to apply policy, not *what* the policy is.

## Source discovery checklist

Complete these steps in order for each school. Record sources in `sources[]` **before** assigning field evidence.

1. **Berlin Senate school directory** — search at [bildung.berlin.de/Schulverzeichnis](https://www.bildung.berlin.de/Schulverzeichnis/). Confirm the school exists, note the official school number, and open the Schulportrait link.
2. **Official school portrait (Schulportrait)** — use the portrait page as the primary source for basic metadata (name, address, Ortsteil, website, languages, Ganztag, welcome classes, offers). Record as `official_government` / `primary` reliability.
3. **School website** — when the portrait lists an official URL, visit the site for deeper fields (Ganztag/Hort pages, pedagogical profile, parent communication, facilities). Record as `school_website` / `secondary` reliability.
4. **Supplementary pages** — check for Ganztag or Hort detail pages, Willkommensklasse information, and official inspection report links (on school site or Senate directory). Add each distinct page as its own source entry.
5. **Record each source in `sources[]` first** — every source needs complete metadata before any field cites it:
   - `id` — stable slug scoped to the school (e.g. `{school-slug}-official-portrait`)
   - `title`, `url`, `type`, `reliability`, `publisher`
   - `dateAccessed` — the calendar date **this specific source** was checked (ISO `YYYY-MM-DD`); do not reuse a shared constant across sources

Stop source discovery when portrait + available school-site pages are exhausted. Do not infer missing fields from forums, reviews, or anecdotal sources in V1.

## Record setup

Add or update the school in `src/content/schools/real/lichtenbergPrimarySchools/index.ts` using the `primarySchool()` builder pattern.

### 1. Define `sources[]` first

```typescript
sources: [officialPortraitSource, /* optional school-site sources */],
```

Each call to `source()` (or equivalent helper) must pass an individual `dateAccessed` per source — not a module-level shared date constant.

### 2. Set research metadata

```typescript
research: {
  status: "directory_only" | "in_research" | "profile_ready",
  coverageLevel: "directory" | "detailed",
  lastResearched: "YYYY-MM-DD",      // date of last full field-by-field review
  lastSourceChecked: "YYYY-MM-DD",  // date of most recently accessed cited source
},
```

- **`directory_only` + `directory`** — portrait-level research only (11 coverage fields).
- **`in_research` or `profile_ready` + `detailed`** — extended field research (23 coverage fields); requires independent citations per verified field.

Set `lastResearched` and `lastSourceChecked` to the **actual dates for this school**, not a project-wide milestone date.

### 3. Assign field evidence

After sources exist, walk each field and assign `value` + `evidence` using the per-field decision trees (next section). Run `pnpm validate:data` before marking research complete.
