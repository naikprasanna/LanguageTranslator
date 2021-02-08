# LanguageTranslator

Things needed to set up this;
1) NODEjs

2) Xampp  for sql server

3)POSTMAN to check server responses


steps to set the server running:
1) go to folder in commandline and install the node-modules required by using command:  "npm install"  **(minimize it while it installs)**

2)open xampp software and start the server

3)Go back to commandline and start the server using command :"nodemon" or "node server"or "npm start"

4)Create a database automatically by going to route /createdb by using address:   localhost:3000/createdb/(ANY DATABASE NAME YOU CAN GIVE)
 **kindly remember the database name you have given**

5)Go to the public/mysql.js and change the name of the database to your given name

6)go to POSTMAN and under Body tab select "raw" option, select JSON as data type. Enter input data in following json format:
         { 
        "text": "what is your name how are you?",
        "source":"english",
        "target":"spanish"
                        }
    **where text is your input, source is the language you are inputting ,target is the language you want to translate to**
7)send this JSON data using GET to /translate Route: http://localhost:3000/translate **You will get required translation in the body**



WORKING OF THE SERVER;

node-cache:

     >> It stores all the requested translations temporarily,    **using this because it gives better performance**

     >> When /translate request is made with JSON data ,first the server checks if there is an older request stored in in-memory cache
mysql-db:

     >> if it is not present in cache next the server checks if it is present in phphmyadmin mysql server of in  database of name you gave 

IBM-API:

     >> if not present in db, then last step is to request the translation using API

     >>after getting the translation, it is stored in both mysql db and in-memory node-cache

     >>It is stored in this way to make the cache persistant in cases such as:

        **when the server goes down or restarts the stored cache in node-cache in-memory will wipe out and there will be no way of accessing them
          In order to avoid this situation mysql db stores all the cache side by side node-cache

    >>after accessing the cache from mysql-db the server also stores the chache in node-cache for better performance




COMING FEATURES:

    >> I am currently working on hosting my server with necessary front-end on heroku

    >> also working on a smart-caching algorithm which pre-caches input/output based on users past used translation languages for faster performance
    


NOTE:

**ALL THE THINGS RELATED TO SQL DB,HOST,PORT CAN BE CHANGED IN THE .ENV FILE**

**AND CURRENTLY I HAVE KEPT THE IBM-TRANSLATER API KEY IN .ENV FILE FOR YOU TO USE AND CHECK , WHICH IN THE FUTURE I WILL REMOVE**

**kindly node that ibm watson only supports these languages, other languages will return empty bofy**
Arabic, Bengali, Bulgarian, Catalan, Chinese (Simplified & Traditional), Croatian, Czech, Danish, Dutch, English, Estonian, Finnish, French, German, Greek, Gujarati, Hebrew, Hindi, Hungarian, Irish, Italian, Indonesian, Japanese, Korean, Latvian, Lithuanian, Malay, Maltese, Malayalam, Nepali, Norwegian, Polish, Portuguese (Brazil), Romanian, Russian, Sinhala, Slovak, Slovenian, Spanish, Swedish, Tamil, Telugu, Thai, Turkish, Urdu, and Vietnamese
