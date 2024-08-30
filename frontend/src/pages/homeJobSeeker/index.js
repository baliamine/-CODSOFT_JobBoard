// JobSeekerHome.js
import React, { useEffect, useState } from 'react';
import JobSeekerOfferDetails from "../../components/JobSeekerOfferDetails.js/index";

const JobSeekerHome = () => {
  const [offers, setOffers] = useState([]);

  useEffect(() => {
    // Fetch job offers from the backend
    const fetchOffers = async () => {
      const response = await fetch("/API/offer/all-offer");
      const data = await response.json();
      setOffers(data);
    };

    fetchOffers();
  }, []);

  return (
    <div className="jobseeker-home">
      <h1>Available Job Offers</h1>
      <div className="offers-list">
        {offers.map((offer) => (
          <JobSeekerOfferDetails key={offer._id} offer={offer} />
        ))}
      </div>
    </div>
  );
};

export default JobSeekerHome;
