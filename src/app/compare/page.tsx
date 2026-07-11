import { Suspense } from "react";

import { SchoolComparison } from "@/features/schools/SchoolComparison";

export const metadata = {
  title: "Comparar",
  description:
    "Compare critérios de escolas primárias em Berlim lado a lado, com status de evidência e limitações claras — sem ranking de qualidade.",
};

export default function ComparePage() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <Suspense fallback={<p>Carregando comparação...</p>}>
        <SchoolComparison />
      </Suspense>
    </main>
  );
}
