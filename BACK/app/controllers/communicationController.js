import { User, Category, Skill, Interest, Meeting } from "../models/index.js";

const communicationController = {

    communicationInterests: async function (req, res) {
        try {
            // req.params contains all the data
            console.log(req.params);

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
            // req.params contains all the data
            console.log(req.params);

            const skillsToRate = await Skill.findAll({
                // Find the skills that need to be rated by the student (those linked to meetings with a status of 'terminé'), and include the teacher's information.
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
            //send the answer to the front
            res.send(
                skillsToRate
            );
        } catch (error) {
            console.error(error.message);
            res.status(400).send(error);
        }
    },

    rateSkill: async function (req, res) {
        try {
            // req.params contains data from url
            //req.body contains body of request from forms
            console.log("req.body:", req.body);
            console.log("req.params.skillId:", req.params.skillId);

            const updateFields = {
                mark: req.body.mark,
            };

            //         static async updateRating(skillId, newMark) {
            //     const skill = await Skill.findByPk(skillId);
            //     if (skill) {
            //         skill.sumOfMarks = (skill.sumOfMarks || 0) + newMark;
            //         skill.numberOfRating = (skill.numberOfRating || 0) + 1;
            //         // Calculer la moyenne et arrondir à l'entier le plus proche
            //         const average = skill.sumOfMarks / skill.numberOfRating;
            //         skill.mark = Math.round(average);
            //         await skill.save();
            //     }
            // }

            // retrouver la note globale du cours et faire une moyenne avec la nouvelle note, arrondir au plus haut

            // //verif que le cours existe
            // const skill = await Skill.findByPk(req.params.skillId);

            // console.log("skill", skill);
            // if (!skill) {
            //     res.send("This skill doesn't exist");
            // }


            // check if the user (as a student) is associated with this skill in a meeting with "terminé" status
            const meeting = await Meeting.findOne({
                where: {
                    UserId: req.user.id,
                    SkillId: req.params.skillId,
                    status: "terminé"
                },
                required: true
            })

            console.log("meeting", meeting);
            if (!meeting) {
                res.send("This meeting doesn't exist or is not over");
            }
            else if (meeting) {
                // il faut que je crée une colonne pour indiquer le nombre de vote et une autre pour additionner toutes les notes recues.
                const skillRating = await Skill.findByPk(meeting.SkillId, {
                    attributes: ['id', 'title', 'mark'],
                })

                if (!skillRating) {
                    res.status(404).json({ message: "Skill not found" });
                    return;
                }

                // Mettre à jour la note du skill avec la nouvelle valeur
                const newMark = req.body.mark;
                skillRating.mark = newMark;

                // Sauvegarder le skill sans déclencher le hook afterUpdate
                await skillRating.save({ hooks: false });

                // Mettre à jour la moyenne des notes
                await Skill.updateRating(meeting.SkillId, newMark);

                // skillRating.mark = req.body.mark
                // // .save() to activate the hook in the model
                // await skillRating.save();
                res.status(200).json('rating ok')
            }

            // await Skill.update(
            //     updateFields, {
            //     where: {
            //         id: req.params.skillId
            //     }
            // });
            //skill is updated

            //send the answer to the front

        }
        catch (error) {
            console.error(error.message);
            res.send('error rating skill:', error);
        }
    },
}

export default communicationController;
