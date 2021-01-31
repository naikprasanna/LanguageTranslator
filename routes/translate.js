const express=require('express');
const bodyParser=require('body-parser');

const LanguageTranslatorV3 = require('ibm-watson/language-translator/v3');
const { IamAuthenticator } = require('ibm-watson/auth');


require('dotenv').config();
const CREDENTIALS=JSON.parse(process.env.CREDENTIALS);
    const languageTranslator = new LanguageTranslatorV3({
      version:'2018-05-01',
      authenticator: new IamAuthenticator({
        apikey: CREDENTIALS.apikey,
      }),
      serviceUrl:CREDENTIALS.url,
    });
    

const translateRoute=express.Router();  
translateRoute.use(bodyParser.json())

translateRoute.route('/')
 .get(function(req,res){
      const translateParams = req.body;
      languageTranslator.translate(translateParams)
        .then(translationResult => {
          res.statusCode=200;
          res.setHeader("content-type","application/json");
          res.json(translationResult.result.translations);
          console.log(JSON.stringify(translationResult.result.translations, null, 2));
        })
        .catch(err => {
          res.statusCode=500;
          res.end("error :",err);
        });
 })

 module.exports=translateRoute;