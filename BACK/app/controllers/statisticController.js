import Skill from "../models/skill.js";
import User from "../models/User.js";
import Category from "../models/Category.js";
import Sub_category from "../models/Sub_category.js";

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
