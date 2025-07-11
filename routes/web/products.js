const express = require('express');
const con = require('../../config/db');
const {requireAuth }= require('../../middlewares/auth')
const {getAll,aunaget, threeCEget,aboutEget,beautyget,contactget,numbozinget,phkaget,skin1004get,skincareget, detailsget} = require('../../controllers/web/products');

const router = express.Router();
//create



router.get('/Homepage', getAll);
router.get('/3CE', threeCEget);
router.get('/About', aboutEget);
router.get('/Auna', aunaget);
router.get('/Beauty', beautyget);
router.get('/Contact', contactget);
router.get('/Numbozin', numbozinget);
router.get('/Phka', phkaget);
router.get('/skin1004', skin1004get);
router.get('/Skincare', skincareget);
router.get('/details', detailsget)



module.exports= router;