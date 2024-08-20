import { useState } from "react";
import UseOfferContext from "../hooks/UseOfferContext";

const OfferForm = ({data,onClose}) => {
  const { dispatch } = UseOfferContext();
  console.log("data", data);
  const [dataOffer, setDataOffer] = useState({
    // : maanitha sin
    // ya fergha ya fiha title
    title: data ? data.title : "",
    company: data ? data.company : "",
    location: data ? data.location : "",
    publicationDate: data ? data.publicationDate : "",
    salary: data ? data.salary : "",
    requirements: data ? data.requirements : "",
    description: data ? data.description : "",
  });
  const [errors, setErrors] = useState({});

  const validateDataOffer = (dataOffer) => {
    const errors = {};
    if (!dataOffer.title) {
      errors.title = "Title is required";
    }
    if (!dataOffer.company) {
      errors.company = "Company is required";
    }
    if (!dataOffer.location) {
      errors.location = "Location is required";
    }
    if (!dataOffer.publicationDate) {
      errors.publicationDate = "Publication Date is required";
    }
    if (!dataOffer.salary) {
      errors.salary = "Salary is required";
    }
    if (!dataOffer.requirements) {
      errors.requirements = "Requirements are required";
    }
    if (!dataOffer.description) {
      errors.description = "Description is required";
    }
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const SubmitOffer = async (e) => {
    e.preventDefault(); // Prevent default form submission

    if (validateDataOffer(dataOffer)) {
      try {
        // fetch yaaml consomation api (i3yt lil api )
        const endpoint = data
          ? `/API/offer/update-offer/${data._id}`
          : "/api/offer/add-offe";
        const response = await fetch(endpoint, {
          method: data ? "PATCH" : "POST",
          body: JSON.stringify(dataOffer),
          headers: {
            "Content-Type": "application/json",
          },
        });
        const json = await response.json();
        // sabeb yimchi i9oulo hay il 9at3 jdida w y3lmo fil jdid kil store (rani 3mlt post or update or ..... howa sabeb ifay9 il store)
        const ACTION = data ? "UPDATE_OFFER" : "ADD_OFFER";

        dispatch({ type: ACTION, payload: json });
        data && json && onClose(); 
        // Clear the form after submission

        setDataOffer({
          title: "",
          company: "",
          location: "",
          publicationDate: "",
          salary: "",
          requirements: "",
          description: "",
        });
      } catch (e) {
        console.log("Error:", e);
      }
    }
  };

  return (
    <form className="add_offer" onSubmit={SubmitOffer}>
      <h3>Add Offer</h3>

      <label>Title:</label>
      <input
        type="text"
        onChange={(e) => {
          setDataOffer({ ...dataOffer, title: e.target.value });
          setErrors({ ...errors, title: "" });
        }}
        value={dataOffer.title}
        className={errors.title ? "error" : ""}
      />
      {errors.title && <div className="error">{errors.title}</div>}

      <label>Company:</label>
      <input
        type="text"
        onChange={(e) => {
          setDataOffer({ ...dataOffer, company: e.target.value });
          setErrors({ ...errors, company: "" });
        }}
        value={dataOffer.company}
        className={errors.company ? "error" : ""}
      />
      {errors.company && <div className="error">{errors.company}</div>}

      <label>Location:</label>
      <input
        type="text"
        onChange={(e) => {
          setDataOffer({ ...dataOffer, location: e.target.value });
          setErrors({ ...errors, location: "" });
        }}
        value={dataOffer.location}
        className={errors.location ? "error" : ""}
      />
      {errors.location && <div className="error">{errors.location}</div>}

      <label>Publication Date:</label>
      <input
        type="date"
        onChange={(e) => {
          setDataOffer({ ...dataOffer, publicationDate: e.target.value });
          setErrors({ ...errors, publicationDate: "" });
        }}
        value={dataOffer.publicationDate}
        className={errors.publicationDate ? "error" : ""}
      />
      {errors.publicationDate && (
        <div className="error">{errors.publicationDate}</div>
      )}

      <label>Salary:</label>
      <input
        type="number"
        onChange={(e) => {
          setDataOffer({ ...dataOffer, salary: e.target.value });
          setErrors({ ...errors, salary: "" });
        }}
        value={dataOffer.salary}
        className={errors.salary ? "error" : ""}
      />
      {errors.salary && <div className="error">{errors.salary}</div>}

      <label>Requirements:</label>
      <input
        type="text"
        onChange={(e) => {
          setDataOffer({ ...dataOffer, requirements: e.target.value });
          setErrors({ ...errors, requirements: "" });
        }}
        value={dataOffer.requirements}
        className={errors.requirements ? "error" : ""}
      />
      {errors.requirements && (
        <div className="error">{errors.requirements}</div>
      )}

      <label>Description:</label>
      <input
        type="text"
        onChange={(e) => {
          setDataOffer({ ...dataOffer, description: e.target.value });
          setErrors({ ...errors, description: "" });
        }}
        value={dataOffer.description}
        className={errors.description ? "error" : ""}
      />
      {errors.description && <div className="error">{errors.description}</div>}

      <button type="submit">{data ? "Edit": "Add"}</button>
    </form>
  );
};

export default OfferForm;
