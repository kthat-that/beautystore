const con = require('../../config/db');

//get create
const  getBrand= (req, res)=>{
    // console.log(req.body);
    res.render('pages/frmCreateBrand')
}

module.exports ={
    getBrand
}