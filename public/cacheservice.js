const NodeCache =require('node-cache');

class Cache {

  constructor(ttlSeconds) {
    this.cache = new NodeCache({ stdTTL: ttlSeconds, checkperiod: ttlSeconds * 0.2, useClones: false });
  }

  get(key, storeFunction) {
    
     key=JSON.stringify(key);
    const value = this.cache.get(key);
    if (value) {
      return Promise.resolve(value);
    }

    return storeFunction().then((result) => {
         
        this.cache.set(key, result);
        key=JSON.parse(key);
        var tempkey={
           text:result,
           source:key.target,
           target:key.source
        }
        tempkey=JSON.stringify(tempkey);
        this.cache.set(tempkey,key.text);
       
      return result;
    }).catch((err)=>console.log(err));
  }

  del(keys) {
    this.cache.del(keys);
  }


  flush() {
    this.cache.flushAll();
  }
}

module.exports=Cache;