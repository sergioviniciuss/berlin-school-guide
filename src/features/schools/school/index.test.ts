import { schoolSchema } from ".";
import {
  invalidAnecdotalVerifiedSource,
  invalidCommunityOnlyTag,
  invalidMixedLevelWithoutPrimaryDescription,
  invalidPerfilWithoutReviewDate,
  invalidTaggedWithoutPerfil,
  invalidTaggedWithoutReviewDate,
  invalidUnknownSourceCitation,
  invalidVerifiedWithoutCitation,
  validDetailedPublicSchool,
  validDirectoryOnlySchool,
  validMixedLevelPrimarySchool,
  validPerfilOnlySchool,
  validPrivateBilingualSchool,
  validTaggedSchool,
  validWithResearchNotes,
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

  it("accepts a school with empty tags and no perfil or qualitativeLastReviewed", () => {
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

  it("accepts a valid tagged school with perfilDaEscola and qualitativeLastReviewed", () => {
    expect(schoolSchema.parse(validTaggedSchool)).toEqual(validTaggedSchool);
  });

  it("accepts a perfil-only school with qualitativeLastReviewed and no tags", () => {
    expect(schoolSchema.parse(validPerfilOnlySchool)).toEqual(
      validPerfilOnlySchool,
    );
  });

  it("accepts research notes with perfil and date without requiring tags", () => {
    expect(schoolSchema.parse(validWithResearchNotes)).toEqual(
      validWithResearchNotes,
    );
  });

  it("accepts research notes alone without qualitativeLastReviewed", () => {
    expect(
      schoolSchema.parse({
        ...validDirectoryOnlySchool,
        qualitativeResearchNotes: "Withhold note.",
      }),
    ).toMatchObject({
      ...validDirectoryOnlySchool,
      qualitativeResearchNotes: "Withhold note.",
    });
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

  it("rejects tagged schools missing perfilDaEscola", () => {
    expect(() => schoolSchema.parse(invalidTaggedWithoutPerfil)).toThrow();
  });

  it("rejects perfil-only schools missing qualitativeLastReviewed", () => {
    expect(() =>
      schoolSchema.parse(invalidPerfilWithoutReviewDate),
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
