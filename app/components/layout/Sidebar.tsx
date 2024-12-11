"use client";

import { FC, useState } from 'react';
import { usePathname } from 'next/navigation';
import { 
  PresentationChartBarIcon,
  CircleStackIcon,
  BeakerIcon,
  FolderOpenIcon,
  DocumentChartBarIcon,
  Cog8ToothIcon,
  ArrowLeftOnRectangleIcon,
  Squares2X2Icon,
  CalculatorIcon,
  Bars3Icon,
  XMarkIcon
} from '@heroicons/react/24/outline';
import MenuItem from './MenuItem';
import { HeroIcon } from '@/types/hero-icons';
import clsx from 'clsx';

interface MenuItem {
  icon: HeroIcon;
  label: string;
  href: string;
}

const menuItems: MenuItem[] = [
  { icon: Squares2X2Icon, label: 'Dashboard', href: '/' },
  { icon: CircleStackIcon, label: 'Database', href: '/database' },
  { icon: CalculatorIcon, label: 'Simulation', href: '/simulation' },
  { icon: FolderOpenIcon, label: 'Other Case', href: '/other-case' },
  { icon: DocumentChartBarIcon, label: 'Report', href: '/report' },
];

const bottomMenuItems: MenuItem[] = [
  { icon: Cog8ToothIcon, label: 'Settings', href: '/settings' },
  { icon: ArrowLeftOnRectangleIcon, label: 'Logout', href: '/logout' },
];

const Sidebar: FC = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Hamburger menu button for mobile */}
      <button
        className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-md bg-blue-500 text-white hover:bg-blue-600"
        onClick={toggleMenu}
      >
        {isOpen ? (
          <XMarkIcon className="w-6 h-6" />
        ) : (
          <Bars3Icon className="w-6 h-6" />
        )}
      </button>

      {/* Overlay for mobile menu */}
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={toggleMenu}
        />
      )}

      {/* Sidebar */}
      <div
        className={clsx(
          'fixed lg:static inset-y-0 left-0 z-40 w-64 transform transition-transform duration-300 ease-in-out',
          'lg:translate-x-0',
          isOpen ? 'translate-x-0' : '-translate-x-full',
          'flex flex-col bg-gradient-to-r from-white to-[#DEF3F6]'
        )}
      >
        <div className="flex-1 py-6 space-y-2 px-3">
          {menuItems.map((item) => (
            <MenuItem
              key={item.label}
              {...item}
              isActive={pathname === item.href}
              onClick={() => setIsOpen(false)}
            />
          ))}
        </div>
        <div className="py-6 space-y-2 px-3 border-t">
          {bottomMenuItems.map((item) => (
            <MenuItem
              key={item.label}
              {...item}
              isActive={pathname === item.href}
              onClick={() => setIsOpen(false)}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default Sidebar;