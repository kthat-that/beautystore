const express = require('express');
const con = require('../../config/db');
const createController = require('../../controllers/api/brands');


const router = express.Router();

// router.get('/',authorController.getData);


// router.get('/tbl_book', bookController.postbookData);
router.get('/tbl_brands', createController.getBrandData );
//create
router.post('/frmCreateBrand',createController.postBrand);

//edit
router.get('/editBrand/:BrandID',createController.geteditBrand);
router.post('/editBrand', createController.posteditBrand);

//delete
router.get('/delete_category/:BrandID', (createController.deleteBrand));


module.exports = router;