import Link from "next/link";
import { X } from "lucide-react";

import { ComparisonCellContent } from "@/features/schools/ComparisonCellContent";
import { filterComparisonFieldPaths } from "@/features/schools/filterComparisonRows";
import { COMPARE_PAGE_PARAM } from "@/features/schools/parseCompareSlugs";
import {
  PROFILE_SECTIONS,
  profileFieldLabels,
} from "@/features/schools/SchoolProfile/constants";
import type { School } from "@/features/schools/school";

type ComparisonMobileProps = {
  schools: School[];
  selectedSlugs: string[];
  showDifferencesOnly?: boolean;
};

export function ComparisonMobile({
  schools,
  selectedSlugs,
  showDifferencesOnly = false,
}: ComparisonMobileProps) {
  return (
    <div aria-label="Comparação móvel de critérios" className="space-y-6">
      <div className="space-y-3">
        {schools.map((school) => {
          const remainingSlugs = selectedSlugs.filter(
            (slug) => slug !== school.slug,
          );

          return (
            <div
              key={school.slug}
              className="rounded-lg border border-neutral-200 bg-neutral-50 p-4"
            >
              <div className="flex items-start justify-between gap-2">
                <p className="font-semibold text-neutral-950">
                  {school.name.value}
                </p>
                <Link
                  href={`/compare?${COMPARE_PAGE_PARAM}=${remainingSlugs.join(",")}`}
                  aria-label={`Remover ${school.name.value} da comparação`}
                  className="inline-flex min-h-11 min-w-11 shrink-0 items-center justify-center rounded-full text-neutral-500 hover:bg-neutral-100 hover:text-neutral-800"
                >
                  <X className="size-4" aria-hidden />
                </Link>
              </div>
            </div>
          );
        })}
      </div>

      {PROFILE_SECTIONS.map((section) => {
        const visibleFields = filterComparisonFieldPaths(
          schools,
          section.fields,
          showDifferencesOnly,
        );

        if (visibleFields.length === 0) {
          return null;
        }

        return (
          <section
            key={section.key}
            aria-labelledby={`comparison-mobile-${section.key}`}
            className="space-y-4"
          >
            <h2
              id={`comparison-mobile-${section.key}`}
              className="text-xs font-semibold uppercase tracking-wide text-neutral-700"
            >
              {section.heading}
            </h2>

            {visibleFields.map((fieldPath) => (
              <article
                key={fieldPath}
                className="rounded-lg border border-neutral-200 bg-white p-4"
              >
                <h3 className="text-sm font-semibold text-neutral-950">
                  {profileFieldLabels[fieldPath]}
                </h3>
                <ul className="mt-3 space-y-3">
                  {schools.map((school) => (
                    <li
                      key={`${school.slug}-${fieldPath}`}
                      className="border-t border-neutral-100 pt-3 first:border-0 first:pt-0"
                    >
                      <p className="text-xs font-medium uppercase text-neutral-500">
                        {school.name.value}
                      </p>
                      <div className="mt-1 text-sm">
                        <ComparisonCellContent
                          school={school}
                          fieldPath={fieldPath}
                        />
                      </div>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </section>
        );
      })}
    </div>
  );
}
