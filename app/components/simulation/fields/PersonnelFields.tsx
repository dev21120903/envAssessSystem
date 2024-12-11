import { FC } from 'react';
import { SimulationRow, PersonnelFields as PersonnelFieldsType } from '@/types/simulation';

interface FieldProps {
  row: SimulationRow;
  isModified?: (row: SimulationRow, field: string) => boolean;
  getModifiedStyle?: (modified: boolean) => React.CSSProperties;
  updateModifiedValue?: (id: string, field: keyof SimulationRow['modified'], value: string | number) => void;
}

const transportModes = ['car', 'bus', 'train', 'bicycle'];

const Headers: FC = () => (
  <>
    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider bg-gray-100">
      Headcount
    </th>
    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider bg-gray-100">
      Working Hours
    </th>
    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider bg-gray-100">
      Transport Mode
    </th>
    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
      Headcount
    </th>
    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
      Working Hours
    </th>
    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
      Transport Mode
    </th>
    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
      Adjust
    </th>
  </>
);

const Cells: FC<FieldProps> = ({ row, isModified, getModifiedStyle, updateModifiedValue }) => {
  const original = row.original as PersonnelFieldsType;
  const modified = row.modified as PersonnelFieldsType & { adjust: number };

  return (
    <>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 bg-gray-100">
        {original.headcount}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 bg-gray-100">
        {original.workingHours}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 bg-gray-100">
        {original.transportMode}
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <input
          type="number"
          value={modified.headcount}
          onChange={(e) => updateModifiedValue?.(row.id, 'headcount' as keyof SimulationRow['modified'], Number(e.target.value))}
          className="w-20 rounded-md border-2 border-gray-400 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-gray-900"
          style={getModifiedStyle?.(isModified?.(row, 'headcount') ?? false)}
        />
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <input
          type="number"
          value={modified.workingHours}
          onChange={(e) => updateModifiedValue?.(row.id, 'workingHours' as keyof SimulationRow['modified'], Number(e.target.value))}
          className="w-20 rounded-md border-2 border-gray-400 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-gray-900"
          style={getModifiedStyle?.(isModified?.(row, 'workingHours') ?? false)}
        />
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <select
          value={modified.transportMode}
          onChange={(e) => updateModifiedValue?.(row.id, 'transportMode' as keyof SimulationRow['modified'], e.target.value)}
          className="w-32 rounded-md border-2 border-gray-400 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-gray-900"
          style={getModifiedStyle?.(isModified?.(row, 'transportMode') ?? false)}
        >
          {transportModes.map(mode => (
            <option key={mode} value={mode}>
              {mode}
            </option>
          ))}
        </select>
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

const PersonnelFields = {
  Headers,
  Cells,
};

export default PersonnelFields;
