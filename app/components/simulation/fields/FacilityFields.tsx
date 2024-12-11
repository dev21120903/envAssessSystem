import { FC } from 'react';
import EnergyTypeSelect from '../EnergyTypeSelect';
import { SimulationRow, FacilityFields as FacilityFieldsType } from '@/types/simulation';

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
      Consumption (kWh)
    </th>
    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider bg-gray-100">
      Usage Days
    </th>
    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
      Energy Type
    </th>
    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
      Consumption (kWh)
    </th>
    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
      Usage Days
    </th>
    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
      Adjust
    </th>
  </>
);

const Cells: FC<FieldProps> = ({ row, isModified, getModifiedStyle, updateModifiedValue }) => {
  const original = row.original as FacilityFieldsType;
  const modified = row.modified as FacilityFieldsType & { adjust: number };

  return (
    <>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 bg-gray-100">
        {original.energyType}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 bg-gray-100">
        {original.consumption}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 bg-gray-100">
        {original.usageDays}
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
          value={modified.consumption}
          onChange={(e) => updateModifiedValue?.(row.id, 'consumption' as keyof SimulationRow['modified'], Number(e.target.value))}
          className="w-20 rounded-md border-2 border-gray-400 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-gray-900"
          style={getModifiedStyle?.(isModified?.(row, 'consumption') ?? false)}
        />
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <input
          type="number"
          value={modified.usageDays}
          onChange={(e) => updateModifiedValue?.(row.id, 'usageDays' as keyof SimulationRow['modified'], Number(e.target.value))}
          className="w-20 rounded-md border-2 border-gray-400 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-gray-900"
          style={getModifiedStyle?.(isModified?.(row, 'usageDays') ?? false)}
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

const FacilityFields = {
  Headers,
  Cells,
};

export default FacilityFields;
