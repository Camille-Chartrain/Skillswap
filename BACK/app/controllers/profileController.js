import User from "../models/User.js";
import Interest from "../models/Interest.js";

const profileController = {

    profile: async function (req, res) {
        try {
            console.log(req.params);
            // find by primary key
            const profile = await User.findByPk(req.params.userId, {
                attributes: ['firstname',
                    'lastname',
                    "email",
                    'grade_level',
                    "presentation",
                    'birthday'], // Select specified attributs of the table
                include: [{
                    model: Interest, // Table to join
                    attributes: ['CategoryId'] // Select specified attributs of the table Commande
                }],
            });
            if (profile === null) {
                console.log('Not found!');
            }
            //send the answer to the front
            res.send(
                profile
            );
        } catch (error) {
            console.log('je suis ds la catch');
            console.error(error.message);
            res.render('error');
        }
    },

    modifProfile: async function (req, res) {
        try {
            // req.params contains data from url
            //rew.body contains body of request from forms
            console.log(req.body);
            console.log(req.params.userId);

            const updateFields = {
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                grade_level: req.body.grade_level,
                presentation: req.body.presentation,
            };

            const birthday = req.body.birthday;
            if (birthday !== "") {
                updateFields.birthday = req.body.birthday
            }

            await User.update(
                updateFields, {
                where: {
                    id: req.params.userId
                }
            });
            await Interest.update(
                { CategoryId: req.body.category }, {
                where: {
                    UserId: req.params.userId,
                }
            })
            //profile and interest are updated
            //send the answer to the front
            res.send(
                'update ok'
            );
        } catch (error) {
            console.error(error.message);
            res.render('error');
        }
    },

    deleteProfile: async function (req, res) {
        try {
            // req.params contains all the data
            console.log(req.params);
            await User.destroy({
                where: {
                    id: req.params.userId
                }
            });
            //send the answer to the front
            res.send(
                'deletion completed'
            );
        } catch (error) {
            console.error(error.message);
            res.render('error');
        }
    },
};

export default profileController;
