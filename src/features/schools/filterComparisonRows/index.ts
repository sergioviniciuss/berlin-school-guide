import { getComparisonCellDisplay } from "@/features/schools/comparisonCellDisplay";
import type { ImportantSchoolFieldPathDetailedV2 } from "@/features/schools/school/constants";
import type { School } from "@/features/schools/school";

export type ComparisonCellSnapshot = {
  valueText: string;
  status: ReturnType<typeof getComparisonCellDisplay>["status"];
};

export function getComparisonCellSnapshot(
  school: School,
  fieldPath: string,
): ComparisonCellSnapshot {
  const { valueText, status } = getComparisonCellDisplay(school, fieldPath);
  return { valueText, status };
}

export function shouldShowComparisonRow(
  snapshots: ComparisonCellSnapshot[],
  showDifferencesOnly: boolean,
): boolean {
  if (!showDifferencesOnly || snapshots.length === 0) {
    return true;
  }

  if (snapshots.every((snapshot) => snapshot.status === "missing")) {
    return true;
  }

  const [first, ...rest] = snapshots;
  const allEquivalent = rest.every(
    (snapshot) =>
      snapshot.valueText === first!.valueText &&
      snapshot.status === first!.status,
  );

  return !allEquivalent;
}

export function filterComparisonFieldPaths(
  schools: School[],
  fieldPaths: ImportantSchoolFieldPathDetailedV2[],
  showDifferencesOnly: boolean,
): ImportantSchoolFieldPathDetailedV2[] {
  if (!showDifferencesOnly) {
    return fieldPaths;
  }

  return fieldPaths.filter((fieldPath) => {
    const snapshots = schools.map((school) =>
      getComparisonCellSnapshot(school, fieldPath),
    );
    return shouldShowComparisonRow(snapshots, true);
  });
}
