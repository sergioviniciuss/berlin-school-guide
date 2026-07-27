# Data Model

## Principles

School data should be structured, validated, and separate from narrative content.

Structured data should support static generation and be validated with Zod.

Narrative guides and editorial notes may be written in MDX.

The model should be extensible enough to support future education levels, such as secondary schools, without breaking existing primary-school data. Do not generalize the V1 model prematurely: primary-school requirements remain the priority.

## School Terminology

V1 focuses on primary schools (`Grundschule`).

Public/private is a school classification.

Bilingual and international are school attributes, not school types.

Mixed-level schools may be included only when their primary-school section can be represented clearly.

## Geographic Terminology

Structured geographic data should use official Berlin terms:

- `district`: Berlin `Bezirk`; Portuguese label: `Distrito`.
- `neighbourhood`: official Berlin `Ortsteil`; Portuguese label: `Bairro`.

Informal `Kiez` names may be added later as optional aliases for display or search, but they are not canonical geographic data in V1.

## School Coverage Levels

A school may appear as:

- a basic directory entry;
- a detailed researched profile.

Basic entries require only official or easily verifiable metadata.

Detailed profiles require field-level citations and research notes.

## Minimum School Fields

School profiles should support:

- name;
- school number;
- type;
- public/private;
- district;
- neighbourhood;
- address;
- website;
- grades served;
- Ganztag model;
- after-school care;
- languages;
- bilingual or international programs;
- welcome classes;
- school profile;
- pedagogy or focus areas;
- inclusion and support services;
- transition path after grade 6;
- communication with families;
- official inspection availability;
- official inspection data;
- facilities;
- citations per attribute;
- evidence coverage;
- research status;
- editorial notes in Portuguese;
- last researched date;
- last source checked date.

## Field Evidence

Each factual field should support multiple source entries.

A source entry should include:

- source title;
- source URL;
- source type;
- publisher or institution;
- date accessed;
- date published, when available;
- reliability level;
- notes, when useful.

Source types and reliability levels are defined in `docs/RESEARCH.md`.

## Evidence Coverage Calculation

Evidence coverage measures research completeness, never school quality.

Only fields explicitly marked as important for V1 count toward the denominator.

A field counts as verified only when it has at least one acceptable source and no unresolved material conflict.

Missing, unverified, outdated, or materially conflicting fields do not count as verified.

Optional or school-specific fields do not count unless explicitly designated as important.

`not_applicable` fields are excluded from both numerator and denominator.

The canonical list of important V1 fields will be defined during M3 and versioned so future calculation changes remain explicit.

### V1 Important Fields

Evidence coverage version `v1` uses these important fields:

- name;
- school number;
- website;
- public/private classification;
- school level;
- district;
- neighbourhood;
- address;
- grades served;
- Ganztag model;
- after-school care;
- languages;
- bilingual programs;
- international programs;
- welcome classes;
- school profile;
- pedagogy or focus areas;
- inclusion and support services;
- transition path after grade 6;
- communication with families;
- official inspection availability;
- official inspection data;
- facilities.

Internal metadata such as IDs, slugs, sources, research status, and research dates does not count toward evidence coverage.

### Field Evidence Statuses

Factual fields should use one of these statuses:

- `verified`: the field has a non-null value, at least one acceptable citation, and no unresolved material conflict;
- `missing`: the information was not found during research;
- `unverified`: a value exists but has no acceptable supporting source;
- `outdated`: the value exists but needs source rechecking;
- `conflicting`: sources materially disagree and the conflict must be explained;
- `not_applicable`: the field does not apply and is excluded from evidence coverage.

## Anecdotal Signals

The data model may reserve space for anecdotal parent signals, but these should not be displayed in V1.

No third-party review scraping should be implemented in V1.

## Tag Taxonomy

Tags are a closed, versioned taxonomy - v1 defines exactly 10 tag IDs across 4 categories. A tag describes a sustained, decision-relevant characteristic of a school, not an isolated project, a generic claim, or documentation richness. A tag differs from a factual field: a factual field answers "what does this school have?"; a tag answers "what kind of school is this?" (for example, a verified `ganztag` value does not automatically justify the `all-day-model` tag, and a bilingual/SESB program does not automatically justify `bilingual-program`).

### v1 Tag Categories

- **Academic focus:** `stem-focus`, `languages-focus`, `arts-music-focus`.
- **Learning model:** `bilingual-program`, `special-pedagogical-model`, `all-day-model`.
- **Student support:** `inclusion-support`, `transition-support`.
- **School environment:** `structured-learning-environment`, `active-school-community`.

Each tag must cite at least one evidence source and carry a qualitative confidence label describing evidence strength, never school quality (see `docs/EDITORIAL_GUIDE.md`).

`active-school-community` is the only v1 tag that may be supported by community evidence, and only when corroborated by an independent source per `docs/RESEARCH.md`'s Community Source Independence rules; it may never be the sole basis, and it never implies that the community is "better." All other v1 tags require official and/or journalism sources only.

A "High demand" tag (admissions pressure or popularity) is explicitly out of v1 - it measures demand, not school-child match, and cannot be evidenced comparably across schools. Full taxonomy IDs, categories, and evidence rules are structural decisions recorded in `docs/DECISIONS.md`.

## Qualitative Review Tracking

Qualitative content (tags and the "Perfil da escola" narrative) is tracked with its own field, `qualitativeLastReviewed`, separate from the factual `research.lastResearched` and `research.lastSourceChecked` fields. `research_status` and its recheck cadence continue to describe only factual field completeness; `qualitativeLastReviewed` describes when a school's tags and narrative were last reviewed under the qualitative review cadence.

This section documents the field's intended semantics; Phase 13 implements it on the school schema. `qualitativeLastReviewed` should record an ISO `YYYY-MM-DD` date and be updated whenever a school's qualitative content is reviewed under the cadence documented in `docs/RESEARCH.md`'s Qualitative Review Cadence section - whether the periodic annual baseline or an event-driven trigger.

## Open Day Questions

Detailed school profiles should include generated or curated questions for families to ask during school visits.

Questions should be based on:

- verified strengths;
- missing information;
- unclear claims;
- unique school characteristics;
- practical concerns for Brazilian and international families.
