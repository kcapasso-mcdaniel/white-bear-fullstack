import React from "react";
import AppTemplate from "../ui/AppTemplate";
import saveIcon from "../../icons/save.svg";
import { Link } from "react-router-dom";
import memoryCards from "../../mock-data.js/memory-cards";
import toDisplayDate from "date-fns/format";
import classnames from "classnames";
import { checkIsOver, MAX_CARD_CHARS } from "../../utils/helpers";
import { connect } from "react-redux";
import isEmpty from "lodash/isEmpty";
import without from "lodash/without";
import actions from "../../store/actions";
const memoryCard = memoryCards[0];

class Edit extends React.Component {
   constructor(props) {
      super(props);
      console.log("This is the edit component");
      this.state = {
         imageryText: memoryCard.imagery,
         answerText: memoryCard.answer,
         isShowDeleteChecked: false,
         isDeleteButtonDisplayed: false,
      };
   }

   setImageryText(e) {
      this.setState({ imageryText: e.target.value });
   }

   setAnswerText(e) {
      this.setState({ answerText: e.target.value });
   }

   checkHasInvalidCharacterAmount() {
      if (
         this.state.answerText.length > MAX_CARD_CHARS ||
         this.state.answerText.length === 0 ||
         this.state.imageryText.length > MAX_CARD_CHARS ||
         this.state.imageryText.length === 0
      ) {
         return true;
      } else return false;
   }

   toggleShowDeleteButton(e) {
      this.setState({
         isShowDeleteChecked: e.target.checked,
         isDeleteButtonDisplayed: !this.state.isDeleteButtonDisplayed,
      });
   }

   // function that handles the events of the delete button
   deleteCard() {
      // TODO: delete from database and return all cards view
      if (this.props.editableCard.prevRoute === "/review-answer") {
         this.deleteCardFromStore();
      }
      if (this.props.editableCard.prevRoute === "/all-cards") {
         this.props.history.push("/all-cards");
      }
   }

   // function that deletes a card from the store
   deleteCardFromStore() {
      // need to get the current card value & remove from queue
      const deletedCard = this.props.editableCard.card;
      const cards = this.props.queue.cards;
      // lodash without method takes two params - array to evaluate and values to exclude - returns new array
      const filteredCards = without(cards, deletedCard);
      console.log(filteredCards);
      // dispatch an ation to store the filtered cards in the queue
      this.props.dispatch({
         type: actions.STORE_QUEUED_CARDS,
         payload: filteredCards,
      });
      console.log(this.props.queue.index, this.props.queue.cards.length);
      // if we try to find something in the array that does not exist redirect to review-empty
      if (filteredCards[this.props.queue.index] === undefined) {
         console.log("YES THE INDEX IS >= THE LENGTH");
         // this.props.dispatch({ type: actions.DECREMENT_QUEUE_INDEX });
         this.props.history.push("/review-empty");
      } else {
         this.props.history.push("/review-imagery");
      }
   }

   // passed in the argument is "/review-answer"
   changeRoute(prevRoute) {
      // if queue index is greater than or equal to length of the cards then return rewiew empty
      if (prevRoute === "/review-answer") {
         return "/review-imagery";
      }
   }

   render() {
      return (
         <AppTemplate>
            <h4 className="my-4 text-center text-muted">Edit card</h4>

            {/* using Lodash isEmpty method to say that if the object is empty do not display the page contents */}
            {isEmpty(this.props.editableCard) === false && (
               <>
                  <div className="card">
                     <div className="card-body bg-primary">
                        <textarea
                           rows="4"
                           defaultValue={this.props.editableCard.card.imagery}
                           onChange={(e) => this.setImageryText(e)}
                        ></textarea>
                     </div>
                  </div>
                  <div className="card">
                     <div className="card-body bg-secondary">
                        <textarea
                           rows="4"
                           defaultValue={this.props.editableCard.card.answer}
                           onChange={(e) => this.setAnswerText(e)}
                        ></textarea>
                     </div>
                  </div>

                  <p className="float-right mb-5 ml-4 mt-4">
                     <span
                        className={classnames({
                           "text-danger": checkIsOver(
                              this.state.imageryText,
                              MAX_CARD_CHARS
                           ),
                        })}
                     >
                        Top: {this.state.imageryText.length}/ {MAX_CARD_CHARS}{" "}
                     </span>
                     &nbsp;&nbsp;{" "}
                     <span
                        className={classnames({
                           "text-danger": checkIsOver(
                              this.state.answerText,
                              MAX_CARD_CHARS
                           ),
                        })}
                     >
                        Bottom: {this.state.answerText.length}/ {MAX_CARD_CHARS}{" "}
                     </span>
                  </p>

                  <div className="clearfix"></div>

                  <Link
                     to={this.props.editableCard.prevRoute}
                     className="btn btn-link"
                     id="back-to-answer-imagery"
                  >
                     Discard changes
                  </Link>

                  <Link
                     to={this.props.editableCard.prevRoute}
                     className={classnames(
                        "btn btn-primary btn-lg float-right",
                        {
                           disabled: this.checkHasInvalidCharacterAmount(),
                        }
                     )}
                     id="save-card"
                  >
                     <img
                        src={saveIcon}
                        width="20px"
                        style={{ marginBotton: "3px", marginRight: "6px" }}
                        alt=""
                     />
                     Save
                  </Link>
                  <h4 className="all-cards text-muted text-center py-4 mt-4">
                     Card properties
                  </h4>
                  <table className="table table-responsive table-borderless">
                     <thead>
                        <tr>
                           <th className="text-muted" scope="row">
                              Created on:
                           </th>
                           <td>
                              {toDisplayDate(
                                 this.props.editableCard.card.createdAt,
                                 "MMM. d, y"
                              )}
                           </td>
                        </tr>
                        <tr>
                           <th className="text-muted" scope="row">
                              Last attempt:
                           </th>
                           <td>
                              {toDisplayDate(
                                 this.props.editableCard.card.lastAttemptAt,
                                 "MMM. d, y"
                              )}
                           </td>
                        </tr>
                        <tr>
                           <th className="text-muted" scope="row">
                              Next attempt:
                           </th>
                           <td>
                              {toDisplayDate(
                                 this.props.editableCard.card.nextAttemptAt,
                                 "MMM. d, y"
                              )}
                           </td>
                        </tr>
                        <tr>
                           <th className="text-muted" scope="row">
                              Consecutives:
                           </th>
                           <td>
                              {
                                 this.props.editableCard.card
                                    .totalSuccessfulAttempts
                              }
                           </td>
                        </tr>
                     </thead>
                  </table>

                  <div className="custom-control custom-checkbox">
                     <input
                        type="checkbox"
                        className="custom-control-input"
                        id="show-delete"
                        name="show-delete"
                        checked={this.state.isShowDeleteChecked}
                        onChange={(e) => {
                           this.toggleShowDeleteButton(e);
                        }}
                     />
                     <label
                        className="custom-control-label"
                        htmlFor="show-delete"
                     >
                        Show delete button
                     </label>
                  </div>

                  {this.state.isDeleteButtonDisplayed && (
                     <button
                        type="button"
                        className="btn btn-outline-danger mt-4"
                        id="delete-button"
                        onClick={() => {
                           this.deleteCard();
                        }}
                     >
                        Delete this card
                     </button>
                  )}
               </>
            )}
         </AppTemplate>
      );
   }
}

// Global state
function mapStateToProps(state) {
   return {
      editableCard: state.editableCard,
      queue: state.queue,
   };
}

export default connect(mapStateToProps)(Edit);
