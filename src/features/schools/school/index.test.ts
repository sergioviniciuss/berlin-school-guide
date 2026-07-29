import { schoolSchema } from ".";
import {
  invalidAnecdotalVerifiedSource,
  invalidCommunityOnlyTag,
  invalidMixedLevelWithoutPrimaryDescription,
  invalidTaggedWithoutReviewDate,
  invalidUnknownSourceCitation,
  invalidVerifiedWithoutCitation,
  validDetailedPublicSchool,
  validDirectoryOnlySchool,
  validMixedLevelPrimarySchool,
  validPrivateBilingualSchool,
  validTaggedSchool,
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

  it("accepts a school with empty tags and no qualitativeLastReviewed", () => {
    expect(
      schoolSchema.parse({
        ...validDirectoryOnlySchool,
        tags: [],
      }),
    ).toMatchObject({
      ...validDirectoryOnlySchool,
      tags: [],
    });
  });

  it("accepts a valid tagged school with qualitativeLastReviewed YYYY-MM-DD", () => {
    expect(schoolSchema.parse(validTaggedSchool)).toEqual(validTaggedSchool);
  });

  it("rejects qualitativeLastReviewed that is not YYYY-MM-DD", () => {
    expect(() =>
      schoolSchema.parse({
        ...validDirectoryOnlySchool,
        qualitativeLastReviewed: "2026-07-29T12:00:00Z",
      }),
    ).toThrow();
  });

  it("rejects tagged schools missing qualitativeLastReviewed", () => {
    expect(() =>
      schoolSchema.parse(invalidTaggedWithoutReviewDate),
    ).toThrow();
  });

  it("rejects community-only active-school-community tags via validateTagEvidence", () => {
    expect(() => schoolSchema.parse(invalidCommunityOnlyTag)).toThrow();
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
