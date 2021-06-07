const express = require('express');
const validateRequest = require('../middlewares/validate-request');

const currentUser = require('../middlewares/current-user');
const requireAuth = require('../middlewares/require-auth');
const { registerValidator, loginValidator } = require('../validators/authValidator');

const router = express.Router();

const authController = require('../controllers/auth/index');

router.post('/register', registerValidator, validateRequest, authController.register);

router.post('/login', loginValidator, validateRequest, authController.login);

router.post('/logout', currentUser, requireAuth, authController.logout);

module.exports = router;
