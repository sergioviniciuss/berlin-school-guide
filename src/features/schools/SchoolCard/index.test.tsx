import { render, screen } from "@testing-library/react";

import { SchoolCard } from ".";
import { getSchoolDirectoryItems } from "@/features/schools/schoolDirectoryData";
import { toSchoolDirectoryItem } from "@/features/schools/schoolDirectoryData";
import {
  validDirectoryOnlySchool,
  validDetailedPublicSchool,
} from "@/features/schools/school/fixtures";

describe("SchoolCard", () => {
  it("renders link to school profile for first directory item", () => {
    const school = getSchoolDirectoryItems()[0];

    render(<SchoolCard school={school} />);

    expect(
      screen.getByRole("link", { name: `Ver perfil de ${school.name}` }),
    ).toHaveAttribute("href", `/schools/${school.slug}`);
  });

  it("renders link aria-label with Ver perfil de pattern", () => {
    const school = getSchoolDirectoryItems()[0];

    render(<SchoolCard school={school} />);

    expect(
      screen.getByRole("link", { name: /Ver perfil de/ }),
    ).toBeInTheDocument();
  });

  it("does not render em-breve coming-soon text", () => {
    render(<SchoolCard school={getSchoolDirectoryItems()[0]} />);

    expect(
      screen.queryByText(
        "Perfil completo em breve — estamos expandindo as páginas de detalhe.",
      ),
    ).not.toBeInTheDocument();
  });

  it("renders coverage block with tier label and percentage", () => {
    render(
      <SchoolCard school={toSchoolDirectoryItem(validDetailedPublicSchool)} />,
    );

    expect(screen.getByText("Cobertura da pesquisa")).toBeVisible();
    const coverageBlock = screen
      .getByText("Cobertura da pesquisa")
      .closest("div");
    expect(coverageBlock?.textContent).toMatch(/Pesquisa detalhada · 100%/);
    expect(
      screen.getByText(/mede completude da pesquisa neste nível/),
    ).toBeVisible();
  });

  it("renders Perfil básico for directory-level schools", () => {
    render(
      <SchoolCard school={toSchoolDirectoryItem(validDirectoryOnlySchool)} />,
    );

    expect(screen.getByText("Perfil básico")).toBeVisible();
    expect(screen.getByText(/Pesquisa básica/)).toBeVisible();
  });

  it("renders Perfil detalhado for detailed-level schools", () => {
    render(
      <SchoolCard school={toSchoolDirectoryItem(validDetailedPublicSchool)} />,
    );

    expect(screen.getByText("Perfil detalhado")).toBeVisible();
    expect(screen.getByText(/Pesquisa detalhada/)).toBeVisible();
  });

  it("shows tier help with aria-label for pesquisa básica", () => {
    render(
      <SchoolCard school={toSchoolDirectoryItem(validDirectoryOnlySchool)} />,
    );

    expect(
      screen.getByRole("button", {
        name: "O que significa pesquisa básica",
      }),
    ).toBeVisible();
  });

  it("shows tier help with aria-label for pesquisa detalhada", () => {
    render(
      <SchoolCard school={toSchoolDirectoryItem(validDetailedPublicSchool)} />,
    );

    expect(
      screen.getByRole("button", {
        name: "O que significa pesquisa detalhada",
      }),
    ).toBeVisible();
  });

  it("sets title attribute with tier explanation on help button", () => {
    render(
      <SchoolCard school={toSchoolDirectoryItem(validDirectoryOnlySchool)} />,
    );

    expect(
      screen.getByRole("button", {
        name: "O que significa pesquisa básica",
      }),
    ).toHaveAttribute(
      "title",
      "Pesquisa com dados oficiais do diretório escolar de Berlim. Campos extras ainda não foram verificados de forma independente.",
    );
  });

  it("renders Ver perfil hint text", () => {
    render(<SchoolCard school={getSchoolDirectoryItems()[0]} />);

    expect(screen.getByText("Ver perfil")).toBeVisible();
  });

  it("does not render Willkommensklasse when welcomeClasses is missing", () => {
    render(
      <SchoolCard school={toSchoolDirectoryItem(validDirectoryOnlySchool)} />,
    );

    expect(screen.queryByText("Willkommensklasse")).not.toBeInTheDocument();
  });
});
