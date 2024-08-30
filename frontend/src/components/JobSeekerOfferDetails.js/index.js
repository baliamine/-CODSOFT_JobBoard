import React from "react";
import "./index.css";
const JobSeekerOfferDetails = ({ offer }) => {
  return (
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
          {offer.requirements &&
            offer.requirements
              .split(",")
              .map((req, index) => <li key={index}>{req.trim()}</li>)}
        </ul>
        <p className="offer-salary">Salary: {offer.salary}</p>
      </section>
      <footer className="offer-actions">
       <button>Apply</button>
      </footer>
    </div>
  );
};

export default JobSeekerOfferDetails;
