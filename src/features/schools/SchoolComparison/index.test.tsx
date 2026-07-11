import { fireEvent, render, screen, within } from "@testing-library/react";

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

  it("shows limitations block when comparison is visible", () => {
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

  it("references 2 to 3 schools in empty state copy", () => {
    render(<SchoolComparison />);

    expect(screen.getByText(/de 2 a 3 escolas/i)).toBeVisible();
  });

  it("shows empty state when no schools are in the URL", () => {
    render(<SchoolComparison />);

    expect(
      screen.getByRole("heading", {
        name: "Selecione pelo menos duas escolas",
      }),
    ).toBeVisible();
  });

  it("renders responsive split with mobile layout outside the table", () => {
    params = new URLSearchParams(
      "schools=lew-tolstoi-schule,adam-ries-schule",
    );

    const { container } = render(<SchoolComparison />);

    const desktopWrap = container.querySelector(".hidden.lg\\:block");
    const mobileWrap = container.querySelector(".lg\\:hidden");

    expect(desktopWrap).toBeTruthy();
    expect(mobileWrap).toBeTruthy();
    expect(
      within(desktopWrap as HTMLElement).getByRole("table", {
        name: "Comparação de critérios",
      }),
    ).toBeInTheDocument();
    expect(
      within(mobileWrap as HTMLElement).getByLabelText(
        "Comparação móvel de critérios",
      ),
    ).toBeInTheDocument();
    expect(
      within(mobileWrap as HTMLElement).queryByRole("table", {
        name: "Comparação de critérios",
      }),
    ).not.toBeInTheDocument();
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

  it("renders differences-only toggle and edit link in toolbar", () => {
    params = new URLSearchParams(
      "schools=lew-tolstoi-schule,adam-ries-schule",
    );

    render(<SchoolComparison />);

    expect(
      screen.getByRole("checkbox", { name: "Mostrar apenas diferenças" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: "Editar seleção" }),
    ).toHaveAttribute("href", "/schools?compare=lew-tolstoi-schule,adam-ries-schule");
  });

  it("toggles differences-only filter", () => {
    params = new URLSearchParams(
      "schools=lew-tolstoi-schule,adam-ries-schule",
    );

    render(<SchoolComparison />);

    const toggle = screen.getByRole("checkbox", {
      name: "Mostrar apenas diferenças",
    });
    expect(toggle).not.toBeChecked();
    fireEvent.click(toggle);
    expect(toggle).toBeChecked();
  });
});
