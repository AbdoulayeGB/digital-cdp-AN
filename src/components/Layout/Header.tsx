import React from 'react';
import { Menu, Bell, Search } from 'lucide-react';
import { User } from '../../data/auth';

interface HeaderProps {
  title: string;
  onMenuClick: () => void;
  user: User;
}

export default function Header({ title, onMenuClick, user }: HeaderProps) {
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
      <div className="flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8">
        <div className="flex items-center space-x-4">
          <button
            onClick={onMenuClick}
            className="lg:hidden p-2 text-gray-500 hover:text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
          >
            <Menu className="w-5 h-5" />
          </button>
          <img src="/logo-cdp.png" alt="CDP Logo" className="h-12 w-auto" />
          <h1 className="text-xl font-semibold text-gray-900">{title}</h1>
        </div>
        <div className="flex items-center space-x-4">
          <div className="hidden sm:flex items-center space-x-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Rechercher..."
                className="w-64 pl-10 pr-4 py-2 text-sm text-gray-900 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
            </div>
            <button className="p-2 text-gray-500 hover:text-gray-600 hover:bg-gray-50 rounded-lg transition-colors relative">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-br from-[#FFA500] to-[#FF8C00] rounded-full flex items-center justify-center shadow-sm">
              <span className="text-white font-medium">{user.name.charAt(0)}</span>
            </div>
            <div className="hidden sm:block">
              <p className="text-sm font-medium text-gray-900">{user.name}</p>
              <p className="text-xs text-gray-500">{user.role}</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}