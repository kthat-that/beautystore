const jwt = require('jsonwebtoken');
const con = require('../config/db')


const requireAuth = (req, res, next) => {
    const token = req.cookies.jwtToken;

    if (token) {
        jwt.verify(token, 'ant scholarship', (err, decodedToken) => {
            if (err) {
                res.locals.user = null;
                next();
            } else {
                res.locals.user = decodedToken;
                next();
            }
        });
    } else {
        res.locals.user = null;
        next();
    }
};



const checkUser = (req, res, next)=>{
    const token = req.cookies.jwtToken;
    if(token){
        jwt.verify(token, 'ant scholarship', (err, decodedToken) =>{
            if(err){
                res.locals.user = null;
                res.redirect('/signin')
                // console.log(err); 
            }
            else{
                con.query('SELECT * FROM `users` WHERE id=?', decodedToken.id, (err, data) =>{
                    if(err){
                        console.log(err);
                    }

                    res.locals.user = data
                    next();
                })
            }
        })

    }else{
        res.locals.user = null;
        next();
    }  
}


module.exports = {
    requireAuth,
    checkUser,
}