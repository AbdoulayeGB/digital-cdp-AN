export interface Demande {
  id: string;
  numeroReference: string;
  typeDemande: 'autorisation' | 'déclaration' | 'certification';
  entreprise: {
    nom: string;
    ninea: string;
    adresse: string;
    telephone: string;
    email: string;
    secteurActivite: string;
  };
  dateDepot: string;
  statut: 'en_attente' | 'en_cours' | 'approuvée' | 'rejetée';
  dateTraitement?: string;
  observations?: string;
}

export interface Recepisse {
  id: string;
  numeroRecepisse: string;
  demandeId: string;
  dateEmission: string;
  validiteJusquau: string;
  typeDocument: string;
}

export interface MissionControle {
  id: string;
  numeroMission: string;
  entrepriseId: string;
  dateMission: string;
  typeMission: 'inspection' | 'audit' | 'enquete';
  statut: 'planifiée' | 'en_cours' | 'terminée';
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