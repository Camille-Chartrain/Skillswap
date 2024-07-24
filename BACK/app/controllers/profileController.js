import { User, Category, Interest } from "../models/index.js";

const profileController = {

    profile: async function (req, res) {
        try {
            console.log("req.headers", req.headers);
            console.log('req.user.id', req.user.id);
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
                    attributes: ['name', "id"] // Select specified attributs of the table Commande
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
            res.status(400).send('error', error);
        }
    },

    modifProfile: async function (req, res) {
        try {
            // req.params contains data from url
            //req.body contains body of request from forms
            console.log("req.body", req.body);
            console.log("req.body.interests", req.body.interests);
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
            console.log('user id', req.user.id);
            await User.update(

                updateFields, {
                where: {
                    id: req.user.id
                }
            });

            //creation or update of interests
            const allInterests = await Interest.findAll({
                where: {
                    UserId: req.user.id
                }
            });
            console.log("interets:", allInterests);

            if (Object.keys(allInterests).length === 0) {
                for (const eachCategory of req.body.interests) {
                    console.log("eachCategory initialisation:", eachCategory);
                    await Interest.create(
                        {
                            CategoryId: eachCategory,
                            UserId: req.user.id,
                        }
                    )
                }
            }
            else if (Object.keys(allInterests).length != 0) {
                await Interest.destroy(
                    {
                        where: {
                            UserId: req.user.id,
                        }
                    })
                if (req.body.interests) {
                    console.log("req.body.interests 2", req.body.interests);
                    for (const eachCategory of req.body.interests) {
                        console.log("eachCategory pour update", eachCategory);
                        await Interest.create(
                            {
                                CategoryId: eachCategory,
                                UserId: req.user.id,
                            }
                        )
                    }
                }
            };
            res.status(200).json('update ok');
        }
        catch (error) {
            console.error(error.message);
            res.render('error');
        }
    },

    deleteProfile: async function (req, res) {
        try {
            const checkUser = await User.findByPk(req.user.id, {
                where: {
                    id: req.user.id
                }
            });
            if (checkUser) {
                await User.destroy({
                    where: {
                        id: req.user.id
                    }
                });

                const user = await User.findByPk(req.user.id, {
                    where: {
                        id: req.user.id
                    }
                });
                console.log("user:", user);

                if (!user) {
                    res.status(200).json('deletion ok');
                }
            }
            else {
                res.status(200).json("user doesn't exist");
            }
        } catch (error) {
            console.error(error.message);
            res.status(500).json({ error: error.message });
        }
    },
};

export default profileController;
