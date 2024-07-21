import express from 'express';
import * as dotenv from 'dotenv';
// import https from 'https';
// import fs from "fs";
import cors from "cors";
import cookieParser from 'cookie-parser';
//option possible: activer HSTS (Strict Transport Security HSTS est utilisé pour indiquer aux navigateurs de toujours utiliser HTTPS pour accéder à votre site, même si l'utilisateur saisit http:// dans la barre d'adresse.) 

// import SubCategory from './app/models/SubCategory.js';
// import Category from './app/models/Category.js';
// import User from './app/models/User.js';
// import Meeting from './app/models/Meeting.js';
// import Skill from './app/models/skill.js';
// import Interest from './app/models/Interest.js';
import router from './app/router.js';
import redis from 'redis';


import sequelize from './app/database.js';

sequelize.sync({ alter: true }).then(() => {
    console.log("table and model synced successfully!")
}).then((data) => {
    console.log(data);
}).catch((err) => {
    console.log("Error syncing the table and model!");
    console.log(err);
})


// const redis = require('redis');
const client = redis.createClient();

client.on('error', (err) => {
    console.error('Redis error:', err);
});

dotenv.config();
const app = express();
const port = process.env.PORT || 3001
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

// the defined model is the class itself => true
// console.log(Category === sequelize.models.Category);
// console.log(SubCategory === sequelize.models.SubCategory);
// console.log(User === sequelize.models.User);
// console.log(Skill === sequelize.models.Skill);
// console.log(Meeting === sequelize.models.Meeting);
// console.log(Interest === sequelize.models.Interest);

// // Route to test https
// app.get("/", (req, res) => {
//     res.send("WELCOME TO THE BASIC EXPRESS APP WITH AN HTTPS SERVER");
// });

// gestion of CORS
app.use(cors({
    // origin: ['http://localhost:1234', `http://${process.env.REACT_APP_URL}:${process.env.REACT_APP_PORT}'], // Autoriser les requêtes uniquement à partir de ce domaine
    origin: '*',
    methods: ['GET', 'POST', 'PATCH', 'DELETE'], // Autoriser uniquement les méthodes précisées
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

app.use(router);

app.listen(port, () => {
    console.log(`Serveur démarré sur http://localhost:${port}`);
});