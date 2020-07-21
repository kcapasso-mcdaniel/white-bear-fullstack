import actions from "../actions";

// action.payload, action.type
export default function currentUser(currentUser = [], action) {
   switch (action.type) {
      case actions.UPDATE_CURRENT_USER:
         return action.payload;
      default:
         return currentUser;
   }
}
