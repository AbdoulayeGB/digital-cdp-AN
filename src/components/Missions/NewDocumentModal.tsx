import React, { useState } from 'react';
import { X, Upload } from 'lucide-react';

interface NewDocumentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (document: {
    nom: string;
    type: string;
    file: File;
  }) => void;
}

export default function NewDocumentModal({ isOpen, onClose, onSave }: NewDocumentModalProps) {
  const [nom, setNom] = useState('');
  const [type, setType] = useState('');
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      if (!nom) {
        setNom(e.target.files[0].name);
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (file) {
      onSave({
        nom,
        type,
        file
      });
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-lg w-full shadow-2xl">
        <div className="flex justify-between items-center p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Ajouter un document</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Nom du document
            </label>
            <input
              type="text"
              value={nom}
              onChange={(e) => setNom(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#FFA500] focus:border-[#FFA500]"
              placeholder="Nom du document"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Type de document
            </label>
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#FFA500] focus:border-[#FFA500]"
              required
            >
              <option value="">Sélectionnez un type</option>
              <option value="rapport">Rapport</option>
              <option value="photo">Photo</option>
              <option value="courrier">Courrier</option>
              <option value="autre">Autre</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Fichier
            </label>
            <div className="border-2 border-dashed border-gray-300 rounded-xl p-6">
              <input
                type="file"
                onChange={handleFileChange}
                className="hidden"
                id="file-upload"
                required
              />
              <label
                htmlFor="file-upload"
                className="flex flex-col items-center justify-center cursor-pointer"
              >
                <Upload className="w-8 h-8 text-gray-400 mb-2" />
                <span className="text-sm text-gray-600">
                  Glissez-déposez votre fichier ici ou cliquez pour sélectionner
                </span>
              </label>
            </div>
            {file && (
              <div className="mt-4">
                <div className="flex items-center justify-between px-4 py-2 bg-gray-50 rounded-lg">
                  <span className="text-sm text-gray-600">{file.name}</span>
                  <button
                    type="button"
                    onClick={() => setFile(null)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </div>

          <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-700 bg-gray-100 rounded-xl hover:bg-gray-200 transition-colors"
            >
              Annuler
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-[#FFA500] text-white rounded-xl hover:bg-[#FF8C00] transition-colors"
            >
              Enregistrer
            </button>
          </div>
        </form>
      </div>
    </div>
  );
} 