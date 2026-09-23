import type { TagConfidence } from "@/features/schools/tagTaxonomy";

const labels: Record<TagConfidence, string> = {
  confirmed_multi_source: "Confirmado por múltiplas fontes",
  confirmed_official: "Confirmado por fonte oficial",
  partial: "Evidência parcial",
};

export function formatTagConfidence(confidence: TagConfidence): string {
  return labels[confidence];
}
