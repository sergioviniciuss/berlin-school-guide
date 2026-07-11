import { render, screen } from "@testing-library/react";

import { SourcesSection } from ".";
import { collectCitedSources } from "@/features/schools/collectCitedSources";
import {
  validDetailedPublicSchool,
  validDirectoryOnlySchool,
} from "@/features/schools/school/fixtures";

describe("SourcesSection", () => {
  it('renders group heading "Oficial" when official sources are cited', () => {
    const groupedSources = collectCitedSources(validDetailedPublicSchool);

    render(<SourcesSection groupedSources={groupedSources} />);

    expect(
      screen.getByRole("heading", { name: "Oficial", level: 3 }),
    ).toBeVisible();
  });

  it('renders source entry with id="source-{sourceId}" anchor', () => {
    const groupedSources = collectCitedSources(validDetailedPublicSchool);

    render(<SourcesSection groupedSources={groupedSources} />);

    expect(
      document.getElementById("source-berlin-directory"),
    ).toBeInTheDocument();
  });

  it("shows Publicador: and Consultado em: labels", () => {
    const groupedSources = collectCitedSources(validDetailedPublicSchool);

    render(<SourcesSection groupedSources={groupedSources} />);

    expect(screen.getAllByText("Publicador:").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Consultado em:").length).toBeGreaterThan(0);
  });

  it("renders empty state when no sources are cited", () => {
    const groupedSources = collectCitedSources({
      ...validDirectoryOnlySchool,
      sources: [],
      name: {
        ...validDirectoryOnlySchool.name,
        evidence: {
          ...validDirectoryOnlySchool.name.evidence,
          citations: [],
        },
      },
    });

    render(<SourcesSection groupedSources={groupedSources} />);

    expect(
      screen.getByText("Nenhuma fonte citada nesta página."),
    ).toBeVisible();
  });
});
