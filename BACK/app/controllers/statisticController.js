import { User, Category, Skill, SubCategory } from "../models/index.js";

const statisticController = {

    statistic: async function (req, res) {
        try {
            //we search the skills and the number of swappies of a user
            const statistic = await Skill.findAll({
                where: {
                    UserId: req.user.id
                },
                attributes: ['title', 'description', 'mark'],
                order: [['id']], // order ASC id
                include: [{
                    model: User, // Table to join
                    attributes: ['firstname', 'lastname', 'swappies'] // Select specified attributs of the table Commande
                }, {
                    model: Category,
                    attributes: ['picture', 'name']
                },
                {
                    model: SubCategory,
                    attributes: ['name']
                }],
            });
            console.log("statistic empty?", statistic.length);

            // if the user doens't have a skill yet we send only the nomber of swappie
            if (Array.isArray(statistic) && statistic.length === 0) {
                console.log('result function: Array statistic is empty');
                const statistic = await User.findByPk(req.user.id, {
                    attributes: ['firstname',
                        'lastname',
                        "swappies",
                    ]
                });
                console.log("res = swappie of user (user without skill) ");
                res.send(
                    statistic
                );
            }
            else {
                console.log("Array statistic not empty (user has skills) res = swappies + skills ");
                res.send(
                    statistic
                );
            }
        }
        catch (error) {
            console.error(error.message);
            res.render('error');
        }
    },
};

export default statisticController;

// requête sql:

// SELECT "Skill"."id",
// "Skill"."title",
// "Skill"."description",
// "Skill"."mark",
// "User"."id" AS "User.id",
// "User"."firstname" AS "User.firstname",
// "User"."lastname" AS "User.lastname",
// "User"."swappies" AS "User.swappies",
// "Category"."id" AS "Category.id",
// "Category"."picture" AS "Category.picture",
// "Category"."name" AS "Category.name",
// "SubCategory"."id" AS "SubCategory.id",
// "SubCategory"."name" AS "SubCategory.name"
// FROM "skill" AS "Skill"
// LEFT OUTER JOIN "user" AS "User"
// ON "Skill"."UserId" = "User"."id"
// LEFT OUTER JOIN "category" AS "Category" ON "Skill"."CategoryId" = "Category"."id"
// LEFT OUTER JOIN "SubCategory" AS "SubCategory" ON "Skill"."SubCategoryId" = "SubCategory"."id"
// WHERE "Skill"."UserId" = 54 ORDER BY "Skill"."id";
