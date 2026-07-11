import { render, screen } from "@testing-library/react";

jest.mock("@/content/guides/methodology.mdx", () => ({
  __esModule: true,
  default: () => (
    <div data-testid="methodology-mdx">
      <p>Verificado</p>
    </div>
  ),
}));

import MethodologyPage from "./page";

describe("MethodologyPage", () => {
  it("renders the methodology heading and evidence status labels", () => {
    render(<MethodologyPage />);

    expect(
      screen.getByRole("heading", { name: /como funciona nossa pesquisa/i }),
    ).toBeVisible();
    expect(screen.getByText("Verificado")).toBeVisible();
  });
});
