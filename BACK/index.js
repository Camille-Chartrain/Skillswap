import express from 'express';
import session from 'express-session';
import * as dotenv from 'dotenv';
import https from 'https';
import fs from "fs";
import cors from "cors";
//option possible: activer HSTS (Strict Transport Security HSTS est utilisé pour indiquer aux navigateurs de toujours utiliser HTTPS pour accéder à votre site, même si l'utilisateur saisit http:// dans la barre d'adresse.) 
import sequelize from './app/database.js';
import Category from './app/models/Category.js';
import User from './app/models/User.js';
import Sub_category from './app/models/Sub_category.js';
import Meeting from './app/models/Meeting.js';
import Skill from './app/models/skill.js';
import Interest from './app/models/Interest.js';
;
import router from './app/router.js';

dotenv.config();
const app = express();
const port = process.env.PORT || 3000;

sequelize.sync({ alter: true }).then(() => {
    console.log("table and model synced successfully!")
    // return User.create({ firstname: "bandida", lastname: "lafolita", email: 'null', hash: 'Mdp' });
    // Skill.create({ title: "baston", level: "super fort", transmission: 'presentiel', description: 'apprenez à casser des nez', availability: 'soir et we' })
}).then((data) => {
    console.log(data);
}).catch((err) => {
    console.log("Error syncing the table and model!");
    console.log(err);
})

// the defined model is the class itself => true
console.log(Category === sequelize.models.Category);
console.log(Sub_category === sequelize.models.Sub_category);
console.log(User === sequelize.models.User);
console.log(Skill === sequelize.models.Skill);
console.log(Meeting === sequelize.models.Meeting);
console.log(Interest === sequelize.models.Interest);

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

app.use(router);


// app.listen(port, () => {
//     console.log(`Serveur démarré sur http://localhost:${port}`);
// });