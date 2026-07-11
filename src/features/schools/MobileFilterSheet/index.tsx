"use client";

import { Button } from "@/components/ui/Button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/Sheet";
import type { DirectoryFilterState } from "@/features/schools/filterSchools/types";
import { SchoolFilters } from "@/features/schools/SchoolFilters";
import type { FilterOptions } from "@/features/schools/SchoolFilters/types";

export type MobileFilterSheetProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  draftFilters: DirectoryFilterState;
  filterOptions: FilterOptions;
  onDraftToggle: (key: keyof DirectoryFilterState, value: string) => void;
  onApply: () => void;
  onClearAndApply: () => void;
};

export function MobileFilterSheet({
  open,
  onOpenChange,
  draftFilters,
  filterOptions,
  onDraftToggle,
  onApply,
  onClearAndApply,
}: MobileFilterSheetProps) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="right"
        id="mobile-school-filters-sheet"
        className="flex h-full w-[min(100%,20rem)] flex-col p-0"
      >
        <SheetHeader className="shrink-0 border-b border-neutral-200 px-6 py-4 text-left">
          <SheetTitle>Filtros</SheetTitle>
        </SheetHeader>

        <div className="min-h-0 flex-1 overflow-y-auto px-6 py-4">
          <SchoolFilters
            filters={draftFilters}
            options={filterOptions}
            onToggle={onDraftToggle}
          />
        </div>

        <div className="flex shrink-0 gap-3 border-t border-neutral-200 px-6 py-4">
          <Button
            type="button"
            variant="outline"
            className="min-h-11 flex-1"
            onClick={onClearAndApply}
          >
            Limpar filtros
          </Button>
          <Button type="button" className="min-h-11 flex-1" onClick={onApply}>
            Aplicar filtros
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
