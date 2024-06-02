import { User, Category, Skill, Interest } from "../models/index.js";

const communicationController = {

    communication: async function (req, res) {
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

    rateSkill: async function (req, res) {
        try {
            // req.params contains data from url
            //req.body contains body of request from forms
            console.log(req.body);
            console.log(req.params.skillId);

            const updateFields = {
                mark: req.body.mark,
            };

            await Skill.update(
                updateFields, {
                where: {
                    id: req.params.skillId
                }
            });
            //skill is updated

            //send the answer to the front
            res.status(200).json("rating skill ok")
        }
        catch (error) {
            console.error(error.message);
            res.send('error rating skill:', error);
        }
    },
}

export default communicationController;
