const NodeCache = require("node-cache");
const db = require("./mysql");
const sqlfunctions = require("../public/sqlfunctions");


//setting up custom functions for node-cache
class Cache {

    //creates new cache ,takes some properties
  constructor(ttlSeconds) {
    this.cache = new NodeCache({
      stdTTL: ttlSeconds,
      checkperiod: ttlSeconds * 0.2,
      useClones: false,
    });
  
  }
            //member function to get the data from inmemory/ mySQL/ IBM api depending on which is available
  get(key, storeFunction) {
    var target=key.target;
    key = JSON.stringify(key);
    const value = this.cache.get(key);
    if (value) {
      console.log("getting from cache service \n Translation "+target+" :  => ", value);
      return Promise.resolve(value);                       //returning if value  is found in node-cache
    } else {
      return this.getdata(key, storeFunction)           //if cache is found in mysql then value is returned and saved to inmemory node-cache
        .then((result) => {
          if (result.length > 0) {
            this.cache.set(key, result);
            console.log("getting from mysql \n Translation  "+target+" :  => ", result[0].nvalue);
            return result[0].nvalue;                        //returning if value is found in persistant cache in mysql dbms
          } else {
            return storeFunction()
              .then((result) => {
                if (this.cache.keys().length >= 1000) {
                  this.flush();
                }
                this.cache.set(key, result);
                sqlfunctions.addToDatabase(key, result);
                key = JSON.parse(key);
                var tempkey = {
                  text: result,
                  source: key.target,
                  target: key.source,
                };
                tempkey = JSON.stringify(tempkey);
                this.cache.set(tempkey, key.text);
                sqlfunctions.addToDatabase(tempkey, key.text);
                console.log("getting from IBM api\n  Translation:  "+key.target+" :  => ", result);
                return result;                                          //returning translated data from IBM watson api
              })
              .catch((err) => console.log(err));
          }
        })
        .catch((err) => console.log(err));
    }
  }

  del(keys) {                                                             //function to delete inmemory cache currently not used
    this.cache.del(keys);
  }


  getdata(key) {                                          //member function to get data from mysql database, it calls the getFromDatabase situated in sqlfunctions.js
    return new Promise((resolve, reject) => {
      sqlfunctions.getFromDatabase(key, (err, result) => {
        if (err) {
          reject(err);
        } else {
          return resolve(result);
        }
      });
    });
  }

  flush() {                                           //function to delete cache from inmemory 
    this.cache.flushAll();
  }
}

module.exports = Cache;
