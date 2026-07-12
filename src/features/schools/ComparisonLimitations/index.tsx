import Link from "next/link";

export function ComparisonLimitations() {
  return (
    <section
      aria-labelledby="comparison-limitations-heading"
      className="rounded-lg border border-neutral-200 bg-neutral-50 p-5 text-sm text-neutral-800"
    >
      <h2
        id="comparison-limitations-heading"
        className="text-base font-semibold text-neutral-950"
      >
        O que esta comparação pode e não pode dizer
      </h2>
      <div className="mt-3 space-y-2">
        <p>
          Esta página coloca critérios lado a lado para ajudar sua família a
          preparar perguntas — mas{" "}
          <strong>não classifica escolas por qualidade</strong> nem indica uma
          &quot;melhor&quot; opção.
        </p>
        <p>
          A <strong>cobertura mede completude da pesquisa</strong>, não a
          qualidade da escola. Um percentual alto significa que verificamos mais
          campos neste nível de pesquisa.
        </p>
        <p>
          <strong>Campos ausentes indicam perguntas para fazer na visita</strong>{" "}
          ou na conversa com a escola — não significam que a informação não
          existe.
        </p>
        <p>
          Saiba como pesquisamos e interpretamos evidências na{" "}
          <Link
            href="/methodology"
            className="font-medium text-blue-700 underline hover:opacity-90"
          >
            Metodologia
          </Link>
          .
        </p>
      </div>
    </section>
  );
}
