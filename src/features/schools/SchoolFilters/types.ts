import type {
  BinaryFilterValue,
  CoverageFilterValue,
  DirectoryFilterState,
  StatusFilterValue,
} from "@/features/schools/filterSchools/types";
import type {
  InspectionAvailability,
  SchoolClassification,
} from "@/features/schools/schoolClassification";

export type FilterOptions = {
  districts: string[];
  neighbourhoods: string[];
  languages: string[];
  educationalFocus: string[];
};

export type SchoolFiltersProps = {
  filters: DirectoryFilterState;
  options: FilterOptions;
  onToggle: (key: keyof DirectoryFilterState, value: string) => void;
};

export type ClassificationOption = SchoolClassification;
export type InspectionOption = InspectionAvailability;
export type StatusOption = StatusFilterValue;
export type BinaryOption = BinaryFilterValue;
export type CoverageOption = CoverageFilterValue;
