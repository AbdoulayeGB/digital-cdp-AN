import { supabase } from '../lib/supabase';
import bcrypt from 'bcryptjs';

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'demandeur' | 'agent cdp';
}

export const initializeAdminUser = async () => {
  try {
    // Vérifier si l'admin existe déjà
    const { data: existingAdmin } = await supabase
      .from('users')
      .select('id')
      .eq('email', 'abdoulaye.niang@cdp.sn')
      .single();

    if (!existingAdmin) {
      const hashedPassword = await bcrypt.hash('passer', 10);
      
      const { error } = await supabase
        .from('users')
        .insert({
          email: 'abdoulaye.niang@cdp.sn',
          name: 'Abdoulaye Niang',
          password_hash: hashedPassword,
          role: 'admin'
        });

      if (error) {
        console.error('Erreur lors de la création de l\'admin:', error);
      }
    }
  } catch (error) {
    console.error('Erreur lors de l\'initialisation de l\'admin:', error);
  }
};

export const authenticateUser = async (email: string, password: string): Promise<User | null> => {
  try {
    const { data: user, error } = await supabase
      .from('users')
      .select('*')
      .eq('email', email)
      .single();

    if (error || !user) {
      return null;
    }

    const passwordMatch = await bcrypt.compare(password, user.password_hash);
    
    if (passwordMatch) {
      return {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role
      };
    }

    return null;
  } catch (error) {
    console.error('Erreur lors de l\'authentification:', error);
    return null;
  }
};

export const getStoredUsers = async (): Promise<User[]> => {
  try {
    const { data: users, error } = await supabase
      .from('users')
      .select('id, name, email, role');

    if (error) {
      console.error('Erreur lors de la récupération des utilisateurs:', error);
      return [];
    }

    return users || [];
  } catch (error) {
    console.error('Erreur lors de la récupération des utilisateurs:', error);
    return [];
  }
};

export const addUser = async (newUser: Omit<User, 'id'> & { passwordPlain: string }) => {
  try {
    const hashedPassword = await bcrypt.hash(newUser.passwordPlain, 10);
    
    const { data, error } = await supabase
      .from('users')
      .insert({
        email: newUser.email,
        name: newUser.name,
        password_hash: hashedPassword,
        role: newUser.role
      })
      .select()
      .single();

    if (error) {
      throw new Error(error.message);
    }

    return data;
  } catch (error) {
    console.error('Erreur lors de la création de l\'utilisateur:', error);
    throw error;
  }
};

export const updateUser = async (updatedUser: Omit<User, 'password'> & { passwordPlain?: string }) => {
  try {
    const updateData: any = {
      email: updatedUser.email,
      name: updatedUser.name,
      role: updatedUser.role,
      updated_at: new Date().toISOString()
    };

    if (updatedUser.passwordPlain) {
      updateData.password_hash = await bcrypt.hash(updatedUser.passwordPlain, 10);
    }

    const { data, error } = await supabase
      .from('users')
      .update(updateData)
      .eq('id', updatedUser.id)
      .select()
      .single();

    if (error) {
      throw new Error(error.message);
    }

    return data;
  } catch (error) {
    console.error('Erreur lors de la mise à jour de l\'utilisateur:', error);
    throw error;
  }
};

export const deleteUser = async (userId: string) => {
  try {
    const { error } = await supabase
      .from('users')
      .delete()
      .eq('id', userId);

    if (error) {
      throw new Error(error.message);
    }
  } catch (error) {
    console.error('Erreur lors de la suppression de l\'utilisateur:', error);
    throw error;
  }
};