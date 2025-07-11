const express = require('express');
const con = require('../../config/db');
const {signinGet, signupGet} = require('../../controllers/web/auth');

const router = express.Router();
//create
router.get('/register', signupGet);

router.get('/signin', signinGet);

module.exports= router;