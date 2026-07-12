import Link from "next/link";

import { Button } from "@/components/ui/Button";

export function HomeJourneyCards() {
  return (
    <div className="space-y-4">
      <article className="rounded-lg border border-neutral-200 border-l-4 border-l-primary bg-white p-6 md:p-8">
        <h2 className="text-xl font-semibold">Explorar escolas</h2>
        <p className="mt-2 text-base leading-8 text-neutral-700">
          Veja escolas primárias em Lichtenberg com status de evidência em cada
          informação — o que confirmamos, o que falta e de onde veio.
        </p>
        <Button asChild className="mt-4">
          <Link href="/schools">Ver escolas em Lichtenberg</Link>
        </Button>
      </article>

      <article className="rounded-lg border border-neutral-200 bg-neutral-50 p-5 md:p-6">
        <h2 className="text-xl font-semibold">Entender o sistema escolar</h2>
        <p className="mt-2 text-base leading-8 text-neutral-700">
          Grundschule, matrícula, Ganztag e termos alemães — o contexto que
          ajuda a ler os cartões de escola com mais segurança.
        </p>
        <Button asChild variant="outline" className="mt-4">
          <Link href="/guides">Ver guias para famílias</Link>
        </Button>
      </article>

      <article className="rounded-lg border border-neutral-200 bg-neutral-50 p-5 md:p-6">
        <h2 className="text-xl font-semibold">Entender nossa metodologia</h2>
        <p className="mt-2 text-base leading-8 text-neutral-700">
          Saiba como interpretamos evidências, cobertura da pesquisa e dados
          ausentes antes de confiar nas informações.
        </p>
        <Button asChild variant="outline" className="mt-4">
          <Link href="/methodology">Como funciona nossa pesquisa</Link>
        </Button>
      </article>
    </div>
  );
}
