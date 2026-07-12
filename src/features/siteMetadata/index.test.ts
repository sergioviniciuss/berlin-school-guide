import { buildPageMetadata } from ".";

describe("buildPageMetadata", () => {
  const originalSiteUrl = process.env.NEXT_PUBLIC_SITE_URL;

  beforeAll(() => {
    process.env.NEXT_PUBLIC_SITE_URL = "https://berlin-school-guide.example";
  });

  afterAll(() => {
    process.env.NEXT_PUBLIC_SITE_URL = originalSiteUrl;
  });

  it("returns canonical, Open Graph, and Twitter metadata with pt_BR locale", () => {
    const metadata = buildPageMetadata({
      title: "Escolas",
      description: "Diretório de escolas primárias em Berlim.",
      path: "/schools",
    });

    expect(metadata.alternates?.canonical).toBe(
      "https://berlin-school-guide.example/schools",
    );
    expect(metadata.openGraph?.locale).toBe("pt_BR");
    expect(metadata.openGraph?.url).toBe(
      "https://berlin-school-guide.example/schools",
    );
    expect(metadata.twitter?.card).toBe("summary_large_image");
    expect(metadata.openGraph?.images).toEqual([
      {
        url: "/og-default.svg",
        alt: "Berlin School Guide — guia de escolas primárias em Berlim",
      },
    ]);
  });

  it("formats nested page titles with the site name suffix", () => {
    const metadata = buildPageMetadata({
      title: "Comparar",
      path: "/compare",
    });

    expect(metadata.openGraph?.title).toBe("Comparar — Berlin School Guide");
    expect(metadata.twitter?.title).toBe("Comparar — Berlin School Guide");
  });
});
