import { Category, SubCategory } from "../models/index.js";

const categoryController = {

    getAllCategories: async function (req, res) {
        try {
            const categories = await Category.findAll();
            // console.log(categories);
            if (!categories) {
                console.log('Categories Not found!');
            }
            res.send(
                categories
            );
        } catch (error) {
            console.error("erreur getCategories:", error);
            res.status(500).json({
                message: 'Error fetching categories',
                error: error
            });
        }
    },

    getSubCategories: async function (req, res) {
        try {
            // console.log("req.params=", req.params);
            // console.log("req.params.categoryId", req.params.categoryId);
            // console.log("typoeof params", typeof req.params.categoryId);
            let categoryId = req.params.categoryId;
            if (categoryId === "null" || categoryId === "undefined" || categoryId === undefined) {
                categoryId = false;
            }
            // ternary: if categoryId is defined by the reqeuest then it sets its value in whereClause, if it's undefined then it's false and whereClause becomes an empty object to pass in the query sequelize.
            const whereClause = categoryId ? { category_id: categoryId } : {};

            const subCategories = await SubCategory.findAll({
                where: whereClause,
            });

            // console.log(subCategories);
            if (!subCategories || subCategories.length === 0) {
                console.log('SubCategories Not found!');
                res.status(404).send('SubCategories Not found!');
                return;
            }
            res.send(subCategories);
        } catch (error) {
            console.log('Error fetching SubCategories!');
            console.error(error.message);
            res.status(500).json({
                message: 'Error fetching subCategories',
                error: error
            });
        }
    },
};

export default categoryController;
