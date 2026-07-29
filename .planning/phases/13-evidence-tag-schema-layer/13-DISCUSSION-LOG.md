# Phase 13: Evidence & Tag Schema Layer - Discussion Log

**Date:** 2026-07-29
**Mode:** discuss (all 6 gray areas)

## Areas discussed

### 1. Reliability vs source-type shape
**Options:** (1) Orthogonal axes + factual allowlist [recommended], (2) Mirror docs (community as type and reliability), (3) Reliability-first
**Selected:** 1 — Orthogonal axes
**Notes:** Add journalism + triangulated_community to sourceType only; reliability stays primary|secondary|anecdotal|unknown; journalism→secondary, community→anecdotal; factual gate = acceptable reliability AND allowlisted sourceType; fix RESEARCH.md reliability section drift.

### 2. “Never sole basis” rule
**Options:** (1) Hard require non-community corroboration [recommended], (2) Soft editorial preference, (3) Graduated confidence
**Selected:** 1
**Notes:** ≥2 independent triangulated_community + independence log + ≥1 allowlisted non-community citation; community-only rejected by schema.

### 3. Independence log attachment
**Options:** (1) On each community citation [recommended], (2) On the tag once, (3) On the Source record
**Selected:** 1
**Notes:** Nested on citation when cited source is triangulated_community; D-13 field set; reuse sources[] + sourceId citations.

### 4. When qualitativeLastReviewed is required
**Options:** (1) Required iff qualitative content [recommended], (2) Always optional in Phase 13, (3) Required for all schools
**Selected:** 1
**Notes:** Empty/omitted tags → optional; non-empty tags → required YYYY-MM-DD; same rule when narrative arrives later; no placeholder dates on non-pilots.

### 5. Confidence label IDs
**Options:** (1) Semantic IDs matching methodology [recommended], (2) Short generic IDs, (3) Two tiers only
**Selected:** 1 — confirmed_multi_source | confirmed_official | partial
**Notes:** Map to methodology PT-BR; confirmed_official includes school website; no high/medium/low; validators enforce confidence↔citation consistency.

### 6. Display labels this phase
**Options:** (1) Schema + format helpers now [recommended], (2) IDs/validators only, (3) Confidence formatter only
**Selected:** 1
**Notes:** Extend formatSourceType; add confidence/tag-id helpers; UI chips still Phase 15.

## Deferred
- Profile UI (Phase 15), pilot authoring (Phase 14), community on other tags (v2)

---

*Audit trail only — not consumed by researcher/planner agents. See 13-CONTEXT.md for locked decisions.*
