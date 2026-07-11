import { act, fireEvent, render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { SchoolDirectory } from ".";
import { getSchoolDirectoryItems } from "@/features/schools/schoolDirectoryData";
import { sortSchools } from "@/features/schools/sortSchools";

const replace = jest.fn();
let params = new URLSearchParams();

jest.mock("next/navigation", () => ({
  usePathname: () => "/schools",
  useRouter: () => ({ replace }),
  useSearchParams: () => params,
}));

describe("SchoolDirectory", () => {
  beforeEach(() => {
    replace.mockClear();
    params = new URLSearchParams();
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it("renders the directory and result count", () => {
    render(<SchoolDirectory schools={getSchoolDirectoryItems()} />);

    expect(screen.getByRole("heading", { name: "Escolas" })).toBeVisible();
    expect(screen.getByText("10 de 10 escolas encontradas")).toBeVisible();
  });

  it("does not sync search to URL until debounce elapses", () => {
    render(<SchoolDirectory schools={getSchoolDirectoryItems()} />);

    fireEvent.change(screen.getByLabelText("Buscar escola pelo nome"), {
      target: { value: "Lew" },
    });

    expect(replace).not.toHaveBeenCalled();

    act(() => {
      jest.advanceTimersByTime(300);
    });

    expect(replace).toHaveBeenLastCalledWith("/schools?q=Lew", {
      scroll: false,
    });
  });

  it("syncs single-character search to URL after debounce", () => {
    render(<SchoolDirectory schools={getSchoolDirectoryItems()} />);

    fireEvent.change(screen.getByLabelText("Buscar escola pelo nome"), {
      target: { value: "L" },
    });

    act(() => {
      jest.advanceTimersByTime(300);
    });

    expect(replace).toHaveBeenLastCalledWith("/schools?q=L", {
      scroll: false,
    });
  });

  it('shows "Atualizando…" while search is pending', () => {
    render(<SchoolDirectory schools={getSchoolDirectoryItems()} />);

    fireEvent.change(screen.getByLabelText("Buscar escola pelo nome"), {
      target: { value: "Lew" },
    });

    expect(screen.getByText(/Atualizando/)).toBeVisible();

    act(() => {
      jest.advanceTimersByTime(300);
    });

    expect(screen.queryByText(/Atualizando/)).not.toBeInTheDocument();
  });

  it("applies coverage sort from URL params to rendered results", () => {
    params = new URLSearchParams("sort=coverage");
    const schools = getSchoolDirectoryItems();
    const expectedOrder = sortSchools(schools, "coverage").map(
      (school) => school.name,
    );

    render(<SchoolDirectory schools={schools} />);

    const resultsSection = screen.getByLabelText("Resultados de escolas");
    const headings = within(resultsSection)
      .getAllByRole("heading", { level: 2 })
      .map((heading) => heading.textContent);

    expect(headings).toEqual(expectedOrder);
  });

  it("omits sort param from URL when using default name sort", () => {
    render(<SchoolDirectory schools={getSchoolDirectoryItems()} />);

    fireEvent.change(screen.getByLabelText("Buscar escola pelo nome"), {
      target: { value: "Lew" },
    });

    act(() => {
      jest.advanceTimersByTime(300);
    });

    expect(replace).toHaveBeenLastCalledWith("/schools?q=Lew", {
      scroll: false,
    });
  });

  it("renders dynamic research-depth header counts from dataset", () => {
    const schools = getSchoolDirectoryItems();
    const detailedCount = schools.filter(
      (school) => school.coverageLevel === "detailed",
    ).length;
    const directoryCount = schools.filter(
      (school) => school.coverageLevel === "directory",
    ).length;

    render(<SchoolDirectory schools={schools} />);

    expect(
      screen.getByText(
        `${detailedCount} escolas com perfil detalhado · ${directoryCount} com dados oficiais`,
      ),
    ).toBeVisible();
  });

  it("syncs search input when query param changes via navigation", () => {
    params = new URLSearchParams("q=Adam");
    const { rerender } = render(
      <SchoolDirectory schools={getSchoolDirectoryItems()} />,
    );

    expect(screen.getByLabelText("Buscar escola pelo nome")).toHaveValue("Adam");

    params = new URLSearchParams("q=Lew");
    rerender(<SchoolDirectory schools={getSchoolDirectoryItems()} />);

    expect(screen.getByLabelText("Buscar escola pelo nome")).toHaveValue("Lew");
  });

  it("filters initial results from query parameters", () => {
    params = new URLSearchParams("neighbourhood=Karlshorst");

    render(<SchoolDirectory schools={getSchoolDirectoryItems()} />);

    expect(screen.getByText("4 de 10 escolas encontradas")).toBeVisible();
    expect(
      screen.getByRole("heading", { name: "Lew-Tolstoi-Schule" }),
    ).toBeVisible();
  });

  it("links to the methodology page from the header", () => {
    render(<SchoolDirectory schools={getSchoolDirectoryItems()} />);

    expect(
      screen.getByRole("link", { name: /como funciona nossa pesquisa/i }),
    ).toHaveAttribute("href", "/methodology");
  });

  it('renders "Ordenar por" select with three sort options', () => {
    render(<SchoolDirectory schools={getSchoolDirectoryItems()} />);

    expect(screen.getByText("Ordenar por")).toBeVisible();
    const sortSelect = screen.getByLabelText("Ordenar resultados do diretório");
    expect(sortSelect).toBeVisible();
    expect(screen.getByRole("option", { name: "Nome (A–Z)" })).toBeInTheDocument();
    expect(
      screen.getByRole("option", { name: "Cobertura da pesquisa" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("option", { name: "Perfil detalhado primeiro" }),
    ).toBeInTheDocument();
  });

  it("updates URL immediately when sort changes to coverage", () => {
    render(<SchoolDirectory schools={getSchoolDirectoryItems()} />);

    fireEvent.change(screen.getByLabelText("Ordenar resultados do diretório"), {
      target: { value: "coverage" },
    });

    expect(replace).toHaveBeenLastCalledWith("/schools?sort=coverage", {
      scroll: false,
    });
  });

  it("shows sticky mobile Filtros button with lg:hidden wrapper", () => {
    render(<SchoolDirectory schools={getSchoolDirectoryItems()} />);

    const stickyBar = screen
      .getByRole("button", { name: "Filtros" })
      .closest(".lg\\:hidden");
    expect(stickyBar).toBeInTheDocument();
  });

  it('shows "Filtros (2 ativos)" when two filters are active', () => {
    params = new URLSearchParams("district=Lichtenberg&bilingual=yes");

    render(<SchoolDirectory schools={getSchoolDirectoryItems()} />);

    expect(
      screen.getByRole("button", { name: "Filtros (2 ativos)" }),
    ).toBeVisible();
  });

  it("does not update URL when toggling a filter inside the mobile sheet until Apply", async () => {
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });

    render(<SchoolDirectory schools={getSchoolDirectoryItems()} />);

    await user.click(screen.getByRole("button", { name: "Filtros" }));
    replace.mockClear();

    const sheet = screen.getByRole("dialog");
    await user.click(within(sheet).getByLabelText("Lichtenberg"));

    expect(replace).not.toHaveBeenCalled();
  });

  it("applies draft filters when the mobile sheet closes", async () => {
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });

    render(<SchoolDirectory schools={getSchoolDirectoryItems()} />);

    await user.click(screen.getByRole("button", { name: "Filtros" }));

    const sheet = screen.getByRole("dialog");
    await user.click(within(sheet).getByLabelText("Lichtenberg"));
    replace.mockClear();

    await user.click(screen.getByRole("button", { name: "Fechar menu de navegação" }));

    expect(replace).toHaveBeenLastCalledWith("/schools?district=Lichtenberg", {
      scroll: false,
    });
  });

  it("keeps desktop sidebar filters without inline mobile expand controls", () => {
    render(<SchoolDirectory schools={getSchoolDirectoryItems()} />);

    const aside = screen.getByRole("complementary");
    expect(within(aside).getByText("Filtros essenciais")).toBeInTheDocument();
    expect(screen.queryByText("Abrir filtros")).not.toBeInTheDocument();
    expect(screen.queryByText("Fechar filtros")).not.toBeInTheDocument();
  });

  it("shows few-results tip when one or two schools match", () => {
    params = new URLSearchParams("q=Lew-Tolstoi");

    render(<SchoolDirectory schools={getSchoolDirectoryItems()} />);

    expect(
      screen.getByText("Poucos resultados — tente remover filtros"),
    ).toBeVisible();
  });

  it("does not show few-results tip when three or more schools match", () => {
    params = new URLSearchParams("neighbourhood=Karlshorst");

    render(<SchoolDirectory schools={getSchoolDirectoryItems()} />);

    expect(
      screen.queryByText("Poucos resultados — tente remover filtros"),
    ).not.toBeInTheDocument();
  });

  it("does not show few-results tip when zero schools match", () => {
    params = new URLSearchParams("q=sem-resultado-inexistente");

    render(<SchoolDirectory schools={getSchoolDirectoryItems()} />);

    expect(
      screen.queryByText("Poucos resultados — tente remover filtros"),
    ).not.toBeInTheDocument();
  });
});
