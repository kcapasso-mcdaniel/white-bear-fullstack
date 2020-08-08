//This is the memory-cards resource
// represents our table and how we would manipulate our table
const express = require("express");
const router = express.Router();
// import from database file
const db = require("../../db");

const selectAllCards = require("../../queries/selectAllCards");
const validateJwt = require("../../utils/validateJwt");

// @route  GET api/v1/memory-cards
// @desc   GET all memory cards for a user by search term and order
// @access Private

// select user query
router.get("/", validateJwt, (req, res) => {
   console.log(req.query);
   // pull memory cards by this user and by this search term
   const { searchTerm, order } = req.query;
   const userId = req.user.id;
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
      // can pass an object here with toSqlString: function return order
      { toSqlString: () => order },
   ]) // use our database to call the query method which opens connection & pass connection
      .then((memoryCards) => {
         // console.log(memoryCards);
         // shaping the object database response
         const camelCaseMemoryCards = memoryCards.map((memoryCard) => {
            return {
               id: memoryCard.id,
               imagery: memoryCard.imagery,
               answer: memoryCard.answer,
               userId: memoryCard.user_id,
               createdAt: memoryCard.created_at,
               nextAttemptAt: memoryCard.next_attempt_at,
               lastAttemptAt: memoryCard.last_attempt_at,
               totalSuccessfulAttempts: memoryCard.total_successful_attempts,
               level: memoryCard.level,
            };
         });

         res.status(200).json(camelCaseMemoryCards);
      })
      .catch((err) => {
         // catch if there is a database error and throw error message
         console.log(err);
         res.status(400).json(err);
      });
});

module.exports = router;
