import { render, screen } from "@testing-library/react";

import { SchoolCard } from ".";
import { getSchoolDirectoryItems } from "@/features/schools/schoolDirectoryData";

describe("SchoolCard", () => {
  it("renders school summary and research coverage", () => {
    render(<SchoolCard school={getSchoolDirectoryItems()[1]} />);

    expect(
      screen.getByRole("heading", { name: "Bernhard-Grzimek-Schule" }),
    ).toBeVisible();
    expect(screen.getByText(/Número oficial:/)).toBeVisible();
    expect(screen.getByText("Cobertura da pesquisa")).toBeVisible();
    expect(screen.getByText(/Percentual de campos importantes/)).toBeVisible();
  });

  it("renders missing data neutrally", () => {
    render(<SchoolCard school={getSchoolDirectoryItems()[4]} />);

    expect(
      screen.getAllByText("Informação não encontrada").length,
    ).toBeGreaterThan(0);
  });
});
