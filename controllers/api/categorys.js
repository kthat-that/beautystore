const con = require('../../config/db');
// const vcategory = require('../validation/category')

const getdatacategory = (req, res) =>{
    con.query("SELECT * FROM categorys", (err, data) =>{
        if(err){
            console.log(err);  
        }
        res.render('pages/tbl_categorys', {categorys : data});
    }) 
    
}

const  getcategory= (req, res)=>{
    // console.log(req.body);
    res.render('pages/frmCategorys')
}

//post create
const postcategory = (req, res)=>{
    
    let sql = "INSERT INTO `categorys`( `CategoryName`) VALUES (?)";
    let mySql = [req.body.CategoryName, req.body.CategoryID]; 
    con.query(sql, mySql, (err, data) =>{
        if(err){
            console.log(err);      
        }
        // console.log('sucess');
        res.redirect('/tbl_categorys');
    })
    
}


//edit
const getedit =  (req, res) =>{
    // console.log(req.params);
    con.query('select * from categorys where CategoryID =?',req.params.CategoryID, (err, data) =>{
        if(err){
            console.log(err);  
        }
        // console.log(data);
       res.render('pages/editCategory', {categorys : data})
    })
    
  }


const postedit = (req, res) =>{
    // console.log(req.body);
    let sql = "UPDATE `categorys` SET `CategoryName`=? WHERE CategoryID =?";
    let body = req.body;
    let arrsql = [body.CategoryName ,body.CategoryID];

    con.query(sql, arrsql, (err, data) =>{
        if(err){
            console.log(err); 
          }
          res.redirect('/tbl_categorys');
    })
    
}


//delete
const deletecategory = (req, res) =>{
    // console.log(req.params);
    con.query("DELETE FROM `categorys` WHERE CategoryID=?", req.params.CategoryID, (err, data) =>{
        if(err){
            console.log(err);
            
        }
        res.redirect('/tbl_categorys');
    })
    
}


module.exports= {
    getdatacategory,
    getcategory,
    postcategory,
    getedit,
    postedit,
    deletecategory,
}