import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { ActiveFilterSummary } from ".";
import { defaultDirectoryFilters } from "@/features/schools/filterSchools";

describe("ActiveFilterSummary", () => {
  it("renders removable filter chips and reset", async () => {
    const user = userEvent.setup();
    const onRemove = jest.fn();
    const onReset = jest.fn();

    render(
      <ActiveFilterSummary
        filters={{
          ...defaultDirectoryFilters,
          query: "synthetic",
          districts: ["Mitte"],
        }}
        onRemove={onRemove}
        onReset={onReset}
      />,
    );

    await user.click(
      screen.getByRole("button", { name: "Remover filtro Distrito: Mitte" }),
    );
    expect(onRemove).toHaveBeenCalledWith("districts", "Mitte");

    await user.click(screen.getByRole("button", { name: "Limpar filtros" }));
    expect(onReset).toHaveBeenCalled();
  });
});
