import { z } from "zod";

import { tagCitationSchema } from "@/features/evidence/tagCitation";

export const tagTaxonomyIdSchema = z.enum([
  "stem-focus",
  "languages-focus",
  "arts-music-focus",
  "bilingual-program",
  "special-pedagogical-model",
  "all-day-model",
  "inclusion-support",
  "transition-support",
  "structured-learning-environment",
  "active-school-community",
]);

export const tagConfidenceSchema = z.enum([
  "confirmed_multi_source",
  "confirmed_official",
  "partial",
]);

export const schoolTagSchema = z.object({
  id: tagTaxonomyIdSchema,
  confidence: tagConfidenceSchema,
  citations: z.array(tagCitationSchema).min(1),
});

export type TagTaxonomyId = z.infer<typeof tagTaxonomyIdSchema>;
export type TagConfidence = z.infer<typeof tagConfidenceSchema>;
export type SchoolTag = z.infer<typeof schoolTagSchema>;

const tagIdLabels: Record<TagTaxonomyId, string> = {
  "stem-focus": "Foco em STEM",
  "languages-focus": "Foco em idiomas",
  "arts-music-focus": "Foco em artes e música",
  "bilingual-program": "Programa bilíngue",
  "special-pedagogical-model": "Modelo pedagógico específico",
  "all-day-model": "Modelo de período integral",
  "inclusion-support": "Apoio à inclusão",
  "transition-support": "Apoio na transição",
  "structured-learning-environment": "Ambiente de aprendizagem estruturado",
  "active-school-community": "Comunidade escolar ativa",
};

export function formatTagId(id: TagTaxonomyId): string {
  return tagIdLabels[id];
}
