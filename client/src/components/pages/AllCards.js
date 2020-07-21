import React from "react";
import AppTemplate from "../ui/AppTemplate";
import MemoryCard from "../ui/MemoryCard";
import orderBy from "lodash/orderBy";
import axios from "axios";

class AllCards extends React.Component {
   constructor(props) {
      super(props);

      this.state = {
         order: '["createdAt"], ["desc"]',
         allMemoryCards: [],
         displayFilteredCards: [],
      };
   }

   // allows to call local state
   componentDidMount() {
      axios
         .get(
            "https://raw.githubusercontent.com/kcapasso-mcdaniel/white-bear-mpa/master/src/mock-data.js/memory-cards.json"
         )
         .then((res) => {
            // store what we get from api
            console.log(res.data);
            const memoryCards = res.data;
            this.setState({
               allMemoryCards: orderBy(memoryCards, ["createdAt"], ["desc"]),
               displayFilteredCards: orderBy(
                  memoryCards,
                  ["createdAt"],
                  ["desc"]
               ),
            });
         })
         .catch((error) => {
            // handle error
            console.log(error);
         });
   }

   // function to search for a word within a card
   filterTheInput() {
      const searchInput = document
         .getElementById("search-input")
         .value.toLowerCase();
      console.log(searchInput, "this is the search input");
      const copyAllMemoryCards = [...this.state.allMemoryCards];
      const filteredCards = copyAllMemoryCards.filter((memoryCard) => {
         let filteredCard =
            memoryCard.imagery.toLowerCase() + memoryCard.answer.toLowerCase();
         console.log(filteredCard, "pizza");
         return filteredCard.includes(searchInput);
      });
      this.setState({ displayFilteredCards: filteredCards });
   }

   setOrder(e) {
      console.log("You've made a change");
      const newOrder = e.target.value;
      this.setState({ order: newOrder }, () => {
         this.setMemoryCards();
      });
   }

   setMemoryCards() {
      console.log("setting memory cards");
      const copyOfDisplayedFilteredCards = [...this.state.displayFilteredCards];
      const toJson = JSON.parse(this.state.order);
      console.log(...toJson);
      const orderedMemoryCards = orderBy(
         copyOfDisplayedFilteredCards,
         ...toJson
      );
      console.log(orderedMemoryCards);
      this.setState({ displayFilteredCards: orderedMemoryCards });
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
                        this.filterTheInput();
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
                     <option value='[["createdAt"], ["desc"]]'>
                        Most Recent
                     </option>
                     <option value='[["createdAt"], ["asc"]]'>Oldest</option>
                     <option value='[["totalSuccessfulAttempts","createdAt"], ["asc", "asc"]]'>
                        Hardest
                     </option>
                     <option value='[["totalSuccessfulAttempts","createdAt"], ["desc", "desc"]]'>
                        Easiest
                     </option>
                  </select>
               </div>
            </div>
            {this.state.displayFilteredCards.map((memoryCard) => {
               return <MemoryCard card={memoryCard} key={memoryCard.id} />;
            })}
         </AppTemplate>
      );
   }
}

export default AllCards;
