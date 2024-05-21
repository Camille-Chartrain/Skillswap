// import User from "../models/User.js";
import bcrypt from 'bcrypt';
import validator from "validator";
import { User } from "../models/index.js";

const authController = {

    registration: async function (req, res) {
        try {
            console.log("log du req", req.body);
            console.log("log du req.body.firstname", req.body.firstname);

            // validation of password
            const options = { minLength: 12, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1 };
            if (!validator.isStrongPassword(req.body.hash, options)) {
                throw new Error('Le mot de passe doit comporter au moins 12 caractères et au moins 1 majuscule, 1 minuscule, 1 chiffre et 1 caractère spécial');
            }

            const user = await User.create(
                {
                    firstname: req.body.firstname,
                    lastname: req.body.lastname,
                    email: req.body.email,
                    hash: req.body.hash
                },
            );
            console.log('log du user', user);
            // to keep the user connected we memorize it in the session
            req.session.isLogged = true;

            console.log('log de req.session.userId', req.session.userId);
            console.log("log de user.id", user.id);
            req.session.userId = user.id;
            console.log('log de req.session.userId', req.session.userId);

            res.send("user okay")
        } catch (error) {
            console.error(error.message);
            res.render('error');
        }
    },
    login: async function (req, res) {
        try {
            // Authentification of the user
            const user = await User.findOne({ where: { email: req.body.email } });
            console.log('log de user', user);
            //check if a mating user is founded in the db
            if (user !== null) {
                // Verify password
                console.log('nous sommes dans le if', user);
                console.log(user.hash);
                const result = await bcrypt.compare(req.body.hash, user.hash);
                console.log("result", result);
                if (result) {
                    console.log('dans le result');
                    // si c'est ok on est connecté
                    req.session.isLogged = true;
                    req.session.userId = user.id;
                    console.log(req.session.userId);
                }
                else {
                    res.render('login', { alert: 'Mauvais couple identifiant/mot de passe' });
                }
            }
            else {
                throw new Error('Mauvais couple identifiant/mot de passe');
            }

            res.send("user connected");

        } catch (error) {
            console.error(error.message);
            res.send(error.message);
        }
    },
    logout: async function (req, res) {
        try {
            req.session.destroy();
        } catch (error) {
            console.error(error.message);
            res.send('error');
        }
    },
};

export default authController;