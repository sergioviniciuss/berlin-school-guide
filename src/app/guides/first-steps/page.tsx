import FirstStepsGuide from "@/content/guides/first-steps.mdx";
import { GuideIntro } from "@/features/guides/GuideIntro";
import { GuidePrintButton } from "@/features/guides/GuidePrintButton";
import { buildPageMetadata } from "@/features/siteMetadata";

export const metadata = buildPageMetadata({
  title: "Primeiros passos",
  description:
    "Checklist prática para famílias recém-chegadas: área de matrícula, documentos, visitas e perguntas antes de iniciar a matrícula em Berlim.",
  path: "/guides/first-steps",
});

export default function FirstStepsPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-12 space-y-8">
      <GuideIntro
        eyebrow="Berlin School Guide"
        title="Primeiros passos"
        description="Tarefas essenciais do zero até estar pronto para visitar escolas e conversar com secretarias — sem substituir orientação oficial do Bezirk ou da escola."
      />
      <div className="guide-print-hide flex justify-end">
        <GuidePrintButton />
      </div>
      <div className="guide-print space-y-6">
        <FirstStepsGuide />
      </div>
    </main>
  );
}
