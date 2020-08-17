import React from "react";
import AppTemplate from "../ui/AppTemplate";
import MemoryCard from "../ui/MemoryCard";
// import orderBy from "lodash/orderBy";
import axios from "axios";

class AllCards extends React.Component {
   constructor(props) {
      super(props);

      this.state = {
         order: "memory_cards.created_at%20DESC",
         memoryCards: [],
         searchTerm: "",
      };
   }

   // allows to call local state
   componentDidMount() {
      this.setMemoryCards();
   }

   // set the order to the new order and fire setMemoryCards
   setOrder(e) {
      console.log("You've made a change");
      const newOrder = e.target.value;
      this.setState({ order: newOrder }, () => {
         this.setMemoryCards();
      });
   }

   setSearchTerm() {
      const searchInput = document.getElementById("search-input").value;
      this.setState({ searchTerm: searchInput }, () => {
         this.setMemoryCards();
      });
   }

   // calls api with the new order and gives us the results
   setMemoryCards() {
      axios
         .get(
            `/api/v1/memory-cards?&searchTerm=${this.state.searchTerm}&order=${this.state.order}`
         )
         .then((res) => {
            // store what we get from api
            console.log("Test", res.data);
            this.setState({ memoryCards: res.data });
         })
         .catch((error) => {
            // handle error
            console.log(error);
         });
   }

   render() {
      return (
         <AppTemplate>
            {/* <!-- Search menu  --> */}
            <div className="row">
               <div className="col-6">
                  <input
                     className="form-control form-control-sm"
                     type="text"
                     placeholder="Search"
                     id="search-input"
                  />
               </div>

               <div className="col-4">
                  <button
                     className="btn btn-primary btn-block btn-sm"
                     type="button"
                     id="search-button"
                     onClick={() => {
                        this.setSearchTerm();
                     }}
                  >
                     Search
                  </button>
               </div>
            </div>

            {/* <!-- Dropdown menu --> */}
            <div className="row mt-4">
               <div className="col-6">
                  <p className="mt-2">Sort cards by</p>
               </div>
               <div className="col-6">
                  <select
                     value={this.state.order}
                     className="form-control-sm w-100"
                     onChange={(e) => this.setOrder(e)}
                  >
                     <option value="memory_cards.created_at%20DESC">
                        Most Recent
                     </option>
                     <option value="memory_cards.created_at%20ASC">
                        Oldest
                     </option>
                     <option value="memory_cards.total_successful_attempts%20ASC,%20memory_cards.created_at%20ASC">
                        Hardest
                     </option>
                     {/* these values are the sql queries themselves */}
                     <option value="memory_cards.total_successful_attempts%20DESC,%20memory_cards.created_at%20DESC">
                        Easiest
                     </option>
                  </select>
               </div>
            </div>
            {this.state.memoryCards.map((memoryCard) => {
               return <MemoryCard card={memoryCard} key={memoryCard.id} />;
            })}
         </AppTemplate>
      );
   }
}

export default AllCards;
