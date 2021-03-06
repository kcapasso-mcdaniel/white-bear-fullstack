import React from "react";
import classnames from "classnames";
import { v4 as getUuid } from "uuid";
import axios from "axios";
import actions from "../../store/actions";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

class SignUp extends React.Component {
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

   // Function is called in the onClick of the Sign Up button to display the inputs
   // the state of isDisplayingInputs is set to true when this function is called
   showInputs() {
      this.setState({ isDisplayingInputs: true });
   }

   // function for email validation using state
   // async setValidEmailState(emailInput) {
   //    const lowerCasedEmailInput = emailInput.toLowerCase();
   //    console.log(lowerCasedEmailInput);
   //    // set the state with email error and change string to an error message
   //    if (emailInput === "")
   //       this.setState({
   //          emailError: "Please enter your email address.",
   //          hasEmailError: true,
   //       });
   //    // test evaluates the email input and compares to the regex if false set the state with the error message and hasEmailError is true
   //    else if (EMAIL_REGEX.test(lowerCasedEmailInput) === false) {
   //       this.setState({
   //          emailError: "Please enter a valid email address.",
   //          hasEmailError: true,
   //       });
   //    } else {
   //       this.setState({ emailError: "", hasEmailError: false });
   //    }
   // }

   // function to validate the password with state
   // async setValidPasswordState(signUpPasswordInput, emailInput) {
   //    console.log(signUpPasswordInput);

   //    const uniqChars = [...new Set(signUpPasswordInput)];
   //    console.log(uniqChars);

   //    if (signUpPasswordInput === "") {
   //       this.setState({
   //          passwordError: "Please create a password.",
   //          hasPasswordError: true,
   //       });
   //    } else if (signUpPasswordInput.length < 9) {
   //       this.setState({
   //          passwordError: "Your password must be at least 9 characters.",
   //          hasPasswordError: true,
   //       });
   //    } else if (this.checkHasLocalPart(signUpPasswordInput, emailInput)) {
   //       this.setState({
   //          passwordError: "Your password cannot contain your email address.",
   //          hasPasswordError: true,
   //       });
   //    } else if (uniqChars.length < 3) {
   //       this.setState({
   //          passwordError:
   //             "Your password must contain at least 3 unique characters.",
   //          hasPasswordError: true,
   //       });
   //    } else {
   //       this.setState({ passwordError: "", hasPasswordError: false });
   //    }
   // }

   async validateAndCreateNewUser() {
      //   can't be blank
      const emailInput = document.getElementById("signup-email-input").value;
      console.log(emailInput);
      const signUpPasswordInput = document.getElementById(
         "signup-password-input"
      ).value;

      // await this.setValidEmailState(emailInput);
      // await this.setValidPasswordState(signUpPasswordInput, emailInput);
      // if (
      //    this.state.hasEmailError === false &&
      //    this.state.hasPasswordError === false
      // )
      {
         // create user object
         const user = {
            id: getUuid(),
            email: emailInput,
            password: signUpPasswordInput,
            createdAt: Date.now(),
         };

         // post to API
         axios
            // post to endpoint user
            .post("/api/v1/users", user)
            .then((res) => {
               console.log(res.data);
               // Update currentUser in global state with API response
               this.props.dispatch({
                  type: actions.UPDATE_CURRENT_USER,
                  payload: res.data,
               });

               // axios.defaults.headers.common["x-auth-token"] = authToken;

               // Go to next page:
               this.props.history.push("/create-answer");
            })
            .catch((err) => {
               const { data } = err.response;
               console.log(data);
               const { emailError, passwordError } = data;
               if (emailError !== "") {
                  this.setState({ hasEmailError: true, emailError });
               } else {
                  this.setState({ hasEmailError: false, emailError });
               }
               if (passwordError !== "") {
                  this.setState({ hasPasswordError: true, passwordError });
               } else {
                  this.setState({ hasPasswordError: false, passwordError });
               }
            });
      }
   }
   render() {
      return (
         <div className="col-xl-5 col-sm-6 col-12 mb-6">
            <div className="card landing-card text-primary">
               <h2 className="card-title">Nice to meet you</h2>
               <p>Sign up for White Bear. Free forever</p>

               {this.state.isDisplayingInputs && (
                  <div className="mb-0 mt-4 needs-validation" id="sign-up-form">
                     <p className="text-success mb-4">
                        Let's get you signed up.
                     </p>
                     {/* email input */}
                     <label htmlFor="signup-email-input">
                        Enter email address
                     </label>
                     <input
                        type="email"
                        className={classnames({
                           "form-control": true,
                           "is-invalid": this.state.hasEmailError,
                        })}
                        id="signup-email-input"
                        required
                     />

                     {this.state.hasEmailError && (
                        <p className="text-danger">{this.state.emailError}</p>
                     )}

                     {/* password input */}
                     <label htmlFor="signup-password-input" className="mt-2">
                        Create a password
                        <br />
                        <span className="text-muted">
                           Must be at least 9 characters
                        </span>
                     </label>
                     <input
                        type="password"
                        // classnames takes an object
                        className={classnames({
                           "form-control": true,
                           "is-invalid": this.state.hasPasswordError,
                        })}
                        id="signup-password-input"
                     />
                     {this.state.hasPasswordError && (
                        <p className="text-danger">
                           {this.state.passwordError}
                        </p>
                     )}

                     <button
                        type="submit"
                        className="btn btn-success mt-4 w-100"
                        id="lets-go-button"
                        onClick={() => {
                           this.validateAndCreateNewUser();
                        }}
                     >
                        Let's go!
                     </button>
                  </div>
               )}
               {/* if it's not displaying inputs display this button  */}
               {!this.state.isDisplayingInputs && (
                  <button
                     type="sign-up"
                     className="btn btn-success mb-4 mt-4"
                     id="sign-up-button"
                     onClick={() => {
                        this.showInputs();
                     }}
                  >
                     Sign up!
                  </button>
               )}
            </div>
         </div>
      );
   }
}
function mapStateToProps(state) {
   return {};
}

// withRouter is a function - connect curry sign up
export default withRouter(connect(mapStateToProps)(SignUp));
