import type { IndependenceLog } from "@/features/evidence/independenceLog";
import type { SchoolTag } from "@/features/schools/tagTaxonomy";
import {
  anecdotalSource,
  communitySourceA,
  communitySourceB,
  journalismSource,
  officialDirectorySource,
  schoolWebsiteSource,
} from "@/features/evidence/source/fixtures";
import type { Source } from "@/features/evidence/source";

export const independenceLogA: IndependenceLog = {
  venue: "Reddit r/berlin",
  identifier: "https://example.test/reddit-thread",
  dateAccessed: "2026-07-10",
  independenceRationale:
    "Distinct venue and authors from Facebook group discussion",
  echoCheckNote: "No copy-paste overlap with Facebook source",
};

export const independenceLogB: IndependenceLog = {
  venue: "Facebook Brazilian parents Berlin",
  identifier: "https://example.test/facebook-group",
  dateAccessed: "2026-07-10",
  independenceRationale:
    "Distinct venue and authors from Reddit discussion",
  echoCheckNote: "No copy-paste overlap with Reddit source",
};

export const tagSources: Source[] = [
  officialDirectorySource,
  schoolWebsiteSource,
  journalismSource,
  anecdotalSource,
  communitySourceA,
  communitySourceB,
];

export const validCommunityTag: SchoolTag = {
  id: "active-school-community",
  confidence: "confirmed_multi_source",
  citations: [
    {
      sourceId: communitySourceA.id,
      independenceLog: independenceLogA,
    },
    {
      sourceId: communitySourceB.id,
      independenceLog: independenceLogB,
    },
    { sourceId: officialDirectorySource.id },
  ],
};

export const communityOnlyTag: SchoolTag = {
  id: "active-school-community",
  confidence: "confirmed_multi_source",
  citations: [
    {
      sourceId: communitySourceA.id,
      independenceLog: independenceLogA,
    },
    {
      sourceId: communitySourceB.id,
      independenceLog: independenceLogB,
    },
  ],
};

export const oneCommunityPlusOfficialTag: SchoolTag = {
  id: "active-school-community",
  confidence: "confirmed_multi_source",
  citations: [
    {
      sourceId: communitySourceA.id,
      independenceLog: independenceLogA,
    },
    { sourceId: officialDirectorySource.id },
  ],
};

export const communityMissingLogTag: SchoolTag = {
  id: "active-school-community",
  confidence: "confirmed_multi_source",
  citations: [
    { sourceId: communitySourceA.id },
    {
      sourceId: communitySourceB.id,
      independenceLog: independenceLogB,
    },
    { sourceId: officialDirectorySource.id },
  ],
};

export const stemWithCommunityCite: SchoolTag = {
  id: "stem-focus",
  confidence: "confirmed_official",
  citations: [
    { sourceId: schoolWebsiteSource.id },
    {
      sourceId: communitySourceA.id,
      independenceLog: independenceLogA,
    },
  ],
};

export const stemWithAnecdotalCite: SchoolTag = {
  id: "stem-focus",
  confidence: "partial",
  citations: [{ sourceId: anecdotalSource.id }],
};

export const stemOfficialOnlyClaim: SchoolTag = {
  id: "stem-focus",
  confidence: "confirmed_official",
  citations: [{ sourceId: journalismSource.id }],
};

export const stemMultiWithSingleOfficial: SchoolTag = {
  id: "stem-focus",
  confidence: "confirmed_multi_source",
  citations: [{ sourceId: officialDirectorySource.id }],
};

export const stemPartialWhenMulti: SchoolTag = {
  id: "stem-focus",
  confidence: "partial",
  citations: [
    { sourceId: officialDirectorySource.id },
    { sourceId: journalismSource.id },
  ],
};

export const stemConfirmedOfficialWebsite: SchoolTag = {
  id: "stem-focus",
  confidence: "confirmed_official",
  citations: [{ sourceId: schoolWebsiteSource.id }],
};

export const unknownSourceTag: SchoolTag = {
  id: "stem-focus",
  confidence: "confirmed_official",
  citations: [{ sourceId: "missing-source-id" }],
};
