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
};
