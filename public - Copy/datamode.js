
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
    



//const ttl = 60 * 60 * 1; // cache for 1 Hour
//const cache = new CacheService(ttl); // Create a new cache service instance



 const fetchData={
 translation(translateParams){
   return languageTranslator.translate(translateParams)
    .then(translationResult => {
      console.log(translationResult.result.translations);
      return translationResult.result.translations;
    });
   
   
 }
}

  
module.exports =fetchData;



