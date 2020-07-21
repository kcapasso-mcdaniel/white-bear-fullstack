import React from "react";
import brandLogo from "../../img/logo-landing.png";
import SignUp from "../ui/SignUp";
import LogIn from "../ui/LogIn";

export default function Landing() {
   return (
      <div className="background-image">
         <div className="landing-page container">
            <div className="row">
               <div className="col=12 mt-xl-7 mt-lg-5">
                  <img
                     className="float-left mr-6 mt-2 img-fluid"
                     src={brandLogo}
                     alt="outline of bear"
                  />
                  <h1 className="mt-2 mt-sm-0 mt-lg-2 d-inline-flex">
                     White Bear
                  </h1>
               </div>
            </div>

            <div className="row mt-md-6 mt-xl-8 mt-4">
               <div className="col-xl-10 offset-xl-1 col-lg-10 offset-lg-1 col-12">
                  <div className="row">
                     <SignUp />

                     <LogIn />
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
}
