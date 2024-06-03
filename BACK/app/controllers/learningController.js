import { Meeting, Skill, User } from "../models/index.js";
import sequelize from "../database.js";

const learningController = {

    createLearning: async function (req, res) {
        try {
            //id of the skill
            console.log("skillId req.params:", req.params);
            console.log("req.user.id", req.user.id,);
            console.log("req.user", req.user,);

            const meeting = await Meeting.create({
                status: "en attente",
                SkillId: req.params.skillId,
                UserId: req.user.id,
            });
            res.send(
                meeting
            );
        } catch (error) {
            console.error("erreur createLearning:", error);
            res.status(500).json({
                message: 'Error, meeting not created',
                error: error
            });
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
            console.error("error findall meeting:", error);
            res.status(500).json({
                message: 'Error during findAll meetings',
                error: error
            });
        }
    },

    acceptLearning: async function (req, res) {
        try {
            await Meeting.update({
                status: "en cours",
            }, {
                where: {
                    id: req.params.meetingId
                }
            }
            );
            res.status(200).json("meeting accepted")
        } catch (error) {
            console.error('erreur acceptLearning:', error);
            res.status(500).json({
                message: 'Error, meeting not accepted',
                error: error
            });
        }
    },

    declineLearning: async function (req, res) {
        try {
            await Meeting.update({
                status: "refusé",
            }, {
                where: {
                    id: req.params.meetingId
                }
            }
            );
            res.status(200).json("meeting declined")
        } catch (error) {
            console.error('erreur declineLearning:', error);
            res.status(500).json({
                message: 'Error, meeting not declined',
                error: error
            });
        }
    },

    closeLearning: async function (req, res) {
        try {
            await Meeting.update({
                status: "terminé",
            }, {
                where: {
                    id: req.params.meetingId
                }
            }
            );
            await User.update({
                swappies: sequelize.literal('swappies + 1')
            }, {
                where: {
                    id: req.user.id
                }
            }
            )
            await User.update({
                swappies: sequelize.literal('swappies - 1')
            }, {
                where: {
                    id: req.user.id
                }
            }
            )
            res.status(200).json("meeting closed, swappie handled")
        } catch (error) {
            console.error('erreur closeLearning:', error);
            res.status(500).json({
                message: 'Error, meeting not closed',
                error: error
            });
        }
    },

    deleteSkill: async function (req, res) {
        try {
            console.log(req.params);
            await Skill.destroy({
                where: {
                    id: req.params.skillId
                }
            });
            res.status(200).json('skill deletion completed');
        }
        catch (error) {
            console.error("error deleteSkill", error);
            res.status(500).json({
                message: 'Error, meeting not deleted',
                error: error
            });
        }
    },

};

export default learningController;
