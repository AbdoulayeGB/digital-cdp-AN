import React, { useState } from 'react';
import { X, Upload } from 'lucide-react';

interface NewCourrierModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (courrier: {
    date: Date;
    type: 'envoye' | 'recu';
    objet: string;
    contenu: string;
    documents: File[];
  }) => void;
}

export default function NewCourrierModal({ isOpen, onClose, onSave }: NewCourrierModalProps) {
  const [date, setDate] = useState('');
  const [type, setType] = useState<'envoye' | 'recu'>('envoye');
  const [objet, setObjet] = useState('');
  const [contenu, setContenu] = useState('');
  const [documents, setDocuments] = useState<File[]>([]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setDocuments([...documents, ...Array.from(e.target.files)]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      date: new Date(date),
      type,
      objet,
      contenu,
      documents
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-2xl w-full shadow-2xl">
        <div className="flex justify-between items-center p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Nouveau courrier</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Date du courrier
              </label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#FFA500] focus:border-[#FFA500]"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Type de courrier
              </label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value as 'envoye' | 'recu')}
                className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#FFA500] focus:border-[#FFA500]"
              >
                <option value="envoye">Courrier envoyé</option>
                <option value="recu">Courrier reçu</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Objet
            </label>
            <input
              type="text"
              value={objet}
              onChange={(e) => setObjet(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#FFA500] focus:border-[#FFA500]"
              placeholder="Objet du courrier"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Contenu
            </label>
            <textarea
              value={contenu}
              onChange={(e) => setContenu(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#FFA500] focus:border-[#FFA500]"
              rows={6}
              placeholder="Contenu du courrier"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Documents joints
            </label>
            <div className="border-2 border-dashed border-gray-300 rounded-xl p-6">
              <input
                type="file"
                multiple
                onChange={handleFileChange}
                className="hidden"
                id="file-upload"
              />
              <label
                htmlFor="file-upload"
                className="flex flex-col items-center justify-center cursor-pointer"
              >
                <Upload className="w-8 h-8 text-gray-400 mb-2" />
                <span className="text-sm text-gray-600">
                  Glissez-déposez vos fichiers ici ou cliquez pour sélectionner
                </span>
              </label>
            </div>
            {documents.length > 0 && (
              <div className="mt-4 space-y-2">
                {documents.map((file, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between px-4 py-2 bg-gray-50 rounded-lg"
                  >
                    <span className="text-sm text-gray-600">{file.name}</span>
                    <button
                      type="button"
                      onClick={() => setDocuments(documents.filter((_, i) => i !== index))}
                      className="text-gray-500 hover:text-gray-700"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
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