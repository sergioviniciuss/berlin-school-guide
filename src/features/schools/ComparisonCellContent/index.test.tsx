import { render, screen } from "@testing-library/react";

import { ComparisonCellContent } from ".";
import {
  validConflictingDataSchool,
  validDetailedPublicSchool,
  validDirectoryOnlySchool,
} from "@/features/schools/school/fixtures";

describe("ComparisonCellContent", () => {
  it("renders formatted value with status badge", () => {
    render(
      <ComparisonCellContent
        school={validDetailedPublicSchool}
        fieldPath="classification"
      />,
    );

    expect(screen.getByText("Pública")).toBeVisible();
    expect(screen.getByText("Verificado")).toBeVisible();
  });

  it("renders full badge and note disclosure for conflicting fields", () => {
    render(
      <ComparisonCellContent
        school={validConflictingDataSchool}
        fieldPath="ganztag"
      />,
    );

    expect(screen.getByText("Informação conflitante")).toBeVisible();
    expect(screen.getByText("Ver nota de evidência")).toBeInTheDocument();
    expect(
      screen.queryByText("Synthetic sources disagree about the Ganztag model."),
    ).not.toBeInTheDocument();
  });

  it("renders missing status for absent field paths", () => {
    render(
      <ComparisonCellContent
        school={validDirectoryOnlySchool}
        fieldPath="nonexistent"
      />,
    );

    expect(screen.getByText("—")).toBeVisible();
    expect(screen.getByText("Informação não encontrada")).toBeVisible();
  });
});
