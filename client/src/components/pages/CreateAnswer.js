import React from "react";
import AppTemplate from "../ui/AppTemplate";
import { Link } from "react-router-dom";
import classnames from "classnames";
import { checkIsOver, MAX_CARD_CHARS } from "../../utils/helpers";

export default class CreateAnswer extends React.Component {
   constructor(props) {
      super(props);
      this.state = {
         answerText: "",
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

            <Link
               to="create-imagery"
               className={classnames(
                  "btn btn-outline-primary float-right px-6",
                  {
                     disabled: this.checkAnswerHasInvalidCharacterCount(),
                  }
               )}
               id="next-button"
            >
               Next
            </Link>
         </AppTemplate>
      );
   }
}
