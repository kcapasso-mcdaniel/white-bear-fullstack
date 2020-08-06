module.exports = function getSignUpPasswordError(password, email) {
   if (password === "") {
      return "Please create a password.";
   }
   if (password.length < 9) {
      return "Your password must be at least 9 characters.";
   }
   if (checkHasLocalPart(password, email)) {
      return "Your password cannot contain your email address.";
   }
   const uniqChars = [...new Set(password)];
   if (uniqChars.length < 3) {
      return "Your password must contain at least 3 unique characters.";
   }
   return "";
};

// function to check for the local part of the email
function checkHasLocalPart(password, email) {
   const localPart = email.split("@")[0];
   // fixes small bug with password error message
   if (localPart === "") return false;
   else if (localPart.length < 4) return false;
   else return password.includes(localPart);
}
