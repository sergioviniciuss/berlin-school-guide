# Feature Research

**Domain:** Evidence-backed qualitative decision-support profiles (school profiles, extended by analogy to university profiles, healthcare provider profiles, travel guides, restaurant/review platforms, and fact-checking/knowledge-graph "evidence card" patterns)
**Researched:** 2026-07-26
**Confidence:** MEDIUM-HIGH

This research answers: how do trust-first, anti-ranking, evidence-backed qualitative profiles typically work across analogous domains, and what should Berlin School Guide borrow, adapt, or explicitly reject for the v1.2 "Evidence-Based School Profiles" milestone (structured tags, `Perfil da escola` narrative, triangulated community observations, evidence hierarchy, methodology framework, Lichtenberg pilot)?

No single analogous product does exactly what this milestone requires — the closest full analog for the *combination* of "separate official/reporting/community evidence tiers + explicit confidence labeling + no aggregate score" is a niche gaming-hardware methodology page (Steam Hardware Hub) rather than an education or healthcare product. The recommendations below are therefore a **synthesis across domains**, not a copy of one existing competitor. Confidence per finding is marked individually.

## Feature Landscape

### Table Stakes (Users Expect These)

Features families/readers assume exist on any evidence-backed profile. Missing these = product feels incomplete or untrustworthy. Most of these already exist for **fields** in this codebase (`docs/DATA_MODEL.md`, `docs/RESEARCH.md`) and simply need to extend to **tags** and the new narrative.

| Feature | Why Expected | Complexity | Notes |
|---------|--------------|------------|-------|
| Inline citation next to every factual claim/tag | Wikipedia's verifiability policy ("material that is challenged or likely to be challenged must include an inline citation") is the baseline readers now expect from any reference-style content (HIGH confidence — official policy) | LOW | Reuse existing `ProfileFieldRow` / `SourcesSection` citation pattern (`src/features/schools/SourcesSection`); extend to tags |
| Source-type / reliability label per claim ("official," "school-provided," "community, non-official") | CMS Care Compare and hospital-rating research show readers distrust opaque scores but accept clearly labeled provenance (MEDIUM confidence — peer-reviewed critique) | LOW-MEDIUM | `docs/RESEARCH.md` already defines `official_government`, `official_inspection`, `school_website`, `public_dataset`, `anecdotal_reserved` — extend `anecdotal_reserved` into a displayable "triangulated community" tier for tags only |
| Visible "missing / not confirmed" state, never hidden | Core existing product principle (`docs/PRODUCT.md`: "Treat missing data as useful information") and matches College Scorecard's approach of showing federal data gaps rather than papering over them (MEDIUM confidence) | LOW | Reuse `não confirmado` status pattern from field evidence statuses |
| Consolidated sources/citations section per page | Wikipedia's "References" section and `docs/EDITORIAL_GUIDE.md`'s "Citations In Prose" rule already establish this; Steam Hardware Hub's methodology page does the same for tiered claims (MEDIUM confidence) | LOW | Already built (`SourcesSection`); needs tag citations merged in |
| "Last researched" / "last verified" date visible | Standard trust signal across ProPublica methodology pages, Snopes fact-checks, and this product's own `última pesquisa` / `última verificação das fontes` fields (HIGH confidence — established pattern across all domains researched) | LOW | Reuse `researchMetadata` |
| Correction / report-an-issue path | Snopes and Wikipedia both rely on reader-flagged corrections reviewed by editors before publication; `docs/RESEARCH.md` already mandates this for schools | LOW | Existing correction workflow must explicitly cover tags and the new narrative, not just fields |
| Public, versioned methodology explanation | College Scorecard, ProPublica, and Steam Hardware Hub all publish a standalone methodology page explaining what "verified," "confidence," and source tiers mean — without this, tiered/confidence labels look arbitrary (HIGH confidence) | MEDIUM | Extend existing `/methodology` route rather than create a new one |
| Non-superlative editorial voice enforced consistently | `docs/EDITORIAL_GUIDE.md` already bans "melhor," "recomendado" without attribution; The Infatuation and Lonely Planet show that even opinionated editorial guides distinguish reported fact from writer judgment typographically/structurally | LOW-MEDIUM | New narrative content type (`Perfil da escola`) must follow existing rules, not introduce new ones |

### Differentiators (Competitive Advantage)

