export const COMPARE_PARAM = "compare";
export const COMPARE_PAGE_PARAM = "schools";

const MAX_COMPARE_SCHOOLS = 4;

export function parseCompareSlugs(raw: string | null, max = MAX_COMPARE_SCHOOLS): string[] {
  if (!raw) {
    return [];
  }

  const seen = new Set<string>();
  const slugs: string[] = [];

  for (const part of raw.split(",")) {
    const slug = part.trim();
    if (!slug || seen.has(slug)) {
      continue;
    }

    seen.add(slug);
    slugs.push(slug);

    if (slugs.length >= max) {
      break;
    }
  }

  return slugs;
}

export function buildComparePageHref(slugs: string[]): string {
  if (slugs.length < 2) {
    return "/compare";
  }

  return `/compare?${COMPARE_PAGE_PARAM}=${slugs.join(",")}`;
}
