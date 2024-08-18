// OfferContext is created using createContext() and will be used to share data across components.
// OfferReducer is a function that takes the current state and an action, and returns a new state based on the action type:
// "SET_OFFER": Replaces the current offers with a new set of offers.
// "ADD_OFFER": Adds a new offer to the existing list of offers.

import { createContext, useReducer } from "react";

export const OfferContext = createContext();

export const OfferReducer = (state, action) => {
  switch (action.type) {
    case "SET_OFFER":
      return { offers: action.payload };
    case "ADD_OFFER":
      return { offers: [action.payload, ...state.offers] };
    case "DELETE_OFFER":
      return {
        offers: state.offers.filter((offer) => offer._id !== action.payload._id),
      };
    default:
      return state;
  }
};


export const OfferContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(OfferReducer, { offers: [] });

  return (
    <OfferContext.Provider value={{ ...state, dispatch }}>
      {children}
    </OfferContext.Provider>
  );
};
