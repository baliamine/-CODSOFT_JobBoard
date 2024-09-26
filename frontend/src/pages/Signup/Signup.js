import { useState } from "react";
import { useSignup } from "../../hooks/UseSignup";
import "./signup.css"; // Assuming you're using a dedicated CSS file
import backroundImg from "../../img/backroundImg.jpg";
import Navbar from "../../components/Navbar/Navbar";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState(""); // jobseeker or employer
  const [name, setName] = useState("");
  const [companyName, setCompanyName] = useState(""); // For Employer
  const [bio, setBio] = useState("");
  const [img, setImg] = useState("");
  const [phone, setPhone] = useState(""); // For Job Seeker
  const [address, setAddress] = useState(""); // For Job Seeker
  const [skills, setSkills] = useState(""); // For Job Seeker
  const [education, setEducation] = useState(""); // For Job Seeker
  const [experience, setExperience] = useState(""); // For Job Seeker
  
  const { signup, error, isLoading } = useSignup();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userData = {
      email,
      password,
      role,
      name,
      img,
      bio,
      ...(role === "employer" && { companyName }),
      ...(role === "jobseeker" && { phone, address, skills: skills.split(","), education: education.split(","), experience: experience.split(",") }),
    };

    await signup(userData);
  };

  return (
    <>
      <Navbar />
      <div className="body-auth">
        <img className="background-image-Auth" src={backroundImg} alt="none" />
        <div className="signup-container">
          <form className="signup-form" onSubmit={handleSubmit}>
            <h3>Create Your Account</h3>

            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input
                id="email"
                type="email"
                placeholder="Enter your email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                id="password"
                type="password"
                placeholder="Enter your password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />
            </div>

            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                id="name"
                type="text"
                placeholder="Enter your name"
                onChange={(e) => setName(e.target.value)}
                value={name}
              />
            </div>

            <div className="form-group">
              <label htmlFor="img">Profile Image URL</label>
              <input
                id="img"
                type="text"
                placeholder="Enter image URL"
                onChange={(e) => setImg(e.target.value)}
                value={img}
              />
            </div>

            <div className="form-group">
              <label htmlFor="bio">Bio</label>
              <textarea
                id="bio"
                placeholder="Enter your bio"
                onChange={(e) => setBio(e.target.value)}
                value={bio}
              />
            </div>

            {/* Role-specific fields */}
            {role === "employer" && (
              <div className="form-group">
                <label htmlFor="companyName">Company Name</label>
                <input
                  id="companyName"
                  type="text"
                  placeholder="Enter your company name"
                  onChange={(e) => setCompanyName(e.target.value)}
                  value={companyName}
                />
              </div>
            )}

            {role === "jobseeker" && (
              <>
                <div className="form-group">
                  <label htmlFor="phone">Phone</label>
                  <input
                    id="phone"
                    type="text"
                    placeholder="Enter your phone number"
                    onChange={(e) => setPhone(e.target.value)}
                    value={phone}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="address">Address</label>
                  <input
                    id="address"
                    type="text"
                    placeholder="Enter your address"
                    onChange={(e) => setAddress(e.target.value)}
                    value={address}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="skills">Skills (comma-separated)</label>
                  <input
                    id="skills"
                    type="text"
                    placeholder="Enter your skills"
                    onChange={(e) => setSkills(e.target.value)}
                    value={skills}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="education">Education (comma-separated)</label>
                  <input
                    id="education"
                    type="text"
                    placeholder="Enter your education"
                    onChange={(e) => setEducation(e.target.value)}
                    value={education}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="experience">Experience (comma-separated)</label>
                  <input
                    id="experience"
                    type="text"
                    placeholder="Enter your experience"
                    onChange={(e) => setExperience(e.target.value)}
                    value={experience}
                  />
                </div>
              </>
            )}

            <div>
              <label>
                <input
                  type="radio"
                  value="jobseeker"
                  checked={role === "jobseeker"}
                  onChange={(e) => setRole(e.target.value)}
                />
                Job Seeker
              </label>
              <label>
                <input
                  type="radio"
                  value="employer"
                  checked={role === "employer"}
                  onChange={(e) => setRole(e.target.value)}
                />
                Employer
              </label>
            </div>

            <button type="submit" className="singup-btn" disabled={isLoading}>
              {isLoading ? "Signing up..." : "Sign Up"}
            </button>

            {error && <div className="error-msg">{error}</div>}
          </form>
        </div>
      </div>
    </>
  );
};

export default Signup;
