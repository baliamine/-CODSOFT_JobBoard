import { useContext } from "react";
import { CandidatureContext } from "../context/CandidatureContext"; // Adjust the path as needed

const UseCandidatureContext = () => {
  const context = useContext(CandidatureContext);

  if (!context) {
    throw new Error("No CandidatureContext found");
  }

  return context;
};

export default UseCandidatureContext;
