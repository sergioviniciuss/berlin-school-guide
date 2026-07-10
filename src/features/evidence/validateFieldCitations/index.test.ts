import { validateFieldCitations } from ".";
import {
  anecdotalSource,
  officialDirectorySource,
} from "@/features/evidence/source/fixtures";

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
});
