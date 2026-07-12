import { timelineTitleClass } from "./titleStyles";

describe("timelineTitleClass", () => {
  it("uses smaller type for long school names without break-word utilities", () => {
    const className = timelineTitleClass("Gemeinschaftsschule");
    expect(className).toContain("hyphens-none");
    expect(className).toContain("[overflow-wrap:normal]");
    expect(className).not.toContain("break-words");
    expect(className).toContain("text-sm lg:text-base");
  });

  it("uses the smallest type for very long school names", () => {
    const className = timelineTitleClass("Integrierte Sekundarschule (ISS)");
    expect(className).toContain("text-sm");
    expect(className).not.toContain("text-lg");
  });
});
