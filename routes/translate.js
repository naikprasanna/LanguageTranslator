const express=require('express');
const LanguageTranslatorV3 = require('ibm-watson/language-translator/v3');
const { IamAuthenticator } = require('ibm-watson/auth');
require('dotenv').config();
const translateRoute=express.Router();
const CREDENTIALS=JSON.parse(process.env.CREDENTIALS);
    const languageTranslator = new LanguageTranslatorV3({
      version:'2018-05-01',
      authenticator: new IamAuthenticator({
        apikey: CREDENTIALS.apikey,
      }),
      serviceUrl:CREDENTIALS.url,
    });
    

          

translateRoute.route('/')
 .get(function(req,res){
      const translateParams = {
        text: 'ஹலோ, நீங்கள் எப்படி இன்று?',
        source:'hindi',
        target: 'english',
        };
      languageTranslator.translate(translateParams)
        .then(translationResult => {
          console.log(JSON.stringify(translationResult.result.translations, null, 2));
        })
        .catch(err => {
          console.log('error:', err);
        });
      console.log("translate request");
 })

 module.exports=translateRoute;