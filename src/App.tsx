import React, { useState } from 'react';
import Sidebar from './components/Layout/Sidebar';
import Header from './components/Layout/Header';
import Dashboard from './components/Dashboard/Dashboard';
import DemandesSection from './components/Demandes/DemandesSection';
import BaseDonneesSection from './components/BaseDonnees/BaseDonneesSection';
import MissionsSection from './components/Missions/MissionsSection';
import ReceptissesSection from './components/Recepissés/ReceptissesSection';

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
  const [activeSection, setActiveSection] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const renderContent = () => {
    switch (activeSection) {
      case 'dashboard':
        return <Dashboard />;
      case 'demandes':
        return <DemandesSection />;
      case 'base-donnees':
        return <BaseDonneesSection />;
      case 'missions':
        return <MissionsSection />;
      case 'recepissés':
        return <ReceptissesSection />;
      case 'statistiques':
        return (
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8 text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Statistiques Avancées</h2>
            <p className="text-gray-600">Module de statistiques détaillées en cours de développement</p>
          </div>
        );
      case 'parametres':
        return (
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8 text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Paramètres Système</h2>
            <p className="text-gray-600">Configuration et paramètres de la plateforme</p>
          </div>
        );
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Sidebar
        activeSection={activeSection}
        onSectionChange={setActiveSection}
        isOpen={sidebarOpen}
        onToggle={() => setSidebarOpen(!sidebarOpen)}
      />
      
      <div className="lg:ml-64">
        <Header
          onMenuToggle={() => setSidebarOpen(!sidebarOpen)}
          title={sectionTitles[activeSection as keyof typeof sectionTitles]}
        />
        
        <main className="p-6">
          {renderContent()}
        </main>
      </div>
    </div>
  );
}