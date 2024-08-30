import { useEffect, useState } from "react";
import UseJobSeekerContext from "../../hooks/UseJobSeekerContext";
import Navbar from "../../components/Navbar";
import pen from "../../img/pen.png";
import "../../pages/Employer-profile/Profile.css";

const JobSeekerProfile = () => {
  const idJobSeeker = "66d075786842d41103d96dd1";
  const { dispatch } = UseJobSeekerContext();
  const [popup, setPopup] = useState(false);
  const [jobseeker, setJobseeker] = useState({
    name: "",
    email: "",
    cv: "",
    phone: "",
    address: "",
    bio: "",
    skills: [],
    education: [],
    experience: [],
  });

  useEffect(() => {
    const fetchJobSeeker = async () => {
      try {
        const response = await fetch(
          `/API/jobseeker/single-jobseeker/${idJobSeeker}`
        );
        const data = await response.json();

        if (data) {
          setJobseeker(data);
          dispatch({ type: "SET_JOBSEEKER", payload: data });
        } else {
          console.error("Failed to Set JobSeeker:", data.message);
        }
      } catch (e) {
        console.error("Error fetching jobseeker:", e);
      }
    };
    fetchJobSeeker();
  }, [dispatch]);

  const hanleUpdatejobSeeker = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `/API/jobseeker/update-jobseeker/${idJobSeeker}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(jobseeker),
        }
      );
      const data = await response.json();
      if (data) {
        dispatch({ type: "UPDATE_JOBSEEKER", payload: data });
        setPopup(false); // Close the popup after successful update
      } else {
        console.error("Failed to update jobseeker:", data.message);
      }
    } catch (error) {
      console.error("Error updating jobseeker:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setJobseeker((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <>
      <Navbar />

      <div className="container-profile">
        <div className="profile-header">
          <img
            src="https://randomuser.me/api/portraits/men/62.jpg"
            alt="Profile"
            className="profile-logo"
          />
          <div className="profile-info">
            <h1 className="user-name">{jobseeker.name}</h1>
          </div>
          <button onClick={() => setPopup(true)}>
            <img className="edit" src={pen} alt="none" />
          </button>
        </div>

        <div className="Profile">
          <h2 className="section-title">About me</h2>
          <p className="about-me-content">{jobseeker.bio}</p>

          <div className="profile-section">
            <h2 className="section-title">Skills</h2>
            <ul className="about-me-content">
              {jobseeker.skills.map((skill, index) => (
                <li key={index} className="section-list-item">
                  {skill}
                </li>
              ))}
            </ul>
          </div>

          <div className="profile-section">
            <h2 className="section-title">Education</h2>
            <ul className="about-me-content">
              {jobseeker.education.map((edu, index) => (
                <li key={index} className="section-list-item">
                  {edu}
                </li>
              ))}
            </ul>
          </div>

          <div className="profile-section">
            <h2 className="section-title">Experience</h2>
            <ul className="about-me-content">
              {jobseeker.experience.map((exp, index) => (
                <li key={index} className="section-list-item">
                  {exp}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {popup && (
        <div className="popup" >
          <div className="popup-content" id="popup-jobseeker">
            <h2>Edit Profile</h2>
            <button className="close-btn" onClick={() => setPopup(false)}>
              X
            </button>
            <form onSubmit={hanleUpdatejobSeeker}>
              <label>
                Name:
                <input
                  type="text"
                  name="name"
                  value={jobseeker.name}
                  onChange={handleChange}
                />
              </label>
              <label>
                Email:
                <input
                  type="email"
                  name="email"
                  value={jobseeker.email}
                  onChange={handleChange}
                />
              </label>
              <label>
                Phone:
                <input
                  type="text"
                  name="phone"
                  value={jobseeker.phone}
                  onChange={handleChange}
                />
              </label>
              <label>
                Address:
                <input
                  type="text"
                  name="address"
                  value={jobseeker.address}
                  onChange={handleChange}
                />
              </label>
              <label>
                CV:
                <input
                  type="text"
                  name="cv"
                  value={jobseeker.cv}
                  onChange={handleChange}
                />
              </label>
              <label>
                Bio:
                <textarea
                  name="bio"
                  value={jobseeker.bio}
                  onChange={handleChange}
                />
              </label>
              <label>
                Skills:
                <input
                  type="text"
                  name="skills"
                  value={jobseeker.skills.join(", ")}
                  onChange={(e) =>
                    handleChange({
                      target: {
                        name: "skills",
                        value: e.target.value.split(","),
                      },
                    })
                  }
                />
              </label>
              <label>
                Education:
                <input
                  type="text"
                  name="education"
                  value={jobseeker.education.join(", ")}
                  onChange={(e) =>
                    handleChange({
                      target: {
                        name: "education",
                        value: e.target.value.split(","),
                      },
                    })
                  }
                />
              </label>
              <label>
                Experience:
                <input
                  type="text"
                  name="experience"
                  value={jobseeker.experience.join(", ")}
                  onChange={(e) =>
                    handleChange({
                      target: {
                        name: "experience",
                        value: e.target.value.split(","),
                      },
                    })
                  }
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

export default JobSeekerProfile;
