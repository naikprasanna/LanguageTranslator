const db = require("../public/mysql");

const dbfunctions = {


  //function adds cache to database
  addToDatabase(key, value) {
    var sql =
      "INSERT INTO translations (nkey,nvalue) VALUES ('" +
      key +
      "','" +
      value +
      "')";
    db.query(sql, function (err, result) {
      if (err) throw err;
      console.log("new record inserted to db");
    });
  },

  //function  gets cache from database
  getFromDatabase(key, callback) {
    db.query(
      "SELECT nvalue FROM translations WHERE nkey='" + key + "'",
      (err, result) => {
        if (err) {
          callback(err, null);
        } else {
          callback(null, result);
        }
      }
    );
  },
};
module.exports = dbfunctions;
