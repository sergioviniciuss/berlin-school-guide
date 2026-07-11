import { fireEvent, render, screen } from "@testing-library/react";

import { SchoolDirectory } from ".";
import { getSchoolDirectoryItems } from "@/features/schools/schoolDirectoryData";

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
  });

  it("renders the directory and result count", () => {
    render(<SchoolDirectory schools={getSchoolDirectoryItems()} />);

    expect(screen.getByRole("heading", { name: "Escolas" })).toBeVisible();
    expect(screen.getByText("10 de 10 escolas encontradas")).toBeVisible();
  });

  it("syncs search to URL query parameters", () => {
    render(<SchoolDirectory schools={getSchoolDirectoryItems()} />);

    fireEvent.change(screen.getByLabelText("Buscar escola pelo nome"), {
      target: { value: "Lew" },
    });

    expect(replace).toHaveBeenLastCalledWith("/schools?q=Lew", {
      scroll: false,
    });
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
