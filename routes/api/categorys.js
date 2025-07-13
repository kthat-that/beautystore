const express = require('express');
const con = require('../../config/db');
const createController = require('../../controllers/api/categorys');
const { requireAuth, requireAdmin, checkUser } = require('../../middlewares/auth');


const router = express.Router();

// router.get('/',authorController.getData);

router.get('/tbl_categorys',requireAuth,requireAdmin, createController.getdatacategory);
// router.get('/tbl_book', bookController.postbookData);

//create
router.post('/frmCategorys',requireAuth,requireAdmin,createController.postcategory);

//edit
router.get('/editCategory/:CategoryID',createController.getedit);
router.post('/editCategory', createController.postedit);

//delete
router.get('/delete_category/:CategoryID', (createController.deletecategory));


module.exports = router;