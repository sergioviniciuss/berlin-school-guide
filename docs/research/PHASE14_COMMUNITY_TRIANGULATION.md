# Phase 14 Community Triangulation — Lew-Tolstoi-Schule

**Research date:** 2026-07-29  
**School:** Lew-Tolstoi-Schule (`lew-tolstoi-schule`, 11G12, Karlshorst)  
**Tag under review:** `active-school-community`  
**Decision:** **withhold** (fail-closed)

## Purpose

Exercise PILOT-03 end-to-end for the provisional community-evidence candidate named in [PILOT_SELECTION.md](./PILOT_SELECTION.md). Independence and never-sole-basis rules follow [docs/RESEARCH.md](../RESEARCH.md) — Community Source Independence. A published community tag is not required for phase success when thresholds are not met ([CONTEXT D-12–D-14](../../.planning/phases/14-pilot-profile-content/14-CONTEXT.md)).

## Venues checked

| Venue | URL / identifier | Role assessed | Independence / echo notes |
|-------|------------------|---------------|----------------------------|
| School homepage (generic) | https://lew-tolstoi-schule.de/ | School channel; mentions Facebook/Instagram as school-run social media | Not an independent parent community origin. Generic site alone cannot satisfy official corroboration preference. |
| School Förderverein page | https://lew-tolstoi-schule.de/ueber-unsere-schule/foerderverein/ | Official school page describing Förderverein (founded Nov 1996) + link out | School-published; useful as **official corroboration**, not as `triangulated_community`. |
| Förderverein own site | https://lew-tolstoi-foerderverein.de/ | Parent/friends association: membership, donations, events, schoolyard projects | Strong **Eltern/Förderverein** activity signal. Counts toward official corroboration of visible parent organisation; alone is not ≥2 independent community observation venues. |
| GEV (Gesamtelternvertretung) | https://lew-tolstoi-schule.de/elterninformationen/gev/ | School Eltern page: GEV structure; examples of parent engagement (feste, Klassenräume, external networking) | Preferred **Eltern** corroboration page. Still school_website publisher — not a second independent community venue. |
| Elternvertreter / Runder Tisch | https://lew-tolstoi-schule.de/elterninformationen/elternvertreter-innen/ | School page: engaged Elternschaft; regular Runder Tisch with Förderverein board + Schulleitung | Same school publisher as GEV — echo risk if treated as a separate community origin. |
| Feste und Traditionen | https://lew-tolstoi-schule.de/schulleben/feste-und-traditionen/ | School page: Sommerfest with Eltern + Förderverein; Sponsorenlauf via Förderverein | Community-activity **official** corroboration; not an independent forum/group. |
| Kulturportal Russland listing | https://kulturportal-russland.de/lew-tolstoi-grundschule/ | External directory entry describing SESB + Förderverein membership | Content reads as Förderverein self-description (“in unserem Verein”, same contact email pattern). Treated as **echo / republication**, not independent community observation. |
| Open letter signatories | https://www.servicestelle-jugendbeteiligung.de/unterzeichnungenoffenerbrief/ | Civic petition listing multiple Lew-Tolstoi parents / Förderverein board | One-off political petition venue, not a sustained school-community discussion space. Overlap with Förderverein board weakens independence from the Förderverein channel. |
| Facebook / Instagram | School site claims channels; `https://www.facebook.com/lewtolstoischule` returns HTTP 200 but content not independently verifiable without login; no stable public URL found for a distinct **parent** group | School-branded social media (if real) is school communication, not an independent parent venue per RESEARCH independence examples (Reddit ↔ Facebook group, etc.). No second discoverable parent group/forum with a citable public URL. |
| Reddit / open parent forums | Web search for “Lew-Tolstoi” / “Lew Tolstoi” Schule + Reddit / Elternforum | No qualifying independent thread or forum venue found | — |

## Official corroboration assessment

**Eltern / Förderverein / community-activity pages:** present and substantive.

- Dedicated Förderverein site and school Förderverein/GEV/Elternvertreter pages describe organised parent engagement beyond statutory GEV minimums (feste, projects, Runder Tisch).
- This meets the *prefer Eltern/Förderverein* corroboration preference for a never-sole-basis official cite **if** ≥2 independent community observations existed.

**Generic homepage + chatter alone:** not the only evidence — but also **not sufficient** to publish without independent community venues.

## Threshold check (`validateTagEvidence`)

| Requirement | Met? |
|-------------|------|
| ≥2 distinct `triangulated_community` sourceIds with independenceLog | **No** — no two live, independently arising community observation venues with citable public URLs |
| Distinct independenceLog venues | N/A (community cites not authored) |
| ≥1 allowlisted non-community citation (Eltern/Förderverein preferred) | Would be **Yes** (Förderverein/GEV pages) — but never-sole-basis cannot salvage missing community pair |
| Synthetic / fixture community URLs | **Not used** (D-12) |

## Decision

**Withhold** `active-school-community`.

Official Eltern/Förderverein corroboration is strong, but Community Source Independence requires observations that could reasonably have arisen separately across distinct community origins. Live research found organised parent structures published by the school and its Förderverein, school social-media claims without a verifiable independent parent group, and echo-like or one-off external mentions — not ≥2 independent community venues. Fail-closed per D-13.

## School-record outcome

See `lew-tolstoi-schule` in `src/content/schools/real/lichtenbergPrimarySchools/index.ts`:

- **Omit** `active-school-community` tag.
- Set brief `qualitativeResearchNotes` summarizing this withhold (D-16).
- Fuller detail remains in this document.

## References

- [PILOT_SELECTION.md — Community-Evidence Candidate](./PILOT_SELECTION.md)
- [docs/RESEARCH.md — Community Source Independence](../RESEARCH.md)
- Phase 14 CONTEXT D-12 (live research), D-13 (fail-closed), D-14 (attempt + outcome), D-16 (notes + docs log)
