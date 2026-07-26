# Pitfalls Research

**Domain:** Adding evidence-backed qualitative school characterizations (tags + PT-BR editorial + triangulated community sources) to an existing trust-first, anti-ranking Berlin school guide
**Researched:** 2026-07-26
**Confidence:** MEDIUM (German media-law case law and static-site precedent are well-documented; direct precedent for a *Brazilian-Portuguese, anti-ranking, evidence-labeled* school guide is thin, so several findings are extrapolated from adjacent domains — school-rating research, teacher-review case law, editorial guide practice — and flagged accordingly)

This research is scoped to **integration risk**: mistakes specific to *adding* qualitative/subjective content to a site whose existing product identity (`docs/COMPARISON.md`, `docs/RESEARCH.md`, `docs/DECISIONS.md`) is built on "no rankings, no quality scores, evidence coverage ≠ quality." Generic content-strategy pitfalls are omitted unless they interact with that existing identity.

## Critical Pitfalls

### Pitfall 1: Soft ranking language re-enters through the editorial back door

**What goes wrong:**
The site bans scores and "melhor escola" language at the structural level (`docs/DECISIONS.md`, `docs/COMPARISON.md`), but qualitative editorial prose is exactly where ranking language re-enters informally: "muito procurada," "reputação acadêmica forte," "uma das escolas mais bem vistas do bairro." None of these use a number or a star, so they pass a naive review, but they carry the same "objectively better" implication the product explicitly rejects — and they are *harder* to catch in review than a numeric score because they hide inside narrative.

**Why it happens:**
Editorial voice inherently reaches for evaluative shorthand ("well-regarded," "sought-after") because it is more readable than "we found N sources describing X." Writers under deadline pressure default to the register they've read elsewhere (school marketing copy, expat forums), and a single unreviewed adjective can undo the coverage/quality distinction the rest of the product spent v1.0–v1.1 establishing.

**How to avoid:**
- Extend `docs/EDITORIAL_GUIDE.md`'s existing "Claims" section with an explicit **banned/require-attribution word list** for reputation language ("procurada," "concorrida," "renomada," "reputação," "bem vista," "recomendada") — every use must be attributed to a named, dated, cited source and framed as *what someone said*, not *what is true* (e.g., "Segundo [fonte, ano], a escola é frequentemente mencionada em fóruns de pais como..." not "A escola tem uma forte reputação").
- Require every qualitative tag and editorial sentence to answer "reputation among whom, based on what, sourced from where, as of when?" before publication.
- Add a lint-style editorial checklist item (manual or automated keyword scan) run at pilot review and at every future profile addition, not just once at framework design time.

**Warning signs:**
- Draft profile prose reads fluently but a reviewer can't point to which sentence maps to which citation.
- A tag or phrase would still make sense if every citation were deleted — it isn't actually source-dependent.
- Internal reviewers start using the phrase "well-known that..." during profile writing.

**Phase to address:**
Editorial & Research Framework phase (voice rules, banned/attributed-language list) — enforced again as a gate in the Pilot Profile phase before any profile ships.

---

### Pitfall 2: Community-sourced "reputation" is legally different from a scored ranking, and the site's existing legal posture doesn't cover it

**What goes wrong:**
V1.0–v1.1 only published official-government and official-inspection-grade facts, so defamation/personality-rights exposure was minimal (facts sourced to the Senate/district are close to unimpeachable). Qualitative profiles introduce **subjective statements about a named institution's reputation**, sourced partly from community discussion — a materially different legal category. German courts (e.g., *spickmich.de*, OLG Köln 2007; OLG Karlsruhe 2008) protect teacher/school rating platforms under `Art. 5 GG` (Meinungsfreiheit) *only when* content is (a) a genuine value judgment (Meinungsäußerung), not a disguised factual claim (Tatsachenbehauptung) that can be proven true or false, (b) not "Schmähkritik" (abusive criticism with no factual substance), and (c) based on data already publicly accessible. Crucially, **deliberately incomplete or selectively curated reporting that creates a false overall impression is treated in German law as an untrue factual claim**, even if every individual quoted fragment is technically accurate — this is the exact risk profile of triangulating a few forum comments into a tidy editorial paragraph.

