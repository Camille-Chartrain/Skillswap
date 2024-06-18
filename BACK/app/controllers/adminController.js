import { Skill, User, Category, SubCategory } from "../models/index.js";

const adminController = {

    admin: async function (req, res) {
        try {
            console.log(req.params);
            // find by primary key
            const skill = await Skill.findAll({
                where: {
                    UserId: req.user.id
                }
            });
            // console.log(skill);
            if (skill === null) {
                console.log('skills Not found!');
            }
            //send the answer to the front
            res.send(
                skill
            );
        }
        catch (error) {
            console.error('erreur get Skills:', error);
            res.status(500).json({
                message: 'Error  get skills',
                error: error
            });
        }
    },


    // modifUser: async function (req, res) {
    //     try {
    //         // req.params contains data from url
    //         //rew.body contains body of request from forms
    //         console.log(req.body);
    //         console.log(req.params.skillId);

    //         const updateFields = {
    //             title: req.body.title,
    //             duration: req.body.duration,
    //             level: req.body.level,
    //             transmission: req.body.transmission,
    //             description: req.body.description,
    //             availability: req.body.availability,
    //             SubCategoryId: req.body.SubCategoryId,
    //             CategoryId: req.body.CategoryId,
    //         };

    //         await Skill.update(
    //             updateFields, {
    //             where: {
    //                 id: req.params.skillId
    //             }
    //         });
    //         //profile is updated

    //         //send the answer to the front
    //         res.status(200).json("update du skill ok")
    //     }
    //     catch (error) {
    //         console.error(error.message);
    //         res.send('error update skill:', error);
    //     }
    // },

    deleteUser: async function (req, res) {
        // try {
        //     // req.params contains all the data
        //     console.log(req.params);
        //     await Skill.destroy({
        //         where: {
        //             id: req.params.skillId
        //         }
        //     });
        //     //send the answer to the front
        //     res.status(200).json('skill deletion completed');
        // }
        // catch (error) {
        //     console.error(error.message);
        //     res.send('error delete skill', error);
        // }
    },

};

export default adminController;
