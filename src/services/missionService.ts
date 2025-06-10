import { supabase } from '../lib/supabase';

export interface MissionControle {
  id: string;
  numero_mission: string;
  entreprise_id: string;
  date_mission: string;
  type_mission: 'controle_sur_place' | 'controle_en_ligne' | 'controle_simplifie' | 'suite_plainte' | 'suite_pleniere';
  statut: 'planifiée' | 'en_cours' | 'terminée';
  lieu: string;
  equipe: string[];
  rapport?: string | null;
  sanctions?: string | null;
  suivi?: string | null;
  created_at: string;
  updated_at: string;
  // Relations
  entreprise?: {
    nom: string;
    ninea: string;
    email: string;
  };
}

export const getMissions = async (): Promise<MissionControle[]> => {
  try {
    const { data, error } = await supabase
      .from('missions_controle')
      .select(`
        *,
        entreprise:entreprises(nom, ninea, email)
      `)
      .order('date_mission', { ascending: false });

    if (error) {
      console.error('Erreur lors de la récupération des missions:', error);
      return [];
    }

    return data || [];
  } catch (error) {
    console.error('Erreur lors de la récupération des missions:', error);
    return [];
  }
};

export const getMissionById = async (id: string): Promise<MissionControle | null> => {
  try {
    const { data, error } = await supabase
      .from('missions_controle')
      .select(`
        *,
        entreprise:entreprises(nom, ninea, email)
      `)
      .eq('id', id)
      .single();

    if (error) {
      console.error('Erreur lors de la récupération de la mission:', error);
      return null;
    }

    return data;
  } catch (error) {
    console.error('Erreur lors de la récupération de la mission:', error);
    return null;
  }
};

export const createMission = async (mission: Omit<MissionControle, 'id' | 'created_at' | 'updated_at' | 'entreprise'>) => {
  try {
    const { data, error } = await supabase
      .from('missions_controle')
      .insert(mission)
      .select()
      .single();

    if (error) {
      throw new Error(error.message);
    }

    return data;
  } catch (error) {
    console.error('Erreur lors de la création de la mission:', error);
    throw error;
  }
};

export const updateMission = async (id: string, mission: Partial<MissionControle>) => {
  try {
    const { data, error } = await supabase
      .from('missions_controle')
      .update({ ...mission, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      throw new Error(error.message);
    }

    return data;
  } catch (error) {
    console.error('Erreur lors de la mise à jour de la mission:', error);
    throw error;
  }
};

export const deleteMission = async (id: string) => {
  try {
    const { error } = await supabase
      .from('missions_controle')
      .delete()
      .eq('id', id);

    if (error) {
      throw new Error(error.message);
    }
  } catch (error) {
    console.error('Erreur lors de la suppression de la mission:', error);
    throw error;
  }
};