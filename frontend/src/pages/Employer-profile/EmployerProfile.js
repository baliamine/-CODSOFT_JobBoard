import { useEffect, useState } from "react";
import UseEmployerContext from "../../hooks/UseEmployerContext";
import "./EmployerProfile.css";
import Navbar from "../../components/Navbar";
import pen from "../../img/pen.png";
import gps from "../../img/gps.png";

const EmployerProfile = () => {
  const { employers, dispatch } = UseEmployerContext();
  const [popup, setPopup] = useState(false);
  const [employerData, setEmployerData] = useState({
    name: "",
    companyName: "",
    email: "",
    bio: "",
  });

  const idEmployer = "66cb27361832cdc4bc0cef66";

  useEffect(() => {
    const fetchEmployer = async () => {
      const response = await fetch(
        `/API/Employer/single-employer/${idEmployer}`
      );
      const data = await response.json();

      if (response.ok) {
        dispatch({ type: "SET_EMPLOYER", payload: data });
        setEmployerData({
          name: data.name,
          companyName: data.companyName,
          email: data.email,
          bio: data.bio,
        });
      }
    };
    fetchEmployer();
  }, [dispatch]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployerData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleEdit = async () => {
    const response = await fetch(
      `/API/Employer/update-employer/${idEmployer}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(employerData),
      }
    );
    const data = await response.json();
    if (response.ok) {
      dispatch = { type: "UPDATE_EMPLOYER", Payload: data };
    }
  };

  return (
    <>
      <Navbar />

      <div className="employer-profile">
        {/* Profile Header */}

        <div className="profile-header">
          <img
            src={"https://randomuser.me/api/portraits/men/52.jpg"}
            alt="Profile"
            className="profile-logo"
          />
          <div className="profile-info">
            <h1 className="employer-name">{employers?.name}</h1>
            <div>
              <p className="employer-company">{employers?.companyName}</p>
              <img className="gps" src={gps} alt="none" />
            </div>
          </div>
          <div />
          <button onClick={() => setPopup(true)}>
            <img className="edit" src={pen} alt="none" />
          </button>
        </div>
        {/* About Me Section */}
        <div className="profile-about">
          <h2 className="about-me">About me</h2>
          <p className="about-me-content">{employers?.bio}</p>
        </div>
      </div>
      {/* Popup for editing employer details */}
      {popup && (
        <div className="popup">
          <div className="popup-content">
            <h2>Edit Profile</h2>
            <button className="close-btn" onClick={() => setPopup(false)}>
              X
            </button>
            <form onSubmit={handleEdit}>
              <label>
                Name:
                <input
                  type="text"
                  name="name"
                  value={employerData.name}
                  onChange={handleChange}
                />
              </label>
              <label>
                Company Name:
                <input
                  type="text"
                  name="companyName"
                  value={employerData.companyName}
                  onChange={handleChange}
                />
              </label>
              <label>
                Email:
                <input
                  type="email"
                  name="email"
                  value={employerData.email}
                  onChange={handleChange}
                />
              </label>
              <label>
                Bio:
                <textarea
                  name="bio"
                  value={employerData.bio}
                  onChange={handleChange}
                />
              </label>
              <div className="popup-actions">
                <button type="submit">Save</button>
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

export default EmployerProfile;
