import Link from "next/link";

import { Button } from "@/components/ui/Button";
import { GuideIntro } from "@/features/guides/GuideIntro";

export default function HomePage() {
  return (
    <main className="mx-auto flex min-h-screen max-w-3xl flex-col justify-center gap-8 px-6 py-12">
      <GuideIntro
        eyebrow="M2"
        title="Berlin School Guide"
        description="Fundação estática validada para o futuro guia de escolas primárias em Berlim."
      />
      <div>
        <Button asChild>
          <Link href="/guides/m2-smoke">Abrir página MDX</Link>
        </Button>
      </div>
    </main>
  );
}
