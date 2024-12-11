"use client";

import { FC, useState } from 'react';
import FilterPopover from './FilterPopover';

interface CategoryFilterProps {
  categories: string[];
  selectedCategories: string[];
  onCategoryChange: (categories: string[]) => void;
}

const CategoryFilter: FC<CategoryFilterProps> = ({ categories, selectedCategories, onCategoryChange }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredCategories = categories.filter(category =>
    category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCategoryToggle = (category: string) => {
    const newCategories = selectedCategories.includes(category)
      ? selectedCategories.filter(c => c !== category)
      : [...selectedCategories, category];
    onCategoryChange(newCategories);
  };

  const handleSelectAll = () => {
    onCategoryChange(categories);
  };

  const handleClearAll = () => {
    onCategoryChange([]);
  };

  return (
    <FilterPopover title="Category">
      <div className="space-y-4">
        <input
          type="text"
          placeholder="Search categories..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:ring-blue-500"
        />
        <div className="flex justify-between">
          <button
            onClick={handleSelectAll}
            className="text-sm text-blue-600 hover:text-blue-800"
          >
            Select All
          </button>
          <button
            onClick={handleClearAll}
            className="text-sm text-blue-600 hover:text-blue-800"
          >
            Clear All
          </button>
        </div>
        <div className="max-h-60 overflow-y-auto space-y-2">
          {filteredCategories.map(category => (
            <label key={category} className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={selectedCategories.includes(category)}
                onChange={() => handleCategoryToggle(category)}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-sm text-gray-900">{category}</span>
            </label>
          ))}
        </div>
      </div>
    </FilterPopover>
  );
};

export default CategoryFilter;