require("dotenv").config();
const mysql = require("mysql");
// function call created connection that takes an object that is all of our database information
const connection = mysql.createConnection({
   host: process.env.RDS_HOST,
   user: process.env.RDS_USER,
   password: process.env.RDS_PASSWORD,
   database: "white_bear_app",
});

connection.connect();

// can run a query
connection.query("SELECT 1 + 1 AS solution", (error, results, fields) => {
   if (error) {
      console.log(error);
   } else {
      console.log("The solution is: ", results[0].solution);
   }
});

connection.end();
