import { createContext, useReducer } from "react";

export const EmployerContext = createContext();

export const EmployerReducer = (state, action) => {
  switch (action.type) {
    case "SET_EMPLOYER":
      return { employers: action.payload };
    case "ADD_EMPLOYER":
      return { employers: [action.payload, ...state.employers] };
    case "DELETE_EMPLOYER":
      return {
        employers: state.employers.filter(
          (employer) => employer._id !== action.payload._id
        ),
      };
    case "UPDATE_EMPLOYER":
      return {
        employers: state.employers.map((employer) =>
          employer._id === action.payload._id ? action.payload : employer
        ),
      };
   
    default:
      return state;
  }
};

export const EmployerContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(EmployerReducer, { employers: [] });

  return (
    <EmployerContext.Provider value={{ ...state, dispatch }}>
      {children}
    </EmployerContext.Provider>
  );
};
