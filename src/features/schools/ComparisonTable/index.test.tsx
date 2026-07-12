import { render, screen, within } from "@testing-library/react";

import { ComparisonTable } from ".";
import { calculateEvidenceCoverage } from "@/features/evidence/calculateEvidenceCoverage";
import { getCoverageTierLabel } from "@/features/schools/getCoverageTierLabel";
import { resolveCompareSchools } from "@/features/schools/resolveCompareSchools";
import {
  field,
  validConflictingDataSchool,
  validDirectoryOnlySchool,
  verifiedDirectoryEvidence,
} from "@/features/schools/school/fixtures";
import type { School } from "@/features/schools/school";
import type { SchoolClassification } from "@/features/schools/schoolClassification";

describe("ComparisonTable", () => {
  const slugs = ["lew-tolstoi-schule", "adam-ries-schule"];
  const { schools } = resolveCompareSchools(slugs);

  it("renders profile section headings", () => {
    render(<ComparisonTable schools={schools} selectedSlugs={slugs} />);

    expect(screen.getByText("Identificação")).toBeVisible();
    expect(screen.getByText("Inspeção")).toBeVisible();
  });

  it("renders school names and coverage metadata in column headers", () => {
    render(<ComparisonTable schools={schools} selectedSlugs={slugs} />);

    const table = screen.getByRole("table", { name: "Comparação de critérios" });
    const headerRow = within(table).getAllByRole("row")[0]!;

    for (const school of schools) {
      const coverage = calculateEvidenceCoverage(school);
      const tierLabel = getCoverageTierLabel(school.research.coverageLevel);

      expect(within(headerRow).getByText(school.name.value!)).toBeVisible();
      expect(
        within(headerRow).getByText(`${tierLabel} · ${coverage.percentage}%`),
      ).toBeVisible();
    }
  });

  it("renders formatted field values with status badges", () => {
    render(<ComparisonTable schools={schools} selectedSlugs={slugs} />);

    expect(screen.getAllByText("Verificado").length).toBeGreaterThan(0);
  });

  it("shows missing status badge when field is undefined", () => {
    render(<ComparisonTable schools={schools} selectedSlugs={slugs} />);

    expect(
      screen.getAllByText("Informação não encontrada").length,
    ).toBeGreaterThan(0);
  });

  it("uses horizontal scroll wrapper with sticky criteria column", () => {
    render(<ComparisonTable schools={schools} selectedSlugs={slugs} />);

    const table = screen.getByRole("table", { name: "Comparação de critérios" });
    expect(table.closest(".overflow-x-auto")).toBeInTheDocument();

    const criteriaRowLabel = screen.getByRole("rowheader", {
      name: "Nome da escola",
    });
    expect(criteriaRowLabel).toHaveClass("sticky", "left-0", "z-10", "bg-white");
  });

  it("hides equivalent rows when showDifferencesOnly is enabled", () => {
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
      <ComparisonTable
        schools={[schoolA, schoolB]}
        selectedSlugs={["synthetic-directory-school", "school-b"]}
        showDifferencesOnly
      />,
    );

    expect(
      screen.queryByRole("rowheader", { name: "Nome da escola" }),
    ).not.toBeInTheDocument();
    expect(
      screen.getByRole("rowheader", { name: "Tipo de escola" }),
    ).toBeVisible();
  });

  it("does not permanently expand evidence notes in cells", () => {
    render(
      <ComparisonTable
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

  it("does not render sort controls or winner styling", () => {
    render(<ComparisonTable schools={schools} selectedSlugs={slugs} />);

    expect(
      screen.queryByRole("button", { name: /ordenar/i }),
    ).not.toBeInTheDocument();
    expect(screen.queryByText(/melhor escola/i)).not.toBeInTheDocument();
  });

  it("removes a school via column control and updates compare URL", () => {
    render(<ComparisonTable schools={schools} selectedSlugs={slugs} />);

    const removeLink = screen.getByRole("link", {
      name: `Remover ${schools[0]!.name.value} da comparação`,
    });

    expect(removeLink).toHaveAttribute(
      "href",
      `/compare?schools=${schools[1]!.slug}`,
    );
  });
});
