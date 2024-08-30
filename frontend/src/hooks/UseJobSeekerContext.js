import { useContext } from "react";
import { JobSeekerContext } from "../context/JobSeekerContext"; 

 const UseJobSeekerContext = () => {
  const context = useContext(JobSeekerContext);

  if (!context) {
    throw new Error(
      "useJobSeekerContext must be used within a JobSeekerContextProvider"
    );
  }

  return context;
};

export default UseJobSeekerContext;