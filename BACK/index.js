import express from 'express';
import * as dotenv from 'dotenv';
// import https from 'https';
// import fs from "fs";
import cors from "cors";
import cookieParser from 'cookie-parser';
// option possible: activer HSTS (Strict Transport Security HSTS est utilisé pour indiquer aux 
// navigateurs de toujours utiliser HTTPS pour accéder à votre site, même si l'utilisateur saisit 
// http:// dans la barre d'adresse.) 

import router from './app/router.js';



dotenv.config();
const app = express();
const port = process.env.PORT || 3001
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());


// // Route to test https
// app.get("/", (req, res) => {
//     res.send("WELCOME TO THE BASIC EXPRESS APP WITH AN HTTPS SERVER");
// });

// gestion of CORS
app.use(cors({
    // origin: ['http://localhost:1234', 
    // `http://${process.env.REACT_APP_URL}:${process.env.REACT_APP_PORT}'], 
    // Autoriser les requêtes uniquement à partir de ce domaine
    origin: '*',
    // Autoriser uniquement les méthodes précisées
    methods: ['GET', 'POST', 'PATCH', 'DELETE'],
    // à changer en déploiement
    credentials: true
}));

// app.use(cors());

// // Read SSL certificate and key files
// const options = {
//     key: fs.readFileSync("key.pem"),
//     cert: fs.readFileSync("cert.pem"),
// };
// // Create HTTPS server
// const server = https.createServer(options, app);

// server.listen(port, () => {
//     console.log(`App listening on https://localhost:${port}`);
// });

app.use(express.json())

app.use(express.static('./public'));

app.get('/robots.txt', (req, res, next) => {
    res.sendFile(path.join(__dirname, 'public', 'robots.txt'), err => {
        if (err) {
            console.log('erreur robot.txt');

            res.status(404).send(); // Send a 404 response if robots.txt is not found
        }
    });
});

app.use(router);

app.listen(port, () => {
    console.log(`Serveur démarré sur http://localhost:${port}`);
});

// import sequelize from './app/database.js';

// sequelize.sync({ alter: true }).then(() => {
//     console.log("table and model synced successfully!")
// }).then((data) => {
//     console.log(data);
// }).catch((err) => {
//     console.log("Error syncing the table and model!");
//     console.log(err);
// })
