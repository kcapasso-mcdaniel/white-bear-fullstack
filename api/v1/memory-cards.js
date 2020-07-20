//This is the memory-cards resource
// represents our table and how we would manipulate our table
const express = require("express");
const router = express.Router();
// import from database file
const db = require("../../db");

const selectAllCards = require("../../queries/selectAllCards");

// @route  GET api/v1/memory-cards
// @desc  GET all memory cards for a user by search term and order
// @access PUBLIC

// select user query
router.get("/", (req, res) => {
   //router called from server
   db.query(
      selectAllCards(
         "54627346-e10b-44a5-8cdf-3c30cc0fa806",
         "sam",
         "`memory_cards`.`created_at` DESC"
      )
   ) // use our database to call the query method which opens connection & pass connection
      .then((dbRes) => {
         console.log(dbRes);
         res.json(dbRes);
      })
      .catch((err) => {
         // catch if there is a database error and throw error message
         console.log(err);
         res.status(400).json(err);
      });
});

// there will be more methods added here router.get()

module.exports = router;
