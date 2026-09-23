import { render, screen } from "@testing-library/react";

import { SchoolProfile } from ".";
import { profileFieldLabels } from "./constants";
import {
  validDetailedPublicSchool,
  validDirectoryOnlySchool,
  validPerfilOnlySchool,
  validTaggedSchool,
  validWithResearchNotes,
} from "@/features/schools/school/fixtures";
import type { School } from "@/features/schools/school";

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

  it("renders editorial Perfil and Características before Identificação for tagged schools", () => {
    render(<SchoolProfile school={validTaggedSchool as School} />);

    const editorial = screen.getByRole("heading", {
      level: 2,
      name: "Perfil da escola",
    });
    const tags = screen.getByRole("heading", {
      level: 2,
      name: "Características da escola",
    });
    const identification = screen.getByRole("heading", {
      name: "Identificação",
    });

    expect(editorial.compareDocumentPosition(identification)).toBe(
      Node.DOCUMENT_POSITION_FOLLOWING,
    );
    expect(tags.compareDocumentPosition(identification)).toBe(
      Node.DOCUMENT_POSITION_FOLLOWING,
    );
    expect(screen.getByText("Perfil oficial")).toBeVisible();
    expect(
      screen.getByRole("link", { name: "Sugerir correção ou atualização" }),
    ).toHaveAttribute(
      "href",
      `/report-correction/?school=${validTaggedSchool.slug}`,
    );
  });

  it("renders editorial Perfil without Características for perfil-only schools", () => {
    render(<SchoolProfile school={validPerfilOnlySchool as School} />);

    expect(
      screen.getByRole("heading", { level: 2, name: "Perfil da escola" }),
    ).toBeVisible();
    expect(
      screen.queryByRole("heading", { name: "Características da escola" }),
    ).toBeNull();
  });

  it("omits qualitative chrome for non-pilot schools but keeps correction link", () => {
    render(<SchoolProfile school={validDetailedPublicSchool} />);

    expect(
      screen.queryByRole("heading", { name: "Características da escola" }),
    ).toBeNull();
    expect(
      screen.queryByRole("heading", { level: 2, name: "Perfil da escola" }),
    ).toBeNull();
    expect(
      screen.getByRole("link", { name: "Sugerir correção ou atualização" }),
    ).toHaveAttribute(
      "href",
      `/report-correction/?school=${validDetailedPublicSchool.slug}`,
    );
  });

  it("never renders qualitativeResearchNotes text", () => {
    render(<SchoolProfile school={validWithResearchNotes as School} />);

    expect(screen.queryByText("Withhold note.")).toBeNull();
  });
});
