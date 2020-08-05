module.exports = function getSignUpPasswordError(password, email) {
   if (password === "") {
      return "Please create a password.";
   }
   if (password.length < 9) {
      return "Your password must be at least 9 characters.";
   }
   if (checkHasLocalPart(password, emailInput)) {
      return "Your password cannot contain your email address.";
   }
   if (uniqChars.length < 3) {
      return "Your password must contain at least 3 unique characters.";
   }
   return "";
};

// function to check for the local part of the email
function checkHasLocalPart(password, email) {
   const localPart = email.split("@")[0];
   console.log("localPart", localPart);
   // fixes small bug with password error message
   if (localPart === "") return false;
   else if (localPart.length < 4) return false;
   else return password.includes(localPart);
}
