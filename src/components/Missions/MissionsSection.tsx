import React, { useState } from 'react';
import { 
  Shield, 
  Plus, 
  Calendar, 
  FileText, 
  History, 
  MapPin, 
  Users, 
  Clock, 
  CheckCircle, 
  AlertTriangle,
  Search,
  Filter,
  Eye,
  Edit,
  Trash2,
  Download,
  Upload,
  Target,
  Activity,
  BarChart3
} from 'lucide-react';
import { mockMissions, mockEntreprises } from '../../data/mockData';
import { MissionControle } from '../../types';

export default function MissionsSection() {
  const [missions] = useState<MissionControle[]>(mockMissions);
  const [selectedMission, setSelectedMission] = useState<MissionControle | null>(null);
  const [showHistorique, setShowHistorique] = useState(false);
  const [showNewMission, setShowNewMission] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterType, setFilterType] = useState('all');

  const getEntrepriseById = (id: string) => {
    return mockEntreprises.find(e => e.id === id);
  };

  const getStatusColor = (statut: string) => {
    switch (statut) {
      case 'terminée': return 'bg-emerald-100 text-emerald-800';
      case 'en_cours': return 'bg-blue-100 text-blue-800';
      case 'planifiée': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getMissionTypeColor = (type: string) => {
    switch (type) {
      case 'inspection': return 'bg-blue-100 text-blue-800';
      case 'audit': return 'bg-purple-100 text-purple-800';
      case 'enquete': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredMissions = missions.filter(mission => {
    const entreprise = getEntrepriseById(mission.entrepriseId);
    const matchesSearch = mission.numeroMission.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         entreprise?.nom.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || mission.statut === filterStatus;
    const matchesType = filterType === 'all' || mission.typeMission === filterType;
    return matchesSearch && matchesStatus && matchesType;
  });

  const tabs = [
    { id: 'overview', label: 'Vue d\'ensemble', icon: BarChart3 },
    { id: 'missions', label: 'Missions', icon: Shield },
    { id: 'planning', label: 'Planification', icon: Calendar },
    { id: 'reports', label: 'Rapports', icon: FileText },
  ];

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Mission Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200 hover:shadow-xl transition-all">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Missions</p>
              <p className="text-3xl font-bold text-gray-900">{missions.length}</p>
              <p className="text-xs text-emerald-600 mt-1">+12% ce mois</p>
            </div>
            <div className="w-14 h-14 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center shadow-lg">
              <Shield className="w-7 h-7 text-white" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200 hover:shadow-xl transition-all">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">En Cours</p>
              <p className="text-3xl font-bold text-blue-600">
                {missions.filter(m => m.statut === 'en_cours').length}
              </p>
              <p className="text-xs text-blue-600 mt-1">Actives</p>
            </div>
            <div className="w-14 h-14 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center shadow-lg">
              <Activity className="w-7 h-7 text-white" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200 hover:shadow-xl transition-all">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Planifiées</p>
              <p className="text-3xl font-bold text-orange-600">
                {missions.filter(m => m.statut === 'planifiée').length}
              </p>
              <p className="text-xs text-orange-600 mt-1">À venir</p>
            </div>
            <div className="w-14 h-14 bg-gradient-to-br from-orange-600 to-orange-700 rounded-xl flex items-center justify-center shadow-lg">
              <Clock className="w-7 h-7 text-white" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200 hover:shadow-xl transition-all">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Terminées</p>
              <p className="text-3xl font-bold text-emerald-600">
                {missions.filter(m => m.statut === 'terminée').length}
              </p>
              <p className="text-xs text-emerald-600 mt-1">Complétées</p>
            </div>
            <div className="w-14 h-14 bg-gradient-to-br from-emerald-600 to-emerald-700 rounded-xl flex items-center justify-center shadow-lg">
              <CheckCircle className="w-7 h-7 text-white" />
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Actions Rapides</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button 
            onClick={() => setShowNewMission(true)}
            className="flex items-center p-4 bg-gradient-to-r from-emerald-50 to-emerald-100 rounded-xl border border-emerald-200 hover:from-emerald-100 hover:to-emerald-200 transition-all group"
          >
            <div className="w-10 h-10 bg-emerald-600 rounded-lg flex items-center justify-center mr-3 group-hover:scale-110 transition-transform">
              <Plus className="w-5 h-5 text-white" />
            </div>
            <div className="text-left">
              <p className="font-medium text-emerald-800">Nouvelle Mission</p>
              <p className="text-sm text-emerald-600">Planifier une mission</p>
            </div>
          </button>
          <button className="flex items-center p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl border border-blue-200 hover:from-blue-100 hover:to-blue-200 transition-all group">
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center mr-3 group-hover:scale-110 transition-transform">
              <Calendar className="w-5 h-5 text-white" />
            </div>
            <div className="text-left">
              <p className="font-medium text-blue-800">Planning</p>
              <p className="text-sm text-blue-600">Voir le calendrier</p>
            </div>
          </button>
          <button className="flex items-center p-4 bg-gradient-to-r from-purple-50 to-purple-100 rounded-xl border border-purple-200 hover:from-purple-100 hover:to-purple-200 transition-all group">
            <div className="w-10 h-10 bg-purple-600 rounded-lg flex items-center justify-center mr-3 group-hover:scale-110 transition-transform">
              <FileText className="w-5 h-5 text-white" />
            </div>
            <div className="text-left">
              <p className="font-medium text-purple-800">Rapports</p>
              <p className="text-sm text-purple-600">Générer rapport</p>
            </div>
          </button>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
          <div className="bg-gradient-to-r from-emerald-600 to-emerald-700 p-6">
            <h3 className="text-lg font-semibold text-white">Missions Récentes</h3>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {missions.slice(0, 5).map((mission) => {
                const entreprise = getEntrepriseById(mission.entrepriseId);
                return (
                  <div key={mission.id} className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl border border-gray-200 hover:shadow-md transition-all">
                    <div className="flex items-center space-x-3">
                      <div className={`w-3 h-3 rounded-full ${
                        mission.statut === 'terminée' ? 'bg-emerald-500' :
                        mission.statut === 'en_cours' ? 'bg-blue-500' : 'bg-orange-500'
                      }`}></div>
                      <div>
                        <p className="font-medium text-gray-900">{mission.numeroMission}</p>
                        <p className="text-sm text-gray-500">{entreprise?.nom}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full ${getStatusColor(mission.statut)}`}>
                        {mission.statut.replace('_', ' ')}
                      </span>
                      <p className="text-xs text-gray-500 mt-1">{mission.dateMission}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-6">
            <h3 className="text-lg font-semibold text-white">Prochaines Échéances</h3>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {missions.filter(m => m.statut === 'planifiée').map((mission) => {
                const entreprise = getEntrepriseById(mission.entrepriseId);
                return (
                  <div key={mission.id} className="flex items-center justify-between p-4 bg-gradient-to-r from-orange-50 to-orange-100 rounded-xl border border-orange-200">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-orange-600 rounded-lg flex items-center justify-center">
                        <Calendar className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{mission.numeroMission}</p>
                        <p className="text-sm text-gray-500">{entreprise?.nom}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-orange-800">{mission.dateMission}</p>
                      <p className="text-xs text-orange-600">{mission.typeMission}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderMissions = () => (
    <div className="space-y-6">
      {/* Search and Filters */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Rechercher par numéro de mission ou entreprise..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-xl leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all"
            />
          </div>
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-2">
              <Filter className="w-5 h-5 text-gray-400" />
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="border border-gray-300 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
              >
                <option value="all">Tous les statuts</option>
                <option value="planifiée">Planifiée</option>
                <option value="en_cours">En cours</option>
                <option value="terminée">Terminée</option>
              </select>
            </div>
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="border border-gray-300 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              <option value="all">Tous les types</option>
              <option value="inspection">Inspection</option>
              <option value="audit">Audit</option>
              <option value="enquete">Enquête</option>
            </select>
          </div>
        </div>
      </div>

      {/* Missions Table */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Mission
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Entreprise
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
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
              {filteredMissions.map((mission) => {
                const entreprise = getEntrepriseById(mission.entrepriseId);
                return (
                  <tr key={mission.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className={`w-3 h-3 rounded-full mr-3 ${
                          mission.statut === 'terminée' ? 'bg-emerald-500' :
                          mission.statut === 'en_cours' ? 'bg-blue-500' : 'bg-orange-500'
                        }`}></div>
                        <div className="text-sm font-medium text-gray-900">{mission.numeroMission}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{entreprise?.nom}</div>
                      <div className="text-sm text-gray-500">{entreprise?.secteurActivite}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full ${getMissionTypeColor(mission.typeMission)}`}>
                        {mission.typeMission}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {new Date(mission.dateMission).toLocaleDateString('fr-FR')}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full ${getStatusColor(mission.statut)}`}>
                        {mission.statut.replace('_', ' ')}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center space-x-2">
                        <button 
                          onClick={() => setSelectedMission(mission)}
                          className="text-blue-600 hover:text-blue-900 p-2 rounded-xl hover:bg-blue-50 transition-colors"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button className="text-gray-600 hover:text-gray-900 p-2 rounded-xl hover:bg-gray-50 transition-colors">
                          <Edit className="w-4 h-4" />
                        </button>
                        <button className="text-red-600 hover:text-red-900 p-2 rounded-xl hover:bg-red-50 transition-colors">
                          <Trash2 className="w-4 h-4" />
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
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Centre de Contrôle des Missions</h2>
          <p className="text-gray-600">Planification, suivi et gestion des missions d'inspection et d'audit</p>
        </div>
        <div className="flex items-center space-x-3">
          <button className="inline-flex items-center px-4 py-2 bg-gray-100 text-gray-700 font-medium rounded-xl hover:bg-gray-200 transition-colors">
            <Download className="w-4 h-4 mr-2" />
            Exporter
          </button>
          <button 
            onClick={() => setShowNewMission(true)}
            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-emerald-600 to-emerald-700 text-white font-medium rounded-xl hover:from-emerald-700 hover:to-emerald-800 transition-all transform hover:scale-105 shadow-lg"
          >
            <Plus className="w-5 h-5 mr-2" />
            Nouvelle Mission
          </button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === tab.id
                      ? 'border-emerald-500 text-emerald-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Tab Content */}
      {activeTab === 'overview' && renderOverview()}
      {activeTab === 'missions' && renderMissions()}
      {activeTab === 'planning' && (
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8 text-center">
          <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Planification des Missions</h3>
          <p className="text-gray-600">Module de planification avancée en cours de développement</p>
        </div>
      )}
      {activeTab === 'reports' && (
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8 text-center">
          <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Rapports de Mission</h3>
          <p className="text-gray-600">Génération et analyse des rapports en cours de développement</p>
        </div>
      )}

      {/* Mission Details Modal */}
      {selectedMission && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="bg-gradient-to-r from-emerald-600 to-emerald-700 p-6 rounded-t-2xl">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-xl font-semibold text-white">{selectedMission.numeroMission}</h3>
                  <p className="text-emerald-100 mt-1">
                    {getEntrepriseById(selectedMission.entrepriseId)?.nom}
                  </p>
                </div>
                <button
                  onClick={() => setSelectedMission(null)}
                  className="text-emerald-200 hover:text-white text-2xl"
                >
                  ×
                </button>
              </div>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-semibold text-gray-900 text-lg">Informations de la Mission</h4>
                  <div className="bg-gray-50 rounded-xl p-4 space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Type:</span>
                      <span className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full ${getMissionTypeColor(selectedMission.typeMission)}`}>
                        {selectedMission.typeMission}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Date:</span>
                      <span className="text-sm font-medium text-gray-900">
                        {new Date(selectedMission.dateMission).toLocaleDateString('fr-FR')}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Statut:</span>
                      <span className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full ${getStatusColor(selectedMission.statut)}`}>
                        {selectedMission.statut.replace('_', ' ')}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <h4 className="font-semibold text-gray-900 text-lg">Entreprise Ciblée</h4>
                  <div className="bg-blue-50 rounded-xl p-4">
                    {(() => {
                      const entreprise = getEntrepriseById(selectedMission.entrepriseId);
                      return (
                        <div className="space-y-2">
                          <p className="font-medium text-blue-900">{entreprise?.nom}</p>
                          <p className="text-sm text-blue-700">NINEA: {entreprise?.ninea}</p>
                          <p className="text-sm text-blue-700">Secteur: {entreprise?.secteurActivite}</p>
                          <div className="mt-3 pt-3 border-t border-blue-200">
                            <div className="flex justify-between text-xs text-blue-600">
                              <span>Demandes précédentes:</span>
                              <span className="font-medium">3</span>
                            </div>
                            <div className="flex justify-between text-xs text-blue-600">
                              <span>Missions précédentes:</span>
                              <span className="font-medium">1</span>
                            </div>
                            <div className="flex justify-between text-xs text-blue-600">
                              <span>Dernière inspection:</span>
                              <span className="font-medium">15/01/2024</span>
                            </div>
                          </div>
                        </div>
                      );
                    })()}
                  </div>
                </div>
              </div>
              
              {selectedMission.rapport && (
                <div className="mt-6">
                  <h4 className="font-semibold text-gray-900 text-lg mb-3">Rapport de Mission</h4>
                  <div className="bg-emerald-50 rounded-xl p-4 border border-emerald-200">
                    <p className="text-sm text-emerald-800">{selectedMission.rapport}</p>
                  </div>
                </div>
              )}
              
              {selectedMission.sanctions && (
                <div className="mt-6">
                  <h4 className="font-semibold text-gray-900 text-lg mb-3">Sanctions</h4>
                  <div className="bg-red-50 rounded-xl p-4 border border-red-200">
                    <p className="text-sm text-red-800">{selectedMission.sanctions}</p>
                  </div>
                </div>
              )}

              <div className="mt-6 flex justify-end space-x-3">
                <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors">
                  Modifier
                </button>
                <button className="px-4 py-2 bg-gradient-to-r from-emerald-600 to-emerald-700 text-white rounded-xl hover:from-emerald-700 hover:to-emerald-800 transition-all">
                  Générer Rapport
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* New Mission Modal */}
      {showNewMission && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="bg-gradient-to-r from-emerald-600 to-emerald-700 p-6 rounded-t-2xl">
              <h3 className="text-lg font-semibold text-white">Nouvelle Mission de Contrôle</h3>
            </div>
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Type de mission
                  </label>
                  <select className="w-full border border-gray-300 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500">
                    <option value="inspection">Inspection</option>
                    <option value="audit">Audit</option>
                    <option value="enquete">Enquête</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Entreprise cible
                  </label>
                  <select className="w-full border border-gray-300 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500">
                    {mockEntreprises.map(entreprise => (
                      <option key={entreprise.id} value={entreprise.id}>
                        {entreprise.nom}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Date de mission
                  </label>
                  <input
                    type="date"
                    className="w-full border border-gray-300 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Priorité
                  </label>
                  <select className="w-full border border-gray-300 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500">
                    <option value="normale">Normale</option>
                    <option value="haute">Haute</option>
                    <option value="urgente">Urgente</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Objectifs de la mission
                </label>
                <textarea
                  className="w-full border border-gray-300 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  rows={4}
                  placeholder="Décrivez les objectifs et le périmètre de la mission..."
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Équipe assignée
                </label>
                <input
                  type="text"
                  className="w-full border border-gray-300 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  placeholder="Noms des inspecteurs assignés"
                />
              </div>
            </div>
            <div className="p-6 border-t border-gray-200 flex justify-end space-x-3">
              <button
                onClick={() => setShowNewMission(false)}
                className="px-6 py-2 text-gray-700 bg-gray-100 rounded-xl hover:bg-gray-200 transition-colors"
              >
                Annuler
              </button>
              <button className="px-6 py-2 bg-gradient-to-r from-emerald-600 to-emerald-700 text-white rounded-xl hover:from-emerald-700 hover:to-emerald-800 transition-all">
                Créer la mission
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}