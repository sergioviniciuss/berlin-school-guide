import type { DirectoryFilterState } from "@/features/schools/filterSchools/types";

export const FILTER_ARRAY_KEYS = [
  "districts",
  "neighbourhoods",
  "classifications",
  "ganztag",
  "bilingual",
  "welcomeClasses",
  "languages",
  "educationalFocus",
  "afterSchoolCare",
  "inspectionAvailability",
  "evidenceCoverage",
] as const satisfies ReadonlyArray<
  Exclude<keyof DirectoryFilterState, "query">
>;

export function countActiveFilters(filters: DirectoryFilterState): number {
  let count = filters.query ? 1 : 0;

  for (const key of FILTER_ARRAY_KEYS) {
    count += filters[key].length;
  }

  return count;
}
