import express from 'express';
import session from 'express-session';
import * as dotenv from 'dotenv';
import https from 'https';
import fs from "fs";
import cors from "cors";
//option possible: activer HSTS (Strict Transport Security HSTS est utilisé pour indiquer aux navigateurs de toujours utiliser HTTPS pour accéder à votre site, même si l'utilisateur saisit http:// dans la barre d'adresse.) 
import User from './app/models/user.js';
import sequelize from './app/database.js';
// import router from './app/router.js';

dotenv.config();
const app = express();
const port = process.env.PORT || 3000;


// the defined model is the class itself => true
console.log(User === sequelize.models.User);

// Route to test https
app.get("/", (req, res) => {
    res.send("WELCOME TO THE BASIC EXPRESS APP WITH AN HTTPS SERVER");
});

//gestion of CORS
app.use(cors({
    origin: 'https://localhost:3000.com', // Autoriser les requêtes uniquement à partir de ce domaine
    methods: ['GET', 'POST', 'PATCH', 'DELETE'] // Autoriser uniquement les méthodes précisées
}));


// Read SSL certificate and key files
const options = {
    key: fs.readFileSync("key.pem"),
    cert: fs.readFileSync("cert.pem"),
};
// Create HTTPS server
const server = https.createServer(options, app);

server.listen(port, () => {
    console.log(`App listening on https://localhost:${port}`);
});

app.use(express.urlencoded({ extended: true }));

app.use(session({
    saveUninitialized: true,
    resave: true,
    secret: process.env.SECRET
}));

app.use((req, res, next) => {
    res.locals.isLogged = req.session.isLogged;
    next();
})

// app.use(router);


// app.listen(port, () => {
//     console.log(`Serveur démarré sur http://localhost:${port}`);
// });