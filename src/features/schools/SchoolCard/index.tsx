import Link from "next/link";
import { ChevronRight, HelpCircle } from "lucide-react";

import type { FieldStatus } from "@/features/evidence/fieldEvidence";
import { CompareToggleButton } from "@/features/schools/CompareToggleButton";
import type { SchoolDirectoryItem } from "@/features/schools/filterSchools/types";
import type { CoverageLevel } from "@/features/schools/researchMetadata";
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
  isCompareSelected?: boolean;
  onToggleCompare?: () => void;
  selectionFull?: boolean;
};

export function SchoolCard({
  school,
  isCompareSelected = false,
  onToggleCompare,
  selectionFull = false,
}: SchoolCardProps) {
  const profileBadge =
    school.coverageLevel === "directory" ? "Perfil básico" : "Perfil detalhado";
  const compareDisabled = selectionFull && !isCompareSelected;

  return (
    <article className="rounded-lg border border-neutral-200 bg-white shadow-sm hover:border-neutral-300 hover:shadow-md transition-shadow focus-within:ring-2 focus-within:ring-primary">
      <div className="p-5">
        <Link
          href={`/schools/${school.slug}`}
          aria-label={`Ver perfil de ${school.name}`}
          className="block cursor-pointer"
        >
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
                {school.schoolNumber ??
                  formatFieldStatus(school.schoolNumberStatus)}
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
                  value={
                    school.ganztag ?? formatFieldStatus(school.ganztagStatus)
                  }
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
                  value={formatStringList(
                    school.languages,
                    school.languagesStatus,
                  )}
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

            <div className="mt-4 rounded-md bg-neutral-50 p-3">
              <p className="text-sm font-medium text-neutral-950">
                Cobertura da pesquisa
              </p>
              <p className="text-sm text-neutral-700">
                <span className="inline-flex items-center gap-1">
                  {school.coverageTierLabel} · {school.evidenceCoverage.percentage}%
                  <TierHelpButton coverageLevel={school.coverageLevel} />
                </span>{" "}
                · mede completude da pesquisa neste nível, não qualidade da
                escola.
              </p>
            </div>

            <p className="mt-3 text-sm text-blue-700 flex items-center justify-end gap-1">
              Ver perfil <ChevronRight className="size-4" aria-hidden />
            </p>
          </Link>
        </div>
      {onToggleCompare ? (
        <div className="border-t border-neutral-200 px-5 py-3">
          <CompareToggleButton
            isSelected={isCompareSelected}
            disabled={compareDisabled}
            onToggle={onToggleCompare}
          />
        </div>
      ) : null}
    </article>
  );
}

function TierHelpButton({ coverageLevel }: { coverageLevel: CoverageLevel }) {
  const isBasic = coverageLevel === "directory";
  const ariaLabel = isBasic
    ? "O que significa pesquisa básica"
    : "O que significa pesquisa detalhada";
  const title = isBasic
    ? "Pesquisa com dados oficiais do diretório escolar de Berlim. Campos extras ainda não foram verificados de forma independente."
    : "Pesquisa com fontes adicionais além do diretório oficial. A cobertura mostra quantos campos foram verificados neste nível — não a qualidade da escola.";

  return (
    <button
      type="button"
      title={title}
      aria-label={ariaLabel}
      onClick={(event) => {
        event.preventDefault();
        event.stopPropagation();
      }}
      className="inline-flex size-5 shrink-0 items-center justify-center rounded-full text-neutral-500 hover:text-neutral-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
    >
      <HelpCircle className="size-4" aria-hidden />
    </button>
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
