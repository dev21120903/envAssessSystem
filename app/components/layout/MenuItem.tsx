"use client";

import { FC } from 'react';
import Link from 'next/link';
import clsx from 'clsx';
import { HeroIcon } from '@/types/hero-icons';

interface MenuItemProps {
  icon: HeroIcon;
  label: string;
  href: string;
  isActive: boolean;
  onClick?: () => void;
}

const MenuItem: FC<MenuItemProps> = ({ icon: Icon, label, href, isActive, onClick }) => {
  if (!Icon) return null;
  
  return (
    <Link
      href={href}
      onClick={onClick}
      className={clsx(
        'flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors',
        isActive
          ? 'bg-blue-500 text-white'
          : 'text-gray-600 hover:bg-white/50'
      )}
    >
      <Icon className="w-6 h-6" />
      <span>{label}</span>
    </Link>
  );
};

export default MenuItem;