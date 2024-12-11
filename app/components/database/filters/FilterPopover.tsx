"use client";

import { FC, Fragment } from 'react';
import { Popover, Transition } from '@headlessui/react';
import { FunnelIcon } from '@heroicons/react/24/outline';

interface FilterPopoverProps {
  title: string;
  children: React.ReactNode;
}

const FilterPopover: FC<FilterPopoverProps> = ({ title, children }) => {
  return (
    <Popover className="relative">
      <Popover.Button className="flex items-center space-x-1 text-xs font-medium text-gray-500 uppercase tracking-wider hover:text-gray-700">
        <span>{title}</span>
        <FunnelIcon className="w-4 h-4" />
      </Popover.Button>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-200"
        enterFrom="opacity-0 translate-y-1"
        enterTo="opacity-100 translate-y-0"
        leave="transition ease-in duration-150"
        leaveFrom="opacity-100 translate-y-0"
        leaveTo="opacity-0 translate-y-1"
      >
        <Popover.Panel className="fixed z-50 mt-2 w-72 bg-white rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
          <div className="p-4">
            {children}
          </div>
        </Popover.Panel>
      </Transition>
    </Popover>
  );
};

export default FilterPopover;