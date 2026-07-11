import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";

import { realLichtenbergPrimarySchools } from "@/content/schools/real/lichtenbergPrimarySchools";
import { schoolSchema } from "@/features/schools/school";
import { validateResearchDates } from "@/features/schools/validateResearchDates";

const fixturesDirectory = join(
  process.cwd(),
  "src",
  "content",
  "schools",
  "fixtures",
);

export function validateSchoolFixtures() {
  const fixtureFiles = readdirSync(fixturesDirectory)
    .filter((fileName) => fileName.endsWith(".json"))
    .sort();

  const failures = fixtureFiles.flatMap((fileName) => {
    const filePath = join(fixturesDirectory, fileName);
    const raw = JSON.parse(readFileSync(filePath, "utf8")) as unknown;
    const result = schoolSchema.safeParse(raw);

    if (result.success) {
      return [];
    }

    return [
      {
        fileName,
        errors: result.error.issues.map(
          (issue) => `${issue.path.join(".")}: ${issue.message}`,
        ),
      },
    ];
  });

  return {
    checked: fixtureFiles.length,
    failures,
  };
}

export function validateRealSchools() {
  const failures = realLichtenbergPrimarySchools.flatMap((school) => {
    const result = schoolSchema.safeParse(school);

    if (result.success) {
      const dateErrors = validateResearchDates(result.data);
      if (dateErrors.length === 0) {
        return [];
      }

      return [
        {
          fileName: `real:${school.id}`,
          errors: dateErrors,
        },
      ];
    }

    return [
      {
        fileName: `real:${school.id}`,
        errors: result.error.issues.map(
          (issue) => `${issue.path.join(".")}: ${issue.message}`,
        ),
      },
    ];
  });

  return {
    checked: realLichtenbergPrimarySchools.length,
    failures,
  };
}

if (process.env.NODE_ENV !== "test") {
  const fixtureResult = validateSchoolFixtures();
  const realResult = validateRealSchools();
  const failures = [...fixtureResult.failures, ...realResult.failures];

  if (failures.length > 0) {
    console.error(JSON.stringify(failures, null, 2));
    process.exit(1);
  }

  console.log(
    `Validated ${fixtureResult.checked} fixture school(s) and ${realResult.checked} real school record(s).`,
  );
}
