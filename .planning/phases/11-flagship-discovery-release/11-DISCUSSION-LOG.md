# Phase 11: Flagship Discovery & Release - Discussion Log

> **Audit trail only.** Do not use as input to planning, research, or execution agents.
> Decisions are captured in CONTEXT.md — this log preserves the alternatives considered.

**Date:** 2026-07-25
**Phase:** 11-flagship-discovery-release
**Areas discussed:** Homepage start-here hierarchy, Guides hub flagship layout, Complementary relationship copy, Closing next steps (ONBD-06)

---

## Homepage start-here hierarchy

| Option | Description | Selected |
|--------|-------------|----------|
| Onboarding guide first | Primary card → `/guides/german-education-system` | ✓ |
| Guides hub first | Top card → `/guides` selling flagship inside hub | |
| Schools stays primary | Keep Explorar escolas on top | |
| You decide | Claude picks hierarchy | |

**User's choice:** Onboarding as primary Start here; directory highly visible as second action; system before schools.

| Option | Description | Selected |
|--------|-------------|----------|
| Replace Entender o sistema card | Start here replaces `/guides` card; hub via nav | ✓ |
| Keep three cards + Start here | Extra card to guides/methodology | |
| Keep /guides as tertiary | Two strong + lighter tertiary | |
| You decide | Prefer two strong actions | |

**User's choice:** Exactly two homepage actions; remove `/guides` and methodology cards from homepage.

| Option | Description | Selected |
|--------|-------------|----------|
| Start here stronger | Primary accent; schools secondary but prominent | ✓ |
| Equal visual weight | Same chrome; order/copy only | |
| You decide | Prefer stronger Start here | |

**User's choice:** Stronger Start here; remove methodology homepage card (yes).

**Notes:** Methodology/guides discoverable via nav, hub, and contextual links only.

---

## Guides hub flagship layout

| Option | Description | Selected |
|--------|-------------|----------|
| Same section, stacked | Flagship onboarding then Berlin under Entenda o sistema | ✓ |
| Flagship section of its own | New “Comece por aqui” section | |
| Single hero + list | Flatten category structure | |
| You decide | Prefer option 1 | |

**User's choice:** Keep sections; roles Comece aqui / Depois Berlin / checklist when ready.

| Option | Description | Selected |
|--------|-------------|----------|
| Flagship stronger | Mirror homepage visual hierarchy | ✓ |
| Both system guides equal | Same chrome | |
| You decide | Prefer stronger flagship | |

**User's choice:** Flagship stronger; Berlin retitled to “Como funciona o sistema escolar público de Berlim”.

| Option | Description | Selected |
|--------|-------------|----------|
| Both hub and page | GuideIntro/H1 matches hub | ✓ |
| Hub card only | Page keeps older primary-school title | |
| You decide | Prefer matching titles | |

**User's choice:** Both hub and page.

---

## Complementary relationship copy

| Option | Description | Selected |
|--------|-------------|----------|
| Both intros + hub blurbs | Short complementary lines, no separate section | ✓ |
| Onboarding → Berlin mainly | Stronger on Germany only | |
| Dedicated callout only | Shared relationship callout component | |
| You decide | Prefer intros + blurbs | |

**User's choice:** Both intros + hub; example Germany/Berlin framing provided.

| Option | Description | Selected |
|--------|-------------|----------|
| Yes, inline links | Sibling guide names clickable | ✓ |
| Copy only in intros | Links elsewhere | |
| You decide | Prefer inline links | |

**User's choice:** Inline links; update first-steps with soft top tip; leave directory intro unchanged.

**Notes:** Relationship = recommended reading path. Directory is exploration mode — no “read guide first” friction.

---

## Closing next steps (ONBD-06)

| Option | Description | Selected |
|--------|-------------|----------|
| Dedicated after Glossário | Next steps after glossary | |
| Before Glossário only | Final narrative, glossary as appendix | ✓ |
| No new section | Intro/hub/mid-page only | |
| You decide | Prefer before glossary | |

**User's choice:** Próximos passos before Glossário; progression Germany → Berlin → schools → first-steps.

| Option | Description | Selected |
|--------|-------------|----------|
| No /compare — three exits | Berlin, /schools, first-steps | ✓ |
| Yes include compare | Fourth exit | |
| You decide | Prefer three exits | |

| Option | Description | Selected |
|--------|-------------|----------|
| Ordered short list | Numbered path, not mini cards | ✓ |
| Mini cards / buttons | Homepage-like CTAs | |
| You decide | Prefer ordered list | |

**User's choice:** No `/compare` in closing (discover via directory); numbered list with sample Portuguese copy provided.

---

## Claude's Discretion

- Exact homepage/hub Portuguese microcopy within locked intent
- GuideIntro link rendering approach (string prop vs MDX/sibling paragraph)
- REL metadata/a11y/smoke implementation details within existing e2e patterns

## Deferred Ideas

None within scope. `/compare` as onboarding exit explicitly rejected.
