const express = require("express");
const bodyParser = require("body-parser");
const fetchData = require("../public/datamode");


//translate router 
const translateRoute = express.Router();
translateRoute.use(bodyParser.json());


//Route:=> localhost:3000/translate/
translateRoute.route("/").get(function (req, res,next) {
  const translateParams = req.body;
  fetchData
    .translation(translateParams)
    .then((result) => {
      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      res.send(result);
    })
    .catch((error) => {
     console.log(error);
    
      
    });
});

module.exports = translateRoute;
