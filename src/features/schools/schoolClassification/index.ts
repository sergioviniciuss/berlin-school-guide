import { z } from "zod";

export const schoolClassificationSchema = z.enum(["public", "private"]);

export const schoolLevelSchema = z.enum(["primary", "mixed_with_primary"]);

export const inspectionAvailabilitySchema = z.enum([
  "available",
  "unavailable",
  "not_confirmed",
]);

export type SchoolClassification = z.infer<typeof schoolClassificationSchema>;
export type SchoolLevel = z.infer<typeof schoolLevelSchema>;
export type InspectionAvailability = z.infer<
  typeof inspectionAvailabilitySchema
>;
