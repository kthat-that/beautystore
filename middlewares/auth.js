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



const checkUser = (req, res, next) => {
    const token = req.cookies.jwtToken;
    if (token) {
        jwt.verify(token, 'ant scholarship', (err, decodedToken) => {
            if (err) {
                res.locals.user = null;
                return res.redirect('/signin');
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


const requireAdmin = (req, res, next) => {
    const token = req.cookies.jwtToken;

    if (token) {
        jwt.verify(token, 'ant scholarship', (err, decodedToken) => {
            if (err) {
                return res.redirect('/signin');
            }

            if (decodedToken.role === 2) {
                next(); 
            } else {
                return res.status(403).send('Access denied: Admins only');
            }
        });
    } else {
        return res.redirect('/signin');
    }
};



module.exports = {
    requireAuth,
    checkUser,
    requireAdmin
}