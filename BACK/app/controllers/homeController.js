import { Sequelize, Op } from "sequelize";
import { User, Category, Skill, SubCategory, Meeting } from "../models/index.js";
import sequelize from "../database.js";

// import SubCategory from "../models/SubCategory.js";

const homeController = {

    home: async function (req, res) {
        try {
            console.log("req.user dans homeCOntroller home", req.user);

            let isLogged = false;

            if (!req.user) {
                console.log("pas de req.user");
                isLogged = false;
            }
            else if (req.user) {
                console.log("il y a un req.user", req.user);
                isLogged = true;
            }


            // takes list of skill with a method in class Skill
            const { count, rows } = await Skill.findAndCountAll({
                order: [['id', 'DESC']], // order by descent with id
                limit: 8, // Limit to 8 results
                include: [{
                    model: User, // Table to join
                    attributes: ['firstname', 'lastname', 'grade_level', "presentation"] // Select specified attributs of the table Commande
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
            console.log("count", count);
            const resultCount = rows.length;
            console.log(resultCount);
            // console.log("les skills avec rows:::::::::::::::::::::::::::::::::::", rows);
            res.send(
                {
                    rows,
                    count,
                    resultCount,
                    isLogged
                }
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
            console.log("req.user", req.user);

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

            if (CategoryId !== "undefined" && CategoryId !== null && CategoryId !== "" && CategoryId !== "null") {
                console.log("'''''''''''''''''''''''''''rentré dans categoryId != undefined");
                console.log("typeof CategoryId", typeof CategoryId);

                const categoryIdNumber = Number(CategoryId);
                console.log("Type de categoryIdNumber :", typeof categoryIdNumber);
                console.log("Valeur de categoryIdNumber :", categoryIdNumber);

                whereClause.CategoryId = categoryIdNumber;
            }
            if (SubCategoryId !== "undefined" && SubCategoryId !== "null") {
                console.log("'''''''''''''''''''''''''''rentré dans subcategoryId != 'undefined'");
                console.log("type of subcategoryid", typeof SubCategoryId);

                const subCategoryIdNumber = Number(SubCategoryId);
                console.log("Type de subCategoryIdNumber :", typeof subCategoryIdNumber);
                console.log("Valeur de subCategoryIdNumber :", subCategoryIdNumber);

                whereClause.SubCategoryId = subCategoryIdNumber;
            }
            if (level !== null && level !== "") {
                console.log('rentré dans level !== null ou ""');
                whereClause.level = level;
            }
            if (input !== "undefined") {
                whereClause[Op.or] = [
                    { title: { [Op.iLike]: `%${input}%` } },
                    { description: { [Op.iLike]: `%${input}%` } }
                ];
            }

            // Options pour la requête
            const options = {
                where: whereClause,
            };

            let isLogged = false;
            let userSwappies = null;

            console.log("req.user", req.user);
            if (!req.user) {
                console.log("pas de req.user");
                options.limit = 8;
                // no need to precise false but i do it anyway
                isLogged = false;
            }
            else if (req.user) {
                console.log("req.user", req.user);
                isLogged = true;
            }

            // Configuration des attributs à récupérer
            const userAttributes = [
                'firstname',
                'lastname',
                'grade_level',
                'presentation'
            ];

            if (isLogged) {
                userAttributes.push('email');
            }

            // options.attributes = ['id', 'title', 'description', 'level', "CategoryId", "SubCategoryId", 'firstname', 'lastname', "email", 'grade_level', "presentation"]

            const { count, rows } = await Skill.findAndCountAll({
                ...options,
                order: [['id', 'DESC']],
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
                    attributes: userAttributes
                    // attributes: [
                    //     'firstname',
                    //     'lastname',
                    //     "email",
                    //     'grade_level',
                    //     "presentation"
                    // ]
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
                }
                ],
                // required: true,
            });

            if (!rows || rows.length === 0) {
                console.log('no match');
                res.status(200).json({
                    message: 'no match',
                    isLogged: isLogged
                });
                return;
            }

            // addition of table meeting to keep tracks of the courses the user already applied to
            if (req.user) {
                console.log("dans le if req.user.id pour ajouter table meeting au resultat du search");
                console.log("req.user.id", req.user.id);
                for (let skill of rows) {
                    const meetings = await Meeting.findAll({
                        where: {
                            SkillId: skill.id,
                            UserId: req.user.id,
                        }
                    });

                    skill.dataValues.Meetings = meetings;
                    console.log("log des meetings", meetings);
                }


                // recuperer le nombre de swappie de l'utilisateur

                const userSwappiesData = await User.findByPk(req.user.id,
                    {
                        attributes:
                            [
                                'firstname',
                                'lastname',
                                "swappies"
                            ],
                    }
                );
                if (userSwappiesData === null) {
                    console.log('User for number of swappies not found!');
                }
                else {
                    userSwappies = userSwappiesData;
                }
            }

            console.log("count", count);
            const resultCount = rows.length;
            console.log(resultCount);

            res.send({
                rows,
                count,
                resultCount,
                isLogged,
                userSwappies
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

// searchVisitor requete SQL:

// SELECT
// "Skill"."id",
// "Skill"."title",
// "Skill"."duration",
// "Skill"."price",
// "Skill"."averageMark",
// "Skill"."sumOfMarks",
// "Skill"."numberOfRating",
// "Skill"."level",
// "Skill"."transmission",
// "Skill"."description",
// "Skill"."availability",
// "Skill"."SubCategoryId",
// "Skill"."CategoryId",
// "User"."id" AS "User.id",
// "User"."firstname" AS "User.firstname",
// "User"."lastname" AS "User.lastname",
// "User"."email" AS "User.email",
// "User"."grade_level" AS "User.grade_level",
// "User"."presentation" AS "User.presentation",
// "Category"."id" AS "Category.id",
// "Category"."picture" AS "Category.picture",
// "Category"."name" AS "Category.name",
// "SubCategory"."id" AS "SubCategory.id",
// "SubCategory"."name" AS "SubCategory.name"
// FROM
// "skill" AS "Skill"
// LEFT OUTER JOIN
// "user" AS "User" ON "Skill"."UserId" = "User"."id"
// LEFT OUTER JOIN
// "category" AS "Category" ON "Skill"."CategoryId" = "Category"."id"
// LEFT OUTER JOIN
// "subcategory" AS "SubCategory" ON "Skill"."SubCategoryId" = "SubCategory"."id"
// WHERE
// ("Skill"."title" ILIKE '%%' OR "Skill"."description" ILIKE '%%')
// LIMIT 8;
