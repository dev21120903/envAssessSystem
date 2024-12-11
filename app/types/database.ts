export interface DatabaseEntry {
  scope: string;
  category: string;
  totalEmissions: number | string;
  percentageOfTotal: number | string;
  yearlyChange: number | string;
  reductionTarget: number | string;
  achievedReduction: number | string;
}

export interface SortConfig {
  key: keyof DatabaseEntry | null;
  direction: 'asc' | 'desc';
}

export interface FilterConfig {
  scopes: string[];
  categories: string[];
  totalEmissions: { min: string; max: string };
  percentageOfTotal: { min: string; max: string };
  yearlyChange: { min: string; max: string };
  reductionTarget: { min: string; max: string };
  achievedReduction: { min: string; max: string };
}