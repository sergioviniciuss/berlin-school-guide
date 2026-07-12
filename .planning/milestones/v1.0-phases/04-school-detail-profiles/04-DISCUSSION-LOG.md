# Phase 4: School Detail Profiles - Discussion Log

> **Audit trail only.** Do not use as input to planning, research, or execution agents.
> Decisions are captured in CONTEXT.md — this log preserves the alternatives considered.

**Date:** 2026-07-11
**Phase:** 4 — School Detail Profiles
**Areas discussed:** Profile layout & sections, Per-field evidence labels, Directory vs detailed depth, Sources & citations UX, Missing & empty fields, Directory card → profile link

---

## Profile layout & sections

| Option | Description | Selected |
|--------|-------------|----------|
| Single long scroll with labeled sections | Matches methodology pattern; easy to share | ✓ |
| Summary + expandable sections | Denser first screen | |
| You decide | Planner picks | |

| Option | Description | Selected |
|--------|-------------|----------|
| Grouped sections (Identificação, Pedagogia, etc.) | Matches IA school-page journey | ✓ |
| Flat field list | No section headers | |
| Hybrid | Key facts top, rest in "Mais informações" | |

| Option | Description | Selected |
|--------|-------------|----------|
| Rich header | Extended card + website + address prominent | ✓ |
| Extended card header | Name, badge, location, coverage, dates | |
| Minimal header | Name and badge only | |

| Option | Description | Selected |
|--------|-------------|----------|
| Identity + evidence summary first on mobile | Name, type, location, coverage before fields | ✓ |
| Verified facts first | Confirmed info before missing | |
| Same order as desktop | No mobile reorder | |

---

## Per-field evidence labels

| Option | Description | Selected |
|--------|-------------|----------|
| Status badge on every field | Clearest trust signal | ✓ |
| Badge only when not verified | Verified shows value only | |
| Extend card tone pattern | Muted text, no badge | |

| Option | Description | Selected |
|--------|-------------|----------|
| Value + badge + inline inference note | Phase 1 D-04 alignment | ✓ |
| Badge + expandable "Por quê?" | Cleaner page | |
| Status replaces value | No inferred value shown | |

| Option | Description | Selected |
|--------|-------------|----------|
| Both inline links and Fontes section | Per-field + bibliography | ✓ |
| Sources section only | Simpler V1 | |
| Verified fields get anchor to Fontes only | |

| Option | Description | Selected |
|--------|-------------|----------|
| Show value + Conflitante badge + note | Schema requires note | ✓ |
| Hide conflicting value | Status and note only | |
| You decide | | |

---

## Directory vs detailed depth

| Option | Description | Selected |
|--------|-------------|----------|
| Upgrade 3 schools to detailed/profile_ready in Phase 4 | Honest re-evaluation; PROF-05 | ✓ |
| UI-only richness without metadata change | | |
| All 10 identical structure | | |

| Option | Description | Selected |
|--------|-------------|----------|
| Directory schools show all 23 fields, unsupported = Ausente | PROF-06 honest labeling | ✓ |
| Directory schools show only 11 directory fields | | |
| Show any populated field only | | |

| Option | Description | Selected |
|--------|-------------|----------|
| Detailed extras only when verified; missing = Ausente | | ✓ |
| Full detailed field set always shown | | |
| You decide | | |

| Option | Description | Selected |
|--------|-------------|----------|
| Defer Open Day questions | Not in PROF-01–07 | ✓ |
| Visit questions on 3 detailed schools only | | |
| Generic questions on all 10 | | |

---

## Sources & citations UX

| Option | Description | Selected |
|--------|-------------|----------|
| Fontes at bottom, grouped by source type | | ✓ |
| Fontes at bottom, deduplicated flat list | | |
| Fontes sidebar on desktop | | |

| Option | Description | Selected |
|--------|-------------|----------|
| Both anchor to Fontes and external URL on verified fields | | ✓ |
| Anchor link only | | |
| External URL only | | |

| Option | Description | Selected |
|--------|-------------|----------|
| Rich metadata (type badge, publisher, dates, title, URL, quote/note) | RSCH-04 rendering | ✓ |
| Publisher + date + title + URL | | |
| Title + URL only | | |

| Option | Description | Selected |
|--------|-------------|----------|
| Inferred fields inherit sources in Fontes; note on field | inferredFrom pattern | ✓ |
| No source link for inferred | | |
| You decide | | |

---

## Missing & empty fields

| Option | Description | Selected |
|--------|-------------|----------|
| Always show every important field with explicit status | | ✓ |
| Hide missing fields | | |
| Collapsed "Informações não pesquisadas" section | | |

| Option | Description | Selected |
|--------|-------------|----------|
| Show not_applicable explicitly | | ✓ |
| Hide not_applicable | | |
| You decide | | |

| Option | Description | Selected |
|--------|-------------|----------|
| Short disclaimer near coverage linking to /methodology | | ✓ |
| Per-field helper text | | |
| Status labels alone | | |

---

## Directory card → profile link

| Option | Description | Selected |
|--------|-------------|----------|
| Entire card clickable | Link wrapper | ✓ |
| Explicit "Ver perfil completo" button | Clearer affordance | |
| School name link only | | |

| Option | Description | Selected |
|--------|-------------|----------|
| You decide on CTA copy | Whole-card click; a11y text at discretion | ✓ |
| "Ver perfil completo" | | |
| "Ver escola" | | |

| Option | Description | Selected |
|--------|-------------|----------|
| Keep profile badge + coverage on card | Continuity from directory | ✓ |
| Simplify card after profiles ship | | |
| You decide | | |

---

## Claude's Discretion

- Exact section groupings and Portuguese section titles
- Whole-card link accessibility (aria-label, visible affordance)
- `getSchoolBySlug`, `generateStaticParams`, per-school metadata
- 404 for unknown slugs; header active state for `/schools/[slug]`
- Three-school metadata upgrade criteria during execution

## Deferred Ideas

- Open Day / visit questions — future phase
- Directory UX polish — Phase 5
- Comparison — Phase 6
