import { parseCompareSlugs } from "@/features/schools/parseCompareSlugs";

import {
  COMPARE_STORAGE_KEY,
  MAX_COMPARE_SCHOOLS,
} from "./constants";

export { MAX_COMPARE_SCHOOLS } from "./constants";

export function toggleCompareSlug(slugs: string[], slug: string): string[] {
  if (slugs.includes(slug)) {
    return slugs.filter((entry) => entry !== slug);
  }

  if (slugs.length >= MAX_COMPARE_SCHOOLS) {
    return slugs;
  }

  return [...slugs, slug];
}

export function readStoredCompareSlugs(): string[] {
  if (typeof window === "undefined") {
    return [];
  }

  try {
    return parseCompareSlugs(sessionStorage.getItem(COMPARE_STORAGE_KEY));
  } catch {
    return [];
  }
}

export function writeStoredCompareSlugs(slugs: string[]): void {
  if (typeof window === "undefined") {
    return;
  }

  try {
    if (slugs.length === 0) {
      sessionStorage.removeItem(COMPARE_STORAGE_KEY);
      return;
    }

    sessionStorage.setItem(COMPARE_STORAGE_KEY, slugs.join(","));
  } catch {
    // sessionStorage may be unavailable in private mode
  }
}
