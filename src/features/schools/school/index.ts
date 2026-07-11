import { z } from "zod";

import {
  createFieldValueSchema,
  type FieldEvidence,
} from "@/features/evidence/fieldEvidence";
import { sourceSchema } from "@/features/evidence/source";
import { validateFieldCitations } from "@/features/evidence/validateFieldCitations";
import { researchMetadataSchema } from "@/features/schools/researchMetadata";
import {
  inspectionAvailabilitySchema,
  schoolClassificationSchema,
  schoolLevelSchema,
} from "@/features/schools/schoolClassification";
import { schoolLocationSchema } from "@/features/schools/schoolLocation";

const slugSchema = z
  .string()
  .min(1)
  .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/);

const stringArraySchema = z.array(z.string().min(1));

export const schoolSchema = z
  .object({
    id: z.string().min(1),
    slug: slugSchema,
    name: createFieldValueSchema(z.string().min(1)),
    schoolNumber: createFieldValueSchema(z.string().min(1)),
    website: createFieldValueSchema(z.string().url()),
    classification: createFieldValueSchema(schoolClassificationSchema),
    level: createFieldValueSchema(schoolLevelSchema),
    primarySectionDescription: createFieldValueSchema(
      z.string().min(1),
    ).optional(),
    location: schoolLocationSchema,
    gradesServed: createFieldValueSchema(stringArraySchema.min(1)),
    ganztag: createFieldValueSchema(z.string().min(1)),
    afterSchoolCare: createFieldValueSchema(z.string().min(1)),
    languages: createFieldValueSchema(stringArraySchema),
    bilingualPrograms: createFieldValueSchema(stringArraySchema),
    internationalPrograms: createFieldValueSchema(stringArraySchema),
    welcomeClasses: createFieldValueSchema(z.boolean()),
    schoolProfile: createFieldValueSchema(z.string().min(1)),
    pedagogyFocus: createFieldValueSchema(stringArraySchema),
    inclusionSupport: createFieldValueSchema(z.string().min(1)),
    transitionAfterGrade6: createFieldValueSchema(z.string().min(1)),
    familyCommunication: createFieldValueSchema(z.string().min(1)),
    inspectionAvailability: createFieldValueSchema(
      inspectionAvailabilitySchema,
    ),
    inspectionData: createFieldValueSchema(z.string().min(1)),
    facilities: createFieldValueSchema(stringArraySchema),
    sources: z.array(sourceSchema).min(1),
    research: researchMetadataSchema,
  })
  // Citation quality gate (RSCH-04 data layer) — verified fields require acceptable primary/secondary source
  .superRefine((school, context) => {
    const fieldEntries = collectFieldEvidence(school);

    for (const { path, value, evidence } of fieldEntries) {
      const citationResult = validateFieldCitations(evidence, school.sources);

      if (citationResult.hasUnknownSource) {
        context.addIssue({
          code: "custom",
          path: [...path, "evidence", "citations"],
          message:
            "Field citation references a source that does not exist on the school record.",
        });
      }

      if (evidence.status === "verified") {
        if (value === null) {
          context.addIssue({
            code: "custom",
            path,
            message: "Verified fields must include a non-null value.",
          });
        }

        if (evidence.citations.length === 0) {
          context.addIssue({
            code: "custom",
            path: [...path, "evidence", "citations"],
            message: "Verified fields must include at least one citation.",
          });
        }

        if (!citationResult.hasAcceptableSource) {
          context.addIssue({
            code: "custom",
            path: [...path, "evidence", "citations"],
            message:
              "Verified fields must cite at least one primary or secondary source.",
          });
        }
      }
    }

    if (school.level.value === "mixed_with_primary") {
      if (!school.primarySectionDescription) {
        context.addIssue({
          code: "custom",
          path: ["primarySectionDescription"],
          message:
            "Mixed-level schools must describe how the primary section is represented.",
        });
      }

      if (school.primarySectionDescription?.evidence.status === "verified") {
        const result = validateFieldCitations(
          school.primarySectionDescription.evidence,
          school.sources,
        );

        if (!result.hasAcceptableSource) {
          context.addIssue({
            code: "custom",
            path: ["primarySectionDescription", "evidence", "citations"],
            message:
              "Verified primary section descriptions must cite an acceptable source.",
          });
        }
      }
    }
  });

export type School = z.infer<typeof schoolSchema>;

type FieldEvidenceEntry = {
  path: (string | number)[];
  value: unknown;
  evidence: FieldEvidence;
};

function isFieldValue(
  input: unknown,
): input is { value: unknown; evidence: FieldEvidence } {
  return (
    typeof input === "object" &&
    input !== null &&
    "value" in input &&
    "evidence" in input &&
    typeof (input as { evidence?: unknown }).evidence === "object"
  );
}

export function collectFieldEvidence(
  input: unknown,
  path: (string | number)[] = [],
): FieldEvidenceEntry[] {
  if (isFieldValue(input)) {
    return [{ path, value: input.value, evidence: input.evidence }];
  }

  if (Array.isArray(input)) {
    return input.flatMap((item, index) =>
      collectFieldEvidence(item, [...path, index]),
    );
  }

  if (typeof input === "object" && input !== null) {
    return Object.entries(input).flatMap(([key, value]) =>
      collectFieldEvidence(value, [...path, key]),
    );
  }

  return [];
}
