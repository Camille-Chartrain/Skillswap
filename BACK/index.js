import express from 'express';
import session from 'express-session';
import * as dotenv from 'dotenv';
// import router from './app/router.js';
// import mainController from './app/controllers/mainController.js';
import https from 'https';
import fs from "fs";

dotenv.config();
const app = express();
const port = process.env.PORT || 3000;

// Route pour test
app.get("/", (req, res) => {
    res.send("WELCOME TO THE BASIC EXPRESS APP WITH AN HTTPS SERVER");
});

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

// app.use(mainController.error404)

// app.listen(port, () => {
//     console.log(`Serveur démarré sur http://localhost:${port}`);
// });