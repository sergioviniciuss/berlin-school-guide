import { render, screen } from "@testing-library/react";

jest.mock("@/content/guides/berlin-school-system.mdx", () => ({
  __esModule: true,
  default: () => (
    <div data-testid="berlin-school-system-mdx">
      <h2>O que é uma Grundschule?</h2>
      <h2>Glossário</h2>
    </div>
  ),
}));

import BerlinSchoolSystemPage from "./page";

describe("BerlinSchoolSystemPage", () => {
  it("renders the system guide heading and key sections", () => {
    render(<BerlinSchoolSystemPage />);

    expect(
      screen.getByRole("heading", {
        name: /como funciona a escola primária em berlim/i,
      }),
    ).toBeVisible();
    expect(
      screen.getByRole("heading", { name: "O que é uma Grundschule?" }),
    ).toBeVisible();
    expect(
      screen.getByRole("heading", { name: "Glossário" }),
    ).toBeVisible();
  });
});
