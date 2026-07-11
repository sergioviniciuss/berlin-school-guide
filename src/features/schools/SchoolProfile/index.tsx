import Link from "next/link";
import { ExternalLink } from "lucide-react";

import { calculateEvidenceCoverage } from "@/features/evidence/calculateEvidenceCoverage";
import { collectCitedSources } from "@/features/schools/collectCitedSources";
import { formatFieldStatus } from "@/features/schools/formatSchoolField";
import { getCoverageTierLabel } from "@/features/schools/getCoverageTierLabel";
import { getSchoolFieldByPath } from "@/features/schools/getSchoolFieldByPath";
import { ProfileFieldRow } from "@/features/schools/ProfileFieldRow";
import { ProfileSection } from "@/features/schools/ProfileSection";
import type { School } from "@/features/schools/school";
import { SourcesSection } from "@/features/schools/SourcesSection";

import { PROFILE_SECTIONS, profileFieldLabels } from "./constants";

type SchoolProfileProps = {
  school: School;
};

export function SchoolProfile({ school }: SchoolProfileProps) {
  const coverage = calculateEvidenceCoverage(school);
  const coverageTierLabel = getCoverageTierLabel(school.research.coverageLevel);
  const profileBadge =
    school.research.coverageLevel === "directory"
      ? "Perfil básico"
      : "Perfil detalhado";
  const groupedSources = collectCitedSources(school);

  const districtText =
    school.location.district.evidence.status === "verified" &&
    school.location.district.value
      ? school.location.district.value
      : formatFieldStatus(school.location.district.evidence.status);

  const neighbourhoodText =
    school.location.neighbourhood.evidence.status === "verified" &&
    school.location.neighbourhood.value
      ? school.location.neighbourhood.value
      : formatFieldStatus(school.location.neighbourhood.evidence.status);

  const addressText =
    school.location.address.evidence.status === "verified" &&
    school.location.address.value
      ? school.location.address.value
      : formatFieldStatus(school.location.address.evidence.status);

  const showWebsiteLink = school.website.evidence.status === "verified";

  return (
    <div className="space-y-12">
      <header className="space-y-4">
        <p className="text-sm font-semibold uppercase tracking-wide text-blue-700">
          {districtText} · {neighbourhoodText}
        </p>
        <h1 className="text-4xl font-semibold">{school.name.value}</h1>
        <span className="inline-block text-sm font-medium text-blue-700">
          {profileBadge}
        </span>
        <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-base text-neutral-900">
          {showWebsiteLink ? (
            <>
              <a
                href={school.website.value!}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-blue-700 underline-offset-2 hover:underline"
              >
                Site da escola
                <ExternalLink className="size-3.5" aria-hidden />
              </a>
              <span aria-hidden>·</span>
            </>
          ) : null}
          <span>{addressText}</span>
        </div>

        <div className="rounded-md border border-neutral-200 bg-neutral-50 p-4">
          <p className="text-sm font-medium text-neutral-950">
            Cobertura da pesquisa
          </p>
          <p className="text-sm text-neutral-700">
            {coverageTierLabel} · {coverage.percentage}% · mede completude da
            pesquisa neste nível, não qualidade da escola.
          </p>
          <p className="mt-2 text-sm text-neutral-700">
            Informações marcadas como ausentes ou não confirmadas ainda não foram
            verificadas em nossa pesquisa.{" "}
            <Link
              href="/methodology"
              className="font-medium text-blue-700 underline"
            >
              Como interpretamos evidências
            </Link>
          </p>
        </div>

        {school.research.lastResearched || school.research.lastSourceChecked ? (
          <p className="text-sm text-neutral-600">
            {school.research.lastResearched ? (
              <>Última pesquisa: {school.research.lastResearched}</>
            ) : null}
            {school.research.lastResearched &&
            school.research.lastSourceChecked ? (
              <> · </>
            ) : null}
            {school.research.lastSourceChecked ? (
              <>
                Fontes verificadas em: {school.research.lastSourceChecked}
              </>
            ) : null}
          </p>
        ) : null}
      </header>

      {PROFILE_SECTIONS.map((section) => (
        <ProfileSection key={section.key} heading={section.heading}>
          {section.fields.map((fieldPath) => {
            const field = getSchoolFieldByPath(school, fieldPath);
            if (!field) {
              return null;
            }

            return (
              <ProfileFieldRow
                key={fieldPath}
                label={profileFieldLabels[fieldPath]}
                fieldPath={fieldPath}
                field={field}
                school={school}
              />
            );
          })}
        </ProfileSection>
      ))}

      <SourcesSection groupedSources={groupedSources} />
    </div>
  );
}
