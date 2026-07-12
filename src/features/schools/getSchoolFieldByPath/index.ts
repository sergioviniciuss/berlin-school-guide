import type { FieldValue } from "@/features/evidence/fieldEvidence";
import type { School } from "@/features/schools/school";

export function getSchoolFieldByPath(
  school: School,
  path: string,
): FieldValue<unknown> | undefined {
  const value = path.split(".").reduce<unknown>((current, segment) => {
    if (typeof current !== "object" || current === null) {
      return undefined;
    }

    return (current as Record<string, unknown>)[segment];
  }, school);

  if (isFieldValue(value)) {
    return value;
  }

  return undefined;
}

function isFieldValue(input: unknown): input is FieldValue<unknown> {
  return (
    typeof input === "object" &&
    input !== null &&
    "value" in input &&
    "evidence" in input
  );
}
