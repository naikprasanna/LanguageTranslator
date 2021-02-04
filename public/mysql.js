// RETUNS MYSQL DATABASE

const mysql = require("mysql");
require("dotenv").config();
var MYSQL_HOST = process.env.MYSQL_HOST;
var MYSQL_PASSWORD = process.env.MYSQL_PASSWORD;
var MYSQL_USER = process.env.MYSQL_USER;

// CREATES A DB CONNECTION
var db = mysql.createConnection({
  host: MYSQL_HOST,
  user: MYSQL_USER,
  password: MYSQL_PASSWORD,
  database:"kkb",//put your db name here, then proceed to /createtable
  
});

//connects with database
db.connect(function (err) {
  if (err) {
    throw err;
  } else {
    console.log("Connected!");
  }

});

module.exports = db;
