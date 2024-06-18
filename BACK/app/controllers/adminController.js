import { Skill, User, Category, SubCategory } from "../models/index.js";

const adminController = {

    admin: async function (req, res) {
        try {
            const users = await User.findAndCountAll({
                where: {
                    role: "member",
                },
                attributes: [
                    "id",
                    "firstname",
                    "lastname",
                    "email",
                    "swappies",
                    "swappiesWinned",
                    "swappiesSpent",
                    "birthday",
                    "grade_level",
                    "presentation",
                    "createdAt"
                ],
                order: [["id", "ASC"]]
            });
            // console.log(skill);
            if (users.length === 0) {
                console.log('No users found with the role "member"!');
            }
            //send the answer to the front
            res.send(
                users
            );
        }
        catch (error) {
            console.error('erreur findAll users:', error);
            res.status(500).json({
                message: 'Error  get users in adminController',
                error: error
            });
        }
    },

    adminGetSkillOfOneUser: async function (req, res) {
        try {
            console.log("req.params.id", req.params.id);
            const skills = await Skill.findAndCountAll({
                where: {
                    UserId: req.params.userId
                },
                order: [["id", "ASC"]]
            });
            // console.log(skills);
            if (skills.length === 0) {
                console.log('No skills found for this user');
                res.send(
                    'no skills found for this user'
                );
            }
            else {
                //send the answer to the front
                res.send(
                    skills
                );
            }
        }
        catch (error) {
            console.error('erreur findAll users:', error);
            res.status(500).json({
                message: 'Error  get users in adminController',
                error: error
            });
        }
    },

    adminModifUser: async function (req, res) {
        try {
            // req.params contains data from url
            //rew.body contains body of request from forms
            console.log(req.body);
            console.log(req.params.skillId);
            console.log(req.params);

            const updateFieldsProfile = {

                firstname: req.body.firstname,
                lastname: req.body.lastname,
                swappies: req.body.swappies,
                presentation: req.body.presentation
            };

            await User.update(
                updateFieldsProfile, {
                where: {
                    id: req.params.userId

                }
            });

            //send the answer to the front
            res.status(200).json("update admin du profile ok")
        }
        catch (error) {
            console.error(error.message);
            res.send('error update admin profile:', error);
        }
    },

    adminModifSkill: async function (req, res) {
        try {
            // req.params contains data from url
            //rew.body contains body of request from forms
            console.log(req.body);
            console.log(req.params.skillId);
            console.log(req.params);

            const updateFieldsSkill = {

                title: req.body.title,
                duration: req.body.duration,
                description: req.body.description,
                availability: req.body.availability,
            };

            await Skill.update(
                updateFieldsSkill, {
                where: {
                    id: req.params.skillId
                }
            });
            //profile is updated


            //send the answer to the front
            res.status(200).json("update admin du skill ok")
        }
        catch (error) {
            console.error(error.message);
            res.send('error update admin skill:', error);
        }
    },


    adminDeleteUser: async function (req, res) {
        try {
            // req.params contains all the data
            console.log(req.params);
            await User.destroy({
                where: {
                    id: req.params.UserId
                }
            });
            //send the answer to the front
            res.status(200).json('user skill deletion completed');
        }
        catch (error) {
            console.error(error.message);
            res.send('error delete skill', error);
        }
    },

};

export default adminController;
