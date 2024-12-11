"use client";

import { FC } from 'react';
import { SCOPE_COLORS } from '@/constants/theme';
import FilterPopover from './FilterPopover';

interface ScopeFilterProps {
  selectedScopes: string[];
  onScopeChange: (scopes: string[]) => void;
}

const scopes = ['Scope 1', 'Scope 2', 'Scope 3'];

const ScopeFilter: FC<ScopeFilterProps> = ({ selectedScopes, onScopeChange }) => {
  const handleScopeToggle = (scope: string) => {
    const newScopes = selectedScopes.includes(scope)
      ? selectedScopes.filter(s => s !== scope)
      : [...selectedScopes, scope];
    onScopeChange(newScopes);
  };

  const getScopeColor = (scope: string) => {
    switch (scope) {
      case 'Scope 1': return SCOPE_COLORS.scope1;
      case 'Scope 2': return SCOPE_COLORS.scope2;
      case 'Scope 3': return SCOPE_COLORS.scope3;
      default: return '';
    }
  };

  return (
    <FilterPopover title="Scope">
      <div className="space-y-2">
        {scopes.map(scope => (
          <label key={scope} className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={selectedScopes.includes(scope)}
              onChange={() => handleScopeToggle(scope)}
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <span
              className="px-2 py-1 rounded-full text-sm font-medium text-white"
              style={{ backgroundColor: getScopeColor(scope) }}
            >
              {scope}
            </span>
          </label>
        ))}
      </div>
    </FilterPopover>
  );
};

export default ScopeFilter;