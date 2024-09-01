import React, { useState, useEffect } from "react";
import "./index.css";
import UseCandidatureContext from "../../hooks/UseCandidatureContext";

const JobSeekerOfferDetails = ({ offer }) => {
  const jobSeekerId = "66d075786842d41103d96dd1";
  const { dispatch } = UseCandidatureContext();
  const [popup, setPopup] = useState(false);
  const [jobSeekerData, setJobSeekerData] = useState(null);
  const [submitted, setSubmitted] = useState(false) ;
  const [candidature, setCandidature] = useState({
    jobSeeker: jobSeekerId,
    offerJob: offer._id,
    motivationLetter: "",
  });

  // Fetch job seeker data
  useEffect(() => {
    const fetchJobSeekerData = async () => {
      try {
        const response = await fetch(`/API/jobseeker/single-jobseeker/${jobSeekerId}`);
        if (response.ok) {
          const data = await response.json();
          setJobSeekerData(data); // Store job seeker data in state
        } else {
          const errorData = await response.json();
          console.error(`Failed to fetch job seeker data: ${errorData.message}`);
        }
      } catch (error) {
        console.error("Error fetching job seeker data:", error);
      }
    };

    fetchJobSeekerData();
  }, [jobSeekerId]);

  // Handle apply action
  const handleApply = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    try {
      const response = await fetch("/API/candidature/add-candidature", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(candidature),
      });

      if (response.ok) {
        const newCandidature = await response.json();
        setCandidature(newCandidature);
        dispatch({ type: "ADD_CANDIDATURE", payload: newCandidature });
        setPopup(false);
        setSubmitted(true);
        localStorage.setItem("submitted", "true");
      } else {
        const errorData = await response.json();
        alert(`Failed to submit candidature: ${errorData.message}`);
      }
    } catch (error) {
      console.error("Error applying for the offer:", error);
      alert("An error occurred. Please try again later.");
    }
  };

  // Edit existing candidature
  const EditCandidature = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    try {
      const response = await fetch(`/API/candidature/update-candidature/${candidature._id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(candidature),
      });

      if (response.ok) {
        const updatedCandidature = await response.json();
        console.log("updatedCandidature", updatedCandidature);
        dispatch({ type: "UPDATE_CANDIDATURE", payload: updatedCandidature });
        setPopup(false);
        setSubmitted(true);
        localStorage.setItem("submitted", "true");
      } else {
        const errorData = await response.json();
        alert(`Failed to update candidature: ${errorData.message}`);
      }
    } catch (error) {
      console.error("Error updating candidature:", error);
      alert("An error occurred. Please try again later.");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCandidature((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };




  const deleteCandidature = async () => {
    try {
      const response = await fetch(`/API/Candidature/delete-candidature/${candidature._id}`, {
        method: "DELETE",
      });
      console.log('response', response)

      if (response.ok) {
        dispatch({ type: "DELETE_CANDIDATURE", payload: candidature });
        setCandidature({
          jobSeeker: jobSeekerId,
          offerJob: offer._id,
          motivationLetter: "",
        });
        setSubmitted(false);
        setPopup(false);
        
      } else {
        const errorData = await response.json();
        alert(`Failed to delete candidature: ${errorData.message}`);
      }
    } catch (error) {
      console.error("Error deleting candidature:", error);
      alert("An error occurred. Please try again later.");
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
            {offer.requirements &&
              offer.requirements
                .split(",")
                .map((req, index) => <li key={index}>{req.trim()}</li>)}
          </ul>
          <p className="offer-salary">Salary: {offer.salary}</p>
        </section>
        <footer className="container-apply-btn">
          <button className="apply-button" onClick={() => setPopup(true)}>
            {submitted ? "Edit" : "Apply"}
           
          </button>
          <button onClick={deleteCandidature} className="delete-btn">Delete</button>
        </footer>
      </div>

      {popup && (
        <div className="popup-overlay">
          <div className="popup-container" id="popupCandidature">
            <h2>
              {submitted ? "Edit Candidature" : `Apply for ${offer.title}`}
            </h2>
            <button className="close-btn" onClick={() => setPopup(false)}>
              X
            </button>
            <form onSubmit={submitted ? EditCandidature : handleApply}>
              <label>Name:</label>
              <input
                type="text"
                value={jobSeekerData?.name || ""}
                readOnly
              />

              <label>Email:</label>
              <input
                type="text"
                name="email"
                value={jobSeekerData?.email || ""}
                onChange={handleChange}
              />

              <label>Phone Number:</label>
              <input
                type="text"
                name="phone"
                value={jobSeekerData?.phone || ""}
                onChange={handleChange}
              />

              <label>Motivation Letter:</label>
              <textarea
                name="motivationLetter"
                value={candidature.motivationLetter}
                onChange={handleChange}
                placeholder="Write your motivation letter here..."
              ></textarea>

              <div className="popup-actions">
                <button type="submit">{submitted ? "Update" : "Save"}</button>
                <button type="button" onClick={() => setPopup(false)}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default JobSeekerOfferDetails;
