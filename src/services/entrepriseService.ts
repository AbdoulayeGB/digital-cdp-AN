import { supabase } from '../lib/supabase';

export interface Entreprise {
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
}

export const getEntreprises = async (): Promise<Entreprise[]> => {
  try {
    const { data, error } = await supabase
      .from('entreprises')
      .select('*')
      .order('nom');

    if (error) {
      console.error('Erreur lors de la récupération des entreprises:', error);
      return [];
    }

    return data || [];
  } catch (error) {
    console.error('Erreur lors de la récupération des entreprises:', error);
    return [];
  }
};

export const getEntrepriseById = async (id: string): Promise<Entreprise | null> => {
  try {
    const { data, error } = await supabase
      .from('entreprises')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      console.error('Erreur lors de la récupération de l\'entreprise:', error);
      return null;
    }

    return data;
  } catch (error) {
    console.error('Erreur lors de la récupération de l\'entreprise:', error);
    return null;
  }
};

export const createEntreprise = async (entreprise: Omit<Entreprise, 'id' | 'created_at' | 'updated_at'>) => {
  try {
    const { data, error } = await supabase
      .from('entreprises')
      .insert(entreprise)
      .select()
      .single();

    if (error) {
      throw new Error(error.message);
    }

    return data;
  } catch (error) {
    console.error('Erreur lors de la création de l\'entreprise:', error);
    throw error;
  }
};

export const updateEntreprise = async (id: string, entreprise: Partial<Entreprise>) => {
  try {
    const { data, error } = await supabase
      .from('entreprises')
      .update({ ...entreprise, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      throw new Error(error.message);
    }

    return data;
  } catch (error) {
    console.error('Erreur lors de la mise à jour de l\'entreprise:', error);
    throw error;
  }
};

export const deleteEntreprise = async (id: string) => {
  try {
    const { error } = await supabase
      .from('entreprises')
      .delete()
      .eq('id', id);

    if (error) {
      throw new Error(error.message);
    }
  } catch (error) {
    console.error('Erreur lors de la suppression de l\'entreprise:', error);
    throw error;
  }
};