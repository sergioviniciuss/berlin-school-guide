import { render, screen } from "@testing-library/react";

import { SchoolCard } from ".";
import { getSchoolDirectoryItems } from "@/features/schools/schoolDirectoryData";
import { toSchoolDirectoryItem } from "@/features/schools/schoolDirectoryData";
import {
  validDirectoryOnlySchool,
  validDetailedPublicSchool,
} from "@/features/schools/school/fixtures";

describe("SchoolCard", () => {
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

  it("does not render Willkommensklasse when welcomeClasses is missing", () => {
    render(
      <SchoolCard school={toSchoolDirectoryItem(validDirectoryOnlySchool)} />,
    );

    expect(screen.queryByText("Willkommensklasse")).not.toBeInTheDocument();
  });

  it("renders profile coming-soon message", () => {
    render(<SchoolCard school={getSchoolDirectoryItems()[0]} />);

    expect(
      screen.getByText(
        "Perfil completo em breve — estamos expandindo as páginas de detalhe.",
      ),
    ).toBeVisible();
  });
});
