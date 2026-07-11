"use client";

import { useEffect, useState } from "react";

import { CompareToggleButton } from "@/features/schools/CompareToggleButton";
import {
  MAX_COMPARE_SCHOOLS,
  readStoredCompareSlugs,
  toggleCompareSlug,
  writeStoredCompareSlugs,
} from "@/features/schools/compareSelection";

type SchoolProfileCompareActionProps = {
  slug: string;
};

export function SchoolProfileCompareAction({
  slug,
}: SchoolProfileCompareActionProps) {
  const [selectedSlugs, setSelectedSlugs] = useState<string[]>([]);

  useEffect(() => {
    setSelectedSlugs(readStoredCompareSlugs());
  }, []);

  const isSelected = selectedSlugs.includes(slug);
  const selectionFull =
    selectedSlugs.length >= MAX_COMPARE_SCHOOLS && !isSelected;

  const handleToggle = () => {
    const next = toggleCompareSlug(selectedSlugs, slug);
    writeStoredCompareSlugs(next);
    setSelectedSlugs(next);
  };

  return (
    <CompareToggleButton
      isSelected={isSelected}
      disabled={selectionFull}
      onToggle={handleToggle}
    />
  );
}
