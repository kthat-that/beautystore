const express = require('express');
const con = require('../../config/db');
const {signinGet, signupGet} = require('../../controllers/web/auth');
const { requireAuth, requireAdmin, checkUser } = require('../../middlewares/auth');

const router = express.Router();

router.get('/tbl_products', requireAuth, requireAdmin, (req, res) => {
    res.render('tbl_products');
});

router.get('/Homepage', checkUser, (req, res) => {
    res.render('home', { user: res.locals.user });
});

router.get('/register', signupGet);

router.get('/signin', signinGet);

module.exports= router;