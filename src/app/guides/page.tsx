import { GuideIntro } from "@/features/guides/GuideIntro";
import { GuidesHub } from "@/features/guides/GuidesHub";

export const metadata = {
  title: "Guias",
  description:
    "Guias práticos para famílias brasileiras entenderem o sistema escolar primário de Berlim.",
};

export default function GuidesPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-12 space-y-8">
      <GuideIntro
        eyebrow="Berlin School Guide"
        title="Guias"
        description="Comece pelo sistema escolar berlinense, depois use checklists práticas para visitar escolas e se preparar para a matrícula."
      />
      <GuidesHub />
    </main>
  );
}
