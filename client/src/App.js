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