Features that set Berlin School Guide apart from GreatSchools/Niche-style rating sites and align with the Core Value ("parents can trust what they read because every field shows its evidence status"). These are where the milestone should invest.

| Feature | Value Proposition | Complexity | Notes |
|---------|-------------------|------------|-------|
| Structured tag taxonomy with per-tag evidence array (not just per-field) | No mainstream school-rating competitor exposes source-level provenance per attribute/tag — GreatSchools and Niche show a composite score with an opaque methodology page; this product can show *which specific source* justifies "STEM" or "bilingual" for *this* school (MEDIUM confidence — inferred gap, not directly documented) | MEDIUM-HIGH | Extend `SchoolRecord` schema: `tags: { type, value, evidenceTier, evidence: FieldEvidence }[]`; reuse existing `sources` registry and `sourceId` citation pattern per `docs/DECISIONS.md` ("school-level sources with field-level citations") |
| Explicit three-tier evidence hierarchy surfaced per tag: official → reputable journalism → triangulated community | Directly mirrors Steam Hardware Hub's "official / reporting / community signal / analysis" separation, which exists specifically to prevent community chatter from being mistaken for official confirmation (MEDIUM confidence — single strong analog, not an education-domain precedent) | MEDIUM | This is the methodology's central innovation for v1.2; must be documented in the methodology deliverable before pilot tagging begins |
| Triangulation rule: a community observation can support a tag only with ≥2 independent, non-collusive parent sources, and never as the *sole* basis | Journalism's "two-source rule" (AP, NYT) establishes exactly this discipline for contested claims — but journalism sources agree a shared count of two doesn't guarantee truth, only that independent corroboration exists, and require documenting *why* sources are believed independent (MEDIUM-HIGH confidence — well-documented journalistic standard, but stricter here since it can *never* be sole basis, unlike journalism's anonymous-source exception) | HIGH | Needs a lightweight editorial log (which 2+ sources, why judged independent, date) — likely a `triangulation` note field on the evidence entry, not new UI complexity |
| Confidence label per tag instead of a fabricated score | Research on AI/data UX confidence patterns is unambiguous: a fabricated numeric confidence ("87%") "manufactures trust and shatters the first time a high-confidence answer is wrong"; a small labeled bucket (e.g., `oficial`, `fonte jornalística`, `relato triangulado, não oficial`) tied to a visible source list is the recommended pattern (HIGH confidence — explicit UX research consensus) | LOW-MEDIUM | This is a *label*, not a score — must not be styled as a rating (no stars, no color-graded 1-10) |
| `Perfil da escola` narrative that answers "what kind of school is this / does it fit my child" rather than "is it good" | This reframing is the product's own stated differentiator (`docs/PRODUCT.md`, `.planning/PROJECT.md` decision log) and has real precedent: College Scorecard/College Navigator deliberately avoid ranking and instead let users filter by fit; BigFuture's matching quizzes do the same (MEDIUM confidence) | MEDIUM | Narrative should be generated *from* already-tagged, cited fields — never introduce a claim in prose that isn't backed by a tag or field evidence entry |
| Methodology page treated as a first-class, versioned deliverable | ProPublica publishes a dedicated "How We Analyzed..." methodology article alongside almost every data-driven story, explicitly to let "experts and interested readers understand our approach and its limitations" — this is the exact posture the milestone wants for tag taxonomy, voice, and triangulation rules (HIGH confidence — direct precedent) | MEDIUM | Version the methodology (e.g., "tag taxonomy v1") the same way `docs/DECISIONS.md` already versions evidence coverage (`v1` important fields) |
| Tag provenance/changelog (when added, on what evidence, last reviewed) | Snopes retired vague ratings ("Unproven," "Unfounded") in favor of dated, explained research notes because static labels without context eroded trust over time — the same logic applies to a tag that could go stale (MEDIUM confidence) | MEDIUM | Extends existing `research status` and date fields rather than inventing new mechanics |

### Anti-Features (Commonly Requested, Often Problematic)

Features that look like natural additions but would undermine the anti-ranking, trust-first positioning. Directly informed by documented failure modes in analogous domains.

| Feature | Why Requested | Why Problematic | Alternative |
|---------|---------------|------------------|-------------|
| Numeric or star quality score / "top N schools" | Feels intuitive; GreatSchools' 1-10 and CMS's 1-5 star ratings are the default mental model for "compare providers" | Peer-reviewed research found GreatSchools' score is "strongly skewed" by neighborhood demographics rather than school effect, and steers families toward whiter/wealthier schools; CMS's Hospital star rating was found "highly sensitive to methodological choices," undermining its claimed objectivity; both are explicitly banned already in `docs/DECISIONS.md` and `docs/COMPARISON.md` | Structured tags + evidence coverage percentage (already shipped), each with visible sourcing — this milestone should reinforce, not reopen, that decision |
| Single-source or self-reported community tag ("a parent said so") | Feels like more content, faster; matches Niche's "millions of student reviews" model | Niche's own "Where Our Data Comes From" page admits reviews are self-reported and unverified; independent analysis notes Niche's grades have "no auditable methodology" — exactly the failure mode `docs/DECISIONS.md` already flags ("Do Not Display Parent-Review Signals In V1") | Require ≥2 independent, explicitly-judged-non-collusive sources before a community observation can support a tag at all; otherwise omit the tag rather than publish it weakly sourced |
| Aggregated / averaged parent rating (e.g., average of Google-style stars) | Looks like "the community's view" summarized cleanly | Peer research directly comparing hospital "Google star ratings" against expert-audited ratings found crowd averages diverge meaningfully from expert assessment and can mislead exactly where stakes are highest | Show individually-cited, triangulated qualitative observations labeled "não oficial," never averaged into a number |
| AI-generated tags or narrative without a human-reviewed citation trail | Speeds up pilot content production | Already explicitly out of scope (`docs/PRODUCT.md`: "AI-generated recommendations without verifiable evidence"); Lonely Planet's own 2026 AI editorial policy draws the same line — AI may *reformat* already-reported human content into structured summaries, but never originate claims or invent local expertise | Human-researched tags/narrative first; AI assistance (if ever used) limited to reformatting already-cited content, always disclosed |
| School-controlled "premium profile" content (schools submit/curate their own tags) | Would reduce research burden; matches Niche's and most college-search platforms' "claim your profile" monetization model | Niche's own Premium Profile product exists to let schools pay for favorable placement and self-authored "From the School" marketing copy — a direct conflict-of-interest pattern journalists and researchers flag repeatedly (e.g., US News' 2022 scandal where universities submitted falsified data to a system they could influence) | School websites remain a *secondary, lower-reliability* source per the existing hierarchy (`school_website` = `secondary` reliability), never the tag's sole author or approver |
| Fabricated numeric confidence percentage on a tag ("87% confiança") | Feels more precise/data-driven than a qualitative label | UX research on confidence patterns is explicit that an uncalibrated percentage "manufactures trust and shatters the first time a high-confidence answer is wrong" — worse than no indicator at all | Three-tier qualitative confidence label (official / reputable journalism / triangulated community) always paired with the actual visible source list |
| Comparative superlative language inside `Perfil da escola` ("uma das melhores," "melhor opção para famílias STEM") | Feels more useful/decisive to a family under time pressure | Directly violates `docs/EDITORIAL_GUIDE.md` ("Do not describe a school as 'good,' 'bad,' 'best'...") and reproduces the exact steering effect that got GreatSchools and US News criticized | Descriptive, fit-oriented language tied to cited tags ("a escola destaca o ensino de ciências/STEM, apoiado por [fonte]; pergunte sobre X na visita") |
| Promoting new tags to directory filter chips or comparison columns this milestone | Natural next step once tags exist; would make the pilot immediately "useful" site-wide | Explicitly out of scope per `.planning/PROJECT.md` ("Promoting profile tags to directory cards or compare views — deferred until the pilot model is proven"); doing it now would scale an unvalidated taxonomy and undermine the pilot's purpose | Ship tags on profile pages only; revisit directory/compare promotion only after the pilot validates the taxonomy and maintenance cost |

