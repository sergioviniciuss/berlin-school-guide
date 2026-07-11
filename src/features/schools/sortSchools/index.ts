import type { SchoolDirectoryItem } from "@/features/schools/filterSchools/types";

import type { DirectorySortKey } from "./types";

export const SORT_PARAM = "sort";

export const VALID_SORT = new Set<DirectorySortKey>(["name", "coverage", "tier"]);

export function sortSchools(
  schools: SchoolDirectoryItem[],
  sortKey: DirectorySortKey = "name",
): SchoolDirectoryItem[] {
  const copy = [...schools];

  switch (sortKey) {
    case "coverage":
      return copy.sort(
        (a, b) =>
          b.evidenceCoverage.percentage - a.evidenceCoverage.percentage ||
          a.name.localeCompare(b.name, "pt-BR"),
      );
    case "tier":
      return copy.sort((a, b) => {
        const tierRank = (school: SchoolDirectoryItem) =>
          school.coverageLevel === "detailed" ? 0 : 1;
        return (
          tierRank(a) - tierRank(b) || a.name.localeCompare(b.name, "pt-BR")
        );
      });
    case "name":
    default:
      return copy.sort((a, b) => a.name.localeCompare(b.name, "pt-BR"));
  }
}

export function sortFromSearchParams(
  params: URLSearchParams,
): DirectorySortKey {
  const value = params.get(SORT_PARAM);

  if (value && VALID_SORT.has(value as DirectorySortKey)) {
    return value as DirectorySortKey;
  }

  return "name";
}

export type { DirectorySortKey } from "./types";
