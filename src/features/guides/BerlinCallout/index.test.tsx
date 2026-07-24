import { render, screen } from "@testing-library/react";

import { BerlinCallout } from ".";

describe("BerlinCallout", () => {
  it("renders the inline Berlin difference as a typographic line, not a pill", () => {
    const { container } = render(
      <BerlinCallout variant="inline" note="6 anos (até a 6ª série)" />,
    );

    const line = screen.getByText(/Berlim:/).closest("span.block");
    expect(line).toHaveTextContent("Berlim: 6 anos (até a 6ª série)");
    expect(line?.className).toMatch(/border-l-2/);
    expect(line?.className).toMatch(/text-blue-800/);
    expect(container.innerHTML).not.toMatch(/rounded-full|bg-blue-50/);
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
