//This is the users resource
// represents our table and how we would manipulate our table
const express = require("express");
const router = express.Router();
// import from database file
const db = require("../../db");

const bcrypt = require("bcrypt");

const selectUser = require("../../queries/selectUser");
const { toJson, toSafelyParseJson, toHash } = require("../../utils/helpers");

// @route  GET api/v1/users
// @desc  GET a valid user via email and password
// @access PUBLIC

// select user query
router.get("/", (req, res) => {
   //router called from server
   db.query(selectUser("kate@gmail.com", "replace_me")) // use our database to call the query method which opens connection & pass connection
      .then((dbRes) => {
         // then get something successful can console.log user
         // returns an array of object that contains the information about the user
         const user = toSafelyParseJson(toJson(dbRes))[0];
         console.log(user);
         res.json(user);
      })
      .catch((err) => {
         // catch if there is a database error and throw error message
         console.log(err);
         res.status(400).json(err);
      });
});

// there will be more methods added here router.get()

// @route  POST api/v1/users
// @desc  Create a new user
// @access PUBLIC

router.post("/", async (req, res) => {
   const user = req.body;
   user.password = await toHash(user.password);

   console.log(user);
});

module.exports = router;
