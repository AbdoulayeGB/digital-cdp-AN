export interface Demande {
  id: string;
  type: string; // e.g., 'avis', 'autorisation'
  numeroReference: string;
  dateDepot: string;
  statut: 'en_attente' | 'en_cours' | 'approuvée' | 'rejetée';
  entreprise: {
    nom: string;
  };
  details: any; // Données spécifiques du formulaire (e.g., formData from Avis or Autorisation)
}

export interface Recepisse {
  id: string;
  numeroRecepisse: string;
  demandeId: string;
  dateEmission: string;
  typeDocument: string;
}

export interface MissionControle {
  id: string;
  numeroMission: string;
  entrepriseId: string;
  dateMission: string;
  typeMission: 'controle_sur_place' | 'controle_en_ligne' | 'controle_simplifie';
  statut: 'planifiée' | 'en_cours' | 'terminée';
  lieu: string;
  equipe: string[];
  rapport?: string;
  sanctions?: string;
  suivi?: string;
}

export interface Entreprise {
  id: string;
  nom: string;
  ninea: string;
  adresse: string;
  telephone: string;
  email: string;
  secteurActivite: string;
  dateInscription: string;
  statut: 'active' | 'suspendue' | 'radiée';
  historiqueDemandes: Demande[];
  historiqueMissions: MissionControle[];
}

export interface Statistiques {
  totalDemandes: number;
  demandesEnAttente: number;
  demandesApprouvees: number;
  totalEntreprises: number;
  missionsEnCours: number;
  missionsPlanifiees: number;
}