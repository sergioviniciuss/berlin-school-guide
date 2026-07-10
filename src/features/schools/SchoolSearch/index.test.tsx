import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { SchoolSearch } from ".";

describe("SchoolSearch", () => {
  it("calls onChange when the user types", async () => {
    const user = userEvent.setup();
    const onChange = jest.fn();

    render(<SchoolSearch value="" onChange={onChange} />);
    await user.type(
      screen.getByLabelText("Buscar escola pelo nome"),
      "synthetic",
    );

    expect(onChange).toHaveBeenCalled();
  });
});
