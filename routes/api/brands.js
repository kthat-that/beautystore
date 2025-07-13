const express = require('express');
const con = require('../../config/db');
const createController = require('../../controllers/api/brands');
const { requireAuth, requireAdmin, checkUser } = require('../../middlewares/auth');


const router = express.Router();

// router.get('/',authorController.getData);


// router.get('/tbl_book', bookController.postbookData);
router.get('/tbl_brands',requireAuth,requireAdmin, createController.getBrandData );
//create
router.post('/frmCreateBrand',requireAuth,requireAdmin,createController.postBrand);

//edit
router.get('/editBrand/:BrandID',createController.geteditBrand);
router.post('/editBrand', createController.posteditBrand);

//delete
router.get('/delete_category/:BrandID', (createController.deleteBrand));


module.exports = router;