import express from 'express';
import mainController from './controllers/mainController.js';
import denounceController from './controllers/denounceController.js';
import authController from './controllers/authController.js';
import userController from './controllers/userController.js';

const router = express.Router();

// home search visitors
router.get('/', homeController.home);

// authorisations membre
router.post('/registration', authController.registration);
router.post('/login', authController.login);
router.post('/logout', authController.logout);

//search for members
router.get('/search', mainController.search);

//profil
router.get('/profile', profileController.profile);
router.post('/profile', profileController.createProfile);
router.patch('/profile', profileController.modifProfile);
router.delete('/profile', profileController.deleteProfile);

router.get('/skill', profileController.competence);
router.post('/skill', profileController.createCompetence);
router.patch('/skill', profileController.modifCompetence)
router.delete('/skill', profileController.deleteCompetence)

//statistics
router.get('/statistic', statisticController.statistic);
router.patch('/statistic', mainController.modifStatistic);

//communication
router.get('/communication', communicationController.Communication);
router.post('/communication', communicationController.createCommunication);
router.patch('/communication', communicationController.modifCommunication)
router.delete('/communication', communicationController.deleteCommunication)

//learning
router.get('/learning', learningController.learning);
router.post('/learning', learningController.createLearning);
router.patch('/learning', learningController.modifLearning)
router.delete('/learning', learningController.deleteLearning)

//admin
router.get('/admin', adminController.admin);



//ex parametre
router.get('/qqch/:slug', qqchController.qqch);


export default router;