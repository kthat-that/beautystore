const express = require('express');
const con = require('../../config/db');
const {getcategory} = require('../../controllers/web/categorys');
const router = express.Router();

router.get('/frmCategorys',getcategory);

module.exports= router;