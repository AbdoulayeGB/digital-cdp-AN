import React from 'react';
import { X, FileText, Shield, ClipboardList, Video, Globe, Microscope, FileCheck } from 'lucide-react';
import FormulaireAvis from './Formulaires/FormulaireAvis';
import FormulaireAutorisation from './Formulaires/FormulaireAutorisation';
import { Demande } from '../../types';

interface NewDemandeModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedFormType: string | null;
  onSelectType: (typeId: string) => void;
  onCloseForm: () => void;
  onDemandeSubmitted: (newDemande: Demande) => void;
}

const typesDemandes = [
  {
    id: 'avis',
    titre: 'Formulaire de demande d\'avis',
    description: 'Demande d\'avis sur un projet de traitement de données personnelles',
    icon: FileText,
    couleur: 'blue'
  },
  {
    id: 'autorisation',
    titre: 'Formulaire de demande d\'autorisation',
    description: 'Demande d\'autorisation pour un traitement de données personnelles',
    icon: Shield,
    couleur: 'purple'
  },
  {
    id: 'declaration-normale',
    titre: 'Formulaire de déclaration normale',
    description: 'Déclaration standard de traitement de données personnelles',
    icon: ClipboardList,
    couleur: 'green'
  },
  {
    id: 'video-surveillance',
    titre: 'Formulaire de déclaration de système de vidéosurveillance',
    description: 'Déclaration d\'un système de vidéosurveillance',
    icon: Video,
    couleur: 'orange'
  },
  {
    id: 'collecte-web',
    titre: 'Formulaire de déclaration de collecte de données personnelles sur un site internet',
    description: 'Déclaration de collecte de données via un site web',
    icon: Globe,
    couleur: 'indigo'
  },
  {
    id: 'recherche-medicale',
    titre: 'Formulaire sur la recherche dans le domaine médical',
    description: 'Déclaration de traitement de données pour la recherche médicale',
    icon: Microscope,
    couleur: 'red'
  },
  {
    id: 'declaration-simplifiee',
    titre: 'Formulaire de déclaration simplifiée',
    description: 'Déclaration simplifiée de traitement de données personnelles',
    icon: FileCheck,
    couleur: 'teal'
  }
];

const colorClasses = {
  blue: {
    bg: 'bg-blue-50',
    icon: 'text-blue-600',
    hover: 'hover:bg-blue-100'
  },
  purple: {
    bg: 'bg-purple-50',
    icon: 'text-purple-600',
    hover: 'hover:bg-purple-100'
  },
  green: {
    bg: 'bg-green-50',
    icon: 'text-green-600',
    hover: 'hover:bg-green-100'
  },
  orange: {
    bg: 'bg-orange-50',
    icon: 'text-orange-600',
    hover: 'hover:bg-orange-100'
  },
  indigo: {
    bg: 'bg-indigo-50',
    icon: 'text-indigo-600',
    hover: 'hover:bg-indigo-100'
  },
  red: {
    bg: 'bg-red-50',
    icon: 'text-red-600',
    hover: 'hover:bg-red-100'
  },
  teal: {
    bg: 'bg-teal-50',
    icon: 'text-teal-600',
    hover: 'hover:bg-teal-100'
  }
};

export default function NewDemandeModal({ isOpen, onClose, selectedFormType, onSelectType, onCloseForm, onDemandeSubmitted }: NewDemandeModalProps) {
  if (!isOpen) return null;

  const renderFormContent = () => {
    if (selectedFormType === 'avis') {
      return <FormulaireAvis onClose={onCloseForm} onDemandeSubmitted={onDemandeSubmitted} />;
    } else if (selectedFormType === 'autorisation') {
      return <FormulaireAutorisation onClose={onCloseForm} onDemandeSubmitted={onDemandeSubmitted} />;
    } else if (selectedFormType) {
      return (
        <div className="text-center text-gray-700 h-full">
          <h3 className="text-xl font-semibold mb-3">Formulaire "{selectedFormType}" en cours de développement</h3>
          <p>Revenez plus tard pour ce formulaire.</p>
        </div>
      );
    } else {
      return (
        <div className="max-h-[calc(90vh-8rem)]">
          <p className="text-gray-600 mb-6">
            Sélectionnez le type de demande que vous souhaitez effectuer :
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {typesDemandes.map((type) => (
              <button
                key={type.id}
                onClick={() => onSelectType(type.id)}
                className={`flex items-start p-4 rounded-xl border border-gray-200 transition-all ${colorClasses[type.couleur as keyof typeof colorClasses].hover}`}
              >
                <div className={`p-3 rounded-lg ${colorClasses[type.couleur as keyof typeof colorClasses].bg}`}>
                  <type.icon className={`w-6 h-6 ${colorClasses[type.couleur as keyof typeof colorClasses].icon}`} />
                </div>
                <div className="ml-4 text-left">
                  <h3 className="font-semibold text-gray-900">{type.titre}</h3>
                  <p className="text-sm text-gray-600 mt-1">{type.description}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      );
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-4xl max-h-[95vh] flex flex-col overflow-x-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900">
            {selectedFormType ? 
              typesDemandes.find(type => type.id === selectedFormType)?.titre || 'Détail de la demande'
              : 'Nouvelle demande'
            }
          </h2>
          <button
            onClick={selectedFormType ? onCloseForm : onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-6 py-6">
          {renderFormContent()}
        </div>
      </div>
    </div>
  );
} 