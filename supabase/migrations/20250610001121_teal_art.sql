/*
  # Schéma initial pour la plateforme CDP

  1. Nouvelles tables
    - `users` - Utilisateurs de la plateforme
    - `entreprises` - Entreprises enregistrées
    - `demandes` - Demandes soumises par les entreprises
    - `missions_controle` - Missions de contrôle
    - `recepissés` - Récépissés émis
    - `deplacements` - Déplacements liés aux missions
    - `courriers` - Courriers échangés
    - `documents` - Documents uploadés

  2. Sécurité
    - Enable RLS sur toutes les tables
    - Politiques d'accès basées sur les rôles
*/

-- Table des utilisateurs
CREATE TABLE IF NOT EXISTS users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  name text NOT NULL,
  password_hash text NOT NULL,
  role text NOT NULL CHECK (role IN ('admin', 'demandeur', 'agent cdp')),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Table des entreprises
CREATE TABLE IF NOT EXISTS entreprises (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  nom text NOT NULL,
  ninea text UNIQUE NOT NULL,
  adresse text NOT NULL,
  telephone text NOT NULL,
  email text NOT NULL,
  secteur_activite text NOT NULL,
  date_inscription date DEFAULT CURRENT_DATE,
  statut text NOT NULL DEFAULT 'active' CHECK (statut IN ('active', 'suspendue', 'radiée')),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Table des demandes
CREATE TABLE IF NOT EXISTS demandes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  numero_reference text UNIQUE NOT NULL,
  type_demande text NOT NULL,
  entreprise_id uuid REFERENCES entreprises(id) ON DELETE CASCADE,
  date_depot date DEFAULT CURRENT_DATE,
  statut text NOT NULL DEFAULT 'en_attente' CHECK (statut IN ('en_attente', 'en_cours', 'approuvée', 'rejetée')),
  date_traitement date,
  observations text,
  details jsonb NOT NULL DEFAULT '{}',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Table des missions de contrôle
CREATE TABLE IF NOT EXISTS missions_controle (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  numero_mission text UNIQUE NOT NULL,
  entreprise_id uuid REFERENCES entreprises(id) ON DELETE CASCADE,
  date_mission date NOT NULL,
  type_mission text NOT NULL CHECK (type_mission IN ('controle_sur_place', 'controle_en_ligne', 'controle_simplifie', 'suite_plainte', 'suite_pleniere')),
  statut text NOT NULL DEFAULT 'planifiée' CHECK (statut IN ('planifiée', 'en_cours', 'terminée')),
  lieu text NOT NULL,
  equipe text[] DEFAULT '{}',
  rapport text,
  sanctions text,
  suivi text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Table des récépissés
CREATE TABLE IF NOT EXISTS recepissés (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  numero_recepisse text UNIQUE NOT NULL,
  demande_id uuid REFERENCES demandes(id) ON DELETE CASCADE,
  date_emission date DEFAULT CURRENT_DATE,
  type_document text NOT NULL,
  validite_jusqu_au date,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Table des déplacements
CREATE TABLE IF NOT EXISTS deplacements (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  mission_id uuid REFERENCES missions_controle(id) ON DELETE CASCADE,
  date_deplacement date NOT NULL,
  lieu text NOT NULL,
  participants text[] DEFAULT '{}',
  observations text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Table des courriers
CREATE TABLE IF NOT EXISTS courriers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  mission_id uuid REFERENCES missions_controle(id) ON DELETE CASCADE,
  date_courrier date NOT NULL,
  type_courrier text NOT NULL CHECK (type_courrier IN ('envoye', 'recu')),
  objet text NOT NULL,
  contenu text NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Table des documents
CREATE TABLE IF NOT EXISTS documents (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  mission_id uuid REFERENCES missions_controle(id) ON DELETE CASCADE,
  deplacement_id uuid REFERENCES deplacements(id) ON DELETE CASCADE,
  courrier_id uuid REFERENCES courriers(id) ON DELETE CASCADE,
  nom text NOT NULL,
  type_document text NOT NULL,
  url text NOT NULL,
  taille bigint,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  CONSTRAINT documents_reference_check CHECK (
    (mission_id IS NOT NULL AND deplacement_id IS NULL AND courrier_id IS NULL) OR
    (mission_id IS NULL AND deplacement_id IS NOT NULL AND courrier_id IS NULL) OR
    (mission_id IS NULL AND deplacement_id IS NULL AND courrier_id IS NOT NULL)
  )
);

-- Enable RLS
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE entreprises ENABLE ROW LEVEL SECURITY;
ALTER TABLE demandes ENABLE ROW LEVEL SECURITY;
ALTER TABLE missions_controle ENABLE ROW LEVEL SECURITY;
ALTER TABLE recepissés ENABLE ROW LEVEL SECURITY;
ALTER TABLE deplacements ENABLE ROW LEVEL SECURITY;
ALTER TABLE courriers ENABLE ROW LEVEL SECURITY;
ALTER TABLE documents ENABLE ROW LEVEL SECURITY;

-- Politiques RLS pour les utilisateurs
CREATE POLICY "Users can read own data" ON users
  FOR SELECT TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Admins can read all users" ON users
  FOR SELECT TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

CREATE POLICY "Admins can insert users" ON users
  FOR INSERT TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM users 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

CREATE POLICY "Admins can update users" ON users
  FOR UPDATE TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

CREATE POLICY "Admins can delete users" ON users
  FOR DELETE TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Politiques RLS pour les entreprises
CREATE POLICY "All authenticated users can read entreprises" ON entreprises
  FOR SELECT TO authenticated
  USING (true);

CREATE POLICY "Admins and agents can manage entreprises" ON entreprises
  FOR ALL TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users 
      WHERE id = auth.uid() AND role IN ('admin', 'agent cdp')
    )
  );

-- Politiques RLS pour les demandes
CREATE POLICY "All authenticated users can read demandes" ON demandes
  FOR SELECT TO authenticated
  USING (true);

CREATE POLICY "All authenticated users can insert demandes" ON demandes
  FOR INSERT TO authenticated
  WITH CHECK (true);

CREATE POLICY "Admins and agents can update demandes" ON demandes
  FOR UPDATE TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users 
      WHERE id = auth.uid() AND role IN ('admin', 'agent cdp')
    )
  );

