const express = require('express');
const con = require('../../config/db');

const {signupPost, signinPost, logout} = require('../../controllers/api/auth');


const router = express.Router();

router.post('/register',signupPost);


router.post('/signin',signinPost);

router.get('/logout', logout);

module.exports= router;