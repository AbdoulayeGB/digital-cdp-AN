import React, { useState, useEffect } from 'react';
import { Demande } from '../../../types';
import { v4 as uuidv4 } from 'uuid';

interface FormulaireAutorisationProps {
  onClose: () => void;
  onDemandeSubmitted: (newDemande: Demande) => void;
}

interface FormData {
  nomRaisonSociale: string;
  secteurActivite: string;
  rc: string;
  ninea: string;
  adresse: string;
  codePostal: string;
  ville: string;
  telephone: string;
  email: string;
  denominationTraitement: string;
  finaliteTraitement: string;
  texteJuridique: string;
  principesRespectes: string;
  categoriesPersonnes: string;
  autresCategories: string;
  typeTraitement: string;
  descriptionTraitementManuel: string;
  caracteristiquesSysteme: string;
  interconnexionsFichiers: string;
  fichiersConcernes: string;
  transfertDonnees: string;
  paysDestination: string;
  mesuresSecurite: string;
  sousTraitance: string;
  personnesConcerneesInformees: string;
  modalitesInformation: string;
  droitAcces: string;
}

export default function FormulaireAutorisation({ onClose, onDemandeSubmitted }: FormulaireAutorisationProps) {
  const [page, setPage] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    nomRaisonSociale: '',
    secteurActivite: '',
    rc: '',
    ninea: '',
    adresse: '',
    codePostal: '',
    ville: '',
    telephone: '',
    email: '',
    denominationTraitement: '',
    finaliteTraitement: '',
    texteJuridique: '',
    principesRespectes: '',
    categoriesPersonnes: '',
    autresCategories: '',
    typeTraitement: '',
    descriptionTraitementManuel: '',
    caracteristiquesSysteme: '',
    interconnexionsFichiers: '',
    fichiersConcernes: '',
    transfertDonnees: '',
    paysDestination: '',
    mesuresSecurite: '',
    sousTraitance: '',
    personnesConcerneesInformees: '',
    modalitesInformation: '',
    droitAcces: ''
  });
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});
  const totalPages = 7;

  const validatePage = (pageNumber: number): boolean => {
    const newErrors: Partial<Record<keyof FormData, string>> = {};
    let isValid = true;

    switch (pageNumber) {
      case 1:
        if (!formData.nomRaisonSociale.trim()) {
          newErrors.nomRaisonSociale = 'Ce champ est obligatoire';
          isValid = false;
        }
        if (!formData.secteurActivite.trim()) {
          newErrors.secteurActivite = 'Ce champ est obligatoire';
          isValid = false;
        }
        if (!formData.rc.trim()) {
          newErrors.rc = 'Ce champ est obligatoire';
          isValid = false;
        }
        if (!formData.ninea.trim()) {
          newErrors.ninea = 'Ce champ est obligatoire';
          isValid = false;
        }
        if (!formData.adresse.trim()) {
          newErrors.adresse = 'Ce champ est obligatoire';
          isValid = false;
        }
        if (!formData.codePostal.trim()) {
          newErrors.codePostal = 'Ce champ est obligatoire';
          isValid = false;
        }
        if (!formData.ville.trim()) {
          newErrors.ville = 'Ce champ est obligatoire';
          isValid = false;
        }
        if (!formData.telephone.trim()) {
          newErrors.telephone = 'Ce champ est obligatoire';
          isValid = false;
        }
        if (!formData.email.trim()) {
          newErrors.email = 'Ce champ est obligatoire';
          isValid = false;
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
          newErrors.email = 'Veuillez entrer une adresse email valide';
          isValid = false;
        }
        break;
      case 2:
        if (!formData.denominationTraitement.trim()) {
          newErrors.denominationTraitement = 'Ce champ est obligatoire';
          isValid = false;
        }
        if (!formData.finaliteTraitement.trim()) {
          newErrors.finaliteTraitement = 'Ce champ est obligatoire';
          isValid = false;
        }
        break;
      case 3:
        if (!formData.principesRespectes.trim()) {
          newErrors.principesRespectes = 'Ce champ est obligatoire';
          isValid = false;
        }
        break;
      case 4:
        if (!formData.categoriesPersonnes.trim()) {
          newErrors.categoriesPersonnes = 'Veuillez sélectionner au moins une catégorie';
          isValid = false;
        }
        if (formData.categoriesPersonnes.includes('autres') && !formData.autresCategories.trim()) {
          newErrors.autresCategories = 'Veuillez préciser les autres catégories';
          isValid = false;
        }
        if (!formData.typeTraitement.trim()) {
          newErrors.typeTraitement = 'Veuillez sélectionner le type de traitement';
          isValid = false;
        }
        if (formData.typeTraitement === 'manuel' && !formData.descriptionTraitementManuel.trim()) {
          newErrors.descriptionTraitementManuel = 'Ce champ est obligatoire';
          isValid = false;
        }
        if (formData.typeTraitement === 'electronique' && !formData.caracteristiquesSysteme.trim()) {
          newErrors.caracteristiquesSysteme = 'Ce champ est obligatoire';
          isValid = false;
        }
        break;
      case 5:
        if (!formData.interconnexionsFichiers.trim()) {
          newErrors.interconnexionsFichiers = 'Veuillez préciser si vous procédez à des interconnexions';
          isValid = false;
        }
        if (formData.interconnexionsFichiers === 'oui' && !formData.fichiersConcernes.trim()) {
          newErrors.fichiersConcernes = 'Veuillez préciser les fichiers concernés';
          isValid = false;
        }
        break;
      case 6:
        if (!formData.transfertDonnees.trim()) {
          newErrors.transfertDonnees = 'Veuillez préciser si vous transférez des données';
          isValid = false;
        }
        if (formData.transfertDonnees === 'oui' && !formData.paysDestination.trim()) {
          newErrors.paysDestination = 'Veuillez préciser le(s) pays de destination';
          isValid = false;
        }
        if (!formData.mesuresSecurite.trim()) {
          newErrors.mesuresSecurite = 'Veuillez décrire les mesures de sécurité mises en place';
          isValid = false;
        }
        break;
      case 7:
        if (!formData.personnesConcerneesInformees.trim()) {
          newErrors.personnesConcerneesInformees = 'Veuillez indiquer si les personnes concernées sont informées';
          isValid = false;
        }
        if (formData.personnesConcerneesInformees === 'oui' && !formData.modalitesInformation.trim()) {
          newErrors.modalitesInformation = 'Veuillez préciser les modalités d\'information';
          isValid = false;
        }
        if (!formData.droitAcces.trim()) {
          newErrors.droitAcces = 'Veuillez décrire les modalités d\'exercice du droit d\'accès';
          isValid = false;
        }
        break;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (name in errors) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
  };

  const handleNextPage = () => {
    if (validatePage(page)) {
      setPage(prevPage => prevPage + 1);
    }
  };

  const handlePreviousPage = () => {
    setPage(prevPage => prevPage - 1);
  };

  const getProgressPercentage = () => {
    return ((page - 1) / (totalPages - 1)) * 100;
  };

  const renderProgressBar = () => {
    return (
      <div className="w-full bg-gray-200 rounded-full h-2.5 mb-6">
        <div 
          className="bg-[#FFA500] h-2.5 rounded-full transition-all duration-300 ease-in-out"
          style={{ width: `${getProgressPercentage()}%` }}
        ></div>
      </div>
    );
  };

  const renderPageIndicator = () => {
    return (
      <div className="text-center text-sm text-gray-600 mb-6">
        Page {page} sur {totalPages}
      </div>
    );
  };

  const renderInputField = (
    id: keyof FormData,
    label: string,
    type: string = 'text',
    required: boolean = true,
    placeholder: string = ''
  ) => {
    return (
      <div>
        <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
        <input
          type={type}
          id={id as string}
          name={id as string}
          value={(formData[id] || '') as string}
          onChange={handleInputChange}
          placeholder={placeholder}
          className={`mt-1 block w-full px-4 py-2.5 border ${
            errors[id] ? 'border-red-500' : 'border-gray-300'
          } rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#FFA500] focus:border-transparent transition-colors`}
        />
        {errors[id] && (
          <p className="mt-1 text-sm text-red-500">{errors[id]}</p>
        )}
      </div>
    );
  };

  const renderTextAreaField = (
    id: keyof FormData,
    label: string,
    required: boolean = true,
    rows: number = 3,
    placeholder: string = ''
  ) => {
    return (
      <div>
        <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
        <textarea
          id={id as string}
          name={id as string}
          value={(formData[id] || '') as string}
          onChange={handleInputChange}
          rows={rows}
          placeholder={placeholder}
          className={`mt-1 block w-full px-4 py-2.5 border ${
            errors[id] ? 'border-red-500' : 'border-gray-300'
          } rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#FFA500] focus:border-transparent transition-colors`}
        />
        {errors[id] && (
          <p className="mt-1 text-sm text-red-500">{errors[id]}</p>
        )}
      </div>
    );
  };

  const renderCheckboxGroup = (
    id: keyof FormData,
    label: string,
    options: { value: string; label: string }[],
    required: boolean = true
  ) => {
    return (
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {options.map((option) => (
            <label key={option.value} className="inline-flex items-center">
              <input
                type="checkbox"
                name={id as string}
                value={option.value}
                checked={(formData[id] as string)?.includes(option.value) || false}
                onChange={(e) => {
                  const values = (formData[id] as string) ? (formData[id] as string).split(',') : [];
                  if (e.target.checked) {
                    values.push(option.value);
                  } else {
                    const index = values.indexOf(option.value);
                    if (index > -1) {
                      values.splice(index, 1);
                    }
                  }
                  setFormData(prev => ({
                    ...prev,
                    [id]: values.join(',')
                  }));
                }}
                className="form-checkbox h-4 w-4 text-[#FFA500] rounded focus:ring-[#FFA500]"
              />
              <span className="ml-2 text-gray-700">{option.label}</span>
            </label>
          ))}
        </div>
        {errors[id] && (
          <p className="mt-1 text-sm text-red-500">{errors[id]}</p>
        )}
      </div>
    );
  };

  const renderRadioGroup = (
    id: keyof FormData,
    label: string,
    options: { value: string; label: string }[],
    required: boolean = true
  ) => {
    return (
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
        <div className="space-y-2">
          {options.map((option) => (
            <label key={option.value} className="inline-flex items-center">
              <input
                type="radio"
                name={id as string}
                value={option.value}
                checked={formData[id] === option.value}
                onChange={(e) => {
                  setFormData(prev => ({
                    ...prev,
                    [id]: e.target.value
                  }));
                }}
                className="form-radio h-4 w-4 text-[#FFA500] focus:ring-[#FFA500]"
              />
              <span className="ml-2 text-gray-700">{option.label}</span>
            </label>
          ))}
        </div>
        {errors[id] && (
          <p className="mt-1 text-sm text-red-500">{errors[id]}</p>
        )}
      </div>
    );
  };

  const renderPageContent = () => {
    switch (page) {
      case 1:
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-800">1 - IDENTITE DU RESPONSABLE DU TRAITEMENT</h3>
            
            {renderInputField(
              'nomRaisonSociale',
              'Nom, Prénom (ou) raison sociale',
              'text',
              true,
              'Entrez le nom ou la raison sociale'
            )}

            {renderInputField(
              'secteurActivite',
              'Secteur d\'activité',
              'text',
              true,
              'Entrez le secteur d\'activité'
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {renderInputField(
                'rc',
                'RC',
                'text',
                true,
                'Entrez le numéro RC'
              )}

              {renderInputField(
                'ninea',
                'NINEA',
                'text',
                true,
                'Entrez le numéro NINEA'
              )}
            </div>

            {renderInputField(
              'adresse',
              'Adresse',
              'text',
              true,
              'Entrez l\'adresse complète'
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {renderInputField(
                'codePostal',
                'Code Postal',
                'text',
                true,
                'Entrez le code postal'
              )}

              {renderInputField(
                'ville',
                'Ville',
                'text',
                true,
                'Entrez la ville'
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {renderInputField(
                'telephone',
                'Téléphone',
                'tel',
                true,
                'Entrez le numéro de téléphone'
              )}

              {renderInputField(
                'email',
                'Email',
                'email',
                true,
                'Entrez l\'adresse email'
              )}
            </div>
          </div>
        );
      case 2:
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-800">2 - INTITULE DU TRAITEMENT</h3>
            
            {renderInputField(
              'denominationTraitement',
              'Dénomination du traitement envisagé',
              'text',
              true,
              'Entrez la dénomination du traitement'
            )}

            {renderTextAreaField(
              'finaliteTraitement',
              'Finalité du traitement',
              true,
              4,
              'Décrivez la finalité du traitement'
            )}

            {renderTextAreaField(
              'texteJuridique',
              'Texte juridique qui prévoit le traitement (si applicable)',
              false,
              4,
              'Précisez le texte juridique qui prévoit le traitement'
            )}
          </div>
        );
      case 3:
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-800">3 - PRINCIPES RELATIFS AU TRAITEMENT</h3>
            
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-medium text-gray-700 mb-2">Principes fondamentaux :</h4>
              <ul className="list-disc list-inside space-y-2 text-gray-600">
                <li>Licéité, loyauté et transparence</li>
                <li>Finalité déterminée, explicite et légitime</li>
                <li>Minimisation des données</li>
                <li>Exactitude des données</li>
                <li>Limitation de la conservation</li>
                <li>Intégrité et confidentialité</li>
                <li>Responsabilité</li>
              </ul>
            </div>

            {renderTextAreaField(
              'principesRespectes',
              'Comment ces principes sont-ils respectés ?',
              true,
              6,
              'Décrivez comment vous respectez ces principes dans votre traitement'
            )}
          </div>
        );
      case 4:
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-800">4 - CATÉGORIES DE PERSONNES CONCERNÉES</h3>
            
            {renderCheckboxGroup(
              'categoriesPersonnes',
              'Veuillez indiquer les catégories de personnes concernées par le traitement :',
              [
                { value: 'salaries', label: 'Salariés' },
                { value: 'clients', label: 'Clients' },
                { value: 'fournisseurs', label: 'Fournisseurs' },
                { value: 'adherents', label: 'Adhérents' },
                { value: 'usagers', label: 'Usagers' },
                { value: 'visiteurs', label: 'Visiteurs' },
                { value: 'autres', label: 'Autres' }
              ]
            )}

            {formData.categoriesPersonnes?.includes('autres') && (
              <div className="mt-4">
                {renderInputField(
                  'autresCategories',
                  'Précisez les autres catégories',
                  'text',
                  true,
                  'Entrez les autres catégories de personnes concernées'
                )}
              </div>
            )}

            <h3 className="text-lg font-semibold text-gray-800 mt-8">5 - TYPE DE TRAITEMENT</h3>
            
            {renderRadioGroup(
              'typeTraitement',
              'Veuillez préciser le type de traitement utilisé :',
              [
                { value: 'manuel', label: 'Traitement manuel' },
                { value: 'electronique', label: 'Traitement électronique' }
              ]
            )}

            {formData.typeTraitement === 'manuel' && (
              <div className="mt-4">
                {renderTextAreaField(
                  'descriptionTraitementManuel',
                  'Décrivez la procédure mise en œuvre',
                  true,
                  4,
                  'Décrivez en détail la procédure de traitement manuel'
                )}
              </div>
            )}

            {formData.typeTraitement === 'electronique' && (
              <div className="mt-4">
                {renderTextAreaField(
                  'caracteristiquesSysteme',
                  'Décrivez les caractéristiques techniques et les fonctionnalités du système',
                  true,
                  4,
                  'Décrivez en détail les caractéristiques techniques et les fonctionnalités du système'
                )}
              </div>
            )}
          </div>
        );
      case 5:
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-800">6 - INTERCONNEXION DE FICHIERS</h3>
            
            {renderRadioGroup(
              'interconnexionsFichiers',
              'Procédez-vous à des interconnexions de fichier ?',
              [
                { value: 'oui', label: 'Oui' },
                { value: 'non', label: 'Non' }
              ]
            )}

            {formData.interconnexionsFichiers === 'oui' && (
              <div className="mt-4">
                {renderTextAreaField(
                  'fichiersConcernes',
                  'Précisez les fichiers concernés',
                  true,
                  4,
                  'Listez et décrivez les fichiers concernés par l\'interconnexion'
                )}
              </div>
            )}

            <h3 className="text-lg font-semibold text-gray-800 mt-8">7 - TRANSFERTS DES DONNEES VERS UN PAYS TIERS</h3>
            
            {renderRadioGroup(
              'transfertDonnees',
              'Procédez-vous à des transferts de données vers un pays tiers ?',
              [
                { value: 'oui', label: 'Oui' },
                { value: 'non', label: 'Non' }
              ]
            )}

            {formData.transfertDonnees === 'oui' && (
              <div className="mt-4">
                {renderTextAreaField(
                  'paysDestination',
                  'Précisez le(s) pays de destination',
                  true,
                  4,
                  'Listez les pays de destination des données'
                )}
              </div>
            )}
          </div>
        );
      case 6:
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-800">8 - MESURES DE SÉCURITÉ</h3>
            
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-medium text-gray-700 mb-2">Mesures de sécurité recommandées :</h4>
              <ul className="list-disc list-inside space-y-2 text-gray-600">
                <li>Mesures techniques (chiffrement, contrôle d'accès, etc.)</li>
                <li>Mesures organisationnelles (procédures, formation, etc.)</li>
                <li>Mesures physiques (sécurité des locaux, etc.)</li>
              </ul>
            </div>

            {renderTextAreaField(
              'mesuresSecurite',
              'Décrivez les mesures de sécurité mises en place',
              true,
              6,
              'Décrivez en détail les mesures de sécurité techniques, organisationnelles et physiques'
            )}

            {renderTextAreaField(
              'sousTraitance',
              'Mesures relatives à la sous-traitance (le cas échéant)',
              false,
              4,
              'Décrivez les mesures spécifiques pour la sous-traitance'
            )}
          </div>
        );
      case 7:
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-800">9 - INFORMATION ET DROIT D'ACCES</h3>
            
            {renderRadioGroup(
              'personnesConcerneesInformees',
              'Les personnes concernées sont-elles informées ?',
              [
                { value: 'oui', label: 'Oui' },
                { value: 'non', label: 'Non' }
              ]
            )}

            {formData.personnesConcerneesInformees === 'oui' && (
              <div className="mt-4">
                {renderTextAreaField(
                  'modalitesInformation',
                  'Précisez les modalités d\'information',
                  true,
                  4,
                  'Décrivez comment les personnes sont informées'
                )}
              </div>
            )}

            {renderTextAreaField(
              'droitAcces',
              'Modalités d\'exercice du droit d\'accès',
              true,
              4,
              'Décrivez comment les personnes peuvent exercer leur droit d\'accès'
            )}
          </div>
        );
      default:
        return null;
    }
  };

  const handleSubmit = async () => {
    if (!validatePage(page)) {
      return;
    }

    try {
      const newDemande: Demande = {
        id: uuidv4(),
        type: 'autorisation',
        numeroReference: `DEM-${Date.now()}`,
        dateDepot: new Date().toISOString().split('T')[0],
        statut: 'en_attente',
        entreprise: {
          nom: formData.nomRaisonSociale
        },
        details: formData
      };

      onDemandeSubmitted(newDemande);

      alert('Formulaire soumis avec succès !');
      onClose();
    } catch (error) {
      console.error('Erreur lors de la soumission du formulaire :', error);
      alert('Une erreur est survenue lors de la soumission du formulaire. Veuillez réessayer.');
    }
  };

  const handleSaveDraft = () => {
    try {
      localStorage.setItem('formulaireAutorisationDraft', JSON.stringify(formData));
      alert('Brouillon sauvegardé avec succès !');
    } catch (error) {
      console.error('Erreur lors de la sauvegarde du brouillon :', error);
      alert('Une erreur est survenue lors de la sauvegarde du brouillon.');
    }
  };

  const loadDraft = () => {
    try {
      const savedDraft = localStorage.getItem('formulaireAutorisationDraft');
      if (savedDraft) {
        const draftData = JSON.parse(savedDraft);
        setFormData(draftData);
        alert('Brouillon chargé avec succès !');
      }
    } catch (error) {
      console.error('Erreur lors du chargement du brouillon :', error);
      alert('Une erreur est survenue lors du chargement du brouillon.');
    }
  };

  useEffect(() => {
    loadDraft();
  }, []);

  return (
    <div className="">
      <div className="mb-6">
        <p className="text-gray-600">Veuillez remplir tous les champs obligatoires</p>
      </div>

      {renderProgressBar()}
      {renderPageIndicator()}

      <div className="space-y-6">
        {renderPageContent()}
      </div>

      <div className="mt-8 flex justify-between items-center">
        <div className="flex space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
          >
            Annuler
          </button>
          <button
            onClick={handleSaveDraft}
            className="px-4 py-2 text-[#FFA500] hover:text-[#FF8C00] transition-colors"
          >
            Sauvegarder le brouillon
          </button>
        </div>
        <div className="flex space-x-3">
          {page > 1 && (
            <button 
              onClick={handlePreviousPage}
              className="px-6 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium"
            >
              Précédent
            </button>
          )}
          {page < totalPages ? (
            <button 
              onClick={handleNextPage}
              className="px-6 py-2 bg-[#FFA500] text-white rounded-lg hover:bg-[#FF8C00] transition-colors font-medium"
            >
              Suivant
            </button>
          ) : (
            <button 
              onClick={handleSubmit}
              className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
            >
              Soumettre
            </button>
          )}
        </div>
      </div>
    </div>
  );
} 