require("dotenv").config();
const mysql = require("mysql");
const selectUser = require("./queries/selectUser");
const { toJson, toSafelyParseJson } = require("./utils/helpers");
// function call created connection that takes an object that is all of our database information
const connection = mysql.createConnection({
   host: process.env.RDS_HOST,
   user: process.env.RDS_USER,
   password: process.env.RDS_PASSWORD,
   database: "white_bear_app",
});

connection.connect();

// can run a query
connection.query(selectUser("kate@gmail.com", "replace_me"), (err, res) => {
   if (err) {
      console.log(err);
   } else {
      // returns an array of object that contains the information about the user
      const user = toSafelyParseJson(toJson(res))[0];
      console.log(user);
   }
});

connection.end();
