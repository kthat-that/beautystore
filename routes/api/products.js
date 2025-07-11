const express = require('express');
const con = require('../../config/db');
const {requireAuth} = require('../../middlewares/auth')
const proController = require('../../controllers/api/products')



const router = express.Router();

//create

router.get('/', requireAuth ,proController.getAllproduct);
router.get('/Homepage', proController.getAll)
router.get('/tbl_products', proController.getAllproduct);


router.get('/frmCreateProduct', proController.getfrmProCreate);

router.post('/frmCreateProduct', proController.postfrmProCreate);

router.get('/editProduct/:ProductID',proController.getEditPro);
router.post('/editProduct', proController.postEditPro);

//delete
router.get('/delete/:ProductID', proController.deleteProduct);

router.get('/details/:ProductID', proController.getDetail);
router.post('/details', proController.getDetail);


router.get('/3CE', );
router.get('/About', );
router.get('/Auna', );
router.get('/Contact', );
router.get('/Phka', );
router.get('/skin1004', );
router.get('/Skincare', );
router.get('/details',)

module.exports= router;