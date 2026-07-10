import { render, screen } from "@testing-library/react";

import { SchoolResults } from ".";
import { getSchoolDirectoryItems } from "@/features/schools/schoolDirectoryData";

describe("SchoolResults", () => {
  it("renders school cards", () => {
    render(<SchoolResults schools={getSchoolDirectoryItems().slice(0, 1)} />);
    expect(
      screen.getByRole("heading", { name: "Synthetic Directory School" }),
    ).toBeVisible();
  });

  it("renders an accessible empty state", () => {
    render(<SchoolResults schools={[]} />);
    expect(
      screen.getByRole("heading", { name: "Nenhuma escola encontrada" }),
    ).toBeVisible();
  });
});
