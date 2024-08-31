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

// trying this to make https works with coolify
app.set('trust proxy', true);

// gestion of CORS
app.use(cors({
		//origin: '*',
		origin: [
			'http://front',
			'http://front:1234',
			'http://skillswap.camille.cloud',
			'http://skillswap.camille.cloud:1234',
			'https://front',
			'https://front:1234',
			'https://skillswap.camille.cloud',
			'https://skillswap.camille.cloud:1234',
		],
    //origin: `https://${url}`,
		/*
		origin: 'http://localhost',
		origin: 'http://localhost:3000',
		origin: 'http://skillswap.camille.cloud',
		origin: 'http://skillswap.camille.cloud:3000',
		origin: 'https://localhost',
		origin: 'https://localhost:3000',
		origin: 'https://skillswap.camille.cloud',
		origin: 'https://skillswap.camille.cloud:3000',
		// trying to allow multiple origins :
		origin: function (origin, callback) {
			console.log("-------------------- inside cors");
			const allowedOrigins = [
				'http://localhost',
				'http://localhost:3000',
				'http://skillswap.camille.cloud',
				'http://skillswap.camille.cloud:3000',
				'http://skillswap.camille.cloud:443',
				'https://localhost',
				'https://localhost:3000',
				'https://skillswap.camille.cloud',
				'https://skillswap.camille.cloud:3000',
				'https://skillswap.camille.cloud:443',
			];
			if (allowedOrigins.includes(origin)) {
				callback(null, true);
			} else {
				callback(new Error('----------Not allowed by CORS'));
			}
		},
		*/
    methods: ['GET', 'POST', 'PATCH', 'DELETE'], // Autoriser uniquement les méthodes précisées
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
