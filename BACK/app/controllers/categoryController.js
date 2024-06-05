import { Category, SubCategory } from "../models/index.js";

const categoryController = {

    getAllCategories: async function (req, res) {
        try {
            // find by primary key
            const categories = await SubCategory.findAll({
                include: [
                    {
                        model: Category,
                        attributes: ['id', 'name']
                    }
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
            // res.send('error:', error);
        }
    },

};

export default categoryController;
