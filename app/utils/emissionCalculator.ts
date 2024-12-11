export const EMISSION_FACTORS = {
  diesel: 1.0,
  B100: 0.7,
  EV: 0.3,
};

const BASE_EMISSIONS = {
  machine: 35,
  material: 180,
  facility: 65,
  personnel: 40,
  other: 25
};

import { SimulationRow, SimulationCategory } from '@/types/simulation';
import { CATEGORY_SCOPE_MAP } from '@/constants/simulation-data';

export const calculateReductionPercentage = (original: number, modified: number): number => {
  if (original === 0) return 0;
  return Number((((original - modified) / original) * 100).toFixed(2));
};

function getEnergyFactor(type?: string): number {
  if (!type) return 1;
  const factor = EMISSION_FACTORS[type as keyof typeof EMISSION_FACTORS];
  return factor !== undefined ? factor : 1;
}

export const calculateTotalEmissions = (
  rows: SimulationRow[],
  category: SimulationCategory,
  type: 'original' | 'modified' = 'modified'
): number => {
  const baseEmission = BASE_EMISSIONS[category];
  let total = 0;

  for (const row of rows) {
    const data = type === 'original' ? row.original : row.modified;
    if (!data || (type === 'original' && row.canDelete)) continue;

    let emission = 0;

    switch (category) {
      case 'machine': {
        const d = data as { energyType: string; percentage: number; operatingHours: number };
        if (!d.percentage || !d.operatingHours) continue;
        
        const factor = getEnergyFactor(d.energyType);
        emission = baseEmission * (d.percentage / 100) * (d.operatingHours / 24) * factor;
        break;
      }
      case 'material': {
        const d = data as { quantity: number; carbonIntensity: number };
        if (!d.quantity || !d.carbonIntensity) continue;
        
        emission = baseEmission * (d.quantity / 1000) * d.carbonIntensity;
        break;
      }
      case 'facility': {
        const d = data as { energyType: string; consumption: number; usageDays: number };
        if (!d.consumption || !d.usageDays) continue;
        
        const factor = getEnergyFactor(d.energyType);
        emission = baseEmission * (d.consumption / 1000) * (d.usageDays / 365) * factor;
        break;
      }
      case 'personnel': {
        const d = data as { headcount: number; workingHours: number };
        if (!d.headcount || !d.workingHours) continue;
        
        emission = baseEmission * d.headcount * (d.workingHours / 8);
        break;
      }
      case 'other': {
        const d = data as { quantity: number; emissionFactor: number };
        if (!d.quantity || !d.emissionFactor) continue;
        
        emission = baseEmission * (d.quantity / 100) * d.emissionFactor;
        break;
      }
    }

    if (type === 'modified' && 'adjust' in data) {
      emission *= (1 + (data.adjust as number) / 100);
    }

    total += emission;
  }

  return total;
};