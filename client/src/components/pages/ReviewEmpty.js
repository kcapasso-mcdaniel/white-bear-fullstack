import React from "react";
import AppTemplate from "../ui/AppTemplate";
import { connect } from "react-redux";
import actions from "../../store/actions";

class ReviewEmpty extends React.Component {
   goToPrevCard() {
      this.props.dispatch({ type: actions.DECREMENT_QUEUE_INDEX });

      this.props.history.push("/review-answer");
   }

   getMoreCards() {
      this.props.dispatch({ type: actions.RESET_QUEUE });
      this.props.history.push("/review-imagery");

      console.log("clicked");
   }

   render() {
      return (
         <AppTemplate>
            <h4 className="my-4 text-center text-muted">Out of cards</h4>

            {this.props.queue.index > 0 && (
               <button
                  className="btn btn-link mx-4 my-5"
                  id="back-to-answer-imagery"
                  onClick={() => this.goToPrevCard()}
               >
                  Previous card
               </button>
            )}

            <button
               className="btn btn-outline-primary btn-lg float-right mt-5"
               onClick={() => {
                  this.getMoreCards();
               }}
            >
               Get more cards
            </button>
         </AppTemplate>
      );
   }
}

function mapStateToProps(state) {
   return {
      queue: state.queue,
   };
}

// curry argument into function
export default connect(mapStateToProps)(ReviewEmpty);
