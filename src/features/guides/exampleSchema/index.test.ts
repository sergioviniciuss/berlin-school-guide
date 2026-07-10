import { parseExampleGuide } from ".";

describe("parseExampleGuide", () => {
  it("validates a minimal guide shape with Zod", () => {
    expect(
      parseExampleGuide({ title: "Página MDX", slug: "m2-smoke" }),
    ).toEqual({
      title: "Página MDX",
      slug: "m2-smoke",
    });
  });
});
