const con = require('../../config/db');
const fs = require ('fs')
const path = require('path');

const getAll = (req, res) => {
  const productSql = `
    SELECT 
      products.ProductID,
      products.ProductName,
      products.Description,
      products.Price,
      products.img
    FROM products;
  `;

  const newProductSql = `
    SELECT 
      id,
      name,
      des,
      price,
      img
    FROM newproducts;
  `;

  con.query(productSql, (err, productData) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Error retrieving products.');
    }

    con.query(newProductSql, (err, newProductData) => {
      if (err) {
        console.error(err);
        return res.status(500).send('Error retrieving new products.');
      }

      res.render('pages/Homepage', {
        products: productData,
        newproducts: newProductData,
      });
    });
  });
};



const getAllproduct = async (req , res) =>{
     const sql = `
    SELECT 
        products.ProductID,
        products.ProductName,
        categorys.CategoryName AS category_name,
        brands.BrandName AS brand_name,
        products.Description,
        products.Price,
        products.StockQty,
        products.img
    FROM products
    INNER JOIN categorys ON categorys.CategoryID = products.category_id
    INNER JOIN brands ON brands.BrandID = products.brand_id;
`;


     con.query(sql, (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Error retrieving products.');
        }
        console.log(data);
        
        res.render('pages/tbl_products', { products: data });
    });
}

const getAllSkincare = async (req , res) =>{
     const sql = `
    SELECT 
        products.ProductID,
        products.ProductName,
        categorys.CategoryName AS category_name,
        brands.BrandName AS brand_name,
        products.Description,
        products.Price,
        products.StockQty,
        products.img
    FROM products
    INNER JOIN categorys ON categorys.CategoryID = products.category_id
    INNER JOIN brands ON brands.BrandID = products.brand_id;
`;


     con.query(sql, (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Error retrieving products.');
        }
        console.log(data);
        
        res.render('pages/Skincare', { products: data });
    });
}

const getBrandProducts = (brandName, page) => {
  return (req, res) => {
    const sql = `
      SELECT 
        products.ProductID,
        products.ProductName,
        products.Description,
        products.Price,
        products.StockQty,
        products.img,
        brands.BrandName AS brand_name
      FROM products
      INNER JOIN brands ON brands.BrandID = products.brand_id
      WHERE LOWER(brands.BrandName) = ?;
    `;

    con.query(sql, [brandName.toLowerCase()], (err, products) => {
      if (err) {
        console.error(`Error retrieving ${brandName} products:`, err);
        return res.status(500).send(`Error retrieving ${brandName} products.`);
      }

      res.render(`pages/${page}`, { products });
    });
  };
};




// Get create product form
const getfrmProCreate = (req, res) => {
    con.query("SELECT * FROM `brands` ", (err, Brands) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Error retrieving brands.');
        }
        con.query("SELECT * FROM `categorys` ", (err, Categorys) => {
            if (err) {
                console.error(err);
                return res.status(500).send('Error retrieving categories.');
            }
            res.render('pages/frmCreateProduct', { Brands, Categorys, err: {}, data: {} });
        });
    });
};

// Post create product
const postfrmProCreate = (req, res) => {
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
        const { ProductName, category, brand, Description, Price, StockQty } = req.body;
        const sql = `INSERT INTO products 
            (ProductName, category_id, brand_id, Description, Price, StockQty, img) 
            VALUES (?, ?, ?, ?, ?, ?, ?)`;

        const values = [ProductName, category, brand, Description, Price, StockQty, sampleFileName];

        con.query(sql, values, (err) => {
            if (err) {
                console.error('Error inserting product:', err);
                return res.status(500).send('Error adding Product.');
            }
            res.redirect('/tbl_products');
        });
    }
};



// Delete Product
const deleteProduct = (req, res) =>{
    // console.log(req.params);
    const { ProductID, img } = req.params;
    const imgPath = `./public/upload/${img}`;
    con.query("DELETE FROM `products` WHERE  ProductID=?",  [ProductID], (err) =>{
        if(err){
            console.log(err);
            
        }
        if (fs.existsSync(imgPath)) {
            fs.unlinkSync(imgPath); 
        }
        res.redirect('/tbl_products');
    })

}

// get Edit book form
const getEditPro = (req, res) => {
    const productSql = "SELECT * FROM `products` WHERE  ProductID= ?";
    const categorySql = "SELECT * FROM `categorys`";
    const brandrSql = "SELECT * FROM `brands`";

    con.query(productSql, [req.params.ProductID], (err, Products) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Error retrieving Product.');
        }

        con.query(brandrSql, (err, Brands) => {
            if (err) {
                console.error(err);
                return res.status(500).send('Error retrieving brand.');
            }

            con.query(categorySql, (err, Categorys) => {
                if (err) {
                    console.error(err);
                    return res.status(500).send('Error retrieving categories.');
                }

                res.render('pages/editProduct', { products: Products[0], Brands, Categorys });
            });
        });
    });
};

const postEditPro = (req, res) => {
   const { ProductID, ProductName, category_id, brand_id, Description, Price, StockQty, old_img } = req.body;

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

            const sql = "UPDATE `products` SET `ProductName`=?, `category_id`=?, `brand_id`=?, `Description`=?, `Price`=?, `StockQty`=?, `img`=? WHERE ProductID=?";
           const values = [ProductName, category_id, brand_id, Description, Price, StockQty, file, ProductID];


            con.query(sql, values, (err) => {
                if (err) {
                    console.error('Error updating product:', err);
                    return res.status(500).send('Error updating product.');
                }
                res.redirect('/tbl_products');
            });
        });

    } else {
      
        const sql = "UPDATE `products` SET `ProductName`=?, `category_id`=?, `brand_id`=?, `Description`=?, `Price`=?, `StockQty`=?, `img`=? WHERE ProductID=?";
        const values = [ProductName, category, brand, Description, Price, StockQty, file, ProductID];

        con.query(sql, values, (err) => {
            if (err) {
                console.error('Error updating product:', err);
                return res.status(500).send('Error updating product.');
            }
            res.redirect('/tbl_products');
        });
    }
};

const getDetail = (req, res) => {
  const productId = req.params.ProductID;

  const sql = `
    SELECT 
      products.ProductID,
      products.ProductName,
      categorys.CategoryName AS category,
      brands.BrandName AS brand,
      products.Description,
      products.Price,
      products.StockQty,
      products.img
    FROM products
    INNER JOIN categorys ON categorys.CategoryID = products.category_id
    INNER JOIN brands ON brands.BrandID = products.brand_id
    WHERE products.ProductID = ?
  `;

  con.query(sql, [productId], (err, results) => {
    if (err) {
      console.error('Error fetching product details:', err);
      return res.status(500).send('Error retrieving product details.');
    }

    if (results.length === 0) {
      return res.status(404).send('Product not found.');
    }

    res.render('pages/details', { product: results[0] });
  });
};



exports.getAuna = getBrandProducts('Auna', 'Auna');
exports.getSkin1004 = getBrandProducts('Skin1004', 'Skin1004');
exports.get3CE = getBrandProducts('3CE', '3CE');
exports.getPhka = getBrandProducts('Phka', 'Phka');

module.exports = {
  getAll,
  getAllproduct,
  getAllSkincare,
  getfrmProCreate,     
  postfrmProCreate,    
  deleteProduct,
  getEditPro,
  postEditPro,
  getDetail,
  getAuna: exports.getAuna,
  getSkin1004: exports.getSkin1004,
  get3CE: exports.get3CE,
  getPhka: exports.getPhka
};


