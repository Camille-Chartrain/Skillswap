import { Op } from "sequelize";
import { User, Category, Skill, SubCategory } from "../models/index.js";

// import SubCategory from "../models/SubCategory.js";

const homeController = {

    home: async function (req, res) {
        try {

            // takes list of skill with a method in class Skill
            const skill = await Skill.findAll({
                order: [['id', 'DESC']], // order by descent with id
                limit: 4, // Limit to 4 results
                include: [{
                    model: User, // Table to join
                    attributes: ['firstname', 'lastname', "email", 'grade_level', "presentation"] // Select specified attributs of the table Commande
                }, {
                    model: Category,
                    attributes: ['picture', 'name']
                },
                {
                    model: SubCategory,
                    attributes: ['name']
                }],
            });
            //send the answer to the front

            res.send(
                skill
            );
        } catch (error) {
            console.log('je suis ds la catch');
            console.error(error.message);
            res.render('error');
        }
    },

    searchVisitor: async function (req, res) {
        try {
            // req.params contains all the data
            console.log(req.params);
            const search = req.params;
            console.log(search);
            const skill = await Skill.findAll({
                where: {
                    level: req.params.level
                },
                order: [['id', 'DESC']], // order by descent with id
                limit: 4, // Limit to 4 results
                include: [{
                    model: User, // Table to join
                    attributes: ['firstname', 'lastname', "email", 'grade_level', "presentation"] // Select specified attributs of the table
                }, {
                    model: Category,
                    where: {
                        name: req.params.category !== undefined ? valeurPrecisee : { [Op.not]: null }
                        // name: req.params.category
                    },
                    attributes: ['picture', 'name']
                },
                {
                    model: SubCategory,
                    where: {
                        name: req.params.SubCategory
                    },
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
