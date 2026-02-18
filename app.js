
const express = require('express');
// J'importe Mysql2 utilisé interroger la BDD mysql
const Mysql2 = require("mysql2"); 

// J'importe le pilote express-myconnection utilisé pour me connecter à la BDD
const myconnection = require("express-myconnection");
const connection = require('express-myconnection');

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

const optionsConnexionBaseDeDonnees = {
    host: "localhost",
    user: "root",
    password: "Alma12.2025",
    database:  "maygourmet",
    port: 3306
};

// Middleware pour se connecter à la base de données MySQL
app.use(myconnection(Mysql2, optionsConnexionBaseDeDonnees, "pool"));

// Je précise que les vues sont dans le dossier 'views'
app.set('views', './views');

// je préciceque nous utilison EJS pour las vues
app.set('view engine', 'ejs');

// Je pr"cise que j'utilise le dossier 'public'qui contient les fichiers statiques
app.use(express.static('public'));


// API ROUTE pour la racine du site : localhost:3003

app.get('/', (req, res) => {
    // Message à afficher : Bienvenue chez MayGourmet
    res.write("<h1>Bienvenue chez MayGourmet</h1>");
    res.end();
});


//API ROUTE pour la page d'accueil localhost:3003/api/acceuil
app.get('/api/acceuil', (req, res) => {
    console.log("je passe dans /api/acceuil");
    res.render('acceuil');

});

app.get('/api/equipe', (req, res) => {
    console.log("Je passe dans la route API REST /api/equipe");

    req.getConnection((erreur, connection) => {

        if (erreur) {
            console.log("Erreur de connexion : ", erreur);
            return res.status(500).send("Erreur de connexion à la base de données");
        }

        connection.query("SELECT * FROM equipe", [], (erreur, resultatsEquipe) => {

            if (erreur) {
                console.log("Erreur dans la requête SQL : ", erreur);
                return res.status(500).send("Erreur lors de la récupération des équipes");
            }

            console.log("Mon équipe : ", resultatsEquipe);

            // ON RENVOIE LES DONNÉES À LA VUE ICI
            res.render('equipe', { resultatsEquipe });

        });
    });
});



    /* Le type d'encodage du texte retourné en réponse 
    res.setHeader('Content-Type', 'text/html; charset=utf-8');

    // Le contenu qui sera affiché côté navigateur web
    res.write("<p> Je suis à l'accueil</p>");

    // Terminer la réponse
    res.end();
}); */


// J'ajoute un fouurnisseur dans la table fournisseur. Pour cela, j'utilise la méthode POST
app.post('/api/fournisseur', (req, res) => {
    console.log("Je passe dans la route API REST /api/fournisseur");
    req.getConnection((erreur, connection) => {
        if (erreur) {
            console.log("Erreur de connexion : ", erreur);
            return res.status(500).send("Erreur de connexion à la base de données");
        }
        const nouveauFournisseur = {
            nom: "Fournisseur 1",
            ville: "Paris"
        };
        connection.query("INSERT INTO fournisseur SET ?", [nouveauFournisseur], (erreur, resultat) => {
            if (erreur) {
                console.log("Erreur dans la requête SQL : ", erreur);
                return res.status(500).send("Erreur lors de l'ajout du fournisseur");
            }
            console.log("Fournisseur ajouté avec succès, ID : ", resultat.insertId);
            res.status(201).send("Fournisseur ajouté avec succès");
        });
    });
    });


    
    app.post('/api/fournisseur', (req, res)=> {
        console.log("Corps de la requête : ", req.body);
        const nom = req.body.nom;
        const emailFournisseur = req.body.emailFournisseur;
        const telephoneFournisseur = req.body.telephoneFournisseur;
        const villeFournisseur = req.body.villeFournisseur;
        const adressePostaleFournisseur = req.body.adressePostaleFournisseur;
        const dateFournisseur = req.body.dateFournisseur;
        const presentationFournisseur = req.body.presentationFournisseur;

        const requeteSql = `INSERT INTO fournisseur(nom, poste, mail, telephone, ville, adresse_postale, date_recrutement, 
        presentation)VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;


        const ordreChamps = [nomFournisseur, emailFournisseur, telephoneFournisseur, villeFournisseur,
        adressePostaleFournisseur, dateFournisseur, presentationFournisseur];


    });

    app.post('/api/fournisseur', (req, res)=> {
        req.getConnection((erreur, connection) => {
              if(erreur) {
            console.log("Erreur de connekion à la BDD : ", erreur);
        } else {
            connection.query(requeteSql, ordreChamps, (err,
                nouveauFournisseur) => {
                if(err){
                    console.log("Erreur d'ajout fournisseur :", err);
                }    
                })
        }


        })
      
    });







module.exports = app;