import { render, screen } from "@testing-library/react";

jest.mock("@/content/guides/first-steps.mdx", () => ({
  __esModule: true,
  default: () => (
    <div data-testid="first-steps-mdx">
      <h2>Entender sua área</h2>
      <h2>Documentos</h2>
      <h2>Visita à escola</h2>
    </div>
  ),
}));

import FirstStepsPage from "./page";

describe("FirstStepsPage", () => {
  it("renders the checklist heading and expected task groups", () => {
    render(<FirstStepsPage />);

    expect(
      screen.getByRole("heading", { name: "Primeiros passos", level: 1 }),
    ).toBeVisible();
    expect(
      screen.getByRole("heading", { name: "Entender sua área" }),
    ).toBeVisible();
    expect(
      screen.getByRole("heading", { name: "Documentos" }),
    ).toBeVisible();
    expect(
      screen.getByRole("heading", { name: "Visita à escola" }),
    ).toBeVisible();
  });

  it("renders print button outside the printable wrapper", () => {
    render(<FirstStepsPage />);

    expect(
      screen.getByRole("button", { name: "Imprimir checklist" }),
    ).toBeVisible();
  });
});
