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

import { sortFromSearchParams, sortSchools } from ".";

const baseSchools = getSchoolDirectoryItems();

const highCoverageSchool = toSchoolDirectoryItem({
  ...validDirectoryOnlySchool,
  id: "sort-high-coverage",
  slug: "sort-high-coverage",
  name: field("Zebra High Coverage School", verifiedDirectoryEvidence),
  schoolNumber: field("ZHC-01", verifiedDirectoryEvidence),
  website: field("https://example.test/high", verifiedDirectoryEvidence),
  classification: field("public", verifiedDirectoryEvidence),
  level: field("primary", verifiedDirectoryEvidence),
  gradesServed: field(["1", "2", "3", "4"], verifiedDirectoryEvidence),
  location: {
    district: field("Lichtenberg", verifiedDirectoryEvidence),
    neighbourhood: field("Test", verifiedDirectoryEvidence),
    address: field("Test 1", verifiedDirectoryEvidence),
  },
  ganztag: field("yes", verifiedDirectoryEvidence),
  languages: field(["German"], verifiedDirectoryEvidence),
});

const lowCoverageSchool = toSchoolDirectoryItem({
  ...validDirectoryOnlySchool,
  id: "sort-low-coverage",
  slug: "sort-low-coverage",
  name: field("Alpha Low Coverage School", missingEvidence),
  schoolNumber: field(null, missingEvidence),
  website: field(null, missingEvidence),
  classification: field(null, missingEvidence),
  level: field(null, missingEvidence),
  gradesServed: field(null, missingEvidence),
  location: {
    district: field(null, missingEvidence),
    neighbourhood: field(null, missingEvidence),
    address: field(null, missingEvidence),
  },
  ganztag: field(null, missingEvidence),
  languages: field(null, missingEvidence),
});

const detailedSchool = toSchoolDirectoryItem({
  ...validDirectoryOnlySchool,
  id: "sort-detailed",
  slug: "sort-detailed",
  name: field("Beta Detailed School", verifiedDirectoryEvidence),
  schoolNumber: field("DET-01", verifiedDirectoryEvidence),
  website: field("https://example.test/detailed", verifiedDirectoryEvidence),
  classification: field("public", verifiedDirectoryEvidence),
  level: field("primary", verifiedDirectoryEvidence),
  gradesServed: field(["1", "2", "3", "4"], verifiedDirectoryEvidence),
  location: {
    district: field("Lichtenberg", verifiedDirectoryEvidence),
    neighbourhood: field("Test", verifiedDirectoryEvidence),
    address: field("Test 2", verifiedDirectoryEvidence),
  },
  ganztag: field("yes", verifiedDirectoryEvidence),
  languages: field(["German"], verifiedDirectoryEvidence),
  research: {
    status: "profile_ready",
    coverageLevel: "detailed",
    lastResearched: "2026-07-01",
    lastSourceChecked: "2026-07-01",
  },
});

const directorySchool = toSchoolDirectoryItem({
  ...validDirectoryOnlySchool,
  id: "sort-directory",
  slug: "sort-directory",
  name: field("Alpha Directory School", verifiedDirectoryEvidence),
  schoolNumber: field("DIR-01", verifiedDirectoryEvidence),
  website: field("https://example.test/directory", verifiedDirectoryEvidence),
  classification: field("public", verifiedDirectoryEvidence),
  level: field("primary", verifiedDirectoryEvidence),
  gradesServed: field(["1", "2", "3", "4"], verifiedDirectoryEvidence),
  location: {
    district: field("Lichtenberg", verifiedDirectoryEvidence),
    neighbourhood: field("Test", verifiedDirectoryEvidence),
    address: field("Test 3", verifiedDirectoryEvidence),
  },
  ganztag: field("yes", verifiedDirectoryEvidence),
  languages: field(["German"], verifiedDirectoryEvidence),
  research: {
    status: "directory_only",
    coverageLevel: "directory",
    lastResearched: "2026-07-01",
    lastSourceChecked: "2026-07-01",
  },
});

describe("sortSchools", () => {
  it('orders by name A→Z with localeCompare pt-BR', () => {
    const sorted = sortSchools(baseSchools, "name");
    const names = sorted.map((school) => school.name);

    expect(names).toEqual([...names].sort((a, b) => a.localeCompare(b, "pt-BR")));
  });

  it("orders by coverage percentage descending with name tie-breaker", () => {
    const schools = [lowCoverageSchool, highCoverageSchool];
    const sorted = sortSchools(schools, "coverage");

    expect(sorted[0]?.name).toBe("Zebra High Coverage School");
    expect(sorted[1]?.name).toBe("Alpha Low Coverage School");
  });

  it('puts coverageLevel "detailed" before "directory" with name tie-breaker', () => {
    const schools = [directorySchool, detailedSchool];
    const sorted = sortSchools(schools, "tier");

    expect(sorted[0]?.coverageLevel).toBe("detailed");
    expect(sorted[1]?.coverageLevel).toBe("directory");
    expect(sorted[0]?.name).toBe("Beta Detailed School");
    expect(sorted[1]?.name).toBe("Alpha Directory School");
  });

  it("does not mutate the input array", () => {
    const schools = [highCoverageSchool, lowCoverageSchool];
    const originalOrder = schools.map((school) => school.id);

    sortSchools(schools, "coverage");

    expect(schools.map((school) => school.id)).toEqual(originalOrder);
  });
});

describe("sortFromSearchParams", () => {
  it('returns "name" when sort param is missing', () => {
    expect(sortFromSearchParams(new URLSearchParams())).toBe("name");
  });

  it('returns "coverage" when sort=coverage', () => {
    expect(sortFromSearchParams(new URLSearchParams("sort=coverage"))).toBe(
      "coverage",
    );
  });

  it('returns "name" for invalid sort values', () => {
    expect(sortFromSearchParams(new URLSearchParams("sort=invalid"))).toBe(
      "name",
    );
  });
});
