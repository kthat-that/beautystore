const con = require('../../config/db');
const fs = require ('fs')
const path = require('path');



const getAllPro = (req, res) => {
  const sql = `
    SELECT 
      id,
      name,
      des,
      price,
      img
    FROM newproducts;
  `;

  con.query(sql, (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Error retrieving products.');
    }

    res.render('pages/tbl_newproducts', { newproducts: data });
  });
};

const getNewProductDetail = (req, res) => {
  const newProductId = req.params.id;

  const sql = `
    SELECT 
      id,
      name,
      des,
      price,
      img
    FROM newproducts
    WHERE id = ?
  `;

  con.query(sql, [newProductId], (err, results) => {
    if (err) {
      console.error('Error fetching new product details:', err);
      return res.status(500).send('Error retrieving new product details.');
    }

    if (results.length === 0) {
      return res.status(404).send('New product not found.');
    }

    res.render('pages/details', {
      product: {
        ProductID: results[0].id,
        ProductName: results[0].name,
        Description: results[0].des,
        Price: results[0].price,
        StockQty: 'N/A',
        img: results[0].img,
        brand: 'N/A',
        category: 'N/A',
      },
    });
  });
};




// Get create product form
const getfrmnewPro = (req, res) => {
    con.query("SELECT * FROM `newproducts` ", (err, data) => {
       if (err) {
                console.error(err);
                return res.status(500).send('Error retrieving categories.');
            }
        res.render('pages/frmnewpro', { data: {} })
    
    });
};

// Post create product
const postfrmnewpro = (req, res) => {
  let sampleFileName = 'profile.jpg';

  if (req.files && req.files.img) {
    const sampleFile = req.files.img;

    sampleFileName = Date.now() + path.extname(sampleFile.name);
    const uploadPath = `./public/upload/${sampleFileName}`;

    sampleFile.mv(uploadPath, (err) => {
      if (err) {
        console.error('Error uploading file:', err);
        return res.status(500).send('Error uploading image.');
      }

      insertProduct();
    });
  } else {
    insertProduct();
  }

  function insertProduct() {
    const { name, des, price } = req.body;

    const sql = `INSERT INTO newproducts(name, des, price, img) VALUES (?, ?, ?, ?)`;
    const values = [name, des, price, sampleFileName];

    con.query(sql, values, (err) => {
      if (err) {
        console.error('Error inserting product:', err);
        return res.status(500).send('Error adding Product.');
      }
      res.redirect('/tbl_newproducts');
    });
  }
};


// Delete Product
const deletenewproduct = (req, res) =>{
    // console.log(req.params);
    const { id, img } = req.params;
    const imgPath = `./public/upload/${img}`;
    con.query("DELETE FROM `newproducts` WHERE  id=?",  [id], (err) =>{
        if(err){
            console.log(err);
            
        }
        if (fs.existsSync(imgPath)) {
            fs.unlinkSync(imgPath); 
        }
        res.redirect('/tbl_newproducts');
    })

}

const getEditnewpro = (req, res) => {
    const productSql = "SELECT * FROM `newproducts` WHERE  id= ?";
   
    con.query(productSql, [req.params.id], (err, newProducts) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Error retrieving Product.');
        }

       res.render('pages/editnewpro', { newproducts: newProducts[0]});
    });
};

const postEditnewpro = (req, res) => {
   const { id, name, des, price,  old_img } = req.body;

    let file = old_img;

    if (req.files && req.files.img) {
        const sampleFile = req.files.img;
        const sampleFileName = Date.now() + path.extname(sampleFile.name);
        const uploadPath = path.join(__dirname, '../../public/upload', sampleFileName);

        sampleFile.mv(uploadPath, (err) => {
            if (err) {
                console.error('Error uploading file:', err);
                return res.status(500).send('Error uploading image.');
            }

           
            if (old_img && old_img !== 'profile.jpg') {
                const oldFilePath = path.join(__dirname, '../../public/upload', old_img);
                if (fs.existsSync(oldFilePath) && fs.lstatSync(oldFilePath).isFile()) {
                    fs.unlinkSync(oldFilePath);
                }
            }

            file = sampleFileName;

            const sql = "UPDATE `newproducts` SET `name`=?, `des`=?, `price`=?,  `img`=? WHERE id=?";
           const values = [name, des, price,  file, id];


            con.query(sql, values, (err) => {
                if (err) {
                    console.error('Error updating product:', err);
                    return res.status(500).send('Error updating product.');
                }
                res.redirect('/tbl_newproducts');
            });
        });

    } else {
        
        const sql = "UPDATE `newproducts` SET `name`=?, `des`=?, `price`=?, `img`=? WHERE id=?";
        const values = [name, des, price, file, id];

        con.query(sql, values, (err) => {
            if (err) {
                console.error('Error updating product:', err);
                return res.status(500).send('Error updating product.');
            }
            res.redirect('/tbl_newproducts');
        });
    }
};


module.exports={

    getAllPro,
    getNewProductDetail,
    getfrmnewPro,
    postfrmnewpro,
    deletenewproduct,
    getEditnewpro,
    postEditnewpro


}