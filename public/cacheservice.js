const NodeCache = require('node-cache');
const db = require('./mysql');
const sqlfunctions = require('../public/sqlfunctions');


class Cache {

  constructor(ttlSeconds) {
    this.cache = new NodeCache({
      stdTTL: ttlSeconds,
      checkperiod: ttlSeconds * 0.2,
      useClones: false
    });
  }



  get(key, storeFunction, dboperation) {
    key = JSON.stringify(key);
    const value = this.cache.get(key);
    if (value) {
      console.log("getting from cache service \n Translation  :", value)
      return Promise.resolve(value);
    } else {

      return this.getdata(key, storeFunction).then((result) => {

        if (result.length > 0) {
          this.cache.set(key, result);
          return result[0].nvalue;
        } else {
          return storeFunction().then((result) => {
            if (this.cache.keys().length >= 1000) {
              this.flush();
            }
            this.cache.set(key, result);
            sqlfunctions.addToDatabase(key, result)
            key = JSON.parse(key);
            var tempkey = {
              text: result,
              source: key.target,
              target: key.source
            }
            tempkey = JSON.stringify(tempkey);
            this.cache.set(tempkey, key.text);
            sqlfunctions.addToDatabase(tempkey, key.text)
            console.log("getting from IBM api\n Translation  :", result);
            return result;
          }).catch((err) => console.log(err));
        }

      }).catch((err) => console.log(err));




    }

  }

  del(keys) {
    this.cache.del(keys);
  }
  getdata(key) {
    return new Promise((resolve, reject) => {
      sqlfunctions.getFromDatabase(key, (err, result) => {
        if (err) {
          reject(err);
        } else {
          console.log("getting from mysql \n Translation  :", result[0].nvalue);
          return resolve(result);
        }
      })

    })

  }


  flush() {
    this.cache.flushAll();
  }
}

module.exports = Cache;