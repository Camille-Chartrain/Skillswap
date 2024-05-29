import { Skill } from "../models/index.js";

const skillController = {

    skill: async function (req, res) {
        try {
            console.log(req.params);
            // find by primary key
            const profile = await Skill.findAll({
                where: {
                    UserId: req.user.id
                }
            });
            console.log(profile);
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
            res.render('error:', error);
        }
    },

    createSkill: async function (req, res) {
        try {
            console.log("ici ma req")
            console.log(req.body);

            await Skill.create({
                title: req.body.title,
                duration: req.body.duration,
                level: req.body.level,
                transmission: req.body.transmission,
                description: req.body.description,
                availability: req.body.availability,
                SubCategoryId: req.body.SubCategoryId,
                CategoryId: req.body.CategoryId,
                UserId: req.user.id
            }, {
                where: {
                    UserId: req.user.id
                }
            }
            );
            res.status(400).send("skill added to the user")
        } catch (error) {
            console.log('erreur catch createSkill:', error);
            res.send('error, skill not added', error);
        }
    },

    modifSkill: async function (req, res) {
        try {
            // req.params contains data from url
            //rew.body contains body of request from forms
            console.log(req.body);
            console.log(req.params.skillId);

            const updateFields = {
                title: req.body.title,
                duration: req.body.duration,
                level: req.body.level,
                transmission: req.body.transmission,
                description: req.body.description,
                availability: req.body.availability,
                SubCategoryId: req.body.SubCategoryId,
                CategoryId: req.body.CategoryId,
            };

            await Skill.update(
                updateFields, {
                where: {
                    id: req.params.skillId
                }
            });
            //profile is updated

            //send the answer to the front
            res.send(
                'update ok'
            );
        } catch (error) {
            console.error(error.message);
            res.render('error:', error);
        }
    },

    deleteSkill: async function (req, res) {
        try {
            // req.params contains all the data
            console.log(req.params);
            await Skill.destroy({
                where: {
                    id: req.params.skillId
                }
            });
            //send the answer to the front
            res.send(
                'skill deletion completed'
            );
        } catch (error) {
            console.error(error.message);
            res.render('error');
        }
    },
};

export default skillController;
