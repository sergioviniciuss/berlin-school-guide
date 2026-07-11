import { render, screen } from "@testing-library/react";

import { ComparisonMobile } from ".";
import {
  field,
  validConflictingDataSchool,
  validDirectoryOnlySchool,
  verifiedDirectoryEvidence,
} from "@/features/schools/school/fixtures";
import type { School } from "@/features/schools/school";
import type { SchoolClassification } from "@/features/schools/schoolClassification";
import { resolveCompareSchools } from "@/features/schools/resolveCompareSchools";

describe("ComparisonMobile", () => {
  const slugs = ["lew-tolstoi-schule", "adam-ries-schule"];
  const { schools } = resolveCompareSchools(slugs);

  it("renders criteria-first stacked layout without a table", () => {
    render(
      <ComparisonMobile schools={schools} selectedSlugs={slugs} />,
    );

    expect(
      screen.getByLabelText("Comparação móvel de critérios"),
    ).toBeInTheDocument();
    expect(
      screen.queryByRole("table", { name: "Comparação de critérios" }),
    ).not.toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Identificação", level: 2 }),
    ).toBeVisible();
    expect(
      screen.getByRole("heading", { name: "Tipo de escola", level: 3 }),
    ).toBeVisible();
  });

  it("lists all selected schools under each criterion", () => {
    render(
      <ComparisonMobile schools={schools} selectedSlugs={slugs} />,
    );

    for (const school of schools) {
      expect(screen.getAllByText(school.name.value!).length).toBeGreaterThan(1);
    }
  });

  it("renders remove-school links in the top strip", () => {
    render(
      <ComparisonMobile schools={schools} selectedSlugs={slugs} />,
    );

    expect(
      screen.getByRole("link", {
        name: `Remover ${schools[0]!.name.value} da comparação`,
      }),
    ).toHaveAttribute("href", `/compare?schools=${schools[1]!.slug}`);
  });

  it("hides equivalent criteria when showDifferencesOnly is enabled", () => {
    const schoolA = validDirectoryOnlySchool;
    const schoolB: School = {
      ...validDirectoryOnlySchool,
      slug: "school-b",
      classification: field<SchoolClassification>("public", {
        ...verifiedDirectoryEvidence,
        status: "not_confirmed",
      }),
    };

    render(
      <ComparisonMobile
        schools={[schoolA, schoolB]}
        selectedSlugs={["synthetic-directory-school", "school-b"]}
        showDifferencesOnly
      />,
    );

    expect(
      screen.queryByRole("heading", { name: "Nome da escola", level: 3 }),
    ).not.toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Tipo de escola", level: 3 }),
    ).toBeVisible();
  });

  it("does not permanently expand evidence notes", () => {
    render(
      <ComparisonMobile
        schools={[validConflictingDataSchool, validDirectoryOnlySchool]}
        selectedSlugs={[
          validConflictingDataSchool.slug,
          validDirectoryOnlySchool.slug,
        ]}
      />,
    );

    expect(
      screen.queryByText("Synthetic sources disagree about the Ganztag model."),
    ).not.toBeInTheDocument();
    expect(screen.getByText("Ver nota de evidência")).toBeInTheDocument();
  });
});
