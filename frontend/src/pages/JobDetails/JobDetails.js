import { useEffect, useState } from "react";
import UseEmployerContext from "../../hooks/UseEmployerContext";
import { useLocation } from "react-router-dom";
import "./JobDetails.css";
import gomycode from "../../img/gomycode.png";
import Navbar from "../../components/Navbar";

const JobDetails = () => {
  const { dispatch } = UseEmployerContext();
  const location = useLocation(); // Use useLocation to access passed state
  const { idEmployer, offer } = location.state || {}; // Destructure idEmployer and offer from state

  const [employer, setEmployer] = useState({
    name: "",
    email: "",
    companyName: "",
    img: "",
    jobs: [],
    bio: "",
  });

  console.log("idEmployer", idEmployer); // Debugging to ensure idEmployer is being received

  useEffect(() => {
    if (!idEmployer) {
      console.error("idEmployer is undefined");
      return; // Exit early if idEmployer is not defined
    }

    const fetchEmployer = async () => {
      try {
        const response = await fetch(
          `/API/Employer/single-employer/${idEmployer}`
        );
        if (response.ok) {
          const data = await response.json();
          dispatch({ type: "SET_EMPLOYER", payload: data });
          setEmployer({
            name: data.name,
            companyName: data.companyName,
            email: data.email,
            bio: data.bio,
          });
        } else {
          console.error("Failed to fetch employer data");
        }
      } catch (error) {
        console.error("Error fetching employer data:", error);
      }
    };

    fetchEmployer();
  }, [dispatch, idEmployer]);

  return (
    <>
    <Navbar />
    <div className="job-details-container">
      <div className="employer-section">

        
        <img src={gomycode} alt="none"  className="companyImg"/>
        <h1>Welcome to {employer.companyName}</h1>
        
      </div>

      <div className="job-details-section">
        <h2>About this Offer</h2>
        <p>{offer?.description || "No details available"}</p>

        <h3>Requirements</h3>
        <ul className="job-requirements">
          {offer?.requirements
            ?.split(",")
            .map((requirement, index) => (
              <li key={index}>{requirement.trim()}</li>
            )) || <p>No requirements provided</p>}
        </ul>

        <h3>Salary</h3>
        <p>{offer?.salary || "Not specified"}dt</p>

        <h3>Hiring Process</h3>
        <p>
          The hiring process for this position typically follows these steps:
        </p>
        <ol className="hiring-process-steps">
          <li>
            <strong>Application Submission:</strong> Submit your resume and
            cover letter through the online job portal.
          </li>
          <li>
            <strong>Initial Screening:</strong> Our HR team will review your
            application to ensure it meets the basic qualifications.
          </li>
          <li>
            <strong>Phone Interview:</strong> If selected, you will be contacted
            for a brief phone interview to discuss your experience and skills.
          </li>
          <li>
            <strong>Technical/Skill Assessment:</strong> You may be asked to
            complete a skills test or technical challenge relevant to the
            position.
          </li>
          <li>
            <strong>In-person or Virtual Interview:</strong> A more in-depth
            interview with the hiring manager and relevant team members to
            assess your fit for the role.
          </li>
          <li>
            <strong>Offer Letter:</strong> If selected, you will receive a
            formal offer, outlining the terms and conditions of the employment.
          </li>
        </ol>
        <p>
          We strive to make the hiring process efficient and transparent, and
          we'll keep you informed at every stage.
        </p>
      </div>
    </div>
    </>
  );
};

export default JobDetails;
