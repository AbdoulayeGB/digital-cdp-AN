import React, { useState } from 'react';
import { Receipt, Download, Printer as Print, Search, Calendar } from 'lucide-react';
import { mockRecepissés, mockDemandes } from '../../data/mockData';
import { Recepisse } from '../../types';

export default function ReceptissesSection() {
  const [recepissés] = useState<Recepisse[]>(mockRecepissés);
  const [searchTerm, setSearchTerm] = useState('');

  const getDemandeById = (id: string) => {
    return mockDemandes.find(d => d.id === id);
  };

  const filteredRecepissés = recepissés.filter(recepisse => 
    recepisse.numeroRecepisse.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Gestion des Récépissés</h2>
          <p className="text-gray-600">Génération et suivi des récépissés de dépôt</p>
        </div>
        <button className="inline-flex items-center px-4 py-2 bg-blue-700 text-white font-medium rounded-lg hover:bg-blue-800 transition-colors">
          <Receipt className="w-5 h-5 mr-2" />
          Générer Récépissé
        </button>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Récépissés</p>
              <p className="text-2xl font-bold text-gray-900">{recepissés.length}</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Receipt className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Ce Mois</p>
              <p className="text-2xl font-bold text-green-600">12</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <Calendar className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Valides</p>
              <p className="text-2xl font-bold text-blue-600">
                {recepissés.filter(r => new Date(r.validiteJusquau) > new Date()).length}
              </p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Download className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Expirant</p>
              <p className="text-2xl font-bold text-orange-600">3</p>
            </div>
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
              <Calendar className="w-6 h-6 text-orange-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Rechercher par numéro de récépissé..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>

      {/* Récépissés Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Numéro Récépissé
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Demande Liée
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date Émission
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Validité
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type Document
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredRecepissés.map((recepisse) => {
                const demande = getDemandeById(recepisse.demandeId);
                const isExpiringSoon = new Date(recepisse.validiteJusquau) < new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);
                const isExpired = new Date(recepisse.validiteJusquau) < new Date();
                
                return (
                  <tr key={recepisse.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{recepisse.numeroRecepisse}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{demande?.numeroReference}</div>
                        <div className="text-sm text-gray-500">{demande?.entreprise.nom}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {new Date(recepisse.dateEmission).toLocaleDateString('fr-FR')}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {new Date(recepisse.validiteJusquau).toLocaleDateString('fr-FR')}
                      </div>
                      {isExpired && (
                        <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-red-100 text-red-800 mt-1">
                          Expiré
                        </span>
                      )}
                      {!isExpired && isExpiringSoon && (
                        <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-orange-100 text-orange-800 mt-1">
                          Expire bientôt
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                        {recepisse.typeDocument}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center space-x-2">
                        <button className="text-blue-600 hover:text-blue-900 p-1 rounded-lg hover:bg-blue-50">
                          <Download className="w-4 h-4" />
                        </button>
                        <button className="text-gray-600 hover:text-gray-900 p-1 rounded-lg hover:bg-gray-50">
                          <Print className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Template Preview */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Aperçu Modèle de Récépissé</h3>
        <div className="bg-gray-50 rounded-lg p-8 border-2 border-dashed border-gray-300">
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center space-x-3">
              <div className="w-12 h-12 bg-blue-700 rounded-lg flex items-center justify-center">
                <Receipt className="w-6 h-6 text-white" />
              </div>
              <div>
                <h4 className="text-xl font-bold text-gray-900">RÉPUBLIQUE DU SÉNÉGAL</h4>
                <p className="text-sm text-gray-600">Commission de Protection des Données Personnelles</p>
              </div>
            </div>
            
            <div className="border-t border-gray-300 pt-4">
              <h5 className="text-lg font-semibold text-gray-900 mb-2">RÉCÉPISSÉ DE DÉPÔT</h5>
              <div className="text-left space-y-2 max-w-md mx-auto">
                <div className="flex justify-between">
                  <span className="text-gray-600">N° Récépissé:</span>
                  <span className="font-medium">REC-2024-XXX</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Date d'émission:</span>
                  <span className="font-medium">XX/XX/2024</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Valable jusqu'au:</span>
                  <span className="font-medium">XX/XX/2025</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}