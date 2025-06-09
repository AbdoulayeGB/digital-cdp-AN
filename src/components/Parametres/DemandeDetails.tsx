import React from 'react';
import { Demande } from '../../types';
import { X, Calendar, User, Info, Building2, FileText, CheckCircle, XCircle } from 'lucide-react';

interface DemandeDetailsProps {
  demande: Demande;
  onClose: () => void;
}

export default function DemandeDetails({ demande, onClose }: DemandeDetailsProps) {
  const renderDetailField = (label: string, value: string | undefined | null) => {
    if (!value) return null;
    return (
      <div className="bg-gray-50 p-3 rounded-lg flex items-center">
        <p className="font-medium text-gray-700 w-1/3">{label}:</p>
        <p className="text-gray-900 flex-1">{value}</p>
      </div>
    );
  };

  const renderStatus = (statut: Demande['statut']) => {
    let colorClass = '';
    let statusText = '';
    switch (statut) {
      case 'approuvée':
        colorClass = 'bg-green-100 text-green-800';
        statusText = 'Approuvée';
        break;
      case 'en_cours':
        colorClass = 'bg-blue-100 text-blue-800';
        statusText = 'En cours';
        break;
      case 'en_attente':
        colorClass = 'bg-yellow-100 text-yellow-800';
        statusText = 'En attente';
        break;
      case 'rejetée':
        colorClass = 'bg-red-100 text-red-800';
        statusText = 'Rejetée';
        break;
      default:
        colorClass = 'bg-gray-100 text-gray-800';
        statusText = 'Inconnu';
    }
    return (
      <span className={`px-3 py-1 inline-flex text-sm leading-5 font-semibold rounded-full ${colorClass}`}>
        {statusText}
      </span>
    );
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-4xl max-h-[95vh] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900">Détails de la demande: {demande.numeroReference}</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {renderDetailField('Type de demande', demande.type)}
            {renderDetailField('Entreprise', demande.entreprise.nom)}
            {renderDetailField('Date de dépôt', demande.dateDepot)}
            <div className="bg-gray-50 p-3 rounded-lg flex items-center">
              <p className="font-medium text-gray-700 w-1/3">Statut:</p>
              <div className="flex-1">
                {renderStatus(demande.statut)}
              </div>
            </div>
          </div>

          <h3 className="text-xl font-semibold text-gray-900 mt-8">Contenu du formulaire:</h3>
          <div className="space-y-4">
            {Object.entries(demande.details).map(([key, value]) => {
              // Exclure les champs déjà affichés ou les objets complexes
              if (['nomRaisonSociale', 'statut'].includes(key) || typeof value === 'object') {
                return null;
              }
              return renderDetailField(key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase()), String(value));
            })}
          </div>

          {/* Section pour les actions si nécessaire (répondre, changer statut) */}
          <div className="mt-8 flex justify-end space-x-4">
            <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium">
              <CheckCircle className="w-5 h-5 mr-2 inline-block" /> Approuver
            </button>
            <button className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium">
              <XCircle className="w-5 h-5 mr-2 inline-block" /> Rejeter
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 