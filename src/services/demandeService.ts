import { supabase } from '../lib/supabase';

export interface Demande {
  id: string;
  numero_reference: string;
  type_demande: string;
  entreprise_id: string;
  date_depot: string;
  statut: 'en_attente' | 'en_cours' | 'approuvée' | 'rejetée';
  date_traitement?: string | null;
  observations?: string | null;
  details: any;
  created_at: string;
  updated_at: string;
  // Relations
  entreprise?: {
    nom: string;
    ninea: string;
    email: string;
  };
}

export const getDemandes = async (): Promise<Demande[]> => {
  try {
    const { data, error } = await supabase
      .from('demandes')
      .select(`
        *,
        entreprise:entreprises(nom, ninea, email)
      `)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Erreur lors de la récupération des demandes:', error);
      return [];
    }

    return data || [];
  } catch (error) {
    console.error('Erreur lors de la récupération des demandes:', error);
    return [];
  }
};

export const getDemandeById = async (id: string): Promise<Demande | null> => {
  try {
    const { data, error } = await supabase
      .from('demandes')
      .select(`
        *,
        entreprise:entreprises(nom, ninea, email)
      `)
      .eq('id', id)
      .single();

    if (error) {
      console.error('Erreur lors de la récupération de la demande:', error);
      return null;
    }

    return data;
  } catch (error) {
    console.error('Erreur lors de la récupération de la demande:', error);
    return null;
  }
};

export const createDemande = async (demande: Omit<Demande, 'id' | 'created_at' | 'updated_at' | 'entreprise'>) => {
  try {
    const { data, error } = await supabase
      .from('demandes')
      .insert(demande)
      .select()
      .single();

    if (error) {
      throw new Error(error.message);
    }

    return data;
  } catch (error) {
    console.error('Erreur lors de la création de la demande:', error);
    throw error;
  }
};

export const updateDemande = async (id: string, demande: Partial<Demande>) => {
  try {
    const { data, error } = await supabase
      .from('demandes')
      .update({ ...demande, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      throw new Error(error.message);
    }

    return data;
  } catch (error) {
    console.error('Erreur lors de la mise à jour de la demande:', error);
    throw error;
  }
};

export const deleteDemande = async (id: string) => {
  try {
    const { error } = await supabase
      .from('demandes')
      .delete()
      .eq('id', id);

    if (error) {
      throw new Error(error.message);
    }
  } catch (error) {
    console.error('Erreur lors de la suppression de la demande:', error);
    throw error;
  }
};

export const generateNumeroReference = (): string => {
  const year = new Date().getFullYear();
  const timestamp = Date.now();
  return `CDP-${year}-${timestamp.toString().slice(-6)}`;
};