import BerlinSchoolSystemGuide from "@/content/guides/berlin-school-system.mdx";
import { GuideIntro } from "@/features/guides/GuideIntro";

export const metadata = {
  title: "Sistema escolar primário em Berlim",
  description:
    "Grundschule, matrícula, Einzugsgebiet, Ganztag e o que verificar antes de escolher uma escola primária em Berlim.",
};

export default function BerlinSchoolSystemPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-12 space-y-8">
      <GuideIntro
        eyebrow="Berlin School Guide"
        title="Como funciona a escola primária em Berlim"
        description="Um panorama prático do sistema — o que significam os termos alemães e o que vale conferir antes de visitar escolas ou iniciar a matrícula."
      />
      <BerlinSchoolSystemGuide />
    </main>
  );
}
