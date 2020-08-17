import React from "react";
import saveIcon from "../../icons/save.svg";
import AppTemplate from "../ui/AppTemplate";
import { Link } from "react-router-dom";
import classnames from "classnames";
import { checkIsOver, MAX_CARD_CHARS } from "../../utils/helpers";
import { connect } from "react-redux";
import actions from "../../store/actions";
import axios from "axios";

class CreateImagery extends React.Component {
   constructor(props) {
      super(props);
      this.state = {
         imageryText: "",
      };
   }

   setImageryText(e) {
      this.setState({ imageryText: e.target.value });
   }

   checkImageryHasInvalidCharacterCount() {
      if (
         this.state.imageryText.length > MAX_CARD_CHARS ||
         this.state.imageryText.length === 0
      ) {
         return true;
      } else return false;
   }

   async updateCreateableCard() {
      console.log("UPDATE CREATABLE CARD");
      const {
         id,
         answer,
         userId,
         createdAt,
         nextAttemptAt,
         lastAttemptAt,
         totalSuccessfulAttempts,
         level,
      } = this.props.creatableCard;
      await this.props.dispatch({
         type: actions.UPDATE_CREATABLE_CARD,
         payload: {
            id: id,
            answer: answer,
            imagery: this.state.imageryText,
            userId: userId,
            createdAt: createdAt,
            nextAttemptAt: nextAttemptAt, //
            lastAttemptAt: lastAttemptAt,
            totalSuccessfulAttempts: totalSuccessfulAttempts,
            level: level,
         },
      });
      // save to the database with API
      axios
         .post("/api/v1/memory-cards/", this.props.creatableCard)
         .then((res) => {
            console.log("Memory Card created");
            // display success overlay
            // route to "/create-answer"
         })
         .catch((err) => {
            const { data } = err.response;
            console.log("data", data); // password and email error
            // display error overlay
            // hide error overlay
            // stay on this page
         });
   }

   render() {
      return (
         <AppTemplate>
            <h4 className="my-4 text-center text-muted">
               Add memorable imagery
            </h4>

            <div className="card" id="cardInput">
               <div className="card-body bg-primary">
                  <textarea
                     rows="4"
                     cols="30"
                     autoFocus={true}
                     onChange={(e) => this.setImageryText(e)}
                  ></textarea>
               </div>
            </div>
            <div className="card" id="cardText">
               <div className="card-body bg-secondary ">
                  {this.props.creatableCard.answer}
               </div>
            </div>

            <p className="float-right mb-5">
               <span
                  className={classnames({
                     "text-danger": checkIsOver(
                        this.state.imageryText,
                        MAX_CARD_CHARS
                     ),
                  })}
               >
                  {this.state.imageryText.length}/{MAX_CARD_CHARS}
               </span>
            </p>

            <div className="clearfix"></div>

            <Link
               to="create-answer"
               className="btn btn-link"
               id="back-to-answer-imagery"
            >
               Back to answer
            </Link>
            <button
               className={classnames("btn btn-primary btn-lg float-right", {
                  disabled: this.checkImageryHasInvalidCharacterCount(),
               })}
               onClick={() => {
                  this.updateCreateableCard();
               }}
               id="save-imageryButton"
            >
               <img
                  src={saveIcon}
                  width="20px"
                  style={{ marginBottom: "3px", marginRight: "5px" }}
                  alt=""
               />
               Save
            </button>
         </AppTemplate>
      );
   }
}
// global state
function mapStateToProps(state) {
   return {
      creatableCard: state.creatableCard,
   };
}

export default connect(mapStateToProps)(CreateImagery);
