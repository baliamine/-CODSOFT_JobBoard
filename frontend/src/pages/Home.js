import { useEffect, useState } from "react";
import OfferDetails from "../components/OfferDetails";
import OfferForm from "../components/OfferForm";
import UseOfferContext from "../hooks/UseOfferContext";
import Workout  from "../components/Workout";

const Home = () => {
  const { offers, dispatch } = UseOfferContext();

 
  useEffect(() => {
    const fetchOffers = async () => {
      const response = await fetch("/API/offer/all-offer");
      const data = await response.json();

      if (response.ok) {
        dispatch({ type: "SET_OFFER", payload: data });
      }
    };
    fetchOffers();
  }, [dispatch]);

  return (
    <div className="home">
      <div className="offer">
        {offers &&
          offers.map((offer) => <OfferDetails key={offer._id} offer={offer} />)}
      </div>
      <OfferForm />
      {/* <Workout/> */}
    </div>
  );
};

export default Home;
