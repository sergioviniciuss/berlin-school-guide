import { schoolSchema } from ".";
import {
  invalidAnecdotalVerifiedSource,
  invalidMixedLevelWithoutPrimaryDescription,
  invalidUnknownSourceCitation,
  invalidVerifiedWithoutCitation,
  validDetailedPublicSchool,
  validDirectoryOnlySchool,
  validMixedLevelPrimarySchool,
  validPrivateBilingualSchool,
} from "./fixtures";

describe("schoolSchema", () => {
  it("accepts a valid directory-only school", () => {
    expect(schoolSchema.parse(validDirectoryOnlySchool)).toEqual(
      validDirectoryOnlySchool,
    );
  });

  it("accepts a valid detailed public school", () => {
    expect(schoolSchema.parse(validDetailedPublicSchool)).toEqual(
      validDetailedPublicSchool,
    );
  });

  it("accepts a valid private bilingual school as a private classification with attributes", () => {
    expect(schoolSchema.parse(validPrivateBilingualSchool)).toEqual(
      validPrivateBilingualSchool,
    );
  });

  it("accepts a mixed-level school when the primary section is represented clearly", () => {
    expect(schoolSchema.parse(validMixedLevelPrimarySchool)).toEqual(
      validMixedLevelPrimarySchool,
    );
  });

  it("rejects verified fields without citations", () => {
    expect(() => schoolSchema.parse(invalidVerifiedWithoutCitation)).toThrow();
  });

  it("rejects citations that reference unknown source ids", () => {
    expect(() => schoolSchema.parse(invalidUnknownSourceCitation)).toThrow();
  });

  it("rejects verified fields that cite only anecdotal sources", () => {
    expect(() => schoolSchema.parse(invalidAnecdotalVerifiedSource)).toThrow();
  });

  it("rejects mixed-level schools without a primary section description", () => {
    expect(() =>
      schoolSchema.parse(invalidMixedLevelWithoutPrimaryDescription),
    ).toThrow();
  });
});
