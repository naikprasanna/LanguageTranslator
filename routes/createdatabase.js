const express = require('express');
const createDatabase = express.Router();
const db = require('../public/mysql');


createDatabase.route('/:dbname')
    .get((req, res) => {
        db.query("CREATE DATABASE IF NOT EXISTS "+req.params.dbname+" ", function (err, result) {
            if (err) throw err;
            console.log("Database created");
            console.log(result);
            res.statusCode = 200;
            res.setHeader('Content-type', 'text/html')
            res.end("<h2>Database created\n Kindly set the database to  "+req.params.dbname+" in   {mysql.js} and route to /createdb/"+req.params.dbname+"/createtable to create table<h2>")
        });
    })
createDatabase.route('/:dbname/createtable')
    .get((req, res) => {
        var sql = "CREATE TABLE IF NOT EXISTS translations (nkey VARCHAR(555), nvalue VARCHAR(555))";
        db.query(sql, function (err, result) {
            if (err) {
                console.log(err);
            }else{

            
            console.log("Table created");
            console.log(result);
            res.statusCode = 200;
            res.setHeader('Content-type', 'text/html');
            res.end("</br></br><h3>Table automatically created for storing cache</h3>");
            }
        });
    })

module.exports = createDatabase;