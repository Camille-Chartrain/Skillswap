import { Skill } from "../models/index.js";

const skillController = {

    skill: async function (req, res) {
        try {
            console.log(req.params);
            // find by primary key
            const skill = await Skill.findAll({
                where: {
                    UserId: req.user.id
                }
            });
            console.log(skill);
            if (skill === null) {
                console.log('skills Not found!');
            }
            //send the answer to the front
            res.send(
                skill
            );
        }
        catch (error) {
            console.error('erreur get Skills:', error);
            res.status(500).json({
                message: 'Error  get skills',
                error: error
            });
        }
    },

    oneSkill: async function (req, res) {
        try {
            console.log("req.params", req.params);
            console.log("req.params.skillId", req.params.skillId);
            // console.log("req.body", req.body);
            // find by primary key
            const skill = await Skill.findByPk(req.params.skillId);
            console.log('oneskill:', skill);
            if (skill === null) {
                console.log('oneSkill not found!');
            }
            //send the answer to the front
            res.send(
                { data: skill }
            );
        } catch (error) {
            console.log('je suis ds la catch');
            console.error(error.message);
            res.send('error:', error);
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
            res.status(200).json("skill added to the user")
        }
        catch (error) {
            console.error('erreur catch createSkill:', error);
            res.status(500).json({
                message: 'Error,  skill not added',
                error: error
            });
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
            res.status(200).json("update du skill ok")
        }
        catch (error) {
            console.error(error.message);
            res.send('error update skill:', error);
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
            res.status(200).json('skill deletion completed');
        }
        catch (error) {
            console.error(error.message);
            res.send('error delete skill', error);
        }
    },

};

export default skillController;
