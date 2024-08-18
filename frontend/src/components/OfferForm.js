import { useState } from "react";
import UseOfferContext from "../hooks/UseOfferContext";

// Define the OfferForm functional component
const OfferForm = () => {
  // Use the context to access the dispatch function for updating state
  const { dispatch } = UseOfferContext();
  
  // Declare state variables for form fields and their corresponding setter functions
  const [title, setTitle] = useState(""); // title of the job offer
  const [company, setCompany] = useState(""); // name of the company offering the job
  const [location, setLocation] = useState(""); // location of the job
  const [publicationDate, setPublicationDate] = useState(""); // date when the job offer was published
  const [salary, setSalary] = useState(""); // salary offered for the job
  const [requirements, setRequirements] = useState(""); // job requirements or qualifications needed
  const [description, setDescription] = useState(""); // description of the job role
  const [error, setError] = useState(null); // state variable to store any error messages
  const[emptyInput, setEmptyInput] = useState([]);

  // Define an asynchronous function that handles form validation and submission
  const ValidateForm = async (e) => {
    e.preventDefault(); //I want to handle this form submission myself; don't do it the default way

    // Create an object with the form data to send in the request body
    const offer = {
      title,
      company,
      location,
      publicationDate,
      salary,
      requirements,
      description,
    };

    // Send a POST request to add the job offer to the backend
    const response = await fetch("/API/offer/add-offer", {
      method: "POST",
      body: JSON.stringify(offer), // Convert the offer object to a JSON string
      headers: {
        "Content-Type": "application/json", // Inform the server that the request body is in JSON format
      },
    });

    const json = await response.json(); // Parse the response JSON

    // If the response is not okay, update the error state
    if (!response.ok) {
      setError(json.error);
      setEmptyInput(json.emptyInput);
    } else {
      // If the response is okay, reset the form fields and dispatch the new offer
      setTitle("");
      setCompany("");
      setLocation("");
      setPublicationDate("");
      setSalary("");
      setRequirements("");
      setDescription("");
      setError(null); // Reset the error state
      setEmptyInput([]); // Reset the emptyInput state
      dispatch({ type: "ADD_OFFER", payload: json }); // Update the offers in context
    }
  };

  // JSX to render the form
  return (
    <form action="" className="add_offer" onSubmit={ValidateForm}>
      <h3>Add Offer</h3>

      <label>Title:</label>
      <input
        type="text"
        onChange={(e) => setTitle(e.target.value)} // Update title state when the user types
        value={title} // Bind the input field to the title state variable
        className={emptyInput.includes("title")? 'error' :''}
      />

      <label>Company:</label>
      <input
        type="text"
        onChange={(e) => setCompany(e.target.value)} // Update company state
        value={company} // Bind to company state variable
        className={emptyInput.includes("company")? 'error' :''}
      />

      <label>Location:</label>
      <input
        type="text"
        onChange={(e) => setLocation(e.target.value)} // Update location state
        value={location} // Bind to location state variable
        className={emptyInput.includes("location")? 'error' :''}
      />

      <label>Publication Date:</label>
      <input
        type="date"
        onChange={(e) => setPublicationDate(e.target.value)} // Update publicationDate state
        value={publicationDate} // Bind to publicationDate state variable
        className={emptyInput.includes("publicationDate")? 'error' :''}
      />

      <label>Salary:</label>
      <input
        type="number"
        onChange={(e) => setSalary(e.target.value)} // Update salary state
        value={salary} // Bind to salary state variable
        className={emptyInput.includes("salary")? 'error' :''}
      />

      <label>Requirements:</label>
      <input
        type="text"
        onChange={(e) => setRequirements(e.target.value)} // Update requirements state
        value={requirements} // Bind to requirements state variable
        className={emptyInput.includes("requirements")? 'error' :''}
      />

      <label>Description:</label>
      <input
        type="text"
        onChange={(e) => setDescription(e.target.value)} // Update description state
        value={description} // Bind to description state variable
        className={emptyInput.includes("description")? 'error' :''}
      />

      <button type="submit">Add Offer</button>
      {error && <div className="error">Error: {error}</div>} {/* Display any error messages */}
    </form>
  );
};

export default OfferForm;
