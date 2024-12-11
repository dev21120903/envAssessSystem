"use client";

import { useState, Dispatch, SetStateAction } from 'react';
import { SimulationCategory, EmissionValues, SimulationRow } from '@/types/simulation';
import { calculateReductionPercentage, calculateTotalEmissions } from '@/utils/emissionCalculator';
import { SIMULATION_DATA } from '@/constants/simulation-data';

type CategoryState = [SimulationRow[], Dispatch<SetStateAction<SimulationRow[]>>];

export const useSimulation = () => {
  const [activeTab, setActiveTab] = useState<SimulationCategory>('machine');

  const [machineData, setMachineData] = useState<SimulationRow[]>(SIMULATION_DATA.machine);
  const [materialData, setMaterialData] = useState<SimulationRow[]>(SIMULATION_DATA.material);
  const [facilityData, setFacilityData] = useState<SimulationRow[]>(SIMULATION_DATA.facility);
  const [personnelData, setPersonnelData] = useState<SimulationRow[]>(SIMULATION_DATA.personnel);
  const [otherData, setOtherData] = useState<SimulationRow[]>(SIMULATION_DATA.other);

  const categoryDataMap: Record<SimulationCategory, CategoryState> = {
    machine: [machineData, setMachineData],
    material: [materialData, setMaterialData],
    facility: [facilityData, setFacilityData],
    personnel: [personnelData, setPersonnelData],
    other: [otherData, setOtherData],
  };

  const calcEmissions = (rows: SimulationRow[], category: SimulationCategory) => {
    // Only calculate original emissions for non-added rows
    const originalEmissions = calculateTotalEmissions(
      rows.filter(row => !row.canDelete),
      category,
      'original'
    );

    // Calculate modified emissions for all rows
    const modifiedEmissions = calculateTotalEmissions(
      rows,
      category,
      'modified'
    );

    return {
      original: originalEmissions,
      modified: modifiedEmissions
    };
  };

  const machineEmissions = calcEmissions(machineData, 'machine');
  const materialEmissions = calcEmissions(materialData, 'material');
  const facilityEmissions = calcEmissions(facilityData, 'facility');
  const personnelEmissions = calcEmissions(personnelData, 'personnel');
  const otherEmissions = calcEmissions(otherData, 'other');

  const scope1Original = machineEmissions.original;
  const scope1Modified = machineEmissions.modified;

  const scope2Original = facilityEmissions.original;
  const scope2Modified = facilityEmissions.modified;

  const scope3Original = materialEmissions.original + personnelEmissions.original + otherEmissions.original;
  const scope3Modified = materialEmissions.modified + personnelEmissions.modified + otherEmissions.modified;

  const totalOriginal = scope1Original + scope2Original + scope3Original;
  const totalModified = scope1Modified + scope2Modified + scope3Modified;

  const totalEmissions: EmissionValues = {
    total: totalOriginal,
    scope1: scope1Original,
    scope2: scope2Original,
    scope3: scope3Original
  };

  const modifiedEmissions: EmissionValues = {
    total: totalModified,
    scope1: scope1Modified,
    scope2: scope2Modified,
    scope3: scope3Modified
  };

  const reductionPercentages: EmissionValues = {
    total: calculateReductionPercentage(totalEmissions.total, modifiedEmissions.total),
    scope1: calculateReductionPercentage(totalEmissions.scope1, modifiedEmissions.scope1),
    scope2: calculateReductionPercentage(totalEmissions.scope2, modifiedEmissions.scope2),
    scope3: calculateReductionPercentage(totalEmissions.scope3, modifiedEmissions.scope3),
  };

  const addRow = (category: SimulationCategory, index: number) => {
    const [data, setData] = categoryDataMap[category];
    const sourceRow = data[index];
    
    // Create a new row with empty original values
    const newRow: SimulationRow = {
      id: `${Date.now()}`,
      purpose: '',
      name: '',
      canDelete: true,
      original: {
        ...sourceRow.original,
        quantity: 0,
        unit: '',
        emissionFactor: 0,
      },
      modified: {
        ...sourceRow.modified,
        adjust: 0,
      },
    };

    const newData = [...data];
    newData.splice(index + 1, 0, newRow);
    setData(newData);
  };

  const removeRow = (category: SimulationCategory, id: string) => {
    const [data, setData] = categoryDataMap[category];
    setData(data.filter(row => row.id !== id));
  };

  const numberFields = [
    'percentage', 'operatingHours', 'adjust',
    'quantity', 'carbonIntensity',
    'consumption', 'usageDays',
    'headcount', 'workingHours', 'emissionFactor'
  ];

  const updateModifiedValue = (category: SimulationCategory, id: string, field: keyof SimulationRow['modified'], value: string | number) => {
    const [data, setData] = categoryDataMap[category];
    const isNumberField = numberFields.includes(field as string);
    const newValue = isNumberField ? Number(value) : String(value);

    setData(data.map(row => {
      if (row.id === id) {
        return {
          ...row,
          modified: {
            ...row.modified,
            [field]: newValue,
          },
        } as SimulationRow;
      }
      return row;
    }));
  };

  return {
    activeTab,
    setActiveTab,
    totalEmissions,
    modifiedEmissions,
    reductionPercentages,
    machineData,
    materialData,
    facilityData,
    personnelData,
    otherData,
    addRow,
    removeRow,
    updateModifiedValue,
  };
};