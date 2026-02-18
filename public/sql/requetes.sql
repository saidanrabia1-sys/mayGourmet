-- Créer la base de données
CREATE DATABASE maygourmet;
-- Afficher les bases de données
SHOW DATABASES;

-- Crééer la table equipe
CREATE TABLE equipe (
    id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    nom VARCHAR(155) NOT NULL,
    ville VARCHAR(150) NOT NULL,
    mail VARCHAR(100), -- ce champ est facultatif
    telephone VARCHAR(100) NOT NULL,
    poste VARCHAR(80) NOT NULL,
    adresse_postale VARCHAR(250),
    presentation VARCHAR (255),
    date_recrutement DATE
);

-- Afficher les tables existante
SHOW TABLES;

-- Ajouter un membre dans l'équipe
INSERT INTO equipe (nom, ville, mail, telephone, poste, adresse_postale, presentation, date_recrutement)
VALUES('Ameli', 'Paris', 'ameli@maygourmet.fr', '0123456789', 'Chef de cuisine', '123 Rue de la Paix', 'Chef expérimenté avec 10 ans d’expérience dans la restauration.', '2023-05-15');


 ('ANRABIA', 'Nice', 'anrabia@maygourmet.fr', '0645678901', 'Serveur',
 '9 Rue Masséna',
 'Serveur dynamique et souriant, avec une bonne expérience en restauration haut de gamme.',
 '2023-01-18'),

 ('SAID', 'Toulouse', 'said@maygourmet.fr', '0656789012', 'Commis de cuisine',
 '33 Rue Alsace Lorraine',
 'Jeune commis motivé, passionné par la gastronomie et le travail en équipe.',
 '2024-02-01');


DELETE FROM equipe WHERE ID = 2;

-- Modifier un champ pour une ligne spécifique
update equipe set nom = 'Alma' where id = 2;


-- =========================================
-- TABLE FOURNISSEUR
-- =========================================



-- Création de la table fournisseur
CREATE TABLE IF NOT EXISTS fournisseur (
    id_fournisseur INT AUTO_INCREMENT PRIMARY KEY,
    nom VARCHAR(150) NOT NULL,
    ville VARCHAR(100) NOT NULL,
    telephone VARCHAR(20) NOT NULL,
    mail VARCHAR(100) UNIQUE,
    adresse VARCHAR(255),
    description VARCHAR(255),
    presentation_fournisseur VARCHAR(255)
    -- j'associe la table fournisseur a la table produit en utilisant l'ID_produit 
    -- L'ID_produit provient de la table produit 

    FOREIGN KEY (id_produit) REFERENCES produit(id_produit)
);

SHOW TABLES;

-- creation de la table produit


CREATE TABLE produit (
    id_produit INT AUTO_INCREMENT PRIMARY KEY,
    nom VARCHAR(150) NOT NULL,
    description TEXT,
    prix DECIMAL(10,2) NOT NULL,
    categorie VARCHAR(100),
    disponibilite BOOLEAN DEFAULT TRUE,
    origine VARCHAR(100),
    type_culture VARCHAR(100),
    -- j'associe la table produit a la table fournisseur en utilisant l'ID_fournisseur les identifiants de la table fournisseur
    id_fournisseur INT NOT NULL,
    FOREIGN KEY (id_fournisseur) REFERENCES fournisseur(id_fournisseur)

);

-- Ajouter 4 fournisseurs
INSERT INTO fournisseur 
(nom, poste, mail, telephone, ville, adresse_postale, date_recrutement, presentation)
VALUES
('FreshFood', 'Paris', 'contact@freshfood.fr', '0102030405',
 'Paris', '123 Rue de la Paix', '2024-01-10',
 'Spécialiste des produits frais de la région parisienne'),

('BioMarket', 'Lyon', 'info@biomarket.fr', '0607080910',
 'Lyon', '456 Avenue des Champs-Élysées', '2024-02-15',
 'Spécialiste des produits biologiques de la région lyonnaise'),

('SaveursDuSud', 'Marseille', 'contact@saveursdusud.fr', '0411223344',
 'Marseille', '789 Boulevard Sainte-Catherine', '2024-03-01',
 'Spécialiste des produits du Sud de la France'),

('NordFrais', 'Lille', 'nordfrais@mail.fr', '0320112233',
 'Lille', '321 Rue du Nord', '2024-04-05',
 'Spécialiste des produits du Nord de la France');

-- 10. Afficher les fournisseurs
SELECT * FROM fournisseur;


-- 11. Modifier un fournisseur
UPDATE fournisseur
SET nom = 'BioMarket France'
WHERE id_fournisseur = 2;

-- 12. Supprimer un fournisseur
DELETE FROM fournisseur
WHERE id_fournisseur = 4;
-- =========================================
-- TABLE PLAT
-- =========================================

-- 13. Création de la table plat
CREATE TABLE IF NOT EXISTS plat (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nom VARCHAR(150) NOT NULL,
    prix DECIMAL(6,2) NOT NULL,
    description VARCHAR(255),
);

-- 14. Ajouter 5 plats
INSERT INTO plat (nom, prix, description) 
VALUES
('Poulet rôti', 12.50, 'Poulet rôti aux herbes de Provence'),
('Lasagnes', 11.00, 'Lasagnes maison à la bolognaise'),
('Salade César', 9.50, 'Salade César avec poulet grillé'),
('Burger gourmet', 14.00, 'Burger au bœuf et fromage affiné'),
('Tiramisu', 6.00, 'Dessert italien au café');

-- 15. Afficher les plats
SELECT * FROM plat;

-- 16. Modifier un plat
UPDATE plat
SET nom = 'Burger gourmet deluxe'
WHERE id = 4;

-- 17. Supprimer un plat
DELETE FROM plat
WHERE id = 2;


