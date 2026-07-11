import { render, screen } from "@testing-library/react";

import { SchoolComparison } from ".";

let params = new URLSearchParams();

jest.mock("next/navigation", () => ({
  useSearchParams: () => params,
}));

describe("SchoolComparison", () => {
  beforeEach(() => {
    params = new URLSearchParams();
  });

  it("renders Comparar heading", () => {
    params = new URLSearchParams(
      "schools=lew-tolstoi-schule,adam-ries-schule",
    );

    render(<SchoolComparison />);

    expect(
      screen.getByRole("heading", { level: 1, name: "Comparar" }),
    ).toBeVisible();
  });

  it("shows limitations block when comparison table is visible", () => {
    params = new URLSearchParams(
      "schools=lew-tolstoi-schule,adam-ries-schule",
    );

    render(<SchoolComparison />);

    expect(
      screen.getByText(/não classifica escolas por qualidade/i),
    ).toBeVisible();
  });

  it("shows empty state when fewer than two valid schools are selected", () => {
    params = new URLSearchParams("schools=lew-tolstoi-schule");

    render(<SchoolComparison />);

    expect(
      screen.getByRole("heading", {
        name: "Selecione pelo menos duas escolas",
      }),
    ).toBeVisible();
    expect(
      screen.getByRole("link", { name: "Ir para o diretório de escolas" }),
    ).toHaveAttribute("href", "/schools");
  });

  it("shows empty state when no schools are in the URL", () => {
    render(<SchoolComparison />);

    expect(
      screen.getByRole("heading", {
        name: "Selecione pelo menos duas escolas",
      }),
    ).toBeVisible();
  });

  it("renders profile section headings in comparison table", () => {
    params = new URLSearchParams(
      "schools=lew-tolstoi-schule,adam-ries-schule",
    );

    render(<SchoolComparison />);

    expect(screen.getByText("Identificação")).toBeVisible();
    expect(screen.getByText("Inspeção")).toBeVisible();
  });

  it("shows skipped slug notice for invalid slugs mixed with valid ones", () => {
    params = new URLSearchParams(
      "schools=lew-tolstoi-schule,invalid-slug,adam-ries-schule",
    );

    render(<SchoolComparison />);

    expect(
      screen.getByText(/Não encontramos: invalid-slug/i),
    ).toBeVisible();
    expect(screen.getByText(/Essas escolas foram ignoradas/i)).toBeVisible();
  });
});
