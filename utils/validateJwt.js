require("dotenv").config();
const jwt = require("jsonwebtoken");

module.exports = function validiatJwt(req, res, next) {
   //must have these 3 params
   const accessToken = req.header("x-auth-token");

   // if there is no accessToken return 401
   if (!accessToken) {
      // 401 unauthorized error message
      return res.status(401).json({ authError: "No token provided." });
   }

   try {
      // verify the token,
      // if valid, extract the user, continue forward in API
      const decodedPayload = jwt.verify(
         accessToken,
         process.env.JWT_ACCESS_SECRET
      );
      // assign payload to the request
      req.user = decodedPayload;
      // contine on in the API
      next();
   } catch {
      return res.status(401).json({ authError: "Unauthorized token" });
   }
};
