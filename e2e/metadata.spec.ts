import { expect, test } from "@playwright/test";

const CORE_ROUTES = [
  {
    path: "/",
    title: /Escolas primárias em Berlim para famílias brasileiras/i,
  },
  {
    path: "/schools",
    title: /Escolas/i,
  },
  {
    path: "/compare",
    title: /Comparar/i,
  },
  {
    path: "/guides",
    title: /Guias/i,
  },
  {
    path: "/methodology",
    title: /Metodologia|Como funciona nossa pesquisa/i,
  },
];

test.describe("metadata", () => {
  for (const route of CORE_ROUTES) {
    test(`exposes title, canonical, and Open Graph tags on ${route.path}`, async ({
      page,
    }) => {
      await page.goto(route.path);

      await expect(page).toHaveTitle(route.title);

      const canonical = page.locator('link[rel="canonical"]');
      await expect(canonical).toHaveCount(1);
      await expect(canonical).toHaveAttribute("href", /.+/);

      const ogTitle = page.locator('meta[property="og:title"]');
      await expect(ogTitle).toHaveCount(1);
      await expect(ogTitle).toHaveAttribute("content", /.+/);

      const ogLocale = page.locator('meta[property="og:locale"]');
      await expect(ogLocale).toHaveAttribute("content", "pt_BR");

      const twitterCard = page.locator('meta[name="twitter:card"]');
      await expect(twitterCard).toHaveAttribute("content", "summary_large_image");
    });
  }
});
