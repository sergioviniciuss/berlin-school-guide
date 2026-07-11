import type { FieldStatus } from "@/features/evidence/fieldEvidence";
import type {
  InspectionAvailability,
  SchoolClassification,
} from "@/features/schools/schoolClassification";

export function formatFieldStatus(status: FieldStatus) {
  const labels: Record<FieldStatus, string> = {
    verified: "Verificado",
    missing: "Informação não encontrada",
    unverified: "Informação não verificada",
    not_confirmed: "Informação inferida, não confirmada",
    outdated: "Precisa de nova verificação",
    conflicting: "Informação conflitante",
    not_applicable: "Não se aplica",
  };

  return labels[status];
}

export function formatClassification(
  classification: SchoolClassification | null,
) {
  if (classification === "public") {
    return "Pública";
  }

  if (classification === "private") {
    return "Privada";
  }

  return "Informação não encontrada";
}

export function formatBoolean(value: boolean | null, status: FieldStatus) {
  if (status !== "verified" || value === null) {
    return formatFieldStatus(status);
  }

  return value ? "Sim" : "Não";
}

export function formatInspectionAvailability(
  value: InspectionAvailability | null,
  status: FieldStatus,
) {
  if (status !== "verified" || value === null) {
    return formatFieldStatus(status);
  }

  const labels: Record<InspectionAvailability, string> = {
    available: "Disponível",
    unavailable: "Indisponível",
    not_confirmed: "Não confirmada",
  };

  return labels[value];
}

export function formatStringList(value: string[] | null, status: FieldStatus) {
  if (status !== "verified" || value === null) {
    return formatFieldStatus(status);
  }

  if (value.length === 0) {
    return "Não informado";
  }

  return value.join(", ");
}
