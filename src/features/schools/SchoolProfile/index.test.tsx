import { render, screen } from "@testing-library/react";

import { SchoolProfile } from ".";
import { profileFieldLabels } from "./constants";
import {
  validDetailedPublicSchool,
  validDirectoryOnlySchool,
} from "@/features/schools/school/fixtures";

describe("SchoolProfile", () => {
  it("renders Perfil básico badge for directory-level schools", () => {
    render(<SchoolProfile school={validDirectoryOnlySchool} />);

    expect(screen.getByText("Perfil básico")).toBeVisible();
  });

  it("renders Perfil detalhado badge for detailed-level schools", () => {
    render(<SchoolProfile school={validDetailedPublicSchool} />);

    expect(screen.getByText("Perfil detalhado")).toBeVisible();
  });

  it("renders section headings Identificação, Oferta pedagógica, Apoio à família, Inspeção, Fontes", () => {
    render(<SchoolProfile school={validDetailedPublicSchool} />);

    expect(
      screen.getByRole("heading", { name: "Identificação" }),
    ).toBeVisible();
    expect(
      screen.getByRole("heading", { name: "Oferta pedagógica" }),
    ).toBeVisible();
    expect(
      screen.getByRole("heading", { name: "Apoio à família" }),
    ).toBeVisible();
    expect(screen.getByRole("heading", { name: "Inspeção" })).toBeVisible();
    expect(screen.getByRole("heading", { name: "Fontes" })).toBeVisible();
  });

  it("renders all 23 field labels including Ganztag and Instalações for directory schools", () => {
    render(<SchoolProfile school={validDirectoryOnlySchool} />);

    for (const label of Object.values(profileFieldLabels)) {
      expect(screen.getAllByText(label).length).toBeGreaterThan(0);
    }
  });

  it("shows Informação não encontrada for at least one detailed-only field on directory schools", () => {
    render(<SchoolProfile school={validDirectoryOnlySchool} />);

    expect(screen.getAllByText("Informação não encontrada").length).toBeGreaterThan(
      0,
    );
  });

  it("renders Cobertura da pesquisa and methodology link in hero", () => {
    render(<SchoolProfile school={validDetailedPublicSchool} />);

    expect(screen.getByText("Cobertura da pesquisa")).toBeVisible();
    expect(
      screen.getByRole("link", { name: "Como interpretamos evidências" }),
    ).toHaveAttribute("href", "/methodology");
  });
});
