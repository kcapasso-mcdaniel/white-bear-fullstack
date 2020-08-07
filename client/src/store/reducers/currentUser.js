import actions from "../actions";
import isEmpty from "lodash/isEmpty";

// action.payload, action.type
export default function currentUser(currentUser = [], action) {
   switch (action.type) {
      case actions.UPDATE_CURRENT_USER:
         // if the payload is empty remove the authToken key
         if (isEmpty(action.payload)) {
            localStorage.removeItem("authToken");
         }
         return action.payload;
      default:
         return currentUser;
   }
}
