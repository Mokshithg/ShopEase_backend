const express = require('express');
const { signUp, signIn } = require('../controllers/authController');
const router = express.Router();

router.post('/user/signup', signUp);

router.post('/user/signin', signIn);

module.exports = router;
