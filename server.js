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

    const translateParams = {
        text: 'ഹലോ, ഇന്നെങ്ങനെയുണ്ട്?',
        target: 'en',
      };
      
      languageTranslator.translate(translateParams)
        .then(translationResult => {
          console.log(JSON.stringify(translationResult.result.translations, null, 2));
        })
        .catch(err => {
          console.log('error:', err);
        });