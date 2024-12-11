"use client";

import { FC, useState, useMemo } from 'react';
import { SCOPE_COLORS } from '@/constants/theme';
import { DatabaseEntry, SortConfig, FilterConfig } from '@/types/database';
import { databaseData } from '@/constants/database-data';
import SortButton from './SortButton';
import ScopeFilter from './filters/ScopeFilter';
import CategoryFilter from './filters/CategoryFilter';
import RangeFilter from './filters/RangeFilter';
import ResetButton from './ResetButton';
import clsx from 'clsx';

const DatabaseTable: FC = () => {
  // ... existing state and functions remain the same ...
  const allCategories = useMemo(() => 
    Array.from(new Set(databaseData.map(entry => entry.category))),
    []
  );

  const initialFilterConfig: FilterConfig = {
    scopes: ['Scope 1', 'Scope 2', 'Scope 3'],
    categories: allCategories,
    totalEmissions: { min: '', max: '' },
    percentageOfTotal: { min: '', max: '' },
    yearlyChange: { min: '', max: '' },
    reductionTarget: { min: '', max: '' },
    achievedReduction: { min: '', max: '' },
  };

  const [sortConfig, setSortConfig] = useState<SortConfig>({ key: null, direction: 'asc' });
  const [filterConfig, setFilterConfig] = useState<FilterConfig>(initialFilterConfig);

  const handleReset = () => {
    setSortConfig({ key: null, direction: 'asc' });
    setFilterConfig(initialFilterConfig);
  };

  const getScopeColor = (scope: string) => {
    switch (scope) {
      case 'Scope 1': return SCOPE_COLORS.scope1;
      case 'Scope 2': return SCOPE_COLORS.scope2;
      case 'Scope 3': return SCOPE_COLORS.scope3;
      default: return '';
    }
  };

  const filteredData = useMemo(() => {
    return databaseData.filter(entry => {
      if (!filterConfig.scopes.includes(entry.scope)) return false;
      if (!filterConfig.categories.includes(entry.category)) return false;

      const checkRange = (value: number | string, range: { min: string; max: string }) => {
        if (value === '-') return true;
        const numValue = Number(value);
        if (range.min && numValue < Number(range.min)) return false;
        if (range.max && numValue > Number(range.max)) return false;
        return true;
      };

      return (
        checkRange(entry.totalEmissions, filterConfig.totalEmissions) &&
        checkRange(entry.percentageOfTotal, filterConfig.percentageOfTotal) &&
        checkRange(entry.yearlyChange, filterConfig.yearlyChange) &&
        checkRange(entry.reductionTarget, filterConfig.reductionTarget) &&
        checkRange(entry.achievedReduction, filterConfig.achievedReduction)
      );
    });
  }, [filterConfig]);

  const sortedData = useMemo(() => {
    if (!sortConfig.key) return filteredData;

    return [...filteredData].sort((a, b) => {
      const aValue = a[sortConfig.key as keyof DatabaseEntry];
      const bValue = b[sortConfig.key as keyof DatabaseEntry];

      if (aValue === '-' || bValue === '-') {
        return sortConfig.direction === 'asc' ? 1 : -1;
      }

      if (typeof aValue === 'number' && typeof bValue === 'number') {
        return sortConfig.direction === 'asc' ? aValue - bValue : bValue - aValue;
      }

      return sortConfig.direction === 'asc'
        ? String(aValue).localeCompare(String(bValue))
        : String(bValue).localeCompare(String(aValue));
    });
  }, [sortConfig, filteredData]);

  const handleSort = (key: keyof DatabaseEntry) => {
    setSortConfig(prevConfig => ({
      key,
      direction: prevConfig.key === key && prevConfig.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  return (
    <div className="space-y-4 h-[calc(100vh-8rem)]">
      <div className="flex justify-end">
        <ResetButton onClick={handleReset} />
      </div>
      <div className="bg-white rounded-lg shadow h-[calc(100%-3rem)] flex flex-col">
        <div className="overflow-x-auto">
          <div className="inline-block min-w-full align-middle">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="sticky top-0 bg-gray-50 px-6 py-3 text-left z-10">
                    <div className="flex items-center space-x-1">
                      <ScopeFilter
                        selectedScopes={filterConfig.scopes}
                        onScopeChange={(scopes) => setFilterConfig(prev => ({ ...prev, scopes }))}
                      />
                      <SortButton
                        onClick={() => handleSort('scope')}
                        active={sortConfig.key === 'scope'}
                        direction={sortConfig.direction}
                      />
                    </div>
                  </th>
                  <th className="sticky top-0 bg-gray-50 px-6 py-3 text-left z-10">
                    <div className="flex items-center space-x-1">
                      <CategoryFilter
                        categories={allCategories}
                        selectedCategories={filterConfig.categories}
                        onCategoryChange={(categories) => setFilterConfig(prev => ({ ...prev, categories }))}
                      />
                      <SortButton
                        onClick={() => handleSort('category')}
                        active={sortConfig.key === 'category'}
                        direction={sortConfig.direction}
                      />
                    </div>
                  </th>
                  {/* Repeat for other headers with sticky class */}
                  <th className="sticky top-0 bg-gray-50 px-6 py-3 text-left z-10">
                    <div className="flex items-center space-x-1">
                      <RangeFilter
                        title="Total Emissions (t-CO2)"
                        range={filterConfig.totalEmissions}
                        onChange={(range) => setFilterConfig(prev => ({ ...prev, totalEmissions: range }))}
                      />
                      <SortButton
                        onClick={() => handleSort('totalEmissions')}
                        active={sortConfig.key === 'totalEmissions'}
                        direction={sortConfig.direction}
                      />
                    </div>
                  </th>
                  <th className="sticky top-0 bg-gray-50 px-6 py-3 text-left z-10">
                    <div className="flex items-center space-x-1">
                      <RangeFilter
                        title="Percentage of Total (%)"
                        range={filterConfig.percentageOfTotal}
                        onChange={(range) => setFilterConfig(prev => ({ ...prev, percentageOfTotal: range }))}
                      />
                      <SortButton
                        onClick={() => handleSort('percentageOfTotal')}
                        active={sortConfig.key === 'percentageOfTotal'}
                        direction={sortConfig.direction}
                      />
                    </div>
                  </th>
                  <th className="sticky top-0 bg-gray-50 px-6 py-3 text-left z-10">
                    <div className="flex items-center space-x-1">
                      <RangeFilter
                        title="Yearly Change (%)"
                        range={filterConfig.yearlyChange}
                        onChange={(range) => setFilterConfig(prev => ({ ...prev, yearlyChange: range }))}
                      />
                      <SortButton
                        onClick={() => handleSort('yearlyChange')}
                        active={sortConfig.key === 'yearlyChange'}
                        direction={sortConfig.direction}
                      />
                    </div>
                  </th>
                  <th className="sticky top-0 bg-gray-50 px-6 py-3 text-left z-10">
                    <div className="flex items-center space-x-1">
                      <RangeFilter
                        title="Reduction Target (t-CO2)"
                        range={filterConfig.reductionTarget}
                        onChange={(range) => setFilterConfig(prev => ({ ...prev, reductionTarget: range }))}
                      />
                      <SortButton
                        onClick={() => handleSort('reductionTarget')}
                        active={sortConfig.key === 'reductionTarget'}
                        direction={sortConfig.direction}
                      />
                    </div>
                  </th>
                  <th className="sticky top-0 bg-gray-50 px-6 py-3 text-left z-10">
                    <div className="flex items-center space-x-1">
                      <RangeFilter
                        title="Achieved Reduction (t-CO2)"
                        range={filterConfig.achievedReduction}
                        onChange={(range) => setFilterConfig(prev => ({ ...prev, achievedReduction: range }))}
                      />
                      <SortButton
                        onClick={() => handleSort('achievedReduction')}
                        active={sortConfig.key === 'achievedReduction'}
                        direction={sortConfig.direction}
                      />
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200 overflow-y-auto">
                {sortedData.map((entry, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className="px-3 py-1 rounded-full text-sm font-medium"
                        style={{
                          backgroundColor: getScopeColor(entry.scope),
                          color: 'white'
                        }}
                      >
                        {entry.scope}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {entry.category}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {entry.totalEmissions}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {entry.percentageOfTotal}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <span className={clsx(
                        typeof entry.yearlyChange === 'number' && entry.yearlyChange > 0
                          ? 'text-red-500'
                          : typeof entry.yearlyChange === 'number' && entry.yearlyChange <= 0
                          ? 'text-green-500'
                          : 'text-gray-900'
                      )}>
                        {entry.yearlyChange === '-' ? '-' : `${entry.yearlyChange}%`}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {entry.reductionTarget}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {entry.achievedReduction}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DatabaseTable;