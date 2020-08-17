import React from "react";
import AppTemplate from "../ui/AppTemplate";
import classnames from "classnames";
import { checkIsOver, MAX_CARD_CHARS, defaultLevel } from "../../utils/helpers";
import { connect } from "react-redux";
import { v4 as getUuid } from "uuid";
import actions from "../../store/actions";
import getNextAttemptAt from "../../utils/getNextAttemptAt";

class CreateAnswer extends React.Component {
   constructor(props) {
      super(props);
      this.state = {
         // if there is an answer us that or undefined use blank string
         answerText: this.props.creatableCard.answer || "",
      };
   }

   setAnswerText(e) {
      this.setState({ answerText: e.target.value });
   }

   checkAnswerHasInvalidCharacterCount() {
      if (
         this.state.answerText.length > MAX_CARD_CHARS ||
         this.state.answerText.length === 0
      ) {
         return true;
      } else return false;
   }

   setCreatableCard() {
      console.log("UPDATE_CREATABLE_CARD");
      const currentTime = Date.now();
      this.props.dispatch({
         type: actions.UPDATE_CREATABLE_CARD,
         payload: {
            // the card itself
            id: getUuid(),
            answer: this.state.answerText,
            imagery: "",
            userId: this.props.currentUser.id,
            createdAt: currentTime,
            nextAttemptAt: getNextAttemptAt(defaultLevel, currentTime), //
            lastAttemptAt: currentTime,
            totalSuccessfulAttempts: 0,
            level: 1,
         },
      });
      this.props.history.push("/create-imagery");
   }

   render() {
      return (
         <AppTemplate>
            <h4 className=" my-4 text-center text-muted">Add an answer</h4>

            <div className="card">
               <div className="card-body bg-primary">
                  <textarea
                     rows="11"
                     id="answerArea"
                     onChange={(e) => this.setAnswerText(e)}
                     defaultValue={this.state.answerText}
                     autoFocus={true}
                  ></textarea>
               </div>
            </div>

            <p className="float-right mb-5 px-4 py-4" id="characterCounter">
               <span
                  className={classnames({
                     "text-danger": checkIsOver(
                        this.state.answerText,
                        MAX_CARD_CHARS
                     ),
                  })}
               >
                  {this.state.answerText.length}/{MAX_CARD_CHARS}
               </span>
            </p>

            <div className="clearfix"></div>

            <button
               className={classnames(
                  "btn btn-outline-primary float-right px-6",
                  {
                     disabled: this.checkAnswerHasInvalidCharacterCount(),
                  }
               )}
               onClick={() => {
                  this.setCreatableCard();
               }}
               id="next-button"
            >
               Next
            </button>
         </AppTemplate>
      );
   }
}

// global state
function mapStateToProps(state) {
   return {
      currentUser: state.currentUser,
      creatableCard: state.creatableCard,
   };
}

export default connect(mapStateToProps)(CreateAnswer);
