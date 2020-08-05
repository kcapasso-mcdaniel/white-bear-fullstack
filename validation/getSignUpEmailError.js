// remember that curly braces used here allows you to pull out just one function from the file
const { EMAIL_REGEX } = require("../utils/helpers");
const db = require("../db");
const selectUserByEmail = require("../queries/selectUserByEmail");

module.exports = async function getSignUpEmailError(email) {
   if (email === "") {
      return "Please enter your email address.";
   }
   // The test() method executes a search for a match between a regular expression and a specified string. *mdn docs*
   // Returns boolean
   if (EMAIL_REGEX.test(email) === false) {
      return "Please enter a valid email address.";
   }
   if (await checkIsInDb(email)) {
      return "This email address already exists in the database.";
   }
   return "";
};

function checkIsInDb(email) {
   return db
      .query(selectUserByEmail, email)
      .then((users) => {
         console.log(users);
         //  if empty array and we couldn't find it
         if (users.length === 0) return false;
         else return true;
      })
      .catch((err) => {
         console.log(err);
      });
}