## Feature Dependencies

```
Evidence hierarchy extension (official → journalism → triangulated community)
    └──requires──> Existing field-level evidence model (SchoolRecord.sources, per-field citations)
                       └──requires──> sourceId citation registry (already shipped, docs/DECISIONS.md)

Structured tag taxonomy (STEM, bilingual, arts, Ganztag, SESB, demand, inclusion, sports...)
    └──requires──> Evidence hierarchy extension
    └──requires──> Methodology framework (defines taxonomy scope, naming, and inclusion rules BEFORE tagging)

Triangulated community tag support
    └──requires──> Evidence hierarchy extension (adds a displayable "triangulated community" tier)
    └──requires──> Corroboration/independence log (which 2+ sources, why judged independent)

"Perfil da escola" PT-BR narrative
    └──requires──> Structured tag taxonomy (narrative synthesizes tags, doesn't precede them)
    └──requires──> Field-level evidence (existing) for any factual claim not covered by a tag

Methodology & research framework deliverable
    └──requires──> Nothing new technically; extends existing /methodology route and docs/RESEARCH.md, docs/DATA_MODEL.md, docs/EDITORIAL_GUIDE.md
    └──enhances──> Every other feature in this milestone (must exist BEFORE or alongside first pilot tags, not after)

Pilot on 3-5 Lichtenberg schools
    └──requires──> Methodology framework
    └──requires──> Structured tag taxonomy
    └──requires──> "Perfil da escola" narrative
    └──requires──> At least one real triangulated-community example (to prove the rule works, not just exists on paper)

Confidence label UI per tag ──enhances──> Structured tag taxonomy (adds clarity, not a blocker)
Tag provenance/changelog ──enhances──> Structured tag taxonomy (adds maintainability signal, not a blocker)
Correction workflow extension to tags/narrative ──enhances──> All of the above (trust parity, not a blocker)

[Directory/compare tag promotion, future] ──requires──> Validated pilot (this milestone) + explicit new decision to end the "profile-only" constraint

[AI-generated tags/narrative] ──conflicts──> [Human-reviewed evidence hierarchy] — do not combine (already out of scope)
[School-authored/self-submitted tag content] ──conflicts──> [Independent editorial voice / non-ranking positioning] — do not combine
[Numeric/star confidence score] ──conflicts──> [Qualitative confidence label] — pick one; the qualitative label is correct here
```

