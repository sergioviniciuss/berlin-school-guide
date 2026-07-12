"use client";

import type { DirectorySortKey } from "@/features/schools/sortSchools/types";

type SchoolDirectorySortProps = {
  value: DirectorySortKey;
  onChange: (key: DirectorySortKey) => void;
};

const sortOptions: Array<{ value: DirectorySortKey; label: string }> = [
  { value: "name", label: "Nome (A–Z)" },
  { value: "coverage", label: "Cobertura da pesquisa" },
  { value: "tier", label: "Perfil detalhado primeiro" },
];

export function SchoolDirectorySort({ value, onChange }: SchoolDirectorySortProps) {
  return (
    <div className="flex items-center gap-2 text-sm">
      <label htmlFor="school-directory-sort" className="text-neutral-700">
        Ordenar por
      </label>
      <select
        id="school-directory-sort"
        value={value}
        onChange={(event) => onChange(event.target.value as DirectorySortKey)}
        aria-label="Ordenar resultados do diretório"
        className="rounded-md border border-neutral-300 bg-white px-3 py-2 text-sm shadow-sm outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
      >
        {sortOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}
