import { User, Category, Interest } from "../models/index.js";

const profileController = {

    profile: async function (req, res) {
        try {
            console.log(req.params);
            console.log("req.headers", req.headers);
            console.log('req.sessions.userId', req.session.userId);
            // find by primary key
            const profile = await User.findByPk(req.user.id, {
                attributes: ['firstname',
                    'lastname',
                    "email",
                    'grade_level',
                    "presentation",
                    'birthday'], // Select specified attributs of the table
                // include: [{
                //     model: Interest, // Table to join
                //     attributes: ['CategoryId']
                // }], //apparently no nedd to include the liaison table sequelize does it on its own
                include: [{
                    model: Category, // Table to join
                    attributes: ['name'] // Select specified attributs of the table Commande
                }],
            });
            if (profile === null) {
                console.log('User not found!');
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

            const updateFields = {
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                grade_level: req.body.grade_level,
                presentation: req.body.presentation,
            };

            //handle the format of date that is not accepted empty nor null
            const birthday = req.body.birthday;
            if (birthday !== "") {
                updateFields.birthday = req.body.birthday
            }
            console.log('log sesssion', req.session.userId);
            await User.update(

                updateFields, {
                where: {
                    id: req.session.userId
                }
            });

            //creation or update of interests
            const allInterests = await Interest.findAll({
                where: {
                    UserId: req.session.userId
                }
            });
            console.log(allInterests);

            if (Object.keys(allInterests).length === 0) {
                await Interest.create(
                    {
                        CategoryId: req.body.category,
                        UserId: req.session.userId
                    }
                )
            }
            else if (Object.keys(allInterests).length != 0) {
                await Interest.destroy(
                    {
                        where: {
                            UserId: req.session.userId,
                        }
                    })
                await Interest.create(
                    {
                        CategoryId: req.body.category,
                        UserId: req.session.userId
                    },
                )
            };
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
                    id: req.session.userId
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
