

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
        offers: state.offers.filter(
          (offer) => offer._id !== action.payload._id
        ),
      };

    case "UPDATE_OFFER":
      return {
        offers: state.offers.map((offer) =>
          offer._id === action.payload._id ? action.payload : offer
        ),
      };
     

    default:
      return state;
  }
};

export const OfferContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(OfferReducer, {
    offers: []
  });

  return (
    <OfferContext.Provider value={{ ...state, dispatch }}>
      {children}
    </OfferContext.Provider>
  );
};