### Dependency Notes

- **Structured tags require the evidence hierarchy extension, which requires the existing field-level evidence model:** the tag is essentially a new "field type" that reuses the same `sources` array and `sourceId` citation mechanism `docs/DECISIONS.md` already established for fields — it should not need a parallel data structure.
- **Methodology framework must exist before or alongside the first tagged pilot school, not after:** every domain researched (ProPublica, College Scorecard, Steam Hardware Hub) publishes or fixes its methodology *before/with* the data it governs. Writing the methodology after tagging schools risks retrofitting rules to match whatever was already published, which is the opposite of the trust-first goal.
- **Triangulated community support requires a corroboration/independence log, which is a process artifact, not new UI:** the two-source rule researched here explicitly warns that "two sources" is meaningless if they share a single origin (e.g., both parents heard the same rumor) — the methodology must define what "independent" means for this product (e.g., different families, different school years, not both citing the same forum post) and the editorial workflow must record that judgment per tag.
- **`Perfil da escola` depends on tags, not the reverse:** the narrative is a synthesis layer. Writing narrative before tags exist risks the narrative asserting things no tag/citation backs, which is exactly what `docs/EDITORIAL_GUIDE.md` prohibits ("Do not make factual claims without citations").
- **Confidence label UI and tag provenance/changelog are enhancements, not blockers:** the pilot can ship with a minimal confidence label (three fixed tiers) and a simple "last reviewed" date; richer changelog UI can follow once the taxonomy is validated.
- **AI-generated content and school-self-authored tags both conflict with the milestone's trust model:** both are already excluded in `.planning/PROJECT.md` Out of Scope, and cross-domain research (US News data-falsification scandal, Niche's pay-to-play Premium Profiles, Lonely Planet's 2026 AI editorial policy) shows why competitors that allow either eventually face credibility problems.
- **Directory/compare tag promotion is downstream of this entire milestone, not parallel to it:** `.planning/PROJECT.md` already defers this explicitly; the roadmap should treat pilot validation as a gate, not a formality.

## MVP Definition

### Launch With (v1.2 pilot)

Minimum viable product — what's needed to validate that the evidence-backed profile model is trustworthy, repeatable, and maintainable.

