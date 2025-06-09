import React from 'react';
import { 
  Home, 
  FileText, 
  Database, 
  Shield, 
  Receipt, 
  BarChart3, 
  Settings, 
  Menu,
  X,
  ChevronRight,
  LogOut
} from 'lucide-react';

interface MenuItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  path: string;
}

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  currentSection: string;
  onSectionChange: (section: string) => void;
  menuItems: MenuItem[];
  onLogout: () => void;
}

export default function Sidebar({ isOpen, onClose, currentSection, onSectionChange, menuItems, onLogout }: SidebarProps) {
  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-screen w-64 bg-white shadow-lg z-30 transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0 lg:static lg:w-64`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold bg-gradient-to-r from-[#FFA500] to-[#FF8C00] text-transparent bg-clip-text">PLATEFORME DIGITALE DE LA CDP</h2>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors lg:hidden"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-2">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  onSectionChange(item.id);
                  onClose();
                }}
                className={`w-full flex items-center px-4 py-3 text-sm font-medium rounded-xl transition-colors ${
                  currentSection === item.id
                    ? 'bg-[#FFA500] bg-opacity-10 text-[#FFA500]'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                {item.icon}
                <span className="ml-3">{item.label}</span>
              </button>
            ))}
          </nav>

          {/* Footer */}
          <div className="p-4 border-t border-gray-200">
            <button
              onClick={onLogout}
              className="w-full flex items-center px-4 py-3 text-sm font-medium text-red-600 hover:bg-red-50 rounded-xl transition-colors"
            >
              <LogOut className="w-5 h-5" />
              <span className="ml-3">Se déconnecter</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}