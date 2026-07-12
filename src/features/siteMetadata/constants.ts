export const SITE_NAME = "Berlin School Guide";

export function getSiteUrl(): string {
  return process.env.NEXT_PUBLIC_SITE_URL ?? "http://127.0.0.1:4310";
}

export const DEFAULT_OG_IMAGE = "/og-default.svg";

export const DEFAULT_DESCRIPTION =
  "Guia de escolas primárias em Berlim para famílias brasileiras — com transparência sobre fontes e evidências.";
