import Skill from "../models/skill";

const mainController = {

    home: async function (req, res) {
        try {
            // Recuperer la liste des sites via une methode presente dans la class Website
            const skill = await Skill.findLast3();
            //CHERCHER COMMENT GERER LA REPONSE JSON POUR LA RENVOYER AU FRONT

            // ICI CT QUAND ON FAISAIT LA VUE EN BACK
            //Les passer a ma vue
            res.render('home', {
                websites: websites,
            });
        } catch (error) {
            console.error(error.message);
            res.render('error');
        }
    },
};

export default mainController;
