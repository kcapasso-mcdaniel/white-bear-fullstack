import { createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import combineReducers from "./combineReducers";

const initialState = {
   currentUser: {},
   queue: {
      cards: [],
      index: 0,
   },
   // has properties
   editableCard: {
      card: {},
      prevRoute: "",
   },
   // single object
   creatableCard: {},
};

const store = createStore(combineReducers, initialState, composeWithDevTools());

export default store;
