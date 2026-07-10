# Research

## Research Standard

Every factual school attribute should be supported by evidence.

If a claim cannot be verified, it should be omitted, marked as missing, or labeled `não confirmado`, depending on the context.

## Source Hierarchy

Sources should be evaluated in this order:

1. Official Berlin Senate, district, or public education sources.
2. Official school inspection or quality reports.
3. Individual school websites.
4. Public statistical datasets.
5. Parent reviews, forums, Google ratings, and social media.

Anecdotal parent signals are reserved in the data model but should not be displayed in V1.

## Canonical Source Types

Structured data should use these source types:

- `official_government`: Berlin Senate, district, or other official public education source.
- `official_inspection`: official school inspection, quality report, or equivalent public accountability document.
- `school_website`: information published by the school itself.
- `public_dataset`: public statistical or directory dataset from a reliable institution.
- `anecdotal_reserved`: parent reviews, forums, Google ratings, social media, or similar anecdotal signals reserved for possible future use.

## Reliability Levels

Reliability levels should reflect source authority, not whether the information is favorable to a school:

- `primary`: official government, district, inspection, or public education source.
- `secondary`: school-published information or reliable public dataset.
- `anecdotal`: subjective parent or community signal. Reserved in the data model but not displayed in V1.
- `unknown`: source reliability has not yet been classified.

## Citation Requirements

Every factual school attribute requires a source.

School pages should include:

- inline citations for factual claims;
- a consolidated `Fontes` section;
- source dates when available;
- `última pesquisa`;
- `última verificação das fontes`.

## Conflicting Information

When sources conflict:

- prefer official sources over school websites;
- preserve uncertainty when the conflict cannot be resolved;
- mark the affected field as `não confirmado`;
- include notes explaining the conflict where useful.

Do not silently choose the more convenient source.

## Inspection Availability

The V1 inspection filter should use these values:

- `available`: an official inspection or quality source was found.
- `unavailable`: no official inspection or quality source is available for this school.
- `not_confirmed`: research has not confirmed whether an official inspection or quality source exists.

Inspection availability must never be interpreted as school quality.

## Missing Information

Missing information should be shown clearly. Missing data is not a negative judgment about the school. It means the information was not found or could not be verified during research.

## Research Status

A school may have one of these statuses:

- `directory_only`: basic directory data only;
- `in_research`: detailed research started but incomplete;
- `profile_ready`: detailed profile meets the minimum publication standard;
- `needs_review`: published or draft data needs source rechecking;
- `blocked`: research cannot proceed because key sources are unavailable or contradictory.

## Correction Workflow

Every school page should include a way to report an issue or suggest an update.

Suggested corrections must be manually reviewed and verified against reliable sources before publication.
