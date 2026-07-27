# Phase 10: Education Pathway Editorial - Context

**Gathered:** 2026-07-24
**Status:** Ready for planning

<domain>
## Phase Boundary

Replace the Phase 9 placeholder MDX on `/guides/german-education-system` with the full Kita→higher-education editorial in Brazilian Portuguese: journey chapters, major decision points, non-Gymnasium routes, Berlin differences woven inline, and a linked glossary — using the visual components already shipped (EducationTimeline, BerlinCallout, GlossaryTerm).

In scope: ONBD-01, ONBD-02, ONBD-03, ONBD-04, ONBD-05; update timeline node summaries/`anchorHref` to match real section anchors; keep route shell and MDX component registration from Phase 9.

Out of scope: homepage / Guides hub prominence and discovery cross-links beyond light optional links inside verify blocks (Phase 11 — ONBD-06, DISC-*); full SEO/e2e polish for homepage→onboarding (Phase 11 — REL-*); interactive pathway calculators; replacing `/guides/berlin-school-system`; practical Berlin enrollment procedures (Bezirk, Einzugsgebiet, applications, timelines) which remain in the Berlin primary guide.

</domain>

<decisions>
## Implementation Decisions

### Page structure & section flow
- **D-01:** Organize as **journey chapters**, not one H2 per school type. Germany-first H1: **“Como funciona o sistema educacional na Alemanha”**. Chapter H2s in order: Antes da escola → Ensino primário → Depois da 6ª série → Os caminhos possíveis → Formação profissional → Ensino superior.
- **D-02:** Under **Os caminhos possíveis**, use H3s for **Gymnasium**, **ISS**, and **Gemeinschaftsschule** (Berlin’s main secondary models). Briefly introduce **Realschule** / **Hauptschule** as types still common in many other German states — not as equal primary paths for Berlin families, and **not** as a final “Comparando Berlim…” chapter.
- **D-03:** **No final Berlin-vs-Germany comparison chapter.** Berlin differences appear inline throughout; Germany-first framing matches ONBD-04.
- **D-04:** Timeline `anchorHref` targets **only real timeline nodes**: Kita, Grundschule, secondary paths (as applicable), Ausbildung, Ensino superior. Purely narrative H2s (e.g. “Depois da 6ª série”) do **not** need timeline anchors — they may precede the anchored node sections.
- **D-05:** “Antes da escola” covers Kita / creche / Kindergarten and whether attendance is compulsory; “Ensino primário” covers Grundschule grades, what children learn, and Berlin differences at concept level; “Depois da 6ª série” covers Empfehlung, how families choose, whether parents can disagree, and Berlin vs other states at the transition.

### Decision point depth & “O que verificar”
- **D-06:** Guide is **narrative-first**. Full **“O que verificar”** blocks only at action moments: (1) after Grundschule — recommendation and choosing the next path; (2) choosing among Gymnasium / ISS / Gemeinschaftsschule; (3) qualification routes (Abitur, Fachabitur, Ausbildung, Duales Studium, university).
- **D-07:** Kita and Grundschule chapters focus on **understanding the system**, with lighter informational callouts — not full verification checklists.
- **D-08:** Each “O que verificar” block is **self-contained** so the family can decide without leaving the page; where appropriate, add **one or two optional** “learn more” / “next step” links to `/guides/first-steps`, `/guides/berlin-school-system`, or `/schools` — never required reading.

### Berlin callout editorial strategy
- **D-09:** Use short **“Em Berlim…”** callouts (`BerlinCallout` inline or equivalent) **only where the experience genuinely differs** (e.g. 6-year Grundschule, ISS / Berlin secondary landscape).
- **D-10:** At most **one** summary **“Berlin em destaque”** callout, placed around the **primary → secondary** transition, linking to `/guides/berlin-school-system`.
- **D-11:** This guide explains **what differs and why it matters for understanding the journey**. Practical enrollment detail (Bezirk assignment, catchment, applications, timelines, exceptions) **stays in** `/guides/berlin-school-system` to avoid duplication and keep roles clear.

### Glossary & German term treatment
- **D-12:** **Both** patterns: short Portuguese gloss on **first use** in narrative; complete **Glossário** section at the bottom using `<GlossaryTerm>` for quick reference. Readers must not need to leave the page to understand a term.
- **D-13:** Glossary covers **ONBD-05 required terms** (Ganztag, Hort, Willkommensklasse, Ausbildung, Duales Studium, Fachabitur, and related) **plus** journey essentials: Kita, Grundschule, Gymnasium, ISS, Gemeinschaftsschule, Abitur, Empfehlung, Universität, Hochschule; include **Berufsschule / OSZ** and **MSA** if those terms are introduced in the prose.
- **D-14:** Narrative may link to glossary anchors where helpful; bottom Glossário is the authoritative quick-reference list.

