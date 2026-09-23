import { validateTagEvidence } from ".";
import {
  communityMissingLogTag,
  communityOnlyTag,
  oneCommunityPlusOfficialTag,
  stemConfirmedOfficialWebsite,
  stemMultiWithSingleOfficial,
  stemOfficialOnlyClaim,
  stemPartialWhenMulti,
  stemWithAnecdotalCite,
  stemWithCommunityCite,
  tagSources,
  unknownSourceTag,
  validCommunityTag,
} from "./fixtures";

describe("validateTagEvidence", () => {
  it("rejects unknown sourceId", () => {
    const result = validateTagEvidence(unknownSourceTag, tagSources);
    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.messages.length).toBeGreaterThan(0);
    }
  });

  it("rejects active-school-community with only community citations (never sole basis)", () => {
    const result = validateTagEvidence(communityOnlyTag, tagSources);
    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.messages.length).toBeGreaterThan(0);
    }
  });

  it("rejects active-school-community with fewer than 2 community citations", () => {
    const result = validateTagEvidence(oneCommunityPlusOfficialTag, tagSources);
    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.messages.length).toBeGreaterThan(0);
    }
  });

  it("rejects active-school-community missing independenceLog on a community citation", () => {
    const result = validateTagEvidence(communityMissingLogTag, tagSources);
    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.messages.length).toBeGreaterThan(0);
    }
  });

  it("accepts active-school-community with 2 community logs + 1 official when confidence matches", () => {
    expect(validateTagEvidence(validCommunityTag, tagSources)).toEqual({
      ok: true,
    });
  });

  it("rejects non-community tag citing triangulated_community", () => {
    const result = validateTagEvidence(stemWithCommunityCite, tagSources);
    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.messages.length).toBeGreaterThan(0);
    }
  });

  it("rejects non-community tag citing anecdotal_reserved", () => {
    const result = validateTagEvidence(stemWithAnecdotalCite, tagSources);
    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.messages.length).toBeGreaterThan(0);
    }
  });

  it("rejects confirmed_official when only journalism is cited", () => {
    const result = validateTagEvidence(stemOfficialOnlyClaim, tagSources);
    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.messages.length).toBeGreaterThan(0);
    }
  });

  it("rejects confirmed_multi_source with a single official cite", () => {
    const result = validateTagEvidence(stemMultiWithSingleOfficial, tagSources);
    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.messages.length).toBeGreaterThan(0);
    }
  });

  it("rejects partial when multi-source predicate is satisfied", () => {
    const result = validateTagEvidence(stemPartialWhenMulti, tagSources);
    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.messages.length).toBeGreaterThan(0);
    }
  });

  it("accepts stem-focus with one school_website cite and confirmed_official", () => {
    expect(
      validateTagEvidence(stemConfirmedOfficialWebsite, tagSources),
    ).toEqual({ ok: true });
  });
});
