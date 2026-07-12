import { render, screen } from "@testing-library/react";

import { BerlinCallout } from ".";

describe("BerlinCallout", () => {
  it("renders the inline badge with the Berlin label and note", () => {
    render(<BerlinCallout variant="inline" note="dura 6 anos, até a 6ª série" />);

    expect(
      screen.getByText(/Em Berlim/),
    ).toHaveTextContent("Em Berlim— dura 6 anos, até a 6ª série");
  });

  it("renders the summary box with eyebrow, children, and a link to the Berlin guide", () => {
    render(
      <BerlinCallout variant="summary">
        Texto de teste sobre Berlim.
      </BerlinCallout>,
    );

    expect(screen.getByText("Berlin em destaque")).toBeVisible();
    expect(screen.getByText("Texto de teste sobre Berlim.")).toBeVisible();
    expect(
      screen.getByRole("link", {
        name: "Ver guia completo do sistema em Berlim",
      }),
    ).toHaveAttribute("href", "/guides/berlin-school-system");
  });

  it("never uses amber or red tone tokens (D-10 tone guard)", () => {
    const { container } = render(
      <BerlinCallout variant="summary">
        Texto de teste sobre Berlim.
      </BerlinCallout>,
    );

    expect(container.innerHTML).not.toMatch(/amber-|red-/);
  });
});
