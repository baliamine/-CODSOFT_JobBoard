import { useContext } from "react";
import { OfferContext } from "../context/OfferContext";

const UseOfferContext = () => {
  const context = useContext(OfferContext);

  if (!context) {
    throw new Error("No OfferContext found");
  }
  return context;
};

export default UseOfferContext;
