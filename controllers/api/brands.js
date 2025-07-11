const con = require('../../config/db');

const getBrandData = (req, res) =>{ 
    con.query("SELECT * FROM brands", (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).send("Error retrieving brands");
        }
        res.render('pages/tbl_brands', { Brands: data }); // Ensure `author` is passed
    });
    
}



//post create
const postBrand = (req, res)=>{
    console.log(req.body);
    
    let sql = "INSERT INTO `brands`( `BrandName`) VALUES (?)";
    let mySql = [req.body.BrandName, req.body.BrandID]; 
    con.query(sql, mySql, (err, data) =>{
        if(err){
            console.log(err);      
        }
        // console.log('sucess');
        res.redirect('tbl_brands');
    })
    
}


//edit
const geteditBrand = (req, res) => {
    const brandID = req.params.BrandID;

    con.query("SELECT * FROM brands WHERE BrandID = ?", [brandID], (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).send("Error retrieving brand");
        }

        if (data.length === 0) {
            return res.status(404).send("Brand not found");
        }

        res.render('pages/editBrand', { Brands: data });
    });
};



const posteditBrand = (req, res) =>{
    console.log(req.body);
    let sql = "UPDATE `brands` SET `BrandName`=?  WHERE BrandID=?";
    let body = req.body;
    let arrsql = [body.BrandName, body.BrandID];

    con.query(sql, arrsql, (err, data) =>{
        if(err){
            console.log(err); 
          }
          res.redirect('/tbl_brands');
    })
    
}


// //delete
const deleteBrand = (req, res) => {
    con.query("DELETE FROM `brands` WHERE BrandID = ?", [req.params.BrandID], (err) => {
        if (err) {
            console.error(err);
            return res.status(500).send("Error deleting brands");
        }
        res.redirect('/tbl_brands');
    });
};



module.exports= {
    // getData,
    getBrandData,
      postBrand,
    geteditBrand,
    posteditBrand,
    deleteBrand,
   
}