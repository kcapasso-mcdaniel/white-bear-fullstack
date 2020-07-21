import React from "react";
import classnames from "classnames";
import hash from "object-hash";
import { v4 as getUuid } from "uuid";
import { EMAIL_REGEX } from "../../utils/helpers";
import axios from "axios";
import actions from "../../store/actions";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

class LogIn extends React.Component {
   constructor(props) {
      super(props);
      console.log("In a new class component");
      this.state = {
         isDisplayingInputs: false,
         emailError: "",
         passwordError: "",
         hasEmailError: false,
         hasPasswordError: false,
      };
   }

   // function for email validation using state
   async setValidEmailState(logInEmailInput) {
      const lowerCasedEmailInput = logInEmailInput.toLowerCase();
      console.log(lowerCasedEmailInput);
      // set the state with email error and change string to an error message
      if (logInEmailInput === "")
         this.setState({
            emailError: "Please enter your email address.",
            hasEmailError: true,
         });
      // test evaluates the email input and compares to the regex if false set the state with the error message and hasEmailError is true
      else if (EMAIL_REGEX.test(lowerCasedEmailInput) === false) {
         this.setState({
            emailError: "Please enter a valid email address.",
            hasEmailError: true,
         });
      } else {
         this.setState({ emailError: "", hasEmailError: false });
      }
   }

   // function to validate the password with state
   async setValidPasswordState(logInUpPasswordInput) {
      console.log(logInUpPasswordInput);

      if (logInUpPasswordInput === "") {
         this.setState({
            passwordError: "Please create a password.",
            hasPasswordError: true,
         });
      } else {
         this.setState({ passwordError: "", hasPasswordError: false });
      }
   }

   async validateUserAndLogIn() {
      //   can't be blank
      const logInEmailInput = document.getElementById("login-email-input")
         .value;
      const logInPasswordInput = document.getElementById("login-password-input")
         .value;
      await this.setValidEmailState(logInEmailInput);
      await this.setValidPasswordState(logInPasswordInput);
      if (
         this.state.hasEmailError === false &&
         this.state.hasPasswordError === false
      ) {
         const user = {
            id: getUuid(),
            email: logInEmailInput,
            password: hash(logInPasswordInput),
            createdAt: Date.now(),
         };
         console.log("created user object for POST: ", user);
         // Mimic API response
         axios
            .get(
               "https://raw.githubusercontent.com/kcapasso-mcdaniel/white-bear-mpa/master/src/mock-data.js/user.json"
            )
            .then((res) => {
               // store what we get from api
               const currentUser = res.data;
               console.log(currentUser);
               this.props.dispatch({
                  type: actions.UPDATE_CURRENT_USER,
                  payload: res.data,
               });
            })
            .catch((error) => {
               // handle error
               console.log(error);
            });
         this.props.history.push("/create-answer");
      }
   }

   render() {
      return (
         <div className="col-xl-5 offset-xl-2 col-sm-6 col-12 mb-6">
            <div className="card">
               <div className="card-body landing-card text-primary">
                  <h2 className="card-title">Welcome back</h2>
                  <p className="mb-4">
                     Log in with your email address and password.
                  </p>

                  <label htmlFor="login-email-input" className="mt-4">
                     Email address
                  </label>
                  <input
                     type="email"
                     className={classnames({
                        "form-control": true,
                        "is-invalid": this.state.hasEmailError,
                     })}
                     id="login-email-input"
                  />
                  {this.state.hasEmailError && (
                     <p className="text-danger">{this.state.emailError}</p>
                  )}

                  <label htmlFor="login-password-input" className="mt-2">
                     Password
                  </label>
                  <input
                     type="password"
                     className={classnames({
                        "form-control": true,
                        "is-invalid": this.state.hasPasswordError,
                     })}
                     id="login-password-input"
                  />
                  {this.state.hasPasswordError && (
                     <p className="text-danger">{this.state.passwordError}</p>
                  )}
                  <button
                     type="button"
                     className="btn btn-success mt-2 float-right"
                     onClick={() => {
                        this.validateUserAndLogIn();
                     }}
                  >
                     Log in
                  </button>
               </div>
            </div>
         </div>
      );
   }
}

function mapStateToProps(state) {
   return {};
}

export default withRouter(connect(mapStateToProps)(LogIn));
