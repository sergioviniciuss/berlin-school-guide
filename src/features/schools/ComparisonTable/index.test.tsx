import { render, screen, within } from "@testing-library/react";

import { ComparisonTable } from ".";
import { calculateEvidenceCoverage } from "@/features/evidence/calculateEvidenceCoverage";
import { getCoverageTierLabel } from "@/features/schools/getCoverageTierLabel";
import { getSchoolFieldByPath } from "@/features/schools/getSchoolFieldByPath";
import { resolveCompareSchools } from "@/features/schools/resolveCompareSchools";

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

    for (const school of schools) {
      const coverage = calculateEvidenceCoverage(school);
      const tierLabel = getCoverageTierLabel(school.research.coverageLevel);

      expect(screen.getByText(school.name)).toBeVisible();
      expect(
        screen.getByText(`${tierLabel} · ${coverage.percentage}%`),
      ).toBeVisible();
    }
  });

  it("renders formatted field values with status badges", () => {
    render(<ComparisonTable schools={schools} selectedSlugs={slugs} />);

    const ganztagField = getSchoolFieldByPath(schools[0]!, "ganztag");
    expect(ganztagField).toBeDefined();

    expect(screen.getAllByText("Verificado").length).toBeGreaterThan(0);
  });

  it("shows missing status badge when field is undefined", () => {
    render(<ComparisonTable schools={schools} selectedSlugs={slugs} />);

    expect(
      screen.getAllByText("Informação não encontrada").length,
    ).toBeGreaterThan(0);
  });

  it("uses horizontal scroll wrapper with sticky criteria column below lg", () => {
    render(<ComparisonTable schools={schools} selectedSlugs={slugs} />);

    const table = screen.getByRole("table", { name: "Comparação de critérios" });
    expect(table.closest(".overflow-x-auto")).toBeInTheDocument();

    const criteriaHeader = screen.getByRole("columnheader", {
      name: "Critério",
    });
    expect(criteriaHeader).toHaveClass("sticky", "left-0", "z-10", "bg-white");
  });

  it("does not render sort controls or winner styling", () => {
    render(<ComparisonTable schools={schools} selectedSlugs={slugs} />);

    expect(
      screen.queryByRole("button", { name: /ordenar/i }),
    ).not.toBeInTheDocument();
    expect(screen.queryByText(/melhor escola/i)).not.toBeInTheDocument();
  });

  it("links Editar seleção back to directory with current slugs", () => {
    render(<ComparisonTable schools={schools} selectedSlugs={slugs} />);

    expect(
      screen.getByRole("link", { name: "Editar seleção" }),
    ).toHaveAttribute("href", `/schools?compare=${slugs.join(",")}`);
  });

  it("removes a school via column control and updates compare URL", () => {
    render(<ComparisonTable schools={schools} selectedSlugs={slugs} />);

    const removeLink = screen.getByRole("link", {
      name: `Remover ${schools[0]!.name} da comparação`,
    });

    expect(removeLink).toHaveAttribute(
      "href",
      `/compare?schools=${schools[1]!.slug}`,
    );
  });
});
