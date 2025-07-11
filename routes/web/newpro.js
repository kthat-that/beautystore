const express = require('express');
const con = require('../../config/db');
const {getAll} = require('../../controllers/web/products')

const router = express.Router();
//create



router.get('/Homepage', getAll);



module.exports= router;