import { render, screen } from "@testing-library/react";

jest.mock("@/content/guides/methodology.mdx", () => ({
  __esModule: true,
  default: () => (
    <div data-testid="methodology-mdx">
      <p>Verificado</p>
      <h2>Hierarquia das fontes</h2>
      <p>Fontes comunitárias trianguladas</p>
      <h2>Características da escola (tags)</h2>
      <p>não é uma avaliação negativa da escola</p>
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
    expect(
      screen.getByRole("heading", { name: /hierarquia das fontes/i }),
    ).toBeVisible();
    expect(
      screen.getByRole("heading", { name: /características da escola/i }),
    ).toBeVisible();
  });
});
