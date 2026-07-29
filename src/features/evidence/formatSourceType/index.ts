import type { SourceType } from "@/features/evidence/sourceTypes";

const labels: Record<Exclude<SourceType, "anecdotal_reserved">, string> = {
  official_government: "Oficial",
  school_website: "Site da escola",
  official_inspection: "Inspeção oficial",
  public_dataset: "Dados públicos",
  journalism: "Jornalismo independente",
  triangulated_community: "Fontes comunitárias trianguladas",
};

export function formatSourceType(type: SourceType): string | null {
  if (type === "anecdotal_reserved") {
    return null;
  }

  return labels[type];
}