- [ ] Tag data model extension (type, value, evidence array reusing existing `sourceId` citations, evidence tier) — essential to represent "what kind of school" beyond existing boolean/enum fields
- [ ] Evidence hierarchy extended with a displayable "triangulated community" tier (currently reserved-only per `docs/RESEARCH.md`) plus the explicit ≥2-independent-source, never-sole-basis rule — essential; this is the milestone's core trust mechanism
- [ ] Tag taxonomy v1 (STEM, bilingual, arts, Ganztag, SESB, demand-when-official, inclusion, sports, etc.), scoped and named before any school is tagged — essential to bound the pilot and make it repeatable
- [ ] Methodology & research framework update: standards, source hierarchy for tags, taxonomy, editorial voice for `Perfil da escola`, citation rules, maintenance/update cadence — essential; explicitly named as a milestone deliverable, not a byproduct
- [ ] `Perfil da escola` short PT-BR narrative per pilot school, generated from tags/fields, never introducing an uncited claim, never using superlative/ranking language — essential deliverable
- [ ] Confidence label (three fixed tiers, no numeric score) shown per tag — essential for the differentiator to be legible to parents, not just present in data
- [ ] 3-5 Lichtenberg pilot profiles fully tagged and narrated — essential to prove repeatability at small scale before any expansion
- [ ] Correction/report-issue path extended to explicitly cover tags and narrative, not just existing fields — essential for trust parity across the whole profile

### Add After Validation (v1.x)

Features to add once the pilot proves the model works and is maintainable.

- [ ] Tag provenance/changelog (added date, evidence at time of addition, last-reviewed date) — trigger: pilot tags exist long enough that staleness becomes a real, observable maintenance question
- [ ] Promote validated tags to directory filter chips and comparison columns — trigger: pilot demonstrates the taxonomy is stable and the evidence/triangulation workload is sustainable at scale
- [ ] Expand/revise tag taxonomy based on pilot gaps — trigger: pilot research surfaces school characteristics families care about that the v1 taxonomy doesn't capture
- [ ] Open Day questions auto-suggested per tag (extends existing `docs/EDITORIAL_GUIDE.md` Open Day Questions pattern to be tag-aware) — trigger: enough tags exist that generic questions feel redundant with tag-specific ones

### Future Consideration (v2+)

Features to defer until the pilot model and taxonomy are proven.

- [ ] User-configurable "compatibility" framing per family priorities (the only future-score exception `docs/COMPARISON.md` already conditionally allows: configurable, evidence-backed, presented as compatibility not quality) — defer: requires priority-weighting infrastructure not built yet, and depends on a stable tag taxonomy to weight against
- [ ] Broader geographic tag rollout beyond Lichtenberg — defer: `.planning/PROJECT.md` explicitly marks coverage expansion as secondary this milestone
- [ ] Structured community-observation submission flow (vs. researcher-sourced triangulation) — defer: introducing an intake mechanism before the triangulation *rule* is proven manually would risk scaling an unvalidated process, echoing Niche's self-report weakness

## Feature Prioritization Matrix

| Feature | User Value | Implementation Cost | Priority |
|---------|------------|----------------------|----------|
| Tag data model + evidence hierarchy extension | HIGH | MEDIUM | P1 |
| Tag taxonomy v1 definition | HIGH | LOW | P1 |
| Methodology/research framework update | HIGH | MEDIUM | P1 |
| Triangulation rule + independence log for community tags | HIGH | HIGH | P1 |
| `Perfil da escola` PT-BR narrative | HIGH | MEDIUM | P1 |
| Confidence label UI (3-tier, no score) | MEDIUM | LOW | P1 |
| Correction workflow extended to tags/narrative | MEDIUM | LOW | P1 |
| Pilot 3-5 Lichtenberg profiles fully tagged | HIGH | MEDIUM | P1 |
| Tag provenance/changelog UI | MEDIUM | MEDIUM | P2 |
| Tag-aware Open Day questions | MEDIUM | LOW | P2 |
| Promote tags to directory/compare | HIGH | MEDIUM | P3 (gated on pilot validation) |
| User-configurable compatibility framing | MEDIUM | HIGH | P3 |
| Community-observation submission intake flow | LOW-MEDIUM | HIGH | P3 |

**Priority key:**
- P1: Must have for the v1.2 pilot to prove the model
- P2: Should have, add once pilot data exists to justify it
- P3: Nice to have, explicitly gated behind future decisions already flagged in `.planning/PROJECT.md`

## Competitor / Analog Feature Analysis

