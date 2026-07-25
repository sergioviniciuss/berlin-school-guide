import Link from "next/link";

import BerlinSchoolSystemGuide from "@/content/guides/berlin-school-system.mdx";
import { GuideIntro } from "@/features/guides/GuideIntro";
import { buildPageMetadata } from "@/features/siteMetadata";

export const metadata = buildPageMetadata({
  title: "Sistema escolar público em Berlim",
  description:
    "Grundschule, matrícula, Einzugsgebiet, Ganztag e o que verificar antes de escolher uma escola no sistema escolar público de Berlim.",
  path: "/guides/berlin-school-system",
});

export default function BerlinSchoolSystemPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-12 space-y-8">
      <GuideIntro
        eyebrow="Berlin School Guide"
        title="Como funciona o sistema escolar público de Berlim"
        description={
          <>
            Um panorama prático do sistema — o que significam os termos
            alemães e o que vale conferir antes de visitar escolas ou iniciar
            a matrícula. Se você ainda não conhece a estrutura do sistema
            educacional alemão, recomendamos começar por{" "}
            <Link
              href="/guides/german-education-system"
              className="text-blue-700 underline"
            >
              Como funciona o sistema educacional na Alemanha
            </Link>
            .
          </>
        }
      />
      <BerlinSchoolSystemGuide />
    </main>
  );
}
