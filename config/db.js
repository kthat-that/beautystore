const { connect } = require('http2');
const mysql = require('mysql');

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "lms",
    port: 3308

});
  
  con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
  })

  module.exports = con;