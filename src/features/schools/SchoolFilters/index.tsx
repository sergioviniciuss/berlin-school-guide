"use client";

import type { SchoolFiltersProps } from "./types";

export function SchoolFilters({
  filters,
  options,
  onToggle,
}: SchoolFiltersProps) {
  return (
    <div className="space-y-6">
      <FilterGroup
        legend="Distrito"
        name="district"
        values={options.districts}
        selected={filters.districts}
        onToggle={(value) => onToggle("districts", value)}
      />
      <FilterGroup
        legend="Bairro"
        name="neighbourhood"
        values={options.neighbourhoods}
        selected={filters.neighbourhoods}
        onToggle={(value) => onToggle("neighbourhoods", value)}
      />
      <FilterGroup
        legend="Tipo"
        name="type"
        values={["public", "private"]}
        labels={{ public: "Pública", private: "Privada" }}
        selected={filters.classifications}
        onToggle={(value) => onToggle("classifications", value)}
      />
      <FilterGroup
        legend="Ganztag"
        name="ganztag"
        values={["verified", "missing_or_unconfirmed"]}
        labels={{
          verified: "Com informação verificada",
          missing_or_unconfirmed: "Faltante ou incerta",
        }}
        selected={filters.ganztag}
        onToggle={(value) => onToggle("ganztag", value)}
      />
      <FilterGroup
        legend="Bilíngue"
        name="bilingual"
        values={["yes", "no", "missing_or_unconfirmed"]}
        labels={{
          yes: "Sim",
          no: "Não",
          missing_or_unconfirmed: "Faltante ou incerta",
        }}
        selected={filters.bilingual}
        onToggle={(value) => onToggle("bilingual", value)}
      />
      <FilterGroup
        legend="Willkommensklasse"
        name="welcome"
        values={["yes", "no", "missing_or_unconfirmed"]}
        labels={{
          yes: "Sim",
          no: "Não",
          missing_or_unconfirmed: "Faltante ou incerta",
        }}
        selected={filters.welcomeClasses}
        onToggle={(value) => onToggle("welcomeClasses", value)}
      />
      <FilterGroup
        legend="Idiomas"
        name="language"
        values={options.languages}
        selected={filters.languages}
        onToggle={(value) => onToggle("languages", value)}
      />
      <FilterGroup
        legend="Foco educacional"
        name="focus"
        values={options.educationalFocus}
        selected={filters.educationalFocus}
        onToggle={(value) => onToggle("educationalFocus", value)}
      />
      <FilterGroup
        legend="Cuidado no contraturno"
        name="afterSchool"
        values={["verified", "missing_or_unconfirmed"]}
        labels={{
          verified: "Com informação verificada",
          missing_or_unconfirmed: "Faltante ou incerta",
        }}
        selected={filters.afterSchoolCare}
        onToggle={(value) => onToggle("afterSchoolCare", value)}
      />
      <FilterGroup
        legend="Inspeção oficial"
        name="inspection"
        values={["available", "unavailable", "not_confirmed"]}
        labels={{
          available: "Disponível",
          unavailable: "Indisponível",
          not_confirmed: "Não confirmada",
        }}
        selected={filters.inspectionAvailability}
        onToggle={(value) => onToggle("inspectionAvailability", value)}
      />
      <FilterGroup
        legend="Cobertura da pesquisa"
        name="coverage"
        values={["0-49", "50-79", "80-100"]}
        labels={{ "0-49": "0–49%", "50-79": "50–79%", "80-100": "80–100%" }}
        selected={filters.evidenceCoverage}
        onToggle={(value) => onToggle("evidenceCoverage", value)}
      />
    </div>
  );
}

type FilterGroupProps<Value extends string> = {
  legend: string;
  name: string;
  values: readonly Value[];
  selected: readonly Value[];
  labels?: Partial<Record<Value, string>>;
  onToggle: (value: Value) => void;
};

function FilterGroup<Value extends string>({
  legend,
  name,
  values,
  selected,
  labels,
  onToggle,
}: FilterGroupProps<Value>) {
  return (
    <fieldset className="space-y-3">
      <legend className="text-sm font-semibold text-neutral-950">
        {legend}
      </legend>
      <div className="space-y-2">
        {values.map((value) => (
          <label
            key={value}
            className="flex items-center gap-2 text-sm text-neutral-800"
          >
            <input
              type="checkbox"
              name={name}
              value={value}
              checked={selected.includes(value)}
              onChange={() => onToggle(value)}
              className="h-4 w-4 rounded border-neutral-300"
            />
            <span>{labels?.[value] ?? value}</span>
          </label>
        ))}
      </div>
    </fieldset>
  );
}
