import bcrypt from 'bcrypt';
import validator from "validator";
import { User } from "../models/index.js";
import jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';
dotenv.config();



const authController = {

    registration: async function (req, res) {
        try {
            // console.log("log de req:", req);
            console.log("log du req", req.body);
            console.log("log du req.body.firstname", req.body.firstname);

            const checkUser = await User.findOne({
                where: { email: req.body.email }
            });
            console.log('nous sommes apres le checkuser');
            if (checkUser) {
                throw new Error('Un utilisateur utilise déjà cette adresse email')
            }
            console.log('nous sommes apres le checkuser');
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
                // name: req.body.firstname,
                email: req.body.email,
                // lastname: req.body.lastname,
                id: user.id
            }

            const accessToken = jwt.sign(username, process.env.TOKEN_SECRET)
            console.log('token crée dans registration=================', accessToken);
            res.json({ accessToken: accessToken })

            //     res.send("user okay")
        } catch (error) {
            res.status(400).json({ error: error.message });
            // console.error(error.message);
            // res.render(error.message);

        }
    },

    login: async function (req, res) {
        try {
            // Authentification of the user, check if a mating user is founded in the db
            const user = await User.findOne({ where: { email: req.body.email } });
            console.log('infos du user:',
                user.id,
                user.firstname,
                user.lastname,
                user.email,
                user.role);

            //if a user is founded, we check his password with the hash in the db
            if (user !== null) {
                console.log('nous sommes dans le if, un user existe bien avec cet email');
                const result = await bcrypt.compare(req.body.password, user.hash);
                console.log("result du bcrypt.compare", result);

                // if the email and the password match, then we check if the user has a token already or not
                if (result) {
                    console.log('dans le result, la comparaison du mot de passe est ok');
                    const authHeader = req.headers['authorization'];
                    // console.log("req.headers['authorization']:", req.headers);
                    const token = authHeader && authHeader.split(' ')[1]

                    if (token) {
                        jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
                            if (err) {
                                throw new Error('Token invalide')
                            }
                            req.user = user;
                            console.log("req.user", req.user);
                        });
                    }

                    // if the user doesn't have a token we create one and we sent it to him
                    else if (token == null) {
                        const username = {
                            email: req.body.email,
                            id: user.id
                        }
                        const accessToken = jwt.sign(username, process.env.TOKEN_SECRET)
                        console.log('token crée dans login==================', accessToken);
                        res.json({ accessToken: accessToken })
                    }
                }
                else {
                    throw new Error('Mauvais couple identifiant/mot de passe');
                }
            }
            else {
                throw new Error('2Mauvais couple identifiant/mot de passe');
            }
        }
        catch (error) {
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