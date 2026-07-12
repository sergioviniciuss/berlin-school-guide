# Information Architecture

## Navigation Goals

The site should help families move from understanding the system to evaluating specific schools.

Primary navigation should prioritize:

- education system guide;
- school directory;
- comparison;
- practical checklists;
- methodology.

## Core Page Types

The site should include:

- home page;
- Berlin primary education guide;
- topic guide pages;
- school directory;
- school detail pages;
- comparison page;
- methodology page;
- correction/update information.

## Suggested URL Structure

```text
/
 /guides/
 /guides/berlin-school-system/
 /guides/enrollment/
 /guides/catchment-area/
 /guides/ganztag/
 /guides/public-and-private-schools/
 /guides/school-inspections/
 /schools/
 /schools/[slug]/
 /compare/
 /methodology/
 /checklists/
 /report-correction/
```

Technical route segments and slugs should be written in English. User-facing labels, page headings, descriptions, accessibility text, and editorial content should be written in Brazilian Portuguese.

Examples:

- route: `/schools`; visible heading: `Escolas`;
- route: `/guides`; visible heading: `Guias`;
- route: `/compare`; visible heading: `Comparar`;
- route: `/methodology`; visible heading: `Metodologia`.

Editorial guide URLs should use English structural routes and concise English slugs, while titles and content remain in Brazilian Portuguese.

## School Directory

The directory should support static filtering by:

- district;
- neighbourhood;
- public/private;
- Ganztag;
- bilingual;
- welcome classes;
- languages;
- educational focus;
- after-school care;
- inspection availability;
- evidence coverage.

Structured geography should use `district` as Berlin `Bezirk` and `neighbourhood` as official Berlin `Ortsteil`. The Portuguese labels should be `Distrito` and `Bairro`.

The inspection filter should use `available`, `unavailable`, and `not_confirmed`. It indicates whether official inspection information was found, not school quality.

Directory query parameters should use English names:

```text
/schools?q=example&district=Mitte&neighbourhood=Moabit&type=public&coverage=80-100&sort=coverage
```

Supported M4 query parameter names should include `q`, `district`, `neighbourhood`, `type`, `ganztag`, `bilingual`, `welcome`, `language`, `focus`, `afterSchool`, `inspection`, and `coverage`.

Sort uses `sort=name|coverage|tier`. Omit `sort` when using the default alphabetical name order (`name`).

## School Page Journey

A school page should help families answer:

- What kind of school is this?
- What is verified?
- What is missing?
- What matters for international or Brazilian families?
- What should I ask during a visit?
- Where did this information come from?

## User Journeys

### Understand First

A family starts with the guide, learns the Berlin system, then moves to the directory.

### Compare Nearby Options

A family filters schools by district and neighbourhood, opens several school pages, and compares verified criteria.

### Prepare For A Visit

A family reads a school profile, reviews missing or unclear information, and uses the Open Day questions.

### Check Trustworthiness

A family reads the methodology page and reviews citations before relying on the information.

## Static-First Constraint

All navigation, school pages, guides, filters, and comparison features should work from static data without a production database or external APIs.
