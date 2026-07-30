import { Suspense } from "react";

import { ReportCorrection } from "@/features/schools/ReportCorrection";
import { buildPageMetadata } from "@/features/siteMetadata";

export const metadata = buildPageMetadata({
  title: "Sugerir correção",
  description:
    "Sugira correções ou atualizações sobre dados factuais, características (tags) e o Perfil da escola.",
  path: "/report-correction",
});

export default function ReportCorrectionPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-12">
      <Suspense fallback={<p>Carregando…</p>}>
        <ReportCorrection />
      </Suspense>
    </main>
  );
}
