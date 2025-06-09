import bcrypt from 'bcryptjs';
import { v4 as uuidv4 } from 'uuid';

export interface User {
  id: string;
  name: string;
  email: string;
  password?: string;
  role: 'admin' | 'demandeur' | 'agent cdp';
}

const ADMIN_EMAIL = 'abdoulaye.niang@cdp.sn';
const ADMIN_PASSWORD = 'passer';
const ADMIN_NAME = 'Abdoulaye Niang';

const USERS_STORAGE_KEY = 'app_users';

export const getStoredUsers = (): User[] => {
  const usersJson = localStorage.getItem(USERS_STORAGE_KEY);
  return usersJson ? JSON.parse(usersJson) : [];
};

export const storeUsers = (users: User[]) => {
  localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
};

export const initializeAdminUser = async () => {
  let users = getStoredUsers();

  // Seulement initialiser l'admin si AUCUN utilisateur n'existe encore
  if (users.length === 0) {
    let hashedPassword = ADMIN_PASSWORD;
    try {
      if (bcrypt && bcrypt.hash) {
        hashedPassword = await bcrypt.hash(ADMIN_PASSWORD, 10);
      }
    } catch (e) {
      console.warn("bcrypt non disponible pour le hachage du mot de passe admin, stockage en texte brut. Ceci est un avertissement de développement.", e);
    }

    const adminUser: User = {
      id: uuidv4(),
      email: ADMIN_EMAIL,
      password: hashedPassword,
      role: 'admin',
      name: ADMIN_NAME,
    };
    users.push(adminUser);
    storeUsers(users);
  }
};

export const authenticateUser = (email: string, password: string): Promise<User | null> => {
  return new Promise(async (resolve) => {
    try {
      const users = getStoredUsers();

      const foundUser = users.find(user => user.email === email);

      if (foundUser) {
        try {
          const passwordMatch = await bcrypt.compare(password, foundUser.password);

          if (passwordMatch) {
            const { password: _, ...userWithoutPassword } = foundUser;
            resolve(userWithoutPassword as User);
          } else {
            resolve(null);
          }
        } catch (bcryptError) {
          console.error('Erreur lors de la comparaison des mots de passe:', bcryptError);
          resolve(null);
        }
      } else {
        resolve(null);
      }
    } catch (error) {
      console.error("Erreur lors de l'authentification:", error);
      resolve(null);
    }
  });
};

export const addUser = async (newUser: Omit<User, 'id' | 'password'> & { passwordPlain: string }) => {
  try {
    const users = getStoredUsers();

    // Vérifier si l'utilisateur existe déjà
    const existingUser = users.find(user => user.email === newUser.email);
    if (existingUser) {
      throw new Error('Un utilisateur avec cet email existe déjà');
    }

    const hashedPassword = await bcrypt.hash(newUser.passwordPlain, 10);
    const userWithId: User = {
      ...newUser,
      id: uuidv4(),
      password: hashedPassword
    };

    users.push(userWithId);
    storeUsers(users);

    return userWithId;
  } catch (error) {
    console.error('Erreur lors de la création de l\'utilisateur:', error);
    throw error;
  }
};

export const updateUser = async (updatedUser: Omit<User, 'password'> & { passwordPlain?: string }) => {
  let users = getStoredUsers();
  const userToUpdate = users.find(u => u.id === updatedUser.id);

  if (!userToUpdate) return null; // User not found

  let hashedPassword = userToUpdate.password; // Keep existing hash by default
  if (updatedUser.passwordPlain) {
    hashedPassword = await bcrypt.hash(updatedUser.passwordPlain, 10);
  }

  const finalUser: User = {
    ...updatedUser as User, // Cast to User after handling password
    password: hashedPassword
  };

  users = users.map(user => user.id === finalUser.id ? finalUser : user);
  storeUsers(users);
  return finalUser;
};

export const deleteUser = (userId: string) => {
  const users = getStoredUsers();
  const filteredUsers = users.filter(user => user.id !== userId);
  storeUsers(filteredUsers);
}; 