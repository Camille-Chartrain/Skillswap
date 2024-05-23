import { User, Category, Skill, Sub_category } from "../models/index.js";

const statisticController = {

    statistic: async function (req, res) {
        try {
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
// "Sub_category"."id" AS "Sub_category.id",
// "Sub_category"."name" AS "Sub_category.name"
// FROM "skill" AS "Skill"
// LEFT OUTER JOIN "user" AS "User"
// ON "Skill"."UserId" = "User"."id"
// LEFT OUTER JOIN "category" AS "Category" ON "Skill"."CategoryId" = "Category"."id"
// LEFT OUTER JOIN "sub_category" AS "Sub_category" ON "Skill"."SubCategoryId" = "Sub_category"."id"
// WHERE "Skill"."UserId" = 54 ORDER BY "Skill"."id";
