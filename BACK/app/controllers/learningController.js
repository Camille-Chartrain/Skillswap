import { Meeting, Skill } from "../models/index.js";

const learningController = {

    createLearning: async function (req, res) {
        try {
            //id of the skill
            console.log("skillId req.params:", req.params);
            console.log("req.user.id", req.user.id,);
            console.log("req.user", req.user,);

            const meeting = await Meeting.create({
                status: "en cours",
                SkillId: req.params.skillId,
                UserId: req.user.id,
            });
            res.send(
                meeting
            );
        } catch (error) {
            console.log('je suis ds la catch');
            console.error(error.message);
            res.status(400).send(error);
        }
    },
    // INSERT INTO "meeting" ("id","date","status","createdAt","updatedAt","UserId","SkillId") VALUES (DEFAULT,$1,$2,$3,$4,$5,$6) RETURNING "id","date","status","createdAt","updatedAt","UserId","SkillId";

    learning: async function (req, res) {
        try {
            console.log("req.params", req.params);

            const meeting = await Meeting.findAll({
                where: {
                    UserId: req.user.id
                }
            });
            console.log('meeting:', meeting)
            //send the answer to the front
            res.send(
                meeting
            );
        } catch (error) {
            console.error(error.message);
            res.status(400).send(error);
        }
    },

    acceptLearning: async function (req, res) {
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
        } catch (error) {
            console.log('erreur catch createSkill:', error);
            res.send('error, skill not added', error);
        }
    },

    declineLearning: async function (req, res) {
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

export default learningController;
