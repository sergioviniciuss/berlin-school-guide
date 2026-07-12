import Link from "next/link";
import { Fragment } from "react";
import { X } from "lucide-react";

import { calculateEvidenceCoverage } from "@/features/evidence/calculateEvidenceCoverage";
import { ComparisonCellContent } from "@/features/schools/ComparisonCellContent";
import { filterComparisonFieldPaths } from "@/features/schools/filterComparisonRows";
import { getCoverageTierLabel } from "@/features/schools/getCoverageTierLabel";
import {
  COMPARE_PAGE_PARAM,
} from "@/features/schools/parseCompareSlugs";
import {
  PROFILE_SECTIONS,
  profileFieldLabels,
} from "@/features/schools/SchoolProfile/constants";
import type { School } from "@/features/schools/school";

type ComparisonTableProps = {
  schools: School[];
  selectedSlugs: string[];
  showDifferencesOnly?: boolean;
};

export function ComparisonTable({
  schools,
  selectedSlugs,
  showDifferencesOnly = false,
}: ComparisonTableProps) {
  return (
    <div className="overflow-x-auto rounded-lg border border-neutral-200">
        <table
          aria-label="Comparação de critérios"
          className="min-w-full border-collapse text-sm"
        >
          <thead>
            <tr className="border-b border-neutral-200 bg-neutral-50">
              <th
                scope="col"
                className="sticky left-0 z-10 min-w-44 bg-neutral-50 px-4 py-3 text-left font-semibold text-neutral-950 lg:static lg:z-auto lg:bg-neutral-50"
              >
                Critério
              </th>
              {schools.map((school) => {
                const coverage = calculateEvidenceCoverage(school);
                const tierLabel = getCoverageTierLabel(
                  school.research.coverageLevel,
                );
                const remainingSlugs = selectedSlugs.filter(
                  (slug) => slug !== school.slug,
                );

                return (
                  <th
                    key={school.slug}
                    scope="col"
                    className="min-w-52 px-4 py-3 text-left align-top"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <p className="font-semibold text-neutral-950">
                          {school.name.value}
                        </p>
                        <p className="mt-1 text-xs text-neutral-600">
                          {tierLabel} · {coverage.percentage}%
                        </p>
                      </div>
                      <Link
                        href={`/compare?${COMPARE_PAGE_PARAM}=${remainingSlugs.join(",")}`}
                        aria-label={`Remover ${school.name.value} da comparação`}
                        className="inline-flex min-h-11 min-w-11 shrink-0 items-center justify-center rounded-full text-neutral-500 hover:bg-neutral-100 hover:text-neutral-800"
                      >
                        <X className="size-4" aria-hidden />
                      </Link>
                    </div>
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
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
                <Fragment key={section.key}>
                  <tr className="bg-neutral-100">
                    <th
                      scope="rowgroup"
                      colSpan={schools.length + 1}
                      className="sticky left-0 z-10 bg-neutral-100 px-4 py-2 text-left text-xs font-semibold uppercase tracking-wide text-neutral-700 lg:static lg:z-auto"
                    >
                      {section.heading}
                    </th>
                  </tr>
                  {visibleFields.map((fieldPath) => (
                    <tr
                      key={fieldPath}
                      className="border-b border-neutral-100 last:border-0"
                    >
                      <th
                        scope="row"
                        className="sticky left-0 z-10 bg-white px-4 py-3 text-left font-medium text-neutral-950 lg:static lg:z-auto lg:bg-transparent"
                      >
                        {profileFieldLabels[fieldPath]}
                      </th>
                      {schools.map((school) => (
                        <td
                          key={`${school.slug}-${fieldPath}`}
                          className="px-4 py-3 align-top"
                        >
                          <ComparisonCellContent
                            school={school}
                            fieldPath={fieldPath}
                          />
                        </td>
                      ))}
                    </tr>
                  ))}
                </Fragment>
              );
            })}
          </tbody>
        </table>
    </div>
  );
}
