import User from "../models/User.js";

const profileController = {

    profile: async function (req, res) {
        try {
            // find by primary key
            const profile = await User.findByPk(req.params.id, {
                attributes: ['firstname', 'lastname', "email", 'grade_level', "presentation", 'birthday'] // Select specified attributs of the table
            });
            if (profile === null) {
                console.log('Not found!');
            }
            //send the answer to the front
            res.send(
                profile
            );
        } catch (error) {
            console.log('je suis ds la catch');
            console.error(error.message);
            res.render('error');
        }
    },

    modifProfile: async function (req, res) {
        try {
            // req.params contains all the data
            console.log(req.body);
            const profile = await User.findByPk(req.body.id);
            console.log(profile);
            await profile.update({
                attributes: [req.body.firstname, req.body.lastname, req.body.grade_level, req.body.presentation, req.body.birthday] // Select specified attributs of the table
            },);
            //profile is updated
            console.log(profile);
            //send the answer to the front
            res.send(
                profile
            );
        } catch (error) {
            console.error(error.message);
            res.render('error');
        }
    },
    deleteProfile: async function (req, res) {
        try {
            // req.params contains all the data
            console.log(req.params);
            const profile = await User.findByPk(req.params.id);
            await profile.destroy();
            //send the answer to the front
            res.send(
                profile
            );
        } catch (error) {
            console.error(error.message);
            res.render('error');
        }
    },
};

export default profileController;
