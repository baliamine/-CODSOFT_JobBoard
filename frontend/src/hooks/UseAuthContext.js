import { useContext } from "react";
import {AuthContext } from "../context/AuthContext"; 

const UseAuthContext = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("No AuthContext found");
  }

  return context;
};

export default UseAuthContext;
