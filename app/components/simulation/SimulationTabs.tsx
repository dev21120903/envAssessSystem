"use client";

import { FC } from 'react';
import { Tab } from '@headlessui/react';
import clsx from 'clsx';
import SimulationTable from './SimulationTable';
import { SimulationCategory, SimulationRow } from '@/types/simulation';

interface SimulationTabsProps {
  activeTab: SimulationCategory;
  onTabChange: (tab: SimulationCategory) => void;
  data: SimulationRow[];
  addRow: (category: SimulationCategory, index: number) => void;
  removeRow: (category: SimulationCategory, id: string) => void;
  updateModifiedValue: (category: SimulationCategory, id: string, field: keyof SimulationRow['modified'], value: string | number) => void;
}

const tabs: { key: SimulationCategory; label: string; count?: number }[] = [
  { key: 'machine', label: 'Machine', count: 3 },
  { key: 'material', label: 'Material', count: 1 },
  { key: 'facility', label: 'Facility' },
  { key: 'personnel', label: 'Personnel' },
  { key: 'other', label: 'Other' },
];

const SimulationTabs: FC<SimulationTabsProps> = ({ activeTab, onTabChange, data, addRow, removeRow, updateModifiedValue }) => {
  return (
    <div>
      <div className="bg-blue-600 px-6 py-4">
        <h2 className="text-xl font-semibold text-white">Simulation</h2>
        <Tab.Group selectedIndex={tabs.findIndex(tab => tab.key === activeTab)} onChange={(index) => onTabChange(tabs[index].key)}>
          <Tab.List className="flex space-x-4 mt-4">
            {tabs.map(tab => (
              <Tab
                key={tab.key}
                className={({ selected }) => clsx(
                  'px-4 py-2 text-sm font-medium rounded-t-lg focus:outline-none',
                  selected
                    ? 'bg-white text-blue-600'
                    : 'text-white hover:bg-white/[0.12]'
                )}
              >
                {tab.label}
                {tab.count && (
                  <span className="ml-2 px-2 py-0.5 text-xs rounded-full bg-blue-500 text-white">
                    {tab.count}
                  </span>
                )}
              </Tab>
            ))}
          </Tab.List>
        </Tab.Group>
      </div>
      <SimulationTable 
        category={activeTab} 
        data={data} 
        addRow={addRow}
        removeRow={removeRow}
        updateModifiedValue={updateModifiedValue}
      />
    </div>
  );
};

export default SimulationTabs;
