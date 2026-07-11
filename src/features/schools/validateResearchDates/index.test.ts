import { validateResearchDates } from ".";
import {
  officialDirectorySource,
  schoolWebsiteSource,
} from "@/features/evidence/source/fixtures";
import type { School } from "@/features/schools/school";
import {
  field,
  missingEvidence,
  validDetailedPublicSchool,
  verifiedDirectoryEvidence,
} from "@/features/schools/school/fixtures";

function schoolWithResearchDates(
  research: School["research"],
  sources: School["sources"] = validDetailedPublicSchool.sources,
): School {
  return {
    ...validDetailedPublicSchool,
    research,
    sources,
  };
}

describe("validateResearchDates", () => {
  it("fails when lastResearched is missing", () => {
    expect(
      validateResearchDates(
        schoolWithResearchDates({
          status: "profile_ready",
          coverageLevel: "detailed",
          lastSourceChecked: "2026-07-10",
        }),
      ),
    ).toEqual([
      "synthetic-detailed-public-school: Real schools must include lastResearched and lastSourceChecked.",
    ]);
  });

  it("fails when lastSourceChecked is missing", () => {
    expect(
      validateResearchDates(
        schoolWithResearchDates({
          status: "profile_ready",
          coverageLevel: "detailed",
          lastResearched: "2026-07-10",
        }),
      ),
    ).toEqual([
      "synthetic-detailed-public-school: Real schools must include lastResearched and lastSourceChecked.",
    ]);
  });

  it("fails when lastSourceChecked is before the oldest cited source dateAccessed", () => {
    const olderSource = {
      ...officialDirectorySource,
      dateAccessed: "2026-07-10",
    };
    const newerSource = {
      ...schoolWebsiteSource,
      dateAccessed: "2026-07-15",
    };

    expect(
      validateResearchDates(
        schoolWithResearchDates(
          {
            status: "profile_ready",
            coverageLevel: "detailed",
            lastResearched: "2026-07-10",
            lastSourceChecked: "2026-07-08",
          },
          [olderSource, newerSource],
        ),
      ),
    ).toContain(
      "synthetic-detailed-public-school: lastSourceChecked (2026-07-08) must be >= oldest cited source dateAccessed (2026-07-10).",
    );
  });

  it("fails when lastSourceChecked is before the most recent cited source dateAccessed", () => {
    const olderSource = {
      ...officialDirectorySource,
      dateAccessed: "2026-07-10",
    };
    const newerSource = {
      ...schoolWebsiteSource,
      dateAccessed: "2026-07-15",
    };

    expect(
      validateResearchDates(
        schoolWithResearchDates(
          {
            status: "profile_ready",
            coverageLevel: "detailed",
            lastResearched: "2026-07-10",
            lastSourceChecked: "2026-07-12",
          },
          [olderSource, newerSource],
        ),
      ),
    ).toContain(
      "synthetic-detailed-public-school: lastSourceChecked (2026-07-12) must be >= most recent cited source dateAccessed (2026-07-15).",
    );
  });

  it("returns no failures when research dates are coherent with cited sources", () => {
    const olderSource = {
      ...officialDirectorySource,
      dateAccessed: "2026-07-10",
    };
    const newerSource = {
      ...schoolWebsiteSource,
      dateAccessed: "2026-07-15",
    };

    expect(
      validateResearchDates(
        schoolWithResearchDates(
          {
            status: "profile_ready",
            coverageLevel: "detailed",
            lastResearched: "2026-07-10",
            lastSourceChecked: "2026-07-15",
          },
          [olderSource, newerSource],
        ),
      ),
    ).toEqual([]);
  });

  it("fails when dates are present but no cited sources exist", () => {
    const schoolWithoutCitations: School = {
      ...validDetailedPublicSchool,
      name: field("No Citations School", missingEvidence),
      schoolNumber: field("NO-CIT", missingEvidence),
      website: field("https://example.test/no-citations", missingEvidence),
      classification: field("public", missingEvidence),
      level: field("primary", missingEvidence),
      location: {
        district: field("Mitte", missingEvidence),
        neighbourhood: field("Moabit", missingEvidence),
        address: field("Example Str. 1, 10557 Berlin", missingEvidence),
      },
      gradesServed: field(["1", "2", "3", "4", "5", "6"], missingEvidence),
      ganztag: field(null, missingEvidence),
      afterSchoolCare: field(null, missingEvidence),
      languages: field(null, missingEvidence),
      bilingualPrograms: field(null, missingEvidence),
      internationalPrograms: field(null, missingEvidence),
      welcomeClasses: field(null, missingEvidence),
      schoolProfile: field(null, missingEvidence),
      pedagogyFocus: field(null, missingEvidence),
      inclusionSupport: field(null, missingEvidence),
      transitionAfterGrade6: field(null, missingEvidence),
      familyCommunication: field(null, missingEvidence),
      inspectionAvailability: field(null, missingEvidence),
      inspectionData: field(null, missingEvidence),
      facilities: field(null, missingEvidence),
      sources: [officialDirectorySource],
      research: {
        status: "profile_ready",
        coverageLevel: "detailed",
        lastResearched: "2026-07-10",
        lastSourceChecked: "2026-07-10",
      },
    };

    expect(validateResearchDates(schoolWithoutCitations)).toEqual([
      "synthetic-detailed-public-school: Cannot verify research date coherence without cited sources.",
    ]);
  });
});
