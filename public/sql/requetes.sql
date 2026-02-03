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