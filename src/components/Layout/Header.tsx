import React from 'react';
import { Menu, Bell, Search } from 'lucide-react';

interface HeaderProps {
  onMenuToggle: () => void;
  title: string;
}

export default function Header({ onMenuToggle, title }: HeaderProps) {
  return (
    <header className="bg-white shadow-lg border-b border-gray-200">
      <div className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center space-x-4">
          <button
            onClick={onMenuToggle}
            className="lg:hidden p-2 text-gray-500 hover:text-emerald-700 hover:bg-emerald-50 rounded-lg transition-colors"
          >
            <Menu className="w-6 h-6" />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
            <div className="flex items-center space-x-2 mt-1">
              <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
              <span className="text-sm text-gray-500">Commission de Protection des Données Personnelles</span>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          {/* Search bar */}
          <div className="relative hidden md:block">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Rechercher..."
              className="block w-80 pl-10 pr-3 py-2 border border-gray-300 rounded-xl leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all"
            />
          </div>

          {/* Notifications */}
          <button className="relative p-2 text-gray-500 hover:text-emerald-700 hover:bg-emerald-50 rounded-xl transition-colors">
            <Bell className="w-6 h-6" />
            <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-400 ring-2 ring-white"></span>
          </button>
        </div>
      </div>
    </header>
  );
}