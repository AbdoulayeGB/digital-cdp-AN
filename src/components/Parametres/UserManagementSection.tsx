import React, { useState, useEffect, useCallback } from 'react';
import { User } from '../../data/auth'; 
import { getStoredUsers, addUser, updateUser, deleteUser } from '../../data/auth';

export default function UserManagementSection() {
  const [username, setUsername] = useState(''); 
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState<User['role']>('demandeur'); 
  const [users, setUsers] = useState<User[]>([]); 
  const [editingUser, setEditingUser] = useState<User | null>(null);

  const loadUsers = useCallback(() => {
    const storedUsers = getStoredUsers();
    setUsers(storedUsers.map(user => ({ ...user, password: '' }))); // Ne pas stocker les mots de passe dans l'état local
  }, []);

  useEffect(() => {
    loadUsers();
  }, [loadUsers]);

  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim() && password.trim()) {
      try {
        await addUser({
          email: username,
          name: username,
          role: userType,
          passwordPlain: password
        });
        loadUsers(); // Recharger la liste des utilisateurs après création
        setUsername('');
        setPassword('');
        setUserType('demandeur'); 
        alert(`Utilisateur \'${username}\' (${userType}) créé avec succès !`);
      } catch (error) {
        console.error("Erreur lors de la création de l'utilisateur:", error);
        alert("Erreur lors de la création de l'utilisateur.");
      }
    } else {
      alert("Veuillez remplir tous les champs.");
    }
  };

  const handleEditUser = (user: User) => {
    setEditingUser(user);
    setUsername(user.email);
    setPassword(''); 
    setUserType(user.role);
  };

  const handleUpdateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editingUser && username.trim()) {
      try {
        const updatedUserData: Omit<User, 'password'> & { passwordPlain?: string } = {
          id: editingUser.id,
          email: username,
          name: username,
          role: userType,
        };
        if (password.trim()) {
          updatedUserData.passwordPlain = password;
        }

        await updateUser(updatedUserData);
        loadUsers(); // Recharger la liste des utilisateurs après mise à jour
        setEditingUser(null);
        setUsername('');
        setPassword('');
        setUserType('demandeur');
        alert(`Utilisateur \'${username}\' mis à jour avec succès !`);
      } catch (error) {
        console.error("Erreur lors de la mise à jour de l'utilisateur:", error);
        alert("Erreur lors de la mise à jour de l'utilisateur.");
      }
    } else {
      alert("Veuillez remplir au moins le nom d'utilisateur (email).");
    }
  };

  const handleDeleteUser = async (id: string) => {
    // Vérifier si l'utilisateur est l'admin principal
    const userToDelete = users.find(user => user.id === id);
    if (userToDelete?.email === 'abdoulaye.niang@cdp.sn') {
      alert("L'utilisateur administrateur principal ne peut pas être supprimé.");
      return;
    }

    if (window.confirm("Êtes-vous sûr de vouloir supprimer cet utilisateur ?")) {
      try {
        deleteUser(id);
        loadUsers(); // Recharger la liste des utilisateurs après suppression
        alert("Utilisateur supprimé.");
      } catch (error) {
        console.error("Erreur lors de la suppression de l'utilisateur:", error);
        alert("Erreur lors de la suppression de l'utilisateur.");
      }
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mt-6">
      <h3 className="text-xl font-semibold text-gray-900 mb-4">Gestion des Utilisateurs</h3>
      <p className="text-gray-600 mb-6">Ajouter, modifier ou supprimer des comptes utilisateurs.</p>

      <div className="mb-8">
        <h4 className="text-lg font-semibold text-gray-800 mb-3">{editingUser ? 'Modifier l\'utilisateur' : 'Créer un nouvel utilisateur'}</h4>
        <form onSubmit={editingUser ? handleUpdateUser : handleCreateUser} className="space-y-4">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">Nom d'utilisateur (Email)</label>
            <input
              type="email"
              id="username"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-[#FFA500] focus:border-[#FFA500]"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Mot de passe {editingUser && '(Laisser vide pour ne pas changer)'}</label>
            <input
              type="password"
              id="password"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-[#FFA500] focus:border-[#FFA500]"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              {...(!editingUser && { required: true })} 
            />
          </div>
          <div>
            <label htmlFor="userType" className="block text-sm font-medium text-gray-700">Type d'utilisateur</label>
            <select
              id="userType"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-[#FFA500] focus:border-[#FFA500]"
              value={userType}
              onChange={(e) => setUserType(e.target.value as User['role'])}
            >
              <option value="admin">Admin</option>
              <option value="demandeur">Demandeur</option>
              <option value="agent cdp">Agent CDP</option>
            </select>
          </div>
          <button 
            type="submit"
            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-[#FFA500] hover:bg-[#FF8C00] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#FFA500]"
          >
            {editingUser ? 'Mettre à jour l\'utilisateur' : 'Créer utilisateur'}
          </button>
          {editingUser && (
            <button
              type="button"
              onClick={() => { setEditingUser(null); setUsername(''); setPassword(''); setUserType('demandeur'); }} 
              className="ml-3 inline-flex justify-center py-2 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Annuler la modification
            </button>
          )}
        </form>
      </div>

      <div>
        <h4 className="text-lg font-semibold text-gray-800 mb-3">Liste des utilisateurs</h4>
        {users.length === 0 ? (
          <p className="text-gray-500">Aucun utilisateur créé pour l'instant.</p>
        ) : (
          <ul className="space-y-2">
            {users.map((user) => (
              <li key={user.id} className="flex items-center justify-between bg-gray-50 p-3 rounded-md border border-gray-200">
                <span className="font-medium text-gray-900">{user.email} - <span className="text-gray-600">{user.role}</span></span>
                <div>
                  <button 
                    onClick={() => handleEditUser(user)}
                    className="text-indigo-600 hover:text-indigo-900 text-sm font-medium mr-2"
                  >
                    Modifier
                  </button>
                  <button 
                    onClick={() => handleDeleteUser(user.id)}
                    className="text-red-600 hover:text-red-900 text-sm font-medium"
                  >
                    Supprimer
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
} 