"use client";

import type { DirectoryFilterState } from "@/features/schools/filterSchools/types";

import { getActiveFilterChips } from "./utils";

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
  const chips = getActiveFilterChips(filters);

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
