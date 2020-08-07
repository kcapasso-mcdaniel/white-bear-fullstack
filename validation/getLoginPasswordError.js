const db = require("../db");
const selectUserByEmail = require("../queries/selectUserByEmail");
const bcrypt = require("bcrypt");

module.exports = async function getLoginPasswordError(password, email) {
   if (password === "") {
      return "Please enter your password.";
   }
   if ((await checkIsValidUser(email, password)) === false) {
      return "The email and password combination you entered is invalid.";
   }
   return "";
};

function checkIsValidUser(email, password) {
   // get the user by email address
   return (
      db
         .query(selectUserByEmail, email)
         //   asynchronous function waiting on bcrypt
         .then(async (users) => {
            // every then statement should have a return
            const user = users[0];
            // compare user.password(hash that is stored in the database) with password
            const isValidUser = await bcrypt
               .compare(password, user.password)
               .then((isValidUser) => {
                  return isValidUser;
               })
               // remember to pay attention to each then statement for a catch statement
               .catch((err) => {
                  console.log(err);
               });
            return isValidUser;
         })
         .catch((err) => {
            // if no email address is found
            return false;
         })
   );
}
