import { useState } from "react";
import { useSignup } from "../../hooks/UseSignup";
import "./signup.css"; // Assuming you're using a dedicated CSS file
import backroundImg from "../../img/backroundImg.jpg";
import Navbar from "../../components/Navbar/Navbar";

const Signup = () => {
  const [email, setEmail] = useState("");
  // const  [dataEmployer, setDataEmployer] = useState({
  //   email: "",
  //   password: "",
  //   role: "",
  //   name: "",
  //   bio: "",
  //   img: "",
  //   phone: "",
  //   address: "",
  //   skills: "",
  //   education: "",
  //   experience: "",
  // }) 
  // const  [dataEmployer, setDataEmployer] = useState({
  //   email: "",
  //   password: "",
  //   role: "",
  //   name: "",
  //   bio: "",
  //   img: "",
  //   phone: "",
  //   address: "",
  //   skills: "",
  //   education: "",
  //   experience: "",
  // }) 
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
  const [errors, setErrors] = useState({});

  const { signup, error, isLoading } = useSignup();

  // Validation function
  const validateUserData = () => {
    const newErrors = {};
    
    if (!email) newErrors.email = "Email is required";
    if (!password) newErrors.password = "Password is required";
    if (!name) newErrors.name = "Name is required";
    if (!img) newErrors.img = "Image is required";
    if (!bio) newErrors.bio = "Bio is required";
    if (!role) newErrors.role = "Role is required";

    if (role == "employer") {
      if (!companyName) newErrors.companyName = "Company name is required ";
    }

    if (role == "jobseeker") {
      if (!phone) newErrors.phone = "Phone number is required";
      if (!address) newErrors.address = "Address is required ";
      if (!skills) newErrors.skills = "Skills are required ";
      if (!education) newErrors.education = "Education is required ";
      if (!experience) newErrors.experience = "Experience is required ";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    try{
      e.preventDefault();
      if (!validateUserData()) {
        return;
      }
      const userData = {
        email,
        password,
        role,
        name,
        img,
        bio,
       ...(role === "employer" && { companyName }),
       ...(role === "jobseeker" && {
          phone,
          address,
          skills: skills,
          education: education,
          experience: experience,
        }),
      };
      console.log('userData', userData)
      await signup(userData);
    }
    catch (error) {
      console.log('error', error)
    }
  };

  return (
    <>
      <Navbar />
      <div className="body-auth">
        <img className="background-image-Auth" src={backroundImg} alt="none" />
        <div className="signup-container">
          <form className="signup-form" onSubmit={handleSubmit}>
            <h3>Create Your Account</h3>

            {/* Email */}
            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input
                id="email"
                type="email"
                placeholder="Enter your email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
              {errors.email && <span className="error-msg">{errors.email}</span>}
            </div>

            {/* Password */}
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                id="password"
                type="password"
                placeholder="Enter your password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />
              {errors.password && <span className="error-msg">{errors.password}</span>}
            </div>

            {/* Name */}
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                id="name"
                type="text"
                placeholder="Enter your name"
                onChange={(e) => setName(e.target.value)}
                value={name}
              />
              {errors.name && <span className="error-msg">{errors.name}</span>}
            </div>

            {/* Image */}
            <div className="form-group">
              <label htmlFor="img">Profile Image URL</label>
              <input
                id="img"
                type="text"
                placeholder="Enter image URL"
                onChange={(e) => setImg(e.target.value)}
                value={img}
              />
              {errors.img && <span className="error-msg">{errors.img}</span>}
            </div>

            {/* Bio */}
            <div className="form-group">
              <label htmlFor="bio">Bio</label>
              <textarea
                id="bio"
                placeholder="Enter your bio"
                onChange={(e) => setBio(e.target.value)}
                value={bio}
              />
              {errors.bio && <span className="error-msg">{errors.bio}</span>}
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
                {errors.companyName && <span className="error-msg">{errors.companyName}</span>}
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
                  {errors.phone && <span className="error-msg">{errors.phone}</span>}
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
                  {errors.address && <span className="error-msg">{errors.address}</span>}
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
                  {errors.skills && <span className="error-msg">{errors.skills}</span>}
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
                  {errors.education && <span className="error-msg">{errors.education}</span>}
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
                  {errors.experience && <span className="error-msg">{errors.experience}</span>}
                </div>
              </>
            )}

            {/* Role selection */}
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
