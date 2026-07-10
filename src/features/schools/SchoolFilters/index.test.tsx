import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { SchoolFilters } from ".";
import { defaultDirectoryFilters } from "@/features/schools/filterSchools";
import { getDirectoryFilterOptions } from "@/features/schools/getDirectoryFilterOptions";
import { getSchoolDirectoryItems } from "@/features/schools/schoolDirectoryData";

describe("SchoolFilters", () => {
  it("renders accessible filter groups and toggles values", async () => {
    const user = userEvent.setup();
    const onToggle = jest.fn();

    render(
      <SchoolFilters
        filters={defaultDirectoryFilters}
        options={getDirectoryFilterOptions(getSchoolDirectoryItems())}
        onToggle={onToggle}
      />,
    );

    await user.click(screen.getByLabelText("Lichtenberg"));
    expect(onToggle).toHaveBeenCalledWith("districts", "Lichtenberg");
  });
});
