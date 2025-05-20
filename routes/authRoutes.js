const express = require('express');
const router = express.Router();
const { signup, login } = require('../controllers/authController');
const { validateSignup, validateLogin } = require('../middleware/validateAuth');

router.post('/signup', validateSignup, signup);     //signup
router.post('/login', validateLogin, login);        //signin

module.exports = router;
