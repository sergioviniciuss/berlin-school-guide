import { collectCitedSources } from ".";
import type { Source } from "@/features/evidence/source";
import {
  field,
  validDetailedPublicSchool,
  verifiedDirectoryEvidence,
} from "@/features/schools/school/fixtures";
import {
  journalismSource,
  officialDirectorySource,
  schoolWebsiteSource,
} from "@/features/evidence/source/fixtures";
import { profileFieldLabels } from "@/features/schools/SchoolProfile/constants";
import { formatTagId } from "@/features/schools/tagTaxonomy";
import type { School } from "@/features/schools/school";

describe("collectCitedSources", () => {
  it("dedupes sources when two fields cite the same sourceId", () => {
    const grouped = collectCitedSources(validDetailedPublicSchool);
    const officialEntries = grouped.find(
      (group) => group.type === "official_government",
    )?.entries;

    expect(officialEntries).toHaveLength(1);
    expect(officialEntries?.[0]?.source.id).toBe(officialDirectorySource.id);
    expect(officialEntries?.[0]?.citations.length).toBeGreaterThan(1);
  });

  it("orders official_government before school_website", () => {
    const grouped = collectCitedSources(validDetailedPublicSchool);
    const types = grouped.map((group) => group.type);

    expect(types.indexOf("official_government")).toBeLessThan(
      types.indexOf("school_website"),
    );
  });

  it("includes citations from not_confirmed fields", () => {
    const notConfirmedSchool: School = {
      ...validDetailedPublicSchool,
      afterSchoolCare: field("Inferred after-school care", {
        status: "not_confirmed",
        citations: [{ sourceId: schoolWebsiteSource.id, note: "Inferred note" }],
        note: "Inferido a partir do modelo Ganztag.",
        lastChecked: "2026-07-10",
      }),
    };

    const grouped = collectCitedSources(notConfirmedSchool);
    const websiteEntries = grouped.find(
      (group) => group.type === "school_website",
    )?.entries;

    expect(
      websiteEntries?.some((entry) =>
        entry.citations.some((citation) => citation.note === "Inferred note"),
      ),
    ).toBe(true);
  });

  it("sorts entries alphabetically by title within each group", () => {
    const alphaSource: Source = {
      id: "alpha-gov",
      title: "Alpha government source",
      url: "https://example.test/alpha",
      type: "official_government",
      reliability: "primary",
      publisher: "Alpha publisher",
      dateAccessed: "2026-07-10",
    };
    const betaSource: Source = {
      id: "beta-gov",
      title: "Beta government source",
      url: "https://example.test/beta",
      type: "official_government",
      reliability: "primary",
      publisher: "Beta publisher",
      dateAccessed: "2026-07-10",
    };
    const sortTestSchool: School = {
      ...validDetailedPublicSchool,
      sources: [betaSource, alphaSource],
      name: field("Sort Test School", {
        status: "verified",
        citations: [{ sourceId: betaSource.id }],
        lastChecked: "2026-07-10",
      }),
      schoolNumber: field("SORT-01", {
        status: "verified",
        citations: [{ sourceId: alphaSource.id }],
        lastChecked: "2026-07-10",
      }),
      website: field("https://example.test/sort", verifiedDirectoryEvidence),
    };

    const grouped = collectCitedSources(sortTestSchool);
    const officialEntries = grouped.find(
      (group) => group.type === "official_government",
    )?.entries;

    expect(officialEntries?.map((entry) => entry.source.title)).toEqual([
      "Alpha government source",
      "Beta government source",
    ]);
  });

  it("includes a tag-only source exactly once when no field cites it", () => {
    const tagOnlySource: Source = {
      ...journalismSource,
      id: "tag-only-source",
      title: "Tag-only journalism source",
    };
    const school: School = {
      ...validDetailedPublicSchool,
      sources: [...validDetailedPublicSchool.sources, tagOnlySource],
      tags: [
        {
          id: "arts-music-focus",
          confidence: "confirmed_official",
          citations: [{ sourceId: "tag-only-source" }],
        },
      ],
      perfilDaEscola: "Parágrafo sintético de teste.",
      qualitativeLastReviewed: "2026-07-29",
    };

    const grouped = collectCitedSources(school);
    const matching = grouped.flatMap((group) =>
      group.entries.filter((entry) => entry.source.id === "tag-only-source"),
    );

    expect(matching).toHaveLength(1);
  });

  it("dedupes a source cited by both a field and a tag with citedBy labels", () => {
    const school: School = {
      ...validDetailedPublicSchool,
      tags: [
        {
          id: "stem-focus",
          confidence: "confirmed_official",
          citations: [{ sourceId: officialDirectorySource.id }],
        },
      ],
      perfilDaEscola: "Parágrafo sintético de teste.",
      qualitativeLastReviewed: "2026-07-29",
    };

    const grouped = collectCitedSources(school);
    const matching = grouped.flatMap((group) =>
      group.entries.filter(
        (entry) => entry.source.id === officialDirectorySource.id,
      ),
    );

    expect(matching).toHaveLength(1);
    expect(matching[0]?.citations.length).toBeGreaterThanOrEqual(1);
    expect(matching[0]?.citedBy).toEqual(
      expect.arrayContaining([
        profileFieldLabels.name,
        formatTagId("stem-focus"),
      ]),
    );
  });

  it("returns citedBy as an array on every CitedSourceEntry", () => {
    const grouped = collectCitedSources(validDetailedPublicSchool);

    for (const group of grouped) {
      for (const entry of group.entries) {
        expect(Array.isArray(entry.citedBy)).toBe(true);
      }
    }
  });
});
