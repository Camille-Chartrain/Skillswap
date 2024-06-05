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
router.get('/profile', verifyToken, profileController.profile);
router.patch('/profile', verifyToken, profileController.modifProfile);
router.delete('/profile', verifyToken, profileController.deleteProfile);

//skill
router.get('/skill', verifyToken, skillController.skill);
router.get('/oneSkill/:skillId', verifyToken, skillController.oneSkill);
router.post('/skill', verifyToken, skillController.createSkill);
router.patch('/skill/:skillId', verifyToken, skillController.modifSkill);
router.delete('/skill/:skillId', verifyToken, skillController.deleteSkill);

//statistics
router.get('/statistic', verifyToken, statisticController.statistic);

//communication
router.get('/communication', verifyToken, communicationController.communication);
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
// //admin
// router.get('/admin', adminController.admin);
// router.patch('/admin/statistic', adminController.modifStatistic);



// //ex parametre
// router.get('/qqch/:slug', qqchController.qqch);


export default router;