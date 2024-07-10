import jwt from 'jsonwebtoken';

const dashboardController = {

    dashboard: async function (req, res) {
        console.log('dans le dashboardController1');
        const authHeader = req.headers['authorization'];
        // console.log("req.headers['authorization']:", req.headers);
        const token = authHeader && authHeader.split(' ')[1]
        console.log('dans le dashboardController apres split du token');
        console.log('token dans dashboardController', token);

        try {
            if (token == null || token == undefined || token == 'undefined') {
                console.log("check s'il y a token dans dashboardController");
                throw new Error('Token non fourni')
            }
            if (token) {
                console.log('dans la fonction verifytoken');
                jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {

                    if (err) {
                        throw new Error('Token invalide')
                    }
                    req.user = user;
                    console.log("req.user", req.user);
                    console.log('on est apres le verify, token validé');
                    res.status(200).json("access granted")
                });

            }
        }
        catch (error) {
            console.log("erreur dans dashboardController");
            res.status(400).json({ error: error.message });
        }
    }
};

export default dashboardController;