import React, { useEffect, useState } from "react";
import JobSeekerOfferDetails from "../../components/JobSeekerOfferDetails/index.js";
import "./JobSeekerHome.css";
import Navbar from "../../components/Navbar/Navbar";
import UseAuthContext from "../../hooks/UseAuthContext";


const JobSeekerHome = () => {
  const [offers, setOffers] = useState([]);
  const { user } = UseAuthContext(); // Get user from UseAuthContext hook
  const [searchQuery, setSearchQuery] = useState(""); // State to store the search query
  const [filteredOffers, setFilteredOffers] = useState([]); // State to store filtered offers

  useEffect(() => {
    // Fetch job offers from the backend
    const fetchOffers = async () => {
      const response = await fetch("/API/offer/all-offer",{
        headers: {
          'Authorization': `Bearer ${user?.token}`,
        },
      });
      const data = await response.json();
      setOffers(data);
    };

    fetchOffers();
  },[user]);

  useEffect(() => {
    // Filter offers based on the search query
    const filtered = offers.filter(
      (offer) =>
        offer.title.toLowerCase().includes(searchQuery.toLowerCase()) 
       
    );
    setFilteredOffers(filtered);
  }, [searchQuery, offers]); // Re-filter whenever searchQuery or offers change

  return (
    <>
      <Navbar/>
      <div className="jobseeker-home">
        <h1 className="title-home-section">Available Job Offers</h1>
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search for jobs..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)} // Update search query state
            className="search-input"
          />
          {filteredOffers.length === 0 ? (
            <div className="no-results">No jobs found ! </div>
          ) : (
            <div className="job-list"></div>
          )}
        </div>
        <div className="offers-list">
          {filteredOffers.map((offer) => (
            <JobSeekerOfferDetails key={offer._id} offer={offer} />
          ))}
        </div>
      </div>
    </>
  );
};

export default JobSeekerHome;
