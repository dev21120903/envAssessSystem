"use client";

import { FC } from 'react';
import EmissionCard from '../dashboard/EmissionCard';
import SimulationTabs from './SimulationTabs';
import { useSimulation } from '@/hooks/useSimulation';

const SimulationPage: FC = () => {
  const {
    totalEmissions,
    modifiedEmissions,
    reductionPercentages,
    activeTab,
    setActiveTab,
    machineData,
    materialData,
    facilityData,
    personnelData,
    otherData,
    addRow,
    removeRow,
    updateModifiedValue,
  } = useSimulation();

  const categoryDataMap = {
    machine: machineData,
    material: materialData,
    facility: facilityData,
    personnel: personnelData,
    other: otherData,
  };

  return (
    <div className="p-8 h-[calc(100vh-5rem)] flex flex-col space-y-8">
      {/* Emission Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <EmissionCard
          title="Total Emissions"
          value={totalEmissions.total}
          modifiedValue={modifiedEmissions.total}
          change={reductionPercentages.total}
          variant="primary"
          showChange={reductionPercentages.total !== 0}
        />
        <EmissionCard
          title="Scope 1"
          value={totalEmissions.scope1}
          modifiedValue={modifiedEmissions.scope1}
          change={reductionPercentages.scope1}
          variant="scope1"
          showChange={reductionPercentages.scope1 !== 0}
        />
        <EmissionCard
          title="Scope 2"
          value={totalEmissions.scope2}
          modifiedValue={modifiedEmissions.scope2}
          change={reductionPercentages.scope2}
          variant="scope2"
          showChange={reductionPercentages.scope2 !== 0}
        />
        <EmissionCard
          title="Scope 3"
          value={totalEmissions.scope3}
          modifiedValue={modifiedEmissions.scope3}
          change={reductionPercentages.scope3}
          variant="scope3"
          showChange={reductionPercentages.scope3 !== 0}
        />
      </div>

      {/* Simulation Table */}
      <div className="flex-1 bg-white rounded-lg shadow-lg overflow-hidden flex flex-col min-h-[500px]">
        <SimulationTabs
          activeTab={activeTab}
          onTabChange={setActiveTab}
          data={categoryDataMap[activeTab]}
          addRow={addRow}
          removeRow={removeRow}
          updateModifiedValue={updateModifiedValue}
        />
      </div>
    </div>
  );
};

export default SimulationPage;
