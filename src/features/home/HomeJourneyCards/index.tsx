import Link from "next/link";

import { Button } from "@/components/ui/Button";

export function HomeJourneyCards() {
  return (
    <div className="space-y-4">
      <article className="rounded-lg border border-neutral-200 border-l-4 border-l-primary bg-white p-6 md:p-8">
        <h2 className="text-xl font-semibold">Comece por aqui</h2>
        <p className="mt-2 text-base leading-8 text-neutral-700">
          Entenda como funciona o sistema educacional na Alemanha antes de
          comparar escolas — o ponto de partida para famílias recém-chegadas.
        </p>
        <Button asChild className="mt-4">
          <Link href="/guides/german-education-system">
            Começar pelo guia do sistema
          </Link>
        </Button>
      </article>

      <article className="rounded-lg border border-neutral-200 bg-neutral-50 p-5 md:p-6">
        <h2 className="text-xl font-semibold">Explorar escolas</h2>
        <p className="mt-2 text-base leading-8 text-neutral-700">
          Já conhece o sistema ou está comparando opções? Veja escolas
          primárias em Lichtenberg com status de evidência em cada
          informação.
        </p>
        <Button asChild variant="outline" className="mt-4">
          <Link href="/schools?district=Lichtenberg">
            Ver escolas em Lichtenberg
          </Link>
        </Button>
      </article>
    </div>
  );
}
