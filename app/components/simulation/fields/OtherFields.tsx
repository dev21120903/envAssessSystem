import { FC } from 'react';
import { SimulationRow, OtherFields as OtherFieldsType } from '@/types/simulation';

interface FieldProps {
  row: SimulationRow;
  isModified?: (row: SimulationRow, field: string) => boolean;
  getModifiedStyle?: (modified: boolean) => React.CSSProperties;
  updateModifiedValue?: (id: string, field: keyof SimulationRow['modified'], value: string | number) => void;
}

const Headers: FC = () => (
  <>
    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider bg-gray-100">
      Quantity
    </th>
    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider bg-gray-100">
      Unit
    </th>
    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider bg-gray-100">
      Emission Factor
    </th>
    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
      Quantity
    </th>
    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
      Unit
    </th>
    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
      Emission Factor
    </th>
    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
      Adjust
    </th>
  </>
);

const Cells: FC<FieldProps> = ({ row, isModified, getModifiedStyle, updateModifiedValue }) => {
  const original = row.original as OtherFieldsType;
  const modified = row.modified as OtherFieldsType & { adjust: number };

  return (
    <>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 bg-gray-100">
        {original.quantity}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 bg-gray-100">
        {original.unit}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 bg-gray-100">
        {original.emissionFactor}
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <input
          type="number"
          value={modified.quantity}
          onChange={(e) => updateModifiedValue?.(row.id, 'quantity' as keyof SimulationRow['modified'], Number(e.target.value))}
          className="w-20 rounded-md border-2 border-gray-400 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-gray-900"
          style={getModifiedStyle?.(isModified?.(row, 'quantity') ?? false)}
        />
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
        {modified.unit}
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <input
          type="number"
          value={modified.emissionFactor}
          onChange={(e) => updateModifiedValue?.(row.id, 'emissionFactor' as keyof SimulationRow['modified'], Number(e.target.value))}
          className="w-20 rounded-md border-2 border-gray-400 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-gray-900"
          style={getModifiedStyle?.(isModified?.(row, 'emissionFactor') ?? false)}
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

const OtherFields = {
  Headers,
  Cells,
};

export default OtherFields;
