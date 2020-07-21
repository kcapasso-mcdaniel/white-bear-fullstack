import React from "react";
import Navigation from "./Navigation";
import Header from "./Header";

export default function AppTemplate(props) {
   return (
      <div className="container">
         <div className="row">
            {/* props.children will display anything that has been passed into the component */}
            <div className="col-12 col-xl-6 offset-xl-3 col-lg-8 offset-lg-2 col-md-10 offset-md-1">
               <Header />
               <Navigation />
               {props.children}
            </div>
         </div>
      </div>
   );
}
