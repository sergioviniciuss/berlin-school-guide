import type {
  BinaryFilterValue,
  CoverageFilterValue,
  DirectoryFilterState,
  SchoolDirectoryItem,
  StatusFilterValue,
} from "./types";

export const defaultDirectoryFilters: DirectoryFilterState = {
  query: "",
  districts: [],
  neighbourhoods: [],
  classifications: [],
  ganztag: [],
  bilingual: [],
  welcomeClasses: [],
  languages: [],
  educationalFocus: [],
  afterSchoolCare: [],
  inspectionAvailability: [],
  evidenceCoverage: [],
};

export function filterSchools(
  schools: SchoolDirectoryItem[],
  filters: DirectoryFilterState,
): SchoolDirectoryItem[] {
  const query = normalize(filters.query);

  return schools.filter((school) => {
    if (query && !normalize(school.name).includes(query)) {
      return false;
    }

    if (!matchesStringFilter(school.district, filters.districts)) {
      return false;
    }

    if (!matchesStringFilter(school.neighbourhood, filters.neighbourhoods)) {
      return false;
    }

    if (!matchesStringFilter(school.classification, filters.classifications)) {
      return false;
    }

    if (!matchesStatusFilter(school.ganztagStatus, filters.ganztag)) {
      return false;
    }

    if (
      !matchesBinaryFilter(
        school.bilingualPrograms,
        school.bilingualStatus,
        filters.bilingual,
      )
    ) {
      return false;
    }

    if (
      !matchesBooleanFilter(
        school.welcomeClasses,
        school.welcomeClassesStatus,
        filters.welcomeClasses,
      )
    ) {
      return false;
    }

    if (!matchesArrayFilter(school.languages, filters.languages)) {
      return false;
    }

    if (
      !matchesArrayFilter(school.educationalFocus, filters.educationalFocus)
    ) {
      return false;
    }

    if (
      !matchesStatusFilter(
        school.afterSchoolCareStatus,
        filters.afterSchoolCare,
      )
    ) {
      return false;
    }

    if (
      !matchesStringFilter(
        school.inspectionAvailability,
        filters.inspectionAvailability,
      )
    ) {
      return false;
    }

    if (
      !matchesCoverageFilter(
        school.evidenceCoverage.percentage,
        filters.evidenceCoverage,
      )
    ) {
      return false;
    }

    return true;
  });
}

function normalize(value: string) {
  return value
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .toLowerCase()
    .trim();
}

function matchesStringFilter<Value extends string>(
  value: Value | null,
  selected: readonly Value[],
) {
  return selected.length === 0 || (value !== null && selected.includes(value));
}

function matchesArrayFilter(value: string[] | null, selected: string[]) {
  return (
    selected.length === 0 ||
    (value !== null &&
      selected.every((selectedValue) => value.includes(selectedValue)))
  );
}

function matchesStatusFilter(
  status: SchoolDirectoryItem["ganztagStatus"],
  selected: StatusFilterValue[],
) {
  if (selected.length === 0) {
    return true;
  }

  return selected.some((value) => {
    if (value === "verified") {
      return status === "verified";
    }

    return status !== "verified";
  });
}

function matchesBinaryFilter(
  value: string[] | null,
  status: SchoolDirectoryItem["bilingualStatus"],
  selected: BinaryFilterValue[],
) {
  if (selected.length === 0) {
    return true;
  }

  return selected.some((selectedValue) => {
    if (selectedValue === "missing_or_unconfirmed") {
      return status !== "verified";
    }

    if (status !== "verified" || value === null) {
      return false;
    }

    const hasValue = value.length > 0;
    return selectedValue === "yes" ? hasValue : !hasValue;
  });
}

function matchesBooleanFilter(
  value: boolean | null,
  status: SchoolDirectoryItem["welcomeClassesStatus"],
  selected: BinaryFilterValue[],
) {
  if (selected.length === 0) {
    return true;
  }

  return selected.some((selectedValue) => {
    if (selectedValue === "missing_or_unconfirmed") {
      return status !== "verified";
    }

    if (status !== "verified" || value === null) {
      return false;
    }

    return selectedValue === "yes" ? value : !value;
  });
}

function matchesCoverageFilter(
  percentage: number,
  selected: CoverageFilterValue[],
) {
  if (selected.length === 0) {
    return true;
  }

  return selected.some((range) => {
    if (range === "0-49") {
      return percentage >= 0 && percentage <= 49;
    }

    if (range === "50-79") {
      return percentage >= 50 && percentage <= 79;
    }

    return percentage >= 80 && percentage <= 100;
  });
}
