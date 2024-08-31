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


// this is used to both sync and seed the database the first time it is installed, it will not do it again after that
import { syncDataBase } from "./app/sync_database.js";
await syncDataBase();


// const redis = require('redis');
const client = redis.createClient();

client.on('error', (err) => {
    console.error('Redis error:', err);
});

dotenv.config();
const app = express();
const port = process.env.PORT || 3001;
const url = process.env.PUBLIC_URL;

app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());


// // Route to test https
// app.get("/", (req, res) => {
//     res.send("WELCOME TO THE BASIC EXPRESS APP WITH AN HTTPS SERVER");
// });

// log before cors
app.use((req, res, next) => {
	console.log('----------- origin:', req.get('Origin'));
	next();
});

// CORS
app.use(cors({
		//origin: '*',
		origin: [
			`http://${url}`,
			`https://${url}`,
			`https://${url}:443`,
		],
    methods: ['GET', 'POST', 'PATCH', 'DELETE'],
    credentials: true
}));


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
    console.log(`Serveur démarré sur https://${url}:${port}`);
});