**Why it happens:**
The team correctly reasons "we're not publishing raw unverified reviews" (already decided against in `docs/DECISIONS.md`, "Do Not Display Parent-Review Signals In V1"), but doesn't realize that *editorializing a synthesis of community sentiment* — even hedged, even triangulated — reintroduces a similar exposure in a new form: now the site's own voice is the one asserting something about a named school's community standing, not just a hyperlinked third party.

**How to avoid:**
- Treat every reputation-adjacent editorial statement as if it must survive the Tatsachenbehauptung/Meinungsäußerung test: phrase as attributed opinion ("pais relatam...", "fóruns mencionam...") with source, date, and count/pattern context — never as the site's own assertion of fact ("a escola é...").
- Require triangulation minimums before any community-sourced claim ships (e.g., ≥2–3 independent sources, not one forum thread), and document the triangulation trail so it is auditable if challenged — this also directly defends against the "selectively incomplete reporting" trap, since an auditable trail forces completeness.
- Give schools a visible, low-friction correction/dispute path (`docs/RESEARCH.md` "Correction Workflow" already exists for facts — extend it explicitly to cover qualitative/reputation content) so schools can flag "não é uma representação justa" before this becomes a legal escalation.
- Avoid publishing anything that resembles a scored/ranked teacher- or leadership-level judgment (name a *program feature*, not a *person's competence*) — this is the line German courts have drawn between protected collective opinion about an institution and Persönlichkeitsrecht violations against a named individual.
- This is not general startup legal advice — flag for a real (German-qualified) legal review before the pilot goes live, given the site is public, named-school, and reputation-adjacent. [LOW confidence beyond the cited case law — case law analyzed concerns teacher-rating platforms specifically, not qualitative editorial school guides; treat as directional, not a legal opinion.]

**Warning signs:**
- A profile sentence would need to be deleted or rewritten if a school administrator complained — that's a sign it was stated as fact, not attributed opinion.
- Only one source supports a community-sentiment tag or claim.
- The correction workflow copy still only mentions factual corrections, not editorial/tag disputes.

**Phase to address:**
Editorial & Research Framework phase (voice + legal-safe phrasing patterns, triangulation minimums, correction workflow extension) — with an explicit legal-review checkpoint gating the Pilot Profile phase's publish step.

---

### Pitfall 3: Tag taxonomy becomes a proxy for "how well-documented is this school," not what the tag claims to measure

**What goes wrong:**
A tag like "forte apoio em alemão" or "comunidade internacional ativa" can only be assigned to schools that happen to have rich, discoverable sources (active website, press coverage, vocal parent forums, willing staff). Schools that are equally strong on that dimension but under-documented — often smaller, less digitally visible, less affluent, or serving communities less active in German-language online forums — simply don't get the tag. Applied across a pilot set and later scaled, this reproduces exactly the selection-bias failure mode documented in peer-reviewed research on GreatSchools-style ratings: the *rating* (here, presence/absence of a tag) tracks documentation/visibility and demographic composition of the parent body far more than it tracks the actual underlying quality or program the tag claims to describe (Angrist et al., NBER Working Paper 29608, "Race and the Mismeasure of School Quality"; Chalkbeat 2019/2022 investigative synthesis). A guide for Brazilian families is especially exposed here: schools with existing Portuguese/international-parent networks will accumulate more community evidence and more tags, while schools that might be equally or more suitable but lack that network will look "thin" — inverting the intended purpose of the tool.

**Why it happens:**
Tag taxonomy design typically starts from "what dimensions matter to parents" (correct) without a parallel check on "can this dimension be evidenced *consistently* across schools regardless of school size, resources, or existing community visibility" (often skipped, because it requires anticipating research friction before research happens).

**How to avoid:**
- For every candidate tag in the taxonomy, define upfront: minimum evidence bar, source types that qualify, and what "cannot confirm" looks like — a tag must be a first-class `missing`/`não confirmado` state, never silent absence.
- Explicitly surface tag *coverage* the same way field-level evidence coverage is surfaced (`docs/COMPARISON.md`) — e.g., "informação sobre isso não foi encontrada" as a visible, neutral state, not blank space that reads as "this school doesn't have that."
- During the 3–5 school pilot, deliberately include at least one lower-documentation-visibility school (not just the easiest, most web-present schools) specifically to pressure-test whether the taxonomy holds up when evidence is thin — see Pitfall 5 for the broader pilot-selection-bias risk this belongs to.
- Version the taxonomy (mirroring the existing "Version V1 Evidence Coverage Fields" decision pattern) so that tags added/removed/redefined later don't silently break consistency across schools profiled at different times.

**Warning signs:**
- Every pilot school with a "community" tag also happens to be the school with the most Google/forum presence.
- A tag's presence correlates more with "this school engaged with our outreach/has an active website" than with the substantive dimension the tag names.
- No pilot school ends up with a visible "não confirmado" tag state — 100% tag coverage on a 3–5 school pilot is itself a red flag for selection bias, not a success metric.

**Phase to address:**
Editorial & Research Framework phase (taxonomy design with mandatory `missing` state) — stress-tested during the Pilot Profile phase via deliberate inclusion of a low-documentation school.

---

### Pitfall 4: Citation density overwhelms the profile UI and paradoxically reduces trust and readability

**What goes wrong:**
The existing factual model already requires inline citations, a `Fontes` section, source dates, and two timestamps (`última pesquisa`, `última verificação das fontes`) per `docs/RESEARCH.md`. Qualitative editorial content plausibly needs *more* granular sourcing than facts (because a single editorial paragraph may synthesize 3–5 triangulated sources, each needing individual attribution to satisfy Pitfall 2's legal requirements) — but stacking citation markers, hedge language, and evidence-status badges into narrative prose can produce a profile that reads as a legal disclaimer wall rather than a helpful "o que é essa escola" summary, defeating the parent-centered-writing goal in `docs/EDITORIAL_GUIDE.md`.

**Why it happens:**
Each individual trust requirement (cite this, timestamp that, flag uncertainty here) is locally justified, but nobody owns the *aggregate* reading experience once they're all stacked on a short qualitative paragraph — this is a classic "sum of locally correct decisions, globally bad UX" trap, and it's invisible until a real editorial paragraph is drafted with real citations, not a wireframe with placeholder text.

**How to avoid:**
- Prototype the *actual* citation-dense qualitative section (not a lorem-ipsum mockup) as one of the first pilot-phase artifacts, specifically to test citation density before the pattern is applied to 3–5 schools.
- Prefer a consolidated per-section evidence note ("com base em 3 fontes, incluindo [official] e [triangulated community], atualizado em [date] — ver Fontes") over inline superscript citations on every clause; reserve inline citations for single, high-stakes factual claims (matching existing factual-field pattern), not for every sentence of narrative synthesis.
- Reuse and extend the existing `Fontes` consolidated-sources pattern rather than inventing a second, parallel citation UI just for qualitative content — a second citation system next to the existing one is itself a maintenance and comprehension burden.
- User-test (even informally, with 2-3 target parents) whether the qualitative section reads as "here's what we found" or "here's a legal disclaimer" before pilot publish.

**Warning signs:**
- The qualitative "Perfil da escola" section is visually dominated by citation markers/badges rather than by the description itself.
- Internal reviewers say "this is hard to read" about a paragraph that is factually/legally sound.
- The pattern requires a different citation UI component than the one already used for factual fields.

**Phase to address:**
Pilot Profile phase (first real prototype with real citations) — with a UI-pattern decision made in the Editorial & Research Framework phase before scaling past the pilot.

---

### Pitfall 5: Pilot school and pilot source selection is itself a hidden editorial decision that biases the whole methodology

**What goes wrong:**
Choosing "3–5 representative Lichtenberg schools" (per `.planning/PROJECT.md`) sounds neutral, but *which* 3–5 get picked, and *which* community sources are consulted per school, are both editorial judgment calls that will shape whether the resulting methodology generalizes. If the team (consciously or not) picks the schools that are easiest to research — most web presence, most willing staff contact, most existing Portuguese-speaking-parent network, best English/German source availability — the "validated" methodology will only have been proven against the *easy* case, and will predictably strain or break when applied later to a harder, less-documented, or lower-visibility school. Similarly, if community sources are limited to whichever Facebook group or forum thread is easiest to find, the "triangulated community" evidence for different schools may draw from structurally different, non-comparable source pools (a well-organized Portuguese-parent WhatsApp group vs. a generic German neighborhood forum), which undermines cross-school comparability even though no single school's profile is individually "wrong."

**Why it happens:**
Pilot selection almost always optimizes for "can we actually finish this in the pilot," which is a legitimate constraint — but that constraint quietly becomes the *de facto* generalization criterion unless it's named and checked explicitly.

**How to avoid:**
- Write down the pilot selection criteria *before* picking schools (e.g., deliberately span at least one high-documentation and one low-documentation school, span more than one `Schulform`/profile type already used in the directory, avoid selecting only schools where research contacts are personally known) and record the rationale in the methodology deliverable itself so future expansion phases can audit whether the pilot was representative or convenient.
- For each pilot school, log *what source pool was available and consulted* as part of the methodology artifact, not just the resulting profile — this makes source-pool inconsistency visible and auditable rather than buried inside five independently "fine" profiles.
- Explicitly ask, as a pilot-close checkpoint: "would this methodology still work on the hardest, least-documented school in Lichtenberg?" — if the honest answer is no, the methodology isn't validated yet, regardless of how good the 3–5 pilot profiles look.

**Warning signs:**
- All pilot schools were chosen partly because "we already had some information" or "staff responded to our outreach."
- Nobody can explain, after the fact, why these specific 3–5 schools (versus other Lichtenberg schools) were chosen.
- Community source types differ significantly in kind (not just quantity) from one pilot school to the next.

**Phase to address:**
Editorial & Research Framework phase (write selection criteria before picking schools) — verified at Pilot Profile phase close via the "hardest case" checkpoint question.

---

### Pitfall 6: Evidence/tag density gets read by parents as a quality signal despite everything the copy says

**What goes wrong:**
This is `docs/DECISIONS.md`'s existing "evidence coverage ≠ quality" risk, but qualitative profiles make it *worse*, not just repeated. A factual evidence-coverage percentage is at least abstract and numeric, which somewhat resists being misread as "good/bad." A rich, well-written qualitative "Perfil da escola" narrative with 6 tags and a warm editorial tone, sitting next to a sparse school with 1 tag and a "poucas informações disponíveis" note, will *look and feel* like a strength/weakness comparison to a parent scanning the directory — even though the actual difference may only be "we found more sources for School A." This is the single hardest failure mode to prevent because it's a perceptual effect of the UI, not a wording problem that editorial-guide rules can fully fix.

**Why it happens:**
Written disclaimers ("evidence coverage não é uma nota de qualidade da escola" already exists in `docs/COMPARISON.md`) address explicit claims, but humans pattern-match on visual density and narrative richness faster than they read caveats — a well-established finding in how parents actually use school-comparison tools (available/vividness bias: parents anchor on the richest, most narratively memorable signal, per general school-choice decision-research). Adding qualitative content increases the density gap between well-researched and under-researched profiles, which increases the size of this perceptual illusion even if every sentence is individually honest and caveated.

**How to avoid:**
- Treat "sparse-but-honest" as a first-class designed state, not a fallback — a school with little qualitative evidence should have a profile section that reads as *complete in its own right* ("aqui está o que confirmamos até agora sobre o perfil desta escola; veja Fontes"), not as an empty/broken-looking gap next to a richer neighbor.
- Keep qualitative "Perfil da escola" content editorially, visually separated from directory/comparison surfaces for this milestone — `.planning/PROJECT.md` already scopes tags to profile pages only, deferring directory-card and compare-view exposure; treat that boundary as a load-bearing decision, not a placeholder, precisely because density-as-quality-signal risk compounds once tags appear in a side-by-side comparison UI.
- When (in a later milestone) tags do reach directory/compare surfaces, require an explicit design review of whether tag/profile density visually reads as ranking before shipping, since that is exactly where this pitfall will resurface with more force.
- Route this in `docs/DECISIONS.md`/`docs/COMPARISON.md` as an extension of the existing "evidence coverage ≠ quality" principle, explicitly naming "qualitative richness ≠ quality" alongside it, so the next milestone inherits the framing rather than rediscovering it.

**Warning signs:**
- Internal reviewers, shown two pilot profiles side by side, instinctively say "this one seems better" — if the team feels that pull despite knowing the caveats, parents will feel it more.
- Product conversations start using "which schools have good profiles" as informal shorthand for "which schools are good."
- Pressure emerges to promote tags to directory cards before the profile-only pilot has actually been evaluated for this exact risk.

**Phase to address:**
Editorial & Research Framework phase (design the sparse-state pattern; extend the coverage≠quality decision explicitly to qualitative content) — checked again at Pilot Profile phase review by comparing pilot profiles side by side for felt "better/worse" impressions among reviewers.

---

### Pitfall 7: Qualitative editorial content goes stale faster than the maintenance model assumes, and nothing flags it

**What goes wrong:**
Official factual fields (Ganztag offered, grade range, address) change slowly and are re-verifiable against an authoritative source at low cost. Qualitative claims about "reputação," "comunidade," or "clima escolar" are inherently time-bound — a new Schulleitung, a single bad semester, a community Facebook thread that ages out — and the *source material itself* (forum threads, informal community sentiment) has no natural "last updated" signal the way an official Senate page does. Without a distinct maintenance cadence for qualitative content, it will silently age past its useful accuracy while the site's existing `última pesquisa` / `última verificação das fontes` timestamps (per `docs/RESEARCH.md`) create a false impression of currency, because those timestamps were designed for slower-moving factual data.

**Why it happens:**
The existing correction/maintenance workflow (`docs/RESEARCH.md` "Correction Workflow") was designed and validated against factual fields with a "recheck against reliable sources" model. Qualitative content doesn't fail the same way — it doesn't become "wrong" so much as "outdated in tone or no longer representative" — so the same workflow won't naturally catch it, and nobody has explicitly decided who re-reviews qualitative prose or how often, since it's a genuinely new maintenance category, not a scaled-up version of the old one.

**How to avoid:**
- Define an explicit, shorter review cadence for qualitative/community-sourced content than for official-source facts (e.g., community-sourced tags/prose reviewed at N-month intervals regardless of correction reports, vs. fact rechecking triggered mainly by reports or known events) — and state this cadence difference in the methodology deliverable so it's a decision, not an oversight.
- Extend `docs/RESEARCH.md`'s `research_status` model (or add a parallel field) to distinguish "qualitative content last reviewed" from "factual sources last verified," since a school could have fresh facts and stale editorial narrative, or vice versa — collapsing both into one timestamp hides which one is true.
- Budget qualitative-content maintenance cost explicitly as part of the pilot's success evaluation ("is 3–5 schools' worth of qualitative maintenance sustainable if we scale to 20–30 schools?") rather than only evaluating whether the *initial* profiles were good — the milestone goal is explicitly about proving *repeatable and maintainable*, per `.planning/PROJECT.md`, so maintenance cost has to be measured during the pilot, not assumed.

**Warning signs:**
- The methodology deliverable defines how to *create* a qualitative profile but not how or when to *re-review* one.
- `última verificação das fontes` shows a recent date on a profile whose qualitative narrative is actually based on a two-year-old forum thread.
- Nobody can answer "who re-reviews the community-sourced tags, and on what trigger" during pilot close-out.

**Phase to address:**
Editorial & Research Framework phase (define qualitative-specific maintenance cadence and status field) — cost explicitly measured as a Pilot Profile phase exit criterion, not assumed.

---

### Pitfall 8: Translating hedged German-language legal/source nuance into confident-sounding Brazilian Portuguese loses the hedge

**What goes wrong:**
Source material (school inspection notes, forum posts, German-language community discussion) often carries hedges, qualifiers, and register that don't survive translation into fluent, natural Brazilian Portuguese editorial prose — "einige Eltern berichten" (a hedge: *some* parents report) can drift into "pais relatam" (reads as a general, near-universal claim) once a writer smooths it for readability. Given `docs/EDITORIAL_GUIDE.md`'s tone requirement ("practical, analytical, neutral, approachable"), there's active pressure toward fluent, confident prose — which is precisely the direction that erodes hedging, and precisely where Pitfall 1 (soft ranking language) and Pitfall 2 (legal exposure) both re-enter through translation rather than through original composition.

**Why it happens:**
Translation-while-editorializing is a single pass for most contributors, so the "preserve the hedge" instruction competes directly with "write it well" — and "write it well" is the instruction that's visible in every editorial guideline, while "preserve the source's exact degree of certainty" is not currently written down anywhere in `docs/EDITORIAL_GUIDE.md`.

**How to avoid:**
- Add an explicit rule to `docs/EDITORIAL_GUIDE.md`: quantifier/hedge words in source material (algumas/muitas/a maioria/poucos parents; "einige"/"viele"/"die meisten") must be preserved with equivalent specificity in the PT-BR version — translation review should check *degree of certainty preserved*, not just factual accuracy of the translated content.
- Have a second reviewer specifically re-check translated/synthesized qualitative claims against the *original-language* source (not just the drafted PT-BR text) before publish, since a review pass that only reads the PT-BR draft can't catch a hedge that was already lost in the first pass.

**Warning signs:**
- PT-BR editorial prose sounds more confident/definitive than the underlying non-English/non-Portuguese source material, when back-translated informally.
- Reviewers only ever read the final PT-BR draft, never the original source, during qualitative content review.

**Phase to address:**
Editorial & Research Framework phase (hedge-preservation rule added to editorial guide) — enforced during Pilot Profile phase review via source-language spot-checks.

---

## Technical Debt Patterns

| Shortcut | Immediate Benefit | Long-term Cost | When Acceptable |
|----------|-------------------|-----------------|------------------|
| Reuse the factual-field citation UI unchanged for qualitative content instead of designing for citation density (Pitfall 4) | Faster pilot ship, no new component work | Profile pages read as disclaimer walls once real multi-source qualitative citations are added; expensive redesign after 3–5 profiles already published in that pattern | Never for the pilot itself — the pilot is exactly when this should be tested; acceptable only as a throwaway internal prototype, not as shipped pilot content |
| Skip writing down pilot school/source selection criteria and just pick "whatever schools we can finish" (Pitfall 5) | Pilot ships faster | Methodology looks validated but is only proven on easy cases; expansion to harder schools later reveals gaps that should have surfaced in the pilot | Never — the cost of documenting criteria is low and the milestone's stated goal is proving a *repeatable* methodology |
| Collapse qualitative-content maintenance into the existing fact-recheck cadence instead of defining a separate one (Pitfall 7) | One maintenance model instead of two to design and communicate | Qualitative content silently goes stale behind a timestamp that implies it's current; discovered only when a school or parent flags outdated reputation content | Acceptable only if explicitly time-boxed as "pilot-only, revisit before scaling past 5 schools" and written down as a known gap |
| Let one contributor draft, translate, and self-review qualitative prose end-to-end without a source-language spot-check (Pitfall 8) | Faster single-pass content production | Hedge/quantifier loss and soft-ranking-language creep both slip through unnoticed | Only acceptable for internal draft iterations, never for the version that ships to the pilot |

## Integration Gotchas

| Integration | Common Mistake | Correct Approach |
|-------------|----------------|-------------------|
| Existing `sources`/citation data model (school-level sources, field-level `sourceId` references, per `docs/DECISIONS.md`) | Treating qualitative/tag evidence as a single citation on the whole profile, or bolting on a separate ad hoc citation mechanism | Extend the existing school-level `sources` + `sourceId` reference pattern to cover tags and editorial paragraphs so qualitative content is auditable the same way factual fields are, without inventing a parallel system |
| Existing `research_status` model (`directory_only` → `profile_ready` etc., per `docs/RESEARCH.md`) | Assuming a school's existing factual research status also describes its qualitative-content readiness | Add or extend status tracking so qualitative-content status (drafted / triangulated / reviewed / needs re-review) is visible independently of factual `research_status`, since the two can diverge (see Pitfall 7) |
| Existing correction/report-an-issue workflow (`docs/RESEARCH.md`) | Assuming the existing "suggest a correction" flow, built for factual errors, naturally covers "this characterization feels unfair/inaccurate" disputes about editorial or tag content | Explicitly extend the correction workflow copy and triage process to name editorial/reputation disputes as a distinct category, since these require source-triangulation re-review rather than simple fact-recheck (see Pitfall 2) |
| Existing anti-ranking product decisions (`docs/COMPARISON.md`, `docs/DECISIONS.md`) | Treating those decisions as already "handling" qualitative content because they were written for factual/numeric rankings | Explicitly extend the written decision record to cover qualitative richness and tag density as ranking-adjacent risks (Pitfall 6), rather than assuming the old decision text implicitly covers a case it wasn't written for |

## UX Pitfalls

| Pitfall | User Impact | Better Approach |
|---------|-------------|-------------------|
| Citation-dense qualitative sections read as a legal disclaimer wall (Pitfall 4) | Parents skim past or distrust the section instead of reading it | Consolidated per-section evidence notes; reserve inline citation markers for single high-stakes factual claims |
| Rich profile next to sparse profile in the same UI pattern (Pitfall 6) | Parents unconsciously read density as quality despite disclaimers | Design the sparse/low-evidence state as complete-feeling on its own terms, not as a visibly empty gap |
| Tags rendered as a flat list of positive attributes with no visible "não confirmado" state (Pitfall 3) | Absence of a tag reads as "this school lacks that," when it may just mean "we couldn't confirm this" | Always render a neutral "informação não encontrada" state for any taxonomy dimension the school was evaluated against but couldn't be confirmed |

## "Looks Done But Isn't" Checklist

- [ ] **Editorial voice guide update:** Often missing an explicit banned/attributed-language list for reputation terms — verify `docs/EDITORIAL_GUIDE.md` names specific words requiring attribution, not just a general "avoid unsupported claims" principle (Pitfall 1).
- [ ] **Tag taxonomy:** Often missing a defined `missing`/`não confirmado` state per tag — verify at least one pilot school actually displays that state, not just positive tags (Pitfall 3).
- [ ] **Citation UI for qualitative content:** Often prototyped only with placeholder text — verify it's been tested with a real, multi-source, triangulated qualitative paragraph before pilot publish (Pitfall 4).
- [ ] **Pilot selection rationale:** Often decided informally and never written down — verify the methodology deliverable documents *why* these specific 3–5 schools and community sources were chosen (Pitfall 5).
- [ ] **Qualitative content maintenance cadence:** Often absent because the factual recheck cadence is assumed to cover it — verify a distinct qualitative-review trigger/interval is documented (Pitfall 7).
- [ ] **Correction workflow coverage:** Often still only mentions factual corrections — verify it explicitly names editorial/reputation disputes as a distinct, handled category (Pitfall 2).
- [ ] **Legal review:** Often skipped because "we're not publishing raw reviews" — verify someone has actually checked the *synthesized editorial* content (not just the decision to exclude raw reviews) against defamation/personality-rights exposure before pilot publish (Pitfall 2).

## Recovery Strategies

| Pitfall | Recovery Cost | Recovery Steps |
|---------|----------------|------------------|
| Soft ranking language shipped in pilot profiles (Pitfall 1) | LOW | Targeted copy edit pass against the banned/attributed-language list; no data-model change needed |
| Tag taxonomy proven biased toward well-documented schools after pilot (Pitfall 3) | MEDIUM | Re-run taxonomy against a deliberately low-documentation school before scaling; may require redefining 1–2 tags' evidence bar, not a full redesign if caught during pilot |
| Citation UI overwhelms readability (Pitfall 4) | MEDIUM | Redesign to consolidated evidence-note pattern; affects only the pilot's 3–5 profiles if caught before scaling, expensive if caught after 20+ profiles exist |
| Pilot selection later found unrepresentative (Pitfall 5) | HIGH | Requires re-validating methodology against a genuinely hard school before trusting it for broader rollout — effectively repeats part of the pilot |
| Qualitative content found stale with no review trigger (Pitfall 7) | MEDIUM | Retroactive one-time review pass across pilot profiles plus adding the missing status field/cadence going forward |
| Legal/reputation complaint from a named school (Pitfall 2) | HIGH | Immediate correction-workflow response, likely takedown/rewrite of the disputed section pending review, and a retroactive audit of similarly-sourced claims on other pilot profiles |

## Pitfall-to-Phase Mapping

| Pitfall | Prevention Phase | Verification |
|---------|-------------------|----------------|
| 1. Soft ranking language via editorial prose | Editorial & Research Framework phase | Banned/attributed-language list exists in `docs/EDITORIAL_GUIDE.md`; pilot profiles pass a keyword scan with zero unattributed instances |
| 2. Legal exposure from reputation-adjacent community synthesis | Editorial & Research Framework phase (rules + workflow) / gate at Pilot Profile phase publish | Triangulation minimum documented and met per claim; correction workflow explicitly covers editorial disputes; legal review checkpoint completed before pilot publish |
| 3. Tag taxonomy biased toward well-documented schools | Editorial & Research Framework phase (taxonomy design) | At least one pilot school shows a genuine `não confirmado` tag state; taxonomy stress-tested against a low-documentation school |
| 4. Citation density overwhelms UI | Pilot Profile phase (first real prototype) | A real multi-source qualitative section is drafted and reviewed for readability before the pattern is applied to all pilot schools |
| 5. Pilot selection bias | Editorial & Research Framework phase (criteria written before selection) | Methodology deliverable documents selection rationale and source-pool differences per school; "hardest case" question answered explicitly at pilot close |
| 6. Evidence/tag density read as quality | Editorial & Research Framework phase (extend coverage≠quality decision) | Sparse-state pattern designed and reviewed; reviewers explicitly checked for felt "better/worse" impression across pilot profiles |
| 7. Qualitative content staleness | Editorial & Research Framework phase (cadence + status field) | Distinct qualitative-review status/trigger exists and is exercised at least once during pilot; maintenance cost estimated for scaling |
| 8. Hedge loss in translation | Editorial & Research Framework phase (hedge-preservation rule) | Source-language spot-check performed on pilot qualitative content by a second reviewer |

## Sources

- `docs/COMPARISON.md`, `docs/RESEARCH.md`, `docs/EDITORIAL_GUIDE.md`, `docs/DECISIONS.md`, `.planning/PROJECT.md` (internal — existing product decisions this milestone must integrate with, HIGH confidence)
- OLG Köln, *spickmich.de II*, JurPC-Web-Dok. 0196/2007 — German case law on teacher/school rating platforms, Meinungsfreiheit (Art. 5 GG) vs. Tatsachenbehauptung distinction (MEDIUM confidence; direct precedent is about teacher ratings, extrapolated to school-reputation editorial content)
- OLG Karlsruhe, 03.07.2008, 15 U 43/08; LG Duisburg, 18.04.2008, 10 O 350/07 — corroborating case law on the same distinction and on use of publicly available data (MEDIUM confidence)
- Carter-Ruck, "Defamation, Privacy and Data Protection Law in Germany" — general framework on Tatsachenbehauptung vs. Meinungsäußerung and "selectively incomplete reporting treated as untrue factual claim" (MEDIUM confidence, general legal-guide source, not case-specific)
- Angrist, Hull, Pathak, Walters, "Race and the Mismeasure of School Quality," NBER Working Paper 29608 / Blueprint Labs (MIT) — empirical evidence that school ratings/metrics reflect selection bias and demographic composition rather than causal school quality (HIGH confidence, peer-reviewed economics research; directly informs Pitfall 3's tag-taxonomy risk by analogy)
- Chalkbeat, "How GreatSchools steers you toward whiter, more affluent schools" (2019) and "Study: Common school ratings biased, often inaccurate" (2022) — investigative journalism synthesizing the above research for a general audience (MEDIUM confidence, journalism verified against the underlying academic source)
- General web search synthesis on parent school-choice decision biases (availability/confirmation bias, peer-network overweighting) and 2025–2026 shifts in school-reputation platforms (e.g., Google removing K–12 review ratings in 2025) — LOW-MEDIUM confidence, aggregated marketing/edtech commentary rather than primary research; used only as directional support for Pitfall 6, not as a standalone claim

---
*Pitfalls research for: Evidence-backed qualitative school profile intelligence (v1.2 milestone) — Berlin School Guide*
*Researched: 2026-07-26*
