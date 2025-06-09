import React from 'react';
import { Demande } from '../../types';
import { 
  Building2, 
  Shield,
  Download,
  Search,
  Plus,
  FileSearch
} from 'lucide-react';

interface Formulaire {
  id: string;
  titre: string;
  description: string;
  icon: React.ReactNode;
}

interface DemandesSectionProps {
  onNewDemandeClick: () => void;
  demandes: Demande[];
}

const formulaires: Formulaire[] = [
  {
    id: 'avis',
    titre: 'Formulaire de demande d\'avis',
    description: 'Formulaire réservé exclusivement à l\'État, aux établissements publics, aux collectivités locales ou aux personnes morales de droit privé gérant un service public.',
    icon: <Building2 className="w-6 h-6" />
  },
  {
    id: 'autorisation',
    titre: 'Formulaire de demande d\'autorisation',
    description: 'Formulaire destiné aux demandes d\'autorisation portant sur les traitements de données sensibles (santé, biométriques, interconnectées, etc.) et les transferts de données vers un pays tiers.',
    icon: <Shield className="w-6 h-6" />
  }
];

export default function DemandesSection({ onNewDemandeClick, demandes }: DemandesSectionProps) {
  const renderContent = () => {
    if (demandes.length === 0) {
      return (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="relative flex-1 max-w-md">
              <input
                type="text"
                placeholder="Rechercher une demande..."
                className="w-full pl-10 pr-4 py-2 text-sm text-gray-900 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FFA500] focus:border-transparent"
              />
              <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
            </div>
          </div>

          <div className="space-y-4">
            <p className="text-gray-500 text-center py-8">
              Aucune demande en cours. Commencez par créer une nouvelle demande.
            </p>
          </div>
        </div>
      );
    } else {
      return (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="relative flex-1 max-w-md">
              <input
                type="text"
                placeholder="Rechercher une demande..."
                className="w-full pl-10 pr-4 py-2 text-sm text-gray-900 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FFA500] focus:border-transparent"
              />
              <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Référence</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Entreprise</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date de dépôt</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Statut</th>
                  <th scope="col" className="relative px-6 py-3"><span className="sr-only">Actions</span></th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {demandes.map((demande) => (
                  <tr key={demande.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{demande.numeroReference}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{demande.type}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{demande.entreprise.nom}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{demande.dateDepot}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        demande.statut === 'approuvée' ? 'bg-green-100 text-green-800' :
                        demande.statut === 'en_cours' ? 'bg-blue-100 text-blue-800' :
                        demande.statut === 'en_attente' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {demande.statut}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <a href="#" className="text-[#FFA500] hover:text-[#FF8C00]">Voir les détails</a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      );
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Gestion des Demandes</h2>
          <p className="text-gray-600">Suivez et gérez toutes vos demandes</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3">
          <button className="inline-flex items-center px-4 py-2 bg-white border border-gray-200 text-gray-700 font-medium rounded-xl hover:bg-gray-50 transition-colors shadow-sm">
            <FileSearch className="w-5 h-5 mr-2" />
            Suivre une demande
          </button>
          <button 
            onClick={onNewDemandeClick}
            className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-[#FFA500] to-[#FF8C00] text-white font-medium rounded-xl hover:from-[#FF8C00] hover:to-[#FF7F00] transition-all transform hover:scale-105 shadow-lg"
          >
            <Plus className="w-5 h-5 mr-2" />
            Nouvelle demande
          </button>
        </div>
      </div>

      {renderContent()}
    </div>
  );
} 