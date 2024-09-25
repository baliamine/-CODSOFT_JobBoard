import { useEffect } from "react";
import OfferDetails from "../../components/OfferDetails/index";
import OfferForm from "../../components/OfferForm/index";
import UseOfferContext from "../../hooks/UseOfferContext";
import "./EmployerHome.css";
import Navbar from "../../components/Navbar/Navbar";
import UseAuthContext from "../../hooks/UseAuthContext";

const Home = () => {
  const { offers, dispatch } = UseOfferContext();
  const { user } = UseAuthContext();

  // Use the user ID as the employer ID
  const idEmployer = user?.id; // Ensure that user.id exists in your context

  useEffect(() => {
    const fetchOffers = async () => {
      const response = await fetch(
        `/API/Employer/all-jobs-byEmployer/${idEmployer}`, {
          headers: {
            'Authorization': `Bearer ${user?.token}`,
          },
        }
      );
      const data = await response.json();

      if (response.ok) {
        dispatch({ type: "SET_OFFER", payload: data });
      }
    };
    if (user && idEmployer) { // Check both user and idEmployer
      fetchOffers();
    }
  }, [dispatch, user, idEmployer]); // Add idEmployer to the dependency array

  return (
    <div>
      <Navbar />

      <div className="Home">
        <div className="offer">
          {offers &&
            offers.map((offer) => (
              <OfferDetails key={offer._id} offer={offer} />
            ))}
        </div>
        <OfferForm />
      </div>
    </div>
  );
};

export default Home;
