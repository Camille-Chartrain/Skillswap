import { User, Category, Skill, Interest, Meeting } from "../models/index.js";

const communicationController = {

    communicationInterests: async function (req, res) {
        try {
            const skill = await Skill.findAll({
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
                                    attributes: [], // Omet les attributs de la table de jonction
                                    where: {
                                        UserId: req.user.id
                                    }
                                },
                                required: true // Assure que seulement les catégories associées à cet utilisateur sont incluses
                            }
                        ],
                        required: true // Assure que seulement les catégories associées à cet utilisateur sont incluses
                    }
                ],
                limit: 5, // Limite à 5 résultats
                order: [['id', 'DESC']] // Tri par ordre croissant d'identifiants
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

    communicationSkillToRate: async function (req, res) {
        try {
            console.log("on est dans communicationSkillToRate");
            const skillsToRate = await Skill.findAll({
                // Find the skills that need to be rated by the student 
                // (those linked to meetings with a status of 'terminé'), 
                // and include the teacher's information.
                include: [
                    {
                        // User as teacher
                        model: User,
                        attributes: ['firstname', 'lastname', 'id'],
                    },
                    {
                        model: Meeting,
                        // UserId in Meeting is the student
                        where: {
                            UserId: req.user.id,
                            status: "terminé"
                        },
                    }
                ],
                required: true
            })
            res.send(
                skillsToRate
            );
        }
        catch (error) {
            console.error(error.message);
            res.status(400).send(error);
        }
    },

    rateSkill: async function (req, res) {
        try {
            console.log(" req.body", req.body);
            console.log("req.params", req.params);
            console.log("req.params.skillId:", req.params.skillId);
            console.log(" req.body", req.body);

            // check if the user (as a student) is associated with this skill in 
            // a meeting with "terminé" status
            const meeting = await Meeting.findOne({
                where: {
                    UserId: req.user.id,
                    SkillId: req.params.skillId,
                    status: "terminé"
                },
                include: [{ model: Skill }],
                required: true
            })

            console.log("meeting", meeting);
            if (!meeting) {
                res.send("This meeting doesn't exist - is not over -  already rated");
            }
            else if (meeting) {
                // console.log('Type of myVariable:', typeof req.body.mark, req.body.mark);
                // parse the string into a number
                const mark = parseFloat(req.body.mark);
                // console.log('Type of myVariable:', typeof mark after parseFloat, mark);

                if (isNaN(mark)) {
                    return res.status(400).json('Invalid mark, not a number');
                }
                const skill = meeting.Skill
                // console.log("skill du meeting", skill);
                // console.log("skill.title", skill.title);

                //Update the averageMark by calculating the average of the existing rating 
                // and the new rating, 
                // then round to the nearest whole number.
                skill.sumOfMarks = (skill.sumOfMarks || 0) + mark;
                skill.numberOfRating = (skill.numberOfRating || 0) + 1;
                const average = skill.sumOfMarks / skill.numberOfRating;
                skill.averageMark = Math.round(average);
                await skill.save();

                // rate given by the student to this course
                meeting.mark = mark

                // pass the status of the meeting to "noté"
                meeting.status = "noté"

                await meeting.save()

                res.status(200).json('rating ok')
            }
        }
        catch (error) {
            console.error(error.message);
            res.status(400).send(error);
        }
    },
}

export default communicationController;
