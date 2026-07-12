import { Suspense } from "react";

import { SchoolDirectory } from "@/features/schools/SchoolDirectory";
import { getSchoolDirectoryItems } from "@/features/schools/schoolDirectoryData";
import { buildPageMetadata } from "@/features/siteMetadata";

export const metadata = buildPageMetadata({
  title: "Escolas",
  description:
    "Diretório de escolas primárias em Berlim com pesquisa parcial em Lichtenberg. Cada fato indica seu status de evidência.",
  path: "/schools",
});

export default function SchoolsPage() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <Suspense fallback={<p>Carregando escolas...</p>}>
        <SchoolDirectory schools={getSchoolDirectoryItems()} />
      </Suspense>
    </main>
  );
}
