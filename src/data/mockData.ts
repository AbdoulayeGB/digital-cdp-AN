import { Demande, Entreprise, MissionControle, Recepisse, Statistiques } from '../types';

export const mockEntreprises: Entreprise[] = [
  {
    id: '1',
    nom: 'SONATEL SA',
    ninea: '0051234567890',
    adresse: '46 Boulevard de la République, Dakar',
    telephone: '+221 33 839 39 39',
    email: 'contact@sonatel.sn',
    secteurActivite: 'Télécommunications',
    dateInscription: '2023-01-15',
    statut: 'active',
    historiqueDemandes: [],
    historiqueMissions: []
  },
  {
    id: '2',
    nom: 'ECOBANK SÉNÉGAL',
    ninea: '0051234567891',
    adresse: 'Avenue Léopold Sédar Senghor, Dakar',
    telephone: '+221 33 849 24 24',
    email: 'info@ecobank.com',
    secteurActivite: 'Banque',
    dateInscription: '2023-02-10',
    statut: 'active',
    historiqueDemandes: [],
    historiqueMissions: []
  },
  {
    id: '3',
    nom: 'SGBS SA',
    ninea: '0051234567892',
    adresse: '19 Avenue Léopold Sédar Senghor, Dakar',
    telephone: '+221 33 839 05 00',
    email: 'contact@sgbs.sn',
    secteurActivite: 'Banque',
    dateInscription: '2023-03-05',
    statut: 'active',
    historiqueDemandes: [],
    historiqueMissions: []
  }
];

export const mockDemandes: Demande[] = [
  {
    id: '1',
    numeroReference: 'CDP-2024-001',
    typeDemande: 'autorisation',
    entreprise: {
      nom: 'SONATEL SA',
      ninea: '0051234567890',
      adresse: '46 Boulevard de la République, Dakar',
      telephone: '+221 33 839 39 39',
      email: 'contact@sonatel.sn',
      secteurActivite: 'Télécommunications'
    },
    dateDepot: '2024-01-15',
    statut: 'approuvée',
    dateTraitement: '2024-01-25',
    observations: 'Autorisation accordée pour le traitement des données clients'
  },
  {
    id: '2',
    numeroReference: 'CDP-2024-002',
    typeDemande: 'déclaration',
    entreprise: {
      nom: 'ECOBANK SÉNÉGAL',
      ninea: '0051234567891',
      adresse: 'Avenue Léopold Sédar Senghor, Dakar',
      telephone: '+221 33 849 24 24',
      email: 'info@ecobank.com',
      secteurActivite: 'Banque'
    },
    dateDepot: '2024-01-20',
    statut: 'en_cours',
    observations: 'Dossier en cours d\'examen'
  },
  {
    id: '3',
    numeroReference: 'CDP-2024-003',
    typeDemande: 'certification',
    entreprise: {
      nom: 'SGBS SA',
      ninea: '0051234567892',
      adresse: '19 Avenue Léopold Sédar Senghor, Dakar',
      telephone: '+221 33 839 05 00',
      email: 'contact@sgbs.sn',
      secteurActivite: 'Banque'
    },
    dateDepot: '2024-01-25',
    statut: 'en_attente',
    observations: 'Documents complémentaires requis'
  }
];

export const mockMissions: MissionControle[] = [
  {
    id: 1,
    numeroMission: 'M2024-001',
    entrepriseId: 1,
    dateMission: '2024-03-15',
    typeMission: 'controle_sur_place',
    statut: 'en_cours',
    lieu: 'Siège social',
    equipe: [
      { nom: 'Dr. Amadou Diallo', role: 'Chef de mission' },
      { nom: 'Mme. Fatoumata Touré', role: 'Contrôleur' }
    ],
    rapport: 'Rapport préliminaire en cours de rédaction',
    sanctions: null,
    suivi: 'Première visite effectuée'
  },
  {
    id: 2,
    numeroMission: 'M2024-002',
    entrepriseId: 2,
    dateMission: '2024-03-20',
    typeMission: 'controle_en_ligne',
    statut: 'planifie',
    lieu: 'Plateforme en ligne',
    equipe: [
      { nom: 'Dr. Amadou Diallo', role: 'Chef de mission' },
      { nom: 'M. Mamadou Keita', role: 'Expert technique' }
    ],
    rapport: null,
    sanctions: null,
    suivi: null
  },
  {
    id: 3,
    numeroMission: 'M2024-003',
    entrepriseId: 3,
    dateMission: '2024-03-25',
    typeMission: 'controle_simplifie',
    statut: 'termine',
    lieu: 'Agence régionale',
    equipe: [
      { nom: 'Mme. Fatoumata Touré', role: 'Chef de mission' },
      { nom: 'M. Mamadou Keita', role: 'Contrôleur' }
    ],
    rapport: 'Rapport final validé',
    sanctions: 'Avertissement',
    suivi: 'Suivi des recommandations en cours'
  }
];

export const mockRecepissés: Recepisse[] = [
  {
    id: '1',
    numeroRecepisse: 'REC-2024-001',
    demandeId: '1',
    dateEmission: '2024-01-25',
    typeDocument: 'Autorisation de traitement'
  },
  {
    id: '2',
    numeroRecepisse: 'REC-2024-002',
    demandeId: '2',
    dateEmission: '2024-02-15',
    typeDocument: 'Déclaration de conformité'
  },
  {
    id: '3',
    numeroRecepisse: 'REC-2024-003',
    demandeId: '3',
    dateEmission: '2024-03-01',
    typeDocument: 'Certification de sécurité'
  },
  {
    id: '4',
    numeroRecepisse: 'REC-2023-001',
    demandeId: '4',
    dateEmission: '2023-12-01',
    typeDocument: 'Autorisation de traitement'
  }
];

export const mockStatistiques: Statistiques = {
  totalDemandes: 3,
  demandesEnAttente: 1,
  demandesApprouvees: 1,
  totalEntreprises: 3,
  missionsEnCours: 1,
  missionsPlanifiees: 1
};