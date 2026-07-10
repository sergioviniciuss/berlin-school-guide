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
    expect(screen.getByText("7 de 7 escolas encontradas")).toBeVisible();
  });

  it("syncs search to URL query parameters", () => {
    render(<SchoolDirectory schools={getSchoolDirectoryItems()} />);

    fireEvent.change(screen.getByLabelText("Buscar escola pelo nome"), {
      target: { value: "private" },
    });

    expect(replace).toHaveBeenLastCalledWith("/schools?q=private", {
      scroll: false,
    });
  });

  it("filters initial results from query parameters", () => {
    params = new URLSearchParams("district=Mitte");

    render(<SchoolDirectory schools={getSchoolDirectoryItems()} />);

    expect(screen.getByText("1 de 7 escolas encontradas")).toBeVisible();
    expect(
      screen.getByRole("heading", { name: "Synthetic Directory School" }),
    ).toBeVisible();
  });
});
