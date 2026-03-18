// j'importe le framewordk Expressjs.
const express = require('express');

// J'importe le pilote Mysql2 utilisé interroger la BDD Mysql
const mysql2 = require("mysql2");

// J'importe le pilote express-myconnection utilisé pour me connecter à la BDD
const myconnection = require('express-myconnection');
const connection = require('express-myconnection');

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));


// Je configure les éléments attendus pour me connecter à Mysql
const optionsConnexioBaseDeDonnees = {
    host: "localhost",
    user: "root",
    password: "Alma12.2025",
    database: "maygourmet",
    port: 3306
};

// Middleware pour se connecter à la BDD Mysql pool est la stratégie de connexion à la BDD Mysql
app.use(myconnection(mysql2,optionsConnexioBaseDeDonnees,"pool"));

// Je précise que les vues sont dans le dossier views
app.set('views', './views');

// Je précise que nous utilisons le moteur EJS pour les vues
app.set('view engine', 'ejs');

// Je précise que j'utilise le dossier 'public' qui contient les fichiers statics
app.use(express.static('public'));


//  API Route pour la racine de la page : localhost:3004/
app.get('/', (req, res) => {
    // Message à afficher : Bienvenue chez May Gourmet
    res.write("<h1> Bienvenue chez May Gourmet </h1>");
    res.end();
});

// API route pour la page d'accueil
app.get("/api/accueil", (req, res) => {
    console.log(" Je passe dans /api/accueil");

    res.render('accueil');

    // Le type d'encodage du tex
    //res.writeHead(200,{ "content-type": "text/html;charset=utf-8"})

    // Le conten qui seraa affiché côté navigateur 
    //res.write("<p> Je suis à l'accueil </p>");

    // Fin de la réponse
    //res.end();
});

app.get("/api/equipe", (req, res) => {
    console.log(" Je passe dans /api/equipe");

    // 1. Je me connecte à la BDD grâce à la méthode getconnection
    req.getConnection((erreur, connection) => {
        // Je vérifie s'il y a une erreur lors de la connexion à la BDD
        if(erreur){
            console.log(erreur);
        } else{
            connection.query("SELECT * FROM equipe", [], (err,resultatsEquipe) => {
                if (erreur) {
                    console.log("Erreur dans la requête Sql SELECT");
                } else{
                    console.log("Mon équipe:", resultatsEquipe);

                    // Je retourne au client le résultat de la requpete Sql 
                    res.render("equipe", {resultatsEquipe});
                }
            });
                
            
        }
    });

   
});

/**
 * API pour ajouter un membre d'équipe.
 * Le membre sera inséré dans la table equipe
 */



// J'ajoute un fournisseur dans la table fournisseur pour cela j'utilise la méthode POST
app.post('/api/fournisseur', (req, res) => {
    console.log("corps de la requête : ", req.body);

    console.log(req.body.nom);
    const nomFournisseur = req.body.nom;

    console.log(req.body.responsable);
    const posteFournisseur= req.body.poste;

    console.log(req.body.email);
    const mailFournisseur = req.body.email;

    console.log(req.body.telephone);
    const telephoneFournisseur = req.body.telephoneFournisseur;

    console.log(req.body.adresse_postale);
    const adresseFournisseur = req.body.adresse_postale;

    console.log(req.body.Presentation);
    const descriptionFournisseur = req.body.Presentation;

    
    console.log(req.body.Presentation);
    const villeFournisseur = req.body.ville;

    
    console.log(req.body.Presentation);
    const dateFournisseur = req.body.date_recrutement;


    const requeteSql = "INSERT INTO fournisseur (nom, mail, telephone, adresse, ville, description) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";

    const ordreChamps = [nomFournisseur,mailFournisseur, telephoneFournisseur, adresseFournisseur, villeFournisseur, descriptionFournisseur]; 

    // Je me connecte à la base de données
    req.getConnection((erreur, connection) => {
        if(erreur) {
            console.log("Erreur de connxion à la base de données : ", erreur);

        } else{ // Si j'ai réussi à me connecter à la base de données
            connection.query(requeteSql, ordreChamps, (erreur,nouveauFournisseur) => {
                if(erreur) {
                    console.log("Erreur d'ajout fournisseur :", erreur);
                } else{
                    console.log("Bravo! Nouveau fournisseur ajoute");
                    res.status(200).redirect("/api/accueil");
                }

            });
        }
    });
    

});

app.get("/plats", (req, res) => {
    req.getConnection((err, connection) => {
        connection.query("SELECT * FROM plats", (err, resultatsPlats) => {
            res.render("plats", { resultatsPlats });
        });
    });
});

app.get('/api/fournisseur', (req, res) => {
    res.render('fournisseur');
});

// API route pour supprimer un membre de l'equipe 
// exemple : localhoste:3003/api/equipe/1
app.delete('/api/equipe/:id', (req, res) => {
    const idMenmbreEquipe = req.params.id;
    const queryDelete = "DELETE FROM equipe WHERE id = ?";
    
    req.getConnection((erreur, connection) => {
        if(erreur) {
            console.log("Erreur supression equipe :", erreur);
        } else {
            connection.query(queryDelete, [idMenmbreEquipe], (err, resultat) => {
                if(err){
                    console.log("Erreur requete Suppression");
                } else {
                    console.log("Bravo! Le membre est supprimé dans la table equipe")
                    // res.status(200).redirect("/api/acceuil")
                    res.status(200).json({ routeAcceuil: "/api/acceuil"});              
                }

            })
        }
    });

});

app.get("/contact", (req, res) => {
    console.log("Je passe dans /contact");

    // Connexion à la BDD
    req.getConnection((erreur, connection) => {

        if (erreur) {
            console.log(erreur);
            return res.status(500).send("Erreur de connexion à la base de données");
        }

        // Exemple : récupérer les infos de contact (ou équipe)
        connection.query("SELECT * FROM equipe", [], (err, resultatsContact) => {

            if (err) {
                console.log("Erreur dans la requête SQL SELECT");
                return res.status(500).send("Erreur serveur");
            }

            console.log("Contacts :", resultatsContact);

            // Envoi vers la vue contact.ejs
            res.render("contact", { resultatsContact });
        });
    });
});

//fin du fichier. Donc ne pas coder en dessous de celui-ci
module.exports = app;

