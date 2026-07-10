"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";

import { ActiveFilterSummary } from "@/features/schools/ActiveFilterSummary";
import {
  defaultDirectoryFilters,
  filterSchools,
} from "@/features/schools/filterSchools";
import type {
  DirectoryFilterState,
  SchoolDirectoryItem,
} from "@/features/schools/filterSchools/types";
import { getDirectoryFilterOptions } from "@/features/schools/getDirectoryFilterOptions";
import { SchoolFilters } from "@/features/schools/SchoolFilters";
import { SchoolResults } from "@/features/schools/SchoolResults";
import { SchoolSearch } from "@/features/schools/SchoolSearch";

type SchoolDirectoryProps = {
  schools: SchoolDirectoryItem[];
};

const queryParamMap = {
  query: "q",
  districts: "district",
  neighbourhoods: "neighbourhood",
  classifications: "type",
  ganztag: "ganztag",
  bilingual: "bilingual",
  welcomeClasses: "welcome",
  languages: "language",
  educationalFocus: "focus",
  afterSchoolCare: "afterSchool",
  inspectionAvailability: "inspection",
  evidenceCoverage: "coverage",
} as const satisfies Record<keyof DirectoryFilterState, string>;

export function SchoolDirectory({ schools }: SchoolDirectoryProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const filters = useMemo(
    () => filtersFromSearchParams(searchParams),
    [searchParams],
  );
  const filterOptions = useMemo(
    () => getDirectoryFilterOptions(schools),
    [schools],
  );
  const filteredSchools = useMemo(
    () => filterSchools(schools, filters),
    [schools, filters],
  );

  const updateFilters = (nextFilters: DirectoryFilterState) => {
    router.replace(`${pathname}${toQueryString(nextFilters)}`, {
      scroll: false,
    });
  };

  const setQuery = (query: string) => {
    updateFilters({ ...filters, query });
  };

  const toggleFilter = (key: keyof DirectoryFilterState, value: string) => {
    const current = filters[key];
    if (!Array.isArray(current)) {
      return;
    }

    const currentValues = current.map(String);
    const nextValues = currentValues.includes(value)
      ? currentValues.filter((entry) => entry !== value)
      : [...current, value];

    updateFilters({ ...filters, [key]: nextValues });
  };

  const removeFilter = (key: keyof DirectoryFilterState, value?: string) => {
    if (key === "query") {
      updateFilters({ ...filters, query: "" });
      return;
    }

    const current = filters[key];
    if (!Array.isArray(current)) {
      return;
    }

    updateFilters({
      ...filters,
      [key]: current.filter((entry) => String(entry) !== value),
    });
  };

  const resetFilters = () => updateFilters(defaultDirectoryFilters);

  return (
    <div className="space-y-8">
      <header className="space-y-3">
        <p className="text-sm font-semibold uppercase text-blue-700">
          Diretório estático
        </p>
        <h1 className="text-4xl font-semibold text-neutral-950">Escolas</h1>
        <p className="max-w-3xl text-lg leading-8 text-neutral-700">
          Busque e filtre escolas sintéticas para validar a experiência do
          diretório. A cobertura da pesquisa indica completude dos dados, não
          qualidade da escola.
        </p>
      </header>

      <div className="grid gap-8 lg:grid-cols-[18rem_1fr]">
        <aside className="hidden lg:block">
          <div className="sticky top-6 rounded-lg border border-neutral-200 bg-white p-5">
            <h2 className="mb-5 text-lg font-semibold text-neutral-950">
              Filtros
            </h2>
            <SchoolFilters
              filters={filters}
              options={filterOptions}
              onToggle={toggleFilter}
            />
          </div>
        </aside>

        <section className="space-y-6">
          <SchoolSearch value={filters.query} onChange={setQuery} />

          <div className="lg:hidden">
            <button
              type="button"
              onClick={() => setMobileFiltersOpen((open) => !open)}
              className="rounded-md border border-neutral-300 bg-white px-4 py-2 text-sm font-medium text-neutral-900"
              aria-expanded={mobileFiltersOpen}
              aria-controls="mobile-school-filters"
            >
              {mobileFiltersOpen ? "Fechar filtros" : "Abrir filtros"}
            </button>
            {mobileFiltersOpen ? (
              <div
                id="mobile-school-filters"
                className="mt-4 rounded-lg border border-neutral-200 bg-white p-5"
              >
                <SchoolFilters
                  filters={filters}
                  options={filterOptions}
                  onToggle={toggleFilter}
                />
              </div>
            ) : null}
          </div>

          <ActiveFilterSummary
            filters={filters}
            onRemove={removeFilter}
            onReset={resetFilters}
          />

          <p aria-live="polite" className="text-sm text-neutral-700">
            {filteredSchools.length} de {schools.length} escolas encontradas
          </p>

          <SchoolResults schools={filteredSchools} />
        </section>
      </div>
    </div>
  );
}

function filtersFromSearchParams(
  searchParams: URLSearchParams,
): DirectoryFilterState {
  return {
    query: searchParams.get(queryParamMap.query) ?? "",
    districts: searchParams.getAll(queryParamMap.districts),
    neighbourhoods: searchParams.getAll(queryParamMap.neighbourhoods),
    classifications: searchParams.getAll(
      queryParamMap.classifications,
    ) as DirectoryFilterState["classifications"],
    ganztag: searchParams.getAll(
      queryParamMap.ganztag,
    ) as DirectoryFilterState["ganztag"],
    bilingual: searchParams.getAll(
      queryParamMap.bilingual,
    ) as DirectoryFilterState["bilingual"],
    welcomeClasses: searchParams.getAll(
      queryParamMap.welcomeClasses,
    ) as DirectoryFilterState["welcomeClasses"],
    languages: searchParams.getAll(queryParamMap.languages),
    educationalFocus: searchParams.getAll(queryParamMap.educationalFocus),
    afterSchoolCare: searchParams.getAll(
      queryParamMap.afterSchoolCare,
    ) as DirectoryFilterState["afterSchoolCare"],
    inspectionAvailability: searchParams.getAll(
      queryParamMap.inspectionAvailability,
    ) as DirectoryFilterState["inspectionAvailability"],
    evidenceCoverage: searchParams.getAll(
      queryParamMap.evidenceCoverage,
    ) as DirectoryFilterState["evidenceCoverage"],
  };
}

function toQueryString(filters: DirectoryFilterState) {
  const params = new URLSearchParams();

  if (filters.query) {
    params.set(queryParamMap.query, filters.query);
  }

  for (const key of Object.keys(queryParamMap) as Array<
    keyof DirectoryFilterState
  >) {
    if (key === "query") {
      continue;
    }

    const values = filters[key];
    if (Array.isArray(values)) {
      values.forEach((value) =>
        params.append(queryParamMap[key], String(value)),
      );
    }
  }

  const queryString = params.toString();
  return queryString ? `?${queryString}` : "";
}
