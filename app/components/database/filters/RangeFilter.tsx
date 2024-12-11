"use client";

import { FC } from 'react';
import FilterPopover from './FilterPopover';

interface RangeFilterProps {
  title: string;
  range: { min: string; max: string };
  onChange: (range: { min: string; max: string }) => void;
}

const RangeFilter: FC<RangeFilterProps> = ({ title, range, onChange }) => {
  return (
    <FilterPopover title={title}>
      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <input
            type="number"
            placeholder="Min"
            value={range.min}
            onChange={(e) => onChange({ ...range, min: e.target.value })}
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-gray-900 placeholder-gray-500"
          />
          <span className="text-gray-500">-</span>
          <input
            type="number"
            placeholder="Max"
            value={range.max}
            onChange={(e) => onChange({ ...range, max: e.target.value })}
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-gray-900 placeholder-gray-500"
          />
        </div>
      </div>
    </FilterPopover>
  );
};

export default RangeFilter;