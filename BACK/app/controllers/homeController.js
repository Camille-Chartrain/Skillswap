import Skill from "../models/skill.js";

const homeController = {

    home: async function (req, res) {
        try {
            // Recuperer la liste des compétences via une methode presente dans la class Skill
            const skill = await Skill.findAll();
            //CHERCHER COMMENT GERER LA REPONSE JSON POUR LA RENVOYER AU FRONT
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
