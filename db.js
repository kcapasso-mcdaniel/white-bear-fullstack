// Database file using pool connections
require("dotenv").config();
const nodeUtil = require("util");
const mysql = require("mysql");

// pool of connections that we are accessing in the database
const db = mysql.createConnection({
   connectionLimit: 10,
   host: process.env.RDS_HOST,
   user: process.env.RDS_USER,
   password: process.env.RDS_PASSWORD,
   database: "white_bear_app",
});

// using node utility promisify for async/await
db.query = nodeUtil.promisify(db.query);

// This is the export
module.exports = db;
