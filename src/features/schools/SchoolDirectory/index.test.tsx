import { act, fireEvent, render, screen, within } from "@testing-library/react";

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
});
