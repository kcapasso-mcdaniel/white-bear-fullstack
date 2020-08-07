//Users resource
require("dotenv").config();
// represents our table and how we would manipulate our table
const express = require("express");
const router = express.Router();
// import from database file
const db = require("../../db");
const insertUser = require("../../queries/insertUser");
const selectUserById = require("../../queries/selectUserById");
const selectUserByEmail = require("../../queries/selectUserByEmail");
const { toHash } = require("../../utils/helpers");
const getSignUpEmailError = require("../../validation/getSignUpEmailError");
const getSignUpPasswordError = require("../../validation/getSignUpPasswordError");
const getLoginEmailError = require("../../validation/getLoginEmailError");
const getLoginPasswordError = require("../../validation/getLoginPasswordError");

// json web token
const jwt = require("jsonwebtoken");

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
   // await because of database query
   const emailError = await getSignUpEmailError(email);
   const passwordError = getSignUpPasswordError(password, email);
   let dbError = "";
   // if there are no errors
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
         .then(() => {
            // select the user and search database
            db.query(selectUserById, id)
               .then((users) => {
                  const user = users[0];
                  // on success
                  res.status(200).json({
                     id: user.id,
                     email: user.email,
                     createdAt: user.created_at,
                  });
               })
               // if error respond with 400 error dbError json
               .catch((err) => {
                  console.log(err);
                  dbError = `${err.code} ${err.sqlMessage}`;
                  res.status(400).json({ dbError });
               });
         })
         .catch((err) => {
            console.log(err);
            // return a 400 error to user
            dbError = `${err.code} ${err.sqlMessage}`;
            res.status(400).json({ dbError });
         });
   } else {
      // key value pairs with same label
      res.status(400).json({ emailError, passwordError });
   }
});

// @route  POST api/v1/users/auth //posting to auth resource
// @desc   Authorize this user via email and password
// @access PUBLIC

// "/auth" indicates a sub route
router.post("/auth", async (req, res) => {
   const { email, password } = req.body;
   // await because of database query
   const emailError = getLoginEmailError(email);
   const passwordError = await getLoginPasswordError(password, email);

   let dbError = "";
   if (emailError === "" && passwordError === "") {
      // return the user to the client
      // this query does not have a return because it is executing a side effect versus returning something
      // the side effect is the 200 status and give it json
      db.query(selectUserByEmail, email)
         .then((users) => {
            // remember to repeat when creating a user
            const user = {
               id: users[0].id,
               email: users[0].email,
               createdAt: users[0].created_at,
            };
            const accessToken = jwt.sign(user, process.env.JWT_ACCESS_SECRET, {
               expiresIn: "1m",
            });

            res.status(200).json(accessToken);
         })
         .catch((err) => {
            console.log(err);
            // return a 400 error to user
            dbError = `${err.code} ${err.sqlMessage}`;
            res.status(400).json({ dbError });
         });
   } else {
      // key value pairs with same label
      res.status(400).json({ emailError, passwordError });
   }
});

module.exports = router;
