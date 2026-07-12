"use client";

import Link from "next/link";

import { Button } from "@/components/ui/Button";
import { buildComparePageHref } from "@/features/schools/parseCompareSlugs";

type CompareBarProps = {
  selectedSlugs: string[];
};

function formatSelectionCount(count: number): string {
  if (count === 1) {
    return "1 escola selecionada";
  }

  return `${count} escolas selecionadas`;
}

export function CompareBar({ selectedSlugs }: CompareBarProps) {
  const selectedCount = selectedSlugs.length;

  if (selectedCount === 0) {
    return null;
  }

  const canCompare = selectedCount >= 2;

  return (
    <div
      role="region"
      aria-label="Comparação de escolas"
      className="fixed bottom-0 inset-x-0 z-20 border-t border-neutral-200 bg-white p-4 shadow-md"
    >
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-4">
        <p className="text-sm font-medium text-neutral-950">
          {formatSelectionCount(selectedCount)}
        </p>
        {canCompare ? (
          <Button asChild className="min-h-11">
            <Link href={buildComparePageHref(selectedSlugs)}>
              Comparar escolas
            </Link>
          </Button>
        ) : (
          <Button type="button" disabled className="min-h-11">
            Comparar escolas
          </Button>
        )}
      </div>
    </div>
  );
}
