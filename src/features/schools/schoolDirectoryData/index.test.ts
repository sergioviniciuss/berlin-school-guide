import { collectCitedSources } from "@/features/schools/collectCitedSources";
import { schoolSchema } from "@/features/schools/school";
import { validDirectoryOnlySchool } from "@/features/schools/school/fixtures";

import { getRealSchools, getSchoolDirectoryItems } from ".";

const phase151Slugs = [
  "grundschule-am-neuen-tor",
  "robinson-schule",
  "schule-auf-dem-lichtenberg",
  "schlaufuchs-schule",
  "evangelische-schule-lichtenberg",
] as const;

const originalTen = [
  ["adam-ries-schule", "profile_ready", "detailed"],
  ["bernhard-grzimek-schule", "directory_only", "directory"],
  ["buergermeister-ziethen-schule", "directory_only", "directory"],
  ["friedrichsfelder-schule", "directory_only", "directory"],
  ["grundschule-am-traenkegraben", "directory_only", "directory"],
  ["schmetterlings-grundschule", "directory_only", "directory"],
  ["karlshorster-schule", "directory_only", "directory"],
  ["lew-tolstoi-schule", "profile_ready", "detailed"],
  ["richard-wagner-schule", "profile_ready", "detailed"],
  ["seepark-grundschule", "directory_only", "directory"],
] as const;

describe("schoolDirectoryData", () => {
  it("parses real schools through the validated school schema", () => {
    expect(getRealSchools()).toHaveLength(15);
  });

  it("parses synthetic fixtures directly for shape regression", () => {
    expect(schoolSchema.parse(validDirectoryOnlySchool).id).toBe(
      "synthetic-directory-school",
    );
  });

  it("transforms schools into directory items with evidence coverage", () => {
    const items = getSchoolDirectoryItems();

    expect(items).toHaveLength(15);
    expect(items[0]).toMatchObject({
      id: "11g06",
      schoolNumber: "11G06",
      evidenceCoverage: {
        version: "v2",
      },
      coverageLevel: expect.stringMatching(/^(directory|detailed)$/),
      researchStatus: expect.any(String),
      coverageTierLabel: expect.stringMatching(
        /^(Pesquisa básica|Pesquisa detalhada)$/,
      ),
    });
  });

  it("locks the Phase 15.1 schools and keeps the original ten unchanged", () => {
    const schools = getRealSchools();
    const bySlug = new Map(schools.map((school) => [school.slug, school]));

    expect(new Set(schools.map((school) => school.slug)).size).toBe(
      schools.length,
    );
    expect(new Set(schools.map((school) => school.id)).size).toBe(
      schools.length,
    );

    for (const slug of phase151Slugs) {
      const school = bySlug.get(slug);
      expect(school).toBeDefined();
      expect(school!.perfilDaEscola?.trim().length).toBeGreaterThan(0);
      expect(school!.perfilDaEscola).not.toContain("<");
      expect(school!.qualitativeLastReviewed).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      expect(school!.research.status).toBe("profile_ready");
      expect(school!.research.coverageLevel).toBe("detailed");
      expect(school!.afterSchoolCare.evidence.status).not.toBe("not_confirmed");
      expect(school!.schoolProfile.evidence.status).not.toBe("not_confirmed");
      expect(school!.pedagogyFocus.evidence.status).not.toBe("not_confirmed");

      const citedIds = new Set(
        collectCitedSources(school!).flatMap((group) =>
          group.entries.map((entry) => entry.source.id),
        ),
      );
      for (const source of school!.sources) {
        if (
          source.type === "school_website" ||
          source.type === "journalism" ||
          source.type === "official_inspection" ||
          source.type === "triangulated_community"
        ) {
          expect(citedIds.has(source.id)).toBe(true);
        }
      }
    }

    expect(bySlug.get("evangelische-schule-lichtenberg")!.classification.value).toBe(
      "private",
    );

    for (const [slug, status, coverageLevel] of originalTen) {
      const school = bySlug.get(slug);
      expect(school).toBeDefined();
      expect(school!.classification.value).toBe("public");
      expect(school!.gradesServed.value).toEqual([
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
      ]);
      expect(school!.research.status).toBe(status);
      expect(school!.research.coverageLevel).toBe(coverageLevel);
    }
  });
});
