# Real School Research Spike

Date checked: 2026-07-10

## Purpose

This spike tests whether Berlin School Guide can use real Berlin school data and produce useful, evidence-backed school records before implementing the full M5 detailed profile experience.

It focuses on public primary schools in Lichtenberg, especially Friedrichsfelde, Karlshorst, and nearby areas relevant to the project owner.

## Official Sources Found

### Official Berlin School Directory

Source: `https://www.bildung.berlin.de/Schulverzeichnis/`

The Berlin school directory is the strongest source found for basic school metadata.

- Accessible: yes.
- Structured: semi-structured HTML.
- Downloadable: not found as a simple public CSV export during this spike.
- Suitable for automated import: partially. Search result pages and school portrait pages have predictable HTML IDs, but the site is ASP.NET-style HTML rather than a clean API.
- Suitable for manual research: yes.
- Limitations: HTML parsing is brittle; duplicate entries can appear for some schools; field labels are German; not every detail field appears for every school.

The query `Schulliste.aspx?Suchbegriff=11G` produced a useful Lichtenberg public primary-school result list.

### Official Berlin School Portrait Pages

Example: `https://www.bildung.berlin.de/Schulverzeichnis/Schulportrait.aspx?IDSchulzweig=29355`

School portrait pages were used as the primary source for the spike dataset.

Verified fields usually available:

- official school name;
- school number;
- school type;
- public/private classification;
- address;
- postcode and official Ortsteil;
- official school website;
- languages;
- selected offers such as Ganztag, welcome classes, special profiles, and SESB status.

Fields often not available or not detailed enough:

- parent communication practices;
- transition after grade 6;
- detailed facilities;
- exact eFöB/Hort operational model;
- detailed German-language support beyond welcome-class labels.

### School Inspection Reports

Berlin Senate information says short inspection reports are available through the online school directory, but this spike did not find a stable automated way to retrieve report availability for every selected school.

Richard-Wagner-Schule publishes a school-inspection page on its own official school website with links to inspection reports from 2018 and 2007.

- Accessible: yes for some school website pages.
- Structured: no.
- Downloadable: individual reports may be downloadable where linked.
- Suitable for automated import: not yet.
- Suitable for manual research: yes.
- Limitations: report discovery is inconsistent; an inspection report link on a school website is weaker for automated completeness than an official directory field.

### Public Datasets

Public open-data sources may exist for Berlin schools, but this spike did not identify a clean, current, authoritative, downloadable dataset that included all fields needed for V1 profiles.

Recommendation: treat open-data discovery as a separate import task before M8. The official school directory should remain the primary source until a reliable dataset is confirmed.

### District Or Senate Education Pages

Berlin Senate education pages explain school types and the school-inspection system, but they are not detailed school profile sources.

- Accessible: yes.
- Structured: no.
- Suitable for automated import: no.
- Suitable for manual research: yes, for guide content and methodology context.

### Individual Official School Websites

School websites are useful for deeper research, especially Ganztag, Hort/eFöB contacts, pedagogical profile, parent communication, open-day information, facilities, and programs.

- Accessible: mixed but generally yes.
- Structured: mostly no.
- Downloadable: no.
- Suitable for automated import: no, except for simple link existence checks.
- Suitable for manual research: yes.
- Limitations: content quality, structure, and freshness vary; pages may use WordPress, PDFs, obfuscated emails, or outdated navigation.

## Imported Real Schools

The spike imports these 10 public primary schools:

- Adam-Ries-Schule, `11G06`, Friedrichsfelde.
- Bernhard-Grzimek-Schule, `11G11`, Friedrichsfelde.
- Bürgermeister-Ziethen-Schule, `11G09`, Friedrichsfelde.
- Friedrichsfelder Schule, `11G23`, Friedrichsfelde.
- Grundschule am Tränkegraben, `11G35`, Friedrichsfelde.
- Schmetterlings-Grundschule, `11G31`, Friedrichsfelde.
- Karlshorster Schule, `11G13`, Karlshorst.
- Lew-Tolstoi-Schule, `11G12`, Karlshorst.
- Richard-Wagner-Schule, `11G14`, Karlshorst.
- Seepark-Grundschule, `11G37`, Karlshorst.

## Deeper Research Profiles

Three schools received deeper field-level research:

- Adam-Ries-Schule.
- Lew-Tolstoi-Schule.
- Richard-Wagner-Schule.

## Fields Easy To Verify

- Official name.
- School number.
- Public/private classification.
- School type.
- District and official Ortsteil.
- Address.
- Official website.
- First foreign languages listed in the official portrait.
- Broad Ganztag label when present in the official portrait.
- Some school profile labels, such as Informationstechnik, SESB Deutsch/Russisch, musikbetontes Profil, or Hochbegabtenförderung.
- Welcome classes when the official portrait or school website explicitly says so.

## Fields Difficult Or Impossible To Verify In This Spike

- Exact eFöB/Hort model and daily availability for most schools.
- Parent communication practices.
- Support for families who do not speak German.
- Transition path after grade 6.
- Facilities in a comparable structured form.
- Inclusion and support services beyond labels in the official portrait.
- Inspection availability across all schools.
- Whether information is current when school websites do not publish update dates.

## Schema Changes Identified

Implemented during the spike:

- Add `schoolNumber` as a first-class school field.

Still needed before real profiles scale:

- Add a dedicated `schoolType` field separate from `level`.
- Add `sourceCheckedAt` or citation-level checked dates when a field cites multiple sources checked on different dates.
- Add support for source snippets or archived extraction notes without exceeding quotation limits in user-facing content.
- Add a structured `officialOffers` or `programs` field so directory labels from Berlin do not have to be split across profile, focus, bilingual, and support fields.
- Add explicit `schoolWebsiteFreshness` or source freshness notes for outdated school pages.

## Evidence Coverage Model Assessment

The evidence-coverage model works for real schools as a completeness indicator, but directory-only records naturally show lower coverage because many important profile fields are missing.

This is useful as long as the UI continues to explain that coverage is research completeness, not school quality.

Two refinements are recommended:

- define separate coverage views for directory completeness and detailed profile completeness;
- exclude fields that are not expected for directory-only records when showing broad directory coverage.

## Product Conclusion

The site can use real Berlin school data immediately for a useful static directory.

The official Berlin school directory is strong enough for basic verified metadata and some filters. Detailed profiles are feasible, but they require manual research and careful missing-data handling because school websites and inspection evidence are inconsistent.
