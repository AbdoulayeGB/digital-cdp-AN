import React, { useState } from 'react';
import { Demande } from '../../types';
import { Eye, CheckCircle, XCircle, Search, Clock } from 'lucide-react';
import DemandeDetails from './DemandeDetails';

interface DemandesAdminSectionProps {
  demandes: Demande[];
}

export default function DemandesAdminSection({ demandes }: DemandesAdminSectionProps) {
  const [selectedDemande, setSelectedDemande] = useState<Demande | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredDemandes = demandes.filter(demande => 
    demande.numeroReference.toLowerCase().includes(searchTerm.toLowerCase()) ||
    demande.entreprise.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
    demande.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusClass = (statut: Demande['statut']) => {
    switch (statut) {
      case 'approuvée':
        return 'bg-green-100 text-green-800';
      case 'en_cours':
        return 'bg-blue-100 text-blue-800';
      case 'en_attente':
        return 'bg-yellow-100 text-yellow-800';
      case 'rejetée':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (selectedDemande) {
    return <DemandeDetails demande={selectedDemande} onClose={() => setSelectedDemande(null)} />;
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Gestion des Demandes (Admin)</h2>
          <p className="text-gray-600">Consultez et gérez toutes les demandes soumises.</p>
        </div>
        <div className="relative flex-1 max-w-md sm:max-w-xs">
          <input
            type="text"
            placeholder="Rechercher une demande..."
            className="w-full pl-10 pr-4 py-2 text-sm text-gray-900 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FFA500] focus:border-transparent"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
        {filteredDemandes.length === 0 ? (
          <p className="text-gray-500 text-center py-8">Aucune demande trouvée.</p>
        ) : (
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
                {filteredDemandes.map((demande) => (
                  <tr key={demande.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{demande.numeroReference}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{demande.type}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{demande.entreprise.nom}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{demande.dateDepot}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusClass(demande.statut)}`}>
                        {demande.statut.replace('_', ' ')}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button 
                        onClick={() => setSelectedDemande(demande)}
                        className="text-[#FFA500] hover:text-[#FF8C00] ml-4">
                        <Eye className="w-5 h-5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
} 