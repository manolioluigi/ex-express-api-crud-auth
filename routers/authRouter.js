const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// rotte
router.post('/register', authController.register);
router.post('/login', authController.login);

module.exports = router;
