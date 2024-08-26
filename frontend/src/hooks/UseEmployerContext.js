import { useContext } from "react";
import { EmployerContext } from "../context/EmployerContext"; // Adjust the path as needed

const UseEmployerContext = () => {
  const context = useContext(EmployerContext);

  if (!context) {
    throw new Error("No EmployerContext found");
  }

  return context;
};

export default UseEmployerContext;
