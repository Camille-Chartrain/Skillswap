import jwt from "jsonwebtoken";
import * as dotenv from 'dotenv';
dotenv.config();

function verifyToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    // console.log("req.headers['authorization']:", req.headers);
    const token = authHeader && authHeader.split(' ')[1]
    console.log('dans le middleware verifytoken');
    console.log('token dans middleware', token);

    try {
        if (token == null) {
            console.log("check s'il y a token");
            throw new Error('Token non fourni')
        }
        if (token) {
            jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
                console.log('dans la fonction verifytoken');
                if (err) {
                    throw new Error('Token invalide')
                }
                req.user = user;
                console.log("req.user", req.user);
                console.log('on est apres le verify, token validé');

                next();
            });
        }
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
};



export default verifyToken;