'use client';

import { FC } from 'react';
import { PlusIcon, MinusIcon } from '@heroicons/react/24/outline';
import { SimulationCategory, SimulationRow } from '@/types/simulation';
import CategoryFields from './fields/CategoryFields';

interface SimulationTableProps {
  category: SimulationCategory;
  data: SimulationRow[];
  addRow: (category: SimulationCategory, index: number) => void;
  removeRow: (category: SimulationCategory, id: string) => void;
  updateModifiedValue: (category: SimulationCategory, id: string, field: keyof SimulationRow['modified'], value: string | number) => void;
}

const SimulationTable: FC<SimulationTableProps> = ({ category, data, addRow, removeRow, updateModifiedValue }) => {

  const isModified = (row: SimulationRow, field: string) => {
    if (field === 'adjust') return row.modified.adjust !== 0;

    // field比較
    const originalVal = (row.original as any)[field];
    const modifiedVal = (row.modified as any)[field];
    return originalVal !== modifiedVal;
  };

  const getModifiedStyle = (modified: boolean) => {
    return modified ? { backgroundColor: '#FFF7D5' } : {};
  };

  return (
    <div className="flex-1 overflow-hidden">
      <div className="h-[calc(100vh-32rem)] overflow-y-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50 sticky top-0 z-10">
            <tr>
              <th className="w-12"></th>
              <th className="px-6 py-3" colSpan={2}></th>
              <th
                colSpan={3}
                className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider bg-gray-100"
              >
                ORIGINAL
              </th>
              <th
                colSpan={4}
                className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider bg-gray-50"
              >
                MODIFIED
              </th>
            </tr>
            <tr>
              <th></th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Purpose
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <CategoryFields.Headers category={category} />
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {data.map((row, index) => (
              <tr key={row.id}>
                <td className="px-2">
                  {row.canDelete ? (
                    <button
                      onClick={() => removeRow(category, row.id)}
                      className="p-1 text-gray-400 hover:text-gray-600"
                    >
                      <MinusIcon className="w-4 h-4" />
                    </button>
                  ) : (
                    <button
                      onClick={() => addRow(category, index)}
                      className="p-1 text-gray-400 hover:text-gray-600"
                    >
                      <PlusIcon className="w-4 h-4" />
                    </button>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {!row.canDelete && row.purpose}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {!row.canDelete && row.name}
                </td>
                <CategoryFields.Cells
                    category={category}
                    row={row}
                    isModified={isModified}
                    getModifiedStyle={getModifiedStyle}
                    updateModifiedValue={(id, field, value) =>
                    updateModifiedValue(category, id, field as keyof SimulationRow['modified'], value)
                }
                />
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SimulationTable;
