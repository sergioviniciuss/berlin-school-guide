import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { CompareToggleButton } from ".";

describe("CompareToggleButton", () => {
  it("shows add label when not selected", () => {
    render(
      <CompareToggleButton isSelected={false} onToggle={() => undefined} />,
    );

    expect(
      screen.getByRole("button", { name: "Adicionar à comparação" }),
    ).toBeInTheDocument();
  });

  it("shows selected label when in comparison", () => {
    render(
      <CompareToggleButton isSelected onToggle={() => undefined} />,
    );

    expect(
      screen.getByRole("button", { name: "Na comparação" }),
    ).toHaveAttribute("aria-pressed", "true");
  });

  it("calls onToggle when clicked", async () => {
    const user = userEvent.setup();
    const onToggle = jest.fn();

    render(
      <CompareToggleButton isSelected={false} onToggle={onToggle} />,
    );

    await user.click(
      screen.getByRole("button", { name: "Adicionar à comparação" }),
    );

    expect(onToggle).toHaveBeenCalledTimes(1);
  });
});
