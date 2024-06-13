import { Sequelize, Op } from "sequelize";
import { User, Category, Skill, SubCategory } from "../models/index.js";
import sequelize from "../database.js";

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
            console.log("req.query searchVisitor", req.query);
            console.log("req query.categoryId", req.query.CategoryId);
            console.log("req.query.level", req.query.level);
            console.log("req.query.subCategoryId", req.query.SubCategoryId);
            console.log("req.query.input", req.query.input);

            // const categoryId = req.query.categoryId;
            // const subCategoryId = req.query.subCategoryId;
            // const level = req.query.level;
            // const input = req.query.input;

            const { CategoryId, SubCategoryId, level, input } = req.query;

            console.log("categoryId", CategoryId);
            console.log("subcategoryId", SubCategoryId);
            console.log("level", level);
            console.log("input", input);


            // Construire la clause WHERE avec plusieurs conditions
            const whereClause = {};

            if (CategoryId) {
                whereClause.CategoryId = CategoryId;
            }
            if (SubCategoryId) {
                whereClause.SubCategoryId = SubCategoryId;
            }
            if (level) {
                whereClause.level = level;
            }
            if (input) {
                whereClause[Op.or] = [
                    { title: { [Op.iLike]: `%${input}%` } },
                    { description: { [Op.iLike]: `%${input}%` } }
                ];
            }


            const options = {
                where: whereClause,
            };

            console.log("req.user", req.user);
            if (!req.user) {
                options.limit = 4;
            }

            // options.attributes = ['id', 'title', 'description', 'level', "CategoryId", "SubCategoryId", 'firstname', 'lastname', "email", 'grade_level', "presentation"]

            const { count, rows } = await Skill.findAndCountAll({
                ...options,
                attributes: [
                    "id",
                    "title",
                    "duration",
                    "price",
                    "averageMark",
                    "sumOfMarks",
                    "numberOfRating",
                    "level",
                    "transmission",
                    "description",
                    "availability",
                    "SubCategoryId",
                    "CategoryId"
                ],
                include: [{
                    model: User,
                    attributes: [
                        'firstname',
                        'lastname',
                        "email",
                        'grade_level',
                        "presentation"
                    ]
                },
                {
                    model: Category,
                    attributes: [
                        'picture',
                        'name'
                    ]
                },
                {
                    model: SubCategory,
                    attributes: ['name']
                }],
                required: true,
            });

            if (!rows || rows.length === 0) {
                console.log('no match');
                res.status(200).json('no match');
                return;
            }

            console.log("count", count);
            const resultCount = rows.length;
            console.log(resultCount);

            res.send({
                rows,
                count,
                resultCount
            });
        }
        catch (error) {
            console.log('Error fetching Skill searchVisitor');
            console.error(error.message);
            res.status(500).json({
                message: 'Error fetching skills',
                error: error
            });
        }
    }

};

export default homeController;
