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

  it("renders school summary and research coverage", () => {
    render(<SchoolCard school={getSchoolDirectoryItems()[1]} />);

    expect(
      screen.getByRole("heading", { name: "Bernhard-Grzimek-Schule" }),
    ).toBeVisible();
    expect(screen.getByText(/Número oficial:/)).toBeVisible();
    expect(screen.getByText("Cobertura da pesquisa")).toBeVisible();
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
