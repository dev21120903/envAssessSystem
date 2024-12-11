import { SimulationRow, SimulationCategory } from '@/types/simulation';

export const CATEGORY_SCOPE_MAP = {
  machine: 'scope1',
  material: 'scope3',
  facility: 'scope2',
  personnel: 'scope3',
  other: 'scope3'
};

export const SIMULATION_DATA: Record<SimulationCategory, SimulationRow[]> = {
  machine: [
    {
      id: '1',
      purpose: 'tunneling',
      name: 'drilling jumbo A-001',
      canDelete: false,
      original: { energyType: 'diesel', percentage: 100, operatingHours: 24 },
      modified: { energyType: 'diesel', percentage: 100, operatingHours: 24, adjust: 0 }
    },
    {
      id: '2',
      purpose: 'excavation',
      name: 'excavator B-101',
      canDelete: false,
      original: { energyType: 'diesel', percentage: 100, operatingHours: 16 },
      modified: { energyType: 'diesel', percentage: 100, operatingHours: 16, adjust: 0 }
    }
  ],
  material: [
    {
      id: '3',
      purpose: 'structure',
      name: 'concrete',
      canDelete: false,
      original: { quantity: 1000, unit: 'm3', carbonIntensity: 2.8 },
      modified: { quantity: 1000, unit: 'm3', carbonIntensity: 2.8, adjust: 0 }
    },
    {
      id: '4',
      purpose: 'reinforcement',
      name: 'steel rebar',
      canDelete: false,
      original: { quantity: 500, unit: 'ton', carbonIntensity: 1.85 },
      modified: { quantity: 500, unit: 'ton', carbonIntensity: 1.85, adjust: 0 }
    }
  ],
  facility: [
    {
      id: '5',
      purpose: 'lighting',
      name: 'site lighting',
      canDelete: false,
      original: { energyType: 'EV', consumption: 1200, usageDays: 365 },
      modified: { energyType: 'EV', consumption: 1200, usageDays: 365, adjust: 0 }
    },
    {
      id: '6',
      purpose: 'HVAC',
      name: 'office AC',
      canDelete: false,
      original: { energyType: 'EV', consumption: 800, usageDays: 250 },
      modified: { energyType: 'EV', consumption: 800, usageDays: 250, adjust: 0 }
    }
  ],
  personnel: [
    {
      id: '7',
      purpose: 'construction',
      name: 'site workers',
      canDelete: false,
      original: { headcount: 50, workingHours: 8, transportMode: 'bus' },
      modified: { headcount: 50, workingHours: 8, transportMode: 'bus', adjust: 0 }
    },
    {
      id: '8',
      purpose: 'management',
      name: 'site managers',
      canDelete: false,
      original: { headcount: 10, workingHours: 9, transportMode: 'car' },
      modified: { headcount: 10, workingHours: 9, transportMode: 'car', adjust: 0 }
    }
  ],
  other: [
    {
      id: '9',
      purpose: 'waste',
      name: 'construction waste',
      canDelete: false,
      original: { quantity: 100, unit: 'ton', emissionFactor: 0.5 },
      modified: { quantity: 100, unit: 'ton', emissionFactor: 0.5, adjust: 0 }
    },
    {
      id: '10',
      purpose: 'water',
      name: 'process water',
      canDelete: false,
      original: { quantity: 5000, unit: 'm3', emissionFactor: 0.3 },
      modified: { quantity: 5000, unit: 'm3', emissionFactor: 0.3, adjust: 0 }
    }
  ]
};
