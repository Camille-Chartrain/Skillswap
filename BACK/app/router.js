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
router.get('/api', isLogged, homeController.home);
router.get('/api/searchVisitor', authSearch, homeController.searchVisitor);

// authorisations membre
router.post('/api/registration', authController.registration);
router.post('/api/login', authController.login);
router.get('/api/dashboard', dashboardController.dashboard);
router.post('/api/logout', authController.logout);

//profile
router.get('/api/profile', verifyToken, profileController.profile);
router.patch('/api/profile', verifyToken, profileController.modifProfile);
router.delete('/api/profile', verifyToken, profileController.deleteProfile);

//skill
router.get('/api/skill', verifyToken, skillController.skill);
router.get('/api/oneSkill/:skillId', verifyToken, skillController.oneSkill);
router.post('/api/skill/:category?/:subCategory?', verifyToken, skillController.createSkill);
router.patch('/api/skill/:skillId', verifyToken, skillController.modifSkill);
router.delete('/api/skill/:skillId', verifyToken, skillController.deleteSkill);

//statistics
router.get('/api/statistic', verifyToken, statisticController.statistic);

//communication
router.get('/api/communication', verifyToken, communicationController.communicationInterests);
router.get('/api/communicationSkillToRate', verifyToken, communicationController.communicationSkillToRate);
router.patch('/api/communication/:skillId', verifyToken, communicationController.rateSkill)

// //learning
router.get('/api/studentLearning', verifyToken, learningController.studentLearning);
router.get('/api/teacherLearning', verifyToken, learningController.teacherLearning);
router.post('/api/learning/:skillId', verifyToken, learningController.createLearning);
router.patch('/api/acceptLearning/:meetingId', verifyToken, learningController.acceptLearning);
router.patch('/api/declineLearning/:meetingId', verifyToken, learningController.declineLearning);
router.patch('/api/closeLearning/:meetingId', verifyToken, learningController.closeLearning);
router.delete('/api/learning/:meetingId', verifyToken, learningController.deleteLearning);

//categories
router.get('/api/categories', categoryController.getAllCategories);
router.get('/api/subCategories/:categoryId?', categoryController.getSubCategories);


//admin
router.get('/api/admin', adminController.admin);
router.get('/api/admin/:userId', adminController.adminGetSkillsOfOneUser);
router.patch('/api/admin/:userId', adminController.adminModifUser);
router.patch('/api/admin/skill/:skillId', adminController.adminModifSkill);
router.delete('/api/admin/:userId', adminController.adminDeleteUser);
router.delete('/api/admin/skill/:skillId', adminController.adminDeleteOneSkill);


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
