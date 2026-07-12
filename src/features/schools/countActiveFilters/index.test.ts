import { countActiveFilters } from ".";
import { defaultDirectoryFilters } from "@/features/schools/filterSchools";

describe("countActiveFilters", () => {
  it("counts query as 1 when non-empty", () => {
    expect(
      countActiveFilters({ ...defaultDirectoryFilters, query: "Lew" }),
    ).toBe(1);
  });

  it("sums all selected array filter values", () => {
    expect(
      countActiveFilters({
        ...defaultDirectoryFilters,
        districts: ["Lichtenberg"],
        bilingual: ["yes", "no"],
      }),
    ).toBe(3);
  });

  it("returns 0 for defaultDirectoryFilters", () => {
    expect(countActiveFilters(defaultDirectoryFilters)).toBe(0);
  });
});