| Feature dimension | Analog A | Analog B | Our approach |
|---------|--------------|--------------|--------------|
| Fact vs. opinion separation | GreatSchools/Niche: composite score blends test data, surveys, and reviews into one number with an opaque weighting formula | College Scorecard/College Navigator: pure federal facts, zero ranking, zero blending | Structured tags stay fact/evidence-based; `Perfil da escola` is clearly-labeled editorial synthesis layered on top, never blended into a score |
| Aggregate quality score | CMS Care Compare: 1-5 star rating shown to be "highly sensitive to technical specification" per peer-reviewed analysis | The Infatuation: explicit 1-10 opinionated score, openly framed as subjective ("like love, or politics") | No aggregate score of any kind (already decided); qualitative tags + existing evidence coverage percentage only |
| Source-type transparency | Niche: "Where Our Data Comes From" page lists sources but doesn't attribute individual claims/grades to a specific one | Wikipedia: every claim traceable to an inline citation; ProPublica: per-project methodology article | Per-tag citation reusing existing `sourceId` pattern; every tag traceable to its specific source(s), not a page-level list only |
| Community/anecdotal signal handling | Niche: unverified self-reported reviews surfaced directly, no independence check | Journalism (AP/NYT): anonymous/community claims require ≥2 independently-corroborating sources plus editorial sign-off, and even then are clearly attributed | Triangulated community tier: ≥2 independent sources required, always labeled "não oficial," never sole basis for a tag — closer to journalism's standard than any reviewed rating site |
| Methodology transparency | US News College Rankings: methodology exists but changes have been shown not to prevent gaming (2022 Columbia/Temple data-falsification scandal) | Steam Hardware Hub: dedicated methodology page separating official/reporting/community/analysis tiers with explicit confidence-level definitions | Versioned methodology deliverable (this milestone), extending existing `/methodology` route, published/updated alongside the taxonomy it governs |
| Editorial control / conflict of interest | Niche Premium Profile: schools pay for enhanced, self-authored profile content | Lonely Planet: named human editor signs off on every piece; AI limited to reformatting already-reported human content | School websites remain a secondary, lower-reliability source only; no school-authored or paid tag content; independent researcher-authored `Perfil da escola` |

## Sources

- GreatSchools ratings methodology and criticism — `greatschools.org/gk/about/ratings-methodology`, Chalkbeat (2019, 2022) on demographic bias in ratings — MEDIUM confidence (peer-reviewed economics research + investigative journalism, multiple independent sources agree)
- CMS Hospital Compare / Care Compare star rating critiques — JAMA Health Forum (2022) sensitivity analysis, AHA/KNG Health issue brief, Healthcare Economist critique — MEDIUM-HIGH confidence (peer-reviewed + industry association analysis)
- Wikipedia:Verifiability policy — HIGH confidence (primary/official source, policy text directly quoted)
- Niche.com "Where Our Data Comes From," Niche Premium Profile marketing pages, GradFax 2026 comparison of College Scorecard vs. Niche vs. US News — MEDIUM confidence (official source pages + one independent comparative review)
- The Infatuation ratings explainer and 2021 relaunch announcement — MEDIUM-HIGH confidence (official editorial policy pages)
- Lonely Planet AI editorial policy (2026) — HIGH confidence (primary/official source)
- Journalism two-source/corroboration rule — AP Statement of News Values and Principles, NYT anonymous sourcing guidelines, Al Jazeera investigative journalism training material — HIGH confidence (primary organizational policy documents, consistent across outlets)
- ProPublica project-specific methodology articles ("How We Analyzed...") — HIGH confidence (primary source, consistent pattern across many published investigations)
- College Scorecard / College Navigator as fact-only federal analog — MEDIUM confidence (secondary sources describing official tool, consistent across two independent write-ups)
- Confidence-label / uncertainty UI pattern research (avoid fabricated percentages, pair confidence with a concrete verification action) — MEDIUM confidence (practitioner UX writing, not peer-reviewed, but consistent across three independent sources)
- Steam Hardware Hub methodology page (official/reporting/community-signal/analysis tiering with defined confidence levels) — MEDIUM confidence (single strong analog outside the education/healthcare domain; directly transferable pattern but not itself an authoritative institution)
- Snopes fact-check rating definitions — MEDIUM-HIGH confidence (official source; illustrates why static unexplained labels get retired in favor of dated, explained research notes)
- Internal project documents used to ground all recommendations in existing product decisions: `.planning/PROJECT.md`, `docs/PRODUCT.md`, `docs/COMPARISON.md`, `docs/EDITORIAL_GUIDE.md`, `docs/RESEARCH.md`, `docs/DATA_MODEL.md`, `docs/DECISIONS.md`, and the current `src/features/schools/school/types.ts` schema

---
*Feature research for: evidence-backed qualitative school profile intelligence (Berlin School Guide v1.2)*
*Researched: 2026-07-26*
