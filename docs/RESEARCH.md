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
5. Independent journalism from established news outlets.
6. Triangulated community sources - independently corroborated community observations meeting the Community Source Independence rules below. May currently be cited only for the `active-school-community` tag (see `docs/DATA_MODEL.md`).
7. Parent reviews, forums, Google ratings, and social media.

Anecdotal parent signals (tier 7) remain reserved in the data model and are not displayed in V1, except for the triangulated community sources described in tier 6 above.

## Canonical Source Types

Structured data should use these source types:

- `official_government`: Berlin Senate, district, or other official public education source.
- `official_inspection`: official school inspection, quality report, or equivalent public accountability document.
- `school_website`: information published by the school itself.
- `public_dataset`: public statistical or directory dataset from a reliable institution.
- `journalism`: reporting from an established, independent news outlet.
- `triangulated_community`: a community observation independently corroborated per the Community Source Independence rules below; may currently be cited only for the `active-school-community` tag.
- `anecdotal_reserved`: parent reviews, forums, Google ratings, social media, or similar anecdotal signals reserved for possible future use.

## Reliability Levels

Reliability levels should reflect source authority for **factual** verification, not whether the information is favorable to a school. This axis is orthogonal to Canonical Source Types: community evidence is a `sourceType` (`triangulated_community`), not a reliability value. See Canonical Source Types and Community Source Independence for how community observations may be used.

- `primary`: official government, district, inspection, or public education source.
- `secondary`: school-published information, reliable public dataset, or independent journalism.
- `anecdotal`: subjective parent or community signal, including community observations that may be cited only under Community Source Independence rules (never as sole factual verification). Reserved from display when paired with `anecdotal_reserved`.
- `unknown`: source reliability has not yet been classified.

## Community Source Independence

Community-sourced observations may only be used for the `active-school-community` tag (see `docs/DATA_MODEL.md`'s Tag Taxonomy) and never as the sole basis for any tag; official corroboration should be sought where applicable.

- **Independence** means a different publisher or community origin - not merely a different URL or a different individual within the same venue. The guiding question is whether the observations could reasonably have arisen separately, not merely been repeated.
- **Echoes do not count** as independent corroboration: same-thread comments, cross-posts, screenshots or reposts of the same discussion, two Reddit threads about the same original post, or the same article republished elsewhere.
- **Acceptable independence examples:** a Reddit thread and a Facebook parent group; two unrelated Facebook groups with different moderation and membership; a parent blog and a Reddit thread; a local parent forum and a Facebook group.
- **Conflict fails closed:** when independent sources disagree, no tag is published. The research log may record supporting evidence, opposing evidence, and the reason for withholding the tag. Absence of a tag means insufficient evidence, not a negative signal.
- **Minimum source quality:** an active, multi-voice venue with more than one participant, recent enough to reflect the current school, and containing substantive discussion. A single testimonial or an abandoned page with one comment does not qualify.
- **Independence log:** each community source cited for a tag must be logged with venue/publisher, URL or stable identifier, date accessed, a one-line independence rationale versus the other corroborating source(s), and an echo-check note. Longer research reasoning belongs in research notes, not this required log.
- **Recency:** community sources should normally be within approximately 24 months of authoring or review. Older material may be used only when it clearly describes a durable characteristic still confirmed by current official information or other up-to-date evidence.

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

## Qualitative Review Cadence

Qualitative content - tags and the "Perfil da escola" narrative - is reviewed on a cadence distinct from the factual `research_status` recheck cycle. Qualitative review tracks its own field, `qualitativeLastReviewed`, defined in `docs/DATA_MODEL.md`, separate from `lastResearched` and `lastSourceChecked`. The cadence is hybrid: periodic and event-driven.

- **Periodic baseline:** all qualitative content is reviewed at least annually. Community-backed `active-school-community` tags must be revalidated at least every ~12 months, and community observations are revalidated on every qualitative review pass.
- **Event-driven triggers:** a qualitative review is also triggered by a major school website update, significant press coverage, a curriculum or program change, repeated correction reports about a school's qualitative content, or a methodology version change.
- **Methodology version changes:** when the methodology version changes (see `docs/DECISIONS.md`), every pilot school's qualitative content - tags and narrative - must be re-reviewed before the new methodology version is declared live.

## Correction Workflow

Every school page should include a way to report an issue or suggest an update.

Suggested corrections must be manually reviewed and verified against reliable sources before publication.
