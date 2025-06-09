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
  BarChart3,
  ChevronDown,
  ChevronUp,
  FileCheck,
  ClipboardList,
  X,
  Mail,
  Building2
} from 'lucide-react';
import { mockMissions, mockEntreprises } from '../../data/mockData';
import { MissionControle } from '../../types';
import NewMissionModal from './NewMissionModal';
import NewDeplacementModal from './NewDeplacementModal';
import NewCourrierModal from './NewCourrierModal';
import NewDocumentModal from './NewDocumentModal';
import { read, utils } from 'xlsx';

interface Deplacement {
  id: string;
  date: Date;
  lieu: string;
  participants: string[];
  observations: string;
  documents: Document[];
}

interface Courrier {
  id: string;
  date: Date;
  type: 'envoye' | 'recu';
  objet: string;
  contenu: string;
  documents: Document[];
}

interface Document {
  id: string;
  nom: string;
  type: string;
  dateUpload: Date;
  url: string;
}

export default function MissionsSection() {
  const [missions, setMissions] = useState<MissionControle[]>(mockMissions);
  const [selectedMission, setSelectedMission] = useState<MissionControle | null>(null);
  const [showHistorique, setShowHistorique] = useState(false);
  const [showNewMission, setShowNewMission] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterType, setFilterType] = useState('all');
  const [expandedMission, setExpandedMission] = useState<string | null>(null);
  const [showImportModal, setShowImportModal] = useState(false);
  const [importError, setImportError] = useState<string | null>(null);
  const [showDeplacementModal, setShowDeplacementModal] = useState(false);
  const [showCourrierModal, setShowCourrierModal] = useState(false);
  const [showDocumentModal, setShowDocumentModal] = useState(false);

  // Calcul des statistiques
  const totalMissions = missions.length;
  const missionsEnCours = missions.filter(m => m.statut === 'en_cours').length;
  const missionsPlanifiees = missions.filter(m => m.statut === 'planifie').length;
  const missionsTerminees = missions.filter(m => m.statut === 'termine').length;

  // Calcul des missions du mois en cours
  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();
  const missionsCeMois = missions.filter(m => {
    const missionDate = new Date(m.dateMission);
    return missionDate.getMonth() === currentMonth && missionDate.getFullYear() === currentYear;
  }).length;

  // Calcul du pourcentage de variation par rapport au mois précédent
  const lastMonth = currentMonth === 0 ? 11 : currentMonth - 1;
  const lastYear = currentMonth === 0 ? currentYear - 1 : currentYear;
  const missionsMoisPrecedent = missions.filter(m => {
    const missionDate = new Date(m.dateMission);
    return missionDate.getMonth() === lastMonth && missionDate.getFullYear() === lastYear;
  }).length;

  const variationPourcentage = missionsMoisPrecedent === 0 
    ? 100 
    : ((missionsCeMois - missionsMoisPrecedent) / missionsMoisPrecedent) * 100;

  const getEntrepriseById = (id: string) => {
    return mockEntreprises.find(e => e.id === id);
  };

  const getStatusColor = (statut: string) => {
    switch (statut) {
      case 'terminée': return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      case 'en_cours': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'planifiée': return 'bg-orange-100 text-orange-800 border-orange-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getMissionTypeColor = (type: string) => {
    switch (type) {
      case 'controle_sur_place': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'controle_en_ligne': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'controle_simplifie': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
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

  const renderMissionCard = (mission: MissionControle) => {
    const entreprise = getEntrepriseById(mission.entrepriseId);
    const isExpanded = expandedMission === mission.id;

    return (
      <div key={mission.id} className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
        <div className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                mission.typeMission === 'inspection' ? 'bg-blue-100' :
                mission.typeMission === 'audit' ? 'bg-purple-100' : 'bg-red-100'
              }`}>
                <Target className={`w-6 h-6 ${
                  mission.typeMission === 'inspection' ? 'text-blue-600' :
                  mission.typeMission === 'audit' ? 'text-purple-600' : 'text-red-600'
                }`} />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{mission.numeroMission}</h3>
                <p className="text-sm text-gray-500">{entreprise?.nom}</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <span className={`px-3 py-1 text-sm font-medium rounded-full border ${getStatusColor(mission.statut)}`}>
                {mission.statut.replace('_', ' ')}
              </span>
              <button
                onClick={() => setExpandedMission(isExpanded ? null : mission.id)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                {isExpanded ? <ChevronUp className="w-5 h-5 text-gray-500" /> : <ChevronDown className="w-5 h-5 text-gray-500" />}
              </button>
            </div>
          </div>

          {isExpanded && (
            <div className="mt-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-gray-50 rounded-xl p-4">
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-5 h-5 text-gray-500" />
                    <span className="text-sm text-gray-600">Date de mission</span>
                  </div>
                  <p className="mt-1 text-sm font-medium text-gray-900">{mission.dateMission}</p>
                </div>
                <div className="bg-gray-50 rounded-xl p-4">
                  <div className="flex items-center space-x-2">
                    <MapPin className="w-5 h-5 text-gray-500" />
                    <span className="text-sm text-gray-600">Lieu</span>
                  </div>
                  <p className="mt-1 text-sm font-medium text-gray-900">{mission.lieu}</p>
                </div>
                <div className="bg-gray-50 rounded-xl p-4">
                  <div className="flex items-center space-x-2">
                    <Users className="w-5 h-5 text-gray-500" />
                    <span className="text-sm text-gray-600">Équipe</span>
                  </div>
                  <p className="mt-1 text-sm font-medium text-gray-900">{mission.equipe.join(', ')}</p>
                </div>
              </div>

              <div className="flex items-center space-x-3 pt-4 border-t border-gray-200">
                <button className="flex items-center px-4 py-2 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors">
                  <Eye className="w-4 h-4 mr-2" />
                  Voir détails
                </button>
                <button className="flex items-center px-4 py-2 bg-emerald-50 text-emerald-700 rounded-lg hover:bg-emerald-100 transition-colors">
                  <FileCheck className="w-4 h-4 mr-2" />
                  Rapport
                </button>
                <button className="flex items-center px-4 py-2 bg-purple-50 text-purple-700 rounded-lg hover:bg-purple-100 transition-colors">
                  <ClipboardList className="w-4 h-4 mr-2" />
                  Checklist
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

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
              placeholder="Rechercher une mission..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div className="flex gap-4">
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">Tous les statuts</option>
              <option value="planifie">Planifiée</option>
              <option value="en_cours">En cours</option>
              <option value="termine">Terminée</option>
            </select>
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">Tous les types</option>
              <option value="controle_sur_place">Contrôle sur place</option>
              <option value="controle_en_ligne">Contrôle en ligne</option>
              <option value="controle_simplifie">Contrôle simplifié</option>
              <option value="suite_plainte">Suite à une plainte</option>
              <option value="suite_pleniere">Suite séance plénière</option>
            </select>
          </div>
        </div>
      </div>

      {/* Missions List */}
      <div className="space-y-4">
        {filteredMissions.map(renderMissionCard)}
      </div>
    </div>
  );

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Missions</p>
              <p className="text-2xl font-bold text-gray-900">{totalMissions}</p>
              <p className="text-sm text-green-600 mt-1">
                {variationPourcentage > 0 ? '+' : ''}{variationPourcentage.toFixed(0)}% ce mois
              </p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Shield className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">En Cours</p>
              <p className="text-2xl font-bold text-orange-600">{missionsEnCours}</p>
              <p className="text-sm text-gray-500 mt-1">Actives</p>
            </div>
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
              <Clock className="w-6 h-6 text-orange-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Planifiées</p>
              <p className="text-2xl font-bold text-blue-600">{missionsPlanifiees}</p>
              <p className="text-sm text-gray-500 mt-1">À venir</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Calendar className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Terminées</p>
              <p className="text-2xl font-bold text-green-600">{missionsTerminees}</p>
              <p className="text-sm text-gray-500 mt-1">Complétées</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-green-600" />
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

  const handleSaveNewMission = (newMission: Omit<MissionControle, 'id'>) => {
    const mission: MissionControle = {
      id: (missions.length + 1).toString(),
      numeroMission: newMission.numeroMission,
      entrepriseId: newMission.entrepriseId,
      dateMission: newMission.dateMission,
      typeMission: newMission.typeMission,
      statut: newMission.statut,
      lieu: newMission.lieu,
      equipe: newMission.equipe.filter(membre => membre.trim() !== ''),
      rapport: newMission.rapport || undefined,
      sanctions: newMission.sanctions || undefined,
      suivi: newMission.suivi || undefined
    };
    setMissions([...missions, mission]);
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = new Uint8Array(e.target?.result as ArrayBuffer);
        const workbook = read(data, { type: 'array' });
        const worksheet = workbook.Sheets[workbook.SheetNames[0]];
        const jsonData = utils.sheet_to_json(worksheet);

        // Validation et transformation des données
        const newMissions = jsonData.map((row: any, index: number) => {
          // Validation des champs requis
          if (!row.numeroMission || !row.entrepriseId || !row.dateMission || !row.typeMission || !row.lieu) {
            throw new Error(`Ligne ${index + 2}: Données manquantes`);
          }

          // Création d'une nouvelle mission
          const mission: Omit<MissionControle, 'id'> = {
            numeroMission: row.numeroMission.toString(),
            entrepriseId: row.entrepriseId.toString(),
            dateMission: row.dateMission,
            typeMission: row.typeMission as 'controle_sur_place' | 'controle_en_ligne' | 'controle_simplifie',
            statut: 'planifie',
            lieu: row.lieu,
            equipe: row.equipe ? row.equipe.split(',').map((m: string) => m.trim()) : [],
            rapport: row.rapport || undefined,
            sanctions: row.sanctions || undefined,
            suivi: row.suivi || undefined
          };

          return mission;
        });

        // Ajout des nouvelles missions
        const updatedMissions = [...missions];
        newMissions.forEach((mission, index) => {
          const newMission: MissionControle = {
            ...mission,
            id: (missions.length + index + 1).toString()
          };
          updatedMissions.push(newMission);
        });

        setMissions(updatedMissions);
        setShowImportModal(false);
        setImportError(null);
      } catch (error) {
        setImportError(error instanceof Error ? error.message : 'Erreur lors de l\'import du fichier');
      }
    };

    reader.readAsArrayBuffer(file);
  };

  const handleAddDeplacement = (missionId: string, deplacement: Omit<Deplacement, 'id'>) => {
    setMissions(prevMissions => 
      prevMissions.map(mission => {
        if (mission.id === missionId) {
          const newDeplacement = {
            ...deplacement,
            id: Date.now().toString()
          };
          return {
            ...mission,
            deplacements: [...(mission.deplacements || []), newDeplacement]
          };
        }
        return mission;
      })
    );
  };

  const handleAddCourrier = (missionId: string, courrier: Omit<Courrier, 'id'>) => {
    setMissions(prevMissions => 
      prevMissions.map(mission => {
        if (mission.id === missionId) {
          const newCourrier = {
            ...courrier,
            id: Date.now().toString()
          };
          return {
            ...mission,
            courriers: [...(mission.courriers || []), newCourrier]
          };
        }
        return mission;
      })
    );
  };

  const handleUploadDocument = (missionId: string, document: Omit<Document, 'id'>) => {
    setMissions(prevMissions => 
      prevMissions.map(mission => {
        if (mission.id === missionId) {
          const newDocument = {
            ...document,
            id: Date.now().toString()
          };
          return {
            ...mission,
            documents: [...(mission.documents || []), newDocument]
          };
        }
        return mission;
      })
    );
  };

  const renderMissionDetails = (mission: MissionControle) => {
    return (
      <div className="mt-4 space-y-6">
        {/* Onglets */}
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8">
            <button
              onClick={() => setActiveTab('overview')}
              className={`pb-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'overview'
                  ? 'border-[#FFA500] text-[#FFA500]'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Vue d'ensemble
            </button>
            <button
              onClick={() => setActiveTab('deplacements')}
              className={`pb-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'deplacements'
                  ? 'border-[#FFA500] text-[#FFA500]'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Déplacements
            </button>
            <button
              onClick={() => setActiveTab('courriers')}
              className={`pb-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'courriers'
                  ? 'border-[#FFA500] text-[#FFA500]'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Courriers
            </button>
            <button
              onClick={() => setActiveTab('documents')}
              className={`pb-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'documents'
                  ? 'border-[#FFA500] text-[#FFA500]'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Documents
            </button>
          </nav>
        </div>

        {/* Contenu des onglets */}
        <div className="mt-6">
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Déplacements</p>
                      <p className="text-2xl font-bold text-gray-900">
                        {mission.deplacements?.length || 0}
                      </p>
                    </div>
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                      <MapPin className="w-6 h-6 text-blue-600" />
                    </div>
                  </div>
                </div>
                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Courriers</p>
                      <p className="text-2xl font-bold text-gray-900">
                        {mission.courriers?.length || 0}
                      </p>
                    </div>
                    <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                      <Mail className="w-6 h-6 text-green-600" />
                    </div>
                  </div>
                </div>
                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Documents</p>
                      <p className="text-2xl font-bold text-gray-900">
                        {mission.documents?.length || 0}
                      </p>
                    </div>
                    <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                      <FileText className="w-6 h-6 text-orange-600" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'deplacements' && (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-gray-900">Historique des déplacements</h3>
                <button
                  onClick={() => setShowDeplacementModal(true)}
                  className="inline-flex items-center px-4 py-2 bg-[#FFA500] text-white font-medium rounded-xl hover:bg-[#FF8C00] transition-colors"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Nouveau déplacement
                </button>
              </div>
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Lieu</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Participants</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Observations</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Documents</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {mission.deplacements?.map((deplacement) => (
                      <tr key={deplacement.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {new Date(deplacement.date).toLocaleDateString('fr-FR')}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {deplacement.lieu}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {deplacement.participants.join(', ')}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-900">
                          {deplacement.observations}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {deplacement.documents.length} document(s)
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'courriers' && (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-gray-900">Échanges de courriers</h3>
                <button
                  onClick={() => setShowCourrierModal(true)}
                  className="inline-flex items-center px-4 py-2 bg-[#FFA500] text-white font-medium rounded-xl hover:bg-[#FF8C00] transition-colors"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Nouveau courrier
                </button>
              </div>
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Objet</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Contenu</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Documents</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {mission.courriers?.map((courrier) => (
                      <tr key={courrier.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {new Date(courrier.date).toLocaleDateString('fr-FR')}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                            courrier.type === 'envoye' 
                              ? 'bg-blue-100 text-blue-800' 
                              : 'bg-green-100 text-green-800'
                          }`}>
                            {courrier.type === 'envoye' ? 'Envoyé' : 'Reçu'}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {courrier.objet}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-900">
                          {courrier.contenu}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {courrier.documents.length} document(s)
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'documents' && (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-gray-900">Documents de la mission</h3>
                <button
                  onClick={() => setShowDocumentModal(true)}
                  className="inline-flex items-center px-4 py-2 bg-[#FFA500] text-white font-medium rounded-xl hover:bg-[#FF8C00] transition-colors"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Ajouter un document
                </button>
              </div>
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Nom</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date d'upload</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {mission.documents?.map((document) => (
                      <tr key={document.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {document.nom}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {document.type}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {new Date(document.dateUpload).toLocaleDateString('fr-FR')}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex items-center space-x-2">
                            <button className="text-blue-600 hover:text-blue-900">
                              <Download className="w-4 h-4" />
                            </button>
                            <button className="text-gray-600 hover:text-gray-900">
                              <Eye className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Missions de Contrôle</h1>
          <p className="text-gray-500">Gérez vos missions de contrôle et suivez leur progression</p>
        </div>
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setShowImportModal(true)}
            className="flex items-center px-4 py-2 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-colors"
          >
            <Upload className="w-5 h-5 mr-2" />
            Importer Excel
          </button>
          <button
            onClick={() => setShowNewMission(true)}
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors"
          >
            <Plus className="w-5 h-5 mr-2" />
            Nouvelle Mission
          </button>
        </div>
      </div>

      {/* Import Modal */}
      {showImportModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Importer des Missions</h2>
              <button
                onClick={() => {
                  setShowImportModal(false);
                  setImportError(null);
                }}
                className="text-gray-400 hover:text-gray-500"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <div className="space-y-4">
              <p className="text-sm text-gray-600">
                Importez un fichier Excel contenant une liste de missions. Le fichier doit contenir les colonnes suivantes :
                numeroMission, entrepriseId, dateMission, typeMission, lieu, equipe (optionnel), rapport (optionnel), sanctions (optionnel), suivi (optionnel)
              </p>

              <div className="border-2 border-dashed border-gray-300 rounded-xl p-6">
                <input
                  type="file"
                  accept=".xlsx,.xls"
                  onChange={handleFileUpload}
                  className="hidden"
                  id="file-upload"
                />
                <label
                  htmlFor="file-upload"
                  className="flex flex-col items-center justify-center cursor-pointer"
                >
                  <Upload className="w-8 h-8 text-gray-400 mb-2" />
                  <span className="text-sm text-gray-600">Cliquez pour sélectionner un fichier Excel</span>
                </label>
              </div>

              {importError && (
                <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm">
                  {importError}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Tabs */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-200">
        <div className="flex border-b border-gray-200">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center px-6 py-4 text-sm font-medium ${
                activeTab === tab.id
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <tab.icon className="w-5 h-5 mr-2" />
              {tab.label}
            </button>
          ))}
        </div>
        <div className="p-6">
          {activeTab === 'overview' && renderOverview()}
          {activeTab === 'missions' && renderMissions()}
          {activeTab === 'planning' && <div>Contenu du planning</div>}
          {activeTab === 'reports' && <div>Contenu des rapports</div>}
        </div>
      </div>

      <NewMissionModal
        isOpen={showNewMission}
        onClose={() => setShowNewMission(false)}
        onSave={handleSaveNewMission}
      />

      <NewDeplacementModal
        isOpen={showDeplacementModal}
        onClose={() => setShowDeplacementModal(false)}
        onSave={(deplacement) => {
          if (selectedMission) {
            handleAddDeplacement(selectedMission.id, deplacement);
          }
        }}
      />

      <NewCourrierModal
        isOpen={showCourrierModal}
        onClose={() => setShowCourrierModal(false)}
        onSave={(courrier) => {
          if (selectedMission) {
            handleAddCourrier(selectedMission.id, courrier);
          }
        }}
      />

      <NewDocumentModal
        isOpen={showDocumentModal}
        onClose={() => setShowDocumentModal(false)}
        onSave={(document) => {
          if (selectedMission) {
            handleUploadDocument(selectedMission.id, {
              ...document,
              dateUpload: new Date(),
              url: URL.createObjectURL(document.file)
            });
          }
        }}
      />

      {selectedMission && renderMissionDetails(selectedMission)}
    </div>
  );
}