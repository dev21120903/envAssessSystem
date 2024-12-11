export type SimulationCategory = 'machine' | 'material' | 'facility' | 'personnel' | 'other';

interface BaseSimulationRow {
  id: string;
  purpose: string;
  name: string;
  canDelete: boolean;
}

// Machine specific fields
export interface MachineFields {
  energyType: string;
  percentage: number;
  operatingHours: number;
}

// Material specific fields
export interface MaterialFields {
  quantity: number;
  unit: string;
  carbonIntensity: number;
}

// Facility specific fields
export interface FacilityFields {
  energyType: string;
  consumption: number; // kWh
  usageDays: number;
}

// Personnel specific fields
export interface PersonnelFields {
  headcount: number;
  workingHours: number;
  transportMode: string;
}

// Other specific fields
export interface OtherFields {
  quantity: number;
  unit: string;
  emissionFactor: number;
}

export type CategoryFields = 
  | MachineFields 
  | MaterialFields 
  | FacilityFields 
  | PersonnelFields 
  | OtherFields;

export interface SimulationRow extends BaseSimulationRow {
  original: CategoryFields;
  modified: CategoryFields & { adjust: number };
}

export interface EmissionValues {
  total: number;
  scope1: number;
  scope2: number;
  scope3: number;
}
