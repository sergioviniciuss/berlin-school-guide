import type { Source } from ".";

export const officialDirectorySource: Source = {
  id: "berlin-directory",
  title: "Synthetic Berlin school directory",
  url: "https://example.test/berlin-directory",
  type: "official_government",
  reliability: "primary",
  publisher: "Synthetic Berlin Senate source",
  dateAccessed: "2026-07-10",
  datePublished: "2026-07-01",
};

export const schoolWebsiteSource: Source = {
  id: "school-website",
  title: "Synthetic school website",
  url: "https://example.test/school",
  type: "school_website",
  reliability: "secondary",
  publisher: "Synthetic school",
  dateAccessed: "2026-07-10",
};

export const anecdotalSource: Source = {
  id: "parent-forum",
  title: "Synthetic parent forum",
  url: "https://example.test/forum",
  type: "anecdotal_reserved",
  reliability: "anecdotal",
  publisher: "Synthetic forum",
  dateAccessed: "2026-07-10",
};

export const journalismSource: Source = {
  id: "independent-journalism",
  title: "Synthetic independent journalism",
  url: "https://example.test/journalism",
  type: "journalism",
  reliability: "secondary",
  publisher: "Synthetic news outlet",
  dateAccessed: "2026-07-10",
  datePublished: "2026-06-01",
};

export const communitySourceA: Source = {
  id: "community-reddit",
  title: "Synthetic Reddit parent discussion",
  url: "https://example.test/reddit-thread",
  type: "triangulated_community",
  reliability: "anecdotal",
  publisher: "Synthetic Reddit venue",
  dateAccessed: "2026-07-10",
};

export const communitySourceB: Source = {
  id: "community-facebook",
  title: "Synthetic Facebook parent group",
  url: "https://example.test/facebook-group",
  type: "triangulated_community",
  reliability: "anecdotal",
  publisher: "Synthetic Facebook group",
  dateAccessed: "2026-07-10",
};
