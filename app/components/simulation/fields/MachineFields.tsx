import { FC } from 'react';
import EnergyTypeSelect from '../EnergyTypeSelect';
import { SimulationRow, MachineFields as MachineFieldsType } from '@/types/simulation';

interface FieldProps {
  row: SimulationRow;
  isModified?: (row: SimulationRow, field: string) => boolean;
  getModifiedStyle?: (modified: boolean) => React.CSSProperties;
  updateModifiedValue?: (id: string, field: keyof SimulationRow['modified'], value: string | number) => void;
}

const Headers: FC = () => (
  <>
    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider bg-gray-100">
      Energy Type
    </th>
    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider bg-gray-100">
      %
    </th>
    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider bg-gray-100">
      Operating Hours
    </th>
    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
      Energy Type
    </th>
    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
      %
    </th>
    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
      Operating Hours
    </th>
    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
      Adjust
    </th>
  </>
);

const Cells: FC<FieldProps> = ({ row, isModified, getModifiedStyle, updateModifiedValue }) => {
  const original = row.original as MachineFieldsType;
  const modified = row.modified as MachineFieldsType & { adjust: number };

  return (
    <>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 bg-gray-100">
        {original.energyType}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 bg-gray-100">
        {original.percentage}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 bg-gray-100">
        {original.operatingHours}
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <EnergyTypeSelect
          value={modified.energyType}
          onChange={(value) => updateModifiedValue?.(row.id, 'energyType' as keyof SimulationRow['modified'], value)}
          style={getModifiedStyle?.(isModified?.(row, 'energyType') ?? false)}
        />
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <input
          type="number"
          value={modified.percentage}
          onChange={(e) => updateModifiedValue?.(row.id, 'percentage' as keyof SimulationRow['modified'], Number(e.target.value))}
          className="w-20 rounded-md border-2 border-gray-400 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-gray-900"
          style={getModifiedStyle?.(isModified?.(row, 'percentage') ?? false)}
        />
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <input
          type="number"
          value={modified.operatingHours}
          onChange={(e) => updateModifiedValue?.(row.id, 'operatingHours' as keyof SimulationRow['modified'], Number(e.target.value))}
          className="w-20 rounded-md border-2 border-gray-400 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-gray-900"
          style={getModifiedStyle?.(isModified?.(row, 'operatingHours') ?? false)}
        />
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <input
          type="number"
          value={modified.adjust}
          onChange={(e) => updateModifiedValue?.(row.id, 'adjust' as keyof SimulationRow['modified'], Number(e.target.value))}
          className="w-20 rounded-md border-2 border-gray-400 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-gray-900"
          style={getModifiedStyle?.(isModified?.(row, 'adjust') ?? false)}
        />
      </td>
    </>
  );
};

const MachineFields = {
  Headers,
  Cells,
};

export default MachineFields;
