import { getSchoolBySlug } from "@/features/schools/getSchoolBySlug";
import type { School } from "@/features/schools/school";

export function resolveCompareSchools(slugs: string[]) {
  const schools: School[] = [];
  const skippedSlugs: string[] = [];

  for (const slug of slugs) {
    const school = getSchoolBySlug(slug);

    if (school) {
      schools.push(school);
    } else {
      skippedSlugs.push(slug);
    }
  }

  return { schools, skippedSlugs };
}
