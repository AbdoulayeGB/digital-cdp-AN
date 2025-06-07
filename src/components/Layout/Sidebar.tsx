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
  X
} from 'lucide-react';

interface SidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
  isOpen: boolean;
  onToggle: () => void;
}

const menuItems = [
  { id: 'dashboard', label: 'Tableau de bord', icon: Home },
  { id: 'demandes', label: 'Demandes', icon: FileText },
  { id: 'base-donnees', label: 'Base de données', icon: Database },
  { id: 'missions', label: 'Missions contrôle', icon: Shield },
  { id: 'recepissés', label: 'Récépissés', icon: Receipt },
  { id: 'statistiques', label: 'Statistiques', icon: BarChart3 },
  { id: 'parametres', label: 'Paramètres', icon: Settings }
];

export default function Sidebar({ activeSection, onSectionChange, isOpen, onToggle }: SidebarProps) {
  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
          onClick={onToggle}
        />
      )}
      
      {/* Sidebar */}
      <div className={`
        fixed top-0 left-0 h-full bg-gradient-to-b from-emerald-800 to-emerald-900 shadow-2xl z-30 transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0 lg:static lg:z-auto
        w-64
      `}>
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-emerald-700">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-lg">
                <Shield className="w-7 h-7 text-emerald-800" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">CDP</h1>
                <p className="text-xs text-emerald-200">Sénégal</p>
              </div>
            </div>
            <button
              onClick={onToggle}
              className="lg:hidden p-2 text-emerald-200 hover:text-white hover:bg-emerald-700 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4">
            <ul className="space-y-2">
              {menuItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeSection === item.id;
                
                return (
                  <li key={item.id}>
                    <button
                      onClick={() => {
                        onSectionChange(item.id);
                        if (window.innerWidth < 1024) {
                          onToggle();
                        }
                      }}
                      className={`
                        w-full flex items-center space-x-3 px-4 py-3 text-left rounded-xl transition-all duration-200
                        ${isActive 
                          ? 'bg-white text-emerald-800 shadow-lg transform scale-105' 
                          : 'text-emerald-100 hover:bg-emerald-700 hover:text-white hover:transform hover:scale-105'
                        }
                      `}
                    >
                      <Icon className="w-5 h-5" />
                      <span className="font-medium">{item.label}</span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Footer */}
          <div className="p-4 border-t border-emerald-700">
            <div className="bg-emerald-700 rounded-xl p-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                  <span className="text-emerald-800 text-sm font-bold">AD</span>
                </div>
                <div>
                  <p className="text-sm font-medium text-white">Admin CDP</p>
                  <p className="text-xs text-emerald-200">Administrateur</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}