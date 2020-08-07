// remember that curly braces used here allows you to pull out just one function from the file
const { EMAIL_REGEX } = require("../utils/helpers");

module.exports = function getLoginEmailError(email) {
   if (email === "") {
      return "Please enter your email address.";
   }
   // The test() method executes a search for a match between a regular expression and a specified string. *mdn docs*
   // Returns boolean
   if (EMAIL_REGEX.test(email) === false) {
      return "Please enter a valid email address.";
   }
   return "";
};
