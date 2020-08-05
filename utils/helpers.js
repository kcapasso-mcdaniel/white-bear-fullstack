const bcrypt = require("bcrypt");

module.exports = {
   toJson(data) {
      return JSON.stringify(data);
   },

   toSafelyParseJson(str) {
      // function to safely parse json
      try {
         JSON.parse(str);
      } catch (err) {
         return str;
      }
      return JSON.parse(str);
   },

   // converting a string to a hash
   toHash(password) {
      const saltRounds = 12;
      return bcrypt.hash(password, saltRounds);
   },

   // key value pair for REGEX
   EMAIL_REGEX: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
};
