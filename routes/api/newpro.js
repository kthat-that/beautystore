const express = require('express');
const con = require('../../config/db');
const newproController = require('../../controllers/api/newpro')
const proController = require ('../../controllers/api/products')

const router = express.Router();



router.get('/Homepage', proController.getAll)
router.get('/tbl_newproducts',newproController.getAllPro );

router.get('/newdetails/:id', newproController.getNewProductDetail);

router.get('/frmnewpro', newproController.getfrmnewPro);

router.post('/frmnewpro', newproController.postfrmnewpro);

router.get('/editnewpro/:id',newproController.getEditnewpro);
router.post('/editnewpro',newproController.postEditnewpro );

//delete
router.get('/delete/:id',newproController.deletenewproduct );

module.exports = router;