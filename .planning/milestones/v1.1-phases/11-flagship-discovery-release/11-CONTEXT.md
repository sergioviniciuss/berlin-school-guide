# Phase 11: Flagship Discovery & Release - Context

**Gathered:** 2026-07-25
**Status:** Ready for planning

<domain>
## Phase Boundary

Make `/guides/german-education-system` the site’s primary entry point for new Brazilian families and connect it cleanly to the rest of the product: homepage journey hierarchy, `/guides` hub flagship placement, complementary relationship copy with cross-links, closing next-steps on the onboarding guide, Portuguese metadata polish, Playwright smoke (homepage → onboarding), and axe coverage on the onboarding route.

In scope: ONBD-06, DISC-01, DISC-02, DISC-03, DISC-04, REL-01, REL-02, REL-03.

Out of scope: rewriting Phase 10 editorial body (except intro complementary line, Próximos passos section, and Berlin guide title/intro relationship copy); replacing `/guides/berlin-school-system`; school data research; interactive calculators; adding `/compare` as a closing exit from onboarding.

</domain>

<decisions>
## Implementation Decisions

### Homepage “start here” hierarchy
- **D-01:** Onboarding is the primary **Start here** journey card and default entry for new families. It must communicate that understanding the German education system comes **before** comparing individual schools. Link directly to `/guides/german-education-system` (not `/guides`).
- **D-02:** School directory remains highly visible as the **second** primary action for users who already know the system or are returning to compare schools (`/schools`).
- **D-03:** Homepage presents **exactly two** journey actions: Start here → onboarding; Explore schools → directory. Remove the existing “Entender o sistema escolar” card that pointed at `/guides`. Remove the methodology homepage card. Guides hub and methodology stay discoverable via main nav and contextual cross-links — they must not compete above the fold on the homepage.
- **D-04:** Give **Start here** the stronger visual treatment (primary accent / filled CTA). Keep Explore schools highly visible but secondary (e.g. outline CTA), consistent with today’s primary-vs-secondary card chrome pattern in `HomeJourneyCards`.

### Guides hub flagship layout
- **D-05:** Keep existing hub section structure. Under **Entenda o sistema**: onboarding flagship card on top; Berlin public-school guide as complementary card below. Keep **Primeiros passos** under **Checklists práticas**.
- **D-06:** Hub roles (copy intent):
  - German education system — *Comece aqui. Entenda como funciona o sistema educacional na Alemanha antes de escolher uma escola.*
  - Berlin school system — *Depois, veja como essas regras se aplicam especificamente às escolas públicas de Berlim.*
  - First steps — *Quando estiver pronto para agir, siga o checklist prático.*
- **D-07:** Flagship (onboarding) gets stronger visual treatment on the hub; Berlin card is secondary; first-steps stays checklist-style.
- **D-08:** Retitle the Berlin guide (hub card **and** page `GuideIntro`/H1) to **Como funciona o sistema escolar público de Berlim** — emphasize Berlin’s public school system (not only “escola primária”). Pairing with onboarding: Germany = start here; Berlin = how those concepts apply in practice.

### Complementary relationship copy
- **D-09:** Short complementary statements in **both** guide intros and the corresponding hub blurbs. Concise and action-oriented — **no** separate “how these guides relate” section.
- **D-10:** Complementary lines include **inline links** to the sibling guide (recommended reading path, not only conceptual). Example framing:
  - Germany: *Este guia explica como funciona o sistema educacional alemão. Depois, veja [Como funciona o sistema escolar público de Berlim](/guides/berlin-school-system).*
  - Berlin: *Este guia mostra como o sistema funciona especificamente em Berlim. Se você ainda não conhece a estrutura do sistema educacional alemão, recomendamos começar por [Como funciona o sistema educacional na Alemanha](/guides/german-education-system).*
- **D-11:** Update **first-steps** with a small top conditional recommendation (not a prominent warning), e.g. *Novo em Berlim? Se você ainda não conhece o sistema educacional alemão, recomendamos começar pelo guia [Como funciona o sistema educacional na Alemanha](/guides/german-education-system) antes deste checklist.*
- **D-12:** **Do not** change directory intro copy. By the time someone reaches `/schools` they are in exploration mode; don’t add friction telling them to read another guide first. Homepage, guides, and first-steps already establish the recommended path.

### Closing next steps (ONBD-06)
- **D-13:** Add **Próximos passos** as the final **narrative** section, immediately **before** Glossário. Glossário remains the last section as appendix/reference — not the endpoint of the learning journey.
- **D-14:** Closing progression (three exits only — **no `/compare`**):
  1. Berlin public-school guide
  2. Explore schools (`/schools`)
  3. First steps checklist
  Compare is discovered inside the directory exploration phase, not as a separate next step from onboarding.
- **D-15:** Format as an **ordered short numbered list** (one short blurb + link each), not mini cards — avoid looking like a second homepage. Sample structure:

  ```text
  Próximos passos
  Agora que você entende como funciona o sistema educacional alemão:
  1. Entenda como isso funciona em Berlim — … → berlin-school-system
  2. Explore as escolas — … → /schools
  3. Confira os primeiros passos — … → first-steps
  ```

