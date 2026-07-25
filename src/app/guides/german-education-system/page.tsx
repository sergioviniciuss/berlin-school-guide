import Link from "next/link";

import GermanEducationSystemGuide from "@/content/guides/german-education-system.mdx";
import { GuideIntro } from "@/features/guides/GuideIntro";
import { buildPageMetadata } from "@/features/siteMetadata";

export const metadata = buildPageMetadata({
  title: "Sistema educacional alemão",
  description:
    "Um panorama visual do caminho educacional na Alemanha, do Kita à universidade, com as diferenças de Berlim em destaque.",
  path: "/guides/german-education-system",
});

export default function GermanEducationSystemPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-12 space-y-8">
      <GuideIntro
        eyebrow="Berlin School Guide"
        title="Como funciona o sistema educacional na Alemanha"
        description={
          <>
            Um panorama visual da jornada escolar — do Kita à universidade —
            com as diferenças de Berlim destacadas ao longo do caminho.
            Depois, veja{" "}
            <Link
              href="/guides/berlin-school-system"
              className="text-blue-700 underline"
            >
              Como funciona o sistema escolar público de Berlim
            </Link>
            .
          </>
        }
      />
      <GermanEducationSystemGuide />
    </main>
  );
}
