import {
  field,
  validDirectoryOnlySchool,
  verifiedDirectoryEvidence,
} from "@/features/schools/school/fixtures";
import type { School } from "@/features/schools/school";
import type { SchoolClassification } from "@/features/schools/schoolClassification";

import {
  filterComparisonFieldPaths,
  getComparisonCellSnapshot,
  shouldShowComparisonRow,
} from ".";

describe("getComparisonCellSnapshot", () => {
  it("uses em dash and missing status when field path is absent", () => {
    expect(getComparisonCellSnapshot(validDirectoryOnlySchool, "nonexistent")).toEqual({
      valueText: "—",
      status: "missing",
    });
  });

  it("uses formatted value and evidence status for present fields", () => {
    expect(
      getComparisonCellSnapshot(validDirectoryOnlySchool, "classification"),
    ).toEqual({
      valueText: "Pública",
      status: "verified",
    });
  });
});

describe("shouldShowComparisonRow", () => {
  it("shows all rows when differences-only is off", () => {
    expect(
      shouldShowComparisonRow(
        [
          { valueText: "A", status: "verified" },
          { valueText: "A", status: "verified" },
        ],
        false,
      ),
    ).toBe(true);
  });

  it("hides rows with identical rendered value and status", () => {
    expect(
      shouldShowComparisonRow(
        [
          { valueText: "Pública", status: "verified" },
          { valueText: "Pública", status: "verified" },
        ],
        true,
      ),
    ).toBe(false);
  });

  it("keeps rows when evidence statuses differ even if value text matches", () => {
    expect(
      shouldShowComparisonRow(
        [
          { valueText: "Pública", status: "verified" },
          { valueText: "Pública", status: "not_confirmed" },
        ],
        true,
      ),
    ).toBe(true);
  });

  it("keeps rows when every school is missing for the field", () => {
    expect(
      shouldShowComparisonRow(
        [
          { valueText: "—", status: "missing" },
          { valueText: "—", status: "missing" },
        ],
        true,
      ),
    ).toBe(true);
  });
});

describe("filterComparisonFieldPaths", () => {
  const schoolA = validDirectoryOnlySchool;
  const schoolB: School = {
    ...validDirectoryOnlySchool,
    slug: "school-b",
    classification: field<SchoolClassification>("public", {
      ...verifiedDirectoryEvidence,
      status: "not_confirmed",
    }),
  };

  it("returns all paths when differences-only is off", () => {
    expect(
      filterComparisonFieldPaths([schoolA, schoolB], ["classification", "name"], false),
    ).toEqual(["classification", "name"]);
  });

  it("filters out equivalent rows and keeps status mismatches", () => {
    const paths = filterComparisonFieldPaths(
      [schoolA, schoolB],
      ["classification", "name"],
      true,
    );

    expect(paths).toContain("classification");
    expect(paths).not.toContain("name");
  });
});
