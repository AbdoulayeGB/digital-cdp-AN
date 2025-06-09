import bcrypt from 'bcryptjs';

export const generatePasswordHash = async (password: string): Promise<string> => {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
};

// Fonction pour vérifier si un hash correspond à un mot de passe
export const verifyPassword = async (password: string, hash: string): Promise<boolean> => {
  return bcrypt.compare(password, hash);
}; 