import React from "react";
import "./style/master.scss";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Landing from "./components/pages/Landing";
import CreateAnswer from "./components/pages/CreateAnswer";
import CreateImagery from "./components/pages/CreateImagery";
import ReviewImagery from "./components/pages/ReviewImagery";
import ReviewAnswer from "./components/pages/ReviewAnswer";
import ReviewEmpty from "./components/pages/ReviewEmpty";
import AllCards from "./components/pages/AllCards";
import Edit from "./components/pages/Edit";
import NotFound from "./components/pages/NotFound";
import jwtDecode from "jwt-decode";
import store from "./store/store";
import actions from "./store/actions";
import axios from "axios";

// get the authToken from local storage
const authToken = localStorage.authToken; // .authToken will give you the value
if (authToken) {
   // if authToken is not expired
   const currentTimeInSec = Date.now() / 1000;
   // getting string from the browser and decoding it and get user object
   const user = jwtDecode(authToken);
   // if the current time is greater than the user expiration attribute
   if (currentTimeInSec > user.exp) {
      console.log("expired-token");
      // remove the currentUser from the global state/redux store
      store.dispatch({
         type: actions.UPDATE_CURRENT_USER,
         payload: {},
      });
      delete axios.defaults.headers.common["x-auth-token"];
   } else {
      console.log("valid-token");
      // store user in the global state/redux store
      store.dispatch({
         type: actions.UPDATE_CURRENT_USER,
         payload: user,
      });

      // set authorization headers - axios here are the default headers from now on
      axios.defaults.headers.common["x-auth-token"] = authToken;
      const currentUrl = window.location.pathname;
      if (currentUrl === "/") {
         window.location.href = "/create-answer";
      }
   }
} else {
   console.log("no token");
   delete axios.defaults.headers.common["x-auth-token"];
}

function App() {
   return (
      <Router>
         {/* switch will wrap the individual routes */}
         <Switch>
            {/* render the component when the path is called in the url  */}
            <Route exact path="/" component={Landing} />
            <Route exact path="/create-answer" component={CreateAnswer} />
            <Route exact path="/create-imagery" component={CreateImagery} />
            <Route exact path="/review-imagery" component={ReviewImagery} />
            <Route exact path="/review-answer" component={ReviewAnswer} />
            <Route exact path="/review-empty" component={ReviewEmpty} />
            <Route exact path="/all-cards" component={AllCards} />
            <Route exact path="/edit" component={Edit} />
            {/* if url does not match above render this component */}
            <Route component={NotFound} />
         </Switch>
      </Router>
   );
}

export default App;
