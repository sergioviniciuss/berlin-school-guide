import { filterSchools, defaultDirectoryFilters } from ".";
import { getSchoolDirectoryItems } from "@/features/schools/schoolDirectoryData";

const schools = getSchoolDirectoryItems();

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
    ).toHaveLength(6);
  });

  it("filters by public/private classification", () => {
    expect(
      filterSchools(schools, {
        ...defaultDirectoryFilters,
        classifications: ["public"],
      }),
    ).toHaveLength(10);
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
        inspectionAvailability: ["not_confirmed"],
      }).length,
    ).toBeGreaterThan(0);
  });

  it("filters evidence coverage by inclusive ranges", () => {
    expect(
      filterSchools(schools, {
        ...defaultDirectoryFilters,
        evidenceCoverage: ["50-79"],
      }).length,
    ).toBeGreaterThan(0);
    expect(
      filterSchools(schools, {
        ...defaultDirectoryFilters,
        evidenceCoverage: ["80-100"],
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
