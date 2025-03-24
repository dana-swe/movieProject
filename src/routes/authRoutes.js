const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController')

router.post('/users', authController.register);
router.post('/sessions', authController.login)

module.exports = router;
