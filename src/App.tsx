import React, { useState, useEffect, useCallback } from 'react';
import Sidebar from './components/Layout/Sidebar';
import Header from './components/Layout/Header';
import Dashboard from './components/Dashboard/Dashboard';
import DemandesSection from './components/Demandes/DemandesSection';
import BaseDonneesSection from './components/BaseDonnees/BaseDonneesSection';
import MissionsSection from './components/Missions/MissionsSection';
import ReceptissesSection from './components/Recepissés/ReceptissesSection';
import ParametresSection from './components/Parametres/ParametresSection';
import Login from './components/Auth/Login';
import NewDemandeModal from './components/Demandes/NewDemandeModal';
import { User, initializeAdminUser } from './data/auth';
import { Demande } from './types';
import { 
  Home, 
  FileText, 
  Database, 
  Shield, 
  Receipt, 
  BarChart3, 
  Settings 
} from 'lucide-react';

interface MenuItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  path: string;
}

const sectionTitles = {
  dashboard: 'Tableau de bord',
  demandes: 'Gestion des Demandes',
  'base-donnees': 'Base de Données',
  missions: 'Missions de Contrôle',
  recepissés: 'Gestion des Récépissés',
  statistiques: 'Statistiques',
  parametres: 'Paramètres'
};

export default function App() {
  const [activeSection, setActiveSection] = useState(() => {
    const savedSection = localStorage.getItem('activeSection');
    return savedSection || 'dashboard';
  });
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [user, setUser] = useState<User | null>(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });
  const [demandes, setDemandes] = useState<Demande[]>([]);

  const [showNewDemandeModal, setShowNewDemandeModal] = useState(false);
  const [selectedFormType, setSelectedFormType] = useState<string | null>(null);

  const handleSelectFormType = useCallback((typeId: string) => {
    setSelectedFormType(typeId);
    setShowNewDemandeModal(true);
  }, []);

  const handleCloseForm = useCallback(() => {
    setSelectedFormType(null);
    setShowNewDemandeModal(false);
  }, []);

  const handleAddDemande = useCallback((newDemande: Demande) => {
    setDemandes(prevDemandes => [...prevDemandes, newDemande]);
    setShowNewDemandeModal(false); // Fermer le modal après soumission
    setSelectedFormType(null);
    setActiveSection('demandes'); // Revenir à la section des demandes
  }, []);

  const menuItems: MenuItem[] = [
    { id: 'dashboard', label: 'Tableau de bord', icon: <Home className="w-5 h-5" />, path: '/dashboard' },
    { id: 'demandes', label: 'Demandes', icon: <FileText className="w-5 h-5" />, path: '/demandes' },
    { id: 'base-donnees', label: 'Base de données', icon: <Database className="w-5 h-5" />, path: '/base-donnees' },
    { id: 'missions', label: 'Missions contrôle', icon: <Shield className="w-5 h-5" />, path: '/missions' },
    { id: 'recepissés', label: 'Récépissés', icon: <Receipt className="w-5 h-5" />, path: '/recepissés' },
    { id: 'statistiques', label: 'Statistiques', icon: <BarChart3 className="w-5 h-5" />, path: '/statistiques' },
    { id: 'parametres', label: 'Paramètres', icon: <Settings className="w-5 h-5" />, path: '/parametres' }
  ];

  const handleSectionChange = useCallback((section: string) => {
    setActiveSection(section);
    localStorage.setItem('activeSection', section);
  }, []);

  const handleLogin = useCallback((loggedInUser: User) => {
    setUser(loggedInUser);
    localStorage.setItem('user', JSON.stringify(loggedInUser));
  }, []);

  const handleLogout = useCallback(() => {
    setUser(null);
    localStorage.removeItem('user');
  }, []);

  useEffect(() => {
    const handleBeforeUnload = () => {
      localStorage.setItem('activeSection', activeSection);
      if (user) {
        localStorage.setItem('user', JSON.stringify(user));
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [activeSection, user]);

  useEffect(() => {
    initializeAdminUser();
  }, []);

  const renderSection = useCallback(() => {
    switch (activeSection) {
      case 'dashboard':
        return <Dashboard />;
      case 'demandes':
        return <DemandesSection onNewDemandeClick={() => { setShowNewDemandeModal(true); setSelectedFormType(null); }} demandes={demandes} />;
      case 'base-donnees':
        return <BaseDonneesSection />;
      case 'missions':
        return <MissionsSection />;
      case 'recepissés':
        return <ReceptissesSection />;
      case 'statistiques':
        return (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-3">Statistiques Avancées</h2>
            <p className="text-gray-600">Module de statistiques détaillées en cours de développement</p>
          </div>
        );
      case 'parametres':
        return <ParametresSection demandes={demandes} />;
      default:
        return <Dashboard />;
    }
  }, [activeSection, demandes]);

  if (!user) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex h-screen overflow-hidden">
        <Sidebar
          currentSection={activeSection}
          onSectionChange={handleSectionChange}
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
          menuItems={menuItems}
          onLogout={handleLogout}
        />
        <div className="flex-1 flex flex-col overflow-hidden">
          <Header
            title={sectionTitles[activeSection as keyof typeof sectionTitles]}
            onMenuClick={() => setSidebarOpen(true)}
            user={user}
          />
          <main className="flex-1 overflow-y-auto bg-gray-50">
            <div className="h-full px-4 sm:px-6 lg:px-8 py-8">
              <div className="h-full bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                {renderSection()}
              </div>
            </div>
          </main>
        </div>
      </div>
      <NewDemandeModal 
        isOpen={showNewDemandeModal}
        onClose={() => { setShowNewDemandeModal(false); setSelectedFormType(null); }}
        onSelectType={handleSelectFormType}
        selectedFormType={selectedFormType}
        onCloseForm={handleCloseForm}
        onDemandeSubmitted={handleAddDemande}
      />
    </div>
  );
}