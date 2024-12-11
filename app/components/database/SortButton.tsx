"use client";

import { FC } from 'react';
import { ChevronUpIcon, ChevronDownIcon } from '@heroicons/react/24/solid';
import clsx from 'clsx';

interface SortButtonProps {
  onClick: () => void;
  active: boolean;
  direction: 'asc' | 'desc';
}

const SortButton: FC<SortButtonProps> = ({ onClick, active, direction }) => {
  return (
    <button
      onClick={onClick}
      className={clsx(
        'p-1 rounded hover:bg-gray-200',
        active ? 'text-blue-600' : 'text-gray-400'
      )}
    >
      {direction === 'asc' ? (
        <ChevronUpIcon className="w-4 h-4" />
      ) : (
        <ChevronDownIcon className="w-4 h-4" />
      )}
    </button>
  );
};

export default SortButton;