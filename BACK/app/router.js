import express from 'express';
import homeController from './controllers/homeController.js';
import authController from './controllers/authController.js';
import profileController from './controllers/profileController.js';
import skillController from './controllers/skillController.js';
import statisticController from './controllers/statisticController.js';
import communicationController from './controllers/communicationController.js';
import learningController from './controllers/learningController.js';
import categoryController from './controllers/categoryController.js'
import verifyToken from './middlewares.js/verifyToken.js';
import dashboardController from './controllers/dashboardController.js';
import authSearch from './middlewares.js/authSearch.js';
import adminController from './controllers/adminController.js';
import isLogged from './middlewares.js/isLogged.js';


const router = express.Router();

// home search visitors
router.get('/', isLogged, homeController.home);
router.get('/searchVisitor', authSearch, homeController.searchVisitor);

// authorisations membre
router.post('/registration', authController.registration);
router.post('/login', authController.login);
router.get('/dashboard', dashboardController.dashboard);
router.post('/logout', authController.logout);

//profile
router.get('/profile', verifyToken, profileController.profile);
router.patch('/profile', verifyToken, profileController.modifProfile);
router.delete('/profile', verifyToken, profileController.deleteProfile);

//skill
router.get('/skill', verifyToken, skillController.skill);
router.get('/oneSkill/:skillId', verifyToken, skillController.oneSkill);
router.post('/skill/:category?/:subCategory?', verifyToken, skillController.createSkill);
router.patch('/skill/:skillId', verifyToken, skillController.modifSkill);
router.delete('/skill/:skillId', verifyToken, skillController.deleteSkill);

//statistics
router.get('/statistic', verifyToken, statisticController.statistic);

//communication
router.get('/communication', verifyToken, communicationController.communicationInterests);
router.get('/communicationSkillToRate', verifyToken, communicationController.communicationSkillToRate);
router.patch('/communication/:skillId', verifyToken, communicationController.rateSkill)

// //learning
router.get('/studentLearning', verifyToken, learningController.studentLearning);
router.get('/teacherLearning', verifyToken, learningController.teacherLearning);
router.post('/learning/:skillId', verifyToken, learningController.createLearning);
router.patch('/acceptLearning/:meetingId', verifyToken, learningController.acceptLearning);
router.patch('/declineLearning/:meetingId', verifyToken, learningController.declineLearning);
router.patch('/closeLearning/:meetingId', verifyToken, learningController.closeLearning);
router.delete('/learning/:meetingId', verifyToken, learningController.deleteLearning);

//categories
router.get('/categories', categoryController.getAllCategories);
router.get('/subCategories/:categoryId?', categoryController.getSubCategories);


//admin
router.get('/admin', adminController.admin);
router.get('/admin/:userId', adminController.adminGetSkillsOfOneUser);
router.patch('/admin/:userId', adminController.adminModifUser);
router.patch('/admin/skill/:skillId', adminController.adminModifSkill);
router.delete('/admin/:userId', adminController.adminDeleteUser);
router.delete('/admin/skill/:skillId', adminController.adminDeleteOneSkill);


export default router;

// pseudocode for authentification

// user? (verif si mail existe dans bdd)
//      oui => comparaison hash
//          mdp ok => verification existence token
//              pas de token => création token
//                              renvoi token
//                              sortie de fonction
//              token => verification validité token
//                      token pas ok => throw error (est ce que je dois l'indiquer)
//                      token ok => comparaison des emails
//                                 (token sauvegardé dans navigateur
//                                  n'est pas forcément celui de la personne
//                                  qui se connecte)
//                          mail pas ok => création d'un token
//                                         renvoi du token
//                          mail ok => renvoi reponse ok
