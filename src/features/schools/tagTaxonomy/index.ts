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

export type TagCategoryId =
  | "academic_focus"
  | "learning_model"
  | "student_support"
  | "school_environment";

export const TAG_CATEGORY_ORDER: TagCategoryId[] = [
  "academic_focus",
  "learning_model",
  "student_support",
  "school_environment",
];

const tagCategoryById: Record<TagTaxonomyId, TagCategoryId> = {
  "stem-focus": "academic_focus",
  "languages-focus": "academic_focus",
  "arts-music-focus": "academic_focus",
  "bilingual-program": "learning_model",
  "special-pedagogical-model": "learning_model",
  "all-day-model": "learning_model",
  "inclusion-support": "student_support",
  "transition-support": "student_support",
  "structured-learning-environment": "school_environment",
  "active-school-community": "school_environment",
};

const tagCategoryLabels: Record<TagCategoryId, string> = {
  academic_focus: "Foco acadêmico",
  learning_model: "Modelo de aprendizagem",
  student_support: "Apoio ao aluno",
  school_environment: "Ambiente escolar",
};

export function getTagCategory(id: TagTaxonomyId): TagCategoryId {
  return tagCategoryById[id];
}

export function formatTagCategory(categoryId: TagCategoryId): string {
  return tagCategoryLabels[categoryId];
}
