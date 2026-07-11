import Link from "next/link";

import { Button } from "@/components/ui/Button";
import { GuideIntro } from "@/features/guides/GuideIntro";

export default function HomePage() {
  return (
    <main className="mx-auto flex min-h-screen max-w-3xl flex-col justify-center gap-8 px-6 py-12">
      <GuideIntro
        eyebrow="Berlin School Guide"
        title="Berlin School Guide"
        description="Guia de escolas primárias em Berlim para famílias brasileiras — com transparência sobre fontes e limites da pesquisa."
      />
      <div>
        <Button asChild>
          <Link href="/schools">Ver escolas em Lichtenberg</Link>
        </Button>
      </div>
    </main>
  );
}
