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

## Anecdotal Signals

The data model may reserve space for anecdotal parent signals, but these should not be displayed in V1.

No third-party review scraping should be implemented in V1.

## Open Day Questions

Detailed school profiles should include generated or curated questions for families to ask during school visits.

Questions should be based on:

- verified strengths;
- missing information;
- unclear claims;
- unique school characteristics;
- practical concerns for Brazilian and international families.
