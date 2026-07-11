import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { getActiveFilterChips } from "@/features/schools/ActiveFilterSummary/utils";
import { defaultDirectoryFilters } from "@/features/schools/filterSchools";
import { getSchoolDirectoryItems } from "@/features/schools/schoolDirectoryData";

import { ActiveFilterSummary } from "@/features/schools/ActiveFilterSummary";
import { SchoolResults } from ".";

function getChipLabelsFromSummary(
  filters: typeof defaultDirectoryFilters,
): string[] {
  render(
    <ActiveFilterSummary
      filters={filters}
      onRemove={() => {}}
      onReset={() => {}}
    />,
  );

  return screen
    .getAllByRole("button")
    .map((button) => {
      const text = button.textContent ?? "";
      return text.replace(/ ×$/, "");
    })
    .filter((label) => label !== "Limpar filtros");
}

describe("getActiveFilterChips", () => {
  it("returns same labels as ActiveFilterSummary for sample filters", () => {
    const filters = {
      ...defaultDirectoryFilters,
      query: "synthetic",
      districts: ["Mitte"],
      bilingual: ["yes" as const],
    };

    const summaryLabels = getChipLabelsFromSummary(filters);
    const utilLabels = getActiveFilterChips(filters).map((chip) => chip.label);

    expect(utilLabels).toEqual(summaryLabels);
  });
});

describe("SchoolResults", () => {
  it("renders school cards", () => {
    render(
      <SchoolResults
        schools={getSchoolDirectoryItems().slice(0, 1)}
        filters={defaultDirectoryFilters}
        totalCount={10}
        onClearSearch={() => {}}
        onResetFilters={() => {}}
      />,
    );
    expect(
      screen.getByRole("heading", { name: "Adam-Ries-Schule" }),
    ).toBeVisible();
  });

  it("shows filter empty state with active filter bullets", () => {
    render(
      <SchoolResults
        schools={[]}
        filters={{
          ...defaultDirectoryFilters,
          districts: ["Lichtenberg"],
        }}
        totalCount={10}
        onClearSearch={() => {}}
        onResetFilters={() => {}}
      />,
    );

    expect(
      screen.getByRole("heading", { name: "Nenhuma escola encontrada" }),
    ).toBeVisible();
    expect(screen.getByText("Distrito: Lichtenberg")).toBeVisible();
  });

  it("shows Limpar todos os filtros button calling onResetFilters", async () => {
    const user = userEvent.setup();
    const onResetFilters = jest.fn();

    render(
      <SchoolResults
        schools={[]}
        filters={{
          ...defaultDirectoryFilters,
          districts: ["Lichtenberg"],
        }}
        totalCount={10}
        onClearSearch={() => {}}
        onResetFilters={onResetFilters}
      />,
    );

    await user.click(
      screen.getByRole("button", { name: "Limpar todos os filtros" }),
    );
    expect(onResetFilters).toHaveBeenCalled();
  });

  it("shows methodology link in filter empty state", () => {
    render(
      <SchoolResults
        schools={[]}
        filters={{
          ...defaultDirectoryFilters,
          districts: ["Lichtenberg"],
        }}
        totalCount={10}
        onClearSearch={() => {}}
        onResetFilters={() => {}}
      />,
    );

    expect(
      screen.getByRole("link", { name: "Como funciona nossa pesquisa?" }),
    ).toHaveAttribute("href", "/methodology");
  });

  it("shows search-only miss heading", () => {
    render(
      <SchoolResults
        schools={[]}
        filters={{
          ...defaultDirectoryFilters,
          query: "xyz",
        }}
        totalCount={10}
        onClearSearch={() => {}}
        onResetFilters={() => {}}
      />,
    );

    expect(
      screen.getByRole("heading", { name: "Nenhuma escola com esse nome" }),
    ).toBeVisible();
  });

  it("shows quoted query and Limpar busca for search-only miss", async () => {
    const user = userEvent.setup();
    const onClearSearch = jest.fn();

    render(
      <SchoolResults
        schools={[]}
        filters={{
          ...defaultDirectoryFilters,
          query: "xyz",
        }}
        totalCount={10}
        onClearSearch={onClearSearch}
        onResetFilters={() => {}}
      />,
    );

    expect(
      screen.getByText(/Não encontramos uma escola com "xyz"/),
    ).toBeVisible();

    await user.click(screen.getByRole("button", { name: "Limpar busca" }));
    expect(onClearSearch).toHaveBeenCalled();
  });

  it("prefers search-specific empty state when query is set without array filters", () => {
    render(
      <SchoolResults
        schools={[]}
        filters={{
          ...defaultDirectoryFilters,
          query: "inexistente",
        }}
        totalCount={10}
        onClearSearch={() => {}}
        onResetFilters={() => {}}
      />,
    );

    expect(
      screen.getByRole("heading", { name: "Nenhuma escola com esse nome" }),
    ).toBeVisible();
    expect(
      screen.queryByRole("heading", { name: "Nenhuma escola encontrada" }),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: "Limpar todos os filtros" }),
    ).not.toBeInTheDocument();
  });
});
