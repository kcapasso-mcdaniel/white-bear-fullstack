import React from "react";
import editIcon from "../../icons/edit.svg";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import actions from "../../store/actions";

class MemoryCard extends React.Component {
   storeEditableCard() {
      console.log("STORING EDITABLE CARD");
      this.props.dispatch({
         type: actions.STORE_EDITABLE_CARD,
         payload: { card: this.props.card, prevRoute: "/all-cards" },
      });
   }

   render() {
      return (
         <div className="d-flex">
            <div className="app-card flex-fill">
               <div className="card mt-4">
                  <div className="card-body bg-primary">
                     {this.props.card.imagery}
                  </div>
               </div>

               <div className="card">
                  <div className="card-body bg-secondary">
                     {this.props.card.answer}
                  </div>
               </div>

               {/* store all the properties of the card in the state when the edit link is clicked */}
               <Link
                  to="/edit"
                  className="btn btn-link mt-2 d-flex"
                  onClick={() => {
                     this.storeEditableCard();
                  }}
               >
                  <img
                     src={editIcon}
                     className="d-inline"
                     width="20px"
                     style={{ marginBottom: "3px", marginRight: "5px" }}
                     alt=""
                  />
                  Edit
               </Link>
            </div>
         </div>
      );
   }
}

// global state
function mapStateToProps(state) {
   return {};
}

export default connect(mapStateToProps)(MemoryCard);
