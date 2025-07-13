const express = require('express');
const con = require('../../config/db');
const { requireAuth, requireAdmin, checkUser } = require('../../middlewares/auth');
const proController = require('../../controllers/api/products');

const router = express.Router();

// View product 
router.get('/Homepage', proController.getAll);

router.get('/', requireAuth, proController.getAllproduct);
router.get('/tbl_products', requireAuth, requireAdmin ,proController.getAllproduct);


// Create product
router.get('/frmCreateProduct',requireAuth, requireAdmin , proController.getfrmProCreate);
router.post('/frmCreateProduct',requireAuth, requireAdmin , proController.postfrmProCreate);

// Edit product
router.get('/editProduct/:ProductID' , proController.getEditPro);
router.post('/editProduct', proController.postEditPro);

// Delete product
router.get('/delete/:ProductID', proController.deleteProduct);

// Product details
router.get('/details/:ProductID', proController.getDetail);
router.post('/details', proController.getDetail);

// 
router.get('/3CE', proController.get3CE);
router.get('/Auna', proController.getAuna);
router.get('/Phka', proController.getPhka);
router.get('/skin1004', proController.getSkin1004);
router.get('/Skincare', proController.getAllSkincare);

// Static pages 
// router.get('/About', (req, res) => res.render('pages/About'));
// router.get('/Contact', (req, res) => res.render('pages/Contact'));

module.exports = router;
