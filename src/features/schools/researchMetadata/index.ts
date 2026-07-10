import { z } from "zod";

export const researchStatusSchema = z.enum([
  "directory_only",
  "in_research",
  "profile_ready",
  "needs_review",
  "blocked",
]);

export const coverageLevelSchema = z.enum(["directory", "detailed"]);

export const researchMetadataSchema = z
  .object({
    status: researchStatusSchema,
    coverageLevel: coverageLevelSchema,
    lastResearched: z.string().date().optional(),
    lastSourceChecked: z.string().date().optional(),
    researcherNotes: z.string().optional(),
  })
  .superRefine((research, context) => {
    if (
      research.status === "profile_ready" &&
      research.coverageLevel !== "detailed"
    ) {
      context.addIssue({
        code: "custom",
        path: ["coverageLevel"],
        message: "Profile-ready schools must use detailed coverage.",
      });
    }

    if (research.coverageLevel === "detailed") {
      if (!research.lastResearched) {
        context.addIssue({
          code: "custom",
          path: ["lastResearched"],
          message: "Detailed records must include the last researched date.",
        });
      }

      if (!research.lastSourceChecked) {
        context.addIssue({
          code: "custom",
          path: ["lastSourceChecked"],
          message:
            "Detailed records must include the last source checked date.",
        });
      }
    }
  });

export type ResearchStatus = z.infer<typeof researchStatusSchema>;
export type CoverageLevel = z.infer<typeof coverageLevelSchema>;
export type ResearchMetadata = z.infer<typeof researchMetadataSchema>;
