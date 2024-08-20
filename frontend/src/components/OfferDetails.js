import UseOfferContext from "../hooks/UseOfferContext";
import { useState } from "react";
import OfferForm from "./OfferForm";

const OfferDetails = ({ offer }) => {
  const { dispatch } = UseOfferContext();
  const [popup, setPopup] = useState(false);
  console.log("popup", popup);



  const handleDelete = async () => {
    try {
      const response = await fetch(`/api/offer/delete-offer/${offer._id}`, {
        method: "DELETE",
      });
      const data = await response.json();
      console.log("data", data);
      if (data.message === "Offer job deleted successfully") {
        console.log("hello");
        // Dispatch the DELETE_OFFER action with the correct offer ID
        // sabeb
        dispatch({ type: "DELETE_OFFER", payload: { _id: offer._id } });
      } else {
        console.error("Failed to delete offer:", data.message);
      }
    } catch (error) {
      console.error("Error deleting offer:", error);
    }
  };

  return (
    <>
      <div className="offer-details">
        <header className="offer-header">
          <h1 className="offer-title">{offer.title}</h1>
          <p className="offer-company">{offer.company}</p>
          <p className="offer-location">{offer.location}</p>
          <p className="offer-publication-date">
            Posted on: {offer.publicationDate}
          </p>
        </header>
        <section className="offer-body">
          <p className="offer-description">{offer.description}</p>
          <h3 className="offer-requirements-title">Requirements</h3>
          <ul className="offer-requirements">
            {offer.requirements.split(",").map((req, index) => (
              <li key={index}>{req.trim()}</li>
            ))}
          </ul>
          <p className="offer-salary">Salary: {offer.salary}</p>
        </section>
        <footer className="offer-actions">
          <div>
            <button onClick={handleDelete}>Delete</button>
            <button onClick={() => setPopup(true)}>Edit</button>
          </div>
        </footer>
      </div>

      {popup && (
        <div className="popup">
          <OfferForm data={offer}  className="offer-form-popup"  onClose={()=>setPopup(false)}/>
            <button className="close-button" onClick={() => setPopup(false)} >X</button>
        </div>
      )}
    </>
  );
};

export default OfferDetails;
