import bcrypt from 'bcrypt';
import validator from "validator";
import { User } from "../models/index.js";
import jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';
dotenv.config();



const authController = {

    registration: async function (req, res) {
        try {
            console.log("log du req", req.body);
            console.log("log du req.body.firstname", req.body.firstname);

            const checkUser = await User.findOne({
                where: { email: req.body.email }
            });
            if (checkUser) {
                res.send('Un utilisateur utilise déjà cette adresse email')
            }
            // validation of password
            const options = { minLength: 12, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1 };
            if (!validator.isStrongPassword(req.body.password, options)) {
                throw new Error('Le mot de passe doit comporter au moins 12 caractères et au moins 1 majuscule, 1 minuscule, 1 chiffre et 1 caractère spécial');
            }

            const user = await User.create(
                {
                    firstname: req.body.firstname,
                    lastname: req.body.lastname,
                    email: req.body.email,
                    hash: req.body.password
                },
            );
            console.log('log du user', user);

            // const createTokenFromJson = (jsonData, options = {}) => {
            //     try {
            //         const token = jwt.sign(jsonData, process.env.TOKEN_SECRET, options)
            //         return token;
            //     }
            //     catch (error) {
            //         console.log('Error:', error.message);
            //         return null;
            //     }
            // };

            // const token = createTokenFromJson({ user });
            // console.log('mon user token-----------------s', token);
            // if (token) {
            //     res.json({ status: true, token: token })
            // }
            // else (
            //     res.json({ status: false })
            // );

            const username = {
                name: req.body.firstname,
                email: req.body.email,
                lastname: req.body.lastname,
                id: user.id
            }

            const accessToken = jwt.sign(username, process.env.TOKEN_SECRET)
            console.log('accesstoken==================', accessToken);
            res.json({ accessToken: accessToken })

            //     res.send("user okay")
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