-- Politiques RLS pour les missions
CREATE POLICY "All authenticated users can read missions" ON missions_controle
  FOR SELECT TO authenticated
  USING (true);

CREATE POLICY "Admins and agents can manage missions" ON missions_controle
  FOR ALL TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users 
      WHERE id = auth.uid() AND role IN ('admin', 'agent cdp')
    )
  );

-- Politiques RLS pour les récépissés
CREATE POLICY "All authenticated users can read recepissés" ON recepissés
  FOR SELECT TO authenticated
  USING (true);

CREATE POLICY "Admins and agents can manage recepissés" ON recepissés
  FOR ALL TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users 
      WHERE id = auth.uid() AND role IN ('admin', 'agent cdp')
    )
  );

-- Politiques RLS pour les déplacements
CREATE POLICY "All authenticated users can read deplacements" ON deplacements
  FOR SELECT TO authenticated
  USING (true);

CREATE POLICY "Admins and agents can manage deplacements" ON deplacements
  FOR ALL TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users 
      WHERE id = auth.uid() AND role IN ('admin', 'agent cdp')
    )
  );

-- Politiques RLS pour les courriers
CREATE POLICY "All authenticated users can read courriers" ON courriers
  FOR SELECT TO authenticated
  USING (true);

CREATE POLICY "Admins and agents can manage courriers" ON courriers
  FOR ALL TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users 
      WHERE id = auth.uid() AND role IN ('admin', 'agent cdp')
    )
  );

-- Politiques RLS pour les documents
CREATE POLICY "All authenticated users can read documents" ON documents
  FOR SELECT TO authenticated
  USING (true);

CREATE POLICY "Admins and agents can manage documents" ON documents
  FOR ALL TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users 
      WHERE id = auth.uid() AND role IN ('admin', 'agent cdp')
    )
  );

-- Indexes pour améliorer les performances
CREATE INDEX IF NOT EXISTS idx_demandes_entreprise_id ON demandes(entreprise_id);
CREATE INDEX IF NOT EXISTS idx_demandes_statut ON demandes(statut);
CREATE INDEX IF NOT EXISTS idx_missions_entreprise_id ON missions_controle(entreprise_id);
CREATE INDEX IF NOT EXISTS idx_missions_statut ON missions_controle(statut);
CREATE INDEX IF NOT EXISTS idx_recepissés_demande_id ON recepissés(demande_id);
CREATE INDEX IF NOT EXISTS idx_deplacements_mission_id ON deplacements(mission_id);
CREATE INDEX IF NOT EXISTS idx_courriers_mission_id ON courriers(mission_id);
CREATE INDEX IF NOT EXISTS idx_documents_mission_id ON documents(mission_id);
CREATE INDEX IF NOT EXISTS idx_documents_deplacement_id ON documents(deplacement_id);
CREATE INDEX IF NOT EXISTS idx_documents_courrier_id ON documents(courrier_id);