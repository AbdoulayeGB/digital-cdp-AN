import React, { useState } from 'react';
import { Database, Upload, Download, Search, Filter, Building2 } from 'lucide-react';
import { mockEntreprises } from '../../data/mockData';
import { Entreprise } from '../../types';

export default function BaseDonneesSection() {
  const [entreprises] = useState<Entreprise[]>(mockEntreprises);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterSecteur, setFilterSecteur] = useState('all');
  const [showImportModal, setShowImportModal] = useState(false);

  const filteredEntreprises = entreprises.filter(entreprise => {
    const matchesSearch = entreprise.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         entreprise.ninea.includes(searchTerm);
    const matchesSecteur = filterSecteur === 'all' || entreprise.secteurActivite === filterSecteur;
    return matchesSearch && matchesSecteur;
  });

  const secteurs = [...new Set(entreprises.map(e => e.secteurActivite))];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Base de Données</h2>
          <p className="text-gray-600">Gestion centralisée des entreprises et de leurs données</p>
        </div>
        <div className="flex items-center space-x-3">
          <button
            onClick={() => setShowImportModal(true)}
            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-emerald-600 to-emerald-700 text-white font-medium rounded-xl hover:from-emerald-700 hover:to-emerald-800 transition-all transform hover:scale-105 shadow-lg"
          >
            <Upload className="w-5 h-5 mr-2" />
            Import Données
          </button>
          <button className="inline-flex items-center px-4 py-2 bg-gray-100 text-gray-700 font-medium rounded-xl hover:bg-gray-200 transition-colors">
            <Download className="w-4 h-4 mr-2" />
            Exporter
          </button>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200 hover:shadow-xl transition-all">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Entreprises</p>
              <p className="text-2xl font-bold text-gray-900">{entreprises.length}</p>
            </div>
            <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center shadow-lg">
              <Building2 className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200 hover:shadow-xl transition-all">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Actives</p>
              <p className="text-2xl font-bold text-emerald-600">
                {entreprises.filter(e => e.statut === 'active').length}
              </p>
            </div>
            <div className="w-12 h-12 bg-gradient-to-br from-emerald-600 to-emerald-700 rounded-xl flex items-center justify-center shadow-lg">
              <Database className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200 hover:shadow-xl transition-all">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Secteurs</p>
              <p className="text-2xl font-bold text-orange-600">{secteurs.length}</p>
            </div>
            <div className="w-12 h-12 bg-gradient-to-br from-orange-600 to-orange-700 rounded-xl flex items-center justify-center shadow-lg">
              <Filter className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200 hover:shadow-xl transition-all">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Mises à jour</p>
              <p className="text-2xl font-bold text-blue-600">12</p>
            </div>
            <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center shadow-lg">
              <Upload className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Rechercher par nom ou NINEA..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-xl leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all"
            />
          </div>
          <div className="flex items-center space-x-2">
            <Filter className="w-5 h-5 text-gray-400" />
            <select
              value={filterSecteur}
              onChange={(e) => setFilterSecteur(e.target.value)}
              className="border border-gray-300 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              <option value="all">Tous les secteurs</option>
              {secteurs.map(secteur => (
                <option key={secteur} value={secteur}>{secteur}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Entreprises Table */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Entreprise
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  NINEA
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Secteur
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date Inscription
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Statut
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredEntreprises.map((entreprise) => (
                <tr key={entreprise.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{entreprise.nom}</div>
                      <div className="text-sm text-gray-500">{entreprise.email}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {entreprise.ninea}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex px-3 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                      {entreprise.secteurActivite}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {new Date(entreprise.dateInscription).toLocaleDateString('fr-FR')}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full ${
                      entreprise.statut === 'active' 
                        ? 'bg-emerald-100 text-emerald-800'
                        : entreprise.statut === 'suspendue'
                        ? 'bg-orange-100 text-orange-800'
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {entreprise.statut}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button className="text-blue-600 hover:text-blue-900 mr-4">
                      Voir détails
                    </button>
                    <button className="text-gray-600 hover:text-gray-900">
                      Modifier
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Import Modal */}
      {showImportModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl">
            <div className="bg-gradient-to-r from-emerald-600 to-emerald-700 p-6 rounded-t-2xl">
              <h3 className="text-lg font-semibold text-white">Import de Données</h3>
              <p className="text-sm text-emerald-100 mt-1">
                Importez vos données d'entreprises depuis un fichier CSV ou Excel
              </p>
            </div>
            <div className="p-6">
              <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center">
                <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-sm text-gray-600 mb-2">
                  Glissez-déposez votre fichier ici ou
                </p>
                <button className="text-emerald-600 hover:text-emerald-700 font-medium">
                  parcourez vos fichiers
                </button>
                <p className="text-xs text-gray-500 mt-2">
                  Formats supportés: CSV, XLSX (max 10MB)
                </p>
              </div>
            </div>
            <div className="p-6 border-t border-gray-200 flex justify-end space-x-3">
              <button
                onClick={() => setShowImportModal(false)}
                className="px-4 py-2 text-gray-700 bg-gray-100 rounded-xl hover:bg-gray-200 transition-colors"
              >
                Annuler
              </button>
              <button className="px-4 py-2 bg-gradient-to-r from-emerald-600 to-emerald-700 text-white rounded-xl hover:from-emerald-700 hover:to-emerald-800 transition-all">
                Importer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}