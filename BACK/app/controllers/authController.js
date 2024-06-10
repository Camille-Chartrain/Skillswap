import bcrypt from 'bcrypt';
import validator from "validator";
import { User } from "../models/index.js";
import jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';
dotenv.config();


const authController = {

    registration: async function (req, res) {
        try {
            console.log("registration req.body", req.body);
            console.log("registration req.headers", req.headers);

            const checkUser = await User.findOne({
                where: { email: req.body.email }
            });
            console.log('Un user avec ce mail existe déjà');

            if (checkUser) {
                throw new Error('Un utilisateur utilise déjà cette adresse email')
            }
            console.log('nous sommes apres le check du mail');
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
            console.log('log du user', user.firstname, user.lastname, user.email);

            const username = {
                email: req.body.email,
                id: user.id
            }

            const accessToken = jwt.sign(username, process.env.TOKEN_SECRET)
            console.log('token crée dans registration=================', accessToken);
            res.status(200).json({ accessToken: accessToken })
        }
        catch (error) {
            console.log('erreur:', error);
            res.status(400).json({ error: error.message });
        }
    },


    login: async function (req, res) {


        // FONCTIONNEMENT
        // user? (verif si mail existe dans bdd)
        //      oui => comparaison hash
        //          mdp ok => verification existence token
        //              pas de token => création token
        //                              renvoi token
        //                              sortie de fonction
        //              token => verification validité token
        //                      token pas ok => throw error (est ce que je dois l'indiquer)
        //                      token ok => comparaison des emails
        //                                 (token sauvegardé dans navigateur
        //                                  n'est pas forcément celui de la personne
        //                                  qui se connecte)
        //                          mail pas ok => création d'un token
        //                                         renvoi du token
        //                          mail ok => renvoi reponse ok


        const verifyToken = (token, secret) => {
            return new Promise((resolve, reject) => {
                jwt.verify(token, secret, (err, user) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(user);
                    }
                });
            });
        }

        try {
            // Authentification of the user, check if a mating user is founded in the db
            const user = await User.findOne({ where: { email: req.body.email } });

            //if a user is founded, we check his password with the hash in the db
            if (user !== null) {
                console.log('nous sommes dans le if, un user existe bien avec cet email');
                const result = await bcrypt.compare(req.body.password, user.hash);
                console.log("result du bcrypt.compare", result);

                // if the email and the password match, then we check if the user has a token already or not
                if (result) {
                    console.log("login req.body", req.body);
                    // console.log("login req.headers", req.headers);
                    //verifier si il y a un cookie
                    console.log('dans le result, la comparaison du mot de passe est ok');

                    // extrait le token pour voir sa valeur
                    const authHeader = req.headers['authorization'];
                    // console.log("req.headers['authorization'] ", authHeader);
                    const token = authHeader && authHeader.split(' ')[1]
                    console.log('token 1: ', token);

                    //if he doesn't have a token or if the token is undefined by the deconnection we create one
                    if (token === null || token === "undefined") {

                        // if (!token) {
                        console.log('verif du null ou undefined: ', token);

                        const username = {
                            email: req.body.email,
                            id: user.id
                        }
                        const accessToken = jwt.sign(username, process.env.TOKEN_SECRET)
                        console.log('token crée dans login==================', accessToken);
                        res.status(200).json({ accessToken: accessToken })
                        // return non nécéssaire.? sécurité?
                        return;
                    }

                    // if user has a token we verify it
                    else if (token) {
                        try {
                            console.log("back token: ", token);

                            const verifiedUser = await verifyToken(token, process.env.TOKEN_SECRET);
                            req.user = verifiedUser;
                            console.log("notre user apres validation du token -req.user-", req.user);

                            // Compare the emails
                            if (req.body.email !== verifiedUser.email) {
                                console.log('check des emails auth');

                                const userExist = await User.findOne({ where: { email: req.body.email } });

                                const username = {
                                    email: req.body.email,
                                    id: userExist.id
                                }
                                const accessToken = jwt.sign(username, process.env.TOKEN_SECRET)
                                console.log('token crée dans login + deconnection ancien user =================', accessToken);
                                res.status(200).json({ accessToken: accessToken })
                            }
                            else {
                                res.status(200).json('token validé !!')
                            }
                            // avait ecrit "innerError"
                        } catch (error) {
                            // Gérer l'erreur de vérification du token
                            console.error('Erreur de vérification du token, bloc interne:', error.message);
                            // est ce ok de mettre throw new error dans catch
                            throw new Error('Token invalide');
                        }
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
            console.error("error dans bloc principal", error.message);
            res.status(400).json({ error: error.message });
            // idem return éncessaire?
            return;
        }
    },

    // logout: async function (req, res) {
    //     try {
    //         req.session.destroy();
    //     } catch (error) {
    //         console.error(error.message);
    //         res.send('error');
    //     }
    // },
};

export default authController;