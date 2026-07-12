import type { DirectoryFilterState } from "@/features/schools/filterSchools/types";

export type ActiveFilterChip = {
  key: keyof DirectoryFilterState;
  value?: string;
  label: string;
};

export function formatChipValue(value: string): string {
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

export function getActiveFilterChips(
  filters: DirectoryFilterState,
): ActiveFilterChip[] {
  const chips: ActiveFilterChip[] = [];

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
