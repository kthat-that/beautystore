const express = require('express');
const con = require('../../config/db');
const newproController = require('../../controllers/api/newpro')
const { requireAuth, requireAdmin, checkUser } = require('../../middlewares/auth');
const proController = require ('../../controllers/api/products')

const router = express.Router();



router.get('/Homepage', proController.getAll)
router.get('/tbl_newproducts',requireAuth, requireAdmin, newproController.getAllPro );

router.get('/newdetails/:id', newproController.getNewProductDetail);

router.get('/frmnewpro',requireAuth, requireAdmin, newproController.getfrmnewPro);

router.post('/frmnewpro',requireAuth, requireAdmin, newproController.postfrmnewpro);

router.get('/editnewpro/:id',newproController.getEditnewpro);
router.post('/editnewpro',newproController.postEditnewpro );

//delete
router.get('/delete/:id',newproController.deletenewproduct );

module.exports = router;