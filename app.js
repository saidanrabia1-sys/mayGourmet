
const express = require('express');

const app = express();

// API ROUTE pour la racine du site : localhost:3003

app.get('/', (req, res) => {
    // Message à afficher : Bienvenue chez MayGourmet
    res.write("<h1>Bienvenue chez MayGourmet</h1>");
    res.end();
});


// API ROUTE pour la page d'accueil localhost:3003/api/acceuil
app.get('/api/acceuil', (req, res) => {
    console.log("je passe dans /api/acceuil");

    // Le type d'encodage du texte retourné en réponse 
    res.setHeader('Content-Type', 'text/html; charset=utf-8');

    // Le contenu qui sera affiché côté navigateur web
    res.write("<p> Je suis à l'accueil</p>");

    // Terminer la réponse
    res.end();
});










module.exports = app;