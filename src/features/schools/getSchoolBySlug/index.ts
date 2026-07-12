import { getRealSchools } from "@/features/schools/schoolDirectoryData";
import type { School } from "@/features/schools/school";

export function getSchoolBySlug(slug: string): School | undefined {
  return getRealSchools().find((school) => school.slug === slug);
}

export function getAllSchoolSlugs(): string[] {
  return getRealSchools().map((school) => school.slug);
}
