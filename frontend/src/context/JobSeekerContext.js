import { createContext, useReducer } from "react";

export const JobSeekerContext = createContext();

export const JobSeekerReducer = (state, action) => {
  switch (action.type) {
    case "SET_JOBSEEKER":
  return { JobSeekers: Array.isArray(action.payload) ? action.payload : [] };
    case "ADD_JOBSEEKER":
      return {JobSeekers: [action.payload, ...state.JobSeekers] };
    case "DELETE_JOBSEEKER":
      return {
        JobSeekers: state.JobSeekers.filter(
          (JobSeeker) => JobSeeker._id !== action.payload._id
        ),
      };
    case "UPDATE_JOBSEEKER":
      return {
        JobSeekers: state.JobSeekers.map((JobSeeker) =>
            JobSeeker._id === action.payload._id ? action.payload : JobSeeker
        ),
      };
   
    default:
      return state;
  }
};

export const JobSeekerContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(JobSeekerReducer, { JobSeekers: [] });

  return (
    <JobSeekerContext.Provider value={{ ...state, dispatch }}>
      {children}
    </JobSeekerContext.Provider>
  );
};
