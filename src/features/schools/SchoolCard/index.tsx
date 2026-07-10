import type { FieldStatus } from "@/features/evidence/fieldEvidence";
import type { SchoolDirectoryItem } from "@/features/schools/filterSchools/types";
import {
  formatBoolean,
  formatClassification,
  formatFieldStatus,
  formatInspectionAvailability,
  formatStringList,
} from "@/features/schools/formatSchoolField";
import { getStatusTone } from "./utils";

type SchoolCardProps = {
  school: SchoolDirectoryItem;
};

export function SchoolCard({ school }: SchoolCardProps) {
  return (
    <article className="rounded-lg border border-neutral-200 bg-white p-5 shadow-sm">
      <div className="space-y-2">
        <h2 className="text-xl font-semibold text-neutral-950">
          {school.name}
        </h2>
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
        <Fact
          label="Tipo"
          value={formatClassification(school.classification)}
          status={school.classificationStatus}
        />
        <Fact
          label="Ganztag"
          value={school.ganztag ?? formatFieldStatus(school.ganztagStatus)}
          status={school.ganztagStatus}
        />
        <Fact
          label="Bilíngue"
          value={formatStringList(
            school.bilingualPrograms,
            school.bilingualStatus,
          )}
          status={school.bilingualStatus}
        />
        <Fact
          label="Willkommensklasse"
          value={formatBoolean(
            school.welcomeClasses,
            school.welcomeClassesStatus,
          )}
          status={school.welcomeClassesStatus}
        />
        <Fact
          label="Idiomas"
          value={formatStringList(school.languages, school.languagesStatus)}
          status={school.languagesStatus}
        />
        <Fact
          label="Inspeção oficial"
          value={formatInspectionAvailability(
            school.inspectionAvailability,
            school.inspectionAvailabilityStatus,
          )}
          status={school.inspectionAvailabilityStatus}
        />
      </dl>

      <div className="mt-5 rounded-md bg-neutral-50 p-3">
        <p className="text-sm font-medium text-neutral-950">
          Cobertura da pesquisa
        </p>
        <p className="text-sm text-neutral-700">
          {school.evidenceCoverage.percentage}% · Percentual de campos
          importantes com informação verificada.
        </p>
      </div>
    </article>
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
