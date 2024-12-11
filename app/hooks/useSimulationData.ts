"use client";

import { useState, useEffect } from 'react';
import { SimulationCategory, SimulationRow } from '@/types/simulation';
import { calculateTotalEmissions } from '@/utils/emissionCalculator';
import { SIMULATION_DATA } from '@/constants/simulation-data';

export const useSimulationData = (category: SimulationCategory) => {
  const [data, setData] = useState<SimulationRow[]>(SIMULATION_DATA[category]);
  const [emissions, setEmissions] = useState({ original: 0, modified: 0 });

  useEffect(() => {
    setData(SIMULATION_DATA[category]);
  }, [category]);

  useEffect(() => {
    const newEmissions = calculateTotalEmissions(data, category);
    setEmissions(newEmissions);
  }, [data, category]);

  const addRow = (index: number) => {
    const sourceRow = data[index];
    const newRow: SimulationRow = {
      ...sourceRow,
      id: `${Date.now()}`,
      canDelete: true,
      modified: {
        ...sourceRow.original,
        adjust: 0,
      },
    };

    const newData = [...data];
    newData.splice(index + 1, 0, newRow);
    setData(newData);
  };

  const removeRow = (id: string) => {
    setData(data.filter(row => row.id !== id));
  };

  const updateModifiedValue = (id: string, field: keyof SimulationRow['modified'], value: string | number) => {
    setData(data.map(row => {
      if (row.id === id) {
        const numericValue = typeof value === 'string' ? parseFloat(value) : value;
        return {
          ...row,
          modified: {
            ...row.modified,
            [field]: numericValue,
          },
        };
      }
      return row;
    }));
  };

  return {
    data,
    addRow,
    removeRow,
    updateModifiedValue,
    emissions,
  };
};