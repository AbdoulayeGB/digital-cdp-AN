import React, { useState } from 'react';
import DemandesAdminSection from './DemandesAdminSection';
import UserManagementSection from './UserManagementSection';
import { Demande } from '../../types';
import { FileText, Users } from 'lucide-react';

interface ParametresSectionProps {
  demandes: Demande[];
}

export default function ParametresSection({ demandes }: ParametresSectionProps) {
  const [showDemandesAdmin, setShowDemandesAdmin] = useState(false);
  const [showUserManagement, setShowUserManagement] = useState(false);

  const handleToggleSection = (section: 'demandes' | 'users') => {
    if (section === 'demandes') {
      setShowDemandesAdmin(!showDemandesAdmin);
      setShowUserManagement(false);
    } else if (section === 'users') {
      setShowUserManagement(!showUserManagement);
      setShowDemandesAdmin(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Paramètres</h2>
        <p className="text-gray-600">Configuration et paramètres de la plateforme</p>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div 
            onClick={() => handleToggleSection('demandes')}
            className="flex items-start p-6 bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl border border-blue-200 hover:from-blue-100 hover:to-blue-200 transition-all cursor-pointer group shadow-sm"
          >
            <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mr-4 group-hover:scale-105 transition-transform">
              <FileText className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-blue-800 text-lg">Gestion des Demandes</h3>
              <p className="text-sm text-blue-600 mt-1">Consulter et administrer toutes les demandes soumises.</p>
            </div>
            <div className="ml-4 self-center">
              {showDemandesAdmin ? (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-gray-500">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 15.75 7.5-7.5 7.5 7.5" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-gray-500">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                </svg>
              )}
            </div>
          </div>

          <div 
            onClick={() => handleToggleSection('users')}
            className="flex items-start p-6 bg-gradient-to-r from-purple-50 to-purple-100 rounded-xl border border-purple-200 hover:from-purple-100 hover:to-purple-200 transition-all cursor-pointer group shadow-sm"
          >
            <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center mr-4 group-hover:scale-105 transition-transform">
              <Users className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-purple-800 text-lg">Gestion des Utilisateurs</h3>
              <p className="text-sm text-purple-600 mt-1">Ajouter, modifier ou supprimer des comptes utilisateurs.</p>
            </div>
            <div className="ml-4 self-center">
              {showUserManagement ? (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-gray-500">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 15.75 7.5-7.5 7.5 7.5" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-gray-500">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                </svg>
              )}
            </div>
          </div>
        </div>
      </div>

      {showDemandesAdmin && (
        <DemandesAdminSection demandes={demandes} />
      )}

      {showUserManagement && (
        <UserManagementSection />
      )}
    </div>
  );
} 