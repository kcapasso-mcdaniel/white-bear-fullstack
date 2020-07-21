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
   console.log(req.query);
   // pull memory cards by this user and by this search term
   const { userId, searchTerm, order } = req.query;
   let constructedSearchTerm;
   // if search term is empty string or is undefined
   if (searchTerm === "" || searchTerm === undefined) {
      constructedSearchTerm = "%%";
   } else {
      constructedSearchTerm = `%${searchTerm}%`;
   }
   // mysql prepared statements
   // extracted params running query with placeholder values and then add in these values at each ?
   db.query(selectAllCards, [
      userId,
      constructedSearchTerm,
      constructedSearchTerm,
      order,
   ]) // use our database to call the query method which opens connection & pass connection
      .then((dbRes) => {
         // console.log(dbRes);
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
