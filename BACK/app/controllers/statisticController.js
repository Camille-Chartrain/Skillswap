import { User, Category, Skill, Sub_category } from "../models/index.js";

const statisticController = {

    statistic: async function (req, res) {
        try {
            const statistic = await Skill.findAll({
                where: {
                    UserId: req.params.userId
                },
                attributes: ['title', 'description', 'mark'],
                order: [['id']], // order ASC id
                include: [{
                    model: User, // Table to join
                    attributes: ['firstname', 'lastname'] // Select specified attributs of the table Commande
                }, {
                    model: Category,
                    attributes: ['picture', 'name']
                },
                {
                    model: Sub_category,
                    attributes: ['name']
                }],
            });
            //send the answer to the front
            res.send(
                statistic
            );
        } catch (error) {
            console.error(error.message);
            res.render('error');
        }
    },
};

export default statisticController;
