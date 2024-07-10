import jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';
dotenv.config();

function authSearch(req, res, next) {
    const authHeader = req.headers['authorization'];
    // console.log("req.headers['authorization']:", req.headers);
    const token = authHeader && authHeader.split(' ')[1]
    console.log('dans le middleware authSearch');
    console.log('token dans middleware authSearch', token);

    try {
        console.log("1er log du token:", token);
        console.log("typeof token", typeof token);
        if (token == null || token == undefined || token == "undefined") {
            console.log("check s'il y a token");
            console.log("typeof token", typeof token);
            req.user = undefined;
            next();
        }
        else if (token !== null && token !== undefined && token !== "undefined") {
            jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
                console.log(' verify du token dans le middleware authSearch');
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



export default authSearch;