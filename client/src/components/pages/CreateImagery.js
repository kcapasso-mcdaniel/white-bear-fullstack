import React from "react";
import saveIcon from "../../icons/save.svg";
import AppTemplate from "../ui/AppTemplate";
import { Link } from "react-router-dom";
import classnames from "classnames";
import { checkIsOver, MAX_CARD_CHARS } from "../../utils/helpers";
import memoryCards from "../../mock-data.js/memory-cards";
const memoryCard = memoryCards[0];

export default class CreateImagery extends React.Component {
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
                  {memoryCard.imagery}
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
            <Link
               to="create-answer"
               className={classnames("btn btn-primary btn-lg float-right", {
                  disabled: this.checkImageryHasInvalidCharacterCount(),
               })}
               id="save-imageryButton"
            >
               <img
                  src={saveIcon}
                  width="20px"
                  style={{ marginBottom: "3px", marginRight: "5px" }}
                  alt=""
               />
               Save
            </Link>
         </AppTemplate>
      );
   }
}
