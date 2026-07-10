import { officialDirectorySource } from "./fixtures";
import { sourceSchema } from ".";

describe("sourceSchema", () => {
  it("accepts a canonical source", () => {
    expect(sourceSchema.parse(officialDirectorySource)).toEqual(
      officialDirectorySource,
    );
  });

  it("rejects invalid source URLs", () => {
    expect(() =>
      sourceSchema.parse({
        ...officialDirectorySource,
        url: "not-a-url",
      }),
    ).toThrow();
  });
});
