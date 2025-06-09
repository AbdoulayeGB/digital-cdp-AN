import React, { useState } from 'react';
import { X, Save } from 'lucide-react';
import { mockEntreprises } from '../../data/mockData';
import { MissionControle } from '../../types';

interface NewMissionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (mission: Omit<MissionControle, 'id'>) => void;
}

export default function NewMissionModal({ isOpen, onClose, onSave }: NewMissionModalProps) {
  const [formData, setFormData] = useState({
    numeroMission: '',
    entrepriseId: '',
    dateMission: '',
    typeMission: 'inspection' as const,
    statut: 'planifiée' as const,
    lieu: '',
    equipe: [''] as string[],
    rapport: '',
    sanctions: '',
    suivi: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  const handleEquipeChange = (index: number, value: string) => {
    const newEquipe = [...formData.equipe];
    newEquipe[index] = value;
    setFormData({ ...formData, equipe: newEquipe });
  };

  const addEquipeMember = () => {
    setFormData({ ...formData, equipe: [...formData.equipe, ''] });
  };

  const removeEquipeMember = (index: number) => {
    const newEquipe = formData.equipe.filter((_, i) => i !== index);
    setFormData({ ...formData, equipe: newEquipe });
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedDate = e.target.value;
    const today = new Date();
    const missionDate = new Date(selectedDate);
    
    // Si la date est dans le futur, définir automatiquement le statut à "planifie"
    if (missionDate > today) {
      setFormData({
        ...formData,
        dateMission: selectedDate,
        statut: 'planifie'
      });
    } else {
      setFormData({
        ...formData,
        dateMission: selectedDate
      });
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-900">Nouvelle Mission</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Numéro de Mission
              </label>
              <input
                type="text"
                value={formData.numeroMission}
                onChange={(e) => setFormData({ ...formData, numeroMission: e.target.value })}
                className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Entreprise
              </label>
              <select
                value={formData.entrepriseId}
                onChange={(e) => setFormData({ ...formData, entrepriseId: e.target.value })}
                className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              >
                <option value="">Sélectionner une entreprise</option>
                {mockEntreprises.map((entreprise) => (
                  <option key={entreprise.id} value={entreprise.id}>
                    {entreprise.nom}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Date de la mission
              </label>
              <input
                type="date"
                value={formData.dateMission}
                onChange={handleDateChange}
                className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Type de Mission
              </label>
              <select
                value={formData.typeMission}
                onChange={(e) => setFormData({ ...formData, typeMission: e.target.value as 'controle_sur_place' | 'controle_en_ligne' | 'controle_simplifie' | 'suite_plainte' | 'suite_pleniere' })}
                className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              >
                <option value="controle_sur_place">Contrôle sur place</option>
                <option value="controle_en_ligne">Contrôle en ligne</option>
                <option value="controle_simplifie">Contrôle simplifié</option>
                <option value="suite_plainte">Suite à une plainte</option>
                <option value="suite_pleniere">Suite séance plénière</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Lieu
              </label>
              <input
                type="text"
                value={formData.lieu}
                onChange={(e) => setFormData({ ...formData, lieu: e.target.value })}
                className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Statut
              </label>
              <select
                value={formData.statut}
                onChange={(e) => setFormData({ ...formData, statut: e.target.value as 'planifie' | 'en_cours' | 'termine' })}
                className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              >
                <option value="planifie">Planifiée</option>
                <option value="en_cours">En cours</option>
                <option value="termine">Terminée</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Équipe
            </label>
            <div className="space-y-2">
              {formData.equipe.map((membre, index) => (
                <div key={index} className="flex gap-2">
                  <input
                    type="text"
                    value={membre}
                    onChange={(e) => handleEquipeChange(index, e.target.value)}
                    className="flex-1 px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Nom du membre"
                    required
                  />
                  {index > 0 && (
                    <button
                      type="button"
                      onClick={() => removeEquipeMember(index)}
                      className="px-3 py-2 text-red-600 hover:bg-red-50 rounded-xl transition-colors"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  )}
                </div>
              ))}
              <button
                type="button"
                onClick={addEquipeMember}
                className="text-sm text-blue-600 hover:text-blue-700"
              >
                + Ajouter un membre
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Rapport
            </label>
            <textarea
              value={formData.rapport}
              onChange={(e) => setFormData({ ...formData, rapport: e.target.value })}
              className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              rows={3}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Sanctions
            </label>
            <textarea
              value={formData.sanctions}
              onChange={(e) => setFormData({ ...formData, sanctions: e.target.value })}
              className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              rows={2}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Suivi
            </label>
            <textarea
              value={formData.suivi}
              onChange={(e) => setFormData({ ...formData, suivi: e.target.value })}
              className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              rows={2}
            />
          </div>

          <div className="flex justify-end gap-4 pt-4 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-xl transition-colors"
            >
              Annuler
            </button>
            <button
              type="submit"
              className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors"
            >
              <Save className="w-5 h-5 mr-2" />
              Enregistrer
            </button>
          </div>
        </form>
      </div>
    </div>
  );
} 