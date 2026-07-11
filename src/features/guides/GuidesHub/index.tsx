import Link from "next/link";

import { Button } from "@/components/ui/Button";

export function GuidesHub() {
  return (
    <div className="space-y-8">
      <section aria-labelledby="guides-system-heading">
        <h2
          id="guides-system-heading"
          className="text-lg font-semibold text-neutral-950"
        >
          Entenda o sistema
        </h2>
        <article className="mt-4 rounded-lg border border-neutral-200 border-l-4 border-l-primary bg-white p-6 md:p-8">
          <h3 className="text-xl font-semibold">
            Como funciona a escola primária em Berlim
          </h3>
          <p className="mt-2 text-base leading-8 text-neutral-700">
            Grundschule, matrícula, Ganztag e o que verificar antes de escolher
            uma escola — o primeiro passo para famílias recém-chegadas.
          </p>
          <Button asChild className="mt-4">
            <Link href="/guides/berlin-school-system">
              Ler guia do sistema escolar
            </Link>
          </Button>
        </article>
      </section>

      <section aria-labelledby="guides-checklists-heading">
        <h2
          id="guides-checklists-heading"
          className="text-lg font-semibold text-neutral-950"
        >
          Checklists práticas
        </h2>
        <article className="mt-4 rounded-lg border border-neutral-200 bg-neutral-50 p-5 md:p-6">
          <h3 className="text-xl font-semibold">Primeiros passos</h3>
          <p className="mt-2 text-base leading-8 text-neutral-700">
            Do zero até estar pronto para visitar escolas e iniciar a matrícula
            — tarefas essenciais para quem acabou de chegar.
          </p>
          <Button asChild variant="outline" className="mt-4">
            <Link href="/guides/first-steps">Abrir checklist</Link>
          </Button>
        </article>
      </section>
    </div>
  );
}
