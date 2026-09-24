import { filterSchools, defaultDirectoryFilters } from ".";
import {
  getSchoolDirectoryItems,
  toSchoolDirectoryItem,
} from "@/features/schools/schoolDirectoryData";
import {
  field,
  missingEvidence,
  validDirectoryOnlySchool,
  verifiedDirectoryEvidence,
} from "@/features/schools/school/fixtures";

const schools = getSchoolDirectoryItems();
const mediumCoverageSchool = toSchoolDirectoryItem({
  ...validDirectoryOnlySchool,
  id: "synthetic-medium-coverage-school",
  slug: "synthetic-medium-coverage-school",
  name: field("Synthetic Medium Coverage School", verifiedDirectoryEvidence),
  schoolNumber: field("MED-01", verifiedDirectoryEvidence),
  website: field("https://example.test/medium", verifiedDirectoryEvidence),
  classification: field("public", verifiedDirectoryEvidence),
  level: field("primary", verifiedDirectoryEvidence),
  gradesServed: field(["1", "2", "3", "4"], verifiedDirectoryEvidence),
  location: {
    district: field(null, missingEvidence),
    neighbourhood: field(null, missingEvidence),
    address: field(null, missingEvidence),
  },
  ganztag: field(null, missingEvidence),
  languages: field(null, missingEvidence),
});
const lowCoverageSchool = toSchoolDirectoryItem({
  ...validDirectoryOnlySchool,
  id: "synthetic-low-coverage-school",
  slug: "synthetic-low-coverage-school",
  name: field("Synthetic Low Coverage School", missingEvidence),
  schoolNumber: field(null, missingEvidence),
  website: field(null, missingEvidence),
  classification: field(null, missingEvidence),
  level: field(null, missingEvidence),
  location: {
    district: field(null, missingEvidence),
    neighbourhood: field(null, missingEvidence),
    address: field(null, missingEvidence),
  },
  gradesServed: field(null, missingEvidence),
  ganztag: field(null, missingEvidence),
  languages: field(null, missingEvidence),
});
const schoolsWithCoverageFixtures = [
  ...schools,
  mediumCoverageSchool,
  lowCoverageSchool,
];

describe("filterSchools", () => {
  it("searches by school name", () => {
    expect(
      filterSchools(schools, {
        ...defaultDirectoryFilters,
        query: "Lew-Tolstoi",
      }),
    ).toHaveLength(1);
  });

  it("filters by district and neighbourhood", () => {
    expect(
      filterSchools(schools, {
        ...defaultDirectoryFilters,
        districts: ["Lichtenberg"],
        neighbourhoods: ["Friedrichsfelde"],
      }),
    ).toHaveLength(7);
  });

  it("filters by public/private classification", () => {
    expect(
      filterSchools(schools, {
        ...defaultDirectoryFilters,
        classifications: ["public"],
      }),
    ).toHaveLength(14);
    const privateSchools = filterSchools(schools, {
      ...defaultDirectoryFilters,
      classifications: ["private"],
    });
    expect(privateSchools).toHaveLength(1);
    expect(privateSchools.map((school) => school.slug)).toContain(
      "evangelische-schule-lichtenberg",
    );
  });

  it("filters Ganztag by verified and missing/unconfirmed status", () => {
    expect(
      filterSchools(schools, {
        ...defaultDirectoryFilters,
        ganztag: ["verified"],
      }).length,
    ).toBeGreaterThan(0);
    expect(
      filterSchools(schools, {
        ...defaultDirectoryFilters,
        ganztag: ["missing_or_unconfirmed"],
      }).length,
    ).toBeGreaterThan(0);
  });

  it("filters bilingual programs", () => {
    expect(
      filterSchools(schools, { ...defaultDirectoryFilters, bilingual: ["yes"] })
        .length,
    ).toBeGreaterThan(0);
  });

  it("filters welcome classes", () => {
    expect(
      filterSchools(schools, {
        ...defaultDirectoryFilters,
        welcomeClasses: ["yes"],
      }).length,
    ).toBeGreaterThan(0);
  });

  it("filters languages and educational focus", () => {
    expect(
      filterSchools(schools, {
        ...defaultDirectoryFilters,
        languages: ["Deutsch"],
      }).length,
    ).toBeGreaterThan(0);
    expect(
      filterSchools(schools, {
        ...defaultDirectoryFilters,
        educationalFocus: ["Musikbetonung"],
      }).length,
    ).toBeGreaterThan(0);
  });

  it("filters after-school care and inspection availability", () => {
    expect(
      filterSchools(schools, {
        ...defaultDirectoryFilters,
        afterSchoolCare: ["verified"],
      }).length,
    ).toBeGreaterThan(0);
    expect(
      filterSchools(schools, {
        ...defaultDirectoryFilters,
        inspectionAvailability: ["available"],
      }).length,
    ).toBeGreaterThan(0);
  });

  it("filters evidence coverage by inclusive ranges", () => {
    expect(
      filterSchools(schoolsWithCoverageFixtures, {
        ...defaultDirectoryFilters,
        evidenceCoverage: ["80-100"],
      }).length,
    ).toBeGreaterThan(0);
    expect(
      filterSchools(schoolsWithCoverageFixtures, {
        ...defaultDirectoryFilters,
        evidenceCoverage: ["50-79"],
      }).length,
    ).toBeGreaterThan(0);
    expect(
      filterSchools(schoolsWithCoverageFixtures, {
        ...defaultDirectoryFilters,
        evidenceCoverage: ["0-49"],
      }).length,
    ).toBeGreaterThan(0);
  });

  it("supports combined filters with no matches", () => {
    expect(
      filterSchools(schools, {
        ...defaultDirectoryFilters,
        districts: ["Lichtenberg"],
        neighbourhoods: ["Karlshorst"],
        languages: ["Französisch"],
        educationalFocus: ["Informationstechnik"],
      }),
    ).toHaveLength(0);
  });
});
