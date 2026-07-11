import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { MobileFilterSheet } from ".";
import { defaultDirectoryFilters } from "@/features/schools/filterSchools";
import { getDirectoryFilterOptions } from "@/features/schools/getDirectoryFilterOptions";
import { getSchoolDirectoryItems } from "@/features/schools/schoolDirectoryData";

const filterOptions = getDirectoryFilterOptions(getSchoolDirectoryItems());

describe("MobileFilterSheet", () => {
  it('renders SheetTitle "Filtros" when open', () => {
    render(
      <MobileFilterSheet
        open
        onOpenChange={jest.fn()}
        draftFilters={defaultDirectoryFilters}
        filterOptions={filterOptions}
        onDraftToggle={jest.fn()}
        onApply={jest.fn()}
        onClearAndApply={jest.fn()}
      />,
    );

    expect(screen.getByRole("heading", { name: "Filtros" })).toBeVisible();
  });

  it("calls onDraftToggle instead of onApply when a checkbox is toggled", async () => {
    const user = userEvent.setup();
    const onDraftToggle = jest.fn();
    const onApply = jest.fn();

    render(
      <MobileFilterSheet
        open
        onOpenChange={jest.fn()}
        draftFilters={defaultDirectoryFilters}
        filterOptions={filterOptions}
        onDraftToggle={onDraftToggle}
        onApply={onApply}
        onClearAndApply={jest.fn()}
      />,
    );

    await user.click(screen.getByLabelText("Lichtenberg"));

    expect(onDraftToggle).toHaveBeenCalledWith("districts", "Lichtenberg");
    expect(onApply).not.toHaveBeenCalled();
  });

  it('calls onApply when "Aplicar filtros" is clicked', () => {
    const onApply = jest.fn();

    render(
      <MobileFilterSheet
        open
        onOpenChange={jest.fn()}
        draftFilters={defaultDirectoryFilters}
        filterOptions={filterOptions}
        onDraftToggle={jest.fn()}
        onApply={onApply}
        onClearAndApply={jest.fn()}
      />,
    );

    fireEvent.click(screen.getByRole("button", { name: "Aplicar filtros" }));

    expect(onApply).toHaveBeenCalledTimes(1);
  });

  it('calls onClearAndApply when "Limpar filtros" is clicked', () => {
    const onClearAndApply = jest.fn();

    render(
      <MobileFilterSheet
        open
        onOpenChange={jest.fn()}
        draftFilters={{
          ...defaultDirectoryFilters,
          districts: ["Lichtenberg"],
        }}
        filterOptions={filterOptions}
        onDraftToggle={jest.fn()}
        onApply={jest.fn()}
        onClearAndApply={onClearAndApply}
      />,
    );

    fireEvent.click(screen.getByRole("button", { name: "Limpar filtros" }));

    expect(onClearAndApply).toHaveBeenCalledTimes(1);
  });
});
