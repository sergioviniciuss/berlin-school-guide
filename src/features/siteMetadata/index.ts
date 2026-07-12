import type { Metadata } from "next";

import {
  DEFAULT_DESCRIPTION,
  DEFAULT_OG_IMAGE,
  getSiteUrl,
  SITE_NAME,
} from "./constants";

type BuildPageMetadataInput = {
  title: string;
  description?: string;
  path?: string;
};

function normalizePath(path: string): string {
  if (!path || path === "/") {
    return "/";
  }

  return path.startsWith("/") ? path : `/${path}`;
}

function buildCanonicalUrl(path?: string): string {
  const normalizedPath = normalizePath(path ?? "/");
  return new URL(normalizedPath, getSiteUrl()).toString();
}

export function buildPageMetadata({
  title,
  description = DEFAULT_DESCRIPTION,
  path,
}: BuildPageMetadataInput): Metadata {
  const canonicalUrl = buildCanonicalUrl(path);
  const pageTitle = title === SITE_NAME ? title : `${title} — ${SITE_NAME}`;

  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      type: "website",
      locale: "pt_BR",
      url: canonicalUrl,
      siteName: SITE_NAME,
      title: pageTitle,
      description,
      images: [
        {
          url: DEFAULT_OG_IMAGE,
          alt: `${SITE_NAME} — guia de escolas primárias em Berlim`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: pageTitle,
      description,
      images: [DEFAULT_OG_IMAGE],
    },
  };
}

export const siteMetadataDefaults: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  ...buildPageMetadata({
    title: SITE_NAME,
    description: DEFAULT_DESCRIPTION,
    path: "/",
  }),
};
