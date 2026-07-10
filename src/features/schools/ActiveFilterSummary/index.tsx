"use client";

import type { DirectoryFilterState } from "@/features/schools/filterSchools/types";

type ActiveFilterSummaryProps = {
  filters: DirectoryFilterState;
  onRemove: (key: keyof DirectoryFilterState, value?: string) => void;
  onReset: () => void;
};

export function ActiveFilterSummary({
  filters,
  onRemove,
  onReset,
}: ActiveFilterSummaryProps) {
  const chips = getChips(filters);

  if (chips.length === 0) {
    return null;
  }

  return (
    <div className="space-y-3" aria-label="Filtros ativos">
      <div className="flex flex-wrap gap-2">
        {chips.map((chip) => (
          <button
            key={`${chip.key}-${chip.value ?? "query"}`}
            type="button"
            onClick={() => onRemove(chip.key, chip.value)}
            className="rounded-full border border-neutral-300 bg-white px-3 py-1 text-sm text-neutral-800"
            aria-label={`Remover filtro ${chip.label}`}
          >
            {chip.label} ×
          </button>
        ))}
      </div>
      <button
        type="button"
        onClick={onReset}
        className="text-sm font-medium text-blue-700"
      >
        Limpar filtros
      </button>
    </div>
  );
}

function getChips(filters: DirectoryFilterState) {
  const chips: Array<{
    key: keyof DirectoryFilterState;
    value?: string;
    label: string;
  }> = [];

  if (filters.query) {
    chips.push({ key: "query", label: `Busca: ${filters.query}` });
  }

  const addValues = <Key extends keyof DirectoryFilterState>(
    key: Key,
    label: string,
  ) => {
    const value = filters[key];
    if (Array.isArray(value)) {
      value.forEach((entry) => {
        chips.push({
          key,
          value: String(entry),
          label: `${label}: ${formatChipValue(String(entry))}`,
        });
      });
    }
  };

  addValues("districts", "Distrito");
  addValues("neighbourhoods", "Bairro");
  addValues("classifications", "Tipo");
  addValues("ganztag", "Ganztag");
  addValues("bilingual", "Bilíngue");
  addValues("welcomeClasses", "Willkommensklasse");
  addValues("languages", "Idioma");
  addValues("educationalFocus", "Foco");
  addValues("afterSchoolCare", "Contraturno");
  addValues("inspectionAvailability", "Inspeção");
  addValues("evidenceCoverage", "Cobertura");

  return chips;
}

function formatChipValue(value: string) {
  const labels: Record<string, string> = {
    public: "Pública",
    private: "Privada",
    yes: "Sim",
    no: "Não",
    missing_or_unconfirmed: "Faltante ou incerta",
    verified: "Verificada",
    available: "Disponível",
    unavailable: "Indisponível",
    not_confirmed: "Não confirmada",
  };

  return labels[value] ?? value;
}
