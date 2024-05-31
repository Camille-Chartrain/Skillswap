import { User, Category, Skill, Interest } from "../models/index.js";

const communicationController = {

    communication: async function (req, res) {
        try {
            // req.params contains all the data
            console.log(req.params);

            const skill = await Skill.findAll({
                limit: 5,
                // order: [['id', 'ASC']], // Order by ascending id
                include: [
                    {
                        model: Category,
                        attributes: ['picture', 'name'],
                        include: [
                            {
                                model: User,
                                attributes: ['firstname', 'lastname'],
                                through: {
                                    model: Interest,
                                    // where: {
                                    //     UserId: req.user.id
                                    // },
                                    // required: true

                                }
                            }
                        ]
                    }
                ],

                // order: [['id', 'ASC']], // Tri par ordre croissant d'identifiants
                where: {
                    '$Category.Users.Interest.UserId$': req.user.id // filter to get only categories linked to the user trough interest 
                },
            });
            //send the answer to the front
            res.send(
                skill
            );
        } catch (error) {
            console.error(error.message);
            res.status(400).send(error);
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

            //handle the format of date that is not accepted empty nor null
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

            //creation or update of interests
            const allInterests = await Interest.findAll({
                where: {
                    UserId: req.params.userId
                }
            });
            console.log(allInterests);

            if (Object.keys(allInterests).length === 0) {
                await Interest.create(
                    {
                        CategoryId: req.body.category,
                        UserId: req.params.userId
                    }
                )
            }
            else if (Object.keys(allInterests).length != 0) {
                await Interest.destroy(
                    {
                        where: {
                            UserId: req.params.userId,
                        }
                    })
                await Interest.create(
                    {
                        CategoryId: req.body.category,
                        UserId: req.params.userId
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

export default communicationController;
