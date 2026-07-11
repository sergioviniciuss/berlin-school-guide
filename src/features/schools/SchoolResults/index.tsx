import Link from "next/link";

import { getActiveFilterChips } from "@/features/schools/ActiveFilterSummary/utils";
import { SchoolCard } from "@/features/schools/SchoolCard";
import type { DirectoryFilterState } from "@/features/schools/filterSchools/types";
import type { SchoolDirectoryItem } from "@/features/schools/filterSchools/types";

type SchoolResultsProps = {
  schools: SchoolDirectoryItem[];
  filters: DirectoryFilterState;
  totalCount: number;
  onClearSearch: () => void;
  onResetFilters: () => void;
};

const arrayFilterKeys = [
  "districts",
  "neighbourhoods",
  "classifications",
  "ganztag",
  "bilingual",
  "welcomeClasses",
  "languages",
  "educationalFocus",
  "afterSchoolCare",
  "inspectionAvailability",
  "evidenceCoverage",
] as const satisfies ReadonlyArray<keyof DirectoryFilterState>;

function hasActiveArrayFilters(filters: DirectoryFilterState): boolean {
  return arrayFilterKeys.some((key) => filters[key].length > 0);
}

function isSearchOnlyMiss(filters: DirectoryFilterState): boolean {
  return Boolean(filters.query) && !hasActiveArrayFilters(filters);
}

export function SchoolResults({
  schools,
  filters,
  onClearSearch,
  onResetFilters,
}: SchoolResultsProps) {
  if (schools.length === 0) {
    if (isSearchOnlyMiss(filters)) {
      return (
        <section className="rounded-lg border border-neutral-200 bg-neutral-50 p-8 text-center">
          <h2 className="text-xl font-semibold text-neutral-950">
            Nenhuma escola com esse nome
          </h2>
          <p className="mt-2 text-neutral-700">
            Não encontramos uma escola com &quot;{filters.query}&quot;.
            Verifique a grafia ou veja todas as escolas.
          </p>
          <button
            type="button"
            onClick={onClearSearch}
            className="mt-4 rounded-md border border-neutral-300 bg-white px-4 py-2 text-sm font-medium text-neutral-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            Limpar busca
          </button>
        </section>
      );
    }

    const chips = getActiveFilterChips(filters);

    return (
      <section className="rounded-lg border border-neutral-200 bg-neutral-50 p-8">
        <h2 className="text-center text-xl font-semibold text-neutral-950">
          Nenhuma escola encontrada
        </h2>
        {chips.length > 0 ? (
          <>
            <p className="mt-2 text-center text-neutral-700">
              Nenhuma escola corresponde aos filtros ativos. Tente remover
              alguns filtros:
            </p>
            <ul className="mt-4 list-disc space-y-1 pl-6 text-neutral-700">
              {chips.map((chip) => (
                <li key={`${chip.key}-${chip.value ?? "query"}`}>
                  {chip.label}
                </li>
              ))}
            </ul>
          </>
        ) : (
          <p className="mt-2 text-center text-neutral-700">
            Ajuste a busca ou remova alguns filtros para ver mais resultados.
          </p>
        )}
        <div className="mt-6 flex flex-col items-center gap-3">
          <button
            type="button"
            onClick={onResetFilters}
            className="rounded-md border border-neutral-300 bg-white px-4 py-2 text-sm font-medium text-neutral-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            Limpar todos os filtros
          </button>
          <Link
            href="/methodology"
            className="text-sm font-medium text-blue-700 underline"
          >
            Como funciona nossa pesquisa?
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="space-y-4" aria-label="Resultados de escolas">
      {schools.map((school) => (
        <SchoolCard key={school.id} school={school} />
      ))}
    </section>
  );
}
