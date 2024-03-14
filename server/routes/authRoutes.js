const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const authMiddleware = require('../middlewares/authMiddleware');

router.post('/register', authController.registerUser);
router.post('/login', authController.loginUser);
router.post('/logout', authController.logoutUser);

router.get('/user', authMiddleware.authenticateToken, authController.getUserData);
router.get('/users', authController.getUsers);
router.put('/user', authMiddleware.authenticateToken, authController.updateUserData);

// router.put('/user', authMiddleware.authenticateToken, authController.updateUserData);


module.exports = router;
