import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { SchoolFilters } from ".";
import { defaultDirectoryFilters } from "@/features/schools/filterSchools";
import { getDirectoryFilterOptions } from "@/features/schools/getDirectoryFilterOptions";
import { getSchoolDirectoryItems } from "@/features/schools/schoolDirectoryData";

const options = getDirectoryFilterOptions(getSchoolDirectoryItems());

describe("SchoolFilters", () => {
  it('shows "Filtros essenciais" section heading', () => {
    render(
      <SchoolFilters
        filters={defaultDirectoryFilters}
        options={options}
        onToggle={jest.fn()}
      />,
    );

    expect(screen.getByText("Filtros essenciais")).toBeVisible();
  });

  it("renders essential filter groups", () => {
    render(
      <SchoolFilters
        filters={defaultDirectoryFilters}
        options={options}
        onToggle={jest.fn()}
      />,
    );

    const essentialLegends = [
      "Distrito",
      "Bairro",
      "Tipo",
      "Ganztag",
      "Bilíngue",
      "Willkommensklasse",
    ];

    for (const legend of essentialLegends) {
      expect(screen.getByText(legend)).toBeVisible();
    }
  });

  it("renders advanced filters inside a closed details element by default", () => {
    render(
      <SchoolFilters
        filters={defaultDirectoryFilters}
        options={options}
        onToggle={jest.fn()}
      />,
    );

    const details = screen.getByText("Filtros avançados").closest("details");
    expect(details).toBeInTheDocument();
    expect(details).not.toHaveAttribute("open");
  });

  it("renders advanced filter groups inside details", async () => {
    const user = userEvent.setup();

    render(
      <SchoolFilters
        filters={defaultDirectoryFilters}
        options={options}
        onToggle={jest.fn()}
      />,
    );

    await user.click(screen.getByText("Filtros avançados"));

    const advancedLegends = [
      "Idiomas",
      "Foco educacional",
      "Cuidado no contraturno",
      "Inspeção oficial",
      "Cobertura da pesquisa",
    ];

    for (const legend of advancedLegends) {
      expect(screen.getByText(legend)).toBeVisible();
    }
  });

  it("links Ganztag help to the system guide Ganztag section", () => {
    render(
      <SchoolFilters
        filters={defaultDirectoryFilters}
        options={options}
        onToggle={jest.fn()}
      />,
    );

    const ganztagFieldset = screen.getByText("Ganztag").closest("fieldset");
    expect(ganztagFieldset).not.toBeNull();

    const helpLink = within(ganztagFieldset!).getByRole("link", {
      name: "O que é Ganztag?",
    });
    expect(helpLink).toHaveAttribute(
      "href",
      "/guides/berlin-school-system#o-que-e-ganztag",
    );
  });

  it("links Willkommensklasse help to the system guide glossary", () => {
    render(
      <SchoolFilters
        filters={defaultDirectoryFilters}
        options={options}
        onToggle={jest.fn()}
      />,
    );

    const welcomeFieldset = screen
      .getByText("Willkommensklasse")
      .closest("fieldset");
    expect(welcomeFieldset).not.toBeNull();

    const helpLink = within(welcomeFieldset!).getByRole("link", {
      name: "O que é Willkommensklasse?",
    });
    expect(helpLink).toHaveAttribute(
      "href",
      "/guides/berlin-school-system#glossario",
    );
  });

  it("calls onToggle with the correct key when a checkbox is toggled", async () => {
    const user = userEvent.setup();
    const onToggle = jest.fn();

    render(
      <SchoolFilters
        filters={defaultDirectoryFilters}
        options={options}
        onToggle={onToggle}
      />,
    );

    await user.click(
      within(screen.getByRole("group", { name: "Distrito" })).getByLabelText(
        "Lichtenberg",
      ),
    );
    expect(onToggle).toHaveBeenCalledWith("districts", "Lichtenberg");
  });
});
