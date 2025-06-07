import React from 'react';
import { FileText, Building, Shield, CheckCircle, Clock, AlertTriangle } from 'lucide-react';
import StatsCard from './StatsCard';
import { mockStatistiques, mockDemandes, mockMissions } from '../../data/mockData';

export default function Dashboard() {
  const recentDemandes = mockDemandes.slice(0, 5);
  const recentMissions = mockMissions.slice(0, 5);

  return (
    <div className="space-y-8">
      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <StatsCard
          title="Total Demandes"
          value={mockStatistiques.totalDemandes}
          icon={FileText}
          color="blue"
          trend={{ value: 12, isPositive: true }}
        />
        <StatsCard
          title="Demandes Approuvées"
          value={mockStatistiques.demandesApprouvees}
          icon={CheckCircle}
          color="green"
          trend={{ value: 8, isPositive: true }}
        />
        <StatsCard
          title="En Attente"
          value={mockStatistiques.demandesEnAttente}
          icon={Clock}
          color="orange"
          trend={{ value: -5, isPositive: false }}
        />
        <StatsCard
          title="Entreprises Enregistrées"
          value={mockStatistiques.totalEntreprises}
          icon={Building}
          color="blue"
          trend={{ value: 15, isPositive: true }}
        />
        <StatsCard
          title="Missions en Cours"
          value={mockStatistiques.missionsEnCours}
          icon={Shield}
          color="orange"
        />
        <StatsCard
          title="Missions Planifiées"
          value={mockStatistiques.missionsPlanifiees}
          icon={AlertTriangle}
          color="red"
        />
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Demandes */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
          <div className="bg-gradient-to-r from-emerald-600 to-emerald-700 p-6">
            <h3 className="text-lg font-semibold text-white">Demandes Récentes</h3>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {recentDemandes.map((demande) => (
                <div key={demande.id} className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl border border-gray-200 hover:shadow-md transition-all">
                  <div>
                    <p className="font-medium text-gray-900">{demande.entreprise.nom}</p>
                    <p className="text-sm text-gray-500">{demande.numeroReference}</p>
                  </div>
                  <div className="text-right">
                    <span className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full ${
                      demande.statut === 'approuvée' 
                        ? 'bg-emerald-100 text-emerald-800'
                        : demande.statut === 'en_cours'
                        ? 'bg-blue-100 text-blue-800'
                        : demande.statut === 'en_attente'
                        ? 'bg-orange-100 text-orange-800'
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {demande.statut.replace('_', ' ')}
                    </span>
                    <p className="text-xs text-gray-500 mt-1">{demande.dateDepot}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Missions */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-6">
            <h3 className="text-lg font-semibold text-white">Missions Récentes</h3>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {recentMissions.map((mission) => (
                <div key={mission.id} className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl border border-gray-200 hover:shadow-md transition-all">
                  <div>
                    <p className="font-medium text-gray-900">{mission.numeroMission}</p>
                    <p className="text-sm text-gray-500">{mission.typeMission}</p>
                  </div>
                  <div className="text-right">
                    <span className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full ${
                      mission.statut === 'terminée' 
                        ? 'bg-emerald-100 text-emerald-800'
                        : mission.statut === 'en_cours'
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-orange-100 text-orange-800'
                    }`}>
                      {mission.statut.replace('_', ' ')}
                    </span>
                    <p className="text-xs text-gray-500 mt-1">{mission.dateMission}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}