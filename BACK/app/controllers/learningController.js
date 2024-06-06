import { Meeting, Skill, User } from "../models/index.js";
import sequelize from "../database.js";
import { Op } from "sequelize";

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
                StudentsId: req.user.id,

            });
            // je pourrais rajouter un update pour associer l'id du teacher au meeting
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

    studentLearning: async function (req, res) {
        try {
            const meeting = await Meeting.findAll({
                where: {
                    UserId: req.user.id,
                    status: {
                        [Op.or]: ["en attente", "en cours", "refusé", "terminé"],
                    },
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

    teacherLearning: async function (req, res) {
        try {
            const meeting = await Meeting.findAll({
                where: {
                    status: {
                        [Op.or]: ["en attente", "en cours", "refusé", "terminé"],
                    },
                },
                include: [
                    {
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
                                model: User,
                                attributes: ['firstname', 'lastname', 'id'],
                            }
                        ]
                    }
                ],
            });
            console.log("meeting", meeting);

            if (Array.isArray(meeting) && meeting.length === 0) {
                res.send("Pas encore d'historique en tant que prof")
            }
            else {

                // for (const eachMeeting of meeting) {
                //     console.log('meeting.UserId==============================', eachMeeting.UserId)
                //     const student = await User.findByPk(eachMeeting.UserId, {
                //         attributes: ['firstname', 'lastname'],
                //     });
                //     console.log("student:", student);

                res.send(
                    meeting
                );
            }


            // let ourData = { ...meeting, ...student };
            // console.log("ourData:", ourData);


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
            const meeting = await Meeting.findByPk(req.params.meetingId);
            console.log("status meeting:", meeting.status);

            if (meeting.status === "en attente") {
                await Meeting.update({
                    status: "en cours",
                }, {
                    where: {
                        id: req.params.meetingId
                    }
                })
            }
            else {
                throw new Error(`cours avec statut '${meeting.status}' au lieu de 'en attente'`)
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
            const meeting = await Meeting.findByPk(req.params.meetingId);
            console.log("status meeting:", meeting.status);

            if (meeting.status === "en cours") {
                const meeting = await Meeting.update({
                    status: "terminé",
                }, {
                    where: {
                        id: req.params.meetingId
                    }
                }
                );
                console.log("meeting:", meeting);

                await User.update({

                    swappies: sequelize.literal('swappies + 1')
                }, {
                    where: {
                        id: req.user.id
                    }
                }
                )
                console.log("apres update");

                const studentMeeting = await Meeting.findByPk(req.params.meetingId, {
                    attributes: [
                        'UserId',
                        "id",
                    ]
                });
                console.log("studentMeeting:", studentMeeting);
                console.log("studentMeeting.userid:", studentMeeting.UserId);

                const student = await User.findByPk(studentMeeting.UserId);
                // console.log("student:", student);
                if (student.swappies <= 0) {
                    throw new Error("User doesn't have enough swapppies")
                }
                else {
                    await User.update({
                        swappies: sequelize.literal('swappies - 1')
                    }, {
                        where: {
                            id: studentMeeting.UserId
                        }
                    }
                    )
                }
                res.status(200).json("meeting closed, swappie handled")
            }
            else {
                throw new Error(`cours avec statut '${meeting.status}' au lieu de 'en cours'`)
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
            console.log("meeting:", meeting);
            // console.log(req.params);
            // await Meeting.destroy({
            //     where: {
            //         id: req.params.meetingId
            //     }
            // });
            // res.status(200).json('learning deletion completed');
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
