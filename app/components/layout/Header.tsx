"use client";

import { FC } from 'react';
import { usePathname } from 'next/navigation';
import { 
  QuestionMarkCircleIcon,
  BellIcon,
  LanguageIcon,
  UserCircleIcon,
  ChevronDownIcon
} from '@heroicons/react/24/outline';

interface HeaderProps {
  userName: string;
}

function getPageTitle(pathname: string) {
  switch (pathname) {
    case '/':
      return 'Dashboard';
    case '/database':
      return 'Database';
    case '/simulation':
      return 'Simulation';
    case '/other-case':
      return 'Other Case';
    case '/report':
      return 'Report';
    case '/settings':
      return 'Settings';
    default:
      return 'Dashboard';
  }
}

const Header: FC<HeaderProps> = ({ userName }) => {
  const pathname = usePathname();
  const title = getPageTitle(pathname);

  return (
    <div className="h-20 bg-white border-b px-8 flex items-center justify-between">
      <div className="lg:ml-0 ml-16">
        <h1 className="text-2xl font-semibold text-gray-900">{title}</h1>
        <p className="text-sm text-gray-500">Carbon Neutrality Goal is 2050.</p>
      </div>
      
      <div className="flex items-center space-x-6">
        <button className="text-gray-500 hover:text-gray-700">
          <QuestionMarkCircleIcon className="w-6 h-6" />
        </button>
        <button className="text-gray-500 hover:text-gray-700">
          <BellIcon className="w-6 h-6" />
        </button>
        <button className="text-gray-500 hover:text-gray-700">
          <LanguageIcon className="w-6 h-6" />
        </button>
        <div className="flex items-center space-x-2">
          <UserCircleIcon className="w-8 h-8 text-gray-400" />
          <span className="text-sm font-medium text-gray-700">{userName}</span>
          <ChevronDownIcon className="w-4 h-4 text-gray-400" />
        </div>
      </div>
    </div>
  );
};

export default Header;