import { Meeting, Skill, User } from "../models/index.js";
import sequelize from "../database.js";
import { Op } from "sequelize";

const learningController = {

    createLearning: async function (req, res) {
        try {
            //id of the skill
            // console.log("skillId req.params:", req.params);
            console.log("req.user.id", req.user.id,);
            console.log("req.user", req.user,);


            const student = await User.findByPk(req.user.id);
            // console.log("student:", student);
            if (student.swappies <= 0) {
                throw new Error("User doesn't have enough swapppies - createLearning learningController")
            }

            const meeting = await Meeting.create({
                status: "en attente",
                SkillId: req.params.skillId,
                StudentsId: req.user.id,

            });
            // je pourrais rajouter un update pour associer l'id du teacher au meeting
            res.json(
                "cours en attente de validation"
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

    studentLearning: async function (req, res) {
        try {
            const meeting = await Meeting.findAll({
                where: {
                    UserId: req.user.id,
                    status: {
                        [Op.or]: ["en attente", "en cours", "refusé", "terminé"],
                    },
                },
                include: [
                    {
                        // User as students
                        model: User,
                        attributes: ['firstname', 'lastname', 'id'],
                    },
                    {
                        model: Skill,
                        include: [
                            {
                                // User as teacher
                                model: User,
                                attributes: ['firstname', 'lastname', 'id'],
                            },
                        ],
                    }
                ],
                required: true,
            });
            // console.log('meeting:', meeting)
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

    teacherLearning: async function (req, res) {
        try {
            const meetings = await Meeting.findAll({
                where: {
                    status: {
                        [Op.or]: ["en attente", "en cours", "refusé", "terminé"],
                    },
                },
                include: [
                    {
                        // User as students
                        model: User,
                        attributes: ['firstname', 'lastname', 'id'],
                    },
                    {
                        model: Skill,
                        where: {
                            UserId: req.user.id
                        },
                        required: true,
                        include: [
                            {
                                // User as teacher
                                model: User,
                                attributes: ['firstname', 'lastname', 'id'],
                            }
                        ]
                    }
                ],
            });
            // console.log("meeting", meetings);

            if (Array.isArray(meetings) && meetings.length === 0) {
                res.send("Pas encore d'historique en tant que prof")
            }
            else {
                res.send(
                    meetings
                );
            }
        }
        catch (error) {
            console.error("error findall meeting:", error);
            res.status(500).json({
                message: 'Error during findAll meetings',
                error: error
            });
        }
    },

    acceptLearning: async function (req, res) {
        try {
            const meetings = await Meeting.findByPk(req.params.meetingId);
            console.log("status meetings:", meetings.status);

            if (meetings.status === "en attente") {
                await Meeting.update({
                    status: "en cours",
                }, {
                    where: {
                        id: req.params.meetingId
                    }
                })
            }
            else {
                throw new Error(`cours avec statut '${meetings.status}' au lieu de 'en attente'`)
            }
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
            const meeting = await Meeting.findByPk(req.params.meetingId);
            console.log("status meeting:", meeting.status);

            if (meeting.status === "en attente") {
                await Meeting.update({
                    status: "refusé",
                }, {
                    where: {
                        id: req.params.meetingId
                    }
                });
            }
            else {
                throw new Error(`cours avec statut '${meeting.status}' au lieu de 'en attente'`)
            }
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
            const meeting = await Meeting.findByPk(req.params.meetingId, {
                include: [
                    {
                        // User as students
                        model: User,
                        attributes: ['firstname', 'lastname', 'id', "swappies", "swappiesWinned", "swappiesSpent"],
                    },
                    {
                        model: Skill,
                        include: [
                            {
                                // User as teacher
                                model: User,
                                attributes: ['firstname', 'lastname', 'id', "swappies", "swappiesWinned", "swappiesSpent"],
                            }
                        ]
                    }
                ],
            });
            // console.log("meeting pour voir les 2 users:", meeting);
            // console.log("1 meeting.User student:", meeting.User);
            // console.log("2 meeting.Skill.User teacher:", meeting.Skill.User);

            if (!meeting) {
                throw new Error("Cours non trouvé - closeLearning learningController")
            }
            else if (meeting.status === "en cours") {
                // pour les tests
                // else if (meeting) {

                const student = meeting.User;
                const teacher = meeting.Skill.User;

                if (student.swappies = 0) {
                    throw new Error("User doesn't have enough swapppies - closeLearning learningController")
                }

                student.swappies = sequelize.literal('swappies - 1')
                student.swappiesSpent = sequelize.literal('"swappiesSpent" + 1')
                await student.save();

                teacher.swappies = sequelize.literal('swappies + 1')
                teacher.swappiesWinned = sequelize.literal('"swappiesWinned" + 1')
                await teacher.save();

                meeting.status = "terminé"
                await meeting.save()
                console.log("apres update status, swappies gérés");

                res.status(200).json("meeting closed, swappies handled")
            }
            else {
                throw new Error(`cours avec statut '${meeting.status}' au lieu de 'en cours' -  closeLearning learningController`)
            }
        }
        catch (error) {
            console.error('erreur closeLearning:', error);
            res.status(500).json({
                message: 'Error, meeting not closed',
                error: error
            });
        }
    },

    deleteLearning: async function (req, res) {
        try {
            // when user delete a meeting, it doesn't delete it in the database to keep the data of all mouvements between users.
            // instead we hide it when doing the fetch of his historic.(cf function learning)
            const meeting = await Meeting.update({
                status: "supprimé",
            }, {
                where: {
                    id: req.params.meetingId
                }
            }
            );
            res.status(200).json('deletion learning completed');
            // console.log("meeting:", meeting)
        }
        catch (error) {
            console.error("error deleteLearning", error);
            res.status(500).json({
                message: 'Error, meeting not deleted',
                error: error
            });
        }
    },

};

export default learningController;
