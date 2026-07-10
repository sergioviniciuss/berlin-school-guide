import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";

import { schoolSchema } from "@/features/schools/school";

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

if (process.env.NODE_ENV !== "test") {
  const result = validateSchoolFixtures();

  if (result.failures.length > 0) {
    console.error(JSON.stringify(result.failures, null, 2));
    process.exit(1);
  }

  console.log(`Validated ${result.checked} school fixture(s).`);
}
