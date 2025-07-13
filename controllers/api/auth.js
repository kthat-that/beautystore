const con = require('../../config/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const generateToken = (id, role) => {
    return jwt.sign({ id, role }, 'ant scholarship', { expiresIn: 3 * 24 * 60 * 60 });
};


const signupPost = async (req, res) => {
    // console.log(req.body);

    let body = req.body;

   
    let checkSql = "SELECT * FROM `users` WHERE email = ?";
    con.query(checkSql, [body.email], async (err, result) => {
        if (err) {
            console.log(err);
            return res.status(500).send("Server error");
        }

        if (result.length > 0) {
           
            console.log("Email already exists.");
            return res.send("Email already registered. Please use a different email.");
        }

       
        const salt = await bcrypt.genSalt();
        let hashPassword = await bcrypt.hash(body.password, 10);

        let insertSql = "INSERT INTO `users`(`name`, `email`, `password`,`role`) VALUES (?, ?, ?,?)";
        let values = [body.name, body.email, hashPassword, body.role];

        con.query(insertSql, values, (insertErr, data) => {
            if (insertErr) {
                console.log(insertErr);
                return res.status(500).send("Error inserting user");
            }

            console.log("Inserted successfully");

         
            const token = generateToken(data.insertId, body.role);
            res.cookie('jwtToken', token, {
                maxAge: 3 * 24 * 60 * 60 * 1000,
                httpOnly: true
            });
         
            res.redirect('/Homepage');
        });
    });
};




const signinPost = (req, res) => {
    // console.log(req.body);
    let body = req.body;

    con.query('SELECT * FROM `users` WHERE email = ?', [body.email], async (err, data) => {
        if (err) {
            console.log(err);
            return res.status(500).send("Server error");
        }

        if (data.length == 0) { 
            return res.redirect('/signin');
        }

        console.log('have email');

       
        let decryptedPassword = await bcrypt.compare(body.password, data[0].password);
        console.log(decryptedPassword);

        if (decryptedPassword) {
            const token = generateToken(data[0].id, data[0].role); 
            res.cookie('jwtToken', token, {
                maxAge: 3 * 24 * 60 * 60 * 1000,
                httpOnly: true
            });

           
            if (data[0].role === 2) {
                return res.redirect('/tbl_products'); 
            } else {
                return res.redirect('/Homepage'); 
            }
        } else {
            return res.redirect('/signin'); 
        }
    });
};



const logout = (req, res) => {
    res.cookie('jwtToken', '', {maxAge : 1});
    // res.json({msg : 'Logout Successfully'});
    res.redirect('/signin')
};

module.exports ={
    signupPost,
    signinPost,
    logout
}