import { useState } from "react";
import { useSignup } from "../../hooks/UseSignup";
import "./signup.css"; // Assuming you're using a dedicated CSS file
import backroundImg from "../../img/backroundImg.jpg";
import Navbar from "../../components/Navbar/Navbar";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState(""); // Initially empty
  const { signup, error, isLoading } = useSignup();

  const handleSubmit = async (e) => {
    e.preventDefault();

    await signup(email, password, role);
  };

  return (
    <>
      <Navbar/>
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
