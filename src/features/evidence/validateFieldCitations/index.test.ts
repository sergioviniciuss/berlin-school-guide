import { validateFieldCitations } from ".";
import {
  anecdotalSource,
  communitySourceA,
  journalismSource,
  officialDirectorySource,
} from "@/features/evidence/source/fixtures";
import type { Source } from "@/features/evidence/source";

describe("validateFieldCitations", () => {
  it("detects acceptable cited sources", () => {
    expect(
      validateFieldCitations(
        {
          status: "verified",
          citations: [{ sourceId: officialDirectorySource.id }],
        },
        [officialDirectorySource],
      ),
    ).toEqual({
      hasUnknownSource: false,
      hasAcceptableSource: true,
    });
  });

  it("does not treat anecdotal sources as acceptable for verified coverage", () => {
    expect(
      validateFieldCitations(
        {
          status: "verified",
          citations: [{ sourceId: anecdotalSource.id }],
        },
        [anecdotalSource],
      ),
    ).toEqual({
      hasUnknownSource: false,
      hasAcceptableSource: false,
    });
  });

  it("accepts journalism with secondary reliability as factual evidence", () => {
    expect(
      validateFieldCitations(
        {
          status: "verified",
          citations: [{ sourceId: journalismSource.id }],
        },
        [journalismSource],
      ),
    ).toEqual({
      hasUnknownSource: false,
      hasAcceptableSource: true,
    });
  });

  it("rejects triangulated_community even when reliability is secondary", () => {
    const communityWithSecondary: Source = {
      ...communitySourceA,
      reliability: "secondary",
    };

    expect(
      validateFieldCitations(
        {
          status: "verified",
          citations: [{ sourceId: communityWithSecondary.id }],
        },
        [communityWithSecondary],
      ),
    ).toEqual({
      hasUnknownSource: false,
      hasAcceptableSource: false,
    });
  });
});
