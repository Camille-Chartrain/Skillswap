import User from "../models/User.js";
import bcrypt from 'bcrypt';

const authController = {

    registration: async function (req, res) {
        try {
            await User.create([
                { firstname: req.firstname, lastname: req.lastname, email: req.email, hash: req.hash },
            ]);
        } catch (error) {
            console.error(error.message);
            res.render('error');
        }
    },
    login: async function (req, res) {
        try {
            // Authentification de l'utilisateur
            const user = await User.findOne({ where: { email: req.body.email } });

            if (!user) {
                // User not found
                return false;
            }

            // Verify password
            if (user) {
                const result = await bcrypt.compare(req.body.hash, user.hash);
                if (result) {
                    // si c'est ok on est connecté
                    req.session.isLogged = true;
                    req.session.userId = user.id;
                }
            }
            else {
                throw new Error('Mauvais couple identifiant/mot de passe');
            }
        } catch (error) {
            console.error(error.message);
            res.send('error');
        }
    },
};

export default authController;