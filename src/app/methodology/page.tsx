import MethodologyGuide from "@/content/guides/methodology.mdx";
import { GuideIntro } from "@/features/guides/GuideIntro";
import { buildPageMetadata } from "@/features/siteMetadata";

export const metadata = buildPageMetadata({
  title: "Metodologia",
  description:
    "Como interpretamos evidências, dados ausentes e cobertura da pesquisa.",
  path: "/methodology",
});

export default function MethodologyPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-12 space-y-8">
      <GuideIntro
        eyebrow="Berlin School Guide"
        title="Como funciona nossa pesquisa"
        description="Entenda o que significam os status de evidência, a cobertura da pesquisa e os termos alemães que você vê nos cartões."
      />
      <MethodologyGuide />
    </main>
  );
}
