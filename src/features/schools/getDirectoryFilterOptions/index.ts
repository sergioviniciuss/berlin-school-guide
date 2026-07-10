import type { SchoolDirectoryItem } from "@/features/schools/filterSchools/types";

export function getDirectoryFilterOptions(schools: SchoolDirectoryItem[]) {
  return {
    districts: uniqueSorted(schools.map((school) => school.district)),
    neighbourhoods: uniqueSorted(schools.map((school) => school.neighbourhood)),
    languages: uniqueSorted(
      schools.flatMap((school) => school.languages ?? []),
    ),
    educationalFocus: uniqueSorted(
      schools.flatMap((school) => school.educationalFocus ?? []),
    ),
  };
}

function uniqueSorted(values: Array<string | null>) {
  return [
    ...new Set(values.filter((value): value is string => Boolean(value))),
  ].sort((a, b) => a.localeCompare(b));
}
