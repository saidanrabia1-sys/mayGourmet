
const http = require('http');
const app = require('./app');

const serveur = http.createServer(app);


const numeroPort = 3003;

app.set('port', numeroPort);

serveur.listen(numeroPort,() => {
    console.log('serveur démarré sur le port ' + numeroPort );
});