### Claude's Discretion
- Exact Portuguese wording for homepage Start here / Explore schools card titles and body (within D-01–D-04 intent)
- Exact hub blurb wording within D-06 roles; CTA button labels
- How to render linked complementary text in GuideIntro (today `description` is a plain `string` — may extend props, add a sibling paragraph, or place the line at the top of MDX)
- REL-01 metadata title/description polish for onboarding (and Berlin retitle if metadata must match); reuse `buildPageMetadata` patterns
- REL-02 / REL-03: extend existing axe + smoke/metadata Playwright patterns (homepage → onboarding journey; include `/guides/german-education-system` in a11y routes if missing)
- Whether mid-page optional “O que verificar” links need light retargeting after hub/title changes (only if tests or consistency require it)

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Requirements & roadmap
- `.planning/REQUIREMENTS.md` — ONBD-06, DISC-01–04, REL-01–03
- `.planning/ROADMAP.md` — Phase 11 goal and success criteria
- `.planning/PROJECT.md` — v1.1 flagship discovery intent

### Product & editorial
- `docs/PRODUCT.md` — Germany-first onboarding before school comparison
- `docs/EDITORIAL_GUIDE.md` — Brazilian Portuguese tone; no ranking language
- `docs/INFORMATION_ARCHITECTURE.md` — `/guides` routes and guide → directory journey
- `docs/DECISIONS.md` — Static-first; English URL segments

### Prior phase context
- `.planning/phases/10-education-pathway-editorial/10-CONTEXT.md` — Editorial shipped; discovery/homepage deferred to Phase 11
- `.planning/phases/09-onboarding-guide-visual-foundation/09-CONTEXT.md` — Route shell; hub promotion deferred
- `.planning/milestones/v1.0-phases/07-essential-parent-guides/07-CONTEXT.md` — GuidesHub category scaling; homepage journey card patterns

### Implementation touchpoints
- `src/features/home/HomeJourneyCards/index.tsx` — Homepage journey cards
- `src/features/guides/GuidesHub/index.tsx` — Hub cards and sections
- `src/features/guides/GuideIntro/index.tsx` — Guide hero; description currently string-only
- `src/app/page.tsx` — Homepage composition + metadata
- `src/app/guides/berlin-school-system/page.tsx` — Berlin GuideIntro + metadata to retitle
- `src/app/guides/german-education-system/page.tsx` — Onboarding GuideIntro + metadata
- `src/content/guides/german-education-system.mdx` — Add Próximos passos; complementary intro line if placed in MDX
- `src/content/guides/berlin-school-system.mdx` — Complementary intro / relationship if placed in MDX
- `src/content/guides/first-steps.mdx` — Top conditional recommendation
- `e2e/smoke.spec.ts` — Extend homepage → onboarding journey
- `e2e/metadata.spec.ts` — Distinct Portuguese metadata patterns
- `e2e/a11y.spec.ts` — Axe routes (add onboarding if missing)
- `e2e/onboarding.spec.ts` — Existing onboarding route coverage

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- `HomeJourneyCards` — primary accent card (`border-l-primary`) vs secondary (`bg-neutral-50` + outline button); reshape to two-card Start here / Explore schools
- `GuidesHub` — sectioned hub; berlin-school-system currently occupies the single primary system card
- `GuideIntro` — eyebrow / title / description; used on home and guide pages
- `buildPageMetadata` — Portuguese title/description/OG pattern for REL-01

### Established Patterns
- English URL slug `/guides/german-education-system`; Brazilian Portuguese visible copy
- Hub scales by category without redesign (Phase 7 D-16)
- Playwright smoke, metadata, and axe suites already cover core routes; onboarding a11y route may still be missing from `CORE_A11Y_ROUTES`
- Smoke currently asserts homepage → `/guides` and hub → berlin-school-system — must be updated for new primary journey

### Integration Points
- Homepage: `src/app/page.tsx` + `HomeJourneyCards`
- Hub: `GuidesHub` + `src/app/guides/page.tsx` / tests
- Guide pages + MDX content for intros, titles, Próximos passos, first-steps tip
- E2E: smoke (REL-03), metadata (REL-01), a11y (REL-02)

</code_context>

<specifics>
## Specific Ideas

- Homepage mental model: understanding the system before comparing schools
- Hub pairing titles: ⭐ Germany start here / 📍 Berlin public school system in practice
- Relationship is the **recommended reading path**, not only a conceptual note — sibling names should be clickable
- First-steps tip is soft (“Novo em Berlim?”), never a blocking warning
- Directory stays focused on exploration — no “go read the guide first” friction
- Closing path is linear: Germany → Berlin → schools → act (first-steps); `/compare` intentionally omitted from Próximos passos
- User sample Próximos passos copy provided in discussion — adapt lightly for editorial consistency, keep the three-step order

</specifics>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope. `/compare` as an onboarding exit was considered and explicitly rejected (discover via directory instead).

</deferred>

---

*Phase: 11-flagship-discovery-release*
*Context gathered: 2026-07-25*
