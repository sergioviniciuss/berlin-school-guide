import Link from "next/link";

import { Button } from "@/components/ui/Button";

export default function SchoolProfileNotFound() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-12 space-y-6">
      <h1 className="text-4xl font-semibold">Escola não encontrada</h1>
      <p className="text-base text-neutral-700">
        Não encontramos uma escola com este endereço no diretório atual.
      </p>
      <Button asChild>
        <Link href="/schools">Voltar ao diretório</Link>
      </Button>
      <p>
        <Link href="/" className="text-sm text-blue-700 hover:underline">
          Ir para o início
        </Link>
      </p>
    </main>
  );
}
