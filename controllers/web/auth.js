const con = require('../../config/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const signupGet = (req, res)=>{
    res.render('auth/register')
}


const signinGet = (req, res)=>{
    res.render('auth/signin')
}

module.exports ={
    signupGet,
    signinGet,
 
}