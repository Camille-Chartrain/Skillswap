import { Category, SubCategory } from "../models/index.js";

const categoryController = {

    getAllCategories: async function (req, res) {
        try {
            // find by primary key
            const categories = await Category.findAll({
                include: [
                    { model: SubCategory, as: 'SubCategory' }
                ]
            });
            console.log(categories);
            if (!categories) {
                console.log('Categories Not found!');
            }
            //send the answer to the front
            res.send(
                categories
            );
        } catch (error) {
            console.log('je suis ds la catch');
            console.error(error.message);
            res.render('error:', error);
        }
    },

};

export default categoryController;
