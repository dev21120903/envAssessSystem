"use client";

import { FC } from 'react';
import { ArrowPathIcon } from '@heroicons/react/24/outline';

interface ResetButtonProps {
  onClick: () => void;
}

const ResetButton: FC<ResetButtonProps> = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="flex items-center space-x-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors"
    >
      <ArrowPathIcon className="w-4 h-4" />
      <span className="text-sm font-medium">Reset All</span>
    </button>
  );
};

export default ResetButton;