import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Types pour TypeScript
export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string;
          email: string;
          name: string;
          password_hash: string;
          role: 'admin' | 'demandeur' | 'agent cdp';
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          email: string;
          name: string;
          password_hash: string;
          role: 'admin' | 'demandeur' | 'agent cdp';
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          email?: string;
          name?: string;
          password_hash?: string;
          role?: 'admin' | 'demandeur' | 'agent cdp';
          created_at?: string;
          updated_at?: string;
        };
      };
      entreprises: {
        Row: {
          id: string;
          nom: string;
          ninea: string;
          adresse: string;
          telephone: string;
          email: string;
          secteur_activite: string;
          date_inscription: string;
          statut: 'active' | 'suspendue' | 'radiée';
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          nom: string;
          ninea: string;
          adresse: string;
          telephone: string;
          email: string;
          secteur_activite: string;
          date_inscription?: string;
          statut?: 'active' | 'suspendue' | 'radiée';
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          nom?: string;
          ninea?: string;
          adresse?: string;
          telephone?: string;
          email?: string;
          secteur_activite?: string;
          date_inscription?: string;
          statut?: 'active' | 'suspendue' | 'radiée';
          created_at?: string;
          updated_at?: string;
        };
      };
      demandes: {
        Row: {
          id: string;
          numero_reference: string;
          type_demande: string;
          entreprise_id: string;
          date_depot: string;
          statut: 'en_attente' | 'en_cours' | 'approuvée' | 'rejetée';
          date_traitement: string | null;
          observations: string | null;
          details: any;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          numero_reference: string;
          type_demande: string;
          entreprise_id: string;
          date_depot?: string;
          statut?: 'en_attente' | 'en_cours' | 'approuvée' | 'rejetée';
          date_traitement?: string | null;
          observations?: string | null;
          details?: any;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          numero_reference?: string;
          type_demande?: string;
          entreprise_id?: string;
          date_depot?: string;
          statut?: 'en_attente' | 'en_cours' | 'approuvée' | 'rejetée';
          date_traitement?: string | null;
          observations?: string | null;
          details?: any;
          created_at?: string;
          updated_at?: string;
        };
      };
      missions_controle: {
        Row: {
          id: string;
          numero_mission: string;
          entreprise_id: string;
          date_mission: string;
          type_mission: 'controle_sur_place' | 'controle_en_ligne' | 'controle_simplifie' | 'suite_plainte' | 'suite_pleniere';
          statut: 'planifiée' | 'en_cours' | 'terminée';
          lieu: string;
          equipe: string[];
          rapport: string | null;
          sanctions: string | null;
          suivi: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          numero_mission: string;
          entreprise_id: string;
          date_mission: string;
          type_mission: 'controle_sur_place' | 'controle_en_ligne' | 'controle_simplifie' | 'suite_plainte' | 'suite_pleniere';
          statut?: 'planifiée' | 'en_cours' | 'terminée';
          lieu: string;
          equipe?: string[];
          rapport?: string | null;
          sanctions?: string | null;
          suivi?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          numero_mission?: string;
          entreprise_id?: string;
          date_mission?: string;
          type_mission?: 'controle_sur_place' | 'controle_en_ligne' | 'controle_simplifie' | 'suite_plainte' | 'suite_pleniere';
          statut?: 'planifiée' | 'en_cours' | 'terminée';
          lieu?: string;
          equipe?: string[];
          rapport?: string | null;
          sanctions?: string | null;
          suivi?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      recepissés: {
        Row: {
          id: string;
          numero_recepisse: string;
          demande_id: string;
          date_emission: string;
          type_document: string;
          validite_jusqu_au: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          numero_recepisse: string;
          demande_id: string;
          date_emission?: string;
          type_document: string;
          validite_jusqu_au?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          numero_recepisse?: string;
          demande_id?: string;
          date_emission?: string;
          type_document?: string;
          validite_jusqu_au?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      deplacements: {
        Row: {
          id: string;
          mission_id: string;
          date_deplacement: string;
          lieu: string;
          participants: string[];
          observations: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          mission_id: string;
          date_deplacement: string;
          lieu: string;
          participants?: string[];
          observations?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          mission_id?: string;
          date_deplacement?: string;
          lieu?: string;
          participants?: string[];
          observations?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      courriers: {
        Row: {
          id: string;
          mission_id: string;
          date_courrier: string;
          type_courrier: 'envoye' | 'recu';
          objet: string;
          contenu: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          mission_id: string;
          date_courrier: string;
          type_courrier: 'envoye' | 'recu';
          objet: string;
          contenu: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          mission_id?: string;
          date_courrier?: string;
          type_courrier?: 'envoye' | 'recu';
          objet?: string;
          contenu?: string;
          created_at?: string;
          updated_at?: string;
        };
      };
      documents: {
        Row: {
          id: string;
          mission_id: string | null;
          deplacement_id: string | null;
          courrier_id: string | null;
          nom: string;
          type_document: string;
          url: string;
          taille: number | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          mission_id?: string | null;
          deplacement_id?: string | null;
          courrier_id?: string | null;
          nom: string;
          type_document: string;
          url: string;
          taille?: number | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          mission_id?: string | null;
          deplacement_id?: string | null;
          courrier_id?: string | null;
          nom?: string;
          type_document?: string;
          url?: string;
          taille?: number | null;
          created_at?: string;
          updated_at?: string;
        };
      };
    };
  };
}