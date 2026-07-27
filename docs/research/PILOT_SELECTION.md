# Pilot Selection

Selected: 2026-07-26

## Purpose

This document records the criteria and the named 3-5 school pilot set for Milestone v1.2 (Evidence-Based School Profiles), per Phase 12 (Editorial & Research Framework). The pilot set exists to validate the tag taxonomy and "Perfil da escola" narrative model across different evidence conditions - not to showcase the "best" schools.

**Policy authority:** Tag taxonomy, source hierarchy, and independence rules are defined in [docs/RESEARCH.md](../RESEARCH.md), [docs/DATA_MODEL.md](../DATA_MODEL.md), and [docs/DECISIONS.md](../DECISIONS.md). This document applies those rules to select the pilot set; it does not redefine them.

## Criteria

The pilot set targets five diversity dimensions (coverage targets, not one seat per dimension - a single school may satisfy more than one):

1. A well-documented school.
2. A low-documentation school.
3. A bilingual or Staatliche Europa-Schule Berlin (SESB) school.
4. A school with a distinctive specialization (for example, music or STEM).
5. A typical neighbourhood school with no strong distinguishing offer.

Low-documentation means an existing `researchStatus` of `directory_only` plus a thin public web presence (sparse beyond the official Senate portrait). The objective is to validate the methodology across different evidence conditions, not to select schools that are easiest to research.

## Selected Schools

| School | Dimension(s) satisfied | Rationale |
|--------|------------------------|-----------|
| Richard-Wagner-Schule | Well-documented; distinctive specialization (music) | `profile_ready`, detailed coverage, 4 sources including an official school-inspection page; official portrait and school website confirm a `musikbetontes Profil` and Hochbegabtenförderung. The strongest existing reference point for a rich profile. |
| Lew-Tolstoi-Schule | Bilingual/SESB; community-evidence candidate (see below) | `profile_ready`, officially designated Staatliche Europa-Schule Berlin Deutsch/Russisch - the only school in the current dataset with an official SESB designation. |
| Bernhard-Grzimek-Schule | Low-documentation; distinctive specialization (STEM) | `directory_only`, zero sources beyond the official portrait, yet the portrait lists a `mathematisch-naturwissenschaftliches Profil`. Deliberately pressure-tests whether the taxonomy holds up under thin evidence rather than becoming a documentation-richness proxy. |
| Friedrichsfelder Schule | Typical neighbourhood school | `directory_only`, no specialization signal beyond generic Schulanfangsphase organizational notes. Tests whether the model produces a sparse-but-honest profile instead of forcing tags onto an unremarkable school. |
| Seepark-Grundschule | Low-documentation (second reference point) | `directory_only`, the thinnest record in the current dataset - no `offers` and no `ganztag` field at all. A second, even sparser low-documentation reference point alongside Bernhard-Grzimek-Schule. |

This set intentionally includes two low-documentation schools (dimension 2) with different profiles - one with a specialization claim (Bernhard-Grzimek-Schule) and one with none (Seepark-Grundschule) - to test the taxonomy under both conditions.

## Community-Evidence Candidate

Lew-Tolstoi-Schule is the provisional candidate to exercise the full triangulation workflow for `active-school-community`, based on its Russian-speaking Staatliche Europa-Schule Berlin community being statistically more likely to have active, discoverable parent venues (Facebook groups, forums) than a directory-only school with no distinguishing program.

This candidate is provisional: whether an independent, corroborated community venue actually exists can only be confirmed during Phase 14's research pass. If no qualifying independent venue is found, the `active-school-community` tag fails closed and is withheld for this school per [docs/RESEARCH.md](../RESEARCH.md)'s Community Source Independence rules - that outcome is a successful validation of the model, not a phase failure.

## Data Source

School evidence referenced above (`researchStatus`, `offers`, source counts) is drawn from `src/content/schools/real/lichtenbergPrimarySchools/index.ts` as of 2026-07-26. Any future changes to that dataset should be checked against this rationale before pilot tagging begins.
