import express from 'express';
import homeController from './controllers/homeController.js';
import authController from './controllers/authController.js';
import profileController from './controllers/profileController.js';
import skillController from './controllers/skillController.js';
import statisticController from './controllers/statisticController.js';
const router = express.Router();

// home search visitors
router.get('/', homeController.home);
//router.get('/searchVisitor/:input?/:level?/:category?/:subCategory?', homeController.searchVisitor);

// authorisations membre
router.post('/registration', authController.registration);
router.post('/login', authController.login);
// router.post('/logout', authController.logout);

//search for members
// router.get('/search/:input?/:level?/:category?/:subCategory?', mainController.search);

//profile
router.get('/profile/:userId', profileController.profile);
router.patch('/profile/:userId', profileController.modifProfile);
router.delete('/profile/:userId', profileController.deleteProfile);

//skill
router.get('/skill/:userId', skillController.skill);
router.post('/skill/:userId', skillController.createSkill);
router.patch('/skill/:skillId', skillController.modifSkill);
router.delete('/skill/:skillId', skillController.deleteSkill);

//statistics
router.get('/statistic/:userId', statisticController.statistic);

// //communication
// router.get('/communication', communicationController.Communication);
// router.post('/communication', communicationController.createCommunication);
// router.patch('/communication', communicationController.modifCommunication)
// router.delete('/communication', communicationController.deleteCommunication)

// //learning
// router.get('/learning', learningController.learning);
// router.post('/learning', learningController.createLearning);
// router.patch('/learning', learningController.modifLearning)
// router.delete('/learning', learningController.deleteLearning)

// //admin
// router.get('/admin', adminController.admin);
// router.patch('/admin/statistic', adminController.modifStatistic);



// //ex parametre
// router.get('/qqch/:slug', qqchController.qqch);


export default router;