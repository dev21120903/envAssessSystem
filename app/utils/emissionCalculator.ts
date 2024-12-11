export const EMISSION_FACTORS = {
    diesel: 1.0, // Base factor
    B100: 0.7,   // 30% less emissions than diesel
    EV: 0.3,     // 70% less emissions than diesel
  };
  
  // Base emission values per category
  const BASE_EMISSIONS = {
    machine: 35,    // Scope 1
    material: 180,  // Scope 3
    facility: 65,   // Scope 2
    personnel: 40,  // Scope 3
    other: 25       // Scope 3
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
  
  export const calculateTotalEmissions = (rows: SimulationRow[], category: SimulationCategory): {
    original: number;
    modified: number;
  } => {
    const baseEmission = BASE_EMISSIONS[category];
  
    let originalTotal = 0;
    let modifiedTotal = 0;
  
    for (const row of rows) {
      let originalEmission = 0;
      let modifiedEmission = 0;
  
      // カテゴリごとに計算
      switch (category) {
        case 'machine': {
          const o = row.original as { energyType: string; percentage: number; operatingHours: number };
          const m = row.modified as { energyType: string; percentage: number; operatingHours: number; adjust: number };
          const oFactor = getEnergyFactor(o.energyType);
          const mFactor = getEnergyFactor(m.energyType);
  
          originalEmission = baseEmission * (o.percentage / 100) * (o.operatingHours / 24) * oFactor;
          originalEmission = originalEmission * (1 + 0 / 100);
  
          modifiedEmission = baseEmission * (m.percentage / 100) * (m.operatingHours / 24) * mFactor;
          modifiedEmission = modifiedEmission * (1 + m.adjust / 100);
  
          break;
        }
        case 'material': {
          const o = row.original as { quantity: number; unit: string; carbonIntensity: number };
          const m = row.modified as { quantity: number; unit: string; carbonIntensity: number; adjust: number };
  
          // 仮のロジック: quantityを1000で割ってスケール、carbonIntensityはそのまま使用
          originalEmission = baseEmission * (o.quantity / 1000) * o.carbonIntensity * (1 + 0 / 100);
          modifiedEmission = baseEmission * (m.quantity / 1000) * m.carbonIntensity * (1 + m.adjust / 100);
  
          break;
        }
        case 'facility': {
          const o = row.original as { energyType: string; consumption: number; usageDays: number };
          const m = row.modified as { energyType: string; consumption: number; usageDays: number; adjust: number };
          const oFactor = getEnergyFactor(o.energyType);
          const mFactor = getEnergyFactor(m.energyType);
  
          // 仮ロジック: consumptionを1000で割り、usageDaysを365で割り、factor使用
          originalEmission = baseEmission * (o.consumption / 1000) * (o.usageDays / 365) * oFactor;
          modifiedEmission = baseEmission * (m.consumption / 1000) * (m.usageDays / 365) * mFactor * (1 + m.adjust / 100);
  
          break;
        }
        case 'personnel': {
          const o = row.original as { headcount: number; workingHours: number; transportMode: string };
          const m = row.modified as { headcount: number; workingHours: number; transportMode: string; adjust: number };
  
          // transportModeによるfactorが不明なので1固定
          originalEmission = baseEmission * o.headcount * (o.workingHours / 8);
          modifiedEmission = baseEmission * m.headcount * (m.workingHours / 8) * (1 + m.adjust / 100);
  
          break;
        }
        case 'other': {
          const o = row.original as { quantity: number; unit: string; emissionFactor: number };
          const m = row.modified as { quantity: number; unit: string; emissionFactor: number; adjust: number };
  
          // 仮ロジック: quantityを100で割り、emissionFactorを掛ける
          originalEmission = baseEmission * (o.quantity / 100) * o.emissionFactor;
          modifiedEmission = baseEmission * (m.quantity / 100) * m.emissionFactor * (1 + m.adjust / 100);
  
          break;
        }
      }
  
      originalTotal += originalEmission;
      modifiedTotal += modifiedEmission;
    }
  
    return { original: originalTotal, modified: modifiedTotal };
  };
  