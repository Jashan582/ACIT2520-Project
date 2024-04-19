const express = require('express');
const router = express.Router();
const authController = require('../controller/auth_controller') // Adjust path if necessary

router.get('/login', authController.login);
router.get('/register', authController.register);
router.post('/login', authController.loginSubmit);
router.post('/register', authController.registerSubmit);

module.exports = router;


