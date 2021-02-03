const cacheService = require('../public/cacheservice');
const LanguageTranslatorV3 = require('ibm-watson/language-translator/v3');
const {
  IamAuthenticator
} = require('ibm-watson/auth');
const dbfunctions=require('../public/sqlfunctions');

require('dotenv').config();
const CREDENTIALS = JSON.parse(process.env.CREDENTIALS);
const languageTranslator = new LanguageTranslatorV3({
  version: '2018-05-01',
  authenticator: new IamAuthenticator({
    apikey: CREDENTIALS.apikey,
  }),
  serviceUrl: CREDENTIALS.url,
});




const ttl = 60 * 60 * 1; // cache for 1 Hour
const cache = new cacheService(ttl); // Create a new cache service instance



const fetchData = {
  translation(translateParams) {
    return cache.get(translateParams, () => {
      return languageTranslator.translate(translateParams)
        .then(translationResult => {
          return translationResult.result.translations[0].translation;
        });
    }).then((value) => {
      return value;
    })
  }
}


module.exports = fetchData;