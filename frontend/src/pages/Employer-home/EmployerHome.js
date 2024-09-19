import { useEffect } from "react";
import OfferDetails from "../../components/OfferDetails/index";
import OfferForm from "../../components/OfferForm/index";
import UseOfferContext from "../../hooks/UseOfferContext";
import "./EmployerHome.css"
import NavbarEmployer from "../../components/Navbar/NavbarEmployer";
import UseAuthContext from "../../hooks/UseAuthContext";

const Home = () => {
  const { offers, dispatch } = UseOfferContext();
  const { user } = UseAuthContext();
  const idEmployer = "66cb27361832cdc4bc0cef66";

  useEffect(() => {
    const fetchOffers = async () => {
      const response = await fetch(
        `/API/Employer/all-jobs-byEmployer/${idEmployer}`,{
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
    if (user){fetchOffers();}
    
  }, [dispatch,user]);

  return (
    <div>
      <NavbarEmployer/>

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
