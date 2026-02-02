CREATE TABLE equipe (
    id INT PRIMARY KEY NOT NULL 
    AUTO_INCREMENT,
    nom VARCHAR(155) NOT NULL,
    ville VARCHAR(150) NOT NULL,
    mail VARCHAR(100), -- ce champ est facultatif
    telephone VARCHAR(100) NOT NULL,
    poste VARCHAR(80) NOT NULL,
    adresse_postale VARCHAR(250),
    presentation VARCHAR (255),
);