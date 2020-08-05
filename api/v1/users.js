//This is the users resource
// represents our table and how we would manipulate our table
const express = require("express");
const router = express.Router();
// import from database file
const db = require("../../db");
const insertUser = require("../../queries/insertUser");
const { toHash } = require("../../utils/helpers");
const getSignUpEmailError = require("../../validation/getSignUpEmailError");
const getSignUpPasswordError = require("../../validation/getSignUpPasswordError");

// @route  GET api/v1/users
// @desc  GET a valid user via email and password
// @access PUBLIC

// const selectUser = require("../../queries/selectUser");
// const { toJson, toSafelyParseJson, toHash } = require("../../utils/helpers");

// select user query - see select user query in mysql files if needed for review
// router.get("/", (req, res) => {
//    //router called from server
//    db.query(selectUser("kate@gmail.com", "replace_me")) // use our database to call the query method which opens connection & pass connection
//       .then((dbRes) => {
//          // then get something successful can console.log user
//          // returns an array of object that contains the information about the user
//          const user = toSafelyParseJson(toJson(dbRes))[0];
//          console.log(user);
//          res.json(user);
//       })
//       .catch((err) => {
//          // catch if there is a database error and throw error message
//          console.log(err);
//          res.status(400).json(err);
//       });
// });

// @route  POST api/v1/users
// @desc  Create a new user
// @access PUBLIC

router.post("/", async (req, res) => {
   const { id, email, password, createdAt } = req.body;
   // function that generates strings based on email input
   const emailError = await getSignUpEmailError(email);
   const passwordError = getSignUpPasswordError(password, email);
   if (emailError === "" && passwordError === "") {
      const user = {
         id: id,
         email: email,
         password: await toHash(password),
         created_at: createdAt,
      };
      // const user = req.body;
      // user.password = await toHash(user.password);
      // console.log(user);
      db.query(insertUser, user)
         .then((dbRes) => {
            console.log(dbRes);
            // return the user data to store in Redux store
         })
         .catch((err) => {
            console.log(err);
            // return a 400 error to user
            res.status(400).json({ emailError, passwordError });
         });
   } else {
      // key value pairs with same label
      res.status(400).json({ emailError, passwordError });
   }
});

module.exports = router;
