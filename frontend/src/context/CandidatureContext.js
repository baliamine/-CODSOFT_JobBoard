import { createContext, useReducer } from "react";

// Create the Candidature context
export const CandidatureContext = createContext();

// Reducer function to handle different actions
export const CandidatureReducer = (state, action) => {
  switch (action.type) {
    case "SET_CANDIDATURES":
      return { candidatures: action.payload };
    case "ADD_CANDIDATURE":
      return { candidatures: [action.payload, ...state.candidatures] };
    case "DELETE_CANDIDATURE":
      return {
        candidatures: state.candidatures.filter(
          (candidature) => candidature._id !== action.payload._id
        ),
      };
    case "UPDATE_CANDIDATURE":
      return {
        candidatures: state.candidatures.map((candidature) =>
          candidature._id === action.payload._id ? action.payload : candidature
        ),
      };
    default:
      return state;
  }
};

// Context provider component
export const CandidatureContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(CandidatureReducer, { candidatures: [] });

  return (
    <CandidatureContext.Provider value={{ ...state, dispatch }}>
      {children}
    </CandidatureContext.Provider>
  );
};
