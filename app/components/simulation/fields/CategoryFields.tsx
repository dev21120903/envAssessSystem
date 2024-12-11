import { FC } from 'react';
import { SimulationCategory } from '@/types/simulation';
import MachineFields from './MachineFields';
import MaterialFields from './MaterialFields';
import FacilityFields from './FacilityFields';
import PersonnelFields from './PersonnelFields';
import OtherFields from './OtherFields';

interface CategoryFieldsProps {
  category: SimulationCategory;
  row?: any;
  isModified?: (row: any, field: string) => boolean;
  getModifiedStyle?: (isModified: boolean) => any;
  updateModifiedValue?: (id: string, field: string, value: any) => void;
}

const Headers: FC<CategoryFieldsProps> = ({ category }) => {
  switch (category) {
    case 'machine':
      return <MachineFields.Headers />;
    case 'material':
      return <MaterialFields.Headers />;
    case 'facility':
      return <FacilityFields.Headers />;
    case 'personnel':
      return <PersonnelFields.Headers />;
    case 'other':
      return <OtherFields.Headers />;
  }
};

const Cells: FC<CategoryFieldsProps> = ({ 
  category, 
  row, 
  isModified, 
  getModifiedStyle, 
  updateModifiedValue 
}) => {
  switch (category) {
    case 'machine':
      return (
        <MachineFields.Cells
          row={row}
          isModified={isModified}
          getModifiedStyle={getModifiedStyle}
          updateModifiedValue={updateModifiedValue}
        />
      );
    case 'material':
      return (
        <MaterialFields.Cells
          row={row}
          isModified={isModified}
          getModifiedStyle={getModifiedStyle}
          updateModifiedValue={updateModifiedValue}
        />
      );
    case 'facility':
      return (
        <FacilityFields.Cells
          row={row}
          isModified={isModified}
          getModifiedStyle={getModifiedStyle}
          updateModifiedValue={updateModifiedValue}
        />
      );
    case 'personnel':
      return (
        <PersonnelFields.Cells
          row={row}
          isModified={isModified}
          getModifiedStyle={getModifiedStyle}
          updateModifiedValue={updateModifiedValue}
        />
      );
    case 'other':
      return (
        <OtherFields.Cells
          row={row}
          isModified={isModified}
          getModifiedStyle={getModifiedStyle}
          updateModifiedValue={updateModifiedValue}
        />
      );
  }
};

const CategoryFields = {
  Headers,
  Cells,
};

export default CategoryFields;