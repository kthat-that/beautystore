const express = require('express');
const con = require('../../config/db');
const {getBrand} = require('../../controllers/web/brands');
const router = express.Router();


router.get('/frmCreateBrand', getBrand);

module.exports= router;