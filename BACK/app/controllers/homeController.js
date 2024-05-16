import Category from "../models/Category.js";
import Skill from "../models/skill.js";
import User from "../models/User.js";
import Sub_category from "../models/Sub_category.js";

const homeController = {

    home: async function (req, res) {
        try {
            // takes list of skill with a method in class Skill
            const skill = await Skill.findAll({
                order: [['id', 'DESC']], // order by descent with id
                limit: 4, // Limit to 4 results
                include: [{
                    model: User, // Table to join
                    attributes: ['firstname', 'lastname', "email", 'grade_level', "presentation"] // Seclect specified attributs of the table Commande
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
                skill
            );
        } catch (error) {
            console.error(error.message);
            res.render('error');
        }
    },

    searchVisitor: async function (req, res) {
        try {
            // req.params contain            const search = req.params;
            const skill = await Skill.findAll({
                order: [['id', 'DESC']], // order by descent with id
                limit: 4, // Limit to 4 results
                include: [{
                    model: User, // Table to join
                    attributes: ['firstname', 'lastname', "email", 'grade_level', "presentation"] // Seclect specified attributs of the table Commande
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
                skill
            );
        } catch (error) {
            console.error(error.message);
            res.render('error');
        }
    },
};

export default homeController;
