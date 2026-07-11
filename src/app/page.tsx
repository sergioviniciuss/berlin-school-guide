import { GuideIntro } from "@/features/guides/GuideIntro";
import { HomeJourneyCards } from "@/features/home/HomeJourneyCards";

export const metadata = {
  title: "Berlin School Guide",
  description:
    "Guia de escolas primárias em Berlim para famílias brasileiras — com transparência sobre fontes e evidências.",
};

export default function HomePage() {
  return (
    <main className="mx-auto max-w-3xl space-y-12 px-6 py-12">
      <GuideIntro
        eyebrow="Berlin School Guide"
        title="Escolas primárias em Berlim para famílias brasileiras"
        description="Informações verificadas com transparência sobre fontes, dados ausentes e limites da pesquisa — para você comparar opções com clareza."
      />
      <HomeJourneyCards />
      <p className="text-base text-neutral-600">
        <span className="font-medium">Cobertura inicial</span>
        {" — "}Começamos com escolas em <strong>Lichtenberg</strong>. Outros
        distritos de Berlim serão adicionados conforme expandimos a pesquisa —
        sempre com a mesma transparência sobre fontes e limites.
      </p>
    </main>
  );
}
