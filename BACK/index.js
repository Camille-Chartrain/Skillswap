import express from 'express';
import session from 'express-session';
import * as dotenv from 'dotenv';
import router from './app/router.js';
import mainController from './app/controllers/mainController.js';

dotenv.config();
const app = express();
const port = process.env.PORT || 3000;

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

app.use(mainController.error404)

app.listen(port, () => {
    console.log(`Serveur démarré sur http://localhost:${port}`);
});