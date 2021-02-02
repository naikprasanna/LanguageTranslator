const express=require('express');
const bodyParser=require('body-parser');
const fetchData=require('../public/datamode');

const translateRoute=express.Router();  
translateRoute.use(bodyParser.json())

translateRoute.route('/')
 .get(function(req,res){
      const translateParams = req.body;
    fetchData.translation(translateParams)
      .then((result)=>{
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(result);
        })
        .catch(err => {
          res.statusCode=500;
          res.end("error :",err);
        });
 })

 module.exports=translateRoute;