import Link from "next/link";
import { ChevronRight } from "lucide-react";

import type { FieldStatus } from "@/features/evidence/fieldEvidence";
import type { SchoolDirectoryItem } from "@/features/schools/filterSchools/types";
import {
  formatBoolean,
  formatClassification,
  formatFieldStatus,
  formatInspectionAvailability,
  formatStringList,
} from "@/features/schools/formatSchoolField";
import { getStatusTone, shouldRenderFact } from "./utils";

type SchoolCardProps = {
  school: SchoolDirectoryItem;
};

export function SchoolCard({ school }: SchoolCardProps) {
  const profileBadge =
    school.coverageLevel === "directory" ? "Perfil básico" : "Perfil detalhado";

  return (
    <Link
      href={`/schools/${school.slug}`}
      aria-label={`Ver perfil de ${school.name}`}
      className="block rounded-lg border border-neutral-200 bg-white shadow-sm hover:border-neutral-300 hover:shadow-md transition-shadow cursor-pointer focus-within:ring-2 focus-within:ring-primary"
    >
      <article className="p-5">
        <div className="space-y-2">
          <h2 className="text-xl font-semibold text-neutral-950">
            {school.name}
          </h2>
          <span className="inline-block text-sm font-medium text-blue-700">
            {profileBadge}
          </span>
          <p className="text-sm text-neutral-700">
            {school.district ?? formatFieldStatus(school.districtStatus)} ·{" "}
            {school.neighbourhood ??
              formatFieldStatus(school.neighbourhoodStatus)}
          </p>
          <p className="text-sm text-neutral-600">
            Número oficial:{" "}
            {school.schoolNumber ?? formatFieldStatus(school.schoolNumberStatus)}
          </p>
        </div>

        <dl className="mt-5 grid gap-3 sm:grid-cols-2">
          {shouldRenderFact(
            school.classification,
            school.classificationStatus,
          ) ? (
            <Fact
              label="Tipo"
              value={formatClassification(school.classification)}
              status={school.classificationStatus}
            />
          ) : null}
          {shouldRenderFact(school.ganztag, school.ganztagStatus) ? (
            <Fact
              label="Ganztag"
              value={school.ganztag ?? formatFieldStatus(school.ganztagStatus)}
              status={school.ganztagStatus}
            />
          ) : null}
          {shouldRenderFact(
            school.bilingualPrograms,
            school.bilingualStatus,
          ) ? (
            <Fact
              label="Bilíngue"
              value={formatStringList(
                school.bilingualPrograms,
                school.bilingualStatus,
              )}
              status={school.bilingualStatus}
            />
          ) : null}
          {shouldRenderFact(
            school.welcomeClasses,
            school.welcomeClassesStatus,
          ) ? (
            <Fact
              label="Willkommensklasse"
              value={formatBoolean(
                school.welcomeClasses,
                school.welcomeClassesStatus,
              )}
              status={school.welcomeClassesStatus}
            />
          ) : null}
          {shouldRenderFact(school.languages, school.languagesStatus) ? (
            <Fact
              label="Idiomas"
              value={formatStringList(school.languages, school.languagesStatus)}
              status={school.languagesStatus}
            />
          ) : null}
          {shouldRenderFact(
            school.inspectionAvailability,
            school.inspectionAvailabilityStatus,
          ) ? (
            <Fact
              label="Inspeção oficial"
              value={formatInspectionAvailability(
                school.inspectionAvailability,
                school.inspectionAvailabilityStatus,
              )}
              status={school.inspectionAvailabilityStatus}
            />
          ) : null}
        </dl>

        <div className="mt-5 rounded-md bg-neutral-50 p-3">
          <p className="text-sm font-medium text-neutral-950">
            Cobertura da pesquisa
          </p>
          <p className="text-sm text-neutral-700">
            {school.coverageTierLabel} · {school.evidenceCoverage.percentage}% ·
            mede completude da pesquisa neste nível, não qualidade da escola.
          </p>
        </div>

        <p className="mt-3 text-sm text-blue-700 flex items-center justify-end gap-1">
          Ver perfil <ChevronRight className="size-4" aria-hidden />
        </p>
      </article>
    </Link>
  );
}

type FactProps = {
  label: string;
  value: string;
  status: FieldStatus;
};

function Fact({ label, value, status }: FactProps) {
  return (
    <div>
      <dt className="text-xs font-medium uppercase text-neutral-500">
        {label}
      </dt>
      <dd className={`text-sm ${getStatusTone(status)}`}>{value}</dd>
    </div>
  );
}