### Claude's Discretion
- Exact Portuguese wording, heading slugification for anchors, and which secondary nodes get individual vs shared anchors
- Length and density of each chapter within the locked outline
- Exact placement of the single Berlin summary callout within the primary→secondary transition
- Whether “O que verificar” is plain MDX lists or a small shared pattern reused from berlin-school-system
- Timeline demo data (`constants.ts`) summary copy updates to remove Phase 10 placeholders
- Unit/e2e updates strictly needed to keep existing onboarding route tests green (discovery/homepage e2e remains Phase 11)

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Product & editorial
- `docs/PRODUCT.md` — Germany-first onboarding for Brazilian families; explain system before comparing schools
- `docs/EDITORIAL_GUIDE.md` — Brazilian Portuguese tone; German term definitions; no ranking language; practical “what to verify” spirit
- `docs/INFORMATION_ARCHITECTURE.md` — `/guides` routes and user journey guide → directory

### Requirements & roadmap
- `.planning/REQUIREMENTS.md` — ONBD-01–05 (Phase 10); ONBD-06 / DISC-* / REL-* deferred to Phase 11
- `.planning/ROADMAP.md` — Phase 10 goal, success criteria, dependency on Phase 9
- `.planning/PROJECT.md` — v1.1 milestone: full path, non-Gymnasium routes, Berlin woven throughout

### Prior phase context
- `.planning/phases/09-onboarding-guide-visual-foundation/09-CONTEXT.md` — timeline/BerlinCallout/GlossaryTerm decisions; route shell already shipped
- `.planning/milestones/v1.0-phases/07-essential-parent-guides/07-CONTEXT.md` — GuideIntro, modular sections, inline + bottom glossary pattern, berlin-school-system as complementary Berlin primary guide

### Existing complementary content (do not duplicate enrollment)
- `src/content/guides/berlin-school-system.mdx` — Berlin primary deep-dive (Grundschule, Einzugsgebiet, matrícula, Ganztag)
- `src/content/guides/first-steps.mdx` — practical checklist for optional next-step links
- `src/content/guides/german-education-system.mdx` — current placeholder to replace
- `src/features/guides/EducationTimeline/constants.ts` — trunk/branches/outcomes and current `anchorHref` stubs

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- `EducationTimeline`, `BerlinCallout` (inline + summary), `GlossaryTerm` — registered for MDX; use as editorial building blocks
- `GuideIntro` + `src/app/guides/german-education-system/page.tsx` — route shell already live
- `src/features/guides/mdxUtils/` — `slugifyHeading` for stable anchors matching timeline `anchorHref`
- Print-friendly guide CSS (including `.guide-print-expand`) from Phases 7/9

### Established Patterns
- English URL slug `/guides/german-education-system`; Brazilian Portuguese visible copy
- Feature-first guides under `src/features/guides/`
- berlin-school-system: modular H2s + “O que verificar” + bottom glossário (list form; this phase prefers `<GlossaryTerm>` in Glossário)
- Equal visual weight for non-Gymnasium routes (Phase 9 D-07/D-08) — editorial must not imply Gymnasium is the only path (ONBD-03)

### Integration Points
- Replace body of `src/content/guides/german-education-system.mdx`
- Update `EducationTimeline` demo/`constants.ts` summaries and `anchorHref` to real chapter/node anchors
- Optional light links to first-steps, berlin-school-system, `/schools` inside verify blocks only
- Phase 11 will promote the guide on homepage and `/guides` hub

</code_context>

<specifics>
## Specific Ideas

- User-provided chapter skeleton (adapted to Germany-first): Antes da escola (Kita/creche/Kindergarten/compulsory?) → Ensino primário → Depois da 6ª série (Empfehlung, choice, parent disagreement, Berlin vs other states) → Os caminhos possíveis (Gymnasium / ISS / Gemeinschaftsschule) → Formação profissional (Ausbildung, Duales Studium, OSZ) → Ensino superior (Universität / Hochschule / Fachhochschule)
- Realschule/Hauptschule: brief other-state context when discussing secondary — not a closing comparison chapter
- Verify blocks feel like optional next steps, not homework
- Glossary goal: never leave the page to understand a German term; still one authoritative Glossário for scan-back

</specifics>

<deferred>
## Deferred Ideas

- Homepage journey card + Guides hub flagship placement — Phase 11 (DISC-01, DISC-02)
- Broader cross-links and explicit complementary relationship copy beyond light verify-block links — Phase 11 (DISC-03, DISC-04)
- Portuguese SEO metadata polish + homepage → onboarding e2e smoke — Phase 11 (REL-01, REL-03)
- Interactive pathway calculators or quizzes — out of scope per REQUIREMENTS.md
- Practical Berlin enrollment procedures — remain on `/guides/berlin-school-system`

</deferred>

---

*Phase: 10-education-pathway-editorial*
*Context gathered: 2026-07-24*
