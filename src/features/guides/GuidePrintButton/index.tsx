"use client";

import { Printer } from "lucide-react";

import { Button } from "@/components/ui/Button";

export function GuidePrintButton() {
  return (
    <Button
      type="button"
      variant="outline"
      className="guide-print-hide min-h-11"
      aria-label="Imprimir checklist"
      onClick={() => window.print()}
    >
      <Printer className="mr-2 size-4" aria-hidden />
      Imprimir checklist
    </Button>
  );
}
